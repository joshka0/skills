---
name: terraform-op
description: Run Terraform operations — audit, debug, plan, ship, recover, migrate, drift, security, harden, or cost.
args:
  - name: mode
    description: audit | debug | plan | ship | recover | migrate | drift | security | harden | cost
    required: true
  - name: target
    description: Stack, module, provider, or resource area to target.
    required: false
user-invokable: true
---

Use this skill for focused Terraform operations. **First**: Use `terraform-platform` for foundational posture and references.

Read only the reference file for the requested mode.

## Shared Workflow

1. Identify exact target and environment boundaries
2. Inspect desired config, compare with current state and live cloud ownership
3. Gather evidence from plan output, state inspection, provider logs, drift signals
4. Form concrete hypothesis before changing
5. Prefer smallest safe change that can be verified quickly
6. Verify config, state, and cloud alignment after any change

## Shared Rules

- Do not run blind `terraform apply`
- Do not edit state casually
- Do not use `-target` as normal delivery workflow
- Do not keep secrets in committed vars, outputs, or plan artifacts
- Do not leave provider/module versions unconstrained
- Do not widen IAM or resource exposure casually

## Modes

| Mode | Description |
| --- | --- |
| `audit` | Systematic review of state safety, modules, providers, IAM, drift, rollout risk, and cost |
| `debug` | Diagnose failures across config, state, providers, imports, graphs, and remote APIs |
| `plan` | Prepare changes with explicit blast-radius, replacement-risk, sequencing, and rollback analysis |
| `ship` | Safely deliver infrastructure changes with sequencing, verification, and rollback discipline |
| `recover` | Operate in incident mode to stabilize infrastructure, preserve evidence, and guide repair |
| `migrate` | Plan and execute migrations across modules, addresses, backends, imports, and providers |
| `drift` | Diagnose and reconcile config/state/cloud drift without unsafe state edits |
| `security` | Review and tighten IAM, tagging, encryption, exposure boundaries, and guardrails (aliases: `harden`) |
| `cost` | Review for waste, oversizing, always-on spend, and missed retention or tiering opportunities |

## Output Format

For every mode, produce:

- **Target**: What is being operated on
- **Risk level**: High / Medium / Low
- **Evidence**: Observations backing the analysis
- **Likely cause or change intent**: What is happening or what you intend to change
- **Smallest safe next step**: The narrowest verifiable action
- **Verification**: How to confirm the change or fix worked
- **Rollback / follow-up**: What to do if things go wrong, or what to revisit next
