---
name: effect-framework-testing
description: >-
  Test Effect v4 TypeScript systems. Use when working with @effect/vitest,
  test layers, TestClock, TestContext, deterministic dependencies, effectful
  test cases, scoped resource cleanup, ManagedRuntime tests, or service fakes.
---

# Effect Testing

Use this skill when designing, repairing, or validating tests for Effect code.

## Workflow

1. Test behavior through exported use cases or adapter boundaries.
2. Swap dependencies with test layers instead of monkeypatching modules.
3. Use `@effect/vitest` for effectful test cases when the project uses Vitest.
4. Use `TestClock` / `TestContext` for timeouts, sleeps, retries, polling, and
   schedules.
5. Keep Live layers out of unit tests unless the test is explicitly integration
   or adapter-level.
6. Provide deterministic services for randomness, time, UUIDs, external APIs,
   storage, and queues.
7. Verify scoped resources close in tests that construct runtimes or live
   layers.
8. Prefer one or two high-signal behavior tests over testing service wiring
   implementation details.

## Hard Rules

- Do not call real sleeps for time-dependent tests when `TestClock` can advance
  time.
- Do not call production network/database layers in unit tests.
- Do not hide test-only globals behind module imports.
- Do not run effects from inside helpers in a way that collapses requirements
  before the test can provide layers.
- Do not leave a `ManagedRuntime` undisposed in tests.

## Pattern

```ts
it.effect("uses the test layer", () =>
  createUser("Ada").pipe(
    Effect.provide(UserRepo.Test),
    Effect.andThen((user) =>
      Effect.sync(() => {
        assert.deepStrictEqual(user.id, "test-id")
      })
    )
  )
)
```

## Review Checks

- Can the test provide all requirements explicitly?
- Is time deterministic?
- Are failures asserted through typed errors or boundary output?
- Does cleanup happen under failure and interruption?
- Would this test still pass after internal refactoring?
