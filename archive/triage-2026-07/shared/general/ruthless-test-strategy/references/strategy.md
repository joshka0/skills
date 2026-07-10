# Ruthless, Behavior-Driven Test Strategy

## Purpose

Create, review, improve, and prune tests so the suite measures real product
behavior, catches meaningful regressions, and stays fast, trustworthy, and
maintainable.

Reject vanity metrics, cargo-cult testing, and best practices applied without
judgment. The goal is not more tests. The goal is more confidence per test.

## Core Philosophy

A good test is a decision tool. It tells the team, with high confidence:

```text
Something important broke.
```

A bad test says:

```text
Some implementation detail changed.
A mock was called.
Coverage went up.
The suite is green, but the product may still be broken.
```

Prefer tests that verify observable behavior, contracts, invariants, risk
boundaries, and user outcomes. Avoid tests that only verify implementation
shape, incidental calls, private mechanics, or lines executed.

## Metrics

Useful metrics:

- Bugs escaped despite tests
- Bugs caught by tests before release
- Time from defect introduction to detection
- Failure diagnosis time
- Flake rate
- Mean test runtime by layer
- Slowest tests
- Tests that never fail except during refactors
- Tests that frequently fail for non-bugs
- Duplicate behavioral coverage
- Mutation score for critical logic
- Tests deleted without confidence loss
- Percentage of failures that identify real product issues
- CI time to useful signal
- Risk coverage by feature, not line coverage by file

Dangerous vanity metrics:

- Total number of tests
- Total assertions
- Line or branch coverage alone
- Snapshot count
- Mock count
- 100% coverage
- Passing builds without production correlation
- Testing pyramid compliance as a goal

Coverage is a map of what code ran. It is not proof that behavior was verified.
Use coverage to find untested risk, not to prove quality.

## Pruning Rules

Delete tests that:

- Assert only that something exists
- Mirror implementation
- Test framework or language behavior
- Test trivial getters/setters
- Assert mocked interactions without verifying outcomes
- Duplicate another test's signal
- Break during harmless refactors
- Never catch real bugs
- Produce failures nobody trusts
- Require large setup for tiny confidence
- Exist only to increase coverage
- Snapshot huge output nobody reviews
- Verify private implementation details
- Protect behavior the product no longer needs

Rewrite tests that:

- Test the right behavior at the wrong layer
- Are valuable but brittle
- Are too broad to diagnose
- Are too narrow to matter
- Use mocks where a fake, contract test, or real dependency would be better
- Assert incidental details instead of outcomes
- Depend on time, randomness, ordering, or network state unnecessarily

Demote tests that are useful but too slow for every commit.

Quarantine tests that are flaky but protect meaningful behavior. A quarantined
test must have an owner, reason, and expiration date.

## Would You Miss It?

For each candidate test, imagine deleting it and ask:

```text
What important failure could now reach production that would not be caught elsewhere?
```

If nobody can name one, delete the test. If the answer is vague, rewrite it
until the protected behavior is clear.

## Bug Proof Rule

When fixing a bug, write the smallest test that fails because of the bug and
passes because of the fix. The test should prove the bug is dead, not merely
exercise changed code.

## Boundaries

Choose the narrowest boundary that still verifies real behavior:

- Pure function boundary
- Domain service boundary
- API endpoint boundary
- Database transaction boundary
- Message handler boundary
- UI interaction boundary
- External contract boundary
- Full user journey boundary

A tiny unit test that mocks away the bug is worse than a slightly larger test
that catches it.

## Contrarian Practices

- Fewer tests can be better when the suite becomes bloated and untrusted.
- One strong integration test can beat twenty mock-heavy unit tests.
- Do not worship the testing pyramid; use risk, not geometry.
- Test important examples, then test properties.
- Snapshot tests are guilty until proven useful.
- Production monitoring is part of testing.
- Do not mock what you do not own; use contracts, fakes, sandboxes, or recorded
  interactions.
- Test the weird user behavior: retries, double clicks, back button, expired
  sessions, duplicate messages, timeouts, clock skew, old clients, malformed
  input, migrations, replayed webhooks, and out-of-order events.
- Test state transitions and invariants more than methods.

## Test Design Workflow

1. Identify the risk:
   revenue, security, data loss, trust, compliance, availability, operational
   burden, frequency, complexity, history of bugs, rollback cost, detection
   difficulty.
2. Define the observable behavior in plain language.
3. Pick the smallest useful boundary.
4. Use realistic inputs and known-risk cases.
5. Assert outcomes: returned values, persisted state, published events, API
   responses, visible UI changes, security decisions, external payloads, or
   operationally meaningful logs/metrics.
6. Make failure useful: clear behavior names and precise assertions.
7. Keep it cheap: avoid sleeps, real network in PR tests, unnecessary full app
   startup, duplicate coverage, and giant fixtures.

## Test Types

Unit tests are best for pure logic, domain rules, algorithms, validation,
formatting with requirements, edge cases, error handling, and small state
machines.

