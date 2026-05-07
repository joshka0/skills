# Small, Composable, Testable Code Guide

## Purpose

Create, modify, and refactor code so it stays small, coherent, testable,
composable, and easy to change. This skill prevents AI-generated sprawl:
unnecessary files, excessive abstractions, giant components, duplicated logic,
hidden state, framework-heavy solutions, and "just in case" code.

The goal is the least total complexity that clearly solves the real problem.

## Core Philosophy

Small code is code with fewer things to understand.

Good code is:

- Simple to read
- Small in scope
- Explicit in behavior
- Narrow in responsibility
- Easy to test
- Easy to delete
- Easy to compose
- Hard to misuse

Avoid code that is broad, clever, speculative, framework-heavy, stateful by
default, mock-dependent, over-abstracted, spread across too many files, coupled
to unrelated concerns, or difficult to reason about locally.

## Definition Of Small

Code is small when a developer can answer quickly:

- What does this do?
- Why does it exist?
- What inputs does it accept?
- What outputs or side effects does it produce?
- What can go wrong?
- Where would I test it?
- Where would I change it?
- What depends on it?
- Can I delete it?

Smallness is measured by cognitive load, not raw line count.

## Complexity Budget

Every addition has a cost:

- New file: navigation cost
- New function: naming and API cost
- New class: lifecycle and state cost
- New abstraction: indirection cost
- New dependency: operational and security cost
- New configuration: understanding cost
- New branch: testing cost
- New public API: compatibility cost
- New helper: discovery cost
- New generic: misuse cost

Pay for new behavior by deleting old complexity when possible.

## Small Code Equation

```text
Implementation Quality =
  Behavior delivered
  × Clarity
  × Testability
  × Composability
  × Locality
  ÷ Total concepts introduced
  ÷ Coupling
  ÷ Hidden state
  ÷ Future maintenance cost
```

Shorter code that increases hidden coupling is worse. Slightly longer code
that makes behavior obvious can be better.

## Sprawl Detector

Code is sprawling when:

- One feature touches many unrelated files.
- A small behavior requires understanding many layers.
- Logic is spread across controllers, services, helpers, hooks, and adapters.
- New abstractions exist before repeated needs.
- Generic names hide domain behavior.
- Tiny files cannot be understood independently.
- Large files have multiple unrelated responsibilities.
- Adding one rule requires editing many places.
- Tests require extensive mocking.
- Most code exists only to call other code.
- The implementation has more architecture than behavior.
- The code anticipates future needs that do not exist.

When sprawl appears, reduce surface area before adding more.

## Abstraction Guidance

Duplication is cheaper than the wrong abstraction.

Keep duplication when:

- The repeated code is small.
- The meanings are different.
- The code may evolve differently.
- The abstraction would need vague names.
- The abstraction would add indirection without reducing risk.

Remove duplication when:

- The repeated logic represents the same rule.
- A bug fix must happen in multiple places.
- Duplication creates inconsistent behavior.
- A domain concept is trying to emerge.
- Tests must be repeated to protect the same invariant.

Useful test: would changing this rule require updating multiple places in
exactly the same way? If yes, abstraction may be justified.

## Function Rules

A good function should:

- Have a name that says what it does.
- Take explicit inputs.
- Return explicit outputs.
- Avoid surprising side effects.
- Have one primary reason to change.
- Keep domain logic visible.
- Make invalid inputs hard or impossible.
- Be testable without complex setup.
- Fail clearly when it cannot proceed.

Avoid functions that do unrelated things in sequence, depend on hidden globals,
mutate arguments unexpectedly, read environment implicitly, have many boolean
flags, return different shapes, swallow errors, know too much about callers, or
require mocks for everything.

## Module Rules

A good module answers:

- What concept does this module own?
- What does it expose?
- What does it hide?
- What can change inside without affecting callers?
- What tests prove its contract?

Prefer domain names like `invoicePricing.ts`, `subscriptionEligibility.ts`,
`paymentRetryPolicy.ts`, or `userPermissions.ts` over broad buckets like
`helpers.ts`, `utils.ts`, `common.ts`, `misc.ts`, `manager.ts`, or
`processor.ts`.

## Public API Rule

Public APIs are expensive. Before exporting, ask:

- Does another module truly need this?
- Can it stay private?
- Can callers use a narrower function?
- Can the name describe a domain action?
- Can the return type be simpler?
- Can invalid usage be prevented?

