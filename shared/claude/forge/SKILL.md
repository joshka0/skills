---
name: forge
description: "Forge a markdown plan into reviewed, merged code. Distributes tasks across parallel Codex agents in isolated worktrees, runs CodeRabbit → code-simplifier review-fix loops, RepoPrompt final gate, and merges to feature branch. Use for: forge plan, execute plan, implement plan, run plan, forge feature, build from plan, plan to code, plan to branch."
---

# Forge

Take a raw implementation plan and hammer it into reviewed, merged code. Distributes tasks across parallel Codex agents in isolated git worktrees, runs a review-fix loop (CodeRabbit → code-simplifier subagents) on each worktree, then a RepoPrompt final gate before merging into a feature branch.

## Pipeline Overview

```
/ralph-loop (outer iteration — optional)
  └─ /forge (orchestration)
       ├─ Phase 1-2: Parse plan → create worktrees → launch agents
       ├─ Phase 3: Monitor agents (codex swarm)
       ├─ Phase 4: Review per worktree (composable skills)
       │    ├─ /review-cr (CodeRabbit → code-simplifier fan-out, max 10 cycles)
       │    └─ /review-rp --gate (RepoPrompt final quality gate)
       ├─ Phase 5: Commit + merge to feature branch
       ├─ Phase 6: Final review on full branch
       │    ├─ /review-cr --max-cycles 3 (cross-task integration)
       │    └─ /review-rp --gate (final gate)
       └─ Phase 7: Cleanup
```

### Composable Review Skills

The review pipeline is built from two standalone skills that can also be used independently:

| Skill | Purpose | Standalone |
|-------|---------|------------|
| `/review-cr` | CodeRabbit review + code-simplifier fix loop | `/review-cr . --max-cycles 10` |
| `/review-rp` | RepoPrompt quality gate (manage_workspaces + manage_selection + chat_send) | `/review-rp . --gate` |

See their respective SKILL.md files for full details.

## Ralph Loop Integration

When wrapped by `/ralph-loop`, this skill outputs a completion promise when all tasks pass review and merge successfully. The ralph-loop stop hook detects this and terminates the loop.

- On success: output `<promise>PLAN COMPLETE</promise>`
- On partial failure: do NOT output the promise — ralph-loop feeds the same plan again, and the skill picks up where it left off (skipping already-merged tasks)

## CRITICAL EXECUTION RULE: ONE STEP AT A TIME

**DO NOT batch steps. DO NOT run ahead. DO NOT assume a step succeeded.**

Every numbered step MUST be executed individually:
1. Execute ONE step
2. Read its output
3. VERIFY it succeeded (check exit codes, check files exist, check expected output)
4. ONLY THEN move to the next step

If a step fails: STOP. Diagnose. Fix. Re-verify. Then continue.

**This is not a suggestion — it is the primary operating constraint of this skill.**

## Command

`/forge <plan>` — Forge a markdown plan into reviewed, merged code.

### Arguments

- **`<plan>`** — Either:
  - A file path to a markdown plan (e.g., `docs/plans/my-feature.md`)
  - Inline markdown text describing the tasks

### Model Flag

Append `fast` to use the lightweight model:

- **`/forge <plan>`** — Default Codex model
- **`/forge fast <plan>`** — Uses `--model gpt-5.3-codex-spark`

## Prerequisites Check

Before launching, verify all required tools are available:

```bash
command -v codex >/dev/null 2>&1 || { echo "ERROR: codex not found"; exit 1; }
command -v tmux >/dev/null 2>&1 || { echo "ERROR: tmux not found. Install with: brew install tmux"; exit 1; }
command -v git-gtr >/dev/null 2>&1 || { echo "ERROR: git-gtr not found. Install from https://github.com/coderabbitai/git-worktree-runner"; exit 1; }
```

## Phase 1 — Parse the Plan

### Step 1: Read the Plan

If the argument is a file path, read the file. Otherwise, treat it as inline markdown.

### Step 2: Extract Tasks

Parse the plan into discrete, parallelizable tasks. Look for:

- **`## Implementation Order`** section — numbered steps
- **`## File Changes`** section — grouped by file/module
- **Numbered lists** — each item becomes a task
- **H2/H3 headings** with distinct work units

