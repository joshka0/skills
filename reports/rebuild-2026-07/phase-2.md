# Rebuild campaign — Phase 2 declarative catalog

Date: 2026-07-13

## Verdict

The Phase 2 implementation is complete and its catalog/composition gates pass,
but the phase cannot be declared done because the binding live-provider rail
did not hold for the duration of execution. The provider tree changed
concurrently after the initial fingerprint, outside every Phase 2 write path.
The concurrent content is preserved; it was not reverted or overwritten.

Current `providers/` is again an exact content-and-mode match for a declarative
render, but that proves current parity rather than byte identity with the Phase
2 starting state.

## Delivered

- `catalog/pack.json` is the sole active composition catalog. It contains 27
  canonical skill rows with per-skill archetype, all 119 absorbed alias-ledger
  records, per-provider profile membership, five provider-native exceptions,
  seven consumed-root models, and the excluded-output decisions.
- Each skill row preserves the former category, priority, status, routing, and
  negative-routing metadata. Alias records with a canonical owner are stored
  with that skill; six vendor/archive/system records remain explicit external
  records.
- `native/<provider>/` now owns the five non-canonical composition inputs:
  Agents Agent Vault CLI/HTTP, Codex `.system`, and the two Gemini Antigravity
  HeroUI packages. Each source was copied byte-for-byte and mode-for-mode from
  the live exception before composition switched to it.
- `catalog/README.md` documents the catalog model, fixed executable provider
  allowlist, native-source boundary, render-and-compare parity, and consumed
  roots. It also records the owner-required blinded paired-task method for the
  next Effect/Elixir/Go profile triage; all three remain in default profiles.
- Codex explicitly consumes both `$HOME/.agents/skills` and
  `${CODEX_HOME:-$HOME/.codex}/skills`. Its 19 existing duplicate canonical
  names are declared and accepted only when every physical copy is identical
  to the same canonical source. Every other consumer model rejects duplicate
  names.
- `bin/pack render` and `apply` now compose directly from catalog membership,
  `shared/`, and `native/`. `--profiles` is the primary selector;
  `--bundles` remains a compatibility spelling with no dependency on a bundle
  directory.
- `bin/pack check` validates the catalog, archetypes, aliases, profile and
  provider membership, native sources, consumed-root unions, and a fresh full
  render against all live providers. Snapshot and copied-bundle comparisons
  are gone.
- The old copied inputs were moved intact to
  `history/rebuild-2026-07/phase-2/`: 741 bundle files, 791 provider-snapshot
  files, and the two manifests plus overlay manifest and excluded-root note.
  No active code reads those history trees.

## Absorption and preservation ledger

| Previous delta or record | Disposition | New owner / evidence |
| --- | --- | --- |
| 27 `skills.jsonl` rows | Kept and normalized | `catalog/pack.json` `skills`; all seven former metadata fields compare with zero drift. |
| Archetype table embedded in `pack-check.mjs` | Merged | Per-skill `archetype` in `catalog/pack.json`; all 27 mechanical validators pass from catalog data. |
| 119 alias records | Kept | 113 owner-bound aliases plus six explicit external records; reconstruction compares exactly with the retired alias map. |
| Per-provider copied bundle membership | Replaced | Per-skill `profiles` plus native exception profiles; comparison with every retired provider/profile directory, including Codex `.system`, reports zero membership drift. |
| Provider-native allowlist in code and overlay manifest | Strengthened | Five catalog exceptions with confined `native/<provider>/<name>` sources; the seven-provider apply allowlist remains fixed executable policy. |
| Codex live `.system` as its own future source | Replaced | `native/codex/.system`; marker and child-package validation remains mandatory. |
| Overlay profile decisions | Kept as data | Exact membership plus `profile_decisions`, including Codex Chrome, Claude interaction metadata, and the language-pack owner ruling. |
| Agents+Codex effective union | Made explicit | Two consumed roots, 19 declared same-canonical overlaps, exact-overlap and byte-equivalence validation. |
| Other consumer roots | Kept and narrowed | One declared root each; duplicate policy is `reject`. |
| `providers-current/` snapshot parity | Replaced | Fresh full render-and-compare of content and modes in every `bin/pack check`. |
| Bundle body copies | Replaced | Renderer copies the canonical package exactly once per selected provider membership. |
| Empty auxiliary bundle directories | Replaced | Phase 2 temporarily retained empty selection tokens; the Phase 5 re-gate removed them because profiles must have members. |
| Old manifests, bundles, and snapshot evidence | Preserved | Dated Phase 2 history; no permanent deletion. |

