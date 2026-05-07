---
name: delegate-codex
description: "Quick single-task delegation to Codex CLI agent. No tmux, no layout — just runs codex exec in background. Use for: delegate to codex, run codex, quick codex task, codex exec, single codex agent, background codex, delegate task."
---

# Delegate Codex Skill

Run a single Codex CLI agent in the background. Lightweight alternative to `/swarm` — no tmux, no layout files, just `codex exec` with worktree isolation.

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

`/delegate-codex [fast] <prompt>` — Delegate a single task to Codex.

- **`/delegate-codex <prompt>`** — Run with default Codex model
- **`/delegate-codex fast <prompt>`** — Run with `gpt-5.3-codex-spark` (lighter, faster)

## Prerequisites

```bash
command -v codex >/dev/null 2>&1 || { echo "ERROR: codex not found"; exit 1; }
command -v git-gtr >/dev/null 2>&1 || { echo "ERROR: git-gtr not found"; exit 1; }
```

## Workflow

**Execute each step individually. Verify before proceeding.**

### Step 1: Parse Arguments

- If prompt starts with `fast`, set `MODEL_FLAG="--model gpt-5.3-codex-spark"` and strip `fast` from the prompt.
- Otherwise, `MODEL_FLAG=""`.

### Step 2: Setup

```bash
REPO_DIR=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
SESSION_DIR="/tmp/delegate-codex-${TIMESTAMP}"
mkdir -p "$SESSION_DIR"
```

**Verify:** `ls -d "$SESSION_DIR"` — must exist.

### Step 3: Create Worktree

Create an isolated worktree so the agent doesn't conflict with your working directory:

```bash
BRANCH_NAME="delegate-${TIMESTAMP}"
git gtr new "$BRANCH_NAME"
WORKTREE_DIR=$(git gtr go "$BRANCH_NAME")
```

**Verify:** `ls -d "$WORKTREE_DIR"` — must exist.

### Step 4: Write Prompt

Write the prompt to a file to avoid shell escaping issues. **Always append** the git policy:

```bash
cat > "${SESSION_DIR}/prompt.txt" << 'PROMPT_EOF'
<the user's prompt text>

IMPORTANT: Do NOT run any git commands (no git commit, git add, git branch, git stash, git checkout, git reset, etc.). Only make code changes. Version control will be handled separately.
PROMPT_EOF
```

**Verify:** `cat "${SESSION_DIR}/prompt.txt" | head -3` — must contain the prompt.

### Step 5: Run Codex

Launch `codex exec` via the Bash tool with `run_in_background: true`:

```bash
PROMPT=$(cat "${SESSION_DIR}/prompt.txt")
codex exec \
    --full-auto \
    --json \
    $MODEL_FLAG \
    -C "$WORKTREE_DIR" \
    -o "${SESSION_DIR}/result.txt" \
    "$PROMPT" \
    2>&1 | tee "${SESSION_DIR}/output.jsonl"
```

**Use the Bash tool with `run_in_background: true`** so Claude can continue working or monitoring while Codex runs.

**Verify:** Check the background task was launched (Bash tool returns a task ID).

### Step 6: Report Launch

Tell the user:
- Session dir: `$SESSION_DIR`
- Worktree: `$WORKTREE_DIR`
- Branch: `$BRANCH_NAME`
- Model: default or `gpt-5.3-codex-spark`

### Step 7: Monitor

Poll periodically using the Bash tool or `TaskOutput`. **ONE CHECK AT A TIME. Read. Interpret. Decide.**

```bash
# Check if still running
tail -5 "${SESSION_DIR}/output.jsonl" 2>/dev/null

# Check result when done
cat "${SESSION_DIR}/result.txt" 2>/dev/null
```

Key JSONL events:
| Event Type | Meaning |
|-----------|---------|
| `"type": "exec.completed"` | Agent finished |
| `"type": "turn.failed"` | Agent turn failed |

### Step 8: Report Results

When Codex finishes:
1. Read `${SESSION_DIR}/result.txt` for the final output
2. Report a summary to the user
3. Tell them the branch name so they can review changes:
   ```bash
   # Review what changed
   git gtr run "$BRANCH_NAME" git diff HEAD
   ```

## Cleanup

After the user has reviewed and merged (or discarded) the changes:

```bash
git gtr rm "$BRANCH_NAME"
rm -rf "$SESSION_DIR"
```

Do NOT clean up automatically — always let the user decide when they're done with the branch.

## Sandbox Limitations

Codex agents run sandboxed and **cannot**:
- Install packages (`npm install`, `pip install`, etc.)
- Run dev servers or long-lived processes
- Access network services or external APIs

If the task requires any of these, use Claude's `Task` tool (Opus subagent) instead of Codex.

## Git Policy

Agents MUST NOT run any git commands. Only code changes. Version control is handled by the user afterward.
