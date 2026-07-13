# Rebuild campaign — Phase 4 regenerate and apply

Date: 2026-07-13

## Verdict

Phase 4 is complete. The accepted Phase 3 canonical changes were rendered and
classified before mutation, the full seven-provider tree was atomically
exchanged, live providers now exactly match a fresh catalog render, the four
governing documents and dated catalog-conformance report are current, and the
pre-commit gate runs the full pack check for every governed path.

`bin/pack check` ends with zero errors, one pre-existing non-blocking Caveman
routing warning, and `CHECK: PASS`.

## Pre-apply render proof

`bin/pack render --all --full` remained pure and produced these catalog-derived
entry counts:

| Provider | Entries |
| --- | ---: |
| Agents | 22 |
| Claude | 26 |
| Codex | 21 |
| Droid | 20 |
| Factory | 20 |
| Gemini | 20 |
| Gemini Antigravity | 22 |

The exact content-and-mode comparison against the live Phase 3 provider tree
found 130 changed paths. Classification by provider and top-level package was:

```text
agents: 17 — agent-orchestration:1, gtr:2, herdr:2, local-dev:4,
              product-platform:2, release-bundles:1, skill-authoring:5
claude: 18 — agent-orchestration:1, crew:1, gtr:2, herdr:2, local-dev:4,
              product-platform:2, release-bundles:1, skill-authoring:5
codex: 27 — agent-orchestration:1, chrome-extension-builder:4, gtr:2,
             herdr:2, local-dev:4, product-platform:8, release-bundles:1,
             skill-authoring:5
droid: 17 — same non-Crew/non-Chrome package set as Agents
factory: 17 — same non-Crew/non-Chrome package set as Agents
gemini: 17 — same non-Crew/non-Chrome package set as Agents
gemini-antigravity: 17 — same non-Crew/non-Chrome package set as Agents
UNEXPECTED_DRIFT=0
```

This exactly reproduces the accepted Phase 3 render ledger. The apparent
Chrome paths in Codex are removals/replacements caused by merging the standalone
leaf into Product Platform. `release-bundles` and `skill-authoring` are the
accepted Phase 3 local-secrets handoff and normative-rubric ownership edits.
Catalog description synchronization also validates against current frontmatter;
it does not create a separate copied manifest layer.

A deterministic Phase 4 tree index over relative path, entry type, mode, and
file SHA-256 recorded 1,112 live entries before apply and 1,129 after apply.
Its live fingerprint changed from
`c3b9aef81c55b1f7f9337f644a7912e77c95e3ad39c873aced556347eb3f098f`
to the reviewed render fingerprint
`2daa85ea05e83385612c266309b9d56eb17da9ce89ec80b75c95184e10d96f4c`.

## Atomic provider apply

The authorized command was:

```text
bin/pack apply --all --full
APPLY scope=agents,claude,codex,droid,factory,gemini,gemini-antigravity changed-paths=130
APPLY DONE: exchanged providers/ atomically; displaced tree moved to Trash
```

The apply built and validated a complete sibling tree, exchanged the whole
`providers/` root in one operation, and moved the displaced tree to macOS
Trash. A fresh full render after apply reported zero content-or-mode
differences. No `.pack-stage-*` path remained. Provider-native Agent Vault,
Codex `.system`, and Gemini Antigravity HeroUI sources retained their declared
entry counts and passed native validation.

## Governing documents

The following documents were regenerated from `catalog/pack.json`:

- `README.md`
- `PACK.md`
- `AGENTS.md`
- `packs/joshka0/SOURCE_NOTES.md`

They now state the canonical/catalog/native/generated/history model, all seven
current install mappings, exact 26-package and provider counts, 115 owned
aliases plus six external records, five native exceptions, the Codex consumed
Agents-plus-Codex union, current router/consolidation decisions, and the blinded
paired-task rule for future language-profile triage. Retired composer, copied
bundle, provider snapshot, stale manifest, and removed source-path instructions
are absent.

