---
name: doc-triage
description: "Route markdown into artifacts that can't lie — doc comments, ADRs, issues, archive — and execute the conversions. Use when the user says doc triage, docs cleanup, too many markdown files, or a design doc shipped."
---

# Doc Triage

Reduce a repo's standalone markdown to a minimal set of living documents by
routing every file's content to the artifact that can't drift: colocated doc
comments, append-only ADRs, tracker issues, or the archive. The governing
principle: a document that claims to describe current state will eventually
lie; move its claims somewhere enforcement exists, or date-stamp it as
history.

## Do not use when

- The repo has ≤5 md files and they're current — nothing to triage.
- The user wants to *write* documentation — that's ordinary work, not triage.

## Procedure

### 1. Inventory

List every `*.md` in the repo (excluding vendored/node_modules). For each,
record: path, last-modified vs. last-modified of the code it describes, and
a one-line summary of what it claims.

### 2. Classify (the "can it lie?" test)

Route each file to exactly one bucket:

- **Doc-comment material**: intent about a specific module — why,
  invariants, business constraints, rejected alternatives. → Moves onto the
  module it governs (`@moduledoc`/TSDoc). The file then deletes.
- **ADR**: a decision with cross-module scope and a why. → Becomes
  `docs/adr/NNNN-<slug>.md`, dated, append-only, from
  [assets/adr-template.md](assets/adr-template.md). Never rewrite history
  into it; record the decision as-of its date.
- **Backlog**: aspirational design for unbuilt work. → Becomes tracker
  issues (or `TODO.md` entries if no tracker); the design file itself goes
  to archaeology, not the living tree.
- **Archaeology**: design-phase thinking for shipped or abandoned work. →
  `docs/archive/<name>-<date>/`, or `design/` if still explicitly
  non-authoritative and in progress. Add a one-line header: "Archaeology —
  not current documentation."
- **Delete**: stale state-descriptions superseded by code, duplicates,
  scratch. Git keeps them; `git rm` in a commit is versioned removal and
  satisfies Trash-only rails.
- **Living** (the survivors): README, the architecture map, active ADRs.
  Target ≤5; each survivor must justify why it can't convert.

Ambiguous files: split them — most sprawl is part intent (→ comments), part
decision (→ ADR), part stale (→ delete).

### 3. Execute

Perform the conversions: write the doc comments onto modules, create the
ADRs, file the issues, move the archaeology, delete the dead. One commit per
bucket keeps review sane.

### 4. Guard (offer, don't impose)

- [scripts/md-budget.sh](scripts/md-budget.sh): deterministic allowlist
  check for CI (`.md-allowlist`, exit 1 on violation) or advisory mode.
- [scripts/pre-push](scripts/pre-push): advisory doc-drift margin note via
  `claude -p`; never blocks.
- [scripts/doc-sweep.sh](scripts/doc-sweep.sh): scheduled full drift +
  archaeology-leak sweep with a dead-man's-switch status file.

## Interview points (batch, don't dribble)

Before executing, batch the genuinely-owner calls into one question set:
survivor list confirmation, contested buckets, tracker vs. `TODO.md`, and
whether to install guards. Everything else is mechanical.
