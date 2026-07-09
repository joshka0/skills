---
name: elixir-lang-performance-interop
description: >-
  Review Elixir performance, memory, and native interop choices. Use when
  working with ETS, mailbox growth, process cardinality, binary memory,
  min_heap_size, hibernation, NIFs, ports, shared state, or macro recompilation.
---

# Elixir Performance And Interop

Use this skill when performance work touches BEAM runtime behavior or native
boundaries.

## Workflow

1. Measure before changing architecture: inspect mailbox length, reductions,
   process memory, binary memory, ETS memory, scheduler pressure, and latency.
2. Treat process count as cheap but not free; cardinality, idle lifecycle, and
   startup pressure still matter.
3. Keep hot GenServer callbacks short; move slow work to tasks, pipelines, or
   external boundaries.
4. Use ETS for hot local lookup, counters, caches, and indexes when concurrent
   access matters more than single-process ownership.
5. Make ETS ownership explicit; tables are owned by processes and are not
   garbage-collected just because callers stop referencing them.
6. Consider `read_concurrency` and `write_concurrency` only for real contention,
   because they trade memory for throughput.
7. Prefer ports over NIFs when failure isolation, blocking risk, or native
   complexity matters.
8. Use NIFs only for short, bounded, synchronous native work where the VM risk is
   justified.
9. Watch macro use for compile-time dependency and recompilation blowups.

## Hard Rules

- Do not treat ETS as an ordinary garbage-collected map.
- Do not use ETS when a process owner or durable database is the clearer model.
- Do not ignore mailbox growth while optimizing function micro-costs.
- Do not use hibernation after every event; it is for long-idle processes.
- Do not put blocking or unsafe native work in a NIF casually.
- Do not overuse macros for ordinary runtime composition.

## Pattern Choices

- **ETS**: hot local shared lookup, counters, caches, rate-limit buckets.
- **GenServer/Agent**: state ownership and protocol matter more than raw lookup.
- **Database/cache**: durability or multi-node consistency matters.
- **Port**: native/external work with OS-process isolation.
- **NIF**: short native computation where overhead savings justify VM risk.
- **Partitioning**: reduce contention in supervisors, registries, tasks, or
  state owners.

## Review Checks

- What metric proves this is the bottleneck?
- Is the hot path CPU, mailbox, scheduler, binary, ETS, or I/O bound?
- Who owns each ETS table, and what happens if the owner crashes?
- Are large binaries retained longer than intended by process state or queues?
- Could native work block or corrupt the VM?
