---
name: ralph-review-cr
description: "CodeRabbit review-fix loop with ralph-loop auto-retry. Combines /ralph-loop with /review-cr — iterates until all findings are resolved or max iterations reached. Use for: ralph review, persistent review, review until clean, auto review fix, ralph coderabbit, review-cr with retries."
---

# Ralph Review CR

Wrap `/review-cr` in a `/ralph-loop` so the CodeRabbit review-fix cycle keeps retrying until all findings are resolved. Failed fix cycles get retried automatically on the next iteration.

## Command

`/ralph-review-cr [path] [--target <type>] [--base <branch>] [--max-cycles <N>] [--max-iterations <M>] [--context <text>]`

### Arguments

- **`[path]`** — Directory to review (passed through to `/review-cr`, default: repo root)
- **`--target <type>`** — CodeRabbit target: `uncommitted` (default), `committed`, `branch` (passed through to `/review-cr`)
- **`--base <branch>`** — Base branch for `--target branch` comparisons (passed through to `/review-cr`)
- **`--max-cycles <N>`** — Max review-fix cycles per iteration (passed through to `/review-cr`, default: 10)
- **`--max-iterations <M>`** — Cap ralph loop iterations (default: 5)
- **`--context <text>`** — Task/plan context (passed through to `/review-cr`)

## How It Works

1. Sets up a ralph loop with completion promise `REVIEW CLEAN`
2. Each iteration runs `/review-cr` with the provided arguments
3. `/review-cr` outputs `<promise>REVIEW CLEAN</promise>` when result is PASS (zero critical + zero suggestions)
4. Ralph-loop detects the promise and stops
5. If review-cr ends with WARN or FAIL, ralph-loop feeds the same prompt — review-cr picks up remaining findings on the next pass

## Execution

### Step 1: Parse Arguments

Separate the review-cr arguments from the ralph arguments:
- Everything except `--max-iterations M` goes to review-cr
- `--max-iterations M` goes to ralph-loop (default: 5 if not specified)

### Step 2: Set Up Ralph Loop

Run the ralph-loop setup script to create the loop state:

```bash
"$HOME/.claude/plugins/cache/claude-plugins-official/ralph-loop/2cd88e7947b7/scripts/setup-ralph-loop.sh" \
  --completion-promise 'REVIEW CLEAN' \
  --max-iterations <M> \
  /review-cr <review-cr-arguments>
```

This creates `.claude/ralph-loop.local.md` with the review-cr invocation as the loop prompt.

**Verify:** `head -10 .claude/ralph-loop.local.md` — must show `active: true` and the review-cr prompt.

### Step 3: Run Review CR

Now invoke the `/review-cr` skill with the parsed arguments:

```
/review-cr <review-cr-arguments>
```

Review-cr will execute its full pipeline (coderabbit review -> categorize -> fan-out code-simplifier fixes -> re-review). When the result is PASS:

Output `<promise>REVIEW CLEAN</promise>` and ralph-loop terminates.

If review-cr ends with WARN or FAIL:
- It does NOT output the promise
- Ralph-loop's stop hook intercepts the exit
- The same `/review-cr <args>` prompt is fed back
- Review-cr runs fresh against the current state (including fixes from prior iterations)

## Monitoring

```bash
# Check ralph-loop iteration
grep '^iteration:' .claude/ralph-loop.local.md

# Check review cycle files
ls review-cr-cycle-*.md 2>/dev/null
```

## Stopping Early

```
/cancel-ralph
```

This removes the loop state file. The current review-cr execution finishes but no new iteration starts.

## Example

```
/ralph-review-cr                                          # Review uncommitted, default everything
/ralph-review-cr . --target branch --base main            # Review full branch vs main
/ralph-review-cr . --max-cycles 5 --max-iterations 3     # Limit both inner and outer loops
/ralph-review-cr /path/to/worktree --context "Auth feature implementation"
```

## Composition

### From `/forge` (replace standalone review-cr)

```
# Instead of: /review-cr "$WORKTREE_DIR" --max-cycles 10
# Use ralph-wrapped version for persistence:
/ralph-review-cr "$WORKTREE_DIR" --max-cycles 10 --max-iterations 3 --context "Task-NN: <description>"
```

### Chained with `/review-rp` (full pipeline)

```
/ralph-review-cr . --context "<task context>"   # Fix everything CodeRabbit finds
/review-rp . --gate --context "<task context>"  # Final RepoPrompt quality gate
```
