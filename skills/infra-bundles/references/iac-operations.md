# Infrastructure-as-code operations

Use this reference for an audit, plan, failure, delivery, recovery, migration, drift, security, or cost operation on declared infrastructure.

1. Detect the repository's installed IaC tool and normal delivery workflow before selecting commands or interpreting version-sensitive behavior.
2. Separate configuration, state, and real-provider ownership. Treat unexplained drift as an ownership signal; gather plan, state, provider, drift, and dependency evidence for the target.
3. Treat the plan as a semantic review artifact, not a count. Identify replacements, ordering, downtime, permission, and rollback limits before proposing apply-time action.
4. Prefer a small source change that converges state safely; verify configuration, state, and provider reality afterward.

For an AI-run apply, use `scripts/iac-apply-gate`. Its `plan` step requires the environment, workspace, and exact create, update, replace, and delete counts. It writes a saved plan and a hash-bound receipt only when the actions match. Its `apply` step accepts only that saved plan. A replace or delete also requires `--allow-destructive`. After apply, create a fresh zero-change gated plan. Then use the wrapper's `dispose` step to move sensitive plan artifacts to the macOS Trash.

Never run a blind apply, edit state as a first resort, use targeting as routine delivery, commit secrets in variables or outputs, or hide drift with an ownership exception. A no-destroy plan can still be unsafe; name a cost trade-off as a product decision when it changes reliability or retention.
