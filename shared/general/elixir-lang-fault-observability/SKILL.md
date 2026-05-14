---
name: elixir-lang-fault-observability
description: >-
  Design Elixir fault tolerance and observability. Use when working with
  let-it-crash boundaries, restart policy, fail-fast code, circuit breakers,
  :telemetry, Telemetry.Metrics, Logger metadata, OpenTelemetry, or tracing.
---

# Elixir Fault Tolerance And Observability

Use this skill when failures, restarts, metrics, logs, or traces are part of the
design.

## Workflow

1. Separate expected business failures from unexpected defects.
2. Return explicit values for expected errors; let isolated workers crash on
   invariant violations or unexpected corruption.
3. Ensure every let-it-crash boundary has a supervisor and reconstructable
   state.
4. Choose restart intensity and strategy so crashes do not become restart
   storms.
5. Use timeouts, retries, circuit breakers, and bulkheads at unstable external
   boundaries.
6. Emit library/application events through `:telemetry`; attach handlers in the
   application.
7. Use structured Logger messages and process-local metadata such as
   request_id, user_id, job_id, or entity_id.
8. Use OpenTelemetry for cross-process and cross-service traces; propagate
   context deliberately when spawning tasks or processes.

## Hard Rules

- Do not rescue everything inside workers; that hides broken invariants from
  supervision.
- Do not rely on let-it-crash for expected remote failures or validation errors.
- Do not emit high-cardinality telemetry labels by accident.
- Do not use vendor-specific instrumentation as the only library contract when
  `:telemetry` can keep it portable.
- Do not assume Logger or tracing context automatically crosses every spawned
  process boundary.
- Do not retry failing dependencies indefinitely without backoff and limits.

## Pattern Choices

- **Fail fast**: unexpected invariant failure inside an isolated process.
- **Supervisor restart**: recovery boundary and blast-radius control.
- **Circuit breaker**: stop hammering a slow or failing dependency.
- **:telemetry**: portable observability event contract.
- **Logger metadata**: process-local diagnostic context.
- **OpenTelemetry**: distributed tracing and context propagation.

## Review Checks

- Which failures are expected return values, and which should crash?
- Does supervision restart the right amount of the tree?
- Are restart intensity and dependency timeouts bounded?
- Are telemetry event names and metadata cardinality stable?
- Is trace/log context preserved across tasks and process hops?
