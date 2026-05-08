---
name: migrate-terraform
description: Plan and execute Terraform migrations across modules, addresses, backends, imports, providers, and env structure safely.
args:
  - name: target
    description: The stack, module, backend, or migration area to move (optional)
    required: false
user-invokable: true
---

Plan the Terraform migration carefully. Focus on {{target}} when provided.

**First**: Use the terraform-platform skill when available. Read the module, state, provider, or drift references that match the migration path.

## Migration Planning

- Define source state, target state, and invariants that must not break
- Identify address changes, imports, backend shifts, policy changes, and downtime risk
- Decide what can be migrated incrementally versus what needs a coordinated cutover
- Define rollback before execution

## Rules

- Do not hide migration complexity inside a routine feature change
- Treat backend migration and state-address refactors as high-risk
- Prefer reversible, reviewable stages where possible

## Output

- Migration stages
- Risks and prerequisites
- State implications
- Rollback plan
- Post-migration verification