For each task, extract:
- **Task ID** — `task-NN` (e.g., `task-01`, `task-02`)
- **Summary** — Short description (used as branch name suffix)
- **Full description** — Complete context for the Codex agent prompt
- **Files involved** — List of files this task touches (for review scoping)
- **Dependencies** — Which tasks must complete before this one (if any)

### Step 3: Determine Feature Branch Name

Derive from the plan title or ask the user:
- `"Implementation Plan: User Authentication"` → `feature/user-authentication`
- If unclear, use AskUserQuestion to confirm the branch name.

### Step 4: Confirm with User

Present the parsed task breakdown to the user:

```
Plan: <title>
Feature branch: <branch-name>
Tasks:
  task-01: <summary> (files: a.ts, b.ts)
  task-02: <summary> (files: c.ts, d.ts)
  task-03: <summary> (depends on: task-01)
```

Use AskUserQuestion to confirm or let the user adjust the split.

## Phase 2 — Session Setup

### Step 1: Create Feature Branch

```bash
REPO_DIR=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
REPO_NAME=$(basename "$REPO_DIR")
git checkout -b "<feature-branch-name>"
```

**Verify:** `git branch --show-current` — must show the feature branch.

### Step 2: Generate Session Directory

```bash
SESSION_TS=$(date +%Y%m%d-%H%M%S)
SESSION_DIR="/tmp/forge-${SESSION_TS}"
mkdir -p "$SESSION_DIR"
```

**Verify:** `ls -d "$SESSION_DIR"` — must exist.

### Step 3: Create Worktrees

For each task (NN = 01, 02, ...):

```bash
BRANCH_NAME="plan-${SESSION_TS}-task-${NN}"
git gtr new "$BRANCH_NAME"
WORKTREE_DIR=$(git gtr go "$BRANCH_NAME")
```

**Verify each worktree:** `ls -d "$WORKTREE_DIR"` — must exist before continuing.

### Step 4: Create Agent Directories and Prompts

For each task:

```bash
AGENT_DIR="${SESSION_DIR}/task-${NN}"
mkdir -p "$AGENT_DIR"
```

Write `${AGENT_DIR}/prompt.txt` combining:
1. The task's full description from the plan
2. Relevant context from the overall plan (architecture decisions, design patterns, constraints)
3. List of specific files this task should modify
4. The git policy instruction:

```
IMPORTANT: Do NOT run any git commands (no git commit, git add, git branch, git stash, git checkout, git reset, etc.). Only make code changes. Version control will be handled separately.
```

**Verify:** `cat "${AGENT_DIR}/prompt.txt" | head -3` — must contain the prompt.

### Step 5: Generate run.sh Per Agent

Read the template from `~/.claude/skills/forge/assets/agent-runner.template.sh` and substitute placeholders:

| Placeholder | Value |
|-------------|-------|
| `{{AGENT_ID}}` | `task-NN` (e.g., `task-01`) |
| `{{AGENT_DIR}}` | Full path to agent's directory |
| `{{REPO_DIR}}` | Worktree path for this agent (from `git gtr go <branch>`) |
| `{{SESSION_DIR}}` | Session directory path |
| `{{MODEL_FLAG}}` | `--model gpt-5.3-codex-spark` if `fast`, empty string otherwise |

Write to `${AGENT_DIR}/run.sh` and `chmod +x`.

**Verify:** `ls -la "${AGENT_DIR}/run.sh"` — must be executable.

### Step 6: Launch tmux Session

```bash
SESSION_NAME="${REPO_NAME}-plan-${SESSION_TS}"
```

#### 6a: Create tmux session with first agent

```bash
tmux new-session -d -s "$SESSION_NAME" -n "swarm" "${SESSION_DIR}/task-01/run.sh"
```

**Verify:** `tmux has-session -t "$SESSION_NAME" 2>/dev/null && echo "OK" || echo "FAILED"`

#### 6b: Add panes for additional agents (non-dependent tasks only)

For each additional task that has no unmet dependencies:

```bash
tmux split-window -t "$SESSION_NAME:swarm" "${SESSION_DIR}/task-${NN}/run.sh"
tmux select-layout -t "$SESSION_NAME:swarm" tiled
```

Tasks with dependencies wait — launch them after their blockers complete.

**Verify:** `tmux list-panes -t "$SESSION_NAME:swarm" | wc -l` — must match launched agent count.

### Step 7: Write Session Metadata

