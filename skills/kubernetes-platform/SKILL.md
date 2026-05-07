---
name: kubernetes-platform
description: Foundational Kubernetes platform skill for safe, production-grade cluster work. Covers operating posture, anti-patterns, and when to consult workload, networking, security, rollout, observability, storage, sizing, and debugging references.
license: Apache 2.0. Forked house skill for Kubernetes operations and delivery.
---

Use this skill as the foundation for Kubernetes work in this repo. It defines the operating posture, review bar, and anti-patterns for cluster changes, debugging, rollout safety, and platform hygiene.

## Operating Posture

- Prefer declarative changes over mutable one-off fixes
- Work from the repo, manifests, charts, and values first; verify against live state second
- Minimize blast radius: scope to the target namespace, workload, service, or policy area
- Stabilize before optimizing; preserve evidence before restarting or rolling back
- Always keep rollback, observability, and least privilege in view

## Default Workflow

1. Identify the exact target and environment boundaries.
2. Inspect current desired state in code, then compare with live state.
3. Gather evidence from events, rollout status, logs, probes, endpoints, and policies.
4. Form a concrete hypothesis before making changes.
5. Prefer the smallest safe change that improves the system and can be verified quickly.
6. After any change, verify health, dependencies, and rollback readiness.

## Hard Rules

- Do not use mutable image tags like `latest`
- Do not add broad `cluster-admin` or wildcard RBAC without explicit justification
- Do not commit plaintext secrets or opaque secret material
- Do not ship workloads without requests and health probes unless there is a strong reason
- Do not use manual live fixes as the final state; reflect intended changes back into source
- Do not “just restart the pod” as a substitute for diagnosis unless service restoration is the declared goal
- Do not widen network policy, ingress exposure, or service type casually

## Kubernetes Anti-Patterns

- Giant all-in-one YAML dumps without ownership or reasoning
- Helm value cargo-culting without checking what the chart actually renders
- HPA without sane CPU or memory requests
- Readiness probes that always pass or do not match real dependencies
- Liveness probes used to hide slow startup or dependency failures
- `kubectl edit` patches that never return to Git
- NodePort or public LoadBalancer exposure as a shortcut for broken ingress or service discovery
- Troubleshooting by deleting pods before reading events, rollout status, and logs
- Stateful migrations without backup, restore, or rollback plans

## References

Read only the reference file that fits the task:

- `reference/workloads.md` for Deployments, StatefulSets, Jobs, probes, resources, and rollout mechanics
- `reference/networking.md` for Services, Ingress, DNS, endpoints, policies, and traffic debugging
- `reference/security.md` for RBAC, service accounts, pod security, secrets, and admission concerns
- `reference/rollouts.md` for safe delivery, rollback, disruption budgets, and progressive change patterns
- `reference/observability.md` for events, logs, metrics, dashboards, alerts, and incident evidence
- `reference/storage.md` for PVCs, storage classes, stateful risk, and backup/restore concerns
- `reference/cost-and-sizing.md` for requests, limits, autoscaling, right-sizing, and cost hygiene
- `reference/debugging.md` for a compact evidence-first troubleshooting checklist

## Output Expectations

When acting on Kubernetes work:

- State the target, assumptions, and risk level
- Distinguish current symptoms from inferred root cause
- Prefer concrete verification steps over vague reassurance
- Call out rollback and follow-up work whenever risk is non-trivial
