---
name: infra-bundles
description: "Operate or review Kubernetes and Terraform/OpenTofu changes, drift, recovery, and ownership with the repository's infrastructure gates."
---

# Infrastructure Bundles

Choose one infrastructure risk surface, then load only its selected reference.

## Route

| Target | Select when | Read |
| --- | --- | --- |
| `kubernetes-operations` | The task is an audit, failure, network, observability, security, delivery, recovery, or migration operation on a workload or cluster | `references/kubernetes-operations.md` |
| `kubernetes-platform` | The task changes workload posture, probes, resources, storage, platform ownership, or rollout design | `references/kubernetes-platform.md` |
| `iac-operations` | The task is a Terraform/OpenTofu audit, plan, failure, delivery, recovery, migration, drift, security, or cost operation on declared infrastructure | `references/iac-operations.md` |
| `iac-platform` | The task changes a Terraform/OpenTofu module, provider, backend, state, IAM, or infrastructure ownership design | `references/iac-platform.md` |

Read only the references needed for the affected operation or design decision.

## Neighbor precedence

- Kubernetes/IaC desired-state, live-state, delivery, recovery, and platform decisions belong here.
- Source-code diagnosis belongs to `code-quality`; hand off when the proof or change is in application source rather than Kubernetes/IaC declared or live state.
- Product or implementation planning belongs to its planning owner until a Kubernetes/IaC desired or live behavior is the actual decision.

## Workflow

1. Identify the exact environment, owner, target, and allowed mutation scope.
2. Compare repository desired state with the live evidence needed for the task.
3. Detect the installed tool and repository workflow before using version-sensitive flags, schemas, provider behavior, or external rules.
4. Form a concrete change or failure hypothesis, choose the smallest reversible action, and verify health, ownership, and rollback reality afterward.

## Hard rules

- Audit before mutating, minimize blast radius, and preserve evidence before restart, rollback, state surgery, or replacement.
- Treat source-controlled declarative state as the durable outcome; do not leave a manual live fix as the final state.
- Do not commit plaintext secrets, widen identity or network exposure casually, or hide ownership confusion with a permissive exception.
- Do not apply infrastructure blindly, use targeting as routine delivery, or treat a nominal no-destroy result as proof of safety.
- State risk, evidence, verification, rollback or recovery limits, and the next smallest safe step.

## Stop conditions

- Stop and request the missing environment, ownership, access, or rollback information before a risky mutation.
- Report uncertainty instead of guessing when repository state, live evidence, or current primary documentation disagrees.

## Output

Return the selected target, scope and risk, evidence, intended action or cause, verification, rollback reality, and blocked dependency.
