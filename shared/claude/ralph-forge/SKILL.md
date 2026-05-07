---
name: ralph-forge
description: "Forge a plan with ralph-loop auto-retry. Combines /ralph-loop with /forge — iterates until the plan is fully implemented, reviewed, and merged. Use for: ralph forge, loop forge, auto forge, persistent forge, forge until done, implement plan with retries."
---

# Ralph Forge

Wrap `/forge` in a `/ralph-loop` so the plan keeps getting hammered until it's fully implemented, reviewed, and merged to the feature branch. Failed tasks get retried automatically on the next iteration.

## Command

`/ralph-forge [fast] <plan> [--max-iterations N]`

### Arguments

- **`<plan>`** — File path to a markdown plan or inline markdown (passed through to `/forge`)
- **`fast`** — Optional: use lightweight Codex model (passed through to `/forge`)
- **`--max-iterations N`** — Optional: cap ralph loop iterations (default: 5)

## How It Works

1. Sets up a ralph loop with completion promise `PLAN COMPLETE`
2. Each iteration runs `/forge` on the plan
3. Forge outputs `<promise>PLAN COMPLETE</promise>` when all tasks pass review and merge
4. Ralph-loop detects the promise and stops
5. If forge fails or partially completes, ralph-loop feeds the same prompt — forge detects already-merged tasks and resumes from where it left off

## Execution

### Step 1: Parse Arguments

Separate the forge arguments from the ralph arguments:
- Everything except `--max-iterations N` goes to forge
- `--max-iterations N` goes to ralph-loop (default: 5 if not specified)

### Step 2: Set Up Ralph Loop

Run the ralph-loop setup script to create the loop state:

```bash
"$HOME/.claude/plugins/cache/claude-plugins-official/ralph-loop/2cd88e7947b7/scripts/setup-ralph-loop.sh" \
  --completion-promise 'PLAN COMPLETE' \
  --max-iterations <N> \
  /forge <forge-arguments>
```

This creates `.claude/ralph-loop.local.md` with the forge invocation as the loop prompt. The stop hook will re-feed this exact prompt on each iteration.

**Verify:** `head -10 .claude/ralph-loop.local.md` — must show `active: true` and the forge prompt.

### Step 3: Run Forge

Now invoke the `/forge` skill with the plan arguments:

```
/forge <plan-arguments>
```

Forge will execute its full pipeline (parse → agents → review-fix loop → merge). If everything succeeds, forge outputs `<promise>PLAN COMPLETE</promise>` and ralph-loop terminates.

If forge fails partway through:
- It does NOT output the promise
- Ralph-loop's stop hook intercepts the exit
- The same `/forge <plan>` prompt is fed back
- Forge detects the existing feature branch and already-merged task branches
- It resumes only the incomplete/failed tasks

## Monitoring

```bash
# Check ralph-loop iteration
grep '^iteration:' .claude/ralph-loop.local.md

# Check forge session
ls -d /tmp/forge-* 2>/dev/null

# Check worktree status
git gtr list
```

## Stopping Early

```
/cancel-ralph
```

This removes the loop state file. The current forge execution finishes but no new iteration starts.

## Example

```
/ralph-forge docs/plans/user-auth.md --max-iterations 3
/ralph-forge fast docs/plans/refactor-api.md
/ralph-forge docs/plans/add-tests.md
```
