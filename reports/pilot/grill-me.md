# Pilot Acceptance — grill-me

## Summary

`grill-me` is now the retained explicit interaction mode for a user-controlled, one-question-at-a-time plan interrogation. Its `docs` mode absorbs the durable behavior of `grill-with-docs`: repository-language checks, inline records for resolved terms or decisions, and a narrow ADR threshold. The mode remains opt-in: only `"grill me"` invokes it, and `"grill me with docs"` selects the added mode.

## Files changed and archive moves

- Rebuilt canonical owner: `shared/general/grill-me/`.
- Archived pre-rewrite owner: `archive/triage-2026-07/shared/general/grill-me/`.
- Archived absorbed package: `archive/triage-2026-07/shared/general/grill-with-docs/`.
- Added this acceptance report: `reports/pilot/grill-me.md`.

Both original directories were moved before the retained owner was recreated. Nothing was deleted.

## Mode and trigger contract

| Mode | Invocation | Deferred material |
| --- | --- | --- |
| `standard` | `grill me` | none |
| `docs` | `grill me with docs` | `references/docs-mode.md` |

The frontmatter uses `disable-model-invocation: true`, the documented Claude Code control for a deterministic macro that the model must not self-select. Ordinary planning, review, and implementation requests do not activate the interaction mode.

## Package line total and net-shrink evidence

| Package | Text lines |
| --- | ---: |
| Archived `grill-me` plus `grill-with-docs` | 222 |
| New active `grill-me` package | 64 |

The result is 158 lines smaller (about 71%) and below the 800-line active-package cap. Active-file evidence: `SKILL.md` is 41 lines / 1,963 bytes; `references/docs-mode.md` is 23 lines / 1,419 bytes.

## Validator output

```text
PASS: shared/general/grill-me (leaf)
```

Command run from the repository root:

```sh
bin/validate-skill.sh shared/general/grill-me leaf
```

## Acceptance report status

Scoped canonical acceptance is complete. Bundle/provider composition and installed-view checks are explicitly deferred because this pilot forbids changes under `bundles/` and `providers/`; they must be completed during the requested composition phase.

## A01–A33 checklist

- [x] A01 — Non-default delta: an explicit, user-controlled questioning cadence that resolves decision branches; docs mode additionally enforces evidence-grounded domain records and a narrow ADR rule.
- [x] A02 — Plan/design interrogation and terminology/decision capture are repeatable collaboration workflows, not one-off notes.
- [x] A03 — `grill-with-docs` is now the `docs` mode; `riff-partner` remains an idea-stage thought partner, while durable-goal skills own durable dossiers rather than this opt-in interview cadence.
- [x] A04 — Classified exactly as an explicit interaction mode. The prescribed `leaf` mechanical gate is the closest validator archetype.
- [x] A05 — Canonical owner is uniquely `shared/general/grill-me/`; directory and frontmatter name match, and the validator's shared-name check passed.
- [x] A06 — Frontmatter is minimal: name, single-line description, and `disable-model-invocation`, whose Claude Code consumer is named by the rubric.
- [x] A07 — Description is one physical YAML line and 160 bytes, below the leaf 220-character budget.
- [x] A08 — Description names concrete plan interrogation and ends with the concrete `Use when the user says "grill me"` selection signal.
- [x] A09 — Neighbor comparison leaves one owner per trigger: exact `grill me` here, open-ended ideation with `riff-partner`, and durable goal work with goal skills.
- [x] A10 — No greedy or implicit persona trigger remains; standard and docs behavior require the exact opt-in phrase, with `with docs` only selecting a mode.
- [x] A11 — `SKILL.md` is 41 lines / 1,963 bytes, within the leaf 120-line / 10 KiB limits; validator passed.
- [x] A12 — Active instructions contain only route, shared session workflow, non-default rules, stop conditions, output, and one reference-selection instruction.
- [x] A13 — The route table explicitly selects only `references/docs-mode.md` for docs mode; that path exists and resolves.
- [x] A14 — The sole reference is 23 lines (under 250); active package total is 64 lines (under 800), with no support-file prose.
- [x] A15 — No active instructional prose is duplicated: the former owner is archive-only as required, and docs-specific instructions exist only in the selected reference. Bundle/provider composition review is deferred in A30–A31.
- [x] A16 — The two modes share the same plan-interrogation lifecycle and safe write boundary.
- [x] A17 — `standard` and `docs` are distinct kebab-case modes in the exact route table; standard is selected unless the user adds `with docs`.
- [n/a] A18 — This is not a router.
- [n/a] A19 — This is not a router and has no router children.
- [x] A20 — No version-sensitive technical facts remain; repository records and observed code are the only stated evidence sources.
- [x] A21 — No copied manual, compatibility matrix, pricing, policy catalog, model recommendation, or tutorial remains.
- [x] A22 — No volatile value is pinned, so no pack-constraint exception is used.
- [x] A23 — No credentials, tokens, keys, recovery values, or secret URLs exist in the active package.
- [x] A24 — The workflow neither discovers nor reports secret values.
- [x] A25 — Paths are repository-relative documentation conventions; no literal user-home path occurs.
- [x] A26 — No machine-specific non-secret fact is stored or guessed.
- [n/a] A27 — The package has no scripts.
- [x] A28 — The package has no assets or provider metadata files, and frontmatter does not fork the capability.
- [x] A29 — Rules protect the explicit invocation boundary, evidence distinction, and write boundary without performative filler.
- [~] A30 — Canonical shared name is unique and active source is authoritative. Bundle/provider semantic-copy and exposure checks are deferred by the explicit no-`bundles/`/`providers/` scope.
- [~] A31 — Local reference resolution and the no-internal-symlink check passed through the validator. Compose dry-run and installed-view checks are deferred by the explicit no-`bundles/`/`providers/` scope.
- [x] A32 — Pilot-first baseline: compared the compact route/workflow shape with the now-passing `herdr` and `code-quality` golden examples; the rubric governs the explicit-interaction exception and leaf gate.
- [x] A33 — Consolidation shrank 222 original text lines to 64 active text lines and remains within its absolute cap.

## Risks and follow-ups

- Update bundle membership and compose provider overlays only in the later, explicitly authorized composition phase; remove the retired `grill-with-docs` exposure then.
- Reviewer should decide whether `grill me with docs` is the desired user-facing modifier before fleet execution; it intentionally remains a mode selector rather than an independently triggerable skill.
