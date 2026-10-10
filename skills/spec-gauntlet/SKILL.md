---
name: spec-gauntlet
description: "Run the explicitly requested spec gauntlet: spec adversary, isolated implementation and property derivation, reconciliation, and artifact adversary."
---

# Spec gauntlet

Decorrelate the minds that could share blind spots. Attack the spec before any code exists. Derive the implementation and the properties independently. Treat disagreement as signal. Then attack the merged artifact with execution access.

Skip it when no real invariant exists (UI copy, glue, one-off scripts). A decision rather than an implementation needs a cross-family review (`agent-orchestration`) instead.

## Inputs

- `spec.md` (R1..Rn, I1..In, Parked) and `glossary.md`. If they are missing, run `grill-me` spec mode.
- `contract.*`: the public boundary signatures. You write these after the spec hardens and list them explicitly in both derivation briefs.
- `~/.config/spec-ledger/spec-ledger.md`. If it is missing, create it from `assets/spec-ledger.md`. Briefs load only `spec-ledger-digest.md`, never the raw ledger.

## Stages (read only the one you are dispatching)

| Stage | When | Read |
| --- | --- | --- |
| spec adversary | Spec exists, no code | `references/spec-adversary.md` |
| derivation | Spec hardened | `references/derivation.md` |
| reconciliation | Both derivation verdicts are in | `references/reconciliation.md` |
| artifact adversary | Properties green and merged | `references/artifact-adversary.md` |

## Rules

- Casting comes from `agent-orchestration`, including the Foxway bans. The implementer and property author must be different model families. If no second permitted family is available, use fresh-context agents of different tiers and record the weaker decorrelation in the stage report. The artifact adversary needs fresh context and preferably a different family. Every role starts fresh with a self-contained brief.
- The property author's world is a constructed orphan-branch worktree with only the spec, glossary, contract, and harness. Its initial commit is the isolation assertion. If that world cannot be seeded clean, stop.
- Neither derivation brief mentions the other's report, worktree, or existence. After a spec amendment, re-derive from the amended spec, never from the triage discussion.
- Every triage outcome appends a ledger entry. The final triage judgment is the human's. If evidence shows a requirement is incomplete, go back to the spec. There is no fixed retry count.
- Teardown: keep the properties, reports, and unique work. Use a non-forced `git worktree remove` on a verified-clean tree. Keep the branches.
- Close: invariants live on as committed properties, grill decisions become ADRs, and glossary terms become module doc comments. Archive `spec.md`, `glossary.md`, and `.reports/` under `docs/archive/<task>-gauntlet-<date>/` (the discipline is in `doc-triage`).
- Report each stage: verdict line, findings with R/I citations, ledger entries appended, isolation evidence (orphan commit hash, `ls -R`), and the next stage.
