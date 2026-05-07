---
name: agent-swarm
description: "Coordinate coding subagents so parallel work stays scoped, composable, reviewable, testable, and integrated without code sprawl. Use when decomposing large work across subagents, running a coding swarm, assigning investigator/implementer/test-writer/reviewer tasks, preventing overlapping diffs, integrating subagent outputs, or managing multi-agent worktrees/rooms."
---

# Agent Swarm

Use this skill when a primary coding agent must coordinate subagents without
creating chaos. The goal is useful, reviewable, low-conflict progress, not
maximum parallelism.

For full task packet schemas, role prompts, examples, and anti-patterns, read
[references/guide.md](references/guide.md) before running a substantial swarm.

## Prime Directive

The coordinator owns the system shape. Subagents own bounded execution.

The coordinator must:

1. Understand the whole goal.
2. Split it into coherent, independently executable tasks.
3. Prevent overlap and speculative architecture.
4. Give every subagent a precise task contract.
5. Require evidence, tests, and handoff notes.
6. Review each result against small-code and ruthless-test standards.
7. Integrate only changes that compose cleanly.
8. File follow-up work instead of expanding scope mid-task.
9. Keep the repo simpler or no worse.

Never dispatch vague work. Never merge unreviewed work. Never let parallelism
outrank coherence.

## When To Use

Use for:

- Large tasks that can be split across agents.
- Parallel investigation of separate code areas.
- Implementation plus independent review.
- Refactors across several boundaries.
- Multi-agent worktree, room, issue-DAG, or terminal swarm flows.
- Code review, test review, architecture review, or integration review.

Do not use for tiny single-file fixes unless the task is review-only.

## Swarm Law

No subagent gets a task unless the task has:

- Concrete objective.
- Relevant context.
- Allowed scope.
- Explicit non-goals.
- Expected artifact.
- Verification command or evidence.
- Integration boundary.
- Stop condition.
- Handoff format.

No naked tasks.

## Coordinator Workflow

1. Intake: identify goal, current state, risks, boundaries, constraints,
   verification, and split potential.
2. Map work: classify tasks as independent, blocked, serial, review-only, or
   integration.
3. Write task packets with scope, non-goals, verification, stop conditions, and
   handoff format.
4. Dispatch only low-conflict tasks with clear outputs.
5. Monitor by exception; subagents stop when scope or design assumptions break.
6. Review every output for scope, correctness, sprawl, test quality, and
   integration risk.
7. Integrate accepted outputs in dependency order and simplify the combined
   result.

## Parallelism Rules

Parallelize:

- Exploration.
- Independent leaf changes.
- Alternative design proposals.
- Review passes.
- Tests for separate behaviors.
- Documentation after code stabilizes.

Serialize:

- Shared API design.
- Data model or migration changes.
- Auth, payment, and security-sensitive logic.
- Cross-cutting renames.
- Dependency upgrades.
- Core state machines.
- Large architecture decisions.

## Task Packet Minimum

```yaml
task_id: short-stable-id
role: investigator | implementer | reviewer | test-writer | refactorer | integrator
objective: One sentence describing the outcome.
context:
  files:
    - path/to/relevant/file
allowed_scope:
  files:
    - path/or/glob
  operations:
    - read
    - edit
    - test
non_goals:
  - Things this agent must not do
constraints:
  - Preserve public behavior unless explicitly listed
  - Do not add dependencies
  - Keep diff small
expected_output:
  - Code diff, test diff, findings report, or integration report
verification:
  commands:
    - npm test -- path/to/test
handoff:
  required_sections:
    - Summary
    - Files changed
    - Behavior changed
    - Tests run
    - Risks
    - Follow-ups
stop_conditions:
  - Scope requires editing outside allowed files
  - Public API change seems necessary
  - Tests reveal unrelated failure
```

## Review Gates

For every subagent output, ask:

- Did it solve the assigned objective?
- Did it stay in scope?
- Did it preserve behavior outside the task?
- Is the diff small and coherent?
- Does it introduce unnecessary abstraction?
- Does it duplicate existing logic?
- Does it add dependencies?
- Are tests behavioral and relevant?
- Can this compose with other outputs?

Choose one: accept, request changes, integrate manually, reject, file follow-up,
or escalate to human.

## Final Handoff

```markdown
# Swarm Handoff

## Goal

## Plan Executed

## Subtasks

| Task | Agent Role | Status | Notes |
|---|---|---|---|

## Accepted Changes

## Rejected Changes

## Simplifications Made

## Tests / Verification

## Risks

## Follow-Up Tasks

## Final Recommendation
```
