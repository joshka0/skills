# Fleet rewrite — release-bundles

## Verdict

**BLOCKED — `ROUTER-TARGET-CARDINALITY`.** The canonical router was mechanically repaired, but its source truth is 21 separately named direct checklist bodies. A router may target only three to eight substantial targets and must name retained children in its description; 21 names cannot fit the 320-character description cap. Splitting or re-owning the Apple/Android corpus needs a pack-architecture decision outside this workstream.

The repair preserves current routing behavior without importing child content: the canonical map now points at the actual imported bodies under `mirrors/foxctl/external`, rather than nonexistent `.routed/release` paths. The package is mechanically valid, but cannot receive `PACKAGE-CONFORMS` while A18 and A32 remain blocked.

## Result

- Canonical home: `shared/general/release-bundles`
- Archetype: router
- Final active body: 36 lines / 1,797 bytes; map: 30 lines / 2,588 bytes; package: 66 text lines / 4,385 bytes.
- Pre-rewrite package: 73 text lines / 4,144 bytes; net trim: 73 → 66 lines.
- Validator: `PASS: shared/general/release-bundles (router)`
- Catalog status: bundle/provider work is excluded by scope; A15's catalog clause, A19's overlay clause, A30, and A31 are **DEFERRED**.

## Investigation — exact child topology

The source map named 21 unique targets: nine Apple and twelve Android. Every name has matching `name:` frontmatter in both `mirrors/foxctl/external/<name>/SKILL.md` and `providers/codex-routed/release/<name>/SKILL.md`.

The original canonical paths, `.routed/release/<name>/SKILL.md`, existed for **0/21** names. No normal `bundles/*/release/<name>/SKILL.md` child exists (**0** total); all 21 Codex copies live only under `providers/codex-routed/release`. `reports/provider-generation-fix-report.md:21-26` records that `.routed` symlink handling was removed, and `:41-42` says `providers/codex-routed` is generated and excluded from active source routing.

| Target | Mirror source | Codex-routed copy | Original canonical `.routed` path | Normal release bundle child |
| --- | --- | --- | --- | --- |
| `apple-production-checklist` | yes | yes | no | no |
| `apple-build-binary-readiness` | yes | yes | no | no |
| `apple-testflight-release-readiness` | yes | yes | no | no |
| `apple-metadata-storefront-readiness` | yes | yes | no | no |
| `apple-iap-subscription-readiness` | yes | yes | no | no |
| `apple-ai-privacy-safety-readiness` | yes | yes | no | no |
| `apple-accessibility-age-rating-readiness` | yes | yes | no | no |
| `apple-submission-packet-readiness` | yes | yes | no | no |
| `apple-asc-cli-automation-bridge` | yes | yes | no | no |
| `android-play-production-checklist` | yes | yes | no | no |
| `android-expo-eas-build-binary-readiness` | yes | yes | no | no |
| `android-play-quality-prelaunch-readiness` | yes | yes | no | no |
| `android-play-store-listing-metadata-readiness` | yes | yes | no | no |
| `android-play-data-safety-permissions-readiness` | yes | yes | no | no |
| `android-play-iap-subscriptions-readiness` | yes | yes | no | no |
| `android-play-ai-ugc-safety-readiness` | yes | yes | no | no |
| `android-play-accessibility-age-rating-readiness` | yes | yes | no | no |
| `android-play-testing-track-readiness` | yes | yes | no | no |
| `android-play-submission-packet-readiness` | yes | yes | no | no |
| `android-play-console-eas-automation-bridge` | yes | yes | no | no |
| `android-play-sensitive-category-readiness` | yes | yes | no | no |

### Target-claim result

- **Names:** evidence-backed — 21/21 mirror and Codex-routed `name:` values match the source map names.
- **Original canonical paths:** not evidence-backed — 0/21 `.routed/release` paths existed.
- **Repaired canonical paths:** evidence-backed — 21/21 repo-relative `mirrors/foxctl/external/.../SKILL.md` paths resolve from the repository root.
- **Installed/default availability:** deferred/unproven — `providers/codex-routed` is excluded from active source routing, and no release child is present in a normal release bundle.
- **Router topology:** blocked — the 21 direct targets exceed the router maximum of eight and cannot all appear in a conforming description.

## Canonical repair

- Flattened the 893-byte folded description to a 208-byte, two-sentence, trigger-specific line.
- Preserved platform/risk selection, one-target loading, Expo/EAS handoff, evidence posture, and secret boundary.
- Replaced dead `.routed/release` map paths with the verified mirror sources; no child body was copied, moved, or edited.
- Added source-order, uncertainty, stop-condition, and output guidance required for volatile store work.

## Collision matrix

| Phrase or artifact | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| Apple App Store release | `release-bundles` | `product-platform` | Store-readiness and checklist selection belong here; Expo/RN implementation or build-workflow design belongs to `product-platform`. |
| Android Google Play release | `release-bundles` | `product-platform` | Google Play release evidence selects this router; native product implementation remains with `product-platform`. |
| TestFlight | `release-bundles` | `product-platform` | TestFlight readiness is a release surface, not an Expo/EAS workflow decision. |
| Play testing track | `release-bundles` | `product-platform` | A Play test-track/readiness decision selects this router; EAS build mechanics hand off only when that is the open decision. |
| Store submission or release metadata | `release-bundles` | `frontend-design` | Store-facing release material selects this router; product UI/copy design outside a store submission stays with the design owner. |
| Release automation | `release-bundles` | `product-platform` | Store/console automation mapping selects this router; Expo/EAS build workflow context follows the explicit `product-platform` handoff. |

