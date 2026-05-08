# Codex Goal Guide

## Purpose

Codex CLI `/goal` turns a broad objective into a persistent autonomous loop:

```text
plan -> act -> test -> review -> iterate
```

It works best when treated like a teammate with a written contract. Store that
contract in a file named `<task>_goal.md`, then point `/goal` at the file. The
file needs success metrics, boundaries, verification, and stop conditions. Vague
goals create loops and low-signal work.

## Best Uses

Good `/goal` candidates:

- Add or complete a feature with clear acceptance criteria.
- Fix a bug with reproduction and regression tests.
- Improve a focused test suite to a defined quality bar.
- Perform a scoped behavior-preserving refactor.
- Remove a known class of warnings or lint failures.
- Execute a multi-step cleanup with clear file boundaries.

Poor candidates:

- "Make this better."
- Broad architecture changes without a target design.
- Product strategy decisions.
- Open-ended research with no stopping rule.
- Secrets, credentials, production deploys, or destructive operations.
- Work that needs frequent human taste or prioritization calls.

## Activation

Check CLI support:

```sh
codex --version
```

If `/goal` is unavailable, enable it:

```toml
[features]
goals = true
```

Put that in `~/.codex/config.toml` or repo-local `.codex/config.toml`, then
restart Codex.

Command syntax may vary by build. Prefer file-based goals:

```text
/goal docs/goals/<task>_goal.md
/goal <task>_goal.md
/goal create docs/goals/<task>_goal.md
/goal pause
/goal resume
/goal clear
/status
```

If a command is rejected, ask the CLI for `/help` and adapt to the local build.

## Goal File Location

Prefer:

```text
docs/goals/<task>_goal.md
```

Use a local planning directory or repo root when the repo has no docs structure:

```text
<task>_goal.md
```

Keep the file committed only when it is useful project context. For one-off
local automation, it can remain uncommitted.

## Four-Part Goal File Structure

### Goal

State the exact behavior or outcome:

```text
Add persisted draft autosave for the editor and restore drafts after reload.
```

Avoid:

```text
Improve the editor.
```

### Context

Include only relevant context:

- Files and directories.
- Failing commands or errors.
- Tickets or docs.
- Existing examples to follow.
- AGENTS.md instructions.
- Known constraints from prior investigation.

### Constraints

Use explicit constraints:

- Allowed paths.
- Disallowed paths.
- Dependency policy.
- Public API compatibility.
- Persistence or migration rules.
- UX or design system rules.
- Security and secrets boundaries.
- Maximum attempts before pausing.

### Verification

Define proof:

- Unit, integration, e2e, lint, typecheck, build.
- Coverage threshold only when paired with behavior-quality guidance.
- Screenshots or visual checks for UI.
- Security/performance checks where relevant.
- Final self-review and residual risk report.

## Strong Goal File Template

# Goal: <task name>

## Goal
Implement <specific behavior>.

## Context
- Relevant files: <paths>
- Existing pattern to follow: <paths>
- Current failure or gap: <description>

## Constraints
- Only modify <paths> unless required for tests.
- Preserve public API and existing behavior outside <scope>.
- Do not add dependencies without explicit approval.
- Use existing project conventions and AGENTS.md.
- Prefer small, composable, testable code.
- Stop after 3 failed attempts at the same verification failure and summarize the blocker.

## Verification
- Run <narrow command> after each phase.
- Run <full command> before final response.
- Done when <criteria 1>, <criteria 2>, and <criteria 3>.
- Final response must include changed files, verification results, residual risks, and confidence score.

## Stop Conditions
- Pause before public API, schema, dependency, or architecture changes not listed above.
- Pause if verification cannot run.
```

Start it with:

```text
/goal docs/goals/<task>_goal.md
```

## Milestone Template

For large work, ask Codex to create phase files first:

# Goal: <objective>

Create and execute a phased implementation plan for <objective>.

First create:
- implementation.md: high-level phases and acceptance criteria.
- implementation_details.md: concrete tasks, commands, and risks.

Then execute one phase at a time. Verify and summarize after each phase. Stop
before the next phase if verification fails repeatedly or scope expands beyond
the plan.
```

## Test Backfill Goal

# Goal: improve <module> tests

Improve the tests for <module> so they protect real behavior rather than implementation details.

Context:
- Source: <paths>
- Existing tests: <paths>
- Known risks: authorization, idempotency, time, migration, error handling.

Constraints:
- Do not add tests only for coverage.
- Delete or rewrite low-value tests when they duplicate behavior or assert internals.
- Keep tests fast enough for PR CI unless explicitly marked slower.

Verification:
- Run <test command>.
- Done when critical behaviors are covered, tests are deterministic, and no existing behavior regresses.
- Final review must list tests added, tests deleted/rewritten, protected behavior, and remaining gaps.
```

## Refactor Goal

# Goal: refactor <area>

Refactor <area> to reduce complexity without changing observable behavior.

Context:
- Touched area: <paths>
- Current pain: <specific pain>

Constraints:
- Preserve public behavior, API contracts, data formats, and error semantics.
- Prefer local refactors only.
- Do not introduce new architecture, dependencies, or broad rewrites.
- Keep core logic testable without real I/O.

Verification:
- Run existing tests before and after when practical.
- Add focused regression tests only for behavior at risk.
- Done when behavior is unchanged, complexity is lower, and verification passes.
```

## Bug Hunt Goal

# Goal: fix <symptom>

Find and fix the bug causing <symptom>.

Context:
- Reproduction steps: <steps>
- Error/log output: <output>
- Suspected files: <paths>

Constraints:
- First reproduce or explain why reproduction is impossible.
- Add the smallest regression test that fails before the fix and passes after.
- Avoid broad cleanup unless it directly clarifies the fix.

Verification:
- Run the regression test.
- Run related test suite.
- Done when the bug is fixed, regression test exists, and related tests pass.
```

## Monitoring And Intervention

Check status periodically. Pause and redirect when:

- It repeatedly fixes low-priority issues instead of acceptance criteria.
- It expands into unrelated files.
- It adds architecture not required by the goal.
- It fails the same command repeatedly without a new hypothesis.
- It cannot run verification due to environment issues.
- Token or cost budget is being consumed without progress.

Useful redirect:

```text
Pause. Summarize current state, completed acceptance criteria, failing criteria,
the last 3 attempts, and the smallest next action. Do not make further edits.
```

## End-Of-Run Review

Require a final answer with:

- Objective.
- Acceptance criteria status.
- Files changed.
- Tests and commands run.
- What was not run and why.
- Residual risks.
- What would likely fail in code review.
- Confidence score from 1 to 10.
- Suggested next goal if useful.

## Common Pitfalls

Weak goals:

- Fix with measurable acceptance criteria.

Overlarge goals:

- Split into milestones or separate `/goal` runs.

Token loops:

- Add stop conditions and attempt limits.

Scope creep:

- Constrain paths and behavior.

Low-value cleanup:

- Prioritize acceptance criteria over opportunistic improvements.

Activation issues:

- Check config, restart, and run `/help`.

Over-reliance:

- Human steering still matters for ambiguous product and architecture decisions.

## Readiness Checklist

Before starting:

- Success is measurable.
- Scope boundaries are explicit.
- Verification commands are known.
- Stop conditions are included.
- AGENTS.md or repo guidance is available.
- Dependency policy is clear.
- Dangerous operations are excluded or require confirmation.
- Goal is small enough, or split into milestones.

If not ready, use plan mode first.
