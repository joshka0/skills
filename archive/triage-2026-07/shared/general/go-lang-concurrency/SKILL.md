---
name: go-lang-concurrency
description: >-
  Design and review idiomatic Go concurrency. Use when working with
  goroutines, channels, context cancellation, worker pools, pipelines,
  fan-out/fan-in, errgroup, timeouts, back-pressure, or goroutine leaks.
---

# Go Language Concurrency

Use this skill when concurrency is part of the design, correctness, or failure
mode.

## Workflow

1. First decide whether concurrency is needed. A clear sequential loop is often
   the maintainable default.
2. Define ownership for every goroutine: who starts it, how it stops, and who
   observes its error.
3. Pass `context.Context` as the first parameter for request-scoped work.
4. Call cancel functions for child contexts, usually with `defer cancel()`.
5. Prefer `errgroup.WithContext` for sibling goroutines that share one parent
   operation and should cancel on first error.
6. Bound concurrency with `errgroup.SetLimit`, a worker pool, or an explicit
   semaphore before launching work from unbounded input.
7. In channel pipelines, close outbound channels from the sender side and keep
   receiving inbound values until closed or cancellation is selected.
8. Include `ctx.Done()` in sends and receives that can block after the parent
   operation is abandoned.
9. Decide whether result order matters. Fan-out/fan-in normally loses ordering
   unless you restore it explicitly.
10. Verify with focused tests and `go test -race` when shared memory or
   concurrent mutation is involved.

## Pattern Choices

- **Worker pool**: use for bounded CPU or I/O work, back-pressure, and resource
  caps.
- **Pipeline**: use for streaming stages where each stage has a clear contract.
- **Fan-out/fan-in**: use when one pipeline stage is parallelizable and result
  order is not inherently meaningful.
- **Context cancellation**: use for deadlines, abandonment, and cleanup through
  a call graph.
- **errgroup**: use for related goroutines with shared failure semantics.
- **sync.Mutex**: use for protecting shared memory when that is simpler than
  channel choreography.
- **sync/atomic**: reserve for low-level synchronization with a measured need
  and a clear memory-ordering story.

## Hard Rules

- Do not launch goroutines without a stop path.
- Do not ignore errors from goroutines.
- Do not store `context.Context` on long-lived structs.
- Do not use context values as a generic parameter bag.
- Do not close a channel from the receiver side unless that receiver owns all
  sends.
- Do not size buffers as a substitute for cancellation.
- Do not assume goroutines are garbage collected; blocked goroutines leak.

## Review Checks

- What happens if the caller cancels halfway through?
- What happens if downstream stops reading?
- Is concurrency bounded by a number tied to CPU, I/O, or downstream capacity?
- Is shared state protected by one clear synchronization mechanism?
- Are timeouts and retries owned at the correct layer?
