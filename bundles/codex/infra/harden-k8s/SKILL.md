---
name: harden-k8s
description: Strengthen Kubernetes workloads with safer probes, resources, disruption controls, RBAC, and production-ready defaults.
args:
  - name: target
    description: The workload, chart, namespace, or platform area to harden (optional)
    required: false
user-invokable: true
---

Strengthen the Kubernetes setup so it is safer and more production-ready. Focus on {{target}} when provided.

**First**: Use the kubernetes-platform skill when available. Read `reference/workloads.md`, `reference/security.md`, and `reference/rollouts.md` as needed.

## Review Hardening Gaps

Check for:

- Missing or unrealistic readiness, startup, and liveness probes
- Missing CPU or memory requests
- Risky RBAC or default service account use
- Missing security context defaults
- Uncontrolled disruption or brittle rollouts
- Secret handling that leaks or overexposes access
- Policy blind spots around namespace, network, or admission controls

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
