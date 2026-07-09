# Recover Mode

Operate in incident mode for Terraform recovery. Focus on {{target}} when provided.

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
