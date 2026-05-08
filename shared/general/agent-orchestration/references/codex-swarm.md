# Codex Swarm & Delegate Reference

Detailed reference for `codex-swarm` and `delegate` modes of
agent-orchestration. Both use the Codex CLI; codex-swarm is the full tmux-based
multi-agent orchestration, and delegate is a lightweight single-agent subset.

---

## § Codex Swarm

Orchestrate one or more Codex CLI agents in tmux terminal panes. The primary
agent acts as supervisor — launching agents, monitoring JSONL output, reporting
progress, and intervening on failures.

### Modes

- **`/delegate <prompt>`** — Launch a single Codex agent in a new tmux pane
- **`/swarm <prompt1> | <prompt2> | ...`** — Launch N agents in a multi-pane
  tmux layout

### Model Flag

Append `fast` to use the lightweight `gpt-5.3-codex-spark` model:

- `/delegate fast <prompt>`
- `/swarm fast <prompt1> | <prompt2> | ...`

When `fast` is specified, pass `--model gpt-5.3-codex-spark` to all `codex
exec` invocations. Default uses whatever model Codex is configured with.

### Prerequisites Check

```bash
command -v codex >/dev/null 2>&1 || { echo "ERROR: codex not found"; exit 1; }
command -v tmux >/dev/null 2>&1 || { echo "ERROR: tmux not found. Install with: brew install tmux"; exit 1; }
command -v git-gtr >/dev/null 2>&1 || { echo "ERROR: git-gtr not found. Install from https://github.com/coderabbitai/git-worktree-runner"; exit 1; }
```

### Session Setup Workflow

Execute each step individually. Verify before proceeding.

#### Step 1: Generate Session Directory

```bash
SESSION_TS=$(date +%Y%m%d-%H%M%S)
SESSION_DIR="/tmp/codex-swarm-${SESSION_TS}"
mkdir -p "$SESSION_DIR"
```

**Verify:** `ls -d "$SESSION_DIR"` — must exist.

#### Step 2: Detect Repository Root and Create Worktrees

```bash
REPO_DIR=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
REPO_NAME=$(basename "$REPO_DIR")
```

Create a worktree per agent for filesystem isolation:

```bash
# For each agent (NN = 01, 02, ...):
BRANCH_NAME="swarm-${SESSION_TS}-agent-${NN}"
git gtr new "$BRANCH_NAME"
WORKTREE_DIR=$(git gtr go "$BRANCH_NAME")
```

**Verify each worktree:** `ls -d "$WORKTREE_DIR"` — must exist before
continuing.

Each agent runs in its own worktree under `~/repos/worktrees/<repo>/`. This
eliminates filesystem conflicts — agents can freely modify any file without
stepping on each other.

#### Step 3: Parse Prompts

- **`/delegate`**: Single prompt, create 1 agent
- **`/swarm`**: Split on ` | ` (space-pipe-space) delimiter. Trim whitespace
  from each segment.

#### Step 4: Create Agent Directories

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

**Verify:** `cat "${AGENT_DIR}/prompt.txt" | head -3` — must contain the
prompt.

#### Step 5: Generate run.sh Per Agent

Create the runner script for each agent:

```bash
cat > "${AGENT_DIR}/run.sh" << 'RUN_EOF'
#!/usr/bin/env bash
set -euo pipefail
AGENT_DIR="{{AGENT_DIR}}"
WORKTREE_DIR="{{WORKTREE_DIR}}"
MODEL_FLAG="{{MODEL_FLAG}}"
PROMPT=$(cat "${AGENT_DIR}/prompt.txt")

echo "running" > "${AGENT_DIR}/status"

codex exec \
    --full-auto \
    --json \
    $MODEL_FLAG \
    -C "$WORKTREE_DIR" \
    -o "${AGENT_DIR}/result.txt" \
    "$PROMPT" \
    2>&1 | tee "${AGENT_DIR}/output.jsonl"

EXIT_CODE=${PIPESTATUS[0]}
if [ "$EXIT_CODE" -eq 0 ]; then
    echo "completed" > "${AGENT_DIR}/status"
else
    echo "failed" > "${AGENT_DIR}/status"
fi
RUN_EOF

chmod +x "${AGENT_DIR}/run.sh"
```

Replace placeholders per agent:

