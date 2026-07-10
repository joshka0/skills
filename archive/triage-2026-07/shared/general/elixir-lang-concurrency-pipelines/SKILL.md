---
name: elixir-lang-concurrency-pipelines
description: >-
  Design Elixir concurrency, backpressure, and pipeline patterns. Use when
  working with Task, Task.Supervisor, async_stream, GenStage, Flow, Broadway,
  Phoenix.PubSub, message passing, rate limiting, or demand-driven ingestion.
---

# Elixir Concurrency And Pipelines

Use this skill when work is finite and concurrent, demand-driven, broadcast, or
externally ingested.

## Workflow

1. Classify the work:
   - finite one-shot fan-out over known inputs
   - long-lived producer/consumer pipeline
   - external queue or broker ingestion
   - topic fan-out to processes or nodes
   - rate-limited boundary
2. Use `Task.async_stream/3` or `Task.Supervisor.async_stream_nolink/4` for
   bounded parallel work over in-memory collections.
3. Await or shut down every task created with `async`; unawaited async tasks
   leave replies behind.
4. Use GenStage when explicit demand coordination is the core primitive and a
   lower-level stage API is justified.
5. Use Flow for larger parallel collection/event transforms with partitioning,
   reductions, windows, or triggers.
6. Use Broadway for production ingestion from external sources that need
   acknowledgements, batching, failure handling, graceful shutdown, rate limits,
   partitioning, and telemetry.
7. Use Phoenix.PubSub for topic fan-out, not durable messaging or replay.
8. Make max concurrency, demand, timeouts, and rate limits explicit.

## Hard Rules

- Do not route concurrent work through one GenServer when tasks can run
  independently.
- Do not use GenStage when `Task.async_stream/3` over bounded in-memory data is
  enough.
- Do not use Phoenix.PubSub when durability, replay, or exactly-once semantics
  are required.
- Do not ignore duplicate PubSub subscriptions; they can duplicate deliveries.
- Do not let producer mailboxes grow without demand, batching, or rate limits.
- Do not treat tasks as durable background jobs.

## Pattern Choices

- **Task**: one action, one process, finite result.
- **Task.Supervisor**: supervised, bounded, or non-linked task fan-out.
- **GenStage**: custom demand-driven producer/consumer protocol.
- **Flow**: data-oriented parallel transforms and partitioned reductions.
- **Broadway**: broker-backed ingestion with operational features.
- **Phoenix.PubSub**: topic fan-out across processes or nodes.
- **Rate limiter**: protect external APIs or hot internal boundaries.

## Review Checks

- Is concurrency bounded by a real limit?
- What provides backpressure when downstream slows down?
- Are task failures linked, monitored, or isolated intentionally?
- Does the pipeline need acknowledgements or replay?
- Is PubSub local, clustered, or adapter-backed by design?
