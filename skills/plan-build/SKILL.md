---
name: plan-build
description: "Iterative implementation plan builder using Codex for codebase analysis. Use for: implementation plan, architecture plan, design plan, plan builder, plan build, structured planning, codex plan. Claude asks clarifying questions, delegates drafting to Codex, reviews strictly, iterates until quality bar met, saves to docs/plans/."
---

# Plan-Build Skill

Build high-quality implementation plans through iterative Claude–Codex collaboration. Claude acts as product owner and quality gate; Codex drafts plans with deep codebase analysis; the loop repeats until the plan meets Claude's quality bar.

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
command -v zellij >/dev/null 2>&1 || { echo "ERROR: zellij not found. Install from https://github.com/zellij-org/zellij"; exit 1; }
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

Once enough context is gathered, set up the Codex session:

### Step 1: Generate Session Directory

```bash
TIMESTAMP=$(date +%s)
SESSION_DIR="/tmp/plan-build-${TIMESTAMP}"
mkdir -p "${SESSION_DIR}"
```

### Step 2: Detect Repository Root

```bash
REPO_DIR=$(git rev-parse --show-toplevel 2>/dev/null)
if [ -z "$REPO_DIR" ]; then
    echo "WARNING: Not in a git repository. Using current directory."
    REPO_DIR=$(pwd)
fi
```

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

### Step 6: Generate Runner Script

Read the template from `assets/plan-runner.template.sh` and substitute placeholders:

| Placeholder | Value |
|-------------|-------|
| `{{ITERATION}}` | e.g., `iteration-01` |
| `{{ITERATION_DIR}}` | Full path to iteration directory |
| `{{REPO_DIR}}` | Repository root path |
| `{{SESSION_DIR}}` | Session directory path |
| `{{MODEL_FLAG}}` | `--model gpt-5.3-codex-spark` if `fast`, empty string otherwise |

Write the result to `${SESSION_DIR}/run.sh` (session-level, not per-iteration) and make it executable (`chmod +x`).

**IMPORTANT — Persistent Session, Not `codex exec`:**

The runner launches `codex --full-auto` (interactive mode), NOT `codex exec`. This keeps the Codex session alive in the Zellij pane with all codebase context preserved. Subsequent iterations send follow-up prompts into the same session via Zellij keystroke injection — Codex does NOT need to re-analyze the repo each time.

**Do NOT substitute `codex exec` for `codex --full-auto`.** The persistent session is critical for multi-iteration plan refinement. `codex exec` is stateless — each run loses all prior context, forcing full re-analysis.

### Step 7: Launch Zellij and Start Codex (Step-by-Step)

**IMPORTANT — Zellij DOES work from Claude Code's shell.** Do NOT skip Zellij or fall back to `codex exec` with claims that "Zellij can't start from a non-interactive shell." This is incorrect — Zellij starts fine when launched in the background (`&`). This has been tested and confirmed across many sessions.

**This process MUST be done step by step with sleeps between each action.** There is no shortcut — layouts with embedded commands are unreliable for interactive Codex sessions. Follow this exact sequence:

Determine the session name:
```bash
REPO_NAME=$(basename "$REPO_DIR")
ZELLIJ_SESSION="${REPO_NAME}-plan-${TIMESTAMP}"
```

#### 7a: Start Zellij session (background)

```bash
zellij --session "$ZELLIJ_SESSION" &
sleep 3
```

Verify it's running:
```bash
zellij list-sessions
```

#### 7b: Dismiss the intro pane

Zellij shows a welcome screen on first launch. Send Escape to dismiss it:

```bash
zellij -s "$ZELLIJ_SESSION" action write-chars '\x1b'
sleep 1
```

#### 7c: cd to the repo directory

```bash
zellij -s "$ZELLIJ_SESSION" action write-chars "cd ${REPO_DIR}"
sleep 0.3
zellij -s "$ZELLIJ_SESSION" action write-chars '\r'
sleep 1
```

#### 7d: Start Codex in full-auto mode

```bash
# $MODEL_FLAG is "--model gpt-5.3-codex-spark" if fast, empty otherwise
zellij -s "$ZELLIJ_SESSION" action write-chars "codex --full-auto $MODEL_FLAG"
sleep 0.3
zellij -s "$ZELLIJ_SESSION" action write-chars '\r'
```

**Wait for Codex to fully initialize** — this can take 10-15 seconds, or longer if Codex auto-updates:

```bash
sleep 15
```

#### 7e: Verify Codex is ready

Dump the screen and check for the Codex prompt (`>`):

```bash
zellij -s "$ZELLIJ_SESSION" action dump-screen /tmp/plan-build-screen.txt
tail -10 /tmp/plan-build-screen.txt
```

Look for `>` or `›` prompt character. If you see Codex updating, wait and check again. If Codex exited after an update, restart it (repeat 7d).

#### 7f: Clear any stale input

Before sending the prompt, ensure the input field is clean:

```bash
# Ctrl+U to clear input line
zellij -s "$ZELLIJ_SESSION" action write-chars '\x15'
sleep 0.5
```

