# Pilot Acceptance — grill-me

## Summary

`grill-me` is the retained explicit interaction mode for a user-controlled, one-question-at-a-time plan interrogation. Its `docs` mode absorbs the durable behavior of `grill-with-docs`: repository-language checks, inline records for resolved terms or decisions, a narrow ADR threshold, and compact fallback document shapes when a target repository has no local convention. The mode remains opt-in: only `"grill me"` invokes it, and `"grill me with docs"` selects the added mode.

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

## Section 4 — collision matrix

| Claimed phrase or artifact | First owner | Nearest competitor | Discriminator, precedence, or handoff |
| --- | --- | --- | --- |
| `"grill me"` | `grill-me` standard mode | `riff-partner` | The quoted macro selects a one-question interrogation; open-ended riffing or `"what do you think"` belongs to `riff-partner`. |
| `"grill me with docs"` | `grill-me` docs mode | Retired `grill-with-docs` | `with docs` is a mode modifier, not a second trigger slot. Remove stale retired exposure during composition. |
| Long-horizon goal or `/goal` | `goal-council` | `grill-me` | A durable goal dossier wins; `grill-me` activates only from its exact quoted macro. |
| `"prototype this"` or a request to compare runnable alternatives | `prototype` | `grill-me` | Prototype work creates an experiment; this skill interrogates a supplied decision without activating implicitly. |
| An ordinary plan, review, or implementation request | Its normal planning/review owner | `grill-me` | No exact `grill me` phrase means this interaction mode does not load. |

## Package line total and net-shrink evidence

| Package | Text lines |
| --- | ---: |
| Archived `grill-me` plus `grill-with-docs` | 222 |
| New active `grill-me` package | 94 |

The result is 128 lines smaller (about 58%) and below the 800-line active-package cap. Active-file evidence: `SKILL.md` is 41 lines / 1,963 bytes; `references/docs-mode.md` is 53 lines / 2,303 bytes.

## Validator output

```text
PASS: shared/general/grill-me (interaction)
```

Command run from the repository root:

```sh
bin/validate-skill.sh shared/general/grill-me interaction
```

## Acceptance report status

**PACKAGE-CONFORMS.** The canonical package passes every package-judgable acceptance item. Catalog-only clauses remain explicitly **DEFERRED** because this pilot forbids changes under `bundles/` and `providers/`; composition must verify A15's bundle/provider clause, A30, and A31 before a catalog-level verdict.

## A01–A35 checklist

- [x] A01 — Non-default delta: an explicit, user-controlled questioning cadence that resolves decision branches; docs mode additionally enforces evidence-grounded domain records, a narrow ADR rule, and a local-convention-first fallback shape.
- [x] A02 — Plan/design interrogation and terminology/decision capture are repeatable collaboration workflows, not one-off notes.
- [x] A03 — `grill-with-docs` is now the `docs` mode; `riff-partner` remains an idea-stage thought partner, while durable-goal skills own durable dossiers rather than this opt-in interview cadence.
- [x] A04 — Classified exactly as an explicit interaction mode; the validator now has and passed the matching `interaction` archetype.
- [x] A05 — Canonical owner is uniquely `shared/general/grill-me/`; directory and frontmatter name match, and the validator's shared-name check passed.
- [x] A06 — Frontmatter is minimal: name, single-line description, and `disable-model-invocation`, whose Claude Code consumer is named by the rubric. Non-Claude handling is a composition concern deferred with A30, not a claim that all providers consume the key.
- [x] A07 — Description is one physical YAML line and 160 bytes, below the interaction 220-character budget.
- [x] A08 — Description names concrete plan interrogation and ends with the concrete `Use when the user says "grill me"` selection signal.
- [x] A09 — Neighbor comparison leaves one owner per trigger: exact `grill me` here, open-ended ideation with `riff-partner`, and durable goal work with goal skills.
- [x] A10 — No greedy or implicit persona trigger remains; standard and docs behavior require the exact opt-in phrase, with `with docs` only selecting a mode.
- [x] A11 — `SKILL.md` is 41 lines / 1,963 bytes, within the interaction 120-line / 10 KiB limits; validator passed.
- [x] A12 — Active instructions contain only route, shared session workflow, non-default rules, stop conditions, output, and one reference-selection instruction.
- [x] A13 — The route table explicitly selects only `references/docs-mode.md` for docs mode; that path exists and resolves.
- [x] A14 — The sole reference is 53 lines (under 250); active package total is 94 lines (under 800), with no support-file prose.
- [~] A15 — **DEFERRED (bundle/provider clause).** The canonical package has no duplicate active prose: the former owner is archive-only and docs-specific instructions exist only in the selected reference. Review-sol records stale bundle/provider copies and a stale `grill-with-docs` exposure, which this scope cannot remove or verify.
- [x] A16 — The two modes share the same plan-interrogation lifecycle and safe write boundary.
- [x] A17 — `standard` and `docs` are distinct kebab-case modes in the exact route table; standard is selected unless the user adds `with docs`.
- [n/a] A18 — This is not a router.
- [n/a] A19 — This is not a router; its router-child and overlay-exposure clauses do not apply.
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
- [~] A30 — **DEFERRED.** Canonical shared name is unique and active source is authoritative, but bundle/provider semantic-copy and exposure checks are outside the explicit no-`bundles/`/`providers/` scope.
- [~] A31 — **DEFERRED.** Local reference resolution and the no-internal-symlink check passed through the validator; compose dry-run and installed-view checks are outside the explicit no-`bundles/`/`providers/` scope.
- [x] A32 — The independent Sol and Fable reviews were read. Their convergence on the explicit interaction boundary was retained; Sol's fallback-schema finding was resolved in `references/docs-mode.md`, and the rubric's `interaction` gate now supplies the matching validation evidence.
- [x] A33 — Consolidation shrank 222 original text lines to 94 active text lines and remains within its absolute cap.
- [x] A34 — The preservation ledger below accounts for every qualifying legacy delta from both archived sources, including deliberate drops and their existence-bar reasons.
- [x] A35 — Archive verification below confirms the pre-rewrite originals for both the in-place owner and absorbed sibling already exist in the wave archive; no duplicate archive move was made.

