---
name: codex-swarm
description: "Orchestrate Codex CLI agents in Zellij panes. Use for: delegate task to codex, run multiple codex agents, swarm agents, parallel codex tasks, split work across agents, monitor agent progress. Modes: /delegate (single agent) and /swarm (multiple pipe-delimited agents)."
---

# Codex Swarm Skill

Orchestrate one or more Codex CLI agents in Zellij terminal panes. Claude acts as supervisor — launching agents, monitoring JSONL output, reporting progress, and intervening on failures.

## Modes

- **`/delegate <prompt>`** — Launch a single Codex agent in a new Zellij pane
- **`/swarm <prompt1> | <prompt2> | ...`** — Launch N agents in a multi-pane Zellij layout

### Model Flag

Append `fast` to use the lightweight `gpt-5.3-codex-spark` model instead of the default:

- **`/delegate fast <prompt>`**
- **`/swarm fast <prompt1> | <prompt2> | ...`**

When `fast` is specified, pass `--model gpt-5.3-codex-spark` to all `codex exec` invocations. Default (no flag) uses whatever model Codex is configured with.

## Prerequisites Check

Before launching, verify all required tools are available:

```bash
command -v codex >/dev/null 2>&1 || { echo "ERROR: codex not found"; exit 1; }
command -v zellij >/dev/null 2>&1 || { echo "ERROR: zellij not found"; exit 1; }
command -v git-gtr >/dev/null 2>&1 || { echo "ERROR: git-gtr not found. Install from https://github.com/coderabbitai/git-worktree-runner"; exit 1; }
```

## Session Setup Workflow

Follow these steps exactly:

### Step 1: Generate Session Directory

```bash
SESSION_TS=$(date +%Y%m%d-%H%M%S)
SESSION_DIR="/tmp/codex-swarm-${SESSION_TS}"
mkdir -p "$SESSION_DIR"
```

### Step 2: Detect Repository Root and Create Worktrees

```bash
REPO_DIR=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
REPO_NAME=$(basename "$REPO_DIR")
```

**Create a worktree per agent** for filesystem isolation:

```bash
# For each agent (NN = 01, 02, ...):
BRANCH_NAME="swarm-${SESSION_TS}-agent-${NN}"
git gtr new "$BRANCH_NAME"
WORKTREE_DIR=$(git gtr go "$BRANCH_NAME")
```

Each agent runs in its own worktree under `~/repos/worktrees/<repo>/`. This eliminates filesystem conflicts — agents can freely modify any file without stepping on each other.

### Step 3: Parse Prompts

- **`/delegate`**: Single prompt, create 1 agent
- **`/swarm`**: Split on ` | ` (space-pipe-space) delimiter. Trim whitespace from each segment.

### Step 4: Create Agent Directories

For each agent (NN = 01, 02, ...):

```bash
AGENT_DIR="${SESSION_DIR}/agent-${NN}"
mkdir -p "$AGENT_DIR"
```

Write the prompt to avoid shell escaping issues:

```bash
cat > "${AGENT_DIR}/prompt.txt" << 'PROMPT_EOF'
<the agent's prompt text>
PROMPT_EOF
```

### Step 5: Generate run.sh Per Agent

Read the template from `~/.claude/skills/codex-swarm/assets/agent-runner.template.sh` and substitute placeholders:

| Placeholder | Value |
|-------------|-------|
| `{{AGENT_ID}}` | `agent-NN` (e.g., `agent-01`) |
| `{{AGENT_DIR}}` | Full path to agent's directory |
| `{{REPO_DIR}}` | Worktree path for this agent (from `git gtr go <branch>`) |
| `{{SESSION_DIR}}` | Session directory path |
| `{{MODEL_FLAG}}` | `--model gpt-5.3-codex-spark` if `fast`, empty string otherwise |

**Important:** `{{REPO_DIR}}` now points to the agent's **worktree**, not the main repo. Each agent operates in its own isolated copy.

Write the result to `${AGENT_DIR}/run.sh` and make executable:

```bash
chmod +x "${AGENT_DIR}/run.sh"
```

### Step 6: Generate Zellij Layout KDL

Generate a layout `.kdl` file dynamically at `${SESSION_DIR}/layout.kdl` based on agent count:

