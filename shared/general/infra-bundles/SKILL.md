---
name: infra-bundles
description: >-
  Router for infrastructure skills. Covers: kubernetes-platform, k8s-op (audit,
  debug, network, observe, security, harden, optimize, ship, recover, migrate),
  terraform-platform, terraform-op (audit, debug, plan, ship, recover, migrate,
  drift, security, harden, cost), and teach-context.
---

# Infra Bundles

Use this as the small entrypoint for infrastructure work.

## Rule

Choose Kubernetes or Terraform first, then choose the operation. Read only the
matching skill from `references/skill-map.md`.

## Routing

1. Identify domain: Kubernetes or Terraform.
2. For foundation posture and references, use `kubernetes-platform` or `terraform-platform`.
3. For focused operations, use `k8s-op` or `terraform-op` with the relevant mode.
4. For context setup, use `teach-context` with `domain=kubernetes` or `domain=terraform`.

## Safety Defaults

- Audit before mutating.
- Dry run before apply.
- Preserve rollback paths.
- Keep secrets under `local-secrets`.
