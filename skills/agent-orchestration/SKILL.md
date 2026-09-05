---
name: agent-orchestration
description: "Coordinate agent dispatch and model selection. Use when invoking /delegate-codex, /swarm, or collaboration-protocol; sending delta briefs; or choosing a model or harness for delegation."
---

# Agent Orchestration

Coordinate live agent work through bounded packets, explicit ownership, durable collaboration records, and reviewed integration.

## Route

| Mode | Select when | Read |
| --- | --- | --- |
| `engine-selection` | Choosing which model family, harness, or effort tier executes or reviews delegated work | [references/engine-selection.md](references/engine-selection.md) |
| `delegate` | One bounded task needs one agent | [references/delegate.md](references/delegate.md) |
| `swarm` | Independent investigations, edits, or reviews can run in parallel | [references/swarm.md](references/swarm.md) |
| `collaborate` | A decision needs independent passes, preserved dissent, and a critical review | [references/collaborate.md](references/collaborate.md) |
| `delta-brief` | A settled change must update an agent already working from stale context | [references/delta-brief.md](references/delta-brief.md) |
| `mux-adapter` | The user explicitly names Zellij, tmux, or another terminal-mux transport | [references/mux-adapter.md](references/mux-adapter.md) |

Select exactly one dispatch mode and read only that reference. Combine modes only when the user explicitly requests a sequence, with two exceptions: `engine-selection` may precede any dispatch mode when the engine or effort choice is not already settled, and `mux-adapter` is only an adapter for a selected dispatch mode.

## Do not use when

- A durable goal, phase gate, or `GOAL_LEDGER.md` is needed; `goal-protocol` owns that lifecycle and approves packets before this suite dispatches them.
- A one-shot PRD, issue slice, reviewed plan, or durable agent brief is wanted; `planning-workflow` owns that artifact.
- The request operates Herdr or Maestri private transport surfaces; `herdr` or `maestri` owns live tool syntax and targets.

## Workflow

1. Classify the request, its evidence needs, its mutation scope, and whether one agent or a coordinated set is warranted.
2. Inspect current repository constraints and the available execution surface before assigning version-sensitive or permission-sensitive work.
3. Give each agent a self-contained packet: objective, context to read, allowed scope, non-goals, expected evidence, stop condition, and handoff.
4. Dispatch only work whose owner and integration boundary are clear. Monitor exceptions, review the returned evidence, and integrate accepted results in dependency order.
5. Return the selected mode, assignments, returned evidence, integration decision, and any blocked choice or follow-up. For a durable goal, return the evidence to `goal-protocol` for its ledger update.

## Hard rules

- One supervisor owns task division, cross-agent decisions, and final integration; agents do not silently redefine shared contracts.
- The supervisor verifies each material handoff and integration result before dependent work proceeds.
- Parallel mutations must be file-disjoint or use explicitly coordinated isolated work surfaces; serialize shared APIs, data models, security boundaries, and other high-coupling work.
- Keep version-control, publication, and external side effects with the supervisor unless the user explicitly delegates them. Filesystem cleanup is Trash-only; permanent deletion and destructive Git remain forbidden even after confirmation or delegation.
- Do not infer an agent's permissions, tool flags, model, or terminal protocol. Verify current capability from the execution surface or report the uncertainty.
- Let agents finish. A wait timeout means re-read and keep waiting. Do not interrupt or send follow-ups while output continues; intervene only after repeated reads show no progress, a crash, or a block awaiting your input. Honor bounds in an explicitly selected workflow such as `herdr-goal`. Report results only after an observed terminal state.
- A material conclusion needs current evidence; a collaboration decision also needs an independent critical pass before synthesis and its selected durable ledger record.
- A delta brief points to an updated durable source of truth; a chat message is never the only record of a settled change.
- Keep credentials and secret values out of packets, transport, collaboration ledgers, and status reports.

## Stop conditions

- Stop dispatching when scopes overlap without a named coordinator or when a shared decision has no owner.
- Stop and return the missing evidence when the requested agent cannot safely verify a required claim or action.
- Hand off before dispatch when a durable goal lacks an approved parent-traced packet, phase gate, or escalation boundary.

## Output

Return the selected mode, active owners, bounded assignments or delta, returned evidence, integration state, ledger destination, and the next decision or blocker.
