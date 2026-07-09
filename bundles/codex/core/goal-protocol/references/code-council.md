# Code Council Mode

Use this reference for `goal-protocol blueprint` and implementation correctness
reviews.

## Purpose

Code-council mode converts an approved goal into an implementation blueprint
before production code is written. The root artifact is `CODE_DOSSIER.md`, and
every meaningful code decision traces back to goal, feature, behavior,
structure, interface, test, location, and invariant IDs.

## Flow

1. Goal intake: user-visible outcome, technical outcome, scope, non-scope,
   constraints, unknowns, risk, and success definition.
2. Feature contract: features, non-features, behaviors, edge cases, error
   states, permissions, performance/reliability concerns, and assumptions.
3. Codebase reconnaissance: patterns, relevant modules, existing conventions,
   test commands, reusable code, files likely involved, files not to touch.
4. Behavior matrix: trigger, inputs, preconditions, main path, alternate paths,
   failure paths, outputs, state changes, events, and acceptance criteria.
5. Structures: types, schemas, tables, DTOs, state machines, error types, and
   invariants.
6. Interfaces: signatures, services, endpoints, component props, events,
   commands, side effects, and error contracts.
7. Test matrix: unit, integration, e2e, contract, property, migration, manual
   checks, and commands.
8. Location map: exact files, allowed changes, forbidden changes, and optional
   TODO anchors.
9. Spike and revert when architecture is uncertain.
10. Invariants: data integrity, security, authz, validation, concurrency,
    idempotency, compatibility, migration safety, and scope boundaries.
11. Final implementation and verification.

## Red Team Gates

- Contract red team: attack feature scope.
- Blueprint red team: attack structures, interfaces, tests, locations, and
  invariants before implementation.
- Diff red team: attack the actual code diff against the approved dossier.

## Traceability Matrix

Maintain a matrix like:

```md
| Feature | Behavior | Structure | Interface | Test | Location | Status |
|---|---|---|---|---|---|---|
| F001 | B001 | S001 | I001 | T001 | L001 | Approved |
```

If implementation discovers new scope, update `CODE_DOSSIER.md` and
`GOAL_LEDGER.md` first.
