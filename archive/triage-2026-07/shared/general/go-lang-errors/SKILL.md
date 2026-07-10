---
name: go-lang-errors
description: >-
  Design and review idiomatic Go error handling. Use when working with error
  wrapping, sentinel errors, typed errors, errors.Is, errors.As, errors.Join,
  panic boundaries, retryable failures, validation failures, or public error
  APIs.
---

# Go Language Errors

Use this skill when errors are part of the API, not just a local branch.

## Workflow

1. Classify the failure from the caller's point of view: retryable, not found,
   validation, permission, cancellation, conflict, dependency failure, or
   programmer error.
2. Add context at the layer that knows what operation failed.
3. Wrap with `%w` only when callers should be allowed to inspect the underlying
   cause with `errors.Is` or `errors.As`.
4. Use sentinel errors for stable categories with simple semantics.
5. Use typed errors when callers need machine-readable fields.
6. Use `errors.Join` when multiple failures matter and callers should still be
   able to inspect each component.
7. Translate dependency-specific errors at package boundaries when leaking the
   dependency would make your API harder to change.
8. Return errors for expected operational failures. Reserve panic for programmer
   errors and unrecoverable invariants.

## Hard Rules

- Do not compare error strings.
- Do not use `%w` if exposing the wrapped error would commit your API to an
  implementation detail.
- Do not wrap context cancellation into an uninspectable generic error.
- Do not both log and return the same ordinary error unless the log adds
  boundary-specific value.
- Do not create a unique sentinel for every tiny branch.
- Do not force type switches when a stable sentinel category is enough.
- Do not use nil or empty values as in-band error signals when an error return
  is clearer.

## Pattern Choices

- **Wrapping**: add operation context while preserving the cause for callers.
- **Sentinel error**: expose a stable category such as not found, closed, or not
  ready.
- **Typed error**: expose structured details such as field, path, status, or
  validation code.
- **Joined error**: preserve multiple failures from cleanup, batching, or
  parallel work.
- **Boundary translation**: convert third-party errors into your package's
  stable vocabulary.

## Review Checks

- Can callers make the decisions they need with `errors.Is` or `errors.As`?
- Is the wrapped cause intentionally part of the API?
- Does the message say what operation failed without duplicating logs?
- Are cancellation and deadline errors still inspectable?
- Are validation errors structured enough for UI, CLI, or API responses?