## A34 preservation ledger

| Pre-rewrite qualifying delta | Classification | Final evidence |
| --- | --- | --- |
| Apple/Android platform and release-risk selection | Kept | `shared/general/release-bundles/SKILL.md:12-15`. |
| One matching checklist body rather than the entire corpus | Kept | `SKILL.md:14`; `references/skill-map.md:3`. |
| All 21 named Apple/Android checklist selections | Kept, with path repair | `references/skill-map.md:7-30` now names the verified mirror bodies. |
| Expo/EAS build-workflow handoff | Kept | `SKILL.md:15`. |
| Current-store/CLI, evidence, and secret posture | Kept and strengthened | `SKILL.md:19-27`. |
| 21-name description catalog | Dropped from frontmatter, retained in map | The 893-byte folded description violated the one-line/320-byte cap; retaining all 21 names in a router map preserves selection but exposes the A18 cardinality blocker. |
| Child checklist prose | Not imported | Bodies remain solely in `mirrors/foxctl/external`; this router contains only routing and safety policy. |

## Checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The non-default delta is exact routing to this pack's verified imported Apple/Android release corpus, which a model cannot infer. |
| A02 | PASS | The pack's progressive-disclosure model retains `release-bundles` as the release router; release readiness is a recurring platform capability. |
| A03 | PASS | Independently maintained imported checklist bodies justify a router rather than copying their content into `product-platform`; the target-count problem is recorded under A18. |
| A04 | PASS | The package is a router: it selects external checklist bodies and contributes only routing/safety policy. |
| A05 | PASS | `shared/general/release-bundles` matches unique `name: release-bundles`; validator checks canonical uniqueness. |
| A06 | PASS | Frontmatter is minimal: name plus one-line description. |
| A07 | PASS | Description is one physical line, two sentences, and 208 bytes including quotes/newline (<320). |
| A08 | PASS | Description has a concrete routing verb and ends with five observable release signals. |
| A09 | PASS | Collision matrix assigns first owner and handoff for every claimed release signal. |
| A10 | PASS | No generic bare plan/state/debug trigger, greedy claim, or implicit interaction mode remains. |
| A11 | PASS | `SKILL.md` is 36 lines / 1,797 bytes, below the router 80-line / 6 KiB cap; validator passes. |
| A12 | PASS | Active body contains only route selection, source order, safety, stops, output, and one cross-family handoff. |
| A13 | PASS | The selection condition covers platform/risk; the map says to read only a matching target and all 21 repo-relative paths resolve. |
| A14 | PASS | Map is 30 lines and package is 66 text lines / 4,385 bytes; no support-file prose hides outside these files. |
| A15 | DEFERRED (bundle/provider clause) | Canonical routing has no local duplicate, but bundle/provider parity and active child exposure are outside scope. |
| A16 | N/A | Router, not mode suite. |
| A17 | N/A | Router, not mode suite. |
| A18 | **BLOCKED — ROUTER-TARGET-CARDINALITY** | Map directly names 21 independently maintained child skills; rubric permits only three to eight targets and requires their names in router metadata. |
| A19 | DEFERRED (overlay clause) | One-hop canonical source paths resolve without a cycle; normal release bundles contain zero children and `providers/codex-routed` is excluded from active routing, so exposure cannot be passed here. |
| A20 | PASS | `SKILL.md:19-21` uses repository configuration, live store/CLI output, then current primary docs, and marks uncertainty. |
| A21 | PASS | The router contains no copied store manual, API matrix, pricing, or checklist body. |
| A22 | N/A | No pinned volatile pack constraint. |
| A23 | PASS | No credential-shaped value exists; secret values are prohibited from release evidence. |
| A24 | PASS | No secret discovery is prescribed; reporting is evidence/status based and redacts values by rule. |
| A25 | PASS | Only repo-relative mirror paths appear; no literal home path exists. |
| A26 | PASS (N/A) | No machine-specific fact is frozen; volatile state is live-checked. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets or provider metadata. |
| A29 | PASS | Exact-target selection, no-substitution, source-order, secret, uncertainty, and cross-platform stops protect real release failure modes. |
| A30 | DEFERRED | Canonical/bundle/provider parity and target exposure require the excluded composition phase. |
| A31 | DEFERRED | Local map paths and no-internal-symlink check pass; compose dry run and installed-view inspection await composition. |
| A32 | **BLOCKED** | Comparison with the compact router pilot shape confirms the unresolved 21-target cardinality and description-child-list conflict. |
| A33 | PASS | This trim is strictly smaller than its archived original (66 < 73) and below all caps. |
| A34 | PASS | Preservation ledger above accounts for all qualifying routing/safety deltas and records the frontmatter catalog drop. |
| A35 | PASS | Exact pre-rewrite `SKILL.md` and `references/skill-map.md` are archived under `archive/triage-2026-07/shared/general/release-bundles/`. |

## Archive inventory

| Original | Archive path | Text lines |
| --- | --- | ---: |
| `release-bundles/SKILL.md` | `archive/triage-2026-07/shared/general/release-bundles/SKILL.md` | 43 |
| `release-bundles/references/skill-map.md` | `archive/triage-2026-07/shared/general/release-bundles/references/skill-map.md` | 30 |
| **Total** |  | **73** |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/release-bundles router
PASS: shared/general/release-bundles (router)
```