Prefer a small public API with strong behavior over a broad API with many
options.

## Side-Effect Rule

Keep side effects at the edge.

Separate core logic from side effects:

- Core logic: calculation, validation, transformation, decision-making, state
  transition.
- Side effects: database, network, file system, clock, random numbers, logging,
  metrics, email, queues, UI rendering.

Preferred shape:

```text
Input -> pure decision -> side-effect adapter -> observable result
```

Avoid mixing reads, business rules, network calls, mutation, logs, and partial
returns in one function.

## State Rule

State is where bugs hide. Minimize state and make it explicit.

Prefer a small immutable value passed into a function over a mutable object
shared across services. Prefer `return nextState(currentState, event)` over
methods that mutate private fields and trigger side effects.

## Configuration Rule

Configuration should simplify behavior, not create a second programming
language.

A config option is justified when multiple real environments need different
values, product behavior genuinely varies, the option can be documented clearly,
the default is safe, and tests cover important variants.

Avoid config that replaces simple code with magic, requires callers to
understand internals, creates many untested combinations, or exists because the
implementation is indecisive.

## Error Handling Rule

Prefer specific errors, structured error codes where useful, clear failure
boundaries, no swallowed exceptions, no ambiguous nulls, and no impossible
states.

Avoid catch-everything-and-continue, generic errors everywhere, user/internal
error confusion, and failures visible only in logs.

## Naming Rule

Names are architecture. Use names that expose domain meaning.

Prefer:

- `calculateInvoiceTotal`
- `isSubscriptionExpired`
- `canUserAccessProject`
- `markInvoicePaid`
- `dedupeWebhookEvent`

Avoid broad names like `process`, `handle`, `execute`, `run`, `doThing`,
`manager`, `helper`, `data`, `result`, and `temp` except in very small local
scopes.

If a name is hard to choose, the responsibility may be unclear.

## Testability Rules

A code change is testable when:

- Core behavior can be tested without real I/O.
- Dependencies are passed explicitly or isolated.
- Time and randomness can be controlled.
- External systems are behind narrow adapters.
- Public behavior is observable.
- Tests do not inspect private implementation.
- Tests do not require massive setup.

If testing requires many mocks, the code may be too coupled. If testing
requires private access, the public seam may be wrong.

## Composability Rules

Composable code has pieces that combine without knowing each other's internals.

Prefer small functions that transform data, small adapters that perform one side
effect, modules with explicit contracts, objects that receive dependencies
instead of finding them globally, and pipelines where each step has clear input
and output.

Avoid cycles, classes that construct all their own dependencies, functions that
both decide and perform every side effect, and services that know about UI,
database, network, and policy.

## Pure Core / Imperative Shell

Use this pattern often:

- Pure core: domain decisions, validation, calculation, transformation, state
  transition.
- Imperative shell: HTTP, database, UI events, logging, queues, metrics,
  external APIs.

Example flow:

```text
Controller receives request
Controller maps request to domain input
Pure function decides outcome
Controller persists or publishes outcome
Controller returns response
```

## Refactoring Triggers

Refactor when you see repeated business rules, functions with multiple
responsibilities, logic hidden in UI or framework glue, too many mocks needed
for a simple test, unclear names, long parameter lists, boolean flags
controlling multiple paths, side effects mixed with decisions, hard-to-delete
modules, helpers used for unrelated meanings, changes requiring edits in many
places, bugs caused by duplicated rules, dead code, confusing public APIs, or
files where nobody knows where to add behavior.

Refactor only enough to remove friction relevant to the current task.

## Refactoring Non-Triggers

Do not refactor merely because code is not your preferred style, a function
exceeds an arbitrary line count, a class exists or does not exist, a pattern
could be applied, a new framework would be nicer, future needs are imaginable,
the code is old but stable, the code is boring, or the agent has extra time.

Refactoring should reduce real friction.

## Opportunistic Refactoring Protocol

1. Identify behavior that must remain unchanged.
2. Add or confirm tests for that behavior when practical.
3. Make one small structural improvement.
4. Verify behavior.
5. Repeat only while each step clearly improves the touched area.
6. Stop before the refactor expands beyond the task boundary.

If the refactor cannot be explained in one sentence, it is probably too large
for opportunistic cleanup.

## Prompt Patterns

### Minimal Implementation

