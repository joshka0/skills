---
name: plan-build
description: "Iterative implementation plan builder using Codex for codebase analysis. Use for: implementation plan, architecture plan, design plan, plan builder, plan build, structured planning, codex plan. Claude asks clarifying questions, delegates drafting to Codex, reviews strictly, iterates until quality bar met, saves to docs/plans/."
---

# Plan-Build Skill

Build high-quality implementation plans through iterative Claude–Codex collaboration. Claude acts as product owner and quality gate; Codex drafts plans with deep codebase analysis; the loop repeats until the plan meets Claude's quality bar.

## CRITICAL EXECUTION RULE: ONE STEP AT A TIME

**DO NOT batch steps. DO NOT run ahead. DO NOT assume a step succeeded.**

Every numbered step in every phase MUST be executed individually:
1. Execute ONE step
2. Read its output
3. VERIFY it succeeded (check exit codes, check files exist, check expected output)
4. ONLY THEN move to the next step

If a step fails: STOP. Diagnose. Fix. Re-verify. Then continue.

**This is not a suggestion — it is the primary operating constraint of this skill.** Violating this rule leads to cascading failures that waste entire iterations.

## Command

`/plan-build [fast] <description>` — Build an implementation plan for the given feature/task description.

### Model Flag

Append `fast` to use the lightweight `gpt-5.3-codex-spark` model instead of the default:

- **`/plan-build <description>`** — Default Codex model
- **`/plan-build fast <description>`** — Uses `--model gpt-5.3-codex-spark` (lighter, faster)

When `fast` is specified, pass `--model gpt-5.3-codex-spark` to the `codex` invocation.

## Prerequisites

Before starting, verify required tools are installed:

```bash
command -v codex >/dev/null 2>&1 || { echo "ERROR: codex CLI not found. Install from https://github.com/openai/codex"; exit 1; }
command -v tmux >/dev/null 2>&1 || { echo "ERROR: tmux not found. Install with: brew install tmux"; exit 1; }
```

If either is missing, inform the user with install instructions and stop.

## Phase 1 — User Understanding

**Claude MUST ask clarifying questions before invoking Codex.** Use AskUserQuestion to gather context across these categories:

### Question Categories

1. **Design Patterns & Architecture**
   - What architectural style? (monolith, microservices, modular monolith, event-driven)
   - Which design patterns are preferred? (repository, CQRS, observer, strategy, etc.)
   - State management approach? (Redux, Zustand, context, signals, etc.)
   - Data flow direction? (unidirectional, bidirectional, pub-sub)

2. **UI/UX Preferences** (if applicable)
   - Component library or design system? (Tailwind, shadcn, Material, custom)
   - Responsive approach? (mobile-first, desktop-first, adaptive)
   - Accessibility requirements? (WCAG level, screen reader support)

3. **Coding Practices & Constraints**
   - Error handling strategy? (Result types, exceptions, error boundaries)
   - Logging approach? (structured, levels, observability)
   - Testing philosophy? (TDD, coverage targets, test types)
   - Type safety level? (strict, gradual, runtime validation)

4. **Scope Boundaries**
   - What is explicitly IN scope?
   - What is explicitly OUT of scope?
   - Which files/modules/packages will be affected?
   - Are there existing patterns in the codebase to follow?

5. **Non-Functional Requirements**
   - Performance budgets? (load time, response time, bundle size)
   - Backward compatibility requirements?
   - Dependency constraints? (no new deps, specific versions, license restrictions)
   - Security considerations? (auth, input validation, OWASP concerns)

### Questioning Rules

- **Minimum 1 round** of questions before proceeding.
- **Maximum 3 rounds** — after that, proceed with what you have.
- Adapt questions to the task — skip irrelevant categories (e.g., no UI questions for a backend-only task).
- If the user says "just go" or similar, proceed with sensible defaults and note assumptions.
- Combine related questions into a single AskUserQuestion call (2-4 questions per round).

## Phase 2 — Session Setup

Once enough context is gathered, set up the Codex session. **Execute each step individually. Verify before proceeding.**

### Step 1: Generate Session Directory

```bash
TIMESTAMP=$(date +%s)
SESSION_DIR="/tmp/plan-build-${TIMESTAMP}"
mkdir -p "${SESSION_DIR}"
```

**Verify:** `ls -d "${SESSION_DIR}"` — directory must exist before continuing.

### Step 2: Detect Repository Root

