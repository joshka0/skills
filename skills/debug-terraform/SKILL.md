---
name: debug-terraform
description: Diagnose Terraform failures across config, state, providers, dependency graphs, imports, and remote API behavior. Produces an evidence-based root-cause summary and the smallest safe next action.
args:
  - name: target
    description: The stack, module, environment, or failure area to debug (optional)
    required: false
user-invokable: true
---

Diagnose the Terraform issue systematically. Focus on {{target}} when provided.

**First**: Use the terraform-platform skill when available. Read `reference/debugging.md` first, then only the state, provider, module, or drift references that match the symptoms.

## Gather Evidence

1. Identify the failing stage:
   - `init`, `validate`, `plan`, `apply`, import, or backend migration
2. Compare desired config, current state posture, and live cloud ownership
3. Read evidence in this order:
   - Error output
   - Address/module path involved
   - Provider/auth context
   - State/backends or import history
   - Recent refactors, version bumps, or manual cloud changes

## Working Rules

- Do not jump to apply as a debugging method
- Do not reach for `-target` or state subcommands before understanding the graph
- Change one variable at a time

## Output

- **Symptoms**
- **Most likely root cause**
- **Confidence**: High / Medium / Low
- **Smallest safe next action**
- **Verification**
- **Risks**: replacement, downtime, state, or policy concerns