| Placeholder | Value |
|-------------|-------|
| `{{AGENT_DIR}}` | Full path to agent's directory |
| `{{WORKTREE_DIR}}` | Worktree path for this agent |
| `{{MODEL_FLAG}}` | `--model gpt-5.3-codex-spark` if `fast`, empty string otherwise |

**Verify:** `ls -la "${AGENT_DIR}/run.sh"` — must be executable.

#### Step 6: Launch tmux Session with Agent Panes

Execute each sub-step individually. Verify each before moving on.

```bash
SESSION_NAME="${REPO_NAME}-swarm-${SESSION_TS}"
```

**6a: Create tmux session with first agent**

```bash
tmux new-session -d -s "$SESSION_NAME" -n "swarm" "${SESSION_DIR}/agent-01/run.sh"
```

**Verify:** `tmux has-session -t "$SESSION_NAME" 2>/dev/null && echo "OK" || echo "FAILED"`

**6b: Add panes for additional agents**

For each additional agent (02, 03, ...):

```bash
tmux split-window -t "$SESSION_NAME:swarm" "${SESSION_DIR}/agent-${NN}/run.sh"
tmux select-layout -t "$SESSION_NAME:swarm" tiled
```

Layout strategy based on agent count:

| Agents | tmux Layout |
|--------|------------|
| 1 | Single pane (no splits needed) |
| 2-4 | Split + `tiled` layout |
| 5+ | Split + `tiled` layout, or separate windows per agent |

For 5+ agents, consider using separate windows:

```bash
tmux new-window -t "$SESSION_NAME" -n "agent-${NN}" "${SESSION_DIR}/agent-${NN}/run.sh"
```

**Verify after all panes:** `tmux list-panes -t "$SESSION_NAME:swarm" | wc -l`
— must match agent count.

#### Step 7: Write Session Metadata

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

**Verify:** `cat "${SESSION_DIR}/session.json" | python3 -m json.tool`

### Monitoring

Poll agent status periodically (~15 seconds). One check at a time. Read.
Interpret. Decide.

```bash
# Check status
cat "${AGENT_DIR}/status"

# Read JSONL tail for running agents
tail -20 "${AGENT_DIR}/output.jsonl" 2>/dev/null

# Read results for completed agents
cat "${AGENT_DIR}/result.txt" 2>/dev/null
```

Key JSONL events:

| Event Type | Meaning |
|-----------|---------|
| `"type": "thread.started"` | Agent started processing |
| `"type": "item.created"` with `"type": "function_call"` | Agent executing a tool |
| `"type": "item.created"` with `"type": "message"` | Agent produced a message |
| `"type": "turn.completed"` | Agent completed a turn |
| `"type": "turn.failed"` | Agent turn failed |
| `"type": "exec.completed"` | Agent finished execution |

Progress report format:

```
Agent     | Status    | Last Activity
----------|-----------|------------------------------
agent-01  | running   | Executing: shell command...
agent-02  | completed | Done: implemented feature X
agent-03  | failed    | Error: permission denied
```

### Intervention Strategies

#### On Agent Failure

1. Read `output.jsonl` to understand what went wrong.
2. Options:
   - **Restart with refined prompt:** Write updated `prompt.txt`, re-run
     `run.sh`.
   - **Pre-stage context:** Write helper files to the agent dir before restart.
   - **Abort:** Mark as permanently failed, report to user.

#### Restarting an Agent

```bash
cat > "${AGENT_DIR}/prompt.txt" << 'EOF'
<refined prompt with context from failure>
EOF

echo "pending" > "${AGENT_DIR}/status"

tmux split-window -t "$SESSION_NAME:swarm" "${AGENT_DIR}/run.sh"
tmux select-layout -t "$SESSION_NAME:swarm" tiled
```

### Post-Completion Review Loop

After all agents complete successfully, run an automated review-fix cycle:

1. **Run reviews in parallel** — code review tool + manual diff review.
2. **Parse review items** — categorize by file, severity, description.
3. **Dispatch fixes** — group by file ownership, launch fix agents.
4. **Re-review** — run reviews again after fixes.
5. **Iterate or finalize** — maximum 3 review-fix cycles.
6. **Commit and PR** — stage, commit, create MR/PR.

### Worktree Isolation

Each agent runs in its own git worktree (via `git gtr`). No filesystem
conflicts. After completion:

- Each agent's changes are on a separate branch.
- Review per-branch, then merge into the working branch.
- Use `git gtr rm <branch>` to clean up.

### Cleanup

