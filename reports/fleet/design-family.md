# Fleet revision — design-family

## Verdict

**PACKAGE-CONFORMS.** This revision repairs A34 by re-mining every `userinterface-wiki` category. It retains only cross-framework, non-default interface invariants in the selected standards reference; Motion, Web Audio, CSS, font, and prefetch-library recipes remain archived with a category-specific reason. Bundle/provider composition remains excluded, so A15's catalog clause and A30–A31 are deferred.

## Result

- Canonical home: `shared/general/design-family`
- Archetype: consolidated three-mode suite: `build`, `review`, and `improve`.
- Active package: 87 text lines / 7,551 bytes; body: 47 lines / 2,811 bytes; four references: 40 lines / 4,740 bytes.
- Revision snapshot before this edit: `archive/triage-2026-07/revision-pass/shared/general/design-family/` (85 text lines / 6,865 bytes).
- Replaced original source set: 11,493 text lines; active-package reduction: 11,406 lines (99.2%).
- Validator: `PASS: shared/general/design-family (suite)`.
- Scope: only the canonical suite, its fleet report, and the revision snapshot changed; `bundles/`, `providers/`, `mirrors/`, and active `userinterface-wiki` sources remain untouched.

## Collision matrix

| Claimed phrase or artifact | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| `frontend design` | `design-family` → `build` | `product-platform` | This suite owns production-interface purpose, visual direction, hierarchy, and user-flow quality; Expo/RN, native API, and styling-adapter implementation belong to `product-platform`. |
| `UI audit` or `UI critique` | `design-family` → `review` | `code-quality` | Inspect interface semantics, hierarchy, states, interaction, and evidence here; source-code correctness or non-UI diagnosis belongs to `code-quality`. |
| `UI improve` or `UI tune` | `design-family` → `improve` | `product-platform` | Improve an existing production interface and its design system here; a platform implementation constraint hands off to `product-platform`. |
| `userinterface-wiki` guidance | `design-family` → selected mode + `standards` | archived catalog | The retained cross-framework rules apply only after a mode is selected; the 152-rule source is archive evidence and is never auto-loaded. |
| sound feedback, interruptible/gesture motion, measured layout, or input-aware prefetch | `design-family` → selected mode + `standards` | `product-platform` | This suite owns the user-facing accessibility and behavior invariant; platform/library APIs and implementation choices stay with `product-platform` and current primary docs. |
| Expo/RN/native API or styling adapter | `product-platform` | `design-family` | `product-platform` wins when the implementation surface determines the result; return here only for the interface decision. |
| throwaway UI variants | `prototype` | `design-family` | `prototype` wins for a disposable experiment; return here when a production interface direction is chosen. |

## A34 preservation ledger

### Former design-family sources

| Archived original | Qualifying non-default delta | Classification |
| --- | --- | --- |
| old `design-family` | One production-interface owner with ordered build/review/improve work and no broad child loading | Kept as the suite route and single-mode rule in `SKILL.md`. |
| old `design-family` | `teach-context` cross-family handoff | Dropped: it is an independently owned context workflow, not a production-interface mode. |
| old `design-family` `emil-design-eng.md` | Motion has purpose, respects reduced motion, and is evaluated for performance/input behavior | Kept in `SKILL.md` hard rules and `references/standards.md`; framework tutorial material remains archived. |
| `frontend-design` | Purpose/tone/differentiator, intentional direction, anti-template judgment, and real production states | Kept in `references/build.md` and the shared hard rules; typography/color/layout catalogs are generic or volatile implementation detail. |
| `ui-audit` | Evidence-led semantics, focus, accessibility, responsive behavior, theming, performance, prioritized findings, and no automatic fixes | Kept in `references/review.md` plus `standards.md`; exhaustive report templates and command placeholders are dropped. |
| `ui-critique` | Hierarchy, information architecture, affordance, brand fit, states, and direct high-impact feedback | Kept in `references/review.md`; director-persona framing and anti-pattern catalog are dropped as presentation rather than a durable contract. |
| `ui-improve` | Context before change, one named improvement axis, token/pattern alignment, real-world states, measured performance, and stable extraction | Kept in `references/improve.md`; eight detailed workflow manuals are generic or library-bound. |
| `ui-tune` | One dominant action, deliberate bolder/quieter/color/distill/delight/motion change, and no purposeless effects | Kept in `references/improve.md` and shared hard rules; numeric ratios, easing catalogs, and examples are static aesthetic prescriptions. |

