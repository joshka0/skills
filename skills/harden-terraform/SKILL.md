---
name: harden-terraform
description: Improve Terraform safety, maintainability, and production readiness with better module boundaries, version constraints, IAM posture, secret handling, and state discipline.
args:
  - name: target
    description: The stack, module, backend, or policy area to harden (optional)
    required: false
user-invokable: true
---

Strengthen the Terraform setup so it is safer and more maintainable. Focus on {{target}} when provided.

**First**: Use the terraform-platform skill when available. Read `reference/modules.md`, `reference/state-and-backends.md`, and `reference/iam-and-secrets.md` as needed.

## Review Hardening Gaps

- Missing or loose provider and module version constraints
- State handling that is fragile or opaque
- Over-broad IAM or ambiguous auth flows
- Sensitive data leakage through vars, outputs, or examples
- Module boundaries that hide ownership or make review difficult
- Lifecycle rules used to suppress rather than solve problems

## Improve Systematically

- Tighten versioning and auth clarity
- Reduce privilege and secret exposure
- Make backend and state behavior obvious
- Prefer simpler module boundaries over clever indirection
- Remove unsafe defaults and review blind spots

## Verify

- The hardened setup remains understandable to a reviewer
- The changes reduce risk without creating hidden operational traps
- Any migration or follow-up work is called out explicitly
