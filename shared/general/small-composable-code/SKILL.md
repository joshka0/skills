---
name: small-composable-code
description: "Create, modify, review, and refactor code so it stays small, coherent, testable, composable, and easy to change. Use when writing code, simplifying implementations, reducing AI-generated sprawl, improving maintainability, deciding whether an abstraction/dependency/file split is justified, or keeping a change to the smallest coherent shape."
---

# Small Composable Code

Use this skill to deliver the least total complexity that clearly solves the
real problem. Small code is not the fewest lines; it is the fewest unnecessary
ideas.

For the extended philosophy, review templates, prompt patterns, examples, and
specific UI/backend/data rules, read
[references/guide.md](references/guide.md) when the task is a review,
larger refactor, or architecture decision.

## Prime Directive

Optimize for:

1. Coherent behavior
2. Local reasoning
3. Small public surface area
4. Clear domain names
5. Minimal dependencies
6. Testable behavior
7. Composable units
8. Behavior-preserving refactors
9. Low future maintenance cost

Do not optimize primarily for fewest lines, most abstractions, maximum DRYness,
maximum configurability, design-pattern coverage, or speculative extensibility.

## Default Strategy

For every coding task:

1. Understand the smallest behavior change required.
2. Find existing patterns before inventing new ones.
3. Reuse existing boundaries where they are good.
4. Improve bad local boundaries only when they block the task.
5. Make the smallest coherent change.
6. Prefer pure logic plus thin side-effect wrappers.
7. Add or update behavior-focused tests.
8. Delete unused or obsolete code.
9. Run the narrowest meaningful verification.
10. Stop when the behavior is solved and the code is simpler or no worse.

## Less-Is-More Filter

Before adding code, ask:

- Can I delete something instead?
- Can I reuse an existing function?
- Can I make this a pure function?
- Can I solve this with data instead of branching?
- Can I narrow the API?
- Can I avoid a new file?
- Can I avoid a new dependency?
- Can I avoid a new abstraction?
- Can I make behavior obvious from names?
- Can I test this without heavy mocking?

If any answer is yes, simplify before expanding.

## AI Agent Rules

- Solve the actual request, not an imagined platform.
- Prefer a small reviewable diff over a grand rewrite.
- Preserve public behavior unless the request requires changing it.
- Refactor opportunistically in touched areas only.
- Do not add dependencies by default.
- Use the existing project shape, naming, testing, and error patterns.
- Keep side effects at the edge and domain logic testable.
- Delete obsolete paths created by the change.

## What To Prefer

- Pure functions for domain logic.
- Thin adapters for I/O.
- Small modules with one reason to change.
- Composition over inheritance.
- Explicit data flow over hidden mutation.
- Plain data over unnecessary objects.
- Clear branches over clever abstractions.
- Domain names over generic names.
- Narrow interfaces over broad service objects.
- Simple duplication over premature abstraction.
- Good abstraction over harmful duplication.

## What To Avoid

- God components or services.
- Vague `utils`, `helpers`, `manager`, `processor` buckets.
- Boolean parameter explosions.
- Deep inheritance chains.
- Premature generics.
- Framework logic mixed with business rules.
- Business rules mixed with presentation.
- Hidden global state, hidden time, or hidden I/O.
- New libraries for small stable operations.
- Files created only to make code look organized.

## Abstraction Rule

Create an abstraction only when it reduces total complexity:

- Multiple real callers have the same need.
- Repeated logic represents the same domain rule.
- The abstraction names a real domain concept.
- It creates a useful test seam.
- It isolates volatile external behavior.
- It reduces branching or invalid states.
- It lets callers ignore irrelevant details.

Do not abstract for hypothetical future use.

## Simplicity Gate

Before finalizing a change, check:

- Behavior: solves exactly the requested behavior, with no unrelated behavior.
- Shape: localized change, clear domain names, no unnecessary files/classes/deps.
- Testability: core logic testable without infrastructure, side effects isolated.
- Composability: explicit inputs/outputs, narrow public API.
- Maintenance: understandable to a new developer, obsolete code removed.

If any answer is weak, revise before presenting.

## Output Style

When reviewing or planning code, use:

```markdown
## Minimal Shape
What the smallest coherent solution should be.

## Sprawl Risks
What could become unnecessarily large or coupled.

## Recommended Change
The focused implementation or refactor.

## What To Delete Or Avoid
Unneeded files, abstractions, dependencies, or branches.

## Testability
How the design can be tested through behavior.

## Verification
What focused tests or checks should run.
```

When reviewing a specific implementation, use:

```markdown
Verdict: Keep / Simplify / Refactor / Delete / Split / Merge

Why:
- ...

Smallest better version:
...
```