```bash
REPO_DIR=$(git rev-parse --show-toplevel 2>/dev/null)
if [ -z "$REPO_DIR" ]; then
    echo "WARNING: Not in a git repository. Using current directory."
    REPO_DIR=$(pwd)
fi
```

**Verify:** `echo "$REPO_DIR"` — must be a valid directory.

### Step 3: Determine Plan Name

Derive a kebab-case name from the description for the output file:
- `"add user authentication"` → `user-authentication`
- `"refactor payment processing module"` → `refactor-payment-processing`

### Step 4: Create First Iteration

```bash
ITERATION="iteration-01"
ITERATION_DIR="${SESSION_DIR}/${ITERATION}"
mkdir -p "${ITERATION_DIR}"
```

**Verify:** `ls -d "${ITERATION_DIR}"` — directory must exist.

### Step 5: Write Initial Prompt

Write `${ITERATION_DIR}/prompt.txt` combining:
1. The user's original description
2. All clarified context from Phase 1 (design patterns, constraints, scope, etc.)
3. The plan structure template (read from `assets/plan-structure.template.md`)
4. Instruction to analyze the codebase thoroughly before planning
5. Instruction to output the plan in the specified markdown format
6. Instruction to write the final plan to `${ITERATION_DIR}/result.txt`
7. The git policy instruction (see below)

The prompt should be comprehensive — this is Codex's first input in a persistent session.

**Every prompt MUST include these mandatory instructions** (initial and revision):

```
CRITICAL — OUTPUT REQUIREMENTS:
1. You MUST save your complete plan to a file. Do NOT just print it to the screen.
   Write the full plan to: <iteration_dir>/result.txt
2. After writing result.txt, write the single word "completed" to: <iteration_dir>/status
3. Do NOT run any git commands (no git commit, git add, git branch, git stash, git checkout, git reset, etc.). Only read and analyze the codebase. Version control will be handled separately.
```

**Why this matters:** Codex output in the terminal scrolls off screen and cannot be recovered. The plan MUST be written to `result.txt` so Claude can read and review it. If Codex only prints to stdout, the plan is lost.

**Verify:** `cat "${ITERATION_DIR}/prompt.txt" | head -5` — file must exist and contain the prompt.

### Step 6: Generate Runner Script

Read the template from `assets/plan-runner.template.sh` and substitute placeholders:

| Placeholder | Value |
|-------------|-------|
| `{{ITERATION}}` | e.g., `iteration-01` |
| `{{ITERATION_DIR}}` | Full path to iteration directory |
| `{{REPO_DIR}}` | Repository root path |
| `{{SESSION_DIR}}` | Session directory path |
| `{{MODEL_FLAG}}` | `--model gpt-5.3-codex-spark` if `fast`, empty string otherwise |

Write the result to `${SESSION_DIR}/run.sh` and make it executable (`chmod +x`).

**Verify:** `ls -la "${SESSION_DIR}/run.sh"` — must be executable.

### Step 7: Launch tmux and Start Codex (Step-by-Step)

**STOP. Execute each sub-step individually. Do NOT combine commands. Verify each before moving on.**

Determine the session name:
```bash
REPO_NAME=$(basename "$REPO_DIR")
TMUX_SESSION="${REPO_NAME}-plan-${TIMESTAMP}"
```

#### 7a: Start tmux session (detached)

```bash
tmux new-session -d -s "$TMUX_SESSION" -c "$REPO_DIR"
```

**Verify:** `tmux has-session -t "$TMUX_SESSION" 2>/dev/null && echo "OK" || echo "FAILED"` — must print OK before continuing.

#### 7b: cd to the repo directory

```bash
tmux send-keys -t "$TMUX_SESSION" "cd ${REPO_DIR}" Enter
sleep 1
```

**Verify:** Capture pane and check working directory:
```bash
tmux capture-pane -t "$TMUX_SESSION" -p | tail -5
```

#### 7c: Start Codex in full-auto mode

```bash
# $MODEL_FLAG is "--model gpt-5.3-codex-spark" if fast, empty otherwise
tmux send-keys -t "$TMUX_SESSION" "codex --full-auto $MODEL_FLAG" Enter
```

**Wait for Codex to fully initialize** — this can take 10-15 seconds, or longer if Codex auto-updates:

```bash
sleep 15
```

#### 7d: Verify Codex is ready

