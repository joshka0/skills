---
name: ruthless-test-strategy
description: "Create, review, improve, and prune tests so the suite measures real product behavior, catches meaningful regressions, and stays fast, trustworthy, and maintainable. Use when writing tests, reviewing tests, reducing flake, pruning low-value tests, evaluating coverage, designing test strategy, or deciding whether a failing test is useful."
---

# Ruthless Test Strategy

Use this skill to optimize for confidence per test, not test count or coverage
theater. A test earns its place only when it protects real behavior at an
acceptable cost.

For the full strategy, examples, suite review templates, pruning templates, and
subagent prompts, read [references/strategy.md](references/strategy.md).

## Prime Directive

Optimize for:

1. Regression detection
2. Behavioral relevance
3. Fast feedback
4. Low maintenance cost
5. High trust
6. Clear failure diagnosis

Do not optimize primarily for raw coverage percentage, number of tests,
assertion count, snapshot count, mock count, testing pyramid purity, or dogma
detached from the system's actual risk.

## Test Value Equation

```text
Test Value =
  Probability it catches an important bug
  x Impact of that bug
  x Speed of feedback
  x Clarity of failure
  / Maintenance cost
  / Flakiness
  / Execution cost
  / False confidence risk
```

## Ruthless Test Filter

Before adding or keeping a test, ask:

1. What real behavior does this protect?
2. What bug would this catch?
3. Has this kind of bug happened before, or is it plausible?
4. Would a user, customer, operator, or downstream system care if this failed?
5. Would another existing test already catch the same issue?
6. Is this test coupled to implementation instead of behavior?
7. Will this test still be useful after refactoring?
8. When it fails, will the cause be obvious?
9. Is it fast enough to run at the right feedback stage?
10. Would deleting this test reduce confidence in a meaningful way?

If the answer to #10 is no, delete it.

## Real Behavior

Protect user-visible outcomes, API contracts, database state transitions,
external side effects, domain rules, security boundaries, authorization,
error handling, retries, idempotency, validation, state machines, billing,
message contracts, compatibility, meaningful performance limits, production
observability, recovery behavior, and invariants.

Do not usually protect private helper calls, incidental intermediate data,
class/helper choice, meaningless render shape, mock calls, or lines executed
without meaningful assertions.

## Workflow

1. Identify the risk: what can go wrong that matters?
2. Define the observable behavior in plain language.
3. Pick the smallest useful boundary: pure function, domain service, API, DB
   transaction, message handler, UI interaction, contract, or user journey.
4. Use realistic inputs, including boundary, invalid, malicious, historical,
   concurrency, retry, old-data, and timezone cases when relevant.
5. Assert outcomes, not implementation chatter.
6. Make failures useful with behavior-named tests and precise assertions.
7. Keep the test cheap enough for the right feedback stage.

## Thermonuclear Test Review Add-On

When reviewing tests during a harsh maintainability pass, do not let tests lock
in a messy implementation just because behavior currently passes.

- If the code under test is spaghetti, ask whether the model should be cleaned
  before adding more assertions around it.
- If a test must know about casts, optional branches, mode flags, or fallback
  paths, question whether the production boundary should be made explicit.
- If a large file or component needs elaborate test setup, ask whether a smaller
  module or clearer seam would make the behavior easier to test.
- Prefer tests that protect a simplified canonical flow over tests that preserve
  legacy aliases, compatibility branches, or temporary fallback behavior.
- Delete or rewrite tests that only prove a thin wrapper, pass-through helper,
  mock choreography, or implementation detail.
- Use missing high-value tests as evidence for a better interface when the
  current design makes meaningful behavior hard to observe.
- Flag test suites that reward scattered special cases instead of pushing
  toward a simpler typed model, state machine, or explicit dispatcher.

## Output Style

When reviewing tests:

```markdown
Verdict: Keep / Delete / Rewrite / Demote / Quarantine

Why:
- ...

Better version:
...
```

When writing tests:

```markdown
Protected behavior:
Bug this catches:
Test boundary:
Why this level:
Test code:
```

When reviewing a suite:

```markdown
## What To Keep
## What To Delete
## What To Rewrite
## Missing High-Value Tests
## Metrics Worth Tracking
## Immediate Next Step
```
