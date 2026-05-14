---
name: elixir-lang
description: >-
  Router for idiomatic Elixir, BEAM, and OTP architecture skills. Covers:
  elixir-lang-otp-design, elixir-lang-supervision-processes,
  elixir-lang-concurrency-pipelines, elixir-lang-fault-observability,
  elixir-lang-testing, and elixir-lang-performance-interop. Use when working
  with Elixir, BEAM, OTP, GenServer, Supervisor, DynamicSupervisor, Registry,
  Task, Task.Supervisor, GenStage, Flow, Broadway, Phoenix.PubSub, ETS, ExUnit,
  Mox, :telemetry, Logger, or OpenTelemetry.
---

# Elixir Language

Use this as the small entrypoint for Elixir and OTP work. Keep the active
context narrow: identify the BEAM/OTP surface first, then read only the matching
routed skill from `references/skill-map.md`.

## Routing

1. Identify the active surface:
   - application structure, plain modules, domain boundaries, event sourcing, or CQRS
   - GenServer, Agent, Supervisor, Registry, DynamicSupervisor, or process-per-entity
   - Task, Task.Supervisor, GenStage, Flow, Broadway, Phoenix.PubSub, or backpressure
   - let-it-crash, restart strategy, circuit breakers, :telemetry, Logger, or tracing
   - ExUnit, start_supervised!, async tests, Mox, StreamData, property tests, or contracts
   - ETS, mailbox growth, process cardinality, binary memory, NIFs, ports, or macros
2. Read `references/skill-map.md`.
3. Load only the listed detailed Elixir skill files that match the active surface.
4. Combine with `code-quality`, `diagnose`, `quality-gate`, or framework-specific
   skills when the task is broader than Elixir idiom selection.

## Defaults

- Keep pure transformations as plain modules and functions.
- Use processes for runtime properties: state ownership, concurrency, timers,
  failure isolation, or backpressure.
- Put long-lived processes under supervisors and make restart relationships
  explicit.
- Use `Task` / `Task.Supervisor` for bounded one-shot work, not durable jobs.
- Use demand-driven tools such as GenStage, Flow, or Broadway only when pacing
  producers by consumers is central.
- Use Registry and DynamicSupervisor for named runtime entities and lifecycle.
- Instrument libraries with `:telemetry`; attach metrics, logs, and tracing at
  the application boundary.
- Test OTP state with `start_supervised!`, deterministic dependencies, and
  behaviour-backed mocks or fakes.

## Output

When giving Elixir guidance, include:

- **Surface**: which routed Elixir skill applies.
- **OTP shape**: the smallest BEAM-native process, supervision, or function
  design that fits.
- **Risks**: unnecessary GenServers, mailbox bottlenecks, restart storms,
  hidden globals, unbounded concurrency, ETS ownership, NIF risk, or flaky tests.
- **Verification**: focused `mix test`, ExUnit supervision check, telemetry
  smoke, mailbox/load check, property test, or integration boundary test to run.
