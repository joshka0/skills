---
name: code-quality
description: "Review code structure, test value, and merge readiness. Use when requesting a sprawl audit, test-strategy review, architecture assessment, hard cut, or evidence-backed quality gate."
---

# Code quality

Use this skill for a requested assessment or difficult diagnosis. Ordinary
implementation, refactoring, TDD, and regression tests need no separate recipe.

| Need | Read |
| --- | --- |
| Sprawl or thermonuclear review | [review-sprawl](references/review-sprawl.md) |
| Explicit clean slate or hard cut | [clean-slate](references/clean-slate.md) |
| Test selection, pruning, or flakiness | [test-strategy](references/test-strategy.md) |
| Merge-readiness verdict | [quality-gate](references/quality-gate.md) |
| Architecture assessment | [architecture](references/architecture.md) |
| Hard failure or performance diagnosis, including Go | [diagnose](references/diagnose.md) |

Read the references needed for the requested pass. Kubernetes and IaC
desired/live-state work belongs to `infra-bundles`.

Tie findings to source, callers, reproduction, or check results. Follow the
repository's gate policy and supported public contracts. A review does not
authorize fixes; a requested fix loop does. Report the result, its evidence,
and any verification that remains unavailable.