### `userinterface-wiki` category inventory

| Archived category | Kept or merged delta | Specific disposition of every remaining rule family |
| --- | --- | --- |
| 1. Animation principles (`timing-`, `physics-`, `staging-`) | Motion purpose, feedback/state/spatial continuity, and performance posture are kept in `SKILL.md` hard rules and `standards.md`. | Exact duration, stagger, deformation, active-scale, focal-point, modal-dim, and layering prescriptions are static thresholds or context-specific visual choices; current implementation/performance evidence decides them. |
| 2. Timing functions (`spring-`, `easing-`, `duration-`, `none-`) | `none-keyboard-navigation` and `none-high-frequency` merge into `standards.md`; `spring-for-gestures`, `spring-for-interruptible`, and `spring-preserves-velocity` become the library-neutral rule to preserve current state and release velocity in user-driven or interruptible motion. | Spring parameters, easing names, duration ranges, linear-progress, and context-menu recipes are library-specific or frozen timing policy, so they remain live-doc decisions rather than pack constraints. |
| 3. Exit animations (`exit-`, `presence-`, `mode-`, `nested-`) | `presence-disable-interactions` is kept as the cross-framework rule to disable an exiting element's input. | AnimatePresence wrappers, hooks, props, modes, keys, and nested coordination are Motion API semantics; they require the installed library and current primary docs. |
| 4. CSS pseudo elements (`pseudo-`, `transition-`, `native-`) | No standalone delta survives. | Pseudo-element placement, View Transitions, and browser-native pseudo styling are CSS/browser implementation details or generic markup hygiene; they are not a pack-owned design invariant. |
| 5. Audio feedback (`a11y-`, `appropriate-`, `impl-`, `weight-`) | `a11y-visual-equivalent`, `a11y-toggle-setting`, `appropriate-no-high-frequency`, and `appropriate-no-decorative` merge into `standards.md`: sound never replaces visual state, users can turn it off, and typing/keyboard/decorative events stay silent. | Independent volume is product preference policy; reduced-motion is not a reliable sound-sensitivity proxy; confirmation/error/weight choices are product semantics; preload/replay/default-volume behavior is implementation detail. |
| 6. Sound synthesis (`context-`, `envelope-`, `design-`, `param-`) | No standalone delta survives. | AudioContext/node lifecycle, envelope behavior, oscillator/filter choices, and all parameter ranges are Web Audio API or numeric sound-design recipes, not cross-framework design policy. |
| 7. Morphing icons (`morphing-`) | Reduced-motion handling is already merged into `standards.md`. | Three-line/collapsed icon schemas, viewBox, group, rotation, stroke, and jump rules are one component architecture; decorative-SVG labeling is generic accessibility semantics governed by current standards. |
| 8. Container animation (`container-`) | `container-guard-initial-zero` and `container-use-resize-observer` merge into `standards.md`: never animate an initial zero/unknown measurement; use natural size until valid, then observe changes without render-loop reads. | Outer/inner div shape, callback refs, overflow, delay, and usage examples are framework/layout implementation choices, not a universal design contract. |
| 9. Laws of UX (`ux-`) | Progressive disclosure, one clear next action, real success/recovery states, and evidence-led performance remain in the shared body and selected mode references. | Named psychology-law tutorials, 32px/400ms/5–9/20% thresholds, feature prioritization, and grouping/styling recipes are generic design knowledge, frozen measurements, or product-specific research decisions. |
| 10. Predictive prefetching (`prefetch-`) | `prefetch-keyboard-tab`, `prefetch-touch-fallback`, `prefetch-not-everything`, and `prefetch-use-selectively` merge into `standards.md`: only evidence-justified intent prefetching, with keyboard-focus and touch-safe signals rather than pointer-only behavior. | Trajectory/hover claims, hit-slop values, viewport behavior, and Foresight/Next code are library- and traffic-policy-specific; `product-platform` owns the implementation. |
| 11. Typography (`type-`) | `type-tabular-nums-for-data` remains in `standards.md` for aligned numeric data. | OpenType settings, font synthesis/rendering, variable-font axes, wrapping, underline, fraction, and letter-spacing recipes depend on the actual font/browser and belong to current typography/CSS guidance. |
| 12. Visual design (`visual-`) | `visual-consistent-spacing-scale` remains in `standards.md`; the compositor-friendly motion posture also preserves the intent behind shadow-animation performance. | Radius, shadow, border, elevation, and button-anatomy recipes are subjective visual catalogs or CSS implementation detail; `build` selects a justified direction for the actual product. |
| `userinterface-wiki` attribution | MIT source attribution | Preserved in the exact original archive; this compact suite is an independent consolidation and does not copy the manual. |

