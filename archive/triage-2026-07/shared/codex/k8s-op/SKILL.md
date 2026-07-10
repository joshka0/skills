---
name: k8s-op
description: Run Kubernetes operations — audit, debug, network, observe, security, harden, optimize, ship, recover, or migrate.
args:
  - name: mode
    description: audit | debug | network | observe | security | harden | optimize | ship | recover | migrate
    required: true
  - name: target
    description: Namespace, workload, service, or cluster area to target.
    required: false
user-invokable: true
---

Use this skill for focused Kubernetes operations. **First**: Use `kubernetes-platform` for foundational posture and references.

Read only the reference file for the requested mode.

## Shared Workflow

1. Identify exact target and environment boundaries
2. Inspect desired state in code, compare with live state
3. Gather evidence from events, rollout status, logs, probes, endpoints, policies
4. Form concrete hypothesis before changing
5. Prefer smallest safe change that can be verified quickly
6. Verify health, dependencies, rollback readiness after any change

## Shared Rules

- Do not use mutable image tags like `latest`
- Do not add broad cluster-admin or wildcard RBAC without justification
- Do not commit plaintext secrets
- Do not ship workloads without requests and health probes
- Do not "just restart the pod" as substitute for diagnosis
- Do not widen network policy or ingress exposure casually

## Modes

| Mode | Description |
| --- | --- |
| `audit` | Systematic review of reliability, security, networking, storage, observability, and delivery posture |
| `debug` | Diagnose failures across workloads, networking, config, scheduling, policy, and runtime |
| `network` | Diagnose and improve Services, Ingress, DNS, routing, endpoint selection, and network policy |
| `observe` | Improve events, logs, metrics, dashboards, alerting, and service-level checks |
| `security` | Review and tighten RBAC, pod security, admission, secrets, and access controls (aliases: `harden`) |
| `optimize` | Right-size resources, tune autoscaling, reduce waste, and improve cost efficiency |
| `ship` | Safely deliver workload, service, ingress, and config changes with rollout verification |
| `recover` | Operate in incident mode to stabilize, preserve evidence, limit blast radius, and guide recovery |
| `migrate` | Plan and execute migrations across workloads, ingress, charts, namespaces, and storage |

## Output Format

For every mode, produce:

- **Target**: What is being operated on
- **Risk level**: High / Medium / Low
- **Evidence**: Observations backing the analysis
- **Likely cause or change intent**: What is happening or what you intend to change
- **Smallest safe next step**: The narrowest verifiable action
- **Verification**: How to confirm the change or fix worked
- **Rollback / follow-up**: What to do if things go wrong, or what to revisit next
