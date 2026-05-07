---
name: policy-k8s
description: Review and improve Kubernetes policy and access controls across RBAC, service accounts, pod security, admission policy, and secret exposure boundaries.
args:
  - name: target
    description: The namespace, workload set, policy layer, or access area to review (optional)
    required: false
user-invokable: true
---

Tighten Kubernetes policy and access controls. Focus on {{target}} when provided.

**First**: Use the kubernetes-platform skill when available. Read `reference/security.md`, and read networking or rollout references if the policy area touches traffic or delivery.

## Review Areas

- Over-broad RBAC
- Shared or default service accounts
- Missing or weak pod security settings
- Secret access that exceeds workload need
- Admission rules that are inconsistent, noisy, or easy to bypass

## Principles

- Least privilege over convenience
- Guardrails should be understandable and actionable
- Policy should reduce ambiguity, not create mystery outages

## Output

- Current policy risk
- Recommended tightened posture
- Compatibility or migration concerns
- Verification steps
