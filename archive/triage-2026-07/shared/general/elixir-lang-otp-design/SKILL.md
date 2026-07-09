---
name: elixir-lang-otp-design
description: >-
  Design idiomatic Elixir and OTP architecture. Use when choosing between plain
  modules, processes, applications, event sourcing, CQRS, umbrella apps, domain
  boundaries, or BEAM-native process topology.
---

# Elixir OTP Design

Use this skill when the task is architectural shape, not a single OTP callback.

## Workflow

1. Start with the runtime question: does the code need shared mutable state,
   concurrency, timers, failure isolation, naming, or backpressure?
2. Keep pure transformations, validation, formatting, and stateless business
   rules as plain modules and functions.
3. Use `Application.start/2` to declare topology, not to run business logic.
4. Make the supervision tree read like an operational map: storage, messaging,
   registries, dynamic entities, task supervisors, telemetry, and adapters.
5. Choose process boundaries by ownership and failure domain, not by nouns in
   the domain model.
6. Use event sourcing and CQRS only when durable history, replay, auditability,
   process managers, or projection workflows are central requirements.
7. Use umbrella apps only when multiple OTP applications have distinct startup,
   supervision, release, or ownership concerns.

## Hard Rules

- Do not wrap code in GenServers just to organize modules.
- Do not put arbitrary business orchestration in `MyApp.Application`.
- Do not split into umbrella apps just to create more folders.
- Do not use event sourcing or CQRS as the default replacement for CRUD plus an
  outbox.
- Do not hide runtime dependencies behind module globals when the supervision
  tree should make ownership visible.

## Default Decision Order

- **Plain module/function**: no runtime state, failure boundary, or concurrency.
- **Task**: finite one-shot concurrent work with a return value.
- **GenServer**: long-lived stateful protocol, timer, or resource owner.
- **Registry + DynamicSupervisor**: many named runtime entities.
- **GenStage/Flow/Broadway**: producer pace must be controlled by demand.
- **Phoenix.PubSub**: topic fan-out matters more than ownership.
- **Event sourcing/CQRS**: durable history and replay are core requirements.

## Review Checks

- What runtime property justifies each process?
- Does the application tree explain ownership and failure domains?
- Could a plain function replace this process without losing correctness?
- Is durable history actually required, or would transactional state plus events
  be simpler?
- Can each boundary be tested without booting the whole release?
