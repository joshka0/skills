---
name: effect-framework-services-layers
description: >-
  Design Effect v4 services and layers. Use when working with Context.Service,
  service interfaces, Live/Test layers, Layer.succeed, Layer.effect,
  Layer.scoped, layer memoization, dependency graph composition, or testable
  dependency injection.
---

# Effect Services And Layers

Use this skill when defining dependency contracts or composing their
implementations.

## Workflow

1. Prefer `Context.Service` class syntax for v4 services.
2. Keep service interfaces focused on business capabilities, not constructor
   dependencies.
3. Put construction dependencies in layers, not in service methods.
4. Export explicit `Live`, `Test`, or named layers from implementation modules.
5. Compose one `AppLayer` close to the adapter or process entrypoint.
6. Use `Layer.succeed` or `Layer.sync` for pure/static services.
7. Use `Layer.effect` only for construction without open/close lifecycle.
8. Use `Layer.scoped` when construction acquires resources or starts background
   work.
9. Treat v4 shared layer memoization across provides as a safety net, not a
   reason to make the graph implicit.
10. Keep service access local and visible with `const svc = yield* Service` in
    generators.

## Hard Rules

- Do not rely on older `Effect.Service` auto-layer habits without checking v4
  migration guidance.
- Do not put DB pools, sockets, subscriptions, file handles, or workers in
  plain `Layer.effect`.
- Do not make every helper a service; plain functions are still appropriate for
  pure domain logic.
- Do not expose `Ref`, `Queue`, `Fiber`, or framework runtime internals unless
  shared mutable/concurrent semantics are part of the service contract.
- Do not compose layers in random call sites when an app layer can make the
  graph legible.

## Pattern

```ts
export class UserRepo extends Context.Service<UserRepo, {
  readonly create: (name: string) => Effect.Effect<User, UserRepoError>
}>()("app/UserRepo") {
  static readonly Live = Layer.succeed(
    UserRepo,
    UserRepo.of({
      create: (name) => Effect.succeed({ id: "generated-id", name })
    })
  )
}
```

## Review Checks

- Can the service be swapped with a test layer without monkeypatching?
- Does each layer explain how the world is built?
- Are dependencies consumed through service tags instead of global imports?
- Are resourceful layers scoped?
- Is the layer graph small enough to reason about at the edge?