```bash
cat > "${SESSION_DIR}/session.json" << EOF
{
  "session_name": "${SESSION_NAME}",
  "feature_branch": "<feature-branch-name>",
  "repo_dir": "${REPO_DIR}",
  "created_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "task_count": <N>,
  "tasks": [
    {"id": "task-01", "branch": "plan-...-task-01", "prompt_file": "task-01/prompt.txt", "status_file": "task-01/status", "depends_on": []},
    ...
  ]
}
EOF
```

**Verify:** `cat "${SESSION_DIR}/session.json" | python3 -m json.tool` — must be valid JSON.

## Phase 3 — Monitor Agents

Poll agent status periodically (~15 seconds). **ONE CHECK AT A TIME.**

### Check Status

```bash
cat "${AGENT_DIR}/status"
```

Values: `running`, `completed`, `failed`

### Read JSONL Tail for Running Agents

```bash
tail -20 "${AGENT_DIR}/output.jsonl" 2>/dev/null
```

### Progress Report

```
Task      | Status    | Last Activity
----------|-----------|------------------------------
task-01   | running   | Executing: shell command...
task-02   | completed | Done: implemented feature X
task-03   | pending   | Waiting on: task-01
```

### Launch Dependent Tasks

When a blocker completes, launch its dependents:

```bash
tmux split-window -t "$SESSION_NAME:swarm" "${SESSION_DIR}/task-${NN}/run.sh"
tmux select-layout -t "$SESSION_NAME:swarm" tiled
```

### On Agent Failure

1. Read `output.jsonl` to understand what went wrong
2. Options:
   - **Restart with refined prompt**: Write updated `prompt.txt`, re-run
   - **Abort**: Mark as permanently failed, report to user

## Phase 4 — Review-Fix Loop Per Worktree

After **all agents** complete, run the composable review pipeline on each worktree. This composes two standalone skills:

1. **`/review-cr`** — CodeRabbit review + code-simplifier fix loop (max 10 cycles)
2. **`/review-rp`** — RepoPrompt final quality gate

These skills are standalone — see their SKILL.md files for full details. Here we document how forge composes them.

### For Each Completed Task Worktree:

#### Step 1: Get the Worktree Path

```bash
WORKTREE_DIR=$(git gtr go "plan-${SESSION_TS}-task-${NN}")
```

**Verify:** `ls -d "$WORKTREE_DIR"` — must exist.

#### Step 2: CodeRabbit Review + Fix Loop (`/review-cr`)

Invoke the `/review-cr` skill on the worktree:

```
/review-cr "$WORKTREE_DIR" --target uncommitted --max-cycles 10 --context "Task-${NN}: <task description from plan>"
```

This runs the full CodeRabbit → code-simplifier fan-out → re-review loop. See `/review-cr` SKILL.md for details on:
- Finding categorization (critical/suggestion/nitpick)
- Parallel code-simplifier subagent fan-out (one per file/group)
- Re-review cycle logic (max 10 iterations)

**If `/review-cr` returns FAIL** (critical findings remain after max cycles):
- Log the remaining issues to `${AGENT_DIR}/review-cr-result.md`
- RepoPrompt gate will catch anything critical — proceed

#### Step 3: RepoPrompt Final Quality Gate (`/review-rp`)

Invoke the `/review-rp` skill on the worktree:

```
/review-rp "$WORKTREE_DIR" --base "$FEATURE_BRANCH" --gate --context "Task-${NN}: <task description>. Prior CodeRabbit findings: <summary of any remaining issues>"
```

This runs the full RepoPrompt review: manage_workspaces → manage_selection → chat_send(mode="review"). See `/review-rp` SKILL.md for details on:
- Workspace setup and file selection
- Review prompt and categorization
- Follow-up analysis via chat_send
- Cleanup

**If `/review-rp` returns FAIL in gate mode:**
- One more code-simplifier pass on the flagged issues:
  ```
  Task(
    subagent_type="code-simplifier",
    description="Fix RP findings in task-${NN}",
    prompt="<RepoPrompt findings + file paths + constraint: no git commands>"
  )
  ```
- Re-run `/review-rp` with `--gate`
- If still FAIL → report to user, ask whether to proceed or abort

#### Step 4: Worktree Approved

When both `/review-cr` and `/review-rp` pass, the worktree is approved for merge. Proceed to Phase 5.

## Phase 5 — Merge to Feature Branch