## A34 preservation ledger

| Archived source | Qualifying legacy delta | Classification |
| --- | --- | --- |
| `archive/triage-2026-07/shared/general/grill-me/SKILL.md` | Exact opt-in `"grill me"` interaction contract | Kept at `shared/general/grill-me/SKILL.md` frontmatter and route table. |
| Same | Branch-by-branch plan interrogation with a recommended answer | Kept at `shared/general/grill-me/SKILL.md` Session steps 1–3. |
| Same | One question at a time, waiting for feedback | Kept at `shared/general/grill-me/SKILL.md` Session step 2. |
| Same | Explore the repository instead of asking an evidence-resolvable question | Kept at `shared/general/grill-me/SKILL.md` Session step 1. |
| Same | Broad `stress-test` / `get grilled` triggers | Dropped: they fail the new narrow explicit-interaction boundary; the exact macro remains selectable. |
| `archive/triage-2026-07/shared/general/grill-with-docs/SKILL.md` | Docs-aware grilling, glossary conflict checks, precise terms, scenarios, and code cross-reference | Merged into `shared/general/grill-me/references/docs-mode.md` Preflight and During the session. |
| Same | Inline context updates only for user-resolved language, without implementation detail | Kept at `shared/general/grill-me/references/docs-mode.md` During the session and Write boundary. |
| Same | Create context and ADR records lazily, never as empty scaffolding | Kept at `shared/general/grill-me/references/docs-mode.md` Write boundary and Fallback document shapes. |
| Same | ADR only for a hard-to-reverse, surprising, genuine trade-off | Kept at `shared/general/grill-me/references/docs-mode.md` During the session. |
| `archive/triage-2026-07/shared/general/grill-with-docs/CONTEXT-FORMAT.md` | Context language, aliases, relationships, and resolved ambiguities | Kept at `shared/general/grill-me/references/docs-mode.md` Fallback document shapes. |
| Same | Domain-specific one-sentence definitions; optional grouping and example dialogue when they clarify a boundary | Kept at `shared/general/grill-me/references/docs-mode.md` Fallback document shapes. |
| `archive/triage-2026-07/shared/general/grill-with-docs/ADR-FORMAT.md` | Minimal decision record, lazy creation, and local numbering/convention precedence | Kept at `shared/general/grill-me/references/docs-mode.md` Write boundary and Fallback document shapes. |
| Same | Optional status/options/consequences only when they retain a meaningful trade-off | Kept at `shared/general/grill-me/references/docs-mode.md` Fallback document shapes. |
| The archived format files | Full directory diagrams, example catalogs, and formatting wrappers | Dropped: illustrative/tutorial detail that adds no recurring non-default execution rule after the compact schema is retained. |

## Archive verification (A35)

The pre-rewrite originals already exist in place under the wave archive:

- `archive/triage-2026-07/shared/general/grill-me/SKILL.md` (10 lines)
- `archive/triage-2026-07/shared/general/grill-with-docs/SKILL.md` (88 lines)
- `archive/triage-2026-07/shared/general/grill-with-docs/ADR-FORMAT.md` (47 lines)
- `archive/triage-2026-07/shared/general/grill-with-docs/CONTEXT-FORMAT.md` (77 lines)

No duplicate archive move was created during this revision.

## Risks and follow-ups

- Update bundle membership and compose provider overlays only in the later, explicitly authorized composition phase; remove the retired `grill-with-docs` exposure then.
- During composition, record whether non-Claude overlays strip `disable-model-invocation` or verify it harmless when ignored, as required for a provider-specific key in a shared body.