Integration tests are best for database behavior, migrations, ORM mapping, API
routing, authz/authn, serialization, caching, transactions, queues, framework
configuration, and dependency wiring.

Contract tests are best for service APIs, event schemas, webhooks, third-party
integrations, backward compatibility, public libraries, SDKs, and message
formats.

End-to-end tests are best for critical revenue paths, authentication, checkout,
signup, data creation, permission-sensitive flows, cross-service journeys, and
deploy smoke tests.

Property tests are best for parsers, serializers, validators, calculators,
state machines, permissions, financial logic, search/filter logic, and
transformations.

Golden master tests are useful for legacy systems, complex output, refactoring
protection, compilers, reports, rendering, and transformations. They preserve
existing behavior, including bugs, so pair them with intentional behavior tests.

Mutation testing is useful for critical business logic, financial calculations,
security-sensitive rules, dense conditionals, and high-coverage low-confidence
areas.

Performance tests should assert thresholds tied to user or system needs.

Resilience tests should cover retries, circuit breakers, timeouts, partial
outages, queue backlogs, dead-letter behavior, external dependency failure,
recovery after restart, idempotency, and consistency after failure.

For a deeper decision catalog covering table-driven tests, domain invariants,
property tests, state machines, fuzzing, fault injection, golden files,
integration tests, contract tests, mutation testing, and CI smoke/regression
gates, read [testing-patterns.md](testing-patterns.md).

## Pattern Selection Rules

- Use table-driven unit tests when examples are clear and repeated structure
  would reduce noise.
- Use domain invariant tests when invalid state or invalid transitions would be
  harmful.
- Use property-based tests when a rule must hold across many generated inputs.
- Use state-machine tests when lifecycle transitions, terminal states, retries,
  and audit history matter.
- Use fuzz tests for untrusted, nested, binary, compressed, or user-controlled
  input boundaries.
- Use fault-injection tests when dependency failure, partial writes, retries,
  stale cache, permissions, or subprocess exits must fail safely.
- Use golden files only when output diffs are stable, meaningful, and reviewed.
- Use integration tests when mocks hide real behavior at a storage, process,
  framework, queue, cache, or API boundary.
- Use contract tests when a producer and consumer evolve independently.
- Use mutation testing for critical logic with high coverage but uncertain
  assertion strength.
- Use smoke and regression gates to protect must-never-break flows and known
  historical bugs at the right CI stage.

## Commonly Missed High-Value Areas

- Authorization: allowed and forbidden users, roles, tenants, disabled users,
  expired sessions, changed permissions, object ownership.
- Idempotency: payments, webhooks, form resubmissions, jobs, imports, emails,
  inventory reservation.
- Concurrency: simultaneous edits, payments, inventory reservations, duplicate
  workers, delete/update races.
- Time: timezones, DST, month boundaries, leap years, expiration, scheduling,
  clock skew, grace periods.
- Data shape drift: missing, null, empty, duplicated, large, old-versioned,
  partially migrated, out of order, unexpected valid/invalid data.
- Backward compatibility: old clients, old event schemas, existing rows,
  deprecated fields, optional fields, rolling deploy compatibility.
- Observability used for recovery: critical logs, metrics, audit events,
  traces, correlation IDs, alert semantics.
- Error messages when they affect users, support, API consumers, compliance,
  security, or developer experience.
- Migrations with realistic old data, nulls, bad data, partial state, and
  roll-forward safety.
- Deletion and cleanup.
- Negative space: things that must not happen.

## Test Smells

A test is suspicious when it:

- Asserts only not-null or defined
- Has many mocks and few outcomes
- Repeats implementation line by line
- Breaks on harmless refactors
- Has a vague name
- Has huge setup for a tiny assertion
- Uses sleeps
- Depends on test order
- Passes alone but fails in suite
- Fails randomly
- Snapshots hundreds of lines
- Checks CSS classes users do not depend on
- Tests private methods directly without strong reason
- Verifies mock calls but not results
- Has no clear bug it would catch
- Exists only because coverage was low
- Gets updated mechanically when it fails

## Mocking Rules

Use mocks for slow, unreliable, expensive dependencies, failure simulation,
external side effects, behavior outside the test boundary, and communication
when communication is the contract.

Avoid mocks when they replace the behavior you need confidence in, duplicate
implementation assumptions, make refactoring painful, verify calls instead of
outcomes, allow impossible states, or hide integration bugs.

Prefer fakes when the dependency has meaningful behavior. Prefer contract tests
for external dependencies. Prefer real dependencies when fast, deterministic,
and important.

## Speed Strategy

Local/pre-commit: fast unit tests, focused integration tests, changed-area
tests, smoke checks.

Pull request: unit tests, important integration tests, contract tests, critical
journey tests, static checks.

Pre-deploy: broader integration, migrations, e2e smoke, compatibility checks.

Nightly/scheduled: full regression, property tests with more iterations,
mutation tests, load tests, resilience tests, data drift checks.

Production: synthetic journeys, canaries, feature flag monitoring, error
budgets, alerts, business metric anomaly detection.

## Naming

