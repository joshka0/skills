---
name: infra-bundles
description: >-
  Router for infrastructure skills. Covers: kubernetes-platform, audit-k8s,
  debug-k8s, harden-k8s, migrate-k8s, network-k8s, observe-k8s, optimize-k8s,
  policy-k8s, recover-k8s, ship-k8s, teach-cluster, terraform-platform,
  audit-terraform, debug-terraform, drift-terraform, harden-terraform,
  migrate-terraform, plan-terraform, policy-terraform, recover-terraform,
  ship-terraform, cost-terraform, and teach-infra.
---

# Infra Bundles

Use this as the small entrypoint for infrastructure work.

## Rule

Choose Kubernetes or Terraform first, then choose the operation. Read only the
matching skill from `references/skill-map.md`.

## Routing

1. Identify domain: Kubernetes or Terraform.
2. Identify operation: audit, debug, drift, harden, migrate, network, observe,
   optimize, policy, recover, ship, teach, or platform.
3. Read only the matching detailed skill path.
4. Prefer durable source-of-truth fixes over live-only changes.

## Safety Defaults

- Audit before mutating.
- Dry run before apply.
- Preserve rollback paths.
- Keep secrets under `local-secrets`.
