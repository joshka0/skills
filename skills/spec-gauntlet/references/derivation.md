# Stage 2 — Decorrelated derivation (parallel)

Two roles, different model families, spawned fresh in parallel. Neither
brief references the other's report, worktree, or existence.

## The shared contract (decide per run)

Both roles see: `spec.md` (hardened), `glossary.md`, and the public boundary
signatures (`contract.*`). Implementer only: everything below the boundary.
Never default to "give them the whole types file" — internal types
re-correlate blind spots. State the shared-contract file list explicitly in
each brief.

## Worktrees

- `gauntlet/impl/<task>`: ordinary worktree branched from main. Its
  isolation is work-in-flight, not information — the implementer
  legitimately sees the repo.
- `gauntlet/property/<task>`: **orphan-branch worktree** — the property
  author's entire world, constructed by the orchestrator:

```bash
git worktree add ../<repo>-gauntlet-property-<task> --orphan gauntlet/property/<task>
# (verify --orphan support with `git worktree add -h`; older git:
#  worktree add --detach, then checkout --orphan)
# copy in ONLY: spec.md, glossary.md, contract.*, property-harness scaffolding
git add -A && git commit -m "constructed world: <task> property derivation"
```

The initial commit is the isolation assertion — a hash-addressed record of
the agent's entire universe.

## Implementer brief template (family A, impl worktree)

- Sole sources of intent: `spec.md` and `glossary.md`. Where the spec is
  silent, do NOT guess silently: implement your best reading, list it in
  your report under "Interpretive choices" (numbered, citing the silent
  R/I), AND append an `observation` entry to the spec ledger per its schema.
- Implement against the shared contract signatures; local gates (types,
  existing tests) must pass — read exit codes directly.
- Prohibited: reading or writing anything in `.reports/` other than your own
  report; modifying `spec.md`, `glossary.md`, or `contract.*`; writing
  invariant property tests (examples/doctests for intent are fine —
  invariant properties are another agent's decorrelated job).
- Report to `.reports/implementer-<date>.md`: what you built, deviations,
  interpretive choices, files touched. End with exactly one line:
  `VERDICT: IMPLEMENTATION COMPLETE` or `VERDICT: BLOCKED (<reason>)`.

## Property author brief template (family B, orphan worktree)

- Your staging directory is your entire world. If you find any
  implementation source in it — STOP, report it, do not read it.
- Derive executable properties from the invariants I1..In and from
  requirements with universal claims ("always", "never", "every"): at least
  one property per invariant; pointwise examples only where a property is
  genuinely impossible. Each property cites its R/I in a comment.
- Properties must typecheck against the contract signatures and run against
  ANY implementation of that contract — accept the implementation as a
  parameter/layer; you have none to run against, by design.
- Where the spec is too ambiguous to state a property, do not guess: list it
  under "Unpropertyable" with the ambiguity named precisely.
- Prohibited: access to the repo, the implementation, other reports, or the
  network (the spawner enforces this via sandbox/allowed tools; the brief
  declares it); modifying `spec.md`, `glossary.md`, or `contract.*`.
- Report to `properties-report.md` in the staging dir: property inventory
  (property → cited R/I), Unpropertyable list, and the output of `ls -R` at
  completion (isolation assertion). End with exactly one line:
  `VERDICT: PROPERTIES COMPLETE` or `VERDICT: BLOCKED (<reason>)`.
