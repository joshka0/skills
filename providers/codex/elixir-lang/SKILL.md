---
name: elixir-lang
description: "Apply Elixir/OTP decision policy for process topology, supervision, pipelines, fault signals, tests, and runtime evidence. Use when a GenServer, Supervisor, Task/Broadway flow, :telemetry boundary, ExUnit process test, ETS/mailbox, or NIF/port decision needs a boundary."
---

# Elixir Language

Choose the BEAM ownership boundary that changes before applying version-sensitive OTP guidance.

## Route

| Mode | Select when | Read |
| --- | --- | --- |
| `otp-shape` | A plain module versus process, application topology, umbrella, CQRS, or event-history decision is being made | `references/skill-map.md` |
| `process-topology` | A GenServer, Agent, Supervisor, Registry, DynamicSupervisor, or entity lifecycle changes | `references/process-topology.md` |
| `concurrent-flow` | A Task, demand-driven pipeline, Broadway ingestion, PubSub fan-out, rate limit, or backpressure rule changes | `references/concurrent-flow.md` |
| `failure-signals` | A crash boundary, restart policy, retry limit, telemetry event, log metadata, or trace propagation changes | `references/failure-signals.md` |
| `test-boundaries` | An ExUnit test owns processes, shared state, a behaviour fake, generated inputs, or a service contract | `references/test-boundaries.md` |
| `runtime-evidence` | ETS, mailbox growth, process count, binary retention, scheduler pressure, NIF, port, or macro cost needs evidence | `references/runtime-evidence.md` |

Select exactly one mode and read only its reference. Combine modes only for an explicit pass sequence.

## Precedence

`elixir-lang` owns BEAM-specific process, supervision, fault, or runtime decisions. `code-quality` owns generic source-code diagnosis; `infra-bundles` owns desired-versus-live infrastructure failures.

## Workflow

1. Inspect `mix.exs`, the lockfile, application tree, affected modules, callers, tests, and repository verification commands.
2. Select one mode and read only its reference. For version-sensitive behavior, inspect installed version/config, then live help, then primary Elixir/Erlang documentation.
3. State the state owner, failure boundary, pacing rule, or measured runtime claim before changing code.
4. Run the focused ExUnit, supervision, telemetry, or load check that exercises that boundary and report what it proves.

## Hard rules

- Keep pure transformations in plain modules until a runtime property requires a process.
- Give every long-lived process a named owner, supervision relationship, restart intent, and lifecycle policy.
- Make concurrency limits, backpressure, delivery guarantees, and shutdown behavior explicit.
- Separate expected outcomes from crashes that supervision can safely recover; do not hide invariant failures.
- Treat process-local naming and messaging as local until a distributed design proves otherwise.
- Do not claim a BEAM performance or native-interop benefit without workload evidence.

## Stop conditions

- Ask for direction when an ownership, restart, delivery, or durability choice materially changes public behavior or data safety.
- Report blocked verification rather than guessing about installed OTP, dependency, or runtime behavior.

## Output

Return the selected mode, local facts inspected, the resulting OTP boundary, focused verification, and residual risk.
