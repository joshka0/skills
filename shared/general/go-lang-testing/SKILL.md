---
name: go-lang-testing
description: >-
  Write and review idiomatic Go tests. Use when working with go test,
  table-driven tests, subtests, fakes, mocks, testify, gomock, httptest,
  testdata, race checks, benchmarks, fuzzing, or concurrency tests.
---

# Go Language Testing

Use this skill when the task is test design, test repair, or verification for
Go code.

## Workflow

1. Test observable behavior through public APIs or package-level seams.
2. Use table-driven tests when the same behavior should hold across several
   inputs, outputs, errors, or edge cases.
3. Give every table row a `name` and run it with `t.Run`.
4. Keep failure messages specific enough to explain the input, got value, and
   expected value.
5. Prefer small fakes over generated mocks when the dependency behavior is easy
   to model.
6. Add a consumer-side interface only when the production caller needs the
   seam, not just because a test wants a mock.
7. Use `httptest`, `fstest`, `t.TempDir`, `testdata/`, and local fixtures
   before introducing infrastructure.
8. Use testify only when assertions reduce real noise.
9. Use gomock when interaction verification is central or a dependency
   interface is too large to fake by hand.
10. For shared-memory concurrency, run `go test -race` on the focused package.
11. For performance claims, add or run a benchmark before optimizing.

## Test Shapes

- **Table-driven unit test**: input/output or invariant coverage with compact
  cases.
- **Package behavior test**: exercises exported behavior through the package API.
- **Fake-backed test**: replaces a system boundary with a small in-memory
  implementation.
- **HTTP test**: uses `httptest.Server` or `httptest.ResponseRecorder`.
- **Filesystem test**: uses `t.TempDir`, `fstest.MapFS`, or `testdata/`.
- **Concurrency test**: controls cancellation, drains channels, and checks
  goroutine exit behavior where possible.
- **Benchmark**: measures a hot path with realistic inputs and reports
  allocations when useful.
- **Fuzz test**: explores parser, validator, codec, or boundary logic that has
  compact invariants.

## Hard Rules

- Do not mock internal collaborators by default.
- Do not assert private implementation details unless the package contract is
  explicitly internal.
- Do not use sleeps as the main synchronization mechanism in tests.
- Do not make test order matter.
- Do not hide important branch differences inside a giant table row.
- Do not add testify or gomock unless they reduce total test complexity.
- Check the current Go toolchain and official docs before depending on
  experimental testing packages or version-sensitive test APIs.

## Verification Commands

- `go test ./...` for the normal package suite.
- `go test ./path/to/pkg -run TestName -count=1` for a focused rerun.
- `go test ./path/to/pkg -race` for data race risk.
- `go test ./path/to/pkg -bench . -benchmem` for benchmark and allocation data.
- `go test ./path/to/pkg -fuzz FuzzName` when fuzzing is part of the task.