| Agents | Layout Strategy |
|--------|----------------|
| 1 | Single pane (full screen) |
| 2 | Vertical split (side by side) |
| 3-4 | 2x2 grid |
| 5-6 | 3x2 grid (3 columns, 2 rows) |
| 7+ | One tab per agent |

Use `~/.claude/skills/codex-swarm/assets/layout-single.template.kdl` and `layout-swarm.template.kdl` as references for KDL syntax. Generate the actual layout dynamically — do NOT just copy templates.

Each pane must specify:
- `command "bash"` with `args "-c" "${AGENT_DIR}/run.sh"`
- `name "agent-NN"` for identification

### Step 7: Launch Zellij Session

```bash
SESSION_NAME="${REPO_NAME}-swarm-${SESSION_TS}"
```

**If NOT already inside Zellij** (`$ZELLIJ` env var unset):

```bash
zellij --layout "${SESSION_DIR}/layout.kdl" --session "$SESSION_NAME"
```

Note: this launches zellij in the foreground and blocks, so run it in background or via a separate terminal invocation. Prefer launching with:

```bash
zellij --layout "${SESSION_DIR}/layout.kdl" --session "$SESSION_NAME" &
```

**If already inside Zellij** (`$ZELLIJ` is set):

```bash
zellij action new-tab --layout "${SESSION_DIR}/layout.kdl"
```

### Step 8: Write Session Metadata

```bash
cat > "${SESSION_DIR}/session.json" << EOF
{
  "session_name": "${SESSION_NAME}",
  "repo_dir": "${REPO_DIR}",
  "created_at": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "agent_count": <N>,
  "agents": [
    {"id": "agent-01", "prompt_file": "agent-01/prompt.txt", "status_file": "agent-01/status"},
    ...
  ]
}
EOF
```

## Monitoring Workflow

After launching agents, poll their status periodically (~15 seconds). For each agent:

### Check Status

```bash
cat "${AGENT_DIR}/status"
```

Values: `running`, `completed`, `failed`

### Read JSONL Tail for Running Agents

```bash
tail -20 "${AGENT_DIR}/output.jsonl" 2>/dev/null
```

Key JSONL events to look for:

| Event Type | Meaning |
|-----------|---------|
| `"type": "thread.started"` | Agent has started processing |
| `"type": "item.created"` with `"type": "function_call"` | Agent is executing a tool |
| `"type": "item.created"` with `"type": "message"` | Agent produced a message |
| `"type": "turn.completed"` | Agent completed a turn successfully |
| `"type": "turn.failed"` | Agent turn failed — check error |
| `"type": "exec.completed"` | Agent finished execution |

### Read Results for Completed Agents

```bash
cat "${AGENT_DIR}/result.txt" 2>/dev/null
```

This contains the final output from `codex exec -o result.txt`.

### Progress Report Format

Report a table to the user:

```
Agent     | Status    | Last Activity
----------|-----------|------------------------------
agent-01  | running   | Executing: shell command...
agent-02  | completed | Done: implemented feature X
agent-03  | failed    | Error: permission denied
```

## Intervention Strategies

### On Agent Failure

1. Read `output.jsonl` to understand what went wrong
2. Options:
   - **Restart with refined prompt**: Write updated `prompt.txt`, re-run `run.sh`
   - **Pre-stage context**: Write helper files to the agent dir before restart
   - **Abort**: Mark as permanently failed, report to user

### Restarting an Agent

```bash
# Write new prompt
cat > "${AGENT_DIR}/prompt.txt" << 'EOF'
<refined prompt with context from failure>
EOF

# Reset status
echo "pending" > "${AGENT_DIR}/status"

# Re-launch in the existing pane (or new pane)
zellij action new-pane -- bash -c "${AGENT_DIR}/run.sh"
```

## Git Policy

**Agents MUST NOT run any git commands.** No commits, no branches, no stashing, no checkouts, no resets. Agents only make code changes — version control is handled by the user afterward (e.g., via GitButler or manual git).

When writing `prompt.txt` for each agent, **always append** the following instruction:

```
IMPORTANT: Do NOT run any git commands (no git commit, git add, git branch, git stash, git checkout, git reset, etc.). Only make code changes. Version control will be handled separately.
```

