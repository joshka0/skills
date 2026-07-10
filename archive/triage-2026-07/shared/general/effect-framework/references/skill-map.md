# Effect Framework Skill Map

Read only the section that matches the task.

## Architecture

- `.routed/effect-framework-architecture/SKILL.md` - module structure,
  boundary-run design, application layers, `Effect.fn`, `Effect.gen`, and
  service-oriented architecture.

## Services And Layers

- `.routed/effect-framework-services-layers/SKILL.md` - `Context.Service`,
  explicit service interfaces, Live/Test layers, layer graph composition,
  memoization posture, and dependency injection.

## Runtime And Resources

- `.routed/effect-framework-runtime-resources/SKILL.md` - `Layer.scoped`,
  `Effect.acquireRelease`, `Scope`, `runMain`, `Effect.run*`, `ManagedRuntime`,
  graceful shutdown, and adapter ownership.

## Errors, Exit, And Cause

- `.routed/effect-framework-errors/SKILL.md` - typed errors, tagged errors,
  `Schema.TaggedErrorClass`, domain failures, defects, interruptions, `Exit`,
  `Cause`, sandboxing, boundary error handling, and retry visibility.

## Concurrency, Streams, And Scheduling

- `.routed/effect-framework-concurrency-streams/SKILL.md` - fibers,
  `forkChild`, `forkDetach`, `Ref`, `Queue`, `PubSub`, `Stream`, `Schedule`,
  back-pressure, fan-out, polling, and lifecycle ownership.

## Testing

- `.routed/effect-framework-testing/SKILL.md` - @effect/vitest, test layers,
  `TestClock`, `TestContext`, deterministic dependencies, runtime cleanup, and
  test boundaries.

## Migration

- `.routed/effect-framework-migration/SKILL.md` - v3-to-v4 changes,
  `Context.Service`, removed `Runtime<R>`, `Yieldable`, flattened `Cause`,
  layer memoization changes, unstable imports, and stale-docs cautions.
