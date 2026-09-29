---
name: test-value
description: "Value bar for tests: gate new tests, spot junk tests, decide what to keep or delete. Use when writing, reviewing, or pruning tests."
---

# Test value

Keep a test only if its cost buys protection: of a behavior, of a plausible bug
that would otherwise ship, or of a contract that stands on its own. Default to E2E through the real system. Add an isolated
test only when E2E cannot reach the behavior, and only from a failure list
written before the code.

## Authoring gate

Answer all four before you add a test. If you cannot answer one, hold the test.

1. Which observable behavior, invariant, or contract does it protect?
2. Which plausible bug turns it red?
3. Why would the tests you already have let that bug through? Each contract has one
   primary owner test, at the E2E boundary when E2E can reach it. Add another
   layer only for a distinct risk the owner cannot reach. Extend a table-driven
   case or shared fixture before you add a near-duplicate.
4. Does it force a hook into production code (an extra export, a flag, a
   wrapper, an injection point) that only tests use? Then move the test to the
   real boundary.

Then compare it with the [junk patterns](#junk-patterns). A match blocks it,
unless the [retention bar](#retention-bar) shows a contract that only it guards. A test that
breaks under a behavior-preserving refactor asserts implementation. Rewrite it
at the owning boundary.

Run a regression test against the unfixed code first and watch it go red for
the right reason. One that was never red only shows the mock works. Write one regression at the owning boundary. Never replay it at
every layer it crosses.

## Junk patterns

- Assertions that only check `not null` or `toBeDefined`, or no assertions.
- Self-comparison or identity copying.
- Hand-copied lists (fixtures, manifests, export inventories) checked against
  themselves.
- Greps for exact source text, imports, or strings.
- Private-method or call-shape tests that real-boundary tests already cover.
- Verifying a mock call but not the result, unless the call is the contract.
- A mock that itself does what the test asserts, or one mock reused for
  unrelated APIs. Many mocks, few real outcomes.
- Expected values produced by the code under test.
- Fixtures that hand the code the receipts, admission, or callback order it
  should create itself, or checks on a store the code path never writes to.
- Line-by-line mirrors of the implementation.
- Duplicate invocations of one contract, or local replays of a shared helper.
- Tests whose only job is to keep a test-only export, global, or wrapper in use.
- Production code that nothing calls except tests.
- Feature checks that read back a declared flag instead of using the feature
  the flag advertises.
- Rejection tests that pass because some other guard refused, not the one
  under test.
- Names or inputs that promise more than the test exercises. Vague names.
- Huge setup for a tiny assertion. Large snapshots. Sleeps.
- Tests of trivial getters, framework behavior, or language behavior.
- An isolated test for behavior an E2E test covers or could cover.
- Tests that exist only for coverage.

## Retention bar

Keep a test that is the only guard of a public API, protocol, config,
migration, storage, security, platform, default, or release contract. Also keep:

- ordering checks, when users can see the order;
- regression tests for a bug that could plausibly come back;
- a source-text check, when nothing cheaper guards the contract: it must break
  when the user-facing key, byte, or path changes, and survive a rename.

If a kept test is red on the untouched code, suspect the product first.
Reproduce the failure, and never delete the test to get green. Being slow or
static is no reason to delete a test: demote
a slow test to a slower cadence. Quarantine a flaky but valuable test with an
owner and an expiry date.

## Deletion evidence

Record every field before you remove a test. A missing field means keep it.

- Where the test lives, and its name.
- Which bug it could catch.
- Non-test callers of the seam it covers.
- The stronger proof that remains, or why none is needed.
- Why the test exists (history).
- What deletion it unlocks: test-only seams and dead paths.
- Risk, and the focused command that validates the removal.

## Edit shape

Remove test-only seams and dead production paths. Never keep aliases for them.
Prefer net-negative production code. Never pad deletion counts with uncertain
candidates.
