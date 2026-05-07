---
name: cost-terraform
description: Review Terraform-managed infrastructure for encoded waste, oversizing, unnecessary always-on resources, and missing retention or tiering controls.
args:
  - name: target
    description: The stack, module, environment, or cost area to review (optional)
    required: false
user-invokable: true
---

Review Terraform for cost discipline. Focus on {{target}} when provided.

**First**: Use the terraform-platform skill when available. Read `reference/cost-and-sizing.md` plus module or provider references as needed.

## Review Areas

- Oversized compute, storage, or database defaults
- Idle always-on resources
- Missing schedules, tiering, or lifecycle controls
- Replication, retention, or logging that is expensive without clear intent

## Rules

- Do not optimize cost by hiding reliability risk
- Prefer removing waste over adding complexity
- Call out when cost is a product decision rather than an infra mistake

## Output

- Main sources of waste
- Recommended reductions
- Tradeoffs
- Verification and guardrails
