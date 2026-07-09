---
name: goal-protocol
description: >
  Create, converge, blueprint, orchestrate, run, review, and hand off durable
  agent goals. Use for Codex /goal files, goal-council convergence,
  code-council implementation dossiers, goal-orchestrator tickets and waves,
  and multi-agent execution that needs a persistent GOAL_LEDGER.md.
category: planning
priority: default
---

# Goal Protocol

Use this skill to manage a goal from vague intent to verified implementation
without losing context between agents, sessions, or subagents.

The durable operational source of truth is `GOAL_LEDGER.md`.

## Contract

Every non-trivial goal gets a goal folder:

```text
docs/goals/<goal-slug>/
  GOAL_LEDGER.md
  GOAL.md
  CODE_DOSSIER.md
  ORCHESTRATION.md
  tickets/
  reports/
  decisions/
  context/
```

Small repos may use `goals/<goal-slug>/` or `.goal/<goal-slug>/` when there is
no docs convention.

## Use When

- User asks for a Codex `/goal` prompt, goal file, or long-running objective.
- User asks to make a fuzzy goal concrete.
- User wants goal-council, code-council, or goal-orchestrator behavior.
- User wants durable shared context for agents or subagents.
- User asks for tickets, waves, execution plans, status, review, pivot, compact,
  or handoff.
- Work spans multiple phases, sessions, or agents.

## Do Not Use When

- The task is a single small edit that can be completed directly.
- The user only wants brainstorming and no persistent artifact.
- The work depends on secrets, production deploys, destructive operations, or
  human-only taste decisions at every step.
- Progress and completion cannot be verified objectively.

## Modes

- `create`: draft `GOAL.md` and initialize `GOAL_LEDGER.md`.
- `converge`: refine `GOAL.md` until metrics, anti-goals, assumptions,
  constraints, review cadence, dissent, and pivot triggers are explicit.
- `blueprint`: create or update `CODE_DOSSIER.md`.
- `orchestrate`: create or update `ORCHESTRATION.md` and tickets.
- `run`: execute tickets/waves or dispatch subagents.
- `status`: read the ledger and report current phase, blockers, and next action.
- `review`: compare progress against goal, dossier, orchestration, and tickets.
- `pivot`: create a vNext goal while preserving learning.
- `compact`: produce a portable summary.
- `handoff`: produce an agent-ready continuation packet.

## Always Read First

1. Locate the goal folder.
2. Read `GOAL_LEDGER.md` if it exists.
3. Read only the phase-relevant artifact:
   - `GOAL.md` for `create`, `converge`, `review`, or `pivot`.
   - `CODE_DOSSIER.md` for `blueprint` or implementation correctness.
   - `ORCHESTRATION.md` and the assigned ticket for `orchestrate`, `run`, or
     `status`.
4. Resume from the ledger current phase. Do not restart unless explicitly asked.

If no ledger exists, create one before substantial multi-phase work.

## Ledger Discipline

- Keep `Current Snapshot` short and current.
- Append a `Ledger Entry` after every material change.
- Log material decisions as `D###`, assumptions as `A###`, risks as `R###`,
  validations as `V###`, and handoffs as `H###`.
- Never delete old ledger entries.
- Correct history by appending a superseding entry.
- No ticket, code change, interface, test, or wave may exist without a traceable
  parent ID.
- Subagents may write reports, but the supervisor integrates ledger updates
  unless that responsibility is explicitly delegated.

## Traceability IDs

Use the ID scheme from `references/ledger-schema.md`. Prefer existing IDs when
artifacts already define them.

## Workflow

1. Intake: classify the request, create or locate the goal folder, and establish
   the ledger.
2. Goal contract: create or update `GOAL.md`; do not lock it until metrics,
   anti-goals, assumptions, constraints, dissent, milestones, review cadence,
   and pivot triggers are present.
3. Code blueprint: for implementation goals, create or update
   `CODE_DOSSIER.md` with traceable features, behaviors, structures,
   interfaces, tests, locations, invariants, and verification.
4. Orchestration: create tickets and `ORCHESTRATION.md`; every ticket must be
   independently completable, self-contained, verifiable, wave-safe, and traced.
5. Execution: hand subagents a ticket path, goal folder path, relevant parent
   IDs, allowed scope, done criteria, escalation triggers, and report target.
6. Review: compare actual results against goal success criteria, dossier
   invariants/tests, orchestration wave gates, and ticket done criteria.
7. Compact/handoff: report authoritative artifacts, current phase, active
   decision, open risks/questions, next action, latest validation, and what not
   to redo.

## Hard Rules

- Ledger first. No multi-phase work without `GOAL_LEDGER.md`.
- Resume, do not restart.
- No untraced work.
- No hidden assumptions.
- No ticket that requires conversation memory.
- No same-wave overlapping file edits without explicit coordination.
- Stop after three failed attempts at the same check and summarize the blocker.
- Do not add dependencies, alter public APIs, change schemas, or expand scope
  without updating the ledger and affected dossier first.
- Never mark complete without validation evidence or an explicit reason
  validation could not run.

## References

Read only what the task needs:

- `references/ledger-schema.md` for ledger fields, ID rules, and examples.
- `references/codex-goal.md` for Codex `/goal` files and stop conditions.
- `references/goal-council.md` for convergence, review, stress-test, and pivot.
- `references/code-council.md` for implementation dossiers and traceability.
- `references/goal-orchestrator.md` for tickets, waves, status, and execution.
- `references/quality-gates.md` for gates, red team, verification, and handoff.

## Assets

- `assets/goal-ledger.template.md`
- `assets/goal-file.template.md`
- `assets/code-dossier.template.md`
- `assets/orchestration.template.md`
- `assets/ticket.template.md`

## Output

For creation:

```text
Goal folder: docs/goals/<goal-slug>/
Goal file: docs/goals/<goal-slug>/GOAL.md
Ledger: docs/goals/<goal-slug>/GOAL_LEDGER.md
Start command: /goal docs/goals/<goal-slug>/GOAL.md
```

For status:

```md
## Status
Phase:
Current artifact:
Current ticket/wave:
Blocker:
Next action:
Latest validation:
Risks:
```

For handoff:

```md
# Goal Handoff

Goal folder:
Read first:
Current phase:
Current decision:
Assigned work:
Allowed scope:
Done criteria:
Escalation triggers:
Ledger update required:
```
