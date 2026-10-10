---
name: effect
description: "House rules for TypeScript code on Effect v4 (effect-ts): where API truth lives, version traps, and codebase structure. Use when writing, structuring, or reviewing Effect code."
---

# Effect

## Source of truth

- Check the installed version in `package.json` and the lockfile. This skill
  covers Effect v4. For v3 code, migrate
  first with the upstream `effect-v3-to-v4` skill (`Effect-TS/skills`).
- Before you write Effect code, read `node_modules/effect/AGENTS.md`
  completely. For an API it does not cover, search `node_modules/effect/src`.
- Never take API names from memory, blog posts, third-party skills, or doc
  mirrors. They mix v3, beta, and 4.0 names; some mirrors already teach
  names that never shipped. Known traps (v3 and beta names that v4 dropped).
  If the installed source contradicts one, trust the source:
  - `Layer.scoped` does not exist. `Layer.effect` is already scoped: put
    `Effect.acquireRelease` inside it.
  - Errors: `Schema.TaggedError`, not `TaggedErrorClass`. `catchDefect`, not
    `catchAllDefect`.
  - Services: `Context.Service`, not `Context.Tag`, `Effect.Service`, or the
    beta-era `ServiceMap.Service`.
  - `Effect.catch`, not `catchAll`. `Effect.result`, not `either`.
    `forkChild` and `forkDetach`, not `fork` and `forkDaemon`.
  - Config: `Config.String`, `Config.Int`, `Config.Redacted` (capitalized).
  - Import paths: `effect/http`, `effect/sql`, and so on. Beta and RC code
    used `effect/unstable/*`, which v4 does not export.

## Structure

- To choose an app's overall shape, use `effect-architecture`.
- Name folders for the domain, not the mechanism: `src/billing/invoice.ts`,
  not `src/services/invoice.ts`.
- Put one service per file, with its `static readonly layer`. Key it
  `"<package>/<dir>/<Service>"`.
- Name a port for the job (`SubscriberIntake`), never the vendor. Keep
  adapters (HTTP clients, SDKs, Node APIs) out of domain folders.
- Follow the v4 docs' layer naming: `layer` includes the production
  dependencies; `layerWithoutDependencies` leaves them for the caller (tests,
  alternate wiring). Prefer `Layer.provide` over `provideMerge` unless callers
  need the dependency too.
- Each entrypoint is a composition root: it merges the Layers, provides them
  once, then runs (`NodeRuntime.runMain`, `Layer.launch`, or one
  `ManagedRuntime` when a framework owns control flow). Never call
  `Effect.run*` in domain or library code.
- Never provide a Layer per call or per request (for example inside a route
  handler): that rebuilds its graph each time. Acquire services when the
  server starts.
- Sharing follows Layer identity: build a factory's Layer once and reuse the
  value. For isolation, use `Layer.fresh` or `Effect.provide(layer, { local:
  true })`.
- Keep modules tagged `@stability unstable` or `experimental` behind
  adapters: they can break in minor releases. To list them, run
  `grep -rl '@stability \(unstable\|experimental\)' node_modules/effect/src`.
- Capture construction dependencies (clients, filesystem, config) in the
  layer. Never capture one request's identity in a shared service: pass it
  per call.

## Patterns

- Enable `@effect/language-service` in `tsconfig.json` and run
  `effect-language-service patch`, so its diagnostics fail `tsc`. Set the
  rules that catch agent mistakes to `error` (`leakingRequirements`,
  `missingEffectServiceDependency`, `globalDateInEffect`,
  `globalFetchInEffect`, `unknownInEffectCatch`).
- External API adapter: one service per external system. Give each failure
  the caller treats differently its own tagged error (`RateLimited`,
  `Blocked`, `MalformedResponse`). Decode every response with Schema. Retry
  only retryable tags (`Effect.retry({ schedule, while })`). Fan out with
  `Effect.forEach(..., { concurrency: n })`, never unbounded.
- N+1 lookups: put `Request` plus `RequestResolver` (batching, dedup,
  `withCache`) inside the service method. Callers see a plain method.
- Keep HTTP, RPC, and CLI handlers thin: decode, call a service, map errors
  to the transport. Business rules live in services.
- Adopting Effect in an existing app: one `AppLayer`, one `ManagedRuntime`
  at module scope, Promise facades at the boundary. Convert leaf services
  first and high-fan-in services (config, session) last.

## Failures and concurrency

- Put expected failures in `E` as `Schema.TaggedError`. Recover with
  `catchTag` only where a valid domain result exists; reporting is not
  recovery. Never convert a defect into a domain outcome.
- Decode unknown input with Schema at the boundary, never with a cast.
- Fork with `forkChild` by default. Use `forkDetach` only with a named owner
  and shutdown. Bound queues unless dropping is the design. Express retry and
  polling as a `Schedule`, not a sleep loop.

## Tests

- Run Effect tests with `@effect/vitest` (`it.effect`, `it.layer`) and swap
  implementations through Layers (`layerWithoutDependencies` plus test
  Layers; `Layer.mock` for partial stubs). Use `TestClock` for time. Never
  call `Effect.run*` or `ManagedRuntime.make` in a test file.
- A shared `it.layer` keeps mutable state across its tests. Build a fresh
  Layer when the behavior needs isolation.
