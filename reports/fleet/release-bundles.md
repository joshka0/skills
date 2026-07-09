# Fleet revision — release-bundles

## Verdict

**PACKAGE-CONFORMS.** The defective 21-target router is replaced with one eight-mode release-readiness suite. The 21 Apple/Android mirror bodies were read as import evidence only; they are not runtime targets, are not copied into the suite, and retain no active routing role.

## Result

- Canonical home: `shared/general/release-bundles`
- Archetype: mode suite with `production-overview`, `binary-build`, `testing-quality`, `metadata`, `privacy-safety-permissions`, `subscriptions-commerce`, `accessibility-rating-regulated`, and `submission-automation`.
- Platform model: Apple and Android are explicit inputs to every mode, not separate modes or child packages.
- Final package: 143 text lines / 12,077 bytes; active body: 55 lines / 4,133 bytes.
- Imported release corpus: 21 mirror bodies / 4,155 text lines; no body was edited, copied, or retained as a runtime target. The suite is 4,012 lines smaller than that replaced runtime surface.
- Revision snapshot: the current pre-rewrite 66-line active router is preserved under `archive/triage-2026-07/revision-pass/shared/general/release-bundles/`.
- Trigger-precision snapshot: the completed suite before its six-signal description correction is preserved under `archive/triage-2026-07/revision-pass/trigger-precision/shared/general/release-bundles/`.

## Collision matrix

| Phrase or artifact | First owner | Nearest competitor | Discriminator / precedence |
| --- | --- | --- | --- |
| App Store or Google Play ready/not-ready verdict | `release-bundles` → `production-overview` | `product-platform` | Store-release evidence, blockers, manual gates, and verdict belong here; application implementation remains with `product-platform`. |
| Release artifact, signing, version, update compatibility | `release-bundles` → `binary-build` | `product-platform` → `expo-platform` | This suite judges an existing release artifact; product-platform owns build-workflow design or SDK implementation changes. |
| TestFlight, Play testing track, crash/ANR, rollout pause | `release-bundles` → `testing-quality` | `code-quality` | Release-distributed build evidence and rollout response belong here; generic source failure diagnosis belongs to `code-quality`. |
| Store listing, screenshots, release notes, public links | `release-bundles` → `metadata` | `design-family` | Store accuracy/disclosure evidence is release work; visual/copy design outside a submission belongs to `design-family`. |
| Store data declaration, permission, AI/UGC report, consent, deletion | `release-bundles` → `privacy-safety-permissions` | `local-secrets` | Release declarations and product controls belong here; credential discovery/handling stays with `local-secrets`. |
| Subscription, IAP, digital good, paywall, entitlement recovery | `release-bundles` → `subscriptions-commerce` | `product-platform` | Store-release commerce evidence is distinct from application purchase implementation. |
| Accessibility, rating/audience, minors, regulated feature | `release-bundles` → `accessibility-rating-regulated` | `design-family` | Tested release/readiness and store declaration scope belong here; general UI design belongs to `design-family`. |
| Reviewer access, submission packet, store CLI/portal automation | `release-bundles` → `submission-automation` | `agent-orchestration` | This suite plans release-state evidence and explicit mutation approval; agent dispatch/transport remains `agent-orchestration`. |

## A34 preservation ledger

