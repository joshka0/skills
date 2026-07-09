# Goal Ledger - <goal name>

Ledger version: 1
Goal slug: <goal-slug>
Created: <YYYY-MM-DD>
Last updated: <YYYY-MM-DD>
Current phase: intake | convergence | code-blueprint | orchestration | execution | verification | complete | paused | blocked
Current owner: <human | primary-agent | subagent-id>
Primary artifacts:
- Goal: GOAL.md
- Code dossier: CODE_DOSSIER.md
- Orchestration: ORCHESTRATION.md
- Tickets: tickets/
- Reports: reports/

## Current Snapshot

Goal:
<one sentence>

Why:
<one sentence>

Success metric:
<metric or acceptance condition>

Current milestone:
<current milestone>

Current wave/ticket:
<wave/ticket or n/a>

Current blocker:
<none or blocker>

Next action:
<exact next action>

Last material decision:
<D### - summary>

## Read This First

Every agent must read these before acting:

1. `GOAL_LEDGER.md`
2. The artifact listed for the current phase:
   - convergence -> `GOAL.md`
   - code-blueprint -> `CODE_DOSSIER.md`
   - orchestration/execution -> `ORCHESTRATION.md`
   - ticket work -> assigned `tickets/TK###-*.md`
3. Any linked reports or decisions referenced by the current ticket/phase.

## Artifact Index

| Artifact | Purpose | Status | Last material update | Owner |
|---|---|---|---|---|
| GOAL.md | Goal dossier / success contract | draft/approved/revised | L### | |
| CODE_DOSSIER.md | Implementation blueprint and traceability | draft/approved/revised | L### | |
| ORCHESTRATION.md | Ticket waves and execution plan | draft/approved/revised | L### | |
| tickets/ | Agent-executable work packets | active | L### | |
| reports/ | Execution, review, verification reports | active | L### | |

## Phase Gates

| Phase | Gate | Status | Evidence | Ledger entry |
|---|---|---|---|---|
| Intake | Goal folder created and ledger initialized | pending/approved | | |
| Convergence | GOAL.md has metrics, anti-goals, assumptions, review cadence, pivot triggers | pending/approved | | |
| Code Blueprint | CODE_DOSSIER.md has feature contract, behavior matrix, data/interface/test/location/invariant traceability | pending/approved | | |
| Orchestration | Tickets are self-contained, verifiable, traced, wave-safe | pending/approved | | |
| Execution | Current wave completed and verified | pending/approved | | |
| Verification | Full verification and self-review completed | pending/approved | | |

## Traceability Index

| ID | Type | Summary | Parent | Artifact | Status |
|---|---|---|---|---|---|
| G001 | Goal | | - | GOAL.md | draft |
| F001 | Feature | | G001 | CODE_DOSSIER.md | draft |
| B001 | Behavior | | F001 | CODE_DOSSIER.md | draft |
| T001 | Test | | B001 | CODE_DOSSIER.md | draft |
| TK001 | Ticket | | F001/B001/T001 | tickets/TK001-*.md | todo |

## Status Board

| Work item | Status | Owner | Started | Updated | Blocker | Report |
|---|---|---|---|---|---|---|
| TK001 | todo/in-progress/done/blocked/escalated | | | | | |

## Decision Log

| ID | Date | Decision | Rationale | Alternatives rejected | Confidence | Supersedes |
|---|---|---|---|---|---:|---|
| D001 | YYYY-MM-DD | | | | medium | |

## Assumption Log

| ID | Assumption | Why it matters | Validation plan | Status | Ledger entry |
|---|---|---|---|---|---|
| A001 | | | | untested/validated/invalidated | |

## Risk Log

| ID | Risk | Impact | Mitigation | Trigger | Status |
|---|---|---|---|---|---|
| R001 | | low/med/high | | | open/mitigated/accepted |

## Open Questions

| ID | Question | Needed by | Owner | Status | Resolution |
|---|---|---|---|---|---|
| Q001 | | phase/ticket | | open/answered/deferred | |

## Validation Log

| ID | Date | Command/check | Result | Evidence | Follow-up |
|---|---|---|---|---|---|
| V001 | YYYY-MM-DD | | pass/fail/not-run | | |

## Handoff Log

| ID | Date | From | To | Context | Next action | Risks |
|---|---|---|---|---|---|---|
| H001 | YYYY-MM-DD | | | | | |

## Ledger Entries

Append only. Never delete or rewrite old entries. To correct an entry, append a
new entry that supersedes it.

### L001 - <YYYY-MM-DD HH:mm> - init
Actor: <agent/user>
Phase: intake
Artifacts touched:
- GOAL_LEDGER.md

Summary:
- Initialized goal ledger.

Why:
- Need durable coordination state across goal, code, orchestration, and subagent phases.

Decisions:
- None.

Validation:
- Not run.

Next:
- Draft or ingest GOAL.md.

Supersedes:
- None.
