---
name: spec-gauntlet
description: "Verify spec-critical work by decorrelation: pre-code spec adversary, cross-family derivation of implementation and properties, ledger-writing reconciliation, execution-armed artifact adversary. Use when the user says gauntlet or decorrelated verification, or an invariant-critical change needs high assurance."
---

# Spec Gauntlet

Verify a change by decorrelating the minds that could share blind spots:
attack the spec before code exists, derive implementation and properties
independently from the hardened spec, treat their disagreement as signal,
then attack the merged artifact with execution access.

**v0 — pending calibration.** Sections marked ⚖ encode theory, not yet
empirical shape; tighten them from ledger data after real runs.

## Do not use when

- No real invariant exists (UI copy, one-off scripts, glue) — the gauntlet is
  overhead below genuine correctness stakes; use ordinary implementation and
  review.
- No spec exists yet → run a grill first (assets/grill-kickoff.md is the
  template) and emit `spec.md` + `glossary.md`; those files are this skill's
  input contract.
- A decision (not an implementation) needs independent passes → that is
  `agent-orchestration` collaborate mode.
- A multi-stream campaign with its own verdict machinery → `crew` conducts;
  a gauntlet can be one workstream inside it.

## Input contract

- `spec.md`: numbered requirements R1..Rn and invariants I1..In, each one
  testable sentence; parked decisions listed explicitly.
- `glossary.md`: every domain noun and state term, one precise definition.
- The shared contract: public boundary signatures (`contract.*`). The grill
  does not produce this — the orchestrator authors it after the spec hardens
  and before derivation, and lists it explicitly in both derivation briefs.
- `~/.config/spec-ledger/spec-ledger-digest.md` if present feeds the spec
  adversary (and ideally fed the grill). If the ledger is missing, create it
  from assets/spec-ledger.md before step 1.

## Route

Stages run in order; read only the stage you are dispatching.

| Mode | Select when | Read |
| --- | --- | --- |
| `spec-adversary` | Spec and glossary exist; code does not | [references/spec-adversary.md](references/spec-adversary.md) |
| `derivation` | Spec hardened; implementer and property author ready to spawn | [references/derivation.md](references/derivation.md) |
| `reconciliation` | Both derivation verdicts returned | [references/reconciliation.md](references/reconciliation.md) |
| `artifact-adversary` | Properties green and merged | [references/artifact-adversary.md](references/artifact-adversary.md) |

## Casting

Engines, efforts, and family assignments come from `agent-orchestration`
(`engine-selection` mode) — including the Foxway/no-xAI prohibition. Gauntlet
constraints on top:

- Implementer and property author MUST be different model families.
- Artifact adversary: fresh context required; different family preferred
  (⚖ track hit-rate by attacker×implementer family).
- Every role spawns fresh with a self-contained brief; no role relies on
  conversation history.

## Hard rules

- The property author's world is a constructed orphan-branch worktree
  containing only spec, glossary, contract, and harness; its initial commit
  is the isolation assertion. Isolation is construction, not access policy.
- Neither derivation brief references the other's report, worktree, or
  existence. Re-derivation after a spec amendment works from the amended
  spec, never from the triage discussion — that is a correlation
  side-channel.
- Every triage outcome appends a ledger entry (schema in the ledger header).
  The briefs load only the digest, never the raw ledger.
- Final triage judgment is human; do not delegate it.
- Teardown: `git worktree remove`; branches archived or tagged, never
  destructive git; extract properties and reports before removal.

## Stop conditions

- Stop and re-grill if the same requirement produces spec-holes twice —
  iterating the gauntlet on a broken spec wastes it. ⚖
- Stop dispatch and report if a role's isolation cannot be constructed as
  specified (e.g. the staging tree cannot be seeded clean).

## Close

Ship, then convert and archive: invariants live on as committed properties,
grill decisions become ADRs, glossary terms become doc comments on the
module; `spec.md`, `glossary.md`, and `.reports/` archive under
`docs/archive/<task>-gauntlet-<date>/`. The spec was scaffolding, not
documentation — `doc-triage` owns the conversion discipline.

## Output

Report per stage: verdict line, findings with R/I citations, ledger entries
appended, isolation evidence (orphan commit hash, `ls -R`), and the next
stage or blocker.
