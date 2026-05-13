---
name: effect-framework-errors
description: >-
  Design Effect v4 typed error handling. Use when working with tagged errors,
  Schema.TaggedErrorClass, expected failures, defects, interruptions, Exit,
  Cause, sandbox, catchTag, retry policy, or adapter error mapping.
---

# Effect Errors, Exit, And Cause

Use this skill when failures are part of the API or boundary behavior.

## Workflow

1. Classify the failure:
   - expected business/domain failure
   - dependency or infrastructure failure
   - validation failure
   - interruption
   - defect/programmer error
2. Keep expected recoverable failures in the typed error channel `E`.
3. Model domain failures with tagged errors, commonly `Schema.TaggedErrorClass`
   when schema integration matters.
4. Use `catchTag` / `catchTags` for business recovery.
5. Use `Exit` when a boundary needs structured success-or-failure inspection.
6. Use `Effect.sandbox` / `Cause` inspection at adapters, supervisors, workers,
   logging, retry, and shutdown boundaries.
7. Convert dependency-specific failures to stable domain/application errors
   before they leak across package boundaries.
8. Use `Schedule` for retry and polling policy instead of hidden loops.

## Hard Rules

- Do not throw expected business failures.
- Do not catch defects as if they were domain errors.
- Do not inspect `Cause` in everyday domain logic.
- Do not expose raw third-party exceptions as your public error vocabulary.
- Do not use stringly-typed errors when callers need machine-readable handling.
- Do not assume older tree-shaped `Cause` examples match v4 behavior; check the
  project's installed version and migration notes.

## Pattern

```ts
export class ValidationError extends Schema.TaggedErrorClass<ValidationError>()(
  "app/ValidationError",
  { message: Schema.String }
) {}

export const createUser = Effect.fn("CreateUser")(function* (name: string) {
  if (name.length < 3) {
    return yield* Effect.fail(new ValidationError({ message: "name too short" }))
  }
  const repo = yield* UserRepo
  return yield* repo.create(name)
})
```

## Review Checks

- Are business branches represented in `E`?
- Can adapters map typed errors to HTTP/CLI/job responses cleanly?
- Are defects, interruptions, and aggregate diagnostics handled only at
  boundaries?
- Does retry policy see the error categories it needs?
- Does logging preserve enough Cause/Exit detail without exposing internals to
  users?
