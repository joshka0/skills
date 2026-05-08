---
name: code-quality
description: Create, modify, review, refactor, and test code through small composable design and behavior-focused tests. Covers regression test creation, ruthless test strategy, shoehorn migration, TDD, sprawl review, and interface design. Use when writing code, reviewing sprawl, refactoring, applying TDD, designing testable interfaces, creating regression tests, evaluating test strategy, migrating `as` assertions, or deciding whether an abstraction, dependency, file split, or mock is justified.
---

# Code Quality

Use this skill as the default foundation for code-writing, refactoring, and test-design work.

## Modes

- `implement-small` — make the smallest coherent behavior change.
- `review-sprawl` — identify unnecessary files, abstractions, dependencies, coupling, or generated complexity.
- `refactor` — simplify touched code while preserving behavior.
- `tdd` — use red-green-refactor with one behavior test at a time.
- `test-strategy` — choose behavior-focused tests, boundaries, and mocks.
- `regression` — create a deterministic regression test for a fixed bug or difficult issue. Read `references/regression-tests.md`.
- `migrate-shoehorn` — migrate test files from `as` type assertions to @total-typescript/shoehorn. Read `references/migrate-to-shoehorn.md`.

## First

Identify the active mode and read only the relevant reference:

- `references/small-composable-code.md` for the full small-code philosophy, sprawl detector, and review templates.
- `references/tests.md` for behavior-focused test examples.
- `references/mocking.md` for boundary-only mocking guidance.
- `references/interface-design.md` for testable public interfaces.
- `references/deep-modules.md` for small interfaces over deep implementation.
- `references/refactoring.md` for post-green cleanup candidates.
- `references/regression-tests.md` for deterministic regression test creation workflow.
- `references/ruthless-test-strategy.md` for test evaluation, pruning, and suite strategy.
- `references/migrate-to-shoehorn.md` for shoehorn migration patterns and workflow.

## Hard Rules

- Solve the actual requested behavior, not an imagined platform.
- Prefer a small reviewable diff over a grand rewrite.
- Do not local-refactor unrelated code.
- Preserve public behavior unless the task explicitly changes it.
- Use existing project shape, names, tests, and error patterns before inventing new ones.
- Keep side effects at the edge and domain logic testable.
- Add dependencies, files, abstractions, and mocks only when they reduce total complexity.
- Test through public behavior, not private implementation.
- Mock system boundaries only; do not mock internal collaborators by default.

## TDD Mode

When the user asks for TDD, red-green-refactor, or test-first work:

1. Name the next observable behavior.
2. Write one failing behavior-focused test through a public interface.
3. Implement only enough code to pass that test.
4. Repeat one behavior at a time.
5. Refactor only after tests are green.

For non-trivial public interface changes, confirm the behavior and test boundary with the user. For small bug fixes, proceed with the smallest behavior-focused test and state assumptions.

## Simplicity Gate

Before finalizing, verify:

- **Behavior**: solves exactly the requested behavior.
- **Shape**: localized diff, clear domain names, no unnecessary files/classes/dependencies.
- **Testability**: core logic can be tested without infrastructure; side effects are isolated.
- **Composability**: explicit inputs/outputs and narrow public APIs.
- **Maintenance**: understandable to a new developer; obsolete code removed.

## Output

When reviewing or planning code, report:

- **Minimal shape**: the smallest coherent solution.
- **Sprawl risks**: what could become unnecessarily large or coupled.
- **Recommended change**: focused implementation or refactor.
- **What to delete or avoid**: unnecessary files, abstractions, dependencies, or branches.
- **Verification**: focused tests or checks to run.
