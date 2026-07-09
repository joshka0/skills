# Infrastructure-as-code operations

Use this reference for an audit, plan, failure, delivery, recovery, migration, drift, security, or cost operation on declared infrastructure.

1. Detect the repository's installed IaC tool and normal delivery workflow before selecting commands or interpreting version-sensitive behavior.
2. Separate configuration, state, and real-provider ownership. Gather plan, state, provider, drift, and dependency evidence for the target.
3. Treat the plan as a primary review artifact. Identify replacements, ordering, downtime, permission, and rollback limits before proposing apply-time action.
4. Prefer a small source change that converges state safely; verify configuration, state, and provider reality afterward.

Never run a blind apply, edit state as a first resort, use targeting as routine delivery, commit secrets in variables or outputs, or hide drift with an ownership exception. A no-destroy plan can still be unsafe.
