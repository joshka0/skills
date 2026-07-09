# Fleet rewrite — design-family

## Verdict

**PACKAGE-CONFORMS.** `design-family` is now a three-mode production-interface suite: build, review, and improve. The five formerly visible Codex children and `userinterface-wiki` have been archived, not retained as canonical child sources. Catalog composition remains out of scope, so A15's bundle/provider clause, A30, and A31 are deferred.

## Result

- Canonical home: `shared/general/design-family`
- Archetype: consolidated mode suite with three modes.
- Final active body: 47 lines / 2,786 bytes; four references: 38 lines / 4,079 bytes; package: 85 text lines / 6,865 bytes.
- Replaced source set: 11,493 text lines; net shrink: 11,408 lines (99.3%).
- Validator: `PASS: shared/general/design-family (suite)`
- Composition status: `bundles/` and `providers/` were intentionally not edited or composed.

## Collision matrix

| Claimed phrase or artifact | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- |
| `frontend design` | `design-family` → `build` | `product-platform` | This suite owns production-interface purpose, visual direction, hierarchy, and user-flow quality; platform APIs, Expo/RN, native behavior, and styling-adapter choices belong to `product-platform`. |
| `UI audit` | `design-family` → `review` | `code-quality` | Review interface semantics, hierarchy, states, and interaction evidence here; source-code correctness or non-UI diagnosis belongs to `code-quality`. |
| `UI critique` | `design-family` → `review` | `prototype` | Critique an existing production surface here; a throwaway competing-layout experiment belongs to `prototype`. |
| `UI improve` | `design-family` → `improve` | `product-platform` | Improve an existing production interface and design system here; platform implementation constraints hand off to `product-platform`. |
| `UI tune` | `design-family` → `improve` | `prototype` | Tune one established production surface here; alternate variants intended only to answer one question belong to `prototype`. |
| `userinterface-wiki` guidance | `design-family` → selected mode + `standards` | archived 152-rule catalog | The compact selected standards apply to live interface work; the full catalog is archived and never auto-loaded. |
| Expo/RN/native API or styling adapter | `product-platform` | `design-family` | `product-platform` wins when implementation surface determines the result; return here only for the interface decision. |
| Throwaway UI variants | `prototype` | `design-family` | `prototype` wins for a disposable experiment; return here when a production interface direction is chosen. |

## A34 preservation ledger

