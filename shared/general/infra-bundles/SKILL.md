---
name: infra-bundles
description: "Route Kubernetes and infrastructure-as-code work to a risk-specific operating surface. Use when a task names Kubernetes, OpenTofu, Terraform, a cluster, state, a plan, drift, or infrastructure recovery."
---

# Infrastructure Bundles

Choose one infrastructure risk surface, then load only its selected reference.

## Route

| Target | Select when | Read |
| --- | --- | --- |
| `kubernetes-operations` | The task is an audit, failure, network, observability, security, delivery, recovery, or migration operation on a workload or cluster | `references/kubernetes-operations.md` |
| `kubernetes-platform` | The task changes workload posture, probes, resources, storage, platform ownership, or rollout design | `references/kubernetes-platform.md` |
| `iac-operations` | The task is an audit, plan, failure, delivery, recovery, migration, drift, security, or cost operation on declared infrastructure | `references/iac-operations.md` |
| `iac-platform` | The task changes module, provider, backend, state, IAM, or infrastructure ownership design | `references/iac-platform.md` |

Select one target by default. Combine targets only when a requested change has both an operating action and a platform-design decision; state their order and separate evidence.

## Workflow

1. Identify the exact environment, owner, target, and allowed mutation scope.
2. Inspect repository desired state before live state, then gather the evidence needed for the selected risk surface.
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
