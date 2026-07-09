# Goal Orchestrator Mode

Use this reference for `goal-protocol orchestrate`, `run`, `status`, `replan`,
and execution handoffs.

## Purpose

Orchestrator mode turns approved `GOAL.md` and `CODE_DOSSIER.md` artifacts into
self-contained tickets, execution waves, and an `ORCHESTRATION.md` plan.

Do not decompose unconverged work. Pending gates go back to `converge` or
`blueprint`.

## Ticket Standard

Every ticket must be:

- independently completable by one agent in one session
- self-contained
- verifiable
- scoped with explicit non-goals
- traced to parent IDs
- assigned to a wave
- safe relative to other same-wave file edits

Tickets use `TK###` IDs and live under `tickets/`.

## Orchestration Flow

1. Ingest approved goal/dossier artifacts.
2. Inventory approved features, behaviors, structures, interfaces, tests,
   locations, and invariants.
3. Propose decomposition options and converge on cut lines.
4. Build a dependency graph and wave plan.
5. Red-team the breakdown for hidden dependencies, unverifiable work, missing
   context, deferred integration risk, and orphan work.
6. Write tickets and `ORCHESTRATION.md`.
7. Present the wave table and preserved dissent for approval.

## Execution

When running tickets:

- Dispatch only approved wave tickets.
- Give each subagent the goal folder path, ledger path, ticket path, relevant
  parent IDs, allowed scope, done criteria, escalation triggers, and report
  target.
- Require each ticket report under `reports/`.
- Check wave exit criteria before starting the next wave.
- End with an integration and verification wave.
- Update the status board and ledger after material progress.

## Escalation

Stop and report when a ticket needs unapproved files, conflicts with an
invariant, reveals a dossier mismatch, requires a schema/API/dependency change,
or cannot run its verification.
