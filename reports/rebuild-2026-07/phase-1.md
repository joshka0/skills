# Rebuild campaign — Phase 1 safe composer core

Date: 2026-07-12

## Verdict

Phase 1 is complete. `bin/pack` is the single active entrypoint for package and
catalog checking, pure rendering, atomic provider application, and install-root
reconciliation. The old entrypoints are preserved under dated history and were
not executed after retirement.

`bin/pack check` intentionally exits nonzero on catalog, content, snapshot, and
governing-document debt assigned to Phases 2–4. Its own package, secret,
composition, and regression gates pass. Treating those planned findings as
green in Phase 1 would violate the binding phase order.

## Delivered

| Surface | Phase 1 behavior |
| --- | --- |
| `bin/pack check` | Discovers every `shared/**/SKILL.md`, rejects misplaced packages, runs all 27 archetype validators, checks local links and repository symlinks, performs a redacted no-history Kingfisher scan over canonical and native composition inputs, validates manifest/overlay/provider/document semantics, checks effective consumer unions and derived routes, compares canonical/bundle/render/live/snapshot trees, and runs two scratch regression fixtures. |
| `bin/pack render` | Builds a complete provider tree below a retained temporary root. It never writes `providers/`; it preserves current file and directory modes and reports exact entry counts. |
| `bin/pack apply` | Requires an explicit allowlisted provider scope, builds and validates a complete sibling tree, compares it with live state, atomically exchanges the whole `providers/` root with Darwin `renamex_np(RENAME_SWAP)` or Linux `renameat2(RENAME_EXCHANGE)`, then moves the displaced tree to `/usr/bin/trash`. There is no non-atomic fallback. |
| `bin/pack install` | Previews by default and reconciles exactly seven allowlisted roots only with `--apply`; it honors `CODEX_HOME`, preserves replaced roots as timestamped backups, reads stale Codex overrides with paths redacted, and never writes a config file. |

Implementation is split behind the one public entrypoint so every script stays
within the normative 300-line / 24-KiB hard cap. The largest file is
`bin/lib/pack-common.mjs` at 299 lines / 13,520 bytes.

## Safety and completeness properties

- Provider and bundle tokens use fixed allowlists. Traversal, mixed `--all` and
  `--provider`, duplicate scopes, duplicate bundles, and empty bundle results
  fail before a candidate can be applied.
- Every bundle path segment is confinement-checked. Repository or composition
  symlinks are rejected before copying.
- Bundle basenames and frontmatter names are collision-failing. The old
  first-wins behavior and nested same-name sanitization are gone.
- Bundle entries must be present in the transitional manifest or the named
  provider-native allowlist.
- Codex `.system` must be a directory with its marker, at least one package,
  and only well-formed package children. Agents Agent Vault entries and Gemini
  Antigravity HeroUI entries are also required explicitly.
- Apply exchanges the complete `providers/` root, so partial-provider and
  partial-catalog live states are impossible. A post-commit Trash failure is
  reported as `APPLY COMMITTED / CLEANUP BLOCKED` with the recoverable stage
  path; it is never reported as a pre-mutation failure.
- Temporary cleanup and displaced live trees use `/usr/bin/trash`. No code in
  the new path uses a permanent deletion API.
- Render/live comparison includes exact file and directory modes. Canonical,
  bundle, and snapshot parity uses byte comparison, matching the repository's
  tracked-content contract.

## A34-style preservation ledger

| Previous delta or behavior | Disposition | New owner / evidence |
| --- | --- | --- |
| Codex-specific and generic composers | Merged | `bin/pack render` and `apply`; provider differences are explicit data, not separate control flow. |
| Seven supported providers | Kept and narrowed | Fixed allowlist: Agents, Claude, Codex, Droid, Factory, Gemini, Gemini Antigravity. OpenCode remains an unsupported preserved placeholder. |
| Default `core` and `--full` bundle selection | Kept | `render --all --full` produces the same reviewed current tree; empty auxiliary bundles cannot produce an empty overlay. |
| Codex `.system` preservation | Kept and strengthened | Preserved from the live native source with marker/child validation and collision checks. |
| Agents Agent Vault and Gemini Antigravity HeroUI entries | Kept and strengthened | Required provider-native members; missing or undeclared native entries fail. |
| Dry-run entry listing | Kept | Replaced by a complete retained temporary render with per-provider counts and a machine-readable `RENDER_ROOT`. |
| Duplicate bundle first-wins | Dropped | Any basename or frontmatter-name collision fails with both origins. |
| Nested same-name copy removal | Dropped | Corrupt nested input fails; no content is silently removed. |
| Live overlay clearing before replacement | Dropped | Complete-root atomic exchange is the only mutation path. |
| Permanent temp/live cleanup | Dropped | Candidates and displaced trees go to macOS Trash. |
| Root-sync preview/apply and backups | Kept and merged | `bin/pack install`; `CODEX_HOME` now controls the Codex root. |
| Silent stale host overrides | Strengthened | Both install modes report stale override names/ranges without exposing paths or changing config. |
| Per-provider-only validation | Strengthened | The transitional Codex consumer union validates Agents + Codex together and currently reports all 19 duplicate names. Phase 2 moves this model into `catalog/pack.json`. |
| Existing package validator and Kingfisher posture | Kept and strengthened | All 27 archetype checks run from discovered canonical packages; secret scanning covers shared, versioned home config, bundles, Codex native system input, scripts, manifests, and governing docs. |

