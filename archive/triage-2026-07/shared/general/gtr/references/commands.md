# gtr Command Reference

Complete reference for all `git gtr` commands.

## `git gtr new <branch> [options]`

Create a new git worktree with a branch.

**Arguments:**
- `<branch>` — Branch name (auto-sanitized: slashes become dashes, etc.)

**Options:**
- `--force` — Allow creating worktree even if branch exists
- `--name <name>` — Custom worktree directory name (use with `--force` for multiple worktrees on same branch)
- `--base <branch>` — Base branch to create from (default: configured default branch or `main`)
- `--track <remote/branch>` — Track a remote branch
- `--no-copy` — Skip copying config files (`.env`, etc.)
- `--no-hooks` — Skip post-create hooks

**Behavior:**
1. Creates branch if it doesn't exist
2. Creates worktree directory in configured base dir
3. Copies files matching `gtr.copy.patterns` from main repo
4. Runs `gtr.postCreate` hook if configured
5. Prints worktree path

**Examples:**
```bash
git gtr new feature-auth
git gtr new bugfix/login-redirect
git gtr new experiment --force --name experiment-v2
git gtr new feature-x --base develop
```

## `git gtr rm <branch>`

Remove a worktree.

**Arguments:**
- `<branch>` — Branch identifying the worktree to remove

**Behavior:**
1. Removes the worktree directory
2. Runs `gtr.postRemove` hook if configured
3. Prompts whether to delete the branch too (interactive mode)

**Examples:**
```bash
git gtr rm feature-auth
```

## `git gtr list`

List all worktrees with their status.

**Output includes:**
- Branch name
- Worktree path
- Status (clean, dirty, conflicts)

**Examples:**
```bash
git gtr list
```

## `git gtr go <branch>`

Print the path to a worktree. Use with `cd`:

```bash
cd "$(git gtr go feature-auth)"
```

**Special values:**
- `1` — Main repository path

## `git gtr editor <branch> [options]`

Open a worktree in the configured editor.

**Options:**
- `--editor <name>` — Override default editor

**Available editors:** cursor, vscode, zed, idea, pycharm, webstorm, vim, nvim, emacs, sublime, nano, atom

**Examples:**
```bash
git gtr editor feature-auth
git gtr editor feature-auth --editor vscode
```

## `git gtr ai <branch> [options]`

Launch an AI coding tool in the worktree.

**Options:**
- `--ai <name>` — Override default AI tool

**Available AI tools:** aider, claude, codex, cursor, continue

**Examples:**
```bash
git gtr ai feature-auth
git gtr ai feature-auth --ai codex
```

## `git gtr run <branch> <command...>`

Execute a command in the context of a worktree.

**Examples:**
```bash
git gtr run feature-auth npm test
git gtr run feature-auth cargo build
git gtr run feature-auth ls -la
```

## `git gtr clean`

Remove all worktrees. Prompts for confirmation in interactive mode.

## `git gtr config <subcommand>`

Manage gtr configuration via `git config`.

**Subcommands:**
- `set <key> <value>` — Set a config value
- `get <key>` — Get a config value
- `list` — Show all gtr config
- `unset <key>` — Remove a config value
- `add <key> <value>` — Add to a multi-value key

**Examples:**
```bash
git gtr config set gtr.editor.default cursor
git gtr config set gtr.ai.default claude
git gtr config set gtr.worktrees.dir ../worktrees
git gtr config set gtr.copy.patterns ".env .env.local"
git gtr config set gtr.postCreate "npm install"
git gtr config list
```

## `git gtr adapter`

List all available editor and AI adapters.

## `git gtr doctor`

Run diagnostics to check system requirements and configuration:
- Git version (requires 2.5+, recommends 2.25+)
- Bash version (requires 3.2+, recommends 4.0+)
- Configuration status
- Editor/AI tool availability

## `git gtr version`

Show the installed gtr version.

## `git gtr help [command]`

Show help for a specific command or general help.
