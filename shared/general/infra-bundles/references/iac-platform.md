# Infrastructure-as-code platform

Use this reference when module boundaries, provider configuration, state/backends, IAM, or infrastructure ownership design is the main decision.

- Keep root modules, reusable modules, variables, outputs, and ownership boundaries explicit enough that callers do not need provider internals.
- Treat provider and module constraints, aliases, authentication, and backends as repository-state facts to inspect rather than advice to memorize.
- Make imports, moves, backend changes, and replacements explicit migration decisions with lock, recovery, and source-cleanup plans.
- Keep least privilege, sensitive-output handling, tags, encryption, and exposure rules visible at the owning layer.
- Prefer the repository's declared CI or GitOps delivery path over ad hoc workstation mutation unless the user explicitly authorizes a recovery action.

Use current primary documentation only after repository state and live tool output establish the installed version and provider behavior.
