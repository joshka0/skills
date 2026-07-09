# Goal Council Mode

Use this reference for `goal-protocol converge`, `review`, `stress-test`,
`pivot`, and `compact`.

## Purpose

Treat the user's first goal as a hypothesis. The council process clarifies the
real objective, makes tradeoffs visible, preserves serious dissent, and locks a
durable goal dossier only when the goal is measurable and reviewable.

## Convergence Flow

1. Intake: stated goal, deeper goal, horizon, current state, desired state,
   constraints, unknowns, stakes, and what must not happen.
2. Council formation: select only useful roles, such as Goal Framer, User
   Advocate, Context Mapper, Strategy Architect, Skeptic, Opportunity Scout,
   Execution Planner, Measurement Agent, and Synthesizer.
3. Divergence: generate meaningfully different candidate goals.
4. Cross-examination: strongest arguments, hidden assumptions, failure modes,
   opportunity cost, reversibility, and information needed.
5. Convergence scoring: alignment, leverage, feasibility, clarity,
   measurability, robustness, motivation, reversibility, information value, and
   opportunity cost.
6. Simulation and premortem: best, expected, and failure paths; early warning
   signs; anti-goals and invariants.
7. Red team gate: at least three substantive objections or a reasoned
   none-found.
8. Write or update `GOAL.md`.

## Lock Standard

A goal is not ready to lock until it has:

- clear statement
- horizon
- why
- at least one measurable metric
- at least one leading indicator
- anti-goals
- constraints
- assumptions
- preserved dissent
- first milestone
- first sprint or execution slice
- review cadence
- pivot or exit triggers

If any are missing, say:

```text
This goal is not ready to lock yet because:
```

Then list only the gaps.

## Maintenance Modes

- `review`: compare actual progress against expected progress; recommend
  continue, adjust, narrow, experiment, pause, pivot, or archive.
- `stress-test`: challenge assumptions and identify risk-reduction experiments.
- `pivot`: separate temporary friction from structural mismatch; preserve
  reusable learning; create a vNext goal.
- `compact`: produce a portable summary without changing files unless asked.

Every material change updates `GOAL.md` and appends to `GOAL_LEDGER.md`.
