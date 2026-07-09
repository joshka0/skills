---
name: effect-framework
description: "Apply Effect decision policy for services, lifecycles, typed failures, concurrent flows, test layers, and upgrades. Use when Context.Service/Layer, Scope/runtime, Exit/Cause, Fiber/Stream, @effect/vitest, or v3-to-v4 code needs a boundary decision."
---

# Effect Framework

Choose the Effect boundary that changes before applying version-sensitive framework guidance.

## Route

| Mode | Select when | Read |
| --- | --- | --- |
| `system-shape` | A service contract, Layer graph, module boundary, or adapter boundary is being designed | `references/skill-map.md` |
| `runtime-lifecycle` | A process runtime, framework adapter, scoped resource, finalizer, or shutdown path changes | `references/runtime-lifecycle.md` |
| `failure-boundary` | A typed error, defect, interruption, retry, Exit, or Cause crosses a boundary | `references/failure-boundary.md` |
| `concurrency-flow` | A fiber, queue, stream, schedule, backpressure rule, or long-lived producer changes | `references/concurrency-flow.md` |
| `test-proof` | An Effect test needs layers, deterministic time, scoped cleanup, or a boundary assertion | `references/test-proof.md` |
| `migration` | Effect package versions, imports, or v3-to-v4 compatibility must be assessed | `references/migration.md` |

Select exactly one mode and read only its reference. Combine modes only for an explicit pass sequence.

## Precedence

`effect-framework` owns an Effect-specific service, runtime, failure, or fiber decision. `code-quality` owns generic TypeScript/source diagnosis; `infra-bundles` owns desired-versus-live infrastructure failures.

## Workflow

1. Inspect the installed Effect packages, lockfile, local conventions, affected callers, and repository verification commands.
2. Select one mode and read only its reference. For version-sensitive behavior, inspect installed version/config and types, then live help, then primary Effect documentation.
3. State the ownership, requirement, failure, or lifetime boundary before changing code.
4. Run the focused typecheck or test that exercises that boundary and report what it proves.

## Hard rules

- Keep requirements visible until one composed application layer or adapter boundary provides them.
- Run effects only at process, adapter, worker, or test boundaries; domain workflows remain effectful.
- Give each resource and background fiber an owner, shutdown path, and observable failure path.
- Keep expected recoverable failures typed and translate dependency vocabulary before it becomes a public contract.
- Mark API or migration behavior unconfirmed when installed evidence and primary documentation disagree or are unavailable.

## Stop conditions

- Ask for direction when ownership between a process, framework, or service layer materially changes cleanup or public behavior.
- Report blocked verification rather than guessing about an installed Effect version or migration behavior.

## Output

Return the selected mode, local facts inspected, the resulting Effect boundary, focused verification, and residual risk.
