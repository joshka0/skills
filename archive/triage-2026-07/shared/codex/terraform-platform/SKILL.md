---
name: terraform-platform
description: Foundational Terraform posture for safe infra-as-code work, with anti-patterns and guidance on when to consult domain references.
license: Apache 2.0. Forked house skill for Terraform operations and delivery.
---

Use this skill as the foundation for Terraform work in this repo. It defines the operating posture, risk model, and anti-patterns for infrastructure changes, state management, reviews, and recovery.

## Operating Posture

- Prefer declarative source changes over console fixes or manual cloud edits
- Distinguish config, state, and real cloud resources clearly
- Treat `plan` as a primary review artifact, not a formality
- Minimize blast radius: scope work to the target stack, module, environment, or provider concern
- Assume state changes, imports, backend migrations, and replacements are higher risk than normal edits

## Default Workflow

1. Identify the exact target and environment boundaries.
2. Inspect the current module, variables, backend, and provider layout.
3. Understand recent drift, imports, refactors, or apply history that may affect the change.
4. Validate and format before reasoning from a plan.
5. Produce or interpret a plan before proposing apply-time actions.
6. Call out replacement risk, dependency ordering, and rollback reality explicitly.

## Hard Rules

- Do not run blind `terraform apply`
- Do not edit state casually or use state subcommands as the first resort
- Do not use `-target` as a normal delivery workflow
- Do not keep secrets in committed vars, outputs, or plan artifacts
- Do not leave provider or module versions unconstrained without a strong reason
- Do not widen IAM or resource exposure casually
- Do not use `ignore_changes` to hide ownership confusion or real drift
- Do not assume “0 to destroy” means “safe”

## Terraform Anti-Patterns

- Huge root modules with no composition or ownership boundaries
- Copy-pasted modules that differ only by names and tags
- Imports without follow-up source cleanup
- `terraform apply` from a workstation when the real workflow is CI/GitOps
- State surgery before exhausting safer migration paths
- Resource replacements hidden in noisy plans
- Outputs exposing sensitive values by habit
- Backend changes without lock, migration, and failure planning
- Provider auth or aliasing arranged implicitly and left mysterious

## References

Read only the reference file that fits the task:

- `reference/modules.md` for root/module boundaries, variables, outputs, and composition
- `reference/state-and-backends.md` for remote state, locking, imports, moves, and migration risk
- `reference/providers.md` for versioning, aliases, auth posture, and provider-specific discipline
- `reference/iam-and-secrets.md` for permissions, sensitive data handling, and policy concerns
- `reference/plans-and-rollouts.md` for plan review, replacement analysis, sequencing, and rollback reality
- `reference/drift-and-imports.md` for drift detection, import cleanup, ownership reconciliation, and safe convergence
- `reference/cost-and-sizing.md` for cost hygiene, right-sizing, and avoiding waste encoded in IaC
- `reference/debugging.md` for failed plan/apply, dependency, provider, and graph troubleshooting

## Output Expectations

When acting on Terraform work:

- State the target, assumptions, and risk level
- Separate current symptoms from inferred root cause
- Call out replacement, destruction, downtime, or state-risk explicitly
- Prefer concrete verification and review steps over vague confidence
