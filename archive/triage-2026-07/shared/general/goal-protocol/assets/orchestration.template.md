# Orchestration Plan - <goal name>

Source artifacts:
- `GOAL.md`
- `CODE_DOSSIER.md`
- `GOAL_LEDGER.md`

## Mission

<north star goal and success metric>

## Global Rules

- Read `GOAL_LEDGER.md` first.
- Read your assigned ticket fully.
- Work only within the ticket scope and allowed files.
- Run the ticket done criteria before reporting complete.
- Stop on escalation triggers; do not improvise past the ticket.
- Never violate an invariant to make a test pass.
- Write reports under `reports/`.

## Waves

### Wave 1 - <theme>

| Ticket | Title | Depends | Size | Risk | Agent profile |
|---|---|---|---|---|---|
| TK001 | | - | M | medium | |

Parallel-safe:

Wave exit criteria:

### Integration / Verification Wave

- Run full test matrix.
- Run diff or implementation red-team review.
- Verify against `GOAL.md` success criteria.
- Update `GOAL_LEDGER.md`.

## Preserved Dissent

<strongest surviving objection from orchestration red team>

## Status Board

| Ticket | Status | Owner | Report | Notes |
|---|---|---|---|---|
| TK001 | todo | | | |

## Escalation Rules

Stop and report if:

- required work is outside ticket scope
- a parent artifact is inconsistent
- a same-wave file conflict appears
- verification cannot run
- an invariant conflicts with the implementation

## Ledger Update Rules

- Supervisors update `GOAL_LEDGER.md`.
- Subagents write ticket reports unless delegated ledger ownership.
- Every material wave transition gets a ledger entry.
