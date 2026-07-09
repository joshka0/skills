---
name: go-lang-performance
description: >-
  Measure and improve Go performance and memory behavior. Use when working with
  benchmarks, pprof, allocations, escape analysis, GC pressure, sync.Pool,
  slices, atomics, lock contention, race checks, or throughput and latency
  regressions.
---

# Go Performance And Memory

Use this skill when performance is a stated goal, a regression, or a measurable
risk.

## Workflow

1. Reproduce the performance problem with a benchmark, profile, trace, or
   realistic workload before changing code.
2. Establish the metric: latency, throughput, allocations, memory retained,
   CPU, lock contention, goroutine count, or tail behavior.
3. Run the narrowest useful measurement first.
4. Inspect escape decisions with compiler diagnostics only after a benchmark or
   profile points at allocation pressure.
5. Prefer representation and lifetime fixes over clever micro-optimizations.
6. Keep hot-path APIs concrete and allocation-aware, but do not make the public
   API hostile for unmeasured wins.
7. Use `sync.Pool` only for temporary objects shared across concurrent clients;
   it can discard entries at any time.
8. Use `sync/atomic` only for low-level synchronization with a clear correctness
   argument.
9. Re-run the same measurement after the change and report the delta.

## Measurement Commands

- `go test ./path/to/pkg -bench . -benchmem` for benchmarks and allocations.
- `go test ./path/to/pkg -run '^$' -bench BenchmarkName -benchmem -count=5`
  for repeated benchmark runs.
- `go test ./path/to/pkg -cpuprofile cpu.out -memprofile mem.out` for profiles
  attached to tests or benchmarks.
- `go tool pprof cpu.out` or `go tool pprof mem.out` for profile inspection.
- `go build -gcflags=-m=2 ./path/to/pkg` for escape-analysis diagnostics.
- `go test ./path/to/pkg -race` when optimization touches shared memory.

## Hard Rules

- Do not optimize without a baseline.
- Do not replace clear code with clever code for unmeasured wins.
- Do not use `sync.Pool` as an ownership cache or correctness mechanism.
- Do not use arrays where slices express the data model unless fixed size is
  semantically important.
- Do not introduce atomics when a mutex would be clearer and fast enough.
- Do not increase goroutine fan-out without a bound tied to real capacity.
- Do not ignore GC, allocation count, or object lifetime when chasing CPU.

## Review Checks

- What exact metric improved, and by how much?
- Did the benchmark input match production shape closely enough?
- Did the change increase API complexity or caller burden?
- Are allocations lower because lifetimes are shorter, not because ownership is
  now unclear?
- Was correctness rechecked after the optimization?
