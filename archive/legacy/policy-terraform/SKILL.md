---
name: policy-terraform
description: Review and tighten Terraform control posture across IAM, tagging, encryption, exposure boundaries, and guardrails.
args:
  - name: target
    description: The stack, module set, provider, or policy layer to review (optional)
    required: false
user-invokable: true
---

Tighten Terraform policy and control posture. Focus on {{target}} when provided.

**First**: Use the terraform-platform skill when available. Read `reference/iam-and-secrets.md` and any module or provider references tied to the policy area.

## Review Areas

- Over-broad IAM
- Missing encryption, tagging, or exposure controls
- Secret handling that exceeds need
- Policy-as-code gaps or noisy unenforced policy
- Account or environment boundaries that are too implicit

## Principles

- Least privilege over convenience
- Guardrails should be understandable and actionable
- Policy should make unsafe changes harder, not make normal work mysterious

## Output

- Current policy risk
- Recommended tightened posture
- Compatibility concerns
- Verification steps