```text
Implement the requested behavior with the smallest coherent change.

Constraints:
- Preserve existing public behavior unless required by the request.
- Prefer editing existing files over adding new files.
- Do not add dependencies unless clearly necessary.
- Do not introduce new architectural patterns.
- Keep domain logic testable without real I/O.
- Reuse existing project conventions.
- Delete obsolete code created by the change.
- Add or update focused behavior tests.
- Summarize why this is the minimal maintainable shape.
```

### Sprawl Reduction

```text
Review this code for unnecessary sprawl.

Find unnecessary files, unnecessary abstractions, duplicated rules, vague
helpers, hidden side effects, excessive mocking seams, speculative
configurability, and smaller-public-API opportunities.

Propose the smallest refactor that reduces total complexity without changing
behavior. Prioritize deletions and local simplifications over new architecture.
```

### Refactor Safely

```text
Refactor this code to improve clarity, testability, and composability without
changing observable behavior.

Identify preserved behavior, improve the smallest useful seam, prefer pure
helpers for domain logic, keep side effects at the edge, avoid dependencies and
broad rewrites, verify focused behavior, and summarize what became simpler.
```

### Testability

```text
Make this code easier to test without changing behavior.

Prioritize pure functions, explicit inputs and outputs, injected
clock/randomness/I/O boundaries, smaller public contracts, fewer hidden globals,
and fewer mocks required for core behavior.

Do not add test-only complexity to production code or expose private internals
just for tests.
```

### Anti-Overengineering

```text
Solve this directly.

Do not add factories, registries, plugin systems, base classes, generic
frameworks, speculative config, new dependencies, or repo-wide rewrites unless
the current requirement cannot be solved clearly without them.

Prefer boring, explicit, maintainable code.
```

## Code Review Checklist

Behavior:

- Does the code solve the requested behavior?
- Did it add unrelated behavior?
- Are edge cases handled where relevant?
- Are errors explicit?

Size:

- Is this the smallest coherent change?
- Are there unnecessary files, classes, helpers, or layers?
- Could anything be deleted?
- Could anything stay private?

Clarity:

- Are names domain-specific?
- Can a new developer understand the flow?
- Is logic visible where it matters?
- Is cleverness avoided?

Testability:

- Can core behavior be tested without real I/O?
- Are side effects isolated?
- Are dependencies explicit?
- Are tests focused on behavior?

Composability:

- Are inputs and outputs clear?
- Can parts be reused without dragging unrelated state?
- Does this avoid inheritance or globals unless justified?
- Are contracts narrow?

Maintenance:

- Does this improve or preserve code health?
- Will future changes be easier?
- Does this reduce duplication or avoid harmful abstraction?
- Is the diff reviewable?

Verdicts: Accept, Simplify, Delete, Refactor locally, Split behavior from side
effects, Reduce public API, or Reject as overengineered.

## Common AI Coding Failure Modes

The agent adds a framework: delete the framework, implement direct behavior, and
keep only the seam required for testing.

The agent creates too many files: merge files until each file owns a real
concept; do not split for visual neatness.

The agent adds vague helpers: rename by domain behavior or inline the helper.

The agent overuses classes: use a function unless lifecycle, polymorphism, or
state is truly needed.

The agent makes everything generic: make the concrete use case clear first and
generalize only after real repeated pressure.

The agent mixes logic and I/O: extract pure decisions and keep I/O in a thin
wrapper.

The agent keeps adding instead of replacing: delete or replace obsolete code.

The agent makes a big refactor for a small bug: patch the bug at the smallest
safe seam and keep optional cleanup local.

## Good Patterns

Pure decision function:

```ts
type Invoice = {
  status: "draft" | "open" | "paid" | "cancelled";
  amountCents: number;
};

function canPayInvoice(invoice: Invoice): boolean {
  return invoice.status === "open" && invoice.amountCents > 0;
}
```

Thin side-effect wrapper:

```ts
async function payInvoice(invoiceId: string, payment: PaymentInput) {
  const invoice = await invoiceRepository.get(invoiceId);

  if (!canPayInvoice(invoice)) {
    return { ok: false, reason: "invoice_not_payable" };
  }

  const charge = await paymentGateway.charge(payment);
  await invoiceRepository.markPaid(invoiceId, charge.id);

  return { ok: true, chargeId: charge.id };
}
```

Small composition:

