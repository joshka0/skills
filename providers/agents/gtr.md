---
name: gtr
description: "Manage git worktrees for parallel AI agent development with gtr (Git Worktree Runner). Use for: create worktree, new worktree, parallel branches, isolated workspace, run AI in worktree, open editor in worktree, list worktrees, remove worktree, worktree status, parallel agent development, git worktree. Wraps git worktree with quality-of-life automation, editor integration, and AI tool launching."
---

# Git Worktree Runner (gtr) Skill

Use `git gtr` to manage isolated worktrees for parallel development — especially useful for running multiple AI agents on the same repo without filesystem conflicts.

## Prerequisites

```bash
command -v git-gtr >/dev/null 2>&1 || { echo "ERROR: git-gtr not found. Install from https://github.com/coderabbitai/git-worktree-runner"; exit 1; }
```

Install if missing:
```bash
# Clone and install
git clone https://github.com/coderabbitai/git-worktree-runner.git
cd git-worktree-runner && ./install.sh

# Or macOS with Homebrew
ln -s "$(pwd)/bin/git-gtr" "$(brew --prefix)/bin/git-gtr"
```

## Non-Negotiable Rules

1. Always run commands from inside a git repository.
2. Use `git gtr` (not raw `git worktree`) for all worktree operations.
3. Before creating worktrees, ensure the repo is set up with the standard config (see Setup below).
4. Use `1` to reference the main repo worktree in commands.
5. Never run destructive operations (`git gtr rm`, `git gtr clean`) without confirming with the user first.
6. All worktrees go under `~/repos/worktrees/<repo-name>/` — set via global git config so it applies to every repo.

## Setup

**Global (once, applies to all repos):**
```bash
git config --global gtr.worktrees.dir '~/repos/worktrees'
git config --global gtr.editor.default cursor
git config --global gtr.ai.default claude
```

This creates worktrees at `~/repos/worktrees/<repo-name>/<branch>/` for every repo. No per-repo config needed.

**Per-repo overrides (optional):**
```bash
git gtr config set gtr.copy.patterns ".env .env.local"
git gtr config set gtr.postCreate "npm install"
```

## Core Flow

```bash
# Daily workflow (setup already done globally)
git gtr new my-feature          # Create worktree + branch
git gtr editor my-feature       # Open editor in worktree
git gtr ai my-feature           # Launch AI tool in worktree
git gtr run my-feature npm test # Run commands in worktree
git gtr list                    # See all worktrees
git gtr rm my-feature           # Clean up when done
```

## Command Reference

### Worktree Lifecycle

| Command | Purpose |
|---------|---------|
| `git gtr new <branch>` | Create new worktree with branch |
| `git gtr new <branch> --force --name <name>` | Multiple worktrees on same branch |
| `git gtr rm <branch>` | Remove worktree and optionally delete branch |
| `git gtr list` | List all worktrees with status |
| `git gtr clean` | Remove all worktrees |

### Tool Integration

| Command | Purpose |
|---------|---------|
| `git gtr editor <branch>` | Open worktree in configured editor |
| `git gtr ai <branch>` | Launch AI tool in worktree |
| `git gtr run <branch> <command>` | Run any command in worktree context |
| `git gtr go <branch>` | Print worktree path (for `cd "$(git gtr go feat)"`) |

### Configuration

| Command | Purpose |
|---------|---------|
| `git gtr config set <key> <value>` | Set config value |
| `git gtr config get <key>` | Get config value |
| `git gtr config list` | Show all config |
| `git gtr adapter` | List available editor & AI adapters |
| `git gtr doctor` | Diagnose setup issues |

### Key Config Keys

| Key | Purpose | Example |
|-----|---------|---------|
| `gtr.editor.default` | Default editor | `cursor`, `vscode`, `zed`, `vim` |
| `gtr.ai.default` | Default AI tool | `claude`, `codex`, `aider` |
| `gtr.worktrees.dir` | Worktree base directory | `../my-repo-worktrees` |
| `gtr.worktrees.prefix` | Worktree folder prefix | `wt-` |
| `gtr.defaultBranch` | Base branch for new worktrees | `main` |
| `gtr.copy.patterns` | Files to copy to new worktrees | `.env`, `.env.local` |
| `gtr.postCreate` | Hook script after worktree creation | `npm install` |
| `gtr.postRemove` | Hook script after worktree removal | cleanup commands |

## Task Recipes

### Create isolated worktree for an AI agent

```bash
git gtr new feature-auth
git gtr ai feature-auth    # Launches configured AI tool (claude, codex, etc.)
```

### Run multiple AI agents in parallel (one per worktree)

```bash
git gtr new feature-a
git gtr new feature-b
git gtr new feature-c

# Each agent gets its own isolated directory — no filesystem conflicts
git gtr ai feature-a &
git gtr ai feature-b &
git gtr ai feature-c &

# Monitor
git gtr list
```

### Run tests in a worktree without leaving current work

```bash
git gtr run feature-a npm test
git gtr run feature-a cargo test
```

### Open worktree in editor

```bash
git gtr editor feature-a             # Uses default editor
git gtr editor feature-a --editor vscode  # Override editor
```

### Navigate to worktree directory

```bash
cd "$(git gtr go feature-a)"
```

### Clean up after merge

```bash
git gtr rm feature-a    # Removes worktree, prompts about branch deletion
```

### Clean up all worktrees

```bash
git gtr clean    # Removes all worktrees (confirms first)
```

### Set up file copying for worktrees (e.g., .env files)

```bash
git gtr config set gtr.copy.patterns ".env .env.local"
# Now every `git gtr new` will copy these files into the new worktree
```

### Set up post-create hooks (e.g., install dependencies)

```bash
git gtr config set gtr.postCreate "npm install"
# Now every `git gtr new` will run npm install after creation
```

### Diagnose issues

```bash
git gtr doctor    # Checks git version, bash version, config, etc.
```

## Worktree Directory Structure

With the global config `gtr.worktrees.dir = ~/repos/worktrees`, worktrees are organized centrally:

```
~/repos/worktrees/
  my-repo/
    feature-a/                # git gtr new feature-a
    feature-b/                # git gtr new feature-b
    hotfix-login/             # git gtr new hotfix-login
  other-repo/
    bugfix-xyz/               # from a different repo
```

## Integration with codex-swarm

When using `/swarm` or `/delegate`, prefer `git gtr` over same-directory parallel agents:

1. Create one worktree per agent task
2. Each Codex agent runs in its own worktree via `git gtr run <branch> codex exec ...`
3. No filesystem conflicts — each agent has full isolation
4. After completion, changes are on separate branches ready for review/merge

## Notes

- `git gtr` is a git subcommand — always prefix with `git`.
- Worktrees share the same `.git` object store, so they're lightweight (no full clone).
- Branch names are the primary identifier for worktrees.
- Available adapters: editors (cursor, vscode, zed, idea, pycharm, webstorm, vim, nvim, emacs, sublime, nano, atom) and AI tools (aider, claude, codex, cursor, continue).
- Use `.gtrconfig` in repo root for team-shared settings.
- Requires Git 2.5+ (2.25+ recommended), Bash 3.2+.
- For deeper reference, see `references/commands.md` and `references/workflows.md`.
