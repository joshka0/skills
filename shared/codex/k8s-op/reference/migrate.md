# Migrate Mode

Plan the Kubernetes migration carefully. Focus on {{target}} when provided.

## Migration Planning

- Define source state, target state, and invariants that must not break
- Identify compatibility constraints: config, schema, storage, traffic, RBAC, policy
- Decide what can run in parallel and what requires a cutover
- Define rollback before execution

## Rules

- Do not bundle unrelated cleanup into a migration
- Treat stateful moves as high-risk until backup and restore paths are verified
- Prefer reversible steps and compatibility windows where possible

## Output

- Migration stages
- Risks and prerequisites
- Cutover plan
- Rollback plan
- Post-migration verification