```bash
# Kill tmux session
tmux kill-session -t "$SESSION_NAME"

# Remove worktrees
git gtr rm swarm-${SESSION_TS}-agent-01
git gtr rm swarm-${SESSION_TS}-agent-02

# Or clean all worktrees
git gtr clean

# Remove session directory
rm -rf "${SESSION_DIR}"

# List active sessions
ls -d /tmp/codex-swarm-* 2>/dev/null
tmux list-sessions 2>/dev/null
git gtr list
```

---

## § Delegate (Lightweight Single-Agent)

Quick single-task delegation to Codex CLI. No tmux, no layout — just `codex
exec` in the background with worktree isolation. This is a simplified subset of
codex-swarm for when you only need one agent.

### Command

`/delegate-codex [fast] <prompt>`

- `/delegate-codex <prompt>` — default Codex model
- `/delegate-codex fast <prompt>` — `gpt-5.3-codex-spark` (lighter, faster)

### Prerequisites

```bash
command -v codex >/dev/null 2>&1 || { echo "ERROR: codex not found"; exit 1; }
command -v git-gtr >/dev/null 2>&1 || { echo "ERROR: git-gtr not found"; exit 1; }
```

### Workflow

Execute each step individually. Verify before proceeding.

#### Step 1: Parse Arguments

If prompt starts with `fast`, set `MODEL_FLAG="--model gpt-5.3-codex-spark"`
and strip `fast` from the prompt. Otherwise `MODEL_FLAG=""`.

#### Step 2: Setup

```bash
REPO_DIR=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
SESSION_DIR="/tmp/delegate-codex-${TIMESTAMP}"
mkdir -p "$SESSION_DIR"
```

**Verify:** `ls -d "$SESSION_DIR"` — must exist.

#### Step 3: Create Worktree

```bash
BRANCH_NAME="delegate-${TIMESTAMP}"
git gtr new "$BRANCH_NAME"
WORKTREE_DIR=$(git gtr go "$BRANCH_NAME")
```

**Verify:** `ls -d "$WORKTREE_DIR"` — must exist.

#### Step 4: Write Prompt

Always append the git policy to the prompt:

```bash
cat > "${SESSION_DIR}/prompt.txt" << 'PROMPT_EOF'
<the user's prompt text>

IMPORTANT: Do NOT run any git commands (no git commit, git add, git branch,
git stash, git checkout, git reset, etc.). Only make code changes. Version
control will be handled separately.
PROMPT_EOF
```

**Verify:** `cat "${SESSION_DIR}/prompt.txt" | head -3`

#### Step 5: Run Codex

Launch `codex exec` in the background:

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

Use `run_in_background: true` so the primary agent can continue monitoring.

#### Step 6: Report Launch

Report to the user: session dir, worktree path, branch name, model.

#### Step 7: Monitor

```bash
# Check if still running
tail -5 "${SESSION_DIR}/output.jsonl" 2>/dev/null

# Check result when done
cat "${SESSION_DIR}/result.txt" 2>/dev/null
```

Key JSONL events: `exec.completed` (finished), `turn.failed` (error).

#### Step 8: Report Results

When Codex finishes:

1. Read `${SESSION_DIR}/result.txt` for final output.
2. Report summary.
3. Tell user the branch for review: `git gtr run "$BRANCH_NAME" git diff HEAD`

### Cleanup

After the user has reviewed and merged (or discarded) the changes:

```bash
git gtr rm "$BRANCH_NAME"
rm -rf "$SESSION_DIR"
```

Do NOT clean up automatically — let the user decide.

---

## Shared: Git Policy

Agents MUST NOT run any git commands (no commits, branches, stashing, checkouts,
resets). Only code changes. Version control is handled afterward by the user.

When writing prompts, always append:

```
IMPORTANT: Do NOT run any git commands (no git commit, git add, git branch,
git stash, git checkout, git reset, etc.). Only make code changes. Version
control will be handled separately.
```

## Shared: Sandbox Limitations

Codex agents run sandboxed and **cannot**:

- Install packages (`npm install`, `pip install`, etc.)
- Run dev servers or long-lived processes
- Access network services or external APIs
- Modify system configuration

If a task requires any of these, use a non-sandboxed subagent (e.g., an Opus
subagent via `Task` tool) instead of Codex.

You can mix both in a single swarm — Codex agents for code tasks in tmux panes,
and system tasks via subagents in parallel.
