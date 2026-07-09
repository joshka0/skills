---
name: elixir-lang-testing
description: >-
  Test Elixir and OTP systems. Use when working with ExUnit, async tests,
  start_supervised!, supervised process cleanup, Mox, behaviours, StreamData,
  property testing, doctests, contract tests, or Phoenix/OpenApiSpex boundaries.
---

# Elixir Testing

Use this skill when tests touch OTP state, process lifecycle, external
boundaries, or behavioural contracts.

## Workflow

1. Use plain ExUnit tests for pure modules and example-based regressions.
2. Use `async: true` only when the test does not touch global/shared state,
   named processes, shared ETS tables, app env mutation, or external resources.
3. Start OTP processes with `start_supervised!` or `start_supervised` so ExUnit
   owns cleanup.
4. Test GenServer behavior through its public API; keep callback unit tests
   narrow and deliberate.
5. Define behaviours at boundaries you own, then use Mox, fakes, or injected
   adapters instead of monkeypatching concrete modules.
6. Use StreamData properties for laws, round trips, parsers, serializers,
   idempotence, ordering, and broad input spaces.
7. Use doctests for stable documentation examples that should compile and run.
8. Use contract tests at service boundaries; pair schema validation such as
   OpenApiSpex with consumer-driven contracts when teams deploy independently.

## Hard Rules

- Do not mark tests async when they share named processes or global state.
- Do not leave supervised processes running beyond a test.
- Do not mock arbitrary internals; mock behaviours and contracts.
- Do not assert only on callback implementation details when public behavior is
  what matters.
- Do not use property tests with vague properties that fail without useful
  diagnostics.
- Do not replace provider compatibility tests with unit mocks alone.

## Pattern Choices

- **ExUnit example test**: focused behavior and regression cases.
- **start_supervised!**: OTP lifecycle under test control.
- **Mox**: concurrency-safe behaviour-backed mocks.
- **Fake adapter**: domain-shaped deterministic dependency.
- **StreamData**: generated cases for invariants and laws.
- **Doctest**: executable documentation examples.
- **Contract test**: provider/consumer boundary compatibility.

## Review Checks

- Does each test own and clean up its processes?
- Is async mode safe for this test's state and dependencies?
- Are boundary contracts explicit as behaviours or schemas?
- Would the test survive internal callback refactoring?
- Do properties have names and generators that explain failures?
