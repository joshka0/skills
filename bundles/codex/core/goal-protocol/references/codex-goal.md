# Codex Goal Mode

Use this reference for `goal-protocol create`, `status`, and `review` when the
goal will run through Codex CLI `/goal`.

## When `/goal` Fits

Use `/goal` for work that can be verified objectively:

- behavior-preserving refactors
- feature implementation with clear acceptance criteria
- bug hunts with reproduction and regression tests
- test backfills with quality thresholds
- cleanup work with explicit delete/simplify criteria
- multi-step engineering loops that benefit from plan, act, test, review, and
  iterate cycles

Avoid `/goal` for vague product decisions, secrets work, risky production
operations, destructive actions, or work where a human must choose direction at
every step.

## Goal File Shape

`GOAL.md` should include:

- goal
- context
- constraints
- verification
- stop conditions
- done criteria
- final self-review expectations

For the goal-protocol folder model, write this as
`docs/goals/<goal-slug>/GOAL.md`, then start with:

```text
/goal docs/goals/<goal-slug>/GOAL.md
```

## Good Goal Rules

- Make success measurable.
- Include done criteria.
- Bound the file and behavior scope.
- State what must not change.
- Prefer milestones for large work.
- Require behavior-focused tests.
- Require narrow verification after each phase and full verification at the end.
- Stop after repeated failed attempts at the same blocker.

## Monitoring

Use `/status`, `/goal pause`, `/goal resume`, and `/goal clear` when available.
Reflect material status changes in `GOAL_LEDGER.md` so future agents do not need
the live conversation.

## Output

When creating a goal, return:

```text
Goal folder: docs/goals/<goal-slug>/
Goal file: docs/goals/<goal-slug>/GOAL.md
Ledger: docs/goals/<goal-slug>/GOAL_LEDGER.md
Start command: /goal docs/goals/<goal-slug>/GOAL.md
```
