# Ruthless Test Strategy

Optimize for confidence per test, not test count or coverage theater. A test
earns its place only when it protects real behavior at an acceptable cost.

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