| Import evidence source | Category | Qualifying durable delta | Disposition |
| --- | --- | --- | --- |
| `apple-production-checklist` | overview | Risk-ranked verdict, blocker/launch-quality/operational distinction, evidence/fix/owner/verification row | Kept in `production-overview.md`; Apple-specific checklist and policy facts defer live. |
| `apple-build-binary-readiness` | binary | Actual binary evidence, capability/permission alignment, clean install/upgrade/denied-permission checks | Kept in `binary-build.md`; SDK, signing, entitlement, and CLI catalogs defer live. |
| `apple-testflight-release-readiness` | quality | Release-build core-flow evidence, crash/feedback triage, explicit decision on accepted risk | Kept in `testing-quality.md`; TestFlight state/API detail defers live. |
| `apple-metadata-storefront-readiness` | metadata | Submitted-build truthfulness, paid/AI claim disclosure, real assets and public links | Kept in `metadata.md`; field limits and asset rules defer live. |
| `apple-iap-subscription-readiness` | commerce | Product/catalog reconciliation, material paywall terms, restore/lifecycle/reviewer testing | Kept in `subscriptions-commerce.md`; current billing exceptions and portal mechanics defer live. |
| `apple-ai-privacy-safety-readiness` | privacy/safety | Data-flow evidence, pre-transmission consent, deletion/control, AI/UGC/minor escalation | Kept in `privacy-safety-permissions.md`; specific policy wording and provider details defer live. |
| `apple-accessibility-age-rating-readiness` | accessibility/rating | Tested accessibility behavior, non-color/non-audio alternatives, rating/content/control consistency | Kept in `accessibility-rating-regulated.md`; form/label criteria defer live. |
| `apple-submission-packet-readiness` | submission | Reproducible reviewer access, factual walkthrough/demo evidence, current-build packet verification | Kept in `submission-automation.md`; account details and portal steps defer live. |
| `apple-asc-cli-automation-bridge` | automation | Read-only first, dry-run/stage, explicit mutation approval, manual fallback, no approval guarantee | Kept in `submission-automation.md`; ASC command map and flags defer live. |
| `android-play-production-checklist` | overview | Platform-specific verdict evidence, blocker ownership, release readiness is more than upload success | Kept in `production-overview.md`; current Play policy watch list defers live. |
| `android-expo-eas-build-binary-readiness` | binary | Artifact identity, signing/identity/update compatibility, release-distributed build evidence | Kept in `binary-build.md`; Expo/EAS/Gradle configuration and commands defer live. |
| `android-play-quality-prelaunch-readiness` | quality | Device/core-flow QA, crash/ANR gate, staged rollout monitoring/pause/rollback ownership | Kept in `testing-quality.md`; thresholds and diagnostics portals defer live. |
| `android-play-store-listing-metadata-readiness` | metadata | Listing reflects real product, paid/AI disclosure, real assets, no secrets/personal data | Kept in `metadata.md`; asset dimensions and policy examples defer live. |
| `android-play-data-safety-permissions-readiness` | privacy/safety | Full data/SDK/backend inventory, declaration reconciliation, least privilege, just-in-time disclosure, deletion | Kept in `privacy-safety-permissions.md`; form fields and permission API detail defer live. |
| `android-play-iap-subscriptions-readiness` | commerce | Product classification, catalog/entitlement reconciliation, clear terms, lifecycle/recovery testing | Kept in `subscriptions-commerce.md`; current billing rule exceptions defer live. |
| `android-play-ai-ugc-safety-readiness` | privacy/safety | In-app report/flag, moderation loop, block controls, minor/high-risk safeguards, evidence walkthrough | Kept in `privacy-safety-permissions.md`; prohibited-content catalog defers live. |
| `android-play-accessibility-age-rating-readiness` | accessibility/rating | Audience/rating reality, minor protections, tested assistive behavior, store/product consistency | Kept in `accessibility-rating-regulated.md`; platform labels/tools defer live. |
| `android-play-testing-track-readiness` | quality | Test-track evidence, rollout gates, production-access uncertainty, accountable monitoring | Kept in `testing-quality.md`; tester counts/timing/track rules defer live. |
| `android-play-submission-packet-readiness` | submission | Reusable reviewer path, paid/gated access, factual demo, release-form completeness | Kept in `submission-automation.md`; portal form details defer live. |
| `android-play-console-eas-automation-bridge` | automation | Read-only evidence, internal/staged safety, explicit production approval, release identity/rollout record | Kept in `submission-automation.md`; tool/flag/profile catalog defers live. |
| `android-play-sensitive-category-readiness` | regulated | Restricted capability/category identification, eligibility evidence, legal/product ownership, stop on missing proof | Kept in `accessibility-rating-regulated.md`; category policy lists defer live. |

## A35 archive inventory

| Snapshot | Archive path | Text lines | Purpose |
| --- | --- | ---: | --- |
| Original fleet source | `archive/triage-2026-07/shared/general/release-bundles/` | 73 | Pre-fleet router original. |
| Revision-pass source | `archive/triage-2026-07/revision-pass/shared/general/release-bundles/` | 66 | Exact active router before this suite rewrite. |
| Trigger-precision source | `archive/triage-2026-07/revision-pass/trigger-precision/shared/general/release-bundles/` | 143 | Exact completed suite before the six-signal description correction. |

