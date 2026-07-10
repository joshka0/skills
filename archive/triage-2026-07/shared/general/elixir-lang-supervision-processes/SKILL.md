---
name: elixir-lang-supervision-processes
description: >-
  Design Elixir supervision and long-lived process patterns. Use when working
  with GenServer, Agent, Supervisor, DynamicSupervisor, Registry,
  process-per-entity, restart strategies, child specs, or OTP lifecycle.
---

# Elixir Supervision And Processes

Use this skill when state, lifecycle, naming, or fault isolation belongs in a
long-lived process.

## Workflow

1. Define the public process API first, then keep callbacks as the protocol
   implementation detail.
2. Use GenServer for long-lived stateful protocols, timers, resource ownership,
   or isolated runtime entities.
3. Use Agent only for tiny get/update state wrappers with no rich protocol or
   timer behavior.
4. Put every meaningful long-lived component under a supervisor.
5. Choose restart strategy by dependency relationship:
   - `:one_for_one` for independent children.
   - `:rest_for_one` when later children depend on earlier children.
   - `:one_for_all` only for tightly coupled sets.
6. Use Registry plus DynamicSupervisor for named runtime entities started on
   demand.
7. Consider PartitionSupervisor when child startup or supervisor contention
   becomes the scaling limit.
8. Keep slow CPU or I/O work out of GenServer callbacks; offload finite work to
   tasks or a pipeline.

## Hard Rules

- Do not use a GenServer as a serialization wrapper around pure functions.
- Do not perform slow or blocking work in a single mailbox owner.
- Do not assume Registry gives cluster-wide identity; it is local unless paired
  with explicit distributed design.
- Do not ignore `message_queue_len` for hot servers.
- Do not use `:one_for_all` when children can fail independently.
- Do not keep idle process-per-entity instances forever without a lifecycle
  policy.

## Pattern Choices

- **GenServer**: stateful protocol, timers, resource owner, isolated runtime
  entity.
- **Agent**: tiny state cell with simple get/update behavior.
- **Supervisor**: failure relationship, startup order, shutdown order, restart
  policy.
- **DynamicSupervisor**: on-demand children.
- **Registry**: local process naming and discovery.
- **Process-per-entity**: carts, rooms, sessions, tenants, aggregates, or
  coordinators with their own mailbox and failure boundary.

## Review Checks

- What owns the state, and who restarts it?
- What happens when this child crashes repeatedly?
- Is the mailbox expected to stay short under load?
- Are calls, casts, and infos part of a clear protocol?
- Can the entity be stopped when idle or reconstructed after restart?
