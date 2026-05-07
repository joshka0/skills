---
name: recover-k8s
description: Incident-mode Kubernetes recovery skill that stabilizes service, preserves evidence, limits blast radius, and guides rollback or remediation under pressure.
args:
  - name: target
    description: The incident scope, namespace, service, or platform area in recovery (optional)
    required: false
user-invokable: true
---

Operate in incident mode for Kubernetes recovery. Focus on {{target}} when provided.

**First**: Use the kubernetes-platform skill when available. Read `reference/debugging.md`, `reference/rollouts.md`, and `reference/observability.md` first.

## Recovery Priorities

1. Stabilize user impact
2. Preserve evidence
3. Reduce blast radius
4. Choose rollback or forward fix deliberately

## Incident Rules

- Do not delete evidence before reading it
- Prefer rollback when the change is clearly causal and rollback is real
- Prefer a narrowly scoped mitigation over a sweeping change under uncertainty
- Record what changed, when, and why

## Output

- Current impact
- Immediate stabilization action
- Evidence preserved
- Recommended rollback or repair path
- Verification and follow-up actions