Name tests by behavior:

```text
<action>_<expected_result>_<condition>
```

Examples:

```text
rejects_payment_when_invoice_is_cancelled
does_not_send_duplicate_email_when_job_retries
hides_admin_panel_from_non_admin_users
preserves_existing_subscription_when_coupon_is_invalid
returns_403_when_user_accesses_another_tenant_invoice
```

## Suite Review Report

```markdown
# Test Suite Audit Report: <package/directory>

## Summary
- Test files reviewed:
- Total tests estimated:
- Verdicts: Keep / Rewrite / Delete / Demote / Quarantine
- Focus areas:

## Confidence Map
### Well Protected
- ...

### Under-Tested Risks
| Risk Area | Why It Matters | Current Coverage | Gap |
|---|---|---|---|

## Waste Map
| Test File | Problem | Suggested Action |
|---|---|---|

## Flake Map
| Test File | Flake Risk | Cause | Mitigation |
|---|---|---|---|

## Speed Map
| Test File / Pattern | Estimated Cost | Suggested Cadence |
|---|---|---|

## Risk Gaps
| Missing Behavior | Why It Matters | Suggested Test Type | Boundary |
|---|---|---|---|

## Pruning Plan
### Immediate Deletions
| Test | Reason | Risk Of Deletion |
|---|---|---|

### Rewrite Candidates
| Test | Current Problem | Better Approach |
|---|---|---|

### Demotions
| Test | Reason | Target Cadence |
|---|---|---|

### Quarantines
| Test | Reason | Owner | Expiration |
|---|---|---|---|

## Next Best Tests
| Priority | Behavior To Test | Type | Boundary | Why This Now |
|---|---|---|---|---|

## Metrics To Watch
- Flake rate
- CI runtime
- Escaped bugs by area
- Tests deleted without reduced confidence
- Failures caused by real defects vs test brittleness

## Immediate Next Step
```

## Test Strategy Template

```markdown
# Test Strategy: <Feature>

## Critical Behaviors
- ...

## Main Risks
- ...

## Tests We Need
| Behavior | Risk | Test Type | Boundary | Why |
|---|---:|---|---|---|

## Tests We Do Not Need
- ...

## Production Checks
- ...

## Open Gaps
- ...
```

## Pruning Report Template

```markdown
# Test Pruning Report

## Summary
- Tests reviewed:
- Delete:
- Rewrite:
- Merge:
- Demote:
- Keep:
- Quarantine:

## Highest-Confidence Deletions
| Test | Reason | Risk Of Deletion |
|---|---|---|

## Rewrite Candidates
| Test | Current Problem | Better Test |
|---|---|---|

## Missing High-Value Tests
| Missing Behavior | Why It Matters | Suggested Test |
|---|---|---|

## Metrics To Watch
- Flake rate
- CI runtime
- Escaped bugs by area
- Tests deleted without reduced confidence
- Failures caused by real defects versus test brittleness
```

## Example Rewrites

Bad:

```js
it("calls calculateTotal", () => {
  const calculator = mockCalculator();
  const service = new OrderService(calculator);

  service.createOrder([{ sku: "abc", price: 10 }]);

  expect(calculator.calculateTotal).toHaveBeenCalled();
});
```

Better:

```js
it("creates_order_with_correct_total_and_tax", () => {
  const order = createOrder([
    { sku: "annual-plan", priceCents: 12000 }
  ]);

  expect(order.totalCents).toBe(12900);
  expect(order.taxCents).toBe(900);
  expect(order.status).toBe("pending_payment");
});
```

Bad:

```js
it("returns success", async () => {
  const response = await request(app).post("/payments").send(validPayment);
  expect(response.status).toBe(200);
});
```

Better:

```js
it("records_payment_and_marks_invoice_paid", async () => {
  const invoice = await createInvoice({ status: "open", amountCents: 5000 });

  const response = await request(app)
    .post("/payments")
    .send({ invoiceId: invoice.id, amountCents: 5000 });

  expect(response.status).toBe(200);

  const updatedInvoice = await getInvoice(invoice.id);
  expect(updatedInvoice.status).toBe("paid");

  const payment = await getPaymentForInvoice(invoice.id);
  expect(payment.amountCents).toBe(5000);
});
```

Idempotency:

```js
it("does_not_create_duplicate_charge_when_webhook_is_replayed", async () => {
  const webhook = paymentSucceededWebhook({ eventId: "evt_123" });

  await handleWebhook(webhook);
  await handleWebhook(webhook);

  const charges = await listChargesForEvent("evt_123");
  expect(charges).toHaveLength(1);

  const auditEvents = await listAuditEvents("evt_123");
  expect(auditEvents).toHaveLength(2);
});
```

## Final Standard

A test suite is healthy when developers trust failures, important regressions
are caught early, refactors do not cause unnecessary rewrites, CI is fast enough
to matter, flakes are rare and treated seriously, coverage highlights risk
instead of becoming the goal, tests reflect actual system use, escaped bugs lead
to better tests, and low-value tests are deleted without guilt.
