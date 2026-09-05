---
name: goal-protocol
description: "Maintain durable goal contracts, dossiers, and handoff ledgers. Use when requesting /goal, a goal council, a code council, or execution from an existing GOAL_LEDGER.md."
---

# Goal protocol

Use the requested goal root and existing artifact conventions. Read an existing
`GOAL_LEDGER.md` to resume the current phase; do not restart completed work.

| Need | Read |
| --- | --- |
| Clarify or reconsider a long-term goal | [convergence](references/convergence.md) |
| Create a measurable GOAL.md | [goal-file](references/goal-file.md) |
| Prepare a requested implementation dossier | [implementation-dossier](references/implementation-dossier.md) |
| Prepare tickets and waves | [orchestration](references/orchestration.md) |
| Record evidence or hand off continuation | [ledger-handoff](references/ledger-handoff.md) |

Use only the surfaces the task needs. `planning-workflow` owns one-shot plans;
`agent-orchestration` owns dispatch and integration.

Keep the objective, acceptance evidence, allowed scope, and next action clear.
Preserve existing parent IDs, artifact schemas, approved packet boundaries,
and decision history. Revise the affected contract when evidence changes it.

Human gates apply when the user or governing workflow requires them. Do not
introduce a phase-by-phase approval ritual or a fixed retry count into ordinary
authorized work. Continue while new evidence can resolve the problem; record
a blocker when further progress needs input, access, or a changed condition.

Mark completion only from accepted evidence. Report authoritative artifacts,
current state, remaining work, and any required decision.
