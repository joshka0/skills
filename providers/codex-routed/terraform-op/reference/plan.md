# Plan Mode

Produce a safe Terraform change plan. Focus on {{target}} when provided.

## Plan the Change

- Define what is changing and what must remain stable
- Identify state, provider, module, IAM, and dependency impacts
- Highlight resources that will be replaced, destroyed, imported, or moved
- Define approval and apply prerequisites before suggesting execution

## Review Rules

- Read for semantics, not just counts
- Call out any create-before-destroy assumptions
- Distinguish safe incremental changes from high-risk refactors
- Treat backend, import, and state-address changes as special handling cases

## Output

- Change summary
- Blast radius
- Replacement or destruction risks
- Sequencing requirements
- Apply prerequisites
- Verification and rollback notes