The superseded scripts are preserved unchanged at
`history/rebuild-2026-07/phase-1/retired-bin/`. Their unsafe behavior remains
auditable history, not an active command path.

## Verification evidence

### Static and independent review

- Node syntax checks passed for `bin/pack` and every `.mjs` support file.
- The Python exchange helper parsed successfully and was executed by both the
  safety fixture and the end-to-end apply fixture.
- Every active script is below 300 lines and 24 KiB.
- `find . -type l -print` returned no output.
- Two independent read-only blocker passes over composition/check and one over
  install reported no remaining Phase 1 blockers after hardening.

### Render and live-state rail

`bin/pack render --all --full` returned:

```text
agents 22
claude 26
codex 21
droid 20
factory 20
gemini 20
gemini-antigravity 22
```

An exact content-and-mode tree comparison returned `[]`. The full-bundle
preview therefore matches `providers/` without writing it. The provider content
checksum was identical before and after Phase 1:

```text
57428da07446b936405c89edc1518f7f8a8829af5dd557fd1720a50f75a121f3
```

### Guard and mutation fixtures

- `render --provider ../outside` failed as not allowlisted.
- `render --provider codex --bundles core,core` failed on bundle collision.
- `render --provider codex --bundles release` failed because it would produce
  an empty authored overlay.
- A scratch bundle with the same package in `core` and `release` failed before
  rendering and named both origins.
- A scratch `apply --provider droid` exchanged an old one-package provider tree
  for a new one atomically, moved the old tree to Trash, and left no stage path.
- A scratch `install --apply` created seven links, moved an existing wrong root
  to a timestamped backup, and wrote no config.
- The built-in composer fixture passes replacement, collision, ancestor-symlink,
  malformed-native, atomic-success, and atomic-failure cases.
- The recursion-guarded nested check fixture passes expected failures for
  canonical shape/membership, a generated redacted native-input secret,
  overlay fields, effective-union duplication, a multi-edge route cycle, and
  bidirectional catalog/document membership.

### Current `check` result

The final command returned:

```text
PASS package validators: 27/27
PASS legacy manifest validator
PASS local package links inspected: 100
PASS no repo-internal symlinks
PASS secret scan: 0 findings across 942 blobs
PASS safe composer fixture: confinement, collision, native shape, atomic success/failure
PASS check boundary fixture: canonical, secret, overlay, union, route, and docs failures detected
WARN caveman has weak routing clarity in SKILL.md
SUMMARY errors=86 warnings=1
CHECK: FAIL
```

The 86 errors are current debt, not suppressed Phase 1 failures:

- 3 stale manifest descriptions;
- stale overlay canonical/profile/Claude counts;
- 19 duplicate names in the effective Codex union;
- the known Codex provider/snapshot drift;
- the unresolved Chrome router/child split and two `local-secrets` handoffs;
- stale counts, membership, rubric ownership, native classification, retired
  commands, and retired paths in governing docs.

Those findings map directly to the binding Phase 2 catalog, Phase 3 content,
and Phase 4 regeneration/documentation work.

## Host override proposal (NOT APPLIED)

Target: `${CODEX_HOME:-$HOME/.codex}/config.toml`

`bin/pack install` found all seven real install roots already correct. It read
26 disabled `[[skills.config]]` blocks and reported 18 whose path is missing:

| Lines | Name | Lines | Name |
| ---: | --- | ---: | --- |
| 335–337 | `agent-ci` | 339–341 | `caveman` |
| 343–345 | `chrome-extension-builder` | 347–349 | `code-quality` |
| 355–357 | `diagnose` | 359–361 | `git-guardrails-claude-code` |
| 363–365 | `grill-me` | 367–369 | `grill-with-docs` |
| 371–373 | `hard-cut` | 375–377 | `improve-codebase-architecture` |
| 391–393 | `maestri-portal` | 395–397 | `plan-build` |
| 399–401 | `planning-workflow` | 419–421 | `semantic-commenting` |
| 423–425 | `setup-matt-pocock-skills` | 427–429 | `setup-pre-commit` |
| 431–433 | `userinterface-wiki` | 435–437 | `zoom-out` |

Proposed schematic removal, repeated for only those 18 names:

```diff
-[[skills.config]]
-path = "<redacted missing path: NAME>"
-enabled = false
```

The 8 blocks whose paths still exist are intentionally excluded from this
proposal. No `$HOME` path or config was changed.

## Explicitly not done

- No Phase 2 `catalog/pack.json`, consumed-root model, bundle retirement, or
  providers-current replacement was started.
- No Phase 3 skill content, Chrome/product merge, `local-secrets` ownership,
  Trash-language sweep, crew repair, rubric ownership, or description sync was
  started.
- No live provider apply was run; `providers/` and `providers-current/` were not
  changed.
- No Phase 4 governing-doc or pre-commit update was made. Existing references
  to retired commands remain visible check failures until that phase.
- No Phase 5 estate/history/mirror cleanup was started beyond the Phase 1 move
  explicitly required for the three superseded entrypoints.
- No `$HOME` config was written, no real install apply was run, and no Git
  command was run.

PHASE 1: DONE