## Sandbox Limitations

Codex agents run in a sandboxed environment and **cannot** perform actions that require system-level access, such as:
- Installing packages (`npm install`, `pip install`, `cargo install`, `brew install`, etc.)
- Running dev servers or long-lived processes
- Accessing network services or external APIs
- Modifying system configuration

**When a task requires any of these**, do NOT assign it to a Codex agent. Instead, use Claude's `Task` tool to launch an **Opus subagent** for that task. The subagent runs outside the sandbox and has full system access.

When splitting work via `/swarm`, evaluate each prompt:
- **Code-only changes** (editing files, writing tests, refactoring) → Codex agent
- **Requires install/run/network** (dependency setup, running test suites, API calls) → Opus subagent via `Task` tool

You can mix both in a single swarm session — launch Codex agents for the code tasks in Zellij panes, and handle the system tasks via subagents in parallel.

## Worktree Isolation

Each agent runs in its own git worktree (via `git gtr`), so there are **no filesystem conflicts**. Agents can freely modify any file — their changes are on separate branches in isolated directories under `~/repos/worktrees/<repo>/`.

After all agents complete:
- Each agent's changes are on a separate branch (e.g., `swarm-20260212-143000-agent-01`)
- Review changes per-branch, then merge into the working branch
- Use `git gtr rm <branch>` to clean up worktrees when done

This replaces the old approach of "assign non-overlapping files" — worktrees provide true isolation at the filesystem level.

## Post-Completion Review Loop

After **all agents** have completed successfully, run an automated review-fix cycle before committing.

### Step 1: Run Reviews in Parallel

Launch both reviews simultaneously:

1. **CodeRabbit** — invoke the `coderabbit:review` skill on uncommitted changes:
   ```
   /coderabbit:review -t uncommitted
   ```
2. **Claude's own review** — while CodeRabbit runs, Claude reads the changed files directly (`git diff`) and performs its own review against CLAUDE.md guidelines, design patterns, error handling, test coverage, and the original task requirements.

Both reviews happen concurrently. Merge findings from both into a single list, deduplicating overlapping items.

### Step 2: Parse Review Items

Read the combined output from both reviews. For each review item, categorize:
- **File path** affected
- **Severity** (critical, suggestion, nitpick)
- **Description** of what needs fixing

Filter out pure nitpicks — focus on critical issues and meaningful suggestions.

### Step 3: Dispatch Fixes

If there are actionable review items:

1. Group review items by file/directory ownership (matching original agent scopes where possible)
2. For each group, create a new iteration:
   - Write a `prompt.txt` containing the original agent's context + the specific review feedback to address
   - Append the no-git instruction
   - Launch via Codex agent in Zellij (new pane or tab)
3. Monitor and wait for all fix agents to complete (same as main monitoring loop)

### Step 4: Re-Review

After fix agents complete, run CodeRabbit review again:

```
/coderabbit:review -t uncommitted
```

### Step 5: Iterate or Finalize

- **If new issues found** → repeat from Step 3
- **Maximum 3 review-fix cycles** — after that, report remaining items to the user and ask whether to continue or accept
- **If clean** (no actionable items) → proceed to commit and PR

### Step 6: Commit and PR

Once the review loop passes clean:

1. Stage and commit the changes with a descriptive message summarizing what the swarm accomplished
2. Create a PR using `gh pr create` with:
   - Title summarizing the swarm's task
   - Body listing what each agent did
   - Review items that were addressed in fix cycles
3. Report the PR URL to the user

## Cleanup

### Kill Zellij Session

```bash
zellij kill-session "$SESSION_NAME"
```

### Remove Worktrees

After reviewing and merging agent branches, clean up worktrees:

```bash
# Remove individual agent worktrees
git gtr rm swarm-${SESSION_TS}-agent-01
git gtr rm swarm-${SESSION_TS}-agent-02

# Or remove all worktrees at once
git gtr clean
```

### Session Directory

Located in `/tmp/codex-swarm-*` — cleaned automatically on system restart. To clean manually:

```bash
rm -rf "${SESSION_DIR}"
```

### List Active Swarm Sessions

```bash
ls -d /tmp/codex-swarm-* 2>/dev/null
git gtr list    # Shows all active worktrees
```
