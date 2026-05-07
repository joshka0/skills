---
name: review-rp
description: "RepoPrompt-based code review loop using manage_workspaces + manage_selection + chat_send(mode=review). Standalone or composable into forge/other pipelines. Use for: rp review, repoprompt review, review with repoprompt, quality gate, final review, code review rp."
---

# Review RP

RepoPrompt-based code review using the 3-tool workflow: `manage_workspaces` + `manage_selection` + `chat_send(mode="review")`. Works standalone or as a composable building block in `/forge` and other pipelines.

## Command

`/review-rp [path] [--base <branch>] [--context <text>] [--gate]`

### Arguments

- **`[path]`** — Directory to review (default: current repo root)
- **`--base <branch>`** — Base branch for diff comparison (default: `main`)
- **`--context <text>`** — Additional context (plan description, task details, prior review findings)
- **`--gate`** — Strict mode: treat any non-nitpick finding as a failure (used by forge as final gate)

## Pipeline

```
1. Detect changed files (git diff)
2. Setup RepoPrompt workspace (manage_workspaces)
3. Select changed files (manage_selection)
4. Send review (chat_send mode=review)
5. Parse findings → categorize
6. If issues + not gate mode → follow-up chat for deeper analysis
7. Return structured result
```

## Execution

### Step 1: Detect Changed Files

```bash
REVIEW_DIR="${1:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
BASE_BRANCH="${BASE:-main}"
```

Get changed files depending on state:

```bash
# Uncommitted changes
cd "$REVIEW_DIR" && git status --porcelain | awk '{print $2}'

# Committed changes vs base
cd "$REVIEW_DIR" && git diff --name-only "${BASE_BRANCH}...HEAD"

# Or both
cd "$REVIEW_DIR" && git diff --name-only "${BASE_BRANCH}" HEAD
```

If no changed files found, report "nothing to review" and exit.

### Step 2: Setup RepoPrompt Workspace

Check if the review directory is already a workspace:

```
manage_workspaces(action="list")
```

If not present, add it:

```
manage_workspaces(action="add_folder", folder_path=REVIEW_DIR)
```

Bind to a tab:

```
manage_workspaces(action="list_tabs")
manage_workspaces(action="select_tab", tab="<tab_id>")
```

### Step 3: Select Changed Files

```
manage_selection(op="set", paths=[<changed file paths>], mode="full")
```

Use absolute paths. For large changesets (>30 files), use `mode="codemap_only"` for peripheral files and `mode="full"` for core files.

### Step 4: Send Review

```
chat_send(
  new_chat=true,
  mode="review",
  chat_name="review-rp-<timestamp>",
  message="Code review of changes in <REVIEW_DIR>.

Review focus:
- Correctness: bugs, logic errors, edge cases
- Design patterns: consistency with codebase conventions
- Error handling: completeness and consistency
- Test coverage: are tests present and adequate?
- Integration: will these changes work correctly with the rest of the codebase?

<CONTEXT if provided>

Base branch: <BASE_BRANCH>
Changed files: <list>",
  git_scope="all",
  git_base=BASE_BRANCH
)
```

Save the returned `chat_id` for follow-ups.

### Step 5: Parse and Categorize Findings

Read the review response. Categorize each finding:

| Category | Description | Action |
|----------|-------------|--------|
| **Critical** | Bugs, security issues, correctness failures | Must fix |
| **Suggestion** | Improvements, better patterns, error handling gaps | Should fix |
| **Nitpick** | Style, naming, minor formatting | Skip unless gate mode |
| **Question** | Ambiguous behavior, unclear intent | Needs clarification |

### Step 6: Follow-Up (if not gate mode)

If findings need deeper analysis, send follow-ups in the same chat:

```
chat_send(
  new_chat=false,
  chat_id="<chat_id>",
  mode="review",
  message="Drilling deeper on finding #N: <specific question about the finding>"
)
```

### Step 7: Return Result

Return a structured result that callers can consume:

```markdown
## Review Result: <PASS|FAIL|WARN>

### Summary
- Critical: N findings
- Suggestions: N findings
- Nitpicks: N findings

### Critical Findings
1. **[file:line]** <description>
   - Impact: <what breaks>
   - Fix: <suggested fix>

### Suggestions
1. **[file:line]** <description>

### Nitpicks (skipped unless --gate)
1. **[file:line]** <description>

### RepoPrompt Chat ID
<chat_id> (for follow-up queries)
```

**Gate mode result:**
- `PASS` — zero critical + zero suggestions
- `FAIL` — any critical or suggestion found

**Normal mode result:**
- `PASS` — zero critical
- `WARN` — suggestions but no critical
- `FAIL` — critical findings

### Step 8: Cleanup (optional)

If this was a temporary workspace (e.g., a worktree added just for review):

```
manage_workspaces(action="remove", folder_path=REVIEW_DIR)
```

## Composition Pattern

### From `/forge` (as final gate)

```
/review-rp "$WORKTREE_DIR" --base "$FEATURE_BRANCH" --gate --context "Task: <task description>"
```

### From `/forge` Phase 6 (full branch review)

```
/review-rp "$REPO_DIR" --base main --gate --context "Full feature branch review. Prior CodeRabbit findings: <summary>"
```

### Standalone (ad-hoc review)

```
/review-rp                          # Review current repo vs main
/review-rp . --base develop         # Review vs develop branch
/review-rp /path/to/worktree --gate # Strict gate mode
```

### Chained with `/review-cr`

```
/review-cr . --max-cycles 10        # CodeRabbit + code-simplifier loop
/review-rp . --gate                 # RepoPrompt final gate
```
