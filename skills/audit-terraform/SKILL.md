---
name: audit-terraform
description: Perform a structured Terraform review across state safety, module quality, provider discipline, IAM, drift, rollout risk, and cost, then produce prioritized findings and next steps.
args:
  - name: target
    description: The stack, environment, module set, or infrastructure concern to audit (optional)
    required: false
user-invokable: true
---

Run a systematic Terraform audit. Focus on {{target}} when provided.

**First**: Use the terraform-platform skill when available. Read only the references relevant to the audited area.

## Audit Dimensions

- State and backend safety
- Module structure and reviewability
- Provider and version discipline
- IAM and secret exposure
- Drift and import hygiene
- Plan/apply safety and replacement risk
- Cost and right-sizing

## Report Format

Start with findings, ordered by severity:

- **Critical**
- **High**
- **Medium**
- **Low**

For each finding include:

- Location
- Why it matters
- Evidence
- Recommended next step
- Suggested follow-up skill: {{available_commands}}

End with:

- Overall verdict
- Top three risks
- Fastest high-value remediation path
