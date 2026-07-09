# Elixir Language Skill Map

Read only the section that matches the task.

## OTP Design

- `.routed/elixir-lang-otp-design/SKILL.md` - application structure, plain
  modules versus processes, process topology decisions, event sourcing/CQRS, and
  BEAM-native architecture.

## Supervision And Processes

- `.routed/elixir-lang-supervision-processes/SKILL.md` - GenServer, Agent,
  Supervisor, Registry, DynamicSupervisor, process-per-entity, restart
  strategies, and lifecycle ownership.

## Concurrency And Pipelines

- `.routed/elixir-lang-concurrency-pipelines/SKILL.md` - Task,
  Task.Supervisor, GenStage, Flow, Broadway, Phoenix.PubSub, backpressure, rate
  limiting, and demand-driven work.

## Fault Tolerance And Observability

- `.routed/elixir-lang-fault-observability/SKILL.md` - let-it-crash,
  fail-fast boundaries, circuit breakers, :telemetry, structured Logger,
  OpenTelemetry, and process-local context.

## Testing

- `.routed/elixir-lang-testing/SKILL.md` - ExUnit, `start_supervised!`,
  `async: true`, Mox, behaviours, StreamData, property tests, doctests, and
  contract tests.

## Performance And Interop

- `.routed/elixir-lang-performance-interop/SKILL.md` - ETS, mailbox control,
  process cardinality, binary memory, hibernation, NIFs, ports, and macro
  pitfalls.