No canonical skill body was intentionally edited in Phase 2, so the
skill-authoring archive requirement for a rewritten package is not applicable.
The selected rubric surface was `validation-and-acceptance`: the catalog-level
composition clauses were implemented, while known Phase 3 content and Phase 4
governing-document failures remain honestly non-conforming.

## Verification evidence

### Catalog and composition

The retired inputs reconstruct from the catalog as follows:

```text
SKILL_ROWS=27 ROW_DRIFT=0
ALIASES=119 ALIAS_DRIFT=0
PROFILE_AND_NATIVE_MEMBERSHIP_DRIFT=0
NATIVE_EXCEPTIONS=5 CONSUMERS=7
```

`node scripts/validate-skills.mjs` reports 27 rows, 27 unique active names,
zero errors, and the existing non-blocking Caveman routing warning.

`bin/pack render --all --profiles core` reports:

```text
agents 22
claude 26
codex 21
droid 20
factory 20
gemini 20
gemini-antigravity 22
EXACT_CONTENT_MODE_DIFFS=0
```

The legacy `--bundles core` spelling also renders from the catalog after the
root `bundles/` directory is absent. The composer fixture passes catalog-source
replacement, declared-source collision, ancestor-symlink confinement,
malformed native shape, atomic success, and atomic failure. The nested check
fixture passes expected catalog membership, provider membership, consumer
union, route-cycle, docs, canonical-shape, and redacted native-secret failures.

All active Node scripts parse, all active `bin/pack` JavaScript files remain
below 300 lines and 24 KiB, and `find . -type l -print` returns no output.

### Current check boundary

The final check has these Phase 2 passes:

```text
PASS package validators: 27/27
PASS catalog validator
PASS declarative catalog: 27 skills, 119 aliases/external records
PASS provider-native exceptions: 5
PASS consumed-root unions validated, including declared Codex Agents+Codex overlap
PASS render-and-compare parity: 7 live providers
PASS safe composer fixture
PASS check boundary fixture
```

The overall command intentionally remains `CHECK: FAIL` with 63 errors and one
warning. The errors are the three stale routing descriptions and the planned
Phase 3 Chrome/local-secrets/rubric defects plus the planned Phase 4 governing
document and catalog-report regeneration. No Phase 2 catalog, native,
consumer-union, or render-parity error remains.

### Live-provider rail blocker

The initial content-and-mode provider-tree fingerprint was:

```text
245c81740fc67fc138005e02b89db5222a7c6db11fd185acc1a6b7690c64cb74
```

During execution, the canonical Herdr files acquired modification times
`10:15:26` and `10:15:34`; at `10:15:49`, `herdr/SKILL.md` and
`herdr/references/command-recipes.md` were rewritten in all seven live provider
trees and in the then-active copied composition/snapshot trees. The resulting
provider fingerprint is stable but different:

```text
bf38ca33905f9c43730550ac8a11cfbf4ec0bb37e879249798dce232313172a8
```

No Phase 2 command invoked `bin/pack apply` or wrote any path under `shared/`
or `providers/`; all executor mutations were confined to `catalog/`, `native/`,
`bin/`, `scripts/`, `history/rebuild-2026-07/phase-2/`, and this report. The
current Herdr provider copies match the concurrent canonical content, and a
fresh catalog render matches the whole current provider tree exactly. Because
the starting bytes are no longer available without prohibited Git operations
or discarding concurrent work, the binding byte-identity rail cannot be
certified or restored safely by this executor.

## Explicitly not done

- No Phase 3 skill consolidation or content repair was started: Chrome remains
  separate, the `local-secrets` handoffs remain unresolved, Crew and
  Trash-language repairs remain pending, rubric ownership remains pending, and
  the three stale catalog descriptions remain unchanged.
- No Phase 4 provider apply or governing-document regeneration was run.
  `README.md`, `PACK.md`, `AGENTS.md`, `packs/joshka0/SOURCE_NOTES.md`, the
  current catalog-conformance report, and the pre-commit trigger remain for
  that phase.
- No Phase 5 mirror or estate work was started beyond the dated retirements
  explicitly required by Phase 2.
- No `$HOME` path or config was written. No Git command was run. No file was
  permanently deleted; temporary cleanup used `/usr/bin/trash`.

PHASE 2: BLOCKED providers/ changed concurrently outside Phase 2
