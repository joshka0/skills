# Drift Mode

Reconcile Terraform drift carefully. Focus on {{target}} when provided.

## Diagnose Drift

- Determine whether config, state, or cloud is intended to be authoritative
- Identify manual changes, imports, address moves, or provider behavior causing the mismatch
- Separate acceptable divergence from accidental ownership loss

## Rules

- Do not use `ignore_changes` as the default answer
- Do not edit state until the intended steady state is clear
- Prefer convergence through config where possible

## Output

- Source of drift
- Recommended ownership model
- Smallest safe reconciliation path
- State or replacement risks
- Verification steps