### Step 8: Send Initial Prompt

Send a **short** single-line instruction telling Codex to read the prompt file. Do NOT paste the full prompt as keystrokes — it's too long and will break.

```bash
zellij -s "$ZELLIJ_SESSION" action write-chars "Read and follow the instructions in ${ITERATION_DIR}/prompt.txt"
sleep 0.3
```

**Submit with carriage return `\r`, NOT newline `\n`:**

```bash
zellij -s "$ZELLIJ_SESSION" action write-chars '\r'
```

#### Critical Zellij Keystroke Notes

| Action | Key | Notes |
|--------|-----|-------|
| Submit input | `\r` (carriage return) | **NOT `\n`** — newline doesn't submit in Codex |
| Clear input line | `\x15` (Ctrl+U) | Clears current input buffer |
| Cancel/interrupt | `\x03` (Ctrl+C) | **WARNING: This kills Codex** — do NOT use to clear input |
| Dismiss intro | `\x1b` (Escape) | Only needed on first session start |
| Go to line start | `\x01` (Ctrl+A) | Useful before Ctrl+K to kill to end |

### Step 9: Write Session Metadata

Write `${SESSION_DIR}/session.json`:
```json
{
    "skill": "plan-build",
    "description": "<user's description>",
    "repo_dir": "<repo root>",
    "session_dir": "<session dir>",
    "zellij_session": "<session name>",
    "plan_name": "<kebab-case-name>",
    "created_at": "<ISO 8601 timestamp>",
    "iterations": ["iteration-01"],
    "status": "running"
}
```

## Phase 3 — Monitor & Wait

Since Codex runs in interactive mode (not `codex exec`), there are no JSONL event streams or status files to poll. Monitor via **screen dumps**.

### Monitoring Loop

```
Every ~30 seconds:
1. Dump the Zellij pane screen:
   zellij -s "$ZELLIJ_SESSION" action dump-screen /tmp/plan-build-screen.txt
   tail -20 /tmp/plan-build-screen.txt

2. Check the screen output:
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

### What to Look For in Screen Dumps

| Screen content | Meaning |
|---------------|---------|
| `Exploring`, `Reading`, `Searching` | Codex is analyzing the codebase |
| `Writing`, `Editing` | Codex is producing output |
| `›` or `>` at bottom with no activity | Codex is idle — check if result.txt exists |
| Error messages, stack traces | Something went wrong |
| Shell prompt (`$`) without Codex UI | Codex exited — needs restart (repeat Step 7d) |

Report meaningful progress updates — don't spam the user with every check.

## Phase 4 — Review

Once Codex completes, Claude performs a **strict review** of the plan.

### Read the Result

Read `${ITERATION_DIR}/result.txt` — this is Codex's drafted implementation plan.

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

If the review found issues, send a follow-up prompt into the **same persistent Codex session**. Do NOT launch a new runner — the existing Zellij pane keeps all codebase context.

### Step 1: Increment Iteration

```bash
# iteration-01 → iteration-02, etc.
NEXT_NUM=$(printf "%02d" $((CURRENT_NUM + 1)))
ITERATION="iteration-${NEXT_NUM}"
ITERATION_DIR="${SESSION_DIR}/${ITERATION}"
mkdir -p "${ITERATION_DIR}"
```

### Step 2: Write Revision Prompt

Write `${ITERATION_DIR}/prompt.txt` combining:
1. Claude's review feedback (`feedback.md`) — "Here is the review feedback to address:"
2. Any new user input gathered during review
3. Clear instruction: "Revise the plan to address ALL feedback points. Keep what was marked as good."
4. Instruction to write the revised plan to `${ITERATION_DIR}/result.txt`
5. Instruction to write "completed" to `${ITERATION_DIR}/status` when done

**Do NOT re-include** the original enhanced prompt or the previous plan — Codex already has this context from the persistent session. Only send what's new (the feedback and new instructions).

### Step 3: Send Prompt via Zellij

Send the revision prompt into the existing Codex pane:

```bash
# Mark as running
echo "running" > "${ITERATION_DIR}/status"

# Clear any stale input first
zellij -s "$ZELLIJ_SESSION" action write-chars '\x15'
sleep 0.5

# Send a short file-read instruction — NOT the full prompt text
zellij -s "$ZELLIJ_SESSION" action write-chars "Read and follow the instructions in ${ITERATION_DIR}/prompt.txt"
sleep 0.3

# Submit with carriage return (NOT newline)
zellij -s "$ZELLIJ_SESSION" action write-chars '\r'
```

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

### Step 3: Report to User

Tell the user:
- Where the plan was saved (relative path from repo root)
- How many iterations it took
- Summary of what the plan covers
- Suggest next steps (e.g., "You can now implement this plan with `/delegate`")

### Step 4: Cleanup

- The Zellij session/tab can be closed by the user when ready
- `/tmp/plan-build-*` directories clean up automatically on reboot
- `session.json` status updated to `"completed"`