The 21 mirror bodies remain untouched under `mirrors/foxctl/external/`; they are import evidence, not touched canonical packages or runtime targets.

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The non-default delta is a durable release-evidence, safety, approval, and handoff contract that a generic mobile skill does not supply. |
| A02 | PASS | Store releases recur and need a bounded owner for evidence-driven readiness across Apple and Android. |
| A03 | PASS | Collision matrix separates release judgment from app implementation, generic diagnosis, design, secrets, and agent dispatch. |
| A04 | PASS | Exactly one mode suite. |
| A05 | PASS | Canonical directory and unique `name: release-bundles` match; validator confirms uniqueness. |
| A06 | PASS | Frontmatter contains only name and one-line description. |
| A07 | PASS | The two-sentence description is one physical line and 304 bytes, below the 320-character suite cap, with six grouped selection signals. |
| A08 | PASS | Description names the differentiated release-readiness capability and concrete store, track, metadata, privacy, commerce, rating, and automation signals. |
| A09 | PASS | Collision matrix assigns one first owner and discriminator for each claimed release surface. |
| A10 | PASS | No 21-name catalog, generic shipping claim, or implicit interaction mode remains. |
| A11 | PASS | `SKILL.md` is 55 lines / 4,133 bytes and validator passes suite limits. |
| A12 | PASS | Active body contains only route selection, platform input, precedence, shared workflow, durable rules, stops, and output. |
| A13 | PASS | Eight exact mode rows select one existing reference and require only that selected reference. |
| A14 | PASS | References are 11 lines each; package is 143 lines / 12,077 bytes, below all hard caps. |
| A15 | DEFERRED | Bundle/provider copies and intended default exposure are outside this revision scope. |
| A16 | PASS | Eight modes share one release-readiness lifecycle and use Apple/Android as data inputs rather than unrelated targets. |
| A17 | PASS | Distinct kebab-case routes map to exact references and select one by default. |
| A18 | N/A | This package is a suite, not a router. |
| A19 | N/A | This package is a suite, not a router. |
| A20 | PASS | Workflow requires repository release state, then live store/tool status/help, then primary documentation for volatile facts. |
| A21 | PASS | Store policy, CLI flags, portal steps, pricing, checklist manuals, and mirror path routing were removed from runtime instructions. |
| A22 | N/A | No volatile value is pinned as a pack constraint. |
| A23 | PASS | No credential-shaped content exists; active rules prohibit secret values in evidence or reviewer material. |
| A24 | PASS | The suite requires evidence/status and manual ownership, not secret discovery or value output. |
| A25 | PASS | No literal user-home path appears; validator portability check passes. |
| A26 | PASS | Unknown platform scope, missing evidence, and unavailable verification stop rather than permit a release guess. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets or provider metadata. |
| A29 | PASS | Evidence classification, platform separation, explicit approval, manual fallback, secret restraint, and rollout ownership protect real release failure modes. |
| A30 | DEFERRED | Canonical/bundle/provider parity awaits the explicitly excluded composition phase. |
| A31 | DEFERRED | Local routes and no-internal-symlink check pass; compose and installed-view checks await composition. |
| A32 | PASS | Compared against accepted pilot artifacts `reports/pilot/code-quality.md` (suite route/shared-rule/reference shape) and `reports/pilot/herdr.md` (compact evidence/stop/output discipline). Fable proposed one router with two Apple/Android reference targets; the explicit revision requirement supersedes that alternative with this mode suite. |
| A33 | PASS | 143 is strictly smaller than the 4,155-line 21-body release surface it replaces at runtime and below the 1,200-line consolidated-owner cap; no mirror prose was laundered into the suite. |
| A34 | PASS | Ledger classifies each of all 21 import bodies by durable category and exact retained reference or volatility drop. |
| A35 | PASS | The original fleet source, pre-suite router, and pre-trigger-correction suite are preserved under the required archive tree. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/release-bundles suite
PASS: shared/general/release-bundles (suite)
```
