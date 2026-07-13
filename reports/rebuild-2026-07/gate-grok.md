# Gate review (Grok, independent refutation) — 2026-07-13

Ground truth order followed:
1. Read `reports/rebuild-2026-07/fresh-eyes-review.md` (original 7 findings + trim table).
2. Read `reports/rebuild-2026-07/PLAN.md` (binding owner rulings + phases + rails).
3. All verification against live repo state (shared/, catalog/pack.json, providers/, bin/lib/*, native/, docs, bin/pack). Phase-*.md treated strictly as executor self-reports (in scope for refutation, never trusted as evidence). No git commands. No edits except this file.

Executed required commands:
- `bin/pack check` → CHECK: PASS (0 errors, 1 non-blocking WARN on caveman routing clarity). See detailed PASS lines below.
- `bin/pack render --all --profiles core` → succeeded, RENDER_ROOT temp, counts: agents=22, claude=26, codex=21, droid=20, factory=20, gemini=20, gemini-antigravity=22. Preview retained in /tmp (not inspected for mutation).

## Verification of 7 findings (direct evidence only)

1. Composers non-atomic + violate durable deletion + no allowlist + first-wins dups + path traversal.
   - Status: RESOLVED in implementation.
   - Evidence: `bin/pack` (cli) + `bin/lib/pack-cli.mjs:80` (render uses temp only), `90` (apply builds candidate then atomic), `bin/lib/pack-common.mjs:249` (`trash` only via `/usr/bin/trash`), `259` (`atomicExchange`), `210-220` (build copies only unselected from live, then composes selected), `70` (`assertConfinedPath` + realpath + no-symlink walk), `59` (assertNoSymlinks), `110` (validatePackageSource), `160` (collision check in compose: `if (origins.has(entry.name)) fail`), `pack-common.mjs:199` (origins.size==0 fails empty), `pack-cli.mjs:40` (PROVIDERS allowlist + duplicate scope fail), `55` (profile allowlist + collision fail). No `rm -rf`, no pre-replace live clear, no dry-run mutation of live. Old composers retired to `history/rebuild-2026-07/phase-1/retired-bin/`. Safety self-test (`pack-self-test.mjs:59-89`) covers confinement, collision, native marker, atomic success/failure. `pack check` runs the fixture and passes.

2. Effective catalog duplicated (Agents+Codex overlap); validation per-dir not union.
   - Status: RESOLVED.
   - Evidence: `catalog/pack.json:1649` (consumed_roots.codex.roots: agents + codex), `1659` (duplicate_policy: "allow-declared-identical-canonical"), `1660-1682` (exactly 20 declared_duplicate_skills list). Validation: `bin/lib/pack-catalog-check.mjs:99` (checkConsumers), `109` (scans both roots via providerPackages, computes actual dups), `119` (`!same(actual, declared)` errors), `120` (for each dup: `treeDiff(canonical path, provider copy, 1, false)` must be empty else error "differs in <provider>"). `pack check` output: "consumed-root unions validated, including declared Codex Agents+Codex overlap". Live verification: 20 exact name overlap between providers/agents/ and providers/codex/ (agent-orchestration ... uniwind), all match declared list; tree content identical for them (check passed). Other consumers "reject".

3. product-platform/Chrome routing split broken (router vs child exposure, catalog treated cross-profile as valid).
   - Status: RESOLVED (merge per ruling).
   - Evidence: No `chrome-extension-builder` dir or file in any `providers/*/`. `catalog/pack.json:1132` (`chrome-extension-builder` alias under product-platform, status "reference-or-mode", reason: "Browser-extension runtime ... are the browser-extension target of product-platform"). `shared/general/product-platform/SKILL.md:18` (table routes `browser-extension` to `references/browser-extension.md`; no chrome name). `shared/general/product-platform/references/browser-extension.md:1` (MV3, messages, isolation, permissions, storage, worker-restartable, hostile-page, narrow perms preserved/enhanced from archived original). `catalog/pack.json:1169` (product-platform in "core" for codex + all). Route validation now union-aware (`pack-catalog-check.mjs:39` exposures per consumer from both roots; "unresolved" or "co-exposed router+child" errors). No stale route to inactive chrome in active canonical text. Archived original at `history/rebuild-2026-07/phase-3/pre-rewrite/shared/general/chrome-extension-builder/SKILL.md`.

4. Green validation does not mean catalog current (stale overlay-manifest, counts, descriptions, validator ignores manifest/snapshot parity, pre-commit too narrow).
   - Status: MOSTLY RESOLVED; one gap remains (see blockers).
   - Evidence of fixes: `bin/pack check` runs `checkParity` → `checkCatalog` (shape, skills, native, provider membership, consumers, render-and-compare), `checkDocs` (PACK.md counts vs live readdir, dated CATALOG-CONFORMS-*.md superseding check + slot count + membership, rubric ownership, no retired command/path mentions, install mappings, native classification). `pack-parity.mjs:132` (checkRender: full build + `treeDiff` vs every live provider; errors on delta). `pack-catalog-check.mjs:89` (provider membership vs live readdir). `89` (catalog description sync: use_when[0] == frontmatter). Pre-commit: `bin/hooks/pre-commit:12` (triggers on shared/|catalog/|native/|README|PACK|AGENTS|packs/joshka0/SOURCE_NOTES + kingfisher). Dated report `reports/catalog/CATALOG-CONFORMS-2026-07-13.md:1` ("26 retained canonical slots", "supersedes CATALOG-CONFORMS.md", chrome alias note, consumer union note, render-and-compare PASS table). `CATALOG-CONFORMS.md` now points to dated. `pack check` output confirms 26/26, render parity, no docs-* errors. Manifests retired to history.

5. Too many physical copies (bundles/, providers-current/, 460 copies, 21-dir replication).
   - Status: RESOLVED.
   - Evidence: No `bundles/` or `providers-current/` at repo root. `history/rebuild-2026-07/phase-2/retired-bundles/` and `retired-provider-snapshot/` hold retired. `providers/` is sole generated layer (`catalog/README.md:10`, `README.md:9`). `bin/pack check` uses render-and-compare (no snapshot file). `pack-common.mjs:210` (build never writes providers/ except via apply atomic). Current replication is only the 7 live providers + 1 canonical source per skill.

6. Governing docs materially stale (PACK.md counts 30-53, AGENTS/packs describe removed shared/codex etc, circular rubric, old reports).
   - Status: RESOLVED for covered docs; see gap in blockers.
   - Evidence: `PACK.md:34-40` (correct current entries e.g. codex 21/20/1, agents 22). `README.md:9` (current model: shared/native/catalog/providers/history/bin/pack only). `AGENTS.md:20` (current model, 26 packages, chrome/local-secrets as aliases only). `packs/joshka0/SOURCE_NOTES.md:66` (26 canonical, correct alias list including chrome + local-secrets). `reports/catalog/CATALOG-CONFORMS-2026-07-13.md:25` (chrome alias, local-secrets alias, 26 slots). Rubric: `shared/general/skill-authoring/SKILL.md:8` ("four files under `references/` are the pack's single normative skill-design contract"; "historical reports never override"), `reports/rubric/RUBRIC.md:1` ("Status: historical as of 2026-07-13"; "not normative"; "single current contract is shared/general/skill-authoring/references/"). No mentions of removed shared/codex/variants, old composer sh, providers-current, overlay-manifest in the 4 checked governing docs (checkDocs + pre-commit enforce). `checkDocs` (`pack-parity.mjs:90`) explicitly errors on rubric ownership phrase or non-historical rubric header.

7. Live skill boundary defects (crew dupes + volatile, local-dev/release hand to inactive local-secrets, cleanup language, code-quality candidates, planning dupes).
   - Status: RESOLVED per rulings + updates.
   - Evidence: Crew standalone (`shared/general/crew/SKILL.md`). Fixes: memory conditional ("Write agent memory only when the user explicitly requests it and the active memory policy permits it" — lines 9,51,119); Trash-only + confirmation never legalizes git (`110`: "Confirmation, delegation, or an archive tag never authorizes permanent deletion, Git clean/reset..."; `118`: "do not delete branches or use destructive Git"). local-secrets: alias only (`catalog/pack.json:905`, "reference-or-mode", reason points to local-dev secrets mode). Handoffs updated: `shared/general/release-bundles/SKILL.md:31` ("Use `local-dev` secrets mode for a value-free local credential handoff"); `shared/general/local-dev/SKILL.md:20` (secrets mode table); `shared/general/local-dev/references/secrets.md:3` ("without exposing its value", "Pass variable names... never the value itself", "Ask for authorization"). Cleanup language sweep present in crew/gtr/herdr/local-dev/agent-orchestration (see hunt). Planning vs agent-orchestration: `planning-workflow` owns one-shot PRD/agent-brief (`references/agent-brief.md`); `agent-orchestration` owns live packets/delta-brief/GOAL_LEDGER handoff to goal-protocol (`agent-orchestration/SKILL.md:24-25`). No inactive local-secrets handoff in active text. `checkRoutes` validates all.

## Owner rulings verification (direct)

1. crew stays standalone (Trash-only, memory conditional, no git-legalizing confirmation).
   - Evidence: As in finding 7 above. `shared/general/crew/SKILL.md` (standalone, not merged). Fixes present at listed lines.

2. chrome-extension-builder merges into product-platform as routed reference (preservation ledger; catalog 27→26).
   - Evidence: catalog 26 skills (check: "26/26"); alias + browser-extension target + reference content as above. Archived pre-rewrite at history/.../chrome-extension-builder/. No physical chrome in live providers.

3. Language packs (effect/elixir/go) stay in default profiles. Record blinded method.
   - Evidence: All declare "core" for every provider in catalog. `catalog/README.md:40` ("Language packs remain in default profiles by owner ruling. The next proposal... must use blinded paired-task method"). `PACK.md:65` same. `catalog/pack.json:27` (profile_decisions.language_packs).

4. Full structural rebuild green-lit.
   - Evidence: Current structure matches target (shared + native + catalog + providers + history; single bin/pack; no bundles/providers-current as source).

## Hunt list (direct verification)

- composer safety+atomicity: IMPLEMENTED (see finding 1; atomic-swap.py:14 (darwin RENAME_SWAP), 21 (linux renameat2); confinement/collision/no-symlink/empty-fail all present and tested).
- consumer-union duplication modeled+validated: IMPLEMENTED (catalog consumed_roots + policy + declared list; checkConsumers does actual scan + declared match + byte-identical treeDiff vs canonical).
- chrome merge preserved extension contract: PRESERVED (alias + full content of MV3/worker/isolation/perm/message/storage/hostile-page rules in browser-extension.md; no physical package; routing table uses internal target; union exposure check active).
- local-secrets handoff actually safe: YES (alias only; all handoff prose points to `local-dev` secrets mode; secrets.md forbids value exposure, requires auth/names only; local-dev hard rules + Trash language).
- catalog vs live provider reality: MATCH (checkProviderMembership + render-and-compare + checkRender all pass; 26 canonical; native 5; live dir contents == catalogEntries(full) for all 7; run render matches live).
- docs actually regenerated and accurate: PARTIAL (4 main + dated report + SOURCE_NOTES + PACK/AGENTS/README clean and match 26 + structure + aliases; pre-commit + checkDocs cover them). Gap: packs/joshka0/README.md (see blockers).
- anything the rebuild BROKE that worked before: None found in core paths, validators, routing, atomic, unions, or content fidelity. Render parity and check pass. Overlap content byte-identical. No repo symlinks. Secret scan 0. Old terms only in history/ and non-gated historical reports.

## Attacks attempted (exhaustive; most failed to surface a break)

- Read bin/pack + all bin/lib/*.mjs + atomic-swap.py + self-tests + fixture: composer atomic/safe/confinement/allowlist/collision/Trash-only implemented; no old rm/clear paths live.
- Parsed + diffed catalog/pack.json consumed_roots + declared list vs live readdir + tree content: exact 20, policy+checks present and passing.
- Grepped + read all product-platform + browser-extension ref + catalog alias + providers ls (no chrome dir): merge + contract preserved.
- Read local-dev + secrets ref + release-bundles + catalog alias + handoff regex scan: all point to safe mode, no inactive local-secrets target.
- Ran bin/pack check + render core; inspected check output, re-ran ls on providers + /tmp render, diffed overlaps, read checkCatalog/checkDocs/checkConsumers/checkRender/checkProviderMembership: all pass; parity holds; counts match.
- Scanned checkDocs/docs list + pre-commit + pathPattern + PACK/AGENTS/README/SOURCE_NOTES + dated catalog report + rubric: regenerated, rubric ownership fixed, no retired paths/commands in gated docs, counts correct.
- Grepped shared/native for cleanup/destructive/confirmation phrases + "local-secrets" + "chrome-extension-builder": only "never"/"does not authorize"/Trash-only; no bad handoffs.
- Verified native sources exist + marker + .system shape; catalog native entries match.
- Inspected routeRelations + exposures + cycle detection + co-expose logic: union-aware now; no false inactive for internal targets.
- Checked packs/joshka0/README.md, home/, loose/, old reports: only packs/joshka0/README.md is stale (others historical or non-governing).
- Confirmed 26 SKILL.md canonical (find), no chrome, no bundles/providers-current at root, no internal symlinks (check pass).
- Simulated profile selection (core works, pure infra fails as documented empty-token, mixed core+infra works).
- Diffed sample canonical vs provider copies for dups: identical.
- Read phase self-reports only to extract claims for refutation (never used as positive evidence).
- All 7 findings + 4 rulings + full hunt list attacked with path/line + live execution + direct file reads.

One attack succeeded (see blockers).

## Blockers (gaps vs claims of full resolution)

1. `packs/joshka0/README.md` is materially stale and outside all regeneration/validation gates. It claims pre-rebuild state: bundles/ and providers-current/ as current sources of truth (lines 11-12,49,51), overlay-manifest.json (52), old provider counts (codex 53, agents 53, claude 51, factory 50, gemini 50, droid 30 — lines 35-41), archive/full-overlays and skills-final-set-audit as current (49-50). This doc is omitted from checkDocs (`pack-parity.mjs:92` only scans README/PACK/AGENTS/SOURCE_NOTES), from pre-commit trigger list, and from "governing docs" enforcement. Contradicts "docs actually regenerated and accurate", "green validation means current", and AGENTS.md:62 claim that check covers governing docs. (packs/joshka0/SOURCE_NOTES.md was updated correctly; this sibling was not.)
2. Catalog declares "infra"/"release"/"aliases" in profiles (catalog/pack.json:23-25) with no skills using them for membership; pure `--profiles infra` (or release/aliases) produces empty overlay fail ("selected profiles produce an empty agents overlay"). catalog/README acknowledges them as "stable CLI selection tokens", but this makes non-core profile selection non-functional for composition despite being exposed in CLI help and parseComposition. Minor inconsistency with "declarative catalog" completeness, though core/full remain usable and live matches core.

VERDICT: REJECTED
1. packs/joshka0/README.md materially stale and ungated (old counts, retired paths as current truth; not covered by checkDocs/pre-commit).
2. Non-core profile tokens (infra/release/aliases) produce empty-overlay failures on direct use despite being declared and CLI-accepted.

## Re-gate 2026-07-13 (blockers only)

Executor addressed the two blockers (per commit landing). Verified **only** the specified items against live state.

(1) packs/joshka0/README.md now states current truth (26 canonical, one selectable `core` profile, correct model with no bundles/providers-current/overlay-manifest as live truth, correct counts, core-only notes) **and** is inside both gates:
- checkDocs list in `bin/lib/pack-parity.mjs:92`: `const docs = ["README.md", "PACK.md", "AGENTS.md", "packs/joshka0/README.md", "packs/joshka0/SOURCE_NOTES.md"]`
- pre-commit trigger regex in `bin/hooks/pre-commit:12`: `packs/joshka0/(README|SOURCE_NOTES)\.md$`

(2) infra/release/aliases profile tokens are fully gone:
- `catalog/pack.json:21`: `"profiles": [ "core" ]` (only; no other profile tokens)
- CLI: `bin/lib/pack-cli.mjs:14-16` (help examples: `--profiles core|--full`), `20` (Selectable profiles: ${PROFILES.join}), `30` (default ["core"]); `bin/lib/pack-common.mjs:13` (PROFILES = selectableProfiles(CATALOG)); `bin/lib/pack-catalog.mjs:22` (selectableProfiles filters catalog.profiles to those used in skills/natives). `bin/pack render --profiles infra` now rejects with "ERROR: profile is not allowlisted: infra".
- Docs: PACK.md, README.md, AGENTS.md, catalog/README.md, packs/joshka0/README.md all describe only `core` as selectable profile (no infra/release/aliases tokens as profiles).
- `bin/pack check` (re-run 2026-07-13): CHECK: PASS (0 errors; same 1 WARN; full parity, unions, docs, composer self-tests pass).

No other files or behaviors inspected.

VERDICT: APPROVED