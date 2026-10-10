---
name: effect-architecture
description: "Architecture options for an Effect v4 app or module, with fit and cost: layered services, event sourcing, state machines, Elm loop, workflows, cluster. Use when choosing an Effect app's shape."
---

# Effect architecture choices

Choose per module, not per repo. Record the choice in the project's
`AGENTS.md`. Follow `effect` for API names and code rules. Before you
choose, confirm that the packages and modules named below exist in the
installed version. Modules tagged `@stability unstable` can break in minor
releases.

## Layered services (default)

- **Fits:** request/response backends, CLIs, adapters around external APIs.
- **Shape:** domain services as `Context.Service` plus Layers, one
  composition root per entrypoint, thin handlers.
- **Cost:** none beyond Effect itself. Start here; move a module to another
  option below only when its state or lifetime demands it.

## Event sourcing: decider, projector, reactor

- **Fits:** an audit trail, replay, or several views of the same history.
- **Shape:** a pure decider turns a command plus current state into events
  or a typed refusal. Projectors fold events into read models. Reactors run
  side effects from events in their own services. t3code uses this split.
- **Cost:** event schema versioning, and replay time that grows with the log
  unless you snapshot. Effect's `effect/eventlog` is unstable.

## State machines

- **Fits:** finite lifecycles with legal event orders, cancellation, or
  timers (jobs, onboarding, connections).
- **Shape:** an Effect-native machine (`effect-machine`, Schema-first) or
  XState 6 through `@xstate/effect` (alpha). Run the actor as a service:
  `Layer.effect(Tag, createEffectActor(machine))`.
- **Cost:** one more library and its learning curve. Use plain Effects when
  the order of steps is not a rule worth enforcing.

## Elm architecture (front end)

- **Fits:** browser apps that want all state in one model.
- **Shape:** Foldkit: `Model`, `Message`, `update` returning Commands, with
  Subscriptions and managed resources scoped to slices of the model. For a
  React app, use atoms from `effect/reactivity` instead.
- **Cost:** Foldkit pins an exact Effect version, and it is a whole-app
  commitment.

## Durable workflows

- **Fits:** multi-step processes that must survive restarts: payments,
  provisioning, long waits for a human or a webhook.
- **Shape:** `effect/workflow`: `Workflow.make` with an idempotency key,
  `Activity` steps (at most once unless retried), compensation finalizers,
  `DurableClock.sleep`, and `DurableDeferred` signals.
- **Cost:** needs a workflow engine and storage (for example
  `ClusterWorkflowEngine` with SQL). Unstable.

## Cluster entities

- **Fits:** many stateful actors addressed by id across machines (per-user
  sessions, per-tenant queues).
- **Shape:** `effect/cluster` entities with sharding, message storage, and
  runners.
- **Cost:** heavy operations (runners, storage, health checks). Unstable.
  Use it only when one process cannot hold the state.

## Infrastructure in Layers

- **Fits:** apps on Cloudflare or AWS whose services own their own cloud
  resources.
- **Shape:** Alchemy: a Layer declares and binds its resources (KV, tables,
  queues). Providing the Layer provisions them on deploy, and swapping the
  Layer swaps the backend.
- **Cost:** Alchemy is in beta. Deploys become part of the Layer graph.
