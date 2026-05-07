# gtr Workflow Examples

Real-world examples of using git worktrees for parallel development.

## Workflow 1: Parallel AI Agents (The Primary Use Case)

**Problem:** Running multiple AI agents in the same directory causes filesystem conflicts.
**Solution:** Each agent gets its own worktree.

```bash
# Setup (once per repo)
git gtr config set gtr.ai.default claude
git gtr config set gtr.copy.patterns ".env .env.local"
git gtr config set gtr.postCreate "npm install"

# Create isolated worktrees for each task
git gtr new feature-auth       # Worktree 1: authentication
git gtr new feature-dashboard  # Worktree 2: dashboard
git gtr new fix-api-bug        # Worktree 3: bug fix

# Launch AI agents in each (they won't conflict)
git gtr ai feature-auth &
git gtr ai feature-dashboard &
git gtr ai fix-api-bug &

# Monitor progress
git gtr list

# When agents finish, changes are on separate branches
# Review and merge as normal
git gtr rm feature-auth
git gtr rm feature-dashboard
git gtr rm fix-api-bug
```

**Why this works:** Each worktree is a separate directory with its own working tree. Agents can freely read/write files without stepping on each other.

## Workflow 2: PR Review Without Interrupting Work

**Problem:** Need to review a PR but don't want to stash/commit current work.
**Solution:** Create a worktree for the PR branch.

```bash
# Currently working on feature-x with uncommitted changes
# Need to review PR from teammate on branch "fix-payments"

# Create worktree tracking the remote branch
git gtr new fix-payments --track origin/fix-payments

# Open in editor to review
git gtr editor fix-payments

# Run tests
git gtr run fix-payments npm test

# Done reviewing — clean up
git gtr rm fix-payments

# Your original work in main repo is untouched
```

## Workflow 3: Integration with codex-swarm

**Problem:** `/swarm` agents in Zellij panes all share one directory.
**Solution:** Create worktrees first, run each agent in its own worktree.

```bash
# Create worktrees for each swarm task
git gtr new task-auth
git gtr new task-api
git gtr new task-tests

# Get paths for each
AUTH_DIR=$(git gtr go task-auth)
API_DIR=$(git gtr go task-api)
TESTS_DIR=$(git gtr go task-tests)

# In codex-swarm, point each agent at its worktree directory
# using REPO_DIR override per agent
```

## Workflow 4: Experiment Branches

**Problem:** Want to try two different approaches to the same problem.
**Solution:** Use `--force --name` for multiple worktrees.

```bash
# Approach A
git gtr new experiment --force --name approach-a
# ... make changes in approach-a

# Approach B (same base branch, different worktree)
git gtr new experiment --force --name approach-b
# ... make changes in approach-b

# Compare results
git gtr run approach-a npm test
git gtr run approach-b npm test

# Keep the winner, remove the other
git gtr rm approach-b
```

## Workflow 5: Hot Fix While Feature In Progress

**Problem:** Urgent bug found while deep in feature work.
**Solution:** Create a worktree for the fix, keep feature work untouched.

```bash
# Currently deep in feature-x work (don't want to stash)

# Create hotfix worktree from main
git gtr new hotfix-login --base main

# Fix the bug in the hotfix worktree
git gtr editor hotfix-login

# Test the fix
git gtr run hotfix-login npm test

# Push and create PR from the hotfix worktree
cd "$(git gtr go hotfix-login)"
git add . && git commit -m "Fix login redirect loop"
git push -u origin hotfix-login
glab mr create --title "Fix login redirect" --description "..."

# Return to main repo — feature work is exactly as you left it
cd "$(git gtr go 1)"

# Clean up after merge
git gtr rm hotfix-login
```

## Workflow 6: Team-Shared Config via .gtrconfig

**Problem:** Want consistent worktree setup across the team.
**Solution:** Add `.gtrconfig` to the repo.

Create `.gtrconfig` in repo root:
```ini
[gtr "worktrees"]
    dir = ./.worktrees
    prefix = wt-

[gtr "copy"]
    patterns = .env .env.local .tool-versions

[gtr]
    postCreate = npm install
    defaultBranch = main
```

Commit it — now `git gtr new` behaves the same for all team members.

## Workflow 7: CI/CD with Worktrees

**Problem:** Want to test multiple branches in CI without multiple clones.
**Solution:** Use worktrees in CI scripts.

```bash
#!/bin/bash
# ci-parallel-test.sh

# Test main branch
git gtr new test-main --base main
git gtr run test-main npm test &
PID_MAIN=$!

# Test develop branch
git gtr new test-develop --base develop
git gtr run test-develop npm test &
PID_DEV=$!

# Wait for both
wait $PID_MAIN $PID_DEV

# Clean up
git gtr clean
```

## Common Patterns

### Navigate to worktree
```bash
cd "$(git gtr go feature-x)"
```

### Run command and capture output
```bash
OUTPUT=$(git gtr run feature-x npm test 2>&1)
echo "$OUTPUT"
```

### Check if worktree exists
```bash
git gtr list | grep feature-x && echo "exists" || echo "not found"
```

### Bulk create worktrees
```bash
for branch in feature-a feature-b feature-c; do
    git gtr new "$branch"
done
```

### Bulk cleanup
```bash
git gtr clean    # Removes all worktrees
```
