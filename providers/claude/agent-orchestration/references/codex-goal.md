# Codex Goal Reference

Detailed reference for the `goal` mode of agent-orchestration. Covers goal file
structure, verification criteria, monitoring, phased workflows, and loop
control for Codex CLI `/goal` objectives.

## When To Use `/goal`

Use `/goal` for long-running work that can be verified objectively:

- Refactors with behavior-preserving tests.
- Feature implementation with clear acceptance criteria.
- Bug hunts with reproduction and regression tests.
- Test backfills with quality thresholds.
- Cleanup work with explicit delete/simplify criteria.
- Multi-step engineering tasks that benefit from plan, act, test, review,
  iterate loops.

Avoid `/goal` for:

- Vague requests or ambiguous product decisions.
- Risky production operations.
- Secrets work.
- Tasks where a human must choose direction at every step.

## Setup Check

Before using `/goal`:

1. Confirm Codex CLI supports it: `codex --version`.
2. If `/goal` is unavailable, enable goals and restart:

```toml
[features]
goals = true
```

Add that to `~/.codex/config.toml` or a repo-specific `.codex/config.toml`.

3. Write the objective to a file named `<task>_goal.md`. Prefer
   `docs/goals/<task>_goal.md` when the repo has docs, otherwise put it near
   the current planning artifacts.
4. Start with `/goal docs/goals/<task>_goal.md`, `/goal <task>_goal.md`, or
   `/goal create <task>_goal.md` depending on the CLI build.
5. Manage long runs with `/goal pause`, `/goal resume`, `/goal clear`, and
   `/status` when available.

## Goal File Shape

Create `<task>_goal.md` with this structure:

```markdown
# Goal: <task name>

## Goal
<exact behavior or outcome to deliver>

## Context
- Relevant files, folders, errors, docs, tickets, examples, or prior findings.

## Constraints
- Scope boundaries.
- Files or directories allowed/disallowed.
- Dependency policy.
- Architecture and style rules from AGENTS.md.
- Attempt limits or stop conditions.

## Verification
- Commands to run.
- Tests, lint, typecheck, screenshots, audits, or coverage thresholds.
- "Done when" criteria.
- Required final self-review.

## Stop Conditions
- Pause after repeated failed attempts at the same blocker.
- Stop before changing public API, schema, dependencies, or broad architecture
  unless explicitly allowed.
```

## Good Goal Rules

- Make the goal measurable.
- Include "Done when" criteria.
- Bound the file and behavior scope.
- State what must not change.
- Prefer milestones for large work.
- Require behavior-focused tests, not coverage theater.
- Require narrow verification after each phase and full verification at the end.
- Ask for a final self-review: what would fail in code review, residual risks,
  and confidence score.
- Stop or pause after repeated failed attempts instead of looping.

## Goal Quality Filter

Before starting, ask:

- Can success be verified without subjective judgment?
- Is the goal small enough for one autonomous loop?
- Are boundaries explicit enough to avoid wandering?
- Are commands and expected outputs known?
- Are rollback or commit points clear?
- Is there an AGENTS.md or equivalent repo guidance?
- Are secrets, credentials, and production operations excluded or clearly safe?

If any answer is weak, refine the prompt or use plan mode first.

## Recommended Workflow

1. Use plan mode first for complex tasks.
2. Ask Codex to draft `<task>_goal.md` if the objective is still fuzzy.
3. Review and edit the goal file before starting the loop.
4. Start `/goal` by pointing it at the goal file.
5. Split large work into milestones inside the goal file.
6. Commit or checkpoint per phase when appropriate.
7. Monitor periodically with `/status`.
8. Pause and redirect if it loops on low-priority issues.
9. At the end, require full verification and a self-review.

## Loop Control

To prevent inefficient loops, include limits:

- "Stop after 3 failed attempts at the same failing check and summarize the
  blocker."
- "Do not expand scope to unrelated files."
- "Do not add dependencies without explicit approval."
- "Prioritize acceptance criteria over opportunistic cleanup."
- "If verification cannot run, explain why and provide the exact command."

## Phased Workflows

For large goals, use milestones:

```markdown
## Milestones

### Phase 1: Foundation
- <concrete deliverable>
- Verification: <command>

### Phase 2: Core Implementation
- <concrete deliverable>
- Verification: <command>

### Phase 3: Polish & Testing
- <concrete deliverable>
- Verification: <command>
```

Each phase should have its own verification step. Require narrow verification
after each phase and full verification at the end.

## Output Style

When creating a goal, output:

- Goal file: `docs/goals/<task>_goal.md`
- Start command: `/goal docs/goals/<task>_goal.md`

Include short sections for why the goal is verifiable, monitoring notes, and
stop conditions.

When reviewing an existing goal, output:

```markdown
Verdict: Ready / Needs tighter scope / Not suitable for /goal

Issues:
- ...

Rewritten goal:
...
```