| Archived original | Qualifying non-default delta | Classification |
| --- | --- | --- |
| old `design-family` | One design owner with ordered build/review/improve work and no broad child loading | Kept as the suite route and single-mode rule in `SKILL.md`. |
| old `design-family` | `teach-context` cross-family handoff | Dropped from this suite: it remains an independently owned out-of-scope context workflow, not a production-interface mode. |
| old `design-family` `emil-design-eng.md` | Motion has purpose, must respect reduced motion, and must be evaluated for performance/input behavior | Mined into `references/standards.md`; framework-specific animation tutorial material was archived. |
| `frontend-design` | Purpose/tone/differentiator, distinctive intentional direction, anti-template visual judgment, real production states | Kept in `references/build.md` and `SKILL.md` hard rules; typography/color/layout catalogs were dropped as generic or volatile detail. |
| `ui-audit` | Evidence-led audit of semantics, focus, accessibility, responsive behavior, theming, performance, and prioritized findings without automatic fixes | Kept in `references/review.md` plus `standards.md`; the exhaustive report template and command placeholders were dropped. |
| `ui-critique` | Hierarchy, information architecture, affordance, emotional/brand fit, states, and direct high-impact feedback | Kept in `references/review.md`; director persona framing and repeated anti-pattern catalog were dropped. |
| `ui-improve` | Context before change, one named improvement axis, token/pattern alignment, real-world states, measured performance, stable extraction | Kept in `references/improve.md`; eight detailed workflow manuals were dropped. |
| `ui-tune` | One dominant action, deliberate bolder/quieter/color/distill/delight/motion change, no purposeless effects | Kept in `references/improve.md` and hard rules; numeric ratios, easing catalogs, and examples were dropped. |
| `userinterface-wiki` | Instant keyboard navigation; reduced motion; non-interactive exiting elements; progressive disclosure; coherent spacing; tabular data figures; observer-based dynamic measurement | Kept as the seven compact rules in `references/standards.md`, mined from `none-keyboard-navigation`, `morphing-reduced-motion`, `presence-disable-interactions`, `ux-progressive-disclosure`, `visual-consistent-spacing-scale`, `type-tabular-nums-for-data`, and `container-use-resize-observer`. |
| `userinterface-wiki` | 152-rule cross-framework catalog, code examples, audio/sound synthesis, library-specific Motion patterns, static timing/size thresholds | Archived rather than retained: this is manual/API detail that should be checked against current tooling and primary standards when relevant. |
| `frontend-design` and `userinterface-wiki` attribution | Apache-2.0 and MIT source attribution | Preserved in the exact archived originals; new compact prose is an independent consolidation, not a copied manual. |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Non-default delta: a production-interface owner with explicit anti-template, system-extraction, standards, and product/prototype boundaries; it is more than generic frontend advice. |
| A02 | PASS | Build, audit/critique, and improvement work recur across live product surfaces and were explicitly retained as one pack family. |
| A03 | PASS | Collision matrix assigns production-interface work to this suite and platform implementation/throwaway variants to their named owners. |
| A04 | PASS | Exactly one archetype: a three-mode suite. |
| A05 | PASS | `shared/general/design-family` matches unique `name: design-family`; validator checks canonical uniqueness. |
| A06 | PASS | Minimal two-key frontmatter. |
| A07 | PASS | One physical-line, two-sentence description is 188 bytes including quotes/newline (<320). |
| A08 | PASS | Description states the differentiated capability and preserves six metadata-visible legacy signals. |
| A09 | PASS | Collision matrix gives first owner, competitor, discriminator, and handoff for all claimed signals. |
| A10 | PASS | No greedy claim or implicit persona; production/prototype and platform boundaries are explicit. |
| A11 | PASS | `SKILL.md` is 47 lines / 2,786 bytes and validator passes the suite tier. |
| A12 | PASS | Active body contains only mode selection, shared workflow, non-default rules, stops, output, and handoffs. |
| A13 | PASS | Three exact mode references resolve; `standards.md` has one explicit cross-mode selection condition and only selected guidance is loaded. |
| A14 | PASS | Every reference is 9–11 lines; package is 85 text lines / 6,865 bytes, with no scripts/assets/metadata used to hide prose. |
| A15 | DEFERRED | Canonical separately visible child sources were archived; bundle/provider parity and stale active copies are out of scope. |
| A16 | PASS | Build, review, and improve share a production-interface lifecycle, vocabulary, evidence posture, and safety contract. |
| A17 | PASS | Three distinct kebab-case route rows select exactly one reference by default. |
| A18 | N/A | Mode suite, not router. |
| A19 | N/A | Mode suite, not router. |
| A20 | PASS | Version-sensitive platform behavior follows repository state, live tooling, then current primary documentation. |
| A21 | PASS | No copied framework/API manual, static standard catalog, pricing, or large tutorial remains. |
| A22 | N/A | No pinned volatile pack constraint. |
| A23 | PASS | No credential or secret-bearing content exists. |
| A24 | PASS | The suite prescribes evidence and current standards checks, not secret discovery or value output. |
| A25 | PASS | No literal user home path; package paths are relative. |
| A26 | PASS (N/A) | No machine-specific fact is stored; platform facts are checked live. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets or provider metadata. |
| A29 | PASS | Production/prototype, platform, evidence, progressive-disclosure, motion, and no-unrequested-fix boundaries protect concrete failure modes without filler. |
| A30 | DEFERRED | Canonical/bundle/provider parity and family exposure await the excluded composition phase. |
| A31 | DEFERRED | Local links and no-internal-symlink check pass; compose dry run and installed-view checks await composition. |
| A32 | PASS | The suite follows the code-quality golden shape: compact route table, selected references, shared hard rules, explicit collisions, and preservation evidence. |
| A33 | PASS | 85 < 11,493 and the package is below the 1,200-line consolidated-owner cap. |
| A34 | PASS | Preservation ledger above accounts for each replaced package and every retained or dropped qualifying delta. |
| A35 | PASS | Exact originals of every touched source are archived before the new suite was created. |

## A35 archive inventory

| Original | Archive path | Text lines |
| --- | --- | ---: |
| `design-family` | `archive/triage-2026-07/shared/general/design-family` | 730 |
| `frontend-design` | `archive/triage-2026-07/shared/codex/frontend-design` | 938 |
| `ui-audit` | `archive/triage-2026-07/shared/codex/ui-audit` | 128 |
| `ui-critique` | `archive/triage-2026-07/shared/codex/ui-critique` | 118 |
| `ui-improve` | `archive/triage-2026-07/shared/codex/ui-improve` | 807 |
| `ui-tune` | `archive/triage-2026-07/shared/codex/ui-tune` | 522 |
| `userinterface-wiki` | `archive/triage-2026-07/shared/general/userinterface-wiki` | 8,250 |
| **Total** |  | **11,493** |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/design-family suite
PASS: shared/general/design-family (suite)
```
