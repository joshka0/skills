---
name: recover-terraform
description: Incident-mode Terraform recovery skill that stabilizes impacted infrastructure, preserves evidence, limits blast radius, and guides rollback or repair under pressure.
args:
  - name: target
    description: The stack, environment, or incident area in recovery (optional)
    required: false
user-invokable: true
---

Operate in incident mode for Terraform recovery. Focus on {{target}} when provided.

**First**: Use the terraform-platform skill when available. Read `reference/debugging.md`, `reference/plans-and-rollouts.md`, and `reference/state-and-backends.md` first.

## Recovery Priorities

1. Stabilize impact
2. Preserve evidence
3. Reduce blast radius
4. Choose rollback or forward repair deliberately

## Incident Rules

- Do not edit state before the ownership model is clear
- Prefer rollback when the causing change is known and rollback is real
- Prefer narrow mitigations over broad unreviewed changes
- Record what changed, where, and why

## Output

- Current impact
- Immediate stabilization action
- Evidence preserved
- Recommended rollback or repair path
- Verification and follow-up actions