Capture the pane and check for the Codex prompt (`>` or `›`):

```bash
tmux capture-pane -t "$TMUX_SESSION" -p | tail -15
```

Look for the `>` or `›` prompt character. If you see Codex updating, wait and check again. If Codex exited after an update, restart it (repeat 7c).

**DO NOT PROCEED until you see the Codex prompt.** Check up to 3 times with 10s sleeps.

#### 7e: Clear any stale input

Before sending the prompt, ensure the input field is clean:

```bash
# Ctrl+U to clear input line
tmux send-keys -t "$TMUX_SESSION" C-u
sleep 0.5
```

### Step 8: Send Initial Prompt

Send a **short** single-line instruction telling Codex to read the prompt file. Do NOT paste the full prompt as keystrokes — it's too long and will break.

```bash
tmux send-keys -t "$TMUX_SESSION" "Read and follow the instructions in ${ITERATION_DIR}/prompt.txt" Enter
```

#### Critical tmux Keystroke Notes

| Action | tmux send-keys | Notes |
|--------|----------------|-------|
| Submit input | `Enter` | Sends Enter key |
| Clear input line | `C-u` (Ctrl+U) | Clears current input buffer |
| Cancel/interrupt | `C-c` (Ctrl+C) | **WARNING: This kills Codex** — do NOT use to clear input |

### Step 9: Write Session Metadata

Write `${SESSION_DIR}/session.json`:
```json
{
    "skill": "plan-build",
    "description": "<user's description>",
    "repo_dir": "<repo root>",
    "session_dir": "<session dir>",
    "tmux_session": "<session name>",
    "plan_name": "<kebab-case-name>",
    "created_at": "<ISO 8601 timestamp>",
    "iterations": ["iteration-01"],
    "status": "running"
}
```

**Verify:** `cat "${SESSION_DIR}/session.json" | python3 -m json.tool` — must be valid JSON.

## Phase 3 — Monitor & Wait

Since Codex runs in interactive mode (not `codex exec`), there are no JSONL event streams or status files to poll. Monitor via **pane captures**.

### Monitoring Loop

**ONE CHECK AT A TIME. Read the output. Interpret it. Then decide whether to check again or proceed.**

```
Every ~30 seconds:
1. Capture the tmux pane:
   tmux capture-pane -t "$TMUX_SESSION" -p | tail -20

2. Check the output:
   - If Codex is still working (showing tool calls, "Exploring", "Writing", etc.):
     → Report progress to user, continue waiting
   - If Codex shows its idle prompt (› or >) with no active operation:
     → Codex is done, proceed to Phase 4
   - If the screen shows an error or Codex exited:
     → Report error, ask user whether to restart or abort

3. Also check if result.txt was written:
   ls -la ${ITERATION_DIR}/result.txt
   (Codex was instructed to write its output here)
```

### What to Look For in Pane Captures

| Pane content | Meaning |
|--------------|---------|
| `Exploring`, `Reading`, `Searching` | Codex is analyzing the codebase |
| `Writing`, `Editing` | Codex is producing output |
| `›` or `>` at bottom with no activity | Codex is idle — check if result.txt exists |
| Error messages, stack traces | Something went wrong |
| Shell prompt (`$`) without Codex UI | Codex exited — needs restart (repeat Step 7c) |

Report meaningful progress updates — don't spam the user with every check.

## Phase 4 — Review

Once Codex completes, Claude performs a **strict review** of the plan.

### Read the Result

Read `${ITERATION_DIR}/result.txt` — this is Codex's drafted implementation plan.

**Verify the file exists and is non-empty before reviewing:**
```bash
wc -l "${ITERATION_DIR}/result.txt"
```

### Review Checklist

Evaluate the plan against ALL of these criteria:

- [ ] **Problem statement** is clear and matches user's original intent
- [ ] **Architecture decisions** have explicit rationale (not just "we'll use X")
- [ ] **File changes** are specific — exact file paths, not vague descriptions like "update the config"
- [ ] **Design patterns** are appropriate for the problem and named explicitly
- [ ] **Testing strategy** covers unit tests, integration tests, and edge cases
- [ ] **Error handling** approach is defined and consistent
- [ ] **Migration/compatibility** addressed if the change affects existing behavior
- [ ] **All user constraints** from Phase 1 are respected
- [ ] **No contradictions** between sections
- [ ] **Code snippets** included where they clarify intent (not required everywhere)
- [ ] **Dependencies** are identified if new ones are needed
- [ ] **Order of implementation** is logical (what to build first)

