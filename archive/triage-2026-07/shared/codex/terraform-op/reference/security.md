# Security Mode (aliases: `harden`)

Tighten Terraform policy, control posture, and operational safety. Focus on {{target}} when provided.

This mode merges policy review and hardening into a single security workflow.

## Policy Review Areas

- Over-broad IAM
- Missing encryption, tagging, or exposure controls
- Secret handling that exceeds need
- Policy-as-code gaps or noisy unenforced policy
- Account or environment boundaries that are too implicit

## Hardening Gaps

- Missing or loose provider and module version constraints
- State handling that is fragile or opaque
- Over-broad IAM or ambiguous auth flows
- Sensitive data leakage through vars, outputs, or examples
- Module boundaries that hide ownership or make review difficult
- Lifecycle rules used to suppress rather than solve problems

## Principles

- Least privilege over convenience
- Guardrails should be understandable and actionable
- Policy should make unsafe changes harder, not make normal work mysterious

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
