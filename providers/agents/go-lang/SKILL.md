---
name: go-lang
description: >-
  Router for idiomatic Go language skills. Covers: go-lang-design,
  go-lang-concurrency, go-lang-errors, go-lang-testing,
  go-lang-packages-api, and go-lang-performance. Use when writing, reviewing,
  refactoring, testing, or designing Go code; when the user mentions Go,
  Golang, goroutines, context, errors.Is, go test, go.mod, or idiomatic Go.
---

# Go Language

Use this as the small entrypoint for Go work. Keep the active context narrow:
identify the Go surface first, then read only the matching routed skill from
`references/skill-map.md`.

## Routing

1. Identify the active surface:
   - API shape, interfaces, composition, constructors, or design patterns
   - goroutines, channels, context, worker pools, pipelines, or errgroup
   - error wrapping, sentinel errors, typed errors, or error API design
   - tests, fakes, mocks, table-driven tests, benchmarks, fuzzing, or race checks
   - package layout, modules, exported APIs, compatibility, or naming
   - performance, memory, allocations, pprof, escape analysis, or sync.Pool
2. Read `references/skill-map.md`.
3. Load only the listed detailed Go skill files that match the active surface.
4. Combine with `code-quality`, `diagnose`, or `quality-gate` when the task is
   broader than Go idiom selection.

## Defaults

- Prefer concrete types until an abstraction is proven useful.
- Put interfaces on the consumer side, and keep them small.
- Prefer composition over hierarchy; use embedding deliberately.
- Pass `context.Context` explicitly for request-scoped work.
- Treat errors, cancellation, and goroutine lifetimes as public design concerns.
- Test public behavior with table-driven tests and fakes before adding mocks.
- Use the repo's current `go.mod`, existing package boundaries, and local test
  commands as source of truth.

## Output

When giving Go guidance, include:

- **Surface**: which routed Go skill applies.
- **Idiomatic shape**: the smallest Go-native design that fits the codebase.
- **Risks**: abstraction, concurrency, error, API, or test pitfalls to avoid.
- **Verification**: focused `go test`, `go test -race`, benchmark, profile, or
  static check to run.
