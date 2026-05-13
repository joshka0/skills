---
name: effect-framework
description: >-
  Router for Effect v4 TypeScript architecture skills. Covers:
  effect-framework-architecture, effect-framework-services-layers,
  effect-framework-runtime-resources, effect-framework-errors,
  effect-framework-concurrency-streams, effect-framework-testing, and
  effect-framework-migration. Use when working with Effect, @effect packages,
  Effect.Effect, Context.Service, Layer, Scope, ManagedRuntime, runMain,
  @effect/vitest, TestClock, Fiber, Queue, Stream, Schedule, Exit, or Cause.
---

# Effect Framework

Use this as the small entrypoint for Effect-based TypeScript systems. Keep the
active context narrow: identify the Effect surface first, then read only the
matching routed skill from `references/skill-map.md`.

## Routing

1. Identify the active surface:
   - system architecture, module structure, boundaries, or application layering
   - Context.Service declarations, service interfaces, or Layer composition
   - Scope, Layer.scoped, acquire/release, runMain, or ManagedRuntime lifecycle
   - typed errors, tagged errors, Exit, Cause, sandboxing, retries, or defects
   - fibers, forkChild, forkDetach, Queue, PubSub, Stream, or Schedule
   - @effect/vitest, test layers, TestClock, deterministic dependencies, or test runtime
   - v3-to-v4 migration, stale docs, unstable imports, removed Runtime<R>, or renamed APIs
2. Read `references/skill-map.md`.
3. Load only the listed detailed Effect skill files that match the active surface.
4. Combine with `code-quality`, `diagnose`, `quality-gate`, or
   `chrome-extension-builder` when the task is broader than Effect architecture.

## Defaults

- Treat the project dependency version and migration notes as source of truth
  before applying v4-specific APIs.
- Model business workflows as `Effect.Effect<A, E, R>` and keep requirements
  visible until composition time.
- Define dependencies with `Context.Service`; build implementations with
  explicit `Layer`s.
- Compose one application layer near the edge instead of scattering ad hoc
  `Effect.provide(...)` through business code.
- Put lifecycle-owning services behind `Layer.scoped` or `Effect.acquireRelease`.
- Run effects at process or adapter boundaries with `runMain`, `Effect.run*`, or
  `ManagedRuntime`, not inside domain logic.
- Keep expected business failures in the typed error channel; inspect `Exit` and
  `Cause` at boundaries.
- Prefer structured concurrency: `forkChild` by default, `forkDetach` only with
  explicit ownership.
- Use test layers and deterministic time for tests.

## Output

When giving Effect guidance, include:

- **Surface**: which routed Effect skill applies.
- **Effect shape**: the smallest service/layer/runtime design that fits.
- **Risks**: hidden execution, scattered provide, resource leaks, orphan fibers,
  stale v3 APIs, or untyped defects to avoid.
- **Verification**: focused typecheck, test, @effect/vitest case, runtime
  lifecycle check, or migration check to run.
