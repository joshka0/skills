---
name: effect-framework-migration
description: >-
  Handle Effect v3-to-v4 migration and beta API drift. Use when working with
  Context.Service migration, removed Runtime<R>, Yieldable changes, flattened
  Cause, renamed fork APIs, layer memoization changes, unstable imports, stale
  docs, or upgrading @effect packages.
---

# Effect Migration

Use this skill when the code, docs, or examples may straddle Effect v3 and v4.

## Workflow

1. Check `package.json`, lockfile, and imports to confirm the installed Effect
   version and package split.
2. Prefer v4 migration materials and the current repo guidance over older docs
   when they conflict.
3. Replace older service declarations with `Context.Service` class syntax where
   the project has adopted v4.
4. Revisit old `Effect.Service` auto-layer assumptions; export explicit layers.
5. Remove type-level reliance on `Runtime<R>`; use process `runMain`, local
   `Effect.run*`, or `ManagedRuntime` at boundaries.
6. Replace implicit "many things are Effects" habits with explicit APIs:
   `Ref.get`, `Deferred.await`, `Fiber.join`, and similar module functions.
7. Review for renamed fork semantics: default to parent-owned `forkChild`; use
   `forkDetach` only when ownership is deliberately detached.
8. Treat v4 layer memoization across provides as migration protection, not a
   reason to spread provides through business code.
9. Keep `effect/unstable/*` imports behind local adapters when possible.

## Hard Rules

- Do not copy generic docs examples into v4 code without checking whether they
  use pre-v4 APIs.
- Do not expose unstable imports through domain-facing modules.
- Do not migrate syntax while preserving hidden singleton/runtime architecture.
- Do not assume old tree-shaped `Cause` handling matches flattened v4 Cause.
- Do not leave `run*` calls buried in code that should remain effectful.

## Migration Review Checklist

- `Context.Tag`, `Context.GenericTag`, `Effect.Tag`, or `Effect.Service` usage
  has a deliberate v4-compatible story.
- `Runtime<R>` references are removed or isolated to compatibility code.
- `Ref`, `Deferred`, and `Fiber` operations are explicit.
- Forking APIs communicate lifecycle ownership.
- Layers are scoped when resources need finalizers.
- Application layer composition is legible.
- Tests use test layers and deterministic time where relevant.
