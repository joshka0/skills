# Rebuild campaign — Phase 5 history and estate

Date: 2026-07-13

## Verdict

Phase 5 is complete. Historical evidence is indexed without breaking its stable
paths, Loose and original-inventory evidence point to the dated classification,
the Impeccable mirror is reduced to the exact pinned evidence set authorized by
the plan, the intermittent secrets-boundary fixture is deterministic, and the
final pack gate passes with zero errors.

## Historical consolidation

`history/rebuild-2026-07/INDEX.md` is the dated estate index. It explicitly
classifies these retained-in-place report families as historical:

| Report family | Files | Current authority that supersedes it |
| --- | ---: | --- |
| `reports/triage/` | 4 | Owner rulings, declarative catalog, and completed phase verdicts. |
| `reports/pilot/` | 7 | Current skill-authoring references and package/catalog acceptance. |
| `reports/fleet/` | 26 | Current catalog and canonical packages; fleet ledgers remain provenance. |
| `reports/rubric/` | 3 | The four skill-authoring references are the sole normative rubric. |

`loose/README.md` now marks its 13 original loose artifacts as historical and
points to the dated index. `archive/original-inventory/README.md` likewise marks
its 438-file generated first-pass export as historical and names the current
canonical/catalog/native/generated boundaries.

The index also records the already-preserved rebuild inputs:

- three retired Phase 1 commands;
- 741 retired copied bundle files;
- four absorbed manifest/exclusion files;
- 791 retired provider-snapshot files;
- 39 Phase 3 pre-rewrite files; and
- four Phase 4 pre-regeneration governing documents.

No old report, loose artifact, original-inventory artifact, retired composer,
bundle, manifest, or snapshot was deleted or reactivated.

## Impeccable trim

The mirror pin remains
`7190295f3de31bc1e10ab42f740d69cf35a88ac3`. Before Phase 5,
`mirrors/impeccable/` contained 2,109 files and occupied 82,040 KiB. It now
contains 12 files and occupies 140 KiB:

- `UPSTREAM.md` and `LICENSE`;
- `skill/SKILL.src.md`;
- `adapt.md`, `bolder.md`, `brand.md`, `clarify.md`, `craft.md`, `harden.md`,
  `interaction-design.md`, `polish.md`, and `product.md` under `skill/reference/`.

The keep-set maps directly to the durable categories in the Design Family A34
ledger: brand/product register, category-default and anti-default reflex,
imagery as content, system-drift classification, error/empty/undo/confirmation
behavior, clipping-safe interaction, and input/connection/content extremes.
`history/rebuild-2026-07/INDEX.md` records the source-to-ledger map.

The other 2,097 files were moved to macOS Trash. They remain recoverable from
the pinned upstream commit; none was permanently deleted. `UPSTREAM.md` and the
catalog-derived source notes now record the trimmed state.

## Secrets-boundary fixture flake

### Root cause

The flake had two interacting causes:

1. `bin/lib/pack-check-fixture.mjs` generated AWS and GitHub-shaped tails with
   Base64URL. Kingfisher's installed AWS secret rule requires exactly 40
   `[A-Za-z0-9/+]` characters, while its legacy GitHub PAT rule requires 36
   alphanumerics with a checksum. Random `-`/`_` characters and a random
   checksum made detection probabilistic. A 200-sample proof produced only 50
   AWS secret matches and zero GitHub matches.
2. Kingfisher exits with status 200 when it finds a secret and emits a pretty
   finding document followed by compact summary JSON. `checkSecrets` treated
   every nonzero status as a scanner failure. The boundary fixture only searched
   for the substring `[secrets]`, so a scanner-error report counted as success;
   a random no-finding run returned status 0 and exposed the intermittent miss.

This was a synthetic-input/control-flow defect, not a filesystem scan-order or
temporary-file race.

### Fix

- `bin/lib/pack-check.mjs` now accepts Kingfisher status 0 (clean) and 200
  (findings), extracts the numeric terminal summary from either its single-JSON
  or multi-document output, and distinguishes a real positive finding from a
  scanner execution failure.
- `bin/lib/pack-check-fixture.mjs` now assembles a fixed high-entropy AWS-shaped
  pair at runtime. The source remains clean to the outer scan, while the nested
  fixture always satisfies the installed detector grammar.
- The fixture requires `ERROR [secrets] <positive count> redacted finding(s)`;
  a generic scan failure can no longer satisfy the boundary assertion.

The first corrected focused run passed, followed by eight consecutive full
nested boundary-fixture passes. Both changed Node files pass syntax checking.

## Estate result

The final estate report is
`reports/rebuild-2026-07/estate-2026-07-13.md`.

Because Git commands are forbidden, counts use the repository's non-ignored
regular-file set (`rg --files --hidden -g '!.git/**'`). The committed Phase 4
baseline had 6,069 files; the completed Phase 5 estate has 3,976 files:

```text
BEFORE=6069
AFTER=3976
DELTA=-2093 (-34.5%)
```

The arithmetic is exact for the Phase 5 scope: 2,097 Impeccable files left the
repository and four pointer/report files were added. A physical inventory found
only one additional ignored `.DS_Store`, excluded on both sides.

## Final verification

The final operative `bin/pack check` result was:

```text
PACK CHECK
PASS package validators: 26/26
PASS catalog validator
PASS local package links inspected: 101
PASS no repo-internal symlinks
PASS secret scan: 0 findings across 206 blobs
PASS declarative catalog: 26 skills, 121 aliases/external records
PASS provider-native exceptions: 5
PASS consumed-root unions validated, including declared Codex Agents+Codex overlap
PASS render-and-compare parity: 7 live providers
PASS safe composer fixture: confinement, collision, native shape, atomic success/failure
PASS check boundary fixture: canonical, secret, catalog, union, route, and docs failures detected
WARN [catalog-validator] - WARN: caveman has weak routing clarity in SKILL.md
SUMMARY errors=0 warnings=1
CHECK: PASS
```

