# Gtr operations

Read this only after selecting a gtr lifecycle, configuration, or recovery operation.

## Preflight

```sh
git rev-parse --show-toplevel
git gtr --help
git gtr list
```

Read one configuration value only when it affects the request, for example `git gtr config get <key>`. Treat a missing value as unset; do not invent a global default.

## Lifecycle

For a requested isolated branch, use the installed help to choose the current create form, then verify with `git gtr list`. Resolve an existing target with `git gtr list` before editor, AI, run, or removal operations.

Before requested cleanup, show the exact worktree and its branch/status. Use a gtr cleanup command only when current help proves it moves the filesystem target to Trash; otherwise stop and report the unsupported safe action. Never delete the branch or use destructive Git. Re-list afterward and report any stale metadata rather than forcing cleanup.

## Shared-worktree safety

- Prefer a new named worktree for parallel mutation.
- Use a name that identifies the task, not a generic shared label.
- Keep local configuration, generated artifacts, and secret files out of implicit copy rules.
- If gtr reports a conflict or stale target, inspect status and stop for a user decision rather than force replacement.