```ts
function priceCheckout(input: CheckoutInput): CheckoutPrice {
  const subtotal = calculateSubtotal(input.items);
  const discount = calculateDiscount(subtotal, input.coupon);
  const tax = calculateTax(subtotal - discount, input.region);

  return {
    subtotal,
    discount,
    tax,
    total: subtotal - discount + tax,
  };
}
```

## Bad Patterns

Overengineered for one use:

```ts
interface Rule<T> {
  appliesTo(input: T): boolean;
  execute(input: T): T;
}

class RuleEngine<T> {
  constructor(private rules: Rule<T>[]) {}

  run(input: T): T {
    return this.rules.reduce(
      (current, rule) => rule.appliesTo(current) ? rule.execute(current) : current,
      input,
    );
  }
}
```

If the actual task is "apply a 10% discount when coupon is WELCOME10", start
concrete:

```ts
function applyCoupon(totalCents: number, coupon?: string): number {
  if (coupon === "WELCOME10") {
    return Math.round(totalCents * 0.9);
  }

  return totalCents;
}
```

Hidden side effects:

```ts
function calculateTotal(order: Order): number {
  logger.info("calculating total");
  analytics.track("total_calculated");
  database.save(order);
  return order.items.reduce((sum, item) => sum + item.price, 0);
}
```

Calculations should calculate. Let callers decide which side effects are needed.

## Deletion Rules

Delete code when it is unused, duplicates a source of truth, exists for
hypothetical future use, wraps another function without meaning, exposes public
API nobody needs, keeps obsolete behavior alive, makes testing harder, adds
unused configuration, preserves an old path after migration, or was generated by
an agent but is not required.

## File Splitting Rules

Split a file when it contains multiple concepts that change for different
reasons, a pure domain rule is trapped in framework glue, tests become simpler
with extraction, a named concept has emerged, or the split reduces what a reader
must hold in their head.

Do not split when the split creates fragments with no independent meaning, the
reader must jump across files to understand one behavior, the new name is vague,
the split satisfies only a line-count target, or the pieces always change
together.

## Merge Rules

Merge code when files are always edited together, abstractions add no meaning, a
wrapper only forwards calls, a helper hides simple behavior, the boundary makes
tests harder, the split was for hypothetical reuse, or understanding requires
constant navigation.

## UI Rules

Prefer small presentational components, pure state derivation, explicit props,
accessible behavior, domain-specific event handlers, and thin data-loading
boundaries.

Avoid components that fetch, transform, validate, authorize, render, and mutate;
deep prop drilling caused by poor boundaries; duplicated state; huge snapshots
instead of behavior tests; and generic component frameworks for one screen.

Split UI by behavior and state ownership, not arbitrary line count.

## Backend Rules

Prefer thin routes/controllers, explicit request validation, pure domain
services, small repository boundaries, structured errors, idempotent handlers
where needed, and visible transaction boundaries.

Avoid business logic inside controllers, database models that know too much,
services that call everything, hidden transaction behavior, broad interfaces for
narrow operations, and background jobs with buried domain decisions.

The controller coordinates. Domain code decides.

## Data Pipeline Rules

Prefer:

```text
Parse -> Validate -> Normalize -> Transform -> Persist or return
```

Keep each step visible. Avoid pipelines where every step mutates a shared object
invisibly. Prefer functions that accept a value and return a new value.

## Review Report Template

```markdown
# Small Code Review Report

## Summary

- Overall verdict:
- Biggest simplification opportunity:
- Highest-risk complexity:
- Recommended next change:

## Keep

| Code | Why |
|---|---|
|  |  |

## Simplify

| Code | Current Problem | Smaller Shape |
|---|---|---|
|  |  |  |

## Delete

| Code | Why It Can Go |
|---|---|
|  |

## Split

| Code | Reason |
|---|---|
|  |

## Merge

| Code | Reason |
|---|---|
|  |

## Testability Improvements

| Area | Current Friction | Better Seam |
|---|---|---|
|  |  |  |

## Dependency / Abstraction Concerns

| Item | Concern | Recommendation |
|---|---|---|
|  |  |  |

## Final Recommendation

The smallest coherent next step is:
```

## Final Standard

Code is healthy when behavior is clear, the diff is reviewable, public API is
small, names carry meaning, core logic is testable without infrastructure, side
effects are visible and isolated, dependencies are few and justified,
abstractions are earned, duplication is intentional, dead code is removed,
future changes are easier, and an AI agent can safely modify it without needing
the entire codebase in context.

Small code is the code with the fewest unnecessary ideas.
