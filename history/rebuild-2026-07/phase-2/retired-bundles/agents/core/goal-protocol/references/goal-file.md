# Goal file

Read only when a `/goal` or legacy `codex-goal` request needs a durable, runnable objective contract.

Create or update `GOAL.md` at the goal root with these required fields:

- **Objective:** the observable outcome and what must remain true.
- **Context:** current facts, relevant artifacts, constraints, and known uncertainty.
- **Constraints:** allowed scope, non-goals, dependency and side-effect boundaries, and escalation rules.
- **Verification:** commands or evidence, acceptance criteria, and the required final review.
- **Stop conditions:** repeated-failure limit and approval boundaries for public contracts, schema, dependencies, or architecture.
- **Done:** the complete, objectively checkable exit condition and residual-risk handoff.

Use a goal only when those fields can be stated without unresolved product choice, secret handling, risky production action, or unapproved broad design change. Place the file under `docs/goals/<goal-slug>/GOAL.md` unless repository convention names another goal root.

Before a start or continuation handoff, inspect installed `/goal` help and repository configuration for current syntax. Return the goal-file path, current phase, verified start method, stop conditions, and required ledger update; do not freeze CLI flags or command variants in this package.
