---
name: ship-terraform
description: Safely introduce Terraform-managed infrastructure changes with plan discipline, sequencing, verification, and rollback-aware delivery.
args:
  - name: target
    description: The stack, module, or infrastructure area to ship (optional)
    required: false
user-invokable: true
---

Prepare the Terraform change for safe delivery. Focus on {{target}} when provided.

**First**: Use the terraform-platform skill when available. Read `reference/plans-and-rollouts.md` plus any module, provider, or IAM references touched by the change.

## Plan the Delivery

- Define the exact change and environment boundaries
- Identify prerequisites: credentials, locks, remote state access, policy checks, dependencies
- Verify whether the plan contains replacement, downtime, or ordering risk

## Ship Carefully

- Prefer narrow, reviewable changes
- Avoid bundling unrelated cleanups into the same apply path
- Keep module, variable, and backend intent explicit
- Treat the plan as an approval artifact, not just an execution prelude

## Verify

- Config is formatted and validated
- The plan matches the intended semantic change
- Post-apply checks are defined
- Rollback or forward-fix path is realistic