Additional evidence:

- the corrected boundary fixture passed eight consecutive focused iterations;
- the Impeccable keep-set is exactly 12 files;
- the repository contains no internal symlinks;
- no temporary fixture, render, or atomic-stage directory remains;
- live `providers/` remained render-identical and was not mutated in Phase 5.

## A34-style preservation ledger

| Previous evidence or behavior | Disposition | Current evidence |
| --- | --- | --- |
| Triage, pilot, fleet, and rubric reports | Kept in place, marked historical by dated index | Stable old links continue to resolve; current authorities are named. |
| Loose artifacts | Kept with pointer | `loose/README.md` and the dated history index. |
| Original generated inventory | Kept with strengthened pointer | `archive/original-inventory/README.md` names current source boundaries. |
| Retired commands, bundles, manifests, and snapshot | Kept | Existing Phase 1/2 history trees are indexed with exact counts. |
| Impeccable provenance and license | Kept | Pin and recovery instructions in `UPSTREAM.md`; `LICENSE` retained. |
| Portable Impeccable design deltas | Kept as minimal source evidence | Ten cited skill/reference files support the canonical Design Family ledger. |
| Provider-private Impeccable implementation estate | Moved to Trash | 2,097 files; recoverable from the pinned upstream commit. |
| Random boundary credentials | Replaced | Fixed runtime-assembled detector-valid AWS pair. |
| Secret finding treated as scanner error | Fixed | Status-200 handling plus deterministic terminal-summary parsing. |
| Generic `[secrets]` fixture assertion | Strengthened | Requires a positive redacted-finding error. |

## Explicitly not done

- No Phase 6 symlink-distribution spike, consumer experiment, npx-skills
  layout, or `skills-lock.json` work was started.
- No canonical skill content, catalog membership, native source, provider view,
  or install root was changed.
- No mirror other than the authorized Impeccable trim was changed.
- No `$HOME` path or configuration was written.
- No Git command was run. No file was permanently deleted; the authorized
  mirror reduction went to Trash and historical estate stayed preserved.

## Re-gate fixes

The independent review in `gate-grok.md` rejected the first Phase 5 verdict on
two blockers. Both were fixed before re-gating.

### Blocker 1 — stale and ungated pack README

- `packs/joshka0/README.md` was regenerated to current catalog/live truth: 26
  canonical packages, 115 owner-bound aliases, six external records, five
  native exceptions, the canonical/catalog/native/generated/history model, the
  seven correct provider counts (22/26/21/20/20/20/22), all seven current
  install mappings, consumed-root overlap, and the key Chrome/local-secrets/
  Maestri aliases. Retired bundle, snapshot, manifest, old-count, Foxctl, and
  obsolete audit claims are absent.
- `bin/lib/pack-parity.mjs` now includes the pack README in `checkDocs`, applies
  missing-path/retired-command/install-mapping checks to it, and validates its
  provider count table against live provider directories alongside `PACK.md`.
- Both `bin/hooks/pre-commit` and the active `.git/hooks/pre-commit` trigger
  `bin/pack check` for changes to either `packs/joshka0/README.md` or
  `packs/joshka0/SOURCE_NOTES.md`. The hook copies remain byte-identical and
  retain Kingfisher as the final stage.

### Blocker 2 — declared empty profile tokens

- `catalog/pack.json` now declares only `core`; the empty `infra`, `release`,
  and `aliases` tokens are gone. Every canonical and native membership uses
  `core`.
- The CLI help exposes only `--profiles core` and `--full`. Its allowlist is
  derived from profiles that actually have canonical or native members, so an
  empty declared token cannot become selectable through catalog data alone.
- `bin/lib/pack-catalog-check.mjs` rejects any declared profile with zero
  members. The boundary fixture injects an `unused` profile and proves that
  failure is detected.
- The safety fixture no longer uses synthetic non-core profile names.
- `catalog/README.md` states that `core` is the sole selectable profile and
  that `--full` currently resolves to the same membership; a future profile
  must have members before catalog or CLI exposure. Current governing/source
  docs were aligned to the same one-profile model, while the superseded catalog
  report explicitly labels its auxiliary selection surface historical.

Public behavior checks confirm that `--profiles infra`, `--profiles release`,
and `--profiles aliases` are rejected as not allowlisted. Fresh `core` and
`--full` renders are byte-identical and retain the expected provider entry
counts.

The final re-gate command returned:

```text
PACK CHECK
PASS package validators: 26/26
PASS catalog validator
PASS local package links inspected: 101
PASS no repo-internal symlinks
PASS secret scan: 0 findings across 206 blobs
PASS declarative catalog: 26 skills, 121 aliases/external records
PASS provider-native exceptions: 5
PASS consumed-root unions validated, including declared Codex Agents+Codex overlap
PASS render-and-compare parity: 7 live providers
PASS safe composer fixture: confinement, collision, native shape, atomic success/failure
PASS check boundary fixture: canonical, secret, catalog, union, route, and docs failures detected
WARN [catalog-validator] - WARN: caveman has weak routing clarity in SKILL.md
SUMMARY errors=0 warnings=1
CHECK: PASS
```

No Git command, `$HOME` write, provider mutation, permanent deletion, or Phase
6 work occurred during the re-gate fixes.

PHASE 5: DONE
