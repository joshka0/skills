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

Before requested cleanup, inspect the exact worktree and its branch/status. Verify the command's effects from current help, including branch removal. Preserve unique work and the branch; prefer Trash when practical, or use a supported non-forced removal within scope. Re-list afterward and report any unresolved metadata.

## Shared-worktree safety

- Prefer a new named worktree for parallel mutation.
- Use a name that identifies the task, not a generic shared label.
- Keep local configuration, generated artifacts, and secret files out of implicit copy rules.
- If gtr reports a conflict or stale target, inspect status and stop for a user decision rather than force replacement.
