# Security Mode (aliases: `harden`)

Tighten Kubernetes policy, access controls, and workload hardening. Focus on {{target}} when provided.

This mode merges policy review and hardening into a single security workflow.

## Policy Review Areas

- Over-broad RBAC
- Shared or default service accounts
- Missing or weak pod security settings
- Secret access that exceeds workload need
- Admission rules that are inconsistent, noisy, or easy to bypass

## Hardening Gaps

- Missing or unrealistic readiness, startup, and liveness probes
- Missing CPU or memory requests
- Risky RBAC or default service account use
- Missing security context defaults
- Uncontrolled disruption or brittle rollouts
- Secret handling that leaks or overexposes access
- Policy blind spots around namespace, network, or admission controls

## Principles

- Least privilege over convenience
- Guardrails should be understandable and actionable
- Policy should reduce ambiguity, not create mystery outages

## Improve Systematically

- Add sane requests before discussing autoscaling
- Prefer readiness and startup probes over aggressive liveness restarts
- Scope service accounts and RBAC tightly
- Reduce privilege in pod security settings
- Add disruption budgets where availability matters
- Make rollouts observable and rollbackable

## Verify

- Confirm the hardened configuration still matches real startup and serving behavior
- Confirm blast radius is reduced, not merely shifted elsewhere
- Note any follow-up work that still requires platform-level policy changes