The docs explicitly describe `providers/` as the current generated live
real-file delivery layer and as potentially transitional. They state that Phase
6 will separately test per-skill symlink distribution across all seven
consumers and that no adoption is assumed. The catalog, validator, rubric, and
membership governance therefore remain valid regardless of that future spike.

The exact pre-regeneration documents are preserved under
`history/rebuild-2026-07/phase-4/pre-regeneration/`.

## Catalog conformance

`reports/catalog/CATALOG-CONFORMS-2026-07-13.md` is the new current acceptance
record. It contains all 26 canonical membership rows, the provider/native count
matrix, collision evidence, A01–A35 dispositions, the Phase 3 preservation
handoff, and catalog-only A15/A19/A30/A31 evidence after composition.

The undated `reports/catalog/CATALOG-CONFORMS.md` is retained in place with an
explicit superseded/historical banner and link to the dated report. The pack
checker now selects the latest strictly dated `CATALOG-CONFORMS-YYYY-MM-DD.md`,
requires the undated report to point to it, requires a parseable slot claim, and
checks its membership bidirectionally. The boundary fixture mutates the dated
current report and still proves that retired membership is rejected.

This is the catalog-level acceptance step required by the `skill-authoring`
contract. No canonical skill body was edited in Phase 4, so new package archive
or package-only acceptance work was not required.

## Pre-commit gate

Both the active `.git/hooks/pre-commit` hook and its repository copy at
`bin/hooks/pre-commit` now run `bin/pack check` when any staged path is:

```text
shared/**
catalog/**
native/**
README.md
PACK.md
AGENTS.md
packs/joshka0/SOURCE_NOTES.md
```

The Kingfisher staged, redacted, medium-confidence scan remains the final hook
stage unchanged. Both hook files pass shell syntax validation, compare
byte-identically, and a no-Git regex fixture proves every governed class matches
while an unrelated report path does not.

## Final verification

The final `bin/pack check` result was:

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

Additional direct evidence:

- Node syntax passes for the changed parity checker and boundary fixture.
- Shell syntax passes for both hook copies.
- The hook copies are byte-identical.
- The seven-class hook trigger matrix passes without executing any Git command.
- `find . -type l -print` returns no output under the current Phase 4 model.
- No temporary render or atomic-stage path remains in the repository.

## A34-style preservation ledger

| Previous behavior or evidence | Disposition | Current owner / evidence |
| --- | --- | --- |
| Phase 3 live provider bytes | Replaced only after exact preview | 130-path allowlist classification with zero unexpected drift; displaced tree moved to Trash. |
| Canonical-to-provider parity | Completed | Fresh post-apply render has zero content/mode differences. |
| Four stale governing documents | Regenerated and originals preserved | Current root documents derive from catalog; originals are under Phase 4 history. |
| 2026-07-10 catalog report | Preserved as historical | Undated file has a superseded banner; dated 2026-07-13 report is current. |
| Fixed undated report dependency | Replaced | Checker selects and validates the latest dated report. |
| Shared-SKILL-only pre-commit validator | Strengthened | Full pack check triggers for shared, catalog, native, and all four governing docs. |
| Kingfisher secret gate | Kept | Existing staged redacted Kingfisher command remains the final hook stage. |
| Current generated provider delivery | Kept for Phases 4–5 | Docs identify it as potentially transitional pending the Phase 6 consumer spike. |

## Explicitly not done

- No Phase 5 history/estate consolidation, old-report index, loose/archive
  pointer work, Impeccable trim, or before/after estate count was started.
- No Phase 6 symlink-distribution experiment, consumer test, npx-skills layout,
  or `skills-lock.json` work was started.
- No home skill root was reconciled, no install apply was run, and no `$HOME`
  file or configuration was written.
- No canonical skill content or mirror content was edited in Phase 4.
- No Git command was run. No file was permanently deleted; retired documents
  were moved to dated history and displaced/generated temporary trees went to
  Trash.

PHASE 4: DONE
