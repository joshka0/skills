---
name: effect-framework-architecture
description: >-
  Design Effect v4 TypeScript system architecture. Use when shaping modules,
  domain/application/infrastructure/adapters boundaries, boundary execution,
  application layers, Effect.fn, Effect.gen, or service-oriented workflows.
---

# Effect Framework Architecture

Use this skill when the task is the shape of an Effect system, not a local API
choice.

## Workflow

1. Check the installed Effect version and project conventions before applying
   version-sensitive guidance.
2. Keep business workflows as `Effect.Effect<A, E, R>` until the adapter or app
   composition boundary.
3. Separate responsibilities:
   - `domain/` owns data types and domain error classes.
   - `application/` owns use cases and effectful workflows.
   - `infrastructure/` owns service implementations and layers.
   - `app/` owns the composed application layer graph.
   - `adapters/` own HTTP, CLI, jobs, framework handlers, and `run*` calls.
4. Use `Effect.fn("Name")` for exported effect-returning functions, especially
   public use cases and adapter-callable workflows.
5. Use `Effect.gen` inside business workflows for readable dependency access and
   typed failures.
6. Provide services near the edge through a composed app layer.
7. Keep framework-specific Promise/Response/request details out of domain and
   application modules.
8. Use `ManagedRuntime` when an external framework owns control flow; use
   `runMain` when the Effect program owns the process.

## Hard Rules

- Do not call `Effect.run*` inside business logic.
- Do not hide requirements behind module singletons.
- Do not scatter `Effect.provide(...)` through use cases as the architecture.
- Do not let adapter-specific types leak into domain errors or service
  contracts.
- Do not pull v3 examples into v4 code without checking migration guidance.
- Do not expose unstable Effect modules through domain-facing APIs unless churn
  is an explicit tradeoff.

## Default Module Shape

```text
src/
  domain/
  application/
  infrastructure/
  app/
  adapters/
  main.ts
  test/
```

## Review Checks

- Is there one clear execution boundary for the process or adapter?
- Are requirements visible in type signatures until composition?
- Is the application layer graph understandable from one file or small folder?
- Can tests provide alternate layers without changing business code?
- Are framework and infrastructure details isolated behind services?