After all worktrees pass review, merge each task branch into the feature branch.

### For Each Reviewed Task (in dependency order):

#### Step 1: Commit Changes in Worktree

```bash
WORKTREE_DIR=$(git gtr go "plan-${SESSION_TS}-task-${NN}")
cd "$WORKTREE_DIR"
git add -A
git commit -m "task-${NN}: <task summary>

Part of plan-swarm session ${SESSION_TS}.
Implements: <brief description of what this task accomplished>

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>"
```

**Verify:** `git log --oneline -1` in the worktree — must show the commit.

#### Step 2: Merge into Feature Branch

```bash
cd "$REPO_DIR"
git merge "plan-${SESSION_TS}-task-${NN}" --no-ff -m "Merge task-${NN}: <task summary>"
```

**If merge conflicts occur:**
1. Report the conflict to the user with file details
2. Use `manage_selection` to select conflicting files, then `chat_send(mode="review")` to analyze the conflict
3. Either resolve automatically (if straightforward) or ask the user

**Verify:** `git log --oneline -3` — must show the merge commit.

#### Step 3: Continue with Next Task

Repeat for all tasks in dependency order.

## Phase 6 — Final Review

After all tasks are merged into the feature branch, run the composable review pipeline on the combined result. Same skills as Phase 4, but scoped to the full branch.

### Step 1: CodeRabbit Review + Fix on Full Branch (`/review-cr`)

```
/review-cr "$REPO_DIR" --target branch --base main --max-cycles 3 --context "Full feature branch review. Focus on cross-task integration: duplicate code, inconsistent patterns, boundary error handling."
```

Max 3 cycles at this stage (individual worktrees already went through 10).

### Step 2: RepoPrompt Final Gate (`/review-rp`)

```
/review-rp "$REPO_DIR" --base main --gate --context "Final gate on complete feature branch. All individual worktrees passed review. Check for cross-task integration issues."
```

If `/review-rp` returns FAIL, one more code-simplifier pass then re-gate.

### Step 3: Report to User

Present:
- Summary of what was accomplished per task
- Review cycles completed and issues resolved
- Any remaining findings
- The feature branch name and status
- Suggest next steps: `glab mr create`, additional testing, etc.

### Step 4: Ralph Loop Completion

If all tasks passed and the feature branch is clean:

```
<promise>PLAN COMPLETE</promise>
```

This signals ralph-loop to stop iterating. If NOT all tasks passed, do NOT output the promise — ralph-loop will feed the same plan for another attempt.

## Phase 7 — Cleanup

### Remove Worktrees

```bash
# Remove individual task worktrees
git gtr rm plan-${SESSION_TS}-task-01
git gtr rm plan-${SESSION_TS}-task-02
# ... for each task

# Or remove all at once
git gtr clean
```

**Always confirm with user before cleanup.**

### Kill tmux Session

```bash
tmux kill-session -t "$SESSION_NAME"
```

### Remove RepoPrompt Workspaces

Use `manage_workspaces` with action `remove` to clean up added worktree workspaces.

### Session Directory

Located in `/tmp/forge-*` — cleaned automatically on system restart.

## Sandbox Limitations

Codex agents run in a sandboxed environment and **cannot**:
- Install packages (`npm install`, `pip install`, etc.)
- Run dev servers or long-lived processes
- Access network services or external APIs

**When a task requires any of these**, use Claude's `Task` tool to launch an **Opus subagent** instead of a Codex agent. Mix both in a single session as needed.

## Git Policy

**Agents MUST NOT run any git commands.** No commits, no branches, no stashing. Agents only make code changes — version control is handled by Claude in Phase 5.

## Error Recovery

- **Codex agent fails**: Check output.jsonl, restart with refined prompt or abort
- **`/review-cr` returns FAIL**: Critical findings remain after max cycles — `/review-rp` gate will catch them, or report to user
- **`/review-rp` gate fails**: One more code-simplifier pass, then re-gate. If still failing, report to user
- **Merge conflict**: Use `/review-rp` (manage_selection + chat_send) to analyze conflicting files, auto-resolve or ask user
- **All agents fail**: Report to user, suggest running `/plan-build` to refine the plan
- **Ralph loop re-entry**: If wrapped by `/ralph-loop` and promise not emitted, skill resumes — detects already-merged tasks and skips them, only re-processing failed/unreviewed worktrees
