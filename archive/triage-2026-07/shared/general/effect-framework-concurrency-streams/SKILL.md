---
name: effect-framework-concurrency-streams
description: >-
  Design Effect v4 concurrency, streams, and schedules. Use when working with
  Fiber, forkChild, forkDetach, Ref, Queue, PubSub, Stream, Schedule,
  back-pressure, polling, fan-out, workers, or long-lived producers.
---

# Effect Concurrency, Streams, And Scheduling

Use this skill when work is concurrent, repeated, streaming, or long-lived.

## Workflow

1. Decide whether concurrency is needed; keep single-result work as plain
   `Effect`.
2. Default to `forkChild` for work that belongs to the parent request, workflow,
   service, or scope.
3. Use `forkDetach` only when the child has explicit ownership outside the
   parent lifecycle.
4. Choose coordination primitives intentionally:
   - `Queue` for load distribution to consumers.
   - `PubSub` for fan-out/broadcast to subscribers.
   - `Stream` for multi-element, pull-based, back-pressured pipelines.
   - `Ref` for controlled in-process mutable state inside a service.
   - `Schedule` for retry, repeat, backoff, jitter, and polling policy.
5. Start with bounded queues unless loss or latest-wins semantics are explicit.
6. Make shutdown behavior visible for queues, streams, and background fibers.
7. Join or supervise fibers so errors and cancellation are observed.

## Hard Rules

- Do not reach for `forkDetach` because it is convenient.
- Do not use unbounded queues by default.
- Do not collect entire streams into arrays unless the data is known bounded.
- Do not expose `Ref` as a public service API unless shared mutable state is the
  intended abstraction.
- Do not hand-write retry loops with sleeps when `Schedule` can express policy.
- Do not treat `Ref`, `Deferred`, or `Fiber` as effects in v4; use explicit
  module APIs such as `Ref.get`, `Deferred.await`, or `Fiber.join`.

## Pattern Choices

- **forkChild**: parent-owned concurrent work.
- **forkDetach**: independent daemon or process-lifetime work with explicit
  shutdown ownership.
- **Queue**: work sharing, back-pressure, bounded producers/consumers.
- **PubSub**: broadcast to many consumers.
- **Stream**: long-lived producers, pipelines, paginated pulls, queue-backed
  processing.
- **Schedule**: retry, repeat, polling, spacing, backoff, jitter.

## Review Checks

- Who owns this fiber's lifetime?
- What happens if the parent is interrupted?
- Is pressure propagated, dropped, or latest-wins by design?
- Are stream sources finite, bounded, or explicitly long-lived?
- Is operational policy visible as a `Schedule`?
