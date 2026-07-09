---
name: goal-protocol
description: "Run a traceable durable-goal lifecycle from convergence through blueprint, human-gated design, tickets, and handoff. Use when users invoke /goal, /goal-council, /code-council, /goal-orchestrator, six-phase, or need a GOAL_LEDGER.md."
---

# Goal Protocol

Own one durable goal from decision through verified handoff. Its operational memory is `GOAL_LEDGER.md`, with `GOAL.md`, `CODE_DOSSIER.md`, tickets, and reports as phase artifacts.

## Route

| Mode | Select when | Read |
| --- | --- | --- |
| `converge` | A long-horizon goal, `/goal`, or `/goal-council` needs a measurable contract, dissent, review, or pivot | `references/convergence.md` |
| `blueprint` | An approved goal or `/code-council` needs a traced implementation dossier before production code | `references/implementation-dossier.md` |
| `six-phase` | The user explicitly requests six-phase, phased approval, or a trial-implement-then-revert design pass | `references/six-phase.md` |
| `orchestrate` | An approved goal/dossier or `/goal-orchestrator` needs tickets, waves, execution, or replanning | `references/orchestration.md` |
| `ledger` | An existing durable goal needs `/goal` status, verification, compacting, or an agent handoff | `references/ledger-handoff.md` |

Select exactly one mode. Start with `converge` for a new goal and `ledger` for an existing goal whose requested phase is unclear. Combine modes only for an explicit lifecycle sequence.

## Do not use when

- A one-shot PRD, issue slice, or reviewed implementation plan is wanted; `planning-workflow` owns that artifact.
- The task is live agent dispatch without a durable goal contract; `agent-orchestration` owns that transport.

## Workflow

1. Locate the goal root. Read `GOAL_LEDGER.md` first when it exists; support root-level legacy artifacts on intake, but write new durable work under `docs/goals/<goal-slug>/` unless repository convention says otherwise.
2. Select one mode and read only its reference. Resolve current repository conventions and verification commands before making a phase decision.
3. Update the phase artifact, its gate, and the ledger together. Append decisions, assumptions, risks, validations, and handoffs; supersede history instead of rewriting it.
4. Report the current gate, traced parent IDs, validation evidence, next action, and the exact blocker or human decision when work cannot advance.

## Hard rules

- Resume the current ledger phase; do not restart a durable goal without explicit direction.
- Every ticket, behavior, structure, interface, test, location, invariant, and wave has a traceable parent ID.
- Do not blueprint an unconverged goal, ticket an unapproved dossier, or run an unapproved wave.
- Keep same-wave edits file-disjoint unless the ledger names a coordinator and integration order.
- A six-phase pass stops at each human gate; hand edits are authoritative.
- Do not mark a phase complete without verification evidence or a recorded reason it could not run.
- After three failed attempts at the same check, stop and append the blocker rather than repeating it.

## Stop conditions

- Route backwards when a parent artifact or gate is missing, revised, or contradicted by current evidence.
- Stop for user approval when the selected mode requires a human choice, especially a six-phase gate or an unresolved preserved dissent.

## Output

Return the selected mode, authoritative artifacts, current gate, traced decision, validation, next action, and any required human decision or handoff.
