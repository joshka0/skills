---
name: gtr
description: "Operate Git Worktree Runner with configured worktree topology and destructive-operation guardrails. Use when the user names git gtr, a gtr worktree, or an isolated gtr workspace."
---

# Git Worktree Runner

Operate the installed `git gtr` safely; live help and configured Git state are the source of truth for syntax and topology.

## Workflow

1. Confirm the current directory is a Git repository and `git gtr` is available.
2. Inspect only needed configuration and worktree status before choosing a target.
3. For create, use the user-requested branch/name and report the resulting worktree path and status.
4. For editor, AI, or command execution, resolve the exact existing worktree first.
5. Read `references/operations.md` only for a lifecycle, configuration, or recovery operation.

## Hard rules

- Do not install or globally configure gtr without explicit user approval.
- Move filesystem cleanup targets only with `/usr/bin/trash <path>`. Never use destructive Git, delete a branch, or invoke a gtr cleanup action unless live help proves it is Trash-backed; confirmation does not override this rule.
- Never automatically copy secret-bearing files or run a configured hook without user approval.
- Do not guess worktree roots, branch names, editor, AI adapter, or gtr flags; inspect live configuration or `git gtr --help`.
- Use one worktree per concurrent mutating agent and avoid touching a worktree owned by another active task.

## Output

Report the resolved target, action, resulting worktree/status, and any Trash or live-help boundary used.
