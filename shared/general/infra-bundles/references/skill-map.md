# Infra Bundle Skill Map

Read only the section that matches the task.

## Kubernetes

- `.routed/kubernetes-platform/SKILL.md` - foundational posture and references.
- `.routed/k8s-op/SKILL.md` - focused operations with modes:
  - `mode=audit` - reliability/security/rollout audit
  - `mode=debug` - failure diagnosis
  - `mode=network` - Service/Ingress/DNS/routing/policy
  - `mode=observe` - logs/metrics/events/alerts
  - `mode=security` - RBAC/pod security/admission/secrets (aliases: harden)
  - `mode=optimize` - performance and capacity
  - `mode=ship` - delivery with rollback
  - `mode=recover` - incident recovery
  - `mode=migrate` - workload/ingress/chart migration
- `.routed/teach-context/SKILL.md` with `domain=kubernetes` - durable cluster context.

## Terraform

- `.routed/terraform-platform/SKILL.md` - foundational posture and references.
- `.routed/terraform-op/SKILL.md` - focused operations with modes:
  - `mode=audit` - state/module/IAM/drift audit
  - `mode=debug` - Terraform failure diagnosis
  - `mode=plan` - blast-radius and replacement review
  - `mode=ship` - delivery with sequencing/rollback
  - `mode=recover` - infra incident recovery
  - `mode=migrate` - module/address/backend/import migration
  - `mode=drift` - drift reconciliation
  - `mode=security` - IAM/tagging/encryption/exposure (aliases: harden)
  - `mode=cost` - spend and retention review
- `.routed/teach-context/SKILL.md` with `domain=terraform` - durable Terraform context.
