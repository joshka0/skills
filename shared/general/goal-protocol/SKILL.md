---
name: goal-protocol
description: "Run a traceable durable-goal lifecycle through convergence, dossier, approvals, parent-traced packets, and ledger updates. Use when users invoke /goal, codex-goal, /goal-council, /code-council, /goal-orchestrator, or six-phase."
---

# Goal Protocol

Own durable goal artifacts, phase gates, approved packet state, and ledger updates; `agent-orchestration` executes approved packets and returns evidence.

## Route

| Mode | Select when | Read |
| --- | --- | --- |
| `converge` | A new long-horizon goal or `/goal-council` needs a measurable contract, dissent, review, or pivot | [references/convergence.md](references/convergence.md) |
| `goal-file` | A `/goal` or `codex-goal` request needs a durable `GOAL.md` contract and start handoff | [references/goal-file.md](references/goal-file.md) |
| `blueprint` | An approved goal or `/code-council` needs a traced implementation dossier before production code | [references/implementation-dossier.md](references/implementation-dossier.md) |
| `six-phase` | The user explicitly requests six-phase, phased approval, or a trial-implement-then-revert design pass | [references/six-phase.md](references/six-phase.md) |
| `orchestrate` | An approved goal/dossier or `/goal-orchestrator` needs parent-traced tickets, approved wave state, or replanning | [references/orchestration.md](references/orchestration.md) |
| `ledger` | An existing `GOAL_LEDGER.md` needs returned dispatch evidence, status, verification, compacting, or continuation handoff | [references/ledger-handoff.md](references/ledger-handoff.md) |

Select exactly one mode. Start with `converge` for an undecided durable goal, `goal-file` for a measurable `/goal` contract, and `ledger` for an existing goal whose requested phase is unclear. Combine modes only for an explicit lifecycle sequence.

## Do not use when

- A one-shot PRD, issue slice, or reviewed implementation plan is wanted; `planning-workflow` owns that artifact.
- Approved packets need live delegation, monitoring, review, or integration; `agent-orchestration` owns that execution surface.

## Workflow

1. Locate the goal root. Read `GOAL_LEDGER.md` first when it exists; support root-level legacy artifacts on intake, but write new durable work under `docs/goals/<goal-slug>/` unless repository convention says otherwise.
2. Select one mode and read only its reference. Resolve repository conventions, verification commands, and current `/goal` behavior before making a phase decision.
3. Update the phase artifact, its gate, and the ledger together. Keep a mutable current snapshot and append decisions, assumptions, risks, validation, returned dispatch evidence, and handoffs without erasing history.
4. End orchestration at approved parent-traced packets and wave state. Hand those packets to `agent-orchestration`; after it returns evidence, use `ledger` to update gates and lifecycle state.
5. Report the current gate, traced parent IDs, validation evidence, next action, and the exact blocker or human decision when work cannot advance.

## Hard rules

- Resume the current ledger phase; do not restart a durable goal without explicit direction.
- Every ticket, behavior, structure, interface, test, location, invariant, and wave has a traceable parent ID.
- Do not blueprint an unconverged goal, ticket an unapproved dossier, dispatch a packet here, or mark a wave integrated here.
- A six-phase pass stops at each human gate; hand edits are authoritative.
- Do not mark a phase complete from an agent assertion alone: record returned evidence, validation, and any unresolved blocker in the ledger.
- After three failed attempts at the same check, stop and append the blocker rather than repeating it.
- Keep credentials and secret values out of goal artifacts, packets, and reports.

## Stop conditions

- Route backwards when a parent artifact or gate is missing, revised, or contradicted by current evidence.
- Stop for user approval when the selected mode requires a human choice, especially a six-phase gate or unresolved preserved dissent.

## Output

Return the selected mode, authoritative artifacts, current gate, approved packet or returned-evidence state, traced decision, validation, next action, and any required human decision or handoff.
