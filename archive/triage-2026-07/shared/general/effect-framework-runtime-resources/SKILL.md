---
name: effect-framework-runtime-resources
description: >-
  Manage Effect v4 runtime boundaries and resource lifecycles. Use when working
  with runMain, Effect.run*, ManagedRuntime, Scope, Layer.scoped,
  Effect.acquireRelease, graceful shutdown, open/close resources, or framework
  adapter ownership.
---

# Effect Runtime And Resources

Use this skill when a program crosses into the outside world or owns resources.

## Workflow

1. Identify who owns execution:
   - Whole process: use platform `runMain` where available.
   - Framework callback or server handler: use `ManagedRuntime`.
   - Small script or explicit boundary: use the narrow `Effect.run*` API.
2. Keep `run*` calls at `main.ts`, adapters, workers, CLIs, or framework
   bridge files.
3. Put resources behind `Layer.scoped` or `Effect.acquireRelease`.
4. Use `Scope` as the lifetime ledger for finalizers.
5. Dispose long-lived `ManagedRuntime` instances during framework shutdown.
6. Ensure background fibers started by a service belong to the service layer's
   scope unless they deliberately outlive it.
7. Let `runMain` handle process teardown, signal handling, exit codes, and error
   reporting when the Effect app owns the process.

## Hard Rules

- Do not call `Effect.run*` from application or domain modules.
- Do not create resourceful services with plain `Layer.succeed` or
  `Layer.effect`.
- Do not rely on `try/finally` scattered through callers for shared resources.
- Do not leave `ManagedRuntime` disposal as an afterthought in frameworks.
- Do not treat core keep-alive behavior as a replacement for a real entrypoint.

## Pattern

```ts
export class Db extends Context.Service<Db, {
  readonly query: (sql: string) => Effect.Effect<ReadonlyArray<unknown>, Error>
}>()("app/Db") {
  static readonly Live = Layer.scoped(
    Db,
    Effect.gen(function* () {
      const conn = yield* Effect.acquireRelease(open, close)
      return Db.of({ query: (sql) => query(conn, sql) })
    })
  )
}
```

## Review Checks

- What opens, and where is it guaranteed to close?
- Does cancellation or failure still run finalizers?
- Is the runtime owned by a process, framework, or test?
- Are shutdown hooks present for long-lived runtimes?
- Are resource lifetimes visible in layer composition?
