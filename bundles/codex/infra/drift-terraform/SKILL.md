---
name: drift-terraform
description: Diagnose and reconcile Terraform drift across config, state, imports, and cloud resources without unsafe state edits.
args:
  - name: target
    description: The stack, module, environment, or drift area to reconcile (optional)
    required: false
user-invokable: true
---

Reconcile Terraform drift carefully. Focus on {{target}} when provided.

**First**: Use the terraform-platform skill when available. Read `reference/drift-and-imports.md` and `reference/state-and-backends.md` before proposing state-level changes.

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
