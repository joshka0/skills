# Quality Gates

Use these gates across `goal-protocol` modes.

## Gate Statuses

- `Pending`: drafted but not approved.
- `Approved`: accepted as the current contract.
- `Revised`: changed after a later finding.
- `Blocked`: cannot proceed without a decision or external change.
- `Superseded`: replaced by a newer entry or artifact.

## Phase Gates

| Phase | Gate |
|---|---|
| Intake | Goal folder and `GOAL_LEDGER.md` exist. |
| Convergence | `GOAL.md` has metrics, anti-goals, assumptions, constraints, dissent, cadence, and pivot triggers. |
| Code Blueprint | `CODE_DOSSIER.md` has traceable features, behaviors, structures, interfaces, tests, locations, and invariants. |
| Orchestration | Tickets are self-contained, verifiable, traced, and wave-safe. |
| Execution | Current wave is complete, reported, and verified. |
| Verification | Full verification and self-review are complete. |

## Red Team Gate

Use before locking a goal, blueprint, ticket breakdown, or completed diff:

```md
## Red Team: <artifact>
Attack 1 (strongest): <specific failure, wrong assumption, or scope problem>
Attack 2: <specific concern>
Attack 3: <specific concern>
Happy-path blindspot: <what breaks off the main path>
Verdict: proceed / proceed-with-changes / block
```

Minimum standard: three substantive attacks or a reasoned none-found. Record
the strongest surviving attack as preserved dissent.

## Verification Gate

Before marking a phase done:

- list commands/checks run
- record result and evidence
- document checks not run and why
- link follow-up risks
- append a validation log row and ledger entry

## Handoff Gate

A handoff is ready only when it includes:

- goal folder
- read-first artifacts
- current phase
- active decision
- assigned work
- allowed scope
- done criteria
- escalation triggers
- ledger update requirement

## Stop Conditions

Stop and summarize when:

- the same validation fails three times without progress
- the next step requires a human decision
- a ticket needs unapproved files or scope
- a schema/API/dependency change is required but not approved
- generated/provider/archive files would need source edits
- validation cannot run and no safe substitute exists