### Review Outcomes

**If the plan passes all checks:**
- Proceed to Phase 6 (Finalize)

**If issues are found:**
- Write specific, actionable feedback to `${ITERATION_DIR}/feedback.md`
- Feedback format:
  ```markdown
  # Review Feedback — Iteration NN

  ## Issues Found

  ### 1. [Category]: Brief description
  **Problem**: What's wrong or missing
  **Expected**: What the plan should include
  **Suggestion**: How to fix it

  ### 2. ...

  ## What's Good
  - List things that are well done (so Codex doesn't regress)

  ## Additional Context
  Any new information from the user or Claude's analysis
  ```
- Proceed to Phase 5 (Revision)

**Optionally**, if the review reveals ambiguity in the original requirements:
- Use AskUserQuestion to get more input from the user
- Incorporate the answer into the revision feedback

## Phase 5 — Revision

If the review found issues, send a follow-up prompt into the **same persistent Codex session**. Do NOT launch a new runner — the existing tmux pane keeps all codebase context.

### Step 1: Increment Iteration

```bash
# iteration-01 → iteration-02, etc.
NEXT_NUM=$(printf "%02d" $((CURRENT_NUM + 1)))
ITERATION="iteration-${NEXT_NUM}"
ITERATION_DIR="${SESSION_DIR}/${ITERATION}"
mkdir -p "${ITERATION_DIR}"
```

**Verify:** `ls -d "${ITERATION_DIR}"` — must exist.

### Step 2: Write Revision Prompt

Write `${ITERATION_DIR}/prompt.txt` combining:
1. Claude's review feedback (`feedback.md`) — "Here is the review feedback to address:"
2. Any new user input gathered during review
3. Clear instruction: "Revise the plan to address ALL feedback points. Keep what was marked as good."
4. Instruction to write the revised plan to `${ITERATION_DIR}/result.txt`
5. Instruction to write "completed" to `${ITERATION_DIR}/status` when done

**Do NOT re-include** the original enhanced prompt or the previous plan — Codex already has this context from the persistent session. Only send what's new (the feedback and new instructions).

**Verify:** `cat "${ITERATION_DIR}/prompt.txt" | head -5` — file must exist.

### Step 3: Send Prompt via tmux

**ONE STEP AT A TIME.**

```bash
# Step 3a: Clear any stale input first
tmux send-keys -t "$TMUX_SESSION" C-u
sleep 0.5
```

**Verify:** Capture pane, confirm Codex prompt is visible and input is clear.

```bash
# Step 3b: Send the file-read instruction
tmux send-keys -t "$TMUX_SESSION" "Read and follow the instructions in ${ITERATION_DIR}/prompt.txt" Enter
```

**Verify:** Capture pane after a few seconds to confirm Codex received the prompt.

Update `session.json` iterations array.

### Step 4: Return to Phase 3

Monitor the new iteration and review again when complete.

### Iteration Limits

- **Maximum 3 iterations** before requiring explicit user decision.
- After iteration 3, ask the user:
  - "Continue iterating?" — create iteration-04
  - "Accept current plan?" — proceed to Phase 6 with current result
  - "Abort?" — stop and clean up

## Phase 6 — Finalize

### Step 1: Apply Final Touches

Claude reads the final `result.txt` and makes any small improvements:
- Fix formatting inconsistencies
- Ensure all sections from the template are present
- Add any missing cross-references between sections
- Verify file paths are correct relative to repo root

### Step 2: Save the Plan

```bash
PLAN_DIR="${REPO_DIR}/docs/plans"
mkdir -p "${PLAN_DIR}"
```

Write the final plan to `${PLAN_DIR}/<plan-name>.md`.

The plan document must follow the structure defined in `assets/plan-structure.template.md`.

**Verify:** `ls -la "${PLAN_DIR}/<plan-name>.md"` — file must exist.

### Step 3: Report to User

Tell the user:
- Where the plan was saved (relative path from repo root)
- How many iterations it took
- Summary of what the plan covers
- Suggest next steps (e.g., "You can now implement this plan with `/delegate`")

### Step 4: Cleanup

- The tmux session can be killed: `tmux kill-session -t "$TMUX_SESSION"`
- `/tmp/plan-build-*` directories clean up automatically on reboot
- `session.json` status updated to `"completed"`