## A35 archive inventory

| Original or snapshot | Archive path | Text lines |
| --- | --- | ---: |
| `design-family` original | `archive/triage-2026-07/shared/general/design-family` | 730 |
| `frontend-design` | `archive/triage-2026-07/shared/codex/frontend-design` | 938 |
| `ui-audit` | `archive/triage-2026-07/shared/codex/ui-audit` | 128 |
| `ui-critique` | `archive/triage-2026-07/shared/codex/ui-critique` | 118 |
| `ui-improve` | `archive/triage-2026-07/shared/codex/ui-improve` | 807 |
| `ui-tune` | `archive/triage-2026-07/shared/codex/ui-tune` | 522 |
| `userinterface-wiki` | `archive/triage-2026-07/shared/general/userinterface-wiki` | 8,250 |
| pre-revision `design-family` snapshot | `archive/triage-2026-07/revision-pass/shared/general/design-family` | 85 |
| **Original replacement total** |  | **11,493** |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The non-default delta is one production-interface owner with explicit anti-template, system-extraction, cross-input, dynamic-layout, and product/prototype boundaries. |
| A02 | PASS | Build, audit/critique, and improvement decisions recur across live product surfaces. |
| A03 | PASS | The collision matrix assigns interface decisions here and platform implementation or throwaway variants to named owners. |
| A04 | PASS | Exactly one archetype: a three-mode suite. |
| A05 | PASS | `shared/general/design-family` matches unique `name: design-family`; the validator checks canonical uniqueness. |
| A06 | PASS | Frontmatter has only the required name and one-line description. |
| A07 | PASS | The one-line, two-sentence description remains 188 bytes including quotes/newline, below the 320-character suite limit. |
| A08 | PASS | The description states the differentiated capability and preserves six metadata-visible legacy signals. |
| A09 | PASS | The collision matrix gives every claimed trigger a first owner, competitor, discriminator, and handoff. |
| A10 | PASS | No greedy trigger or implicit persona remains; production/prototype and platform boundaries are explicit. |
| A11 | PASS | `SKILL.md` is 47 lines / 2,811 bytes, below the suite limits. |
| A12 | PASS | The active body contains only routing, shared workflow, non-default rules, stops, output, and reference selection. |
| A13 | PASS | Three exact modes select one reference by default; `standards.md` has an explicit cross-mode condition for interaction, motion, accessibility, dynamic layout, input-aware prefetching, and data typography. |
| A14 | PASS | The four references are 9–13 lines; the active package is 87 lines / 7,551 bytes, with no scripts, assets, or metadata used to hide prose. |
| A15 | DEFERRED | Canonical former child sources are archived; bundle/provider parity and stale exposure are intentionally outside this revision scope. |
| A16 | PASS | Build, review, and improve share one production-interface lifecycle, vocabulary, evidence posture, and safety contract. |
| A17 | PASS | Three distinct kebab-case mode rows each select one exact reference by default. |
| A18 | N/A | This is a mode suite, not a router. |
| A19 | N/A | This is a mode suite, not a router. |
| A20 | PASS | Version-sensitive platform behavior is resolved from repository state, live tooling, then current primary documentation; the retained rules are library-neutral. |
| A21 | PASS | The active package has no copied Motion, Web Audio, CSS, font, browser, or prefetch-library manual. |
| A22 | N/A | No volatile value is pinned as a pack constraint. |
| A23 | PASS | No credential or secret-bearing content exists. |
| A24 | PASS | The package prescribes evidence and current standards checks, not secret discovery or value output. |
| A25 | PASS | All package paths are relative; no literal user home path exists. |
| A26 | PASS (N/A) | No machine-specific fact is stored; platform facts are checked live. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets or provider metadata. |
| A29 | PASS | Production/prototype, platform, evidence, motion, audio, cross-input, and no-unrequested-fix boundaries protect concrete failure modes without filler. |
| A30 | DEFERRED | Canonical/bundle/provider parity and family exposure await the excluded composition phase. |
| A31 | DEFERRED | Local references and the no-internal-symlink validator check pass; compose dry run and installed-view checks await composition. |
| A32 | PASS | The suite follows accepted pilot artifact `reports/pilot/code-quality.md` for compact route table, selected references, shared hard rules, explicit collisions, and preservation evidence, and checks `reports/pilot/herdr.md` for compact active/reference discipline; the rubric governs any difference. |
| A33 | PASS | 87 active lines is strictly smaller than 11,493 replaced original lines and below the 1,200-line consolidated-owner cap. |
| A34 | PASS | The former-source ledger and twelve-category `userinterface-wiki` inventory classify every qualifying delta as kept/merged or dropped with a specific generic, volatile, library-bound, or product-policy reason. |
| A35 | PASS | Exact originals and the pre-edit revision snapshot are present under the required archive trees. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/design-family suite
PASS: shared/general/design-family (suite)
```

## 2026-07-10 design-depth wiring revision

### Result

- Canonical package: `shared/general/design-family` remains a six-mode suite: `build`, `review`, `improve`, `impeccable-depth`, `motion`, and `apple-physicality`.
- Active body: 50 lines / 3,394 bytes. New selected references: `impeccable-depth.md` 13 lines / 2,215 bytes, `animation.md` 12 lines / 1,839 bytes, and `apple-design.md` 11 lines / 1,956 bytes.
- Final all-text package total: 126 lines / 14,385 bytes across seven references. The suite is eligible as a consolidated owner (the prior family plus Impeccable and four Emil sources), but remains below the ordinary 800-line / 64 KiB package cap; no 1,200-line exception is used.
- Validator: `PASS: shared/general/design-family (suite)`.
- Import provenance: `mirrors/impeccable/UPSTREAM.md` and `mirrors/emilkowalski/UPSTREAM.md` now state that these mirrors are import evidence only. No mirror path, upstream child package, hook, script, or API manual is a runtime target.

### Revision collision matrix

| Claimed phrase or artifact | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| `Impeccable`, high-craft web polish, or anti-generic visual direction | `design-family` → `impeccable-depth` | `prototype` / `product-platform` | This mode judges a real production surface's register, content, drift, and resilient interaction detail; a disposable visual experiment is `prototype`, and platform implementation is `product-platform`. |
| animation review, motion design, gesture feel, or a named motion effect | `design-family` → `motion` | `product-platform` / `code-quality` | This suite owns user-facing purpose, continuity, frequency, and motion review; installed animation APIs and non-UI performance diagnosis belong to the named competitor. |
| Apple-like sheet, drag, swipe, momentum, or material-depth interaction | `design-family` → `apple-physicality` | `product-platform` | Portable direct-manipulation, layer, origin, and feedback decisions live here; Apple HIG, SwiftUI/UIKit, RN, browser APIs, and physics values are live-discovered platform work. |
| UI audit or critique with material motion findings | `design-family` → `review` or `motion` | `code-quality` | The selected design mode reports interface evidence and priority; source correctness and a non-UI diagnosis remain with `code-quality`. |
| visible motion cue or gesture-only route | `design-family` → selected mode + `standards` | `product-platform` | The suite requires a visible default/alternative and continuous user-facing feedback; the platform owner chooses the implementation mechanism. |

The earlier product-platform and prototype collision rows remain in force. The six-mode table exposes the new user-facing signals in metadata; it does not expose the imported source packages.

### A34 preservation ledger — imported design depth

| Import evidence category | Qualifying durable delta | Disposition |
| --- | --- | --- |
| Impeccable register, brand/product distinction, scene, anchors, and reflex check | A real production surface needs an intentional register that rejects both category-default and predictable anti-default styling. | Kept: `references/impeccable-depth.md` steps 1–2. |
| Impeccable image-led content and system drift | Treat imagery as content; classify drift as missing token, reimplemented primitive, or conceptual/flow mismatch before changing it. | Kept: `references/impeccable-depth.md` steps 3–4. |
| Impeccable errors, empty states, undo/confirmation, gestures, overlays, and stress states | Specific recovery, visible alternative, clipping-safe overlay decision, and context/input/content extremes improve production resilience. | Kept: `references/impeccable-depth.md` steps 5–7; mechanism hands to `product-platform`. |
| Impeccable detector, hooks, live session, asset producer, setup, and fixed aesthetic catalogs | Provider-private tooling, scripts, static palette/type bans, numeric scales, CSS/browser recipes, and source-specific taste are not portable pack contract. | Dropped: nonportable tooling, subjective/frozen taste, or implementation policy. |
| `animation-vocabulary` | A compact intent-first vocabulary disambiguates origin-aware, continuity/shared-element, layout, direction-aware, stagger, rubber-banding, velocity-handoff, and interruptible requests. | Kept: `references/animation.md` step 2; exhaustive glossary and basic CSS terms dropped as generic catalog. |
| `apple-design` physicality | Causal continuous direct manipulation, progressive boundary resistance, source-anchored reversible paths, meaningful synchronized feedback, and comprehensible preference variants. | Kept/merged: `references/apple-design.md`; existing `standards.md` remains the owner for live-state/velocity, sound, and reduced-motion rules. |
| `apple-design` APIs, equations, materials recipes, typography values, and HIG/WWDC claims | These depend on platform, browser, product, library, or current policy. | Dropped: live platform implementation belongs to `product-platform` and current primary guidance. |
| `emil-design-eng` | Motion decision/removal discipline, visible-default reveal, origin awareness, fine-hover boundary, and real-device/slow-motion verification when feel is uncertain. | Kept/merged: `references/animation.md`, `references/apple-design.md`, and `standards.md`. |
| `emil-design-eng` fixed curves, durations, spring configuration, CSS/WAAPI/Framer recipes, and component anecdotes | Frozen timing/style policy and library/browser implementation are volatile or non-default only for a particular stack. | Dropped: resolve from installed project and current primary docs. |
| `review-animations` and `STANDARDS.md` | Review motion by purpose, frequency, input/a11y, interruption/state continuity, origin/spatial consistency, and evidence-led priority; reduce/remove before tuning. | Kept: `references/animation.md` steps 1, 4–6 and shared `standards.md`. |
| `review-animations` persona, forced report template, hard timing/scale thresholds, effect tables, and framework claims | Interaction ceremony, static visual prescriptions, and library-specific behavior do not clear the pack's durable-delta bar. | Dropped: generic, frozen, or library-bound. |

The twelve-category `userinterface-wiki` ledger above remains unchanged and higher-priority where it overlaps, including its no-typing/high-frequency sound boundary; the Impeccable delight suggestion to add typing sounds is rejected by that rule.

### Catalog and acceptance delta

| Item | Result | Evidence |
| --- | --- | --- |
| A07/A08 | PASS | The revised one-line 235-byte description exposes frontend design, audit/critique, improve/tune, animation review, Apple-like gestures, and Impeccable depth within the suite budget. |
| A13/A16/A17 | PASS | Six distinct mode rows route only to local selected references; `standards.md` retains its explicit cross-mode condition. |
| A14 | PASS | 126 all-text lines / 14,385 bytes; each new reference is 11–13 lines and no prose is hidden in scripts or assets. |
| A15 | PASS | New instructional prose exists only in the canonical design-family package and mechanical bundle/provider copies; mirrors are import evidence, not duplicate runtime references. |
| A19 | N/A | This is a suite, not a router; no Impeccable or Emil child package is exposed in any overlay. |
| A30 | PASS | The new design-family body and all seven bundle/provider copies were recursively byte-compared after composition. |
| A31 | PASS | All seven core dry runs matched the applied lists; provider/current snapshot parity, unique names, single-line descriptions, router XOR, retained coverage, and no repository symlink checks passed. |
| A32 | PASS | The six-mode body/reference split remains shaped by the accepted `reports/pilot/code-quality.md` suite example; `reports/pilot/herdr.md` remains the compact deferred-detail comparison. |
| A33 | PASS | The original 11,493-line consolidation evidence above remains applicable; imported mirrors are retained import evidence, not a fabricated replaced-package total. The current package is also below the normal cap. |
| A34 | PASS | This category-level ledger records every qualifying imported delta and a concrete keep/merge/drop disposition. |
| A35 | **SCOPE BLOCKER** | The pre-depth in-place package snapshot cannot be added: the explicit task scope excludes `archive/`. Existing archive rows above prove the prior fleet rewrite only; this additive revision does not claim a new A35 PASS. |

```text
$ bin/validate-skill.sh shared/general/design-family suite
PASS: shared/general/design-family (suite)
```
