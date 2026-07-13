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

Before removal or cleanup, show the exact worktree and its branch/status, ask for confirmation, then run the current documented gtr command. Re-list afterwards; do not assume a branch was removed merely because the worktree changed.

## Shared-worktree safety

- Prefer a new named worktree for parallel mutation.
- Use a name that identifies the task, not a generic shared label.
- Keep local configuration, generated artifacts, and secret files out of implicit copy rules.
- If gtr reports a conflict or stale target, inspect status and stop for a user decision rather than force replacement.
