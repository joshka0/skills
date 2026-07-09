# Skills Refactor Inventory

## Counts

- Total `SKILL.md`: 1298
- Source candidates: 81 (`shared/general`, `shared/codex`, `shared/claude`, plus 3 `shared/variants`)
- Active manifest rows: 75
- Generated/provider copies: 914
- Archive/history copies: 203
- Mirror/vendor copies: 90
- Routed copies: 0 under `.routed` after cleanup
- System-installed copies: 10
- Duplicate names: 198 across the whole repo, 0 inside the active manifest
- Broken references found: 0 validator errors

## Root Classification

| Root | Classification | Active source? | Reason |
|---|---|---:|---|
| `shared/general` | active-source / specialist-source | yes | Canonical provider-neutral authored skills and routers. |
| `shared/codex` | active-source / specialist-source | yes | Canonical Codex-oriented authored skills. |
| `shared/claude` | user-invocable-only / specialist-source | yes | Claude-specific authored source. |
| `shared/variants` | reference-only source variants | no | Preserves alternate wording and duplicate names; not active routing by default. |
| `mirrors` | vendor-source | no | Upstream/imported material; selected exposure should be explicit. |
| `archive` | archive-only | no | Historical inventory and legacy material. |
| `bundles` | generated-output | no | Bundle inputs and copied exposure surfaces. |
| `providers` | generated-output / system-installed | no | Active installed views, plus provider-owned `.system` skills. |
| `providers-current` | generated-output | no | Snapshot/parity material only. |
| `loose` | reference-only | no | Historical loose prompts and templates. |
| `packs` | reference-only | no | Pack notes and import decisions. |
| `reports` | reference-only | no | Audit and handoff reports. |

## Duplicate Skill Names

| Name | Paths | Recommended canonical home |
|---|---|---|
| `goal-protocol` / legacy goal suite | `shared/general/goal-protocol`, old suite source files, provider overlays, provider snapshots, bundles | `shared/general/goal-protocol`; `codex-goal`, `goal-council`, `code-council`, and `goal-orchestrator` are compatibility modes/aliases |
| `ruthless-test-strategy` | `shared/general/ruthless-test-strategy`, provider overlays, provider snapshots, bundles | `shared/general/ruthless-test-strategy`, with future consolidation under `code-quality` to review |
| `caveman` | `shared/general/caveman`, provider overlays, provider snapshots, bundles | `shared/general/caveman` |
| `diagnose` | `shared/general/diagnose`, provider overlays, provider snapshots, bundles | `shared/general/diagnose` |
| `design-family` | `shared/general/design-family`, provider overlays, provider snapshots, bundles | `shared/general/design-family` |
| `infra-bundles` | `shared/general/infra-bundles`, provider overlays, provider snapshots, bundles | `shared/general/infra-bundles` |
| `product-platform` | `shared/general/product-platform`, provider overlays, provider snapshots, bundles | `shared/general/product-platform` |
| `release-bundles` | `shared/general/release-bundles`, provider overlays, provider snapshots, bundles | `shared/general/release-bundles` |
| `semantic-commenting` | provider overlays and snapshots | Needs human review; no `shared/*` canonical source found in this pass. |
| `foxctl-*` | provider overlays, snapshots, and `mirrors/foxctl` | Keep as vendor-source unless explicitly promoted into the manifest. |

The active manifest has unique names. The repo-wide duplicate names are mostly
expected replication across `bundles`, `providers`, and `providers-current`.

## Nested Generated Copies

| Path | Problem | Likely cause | Proposed fix |
|---|---|---|---|
| `bundles/codex/core/chrome-extension-builder/chrome-extension-builder` | Nested same-name copy with matching parent `SKILL.md` | Generated output copied a skill directory into itself | Removed current copy; compose scripts now strip this shape in temp output. |
| `bundles/codex/core/code-quality/code-quality` | Nested same-name copy with matching parent `SKILL.md` | Generated output copied a skill directory into itself | Removed current copy; compose scripts now strip this shape in temp output. |
| `bundles/codex/core/plan-build/plan-build` | Nested same-name copy with matching parent `SKILL.md` | Generated output copied a skill directory into itself | Removed current copy; compose scripts now strip this shape in temp output. |
| `bundles/codex/core/planning-workflow/planning-workflow` | Nested same-name copy with matching parent `SKILL.md` | Generated output copied a skill directory into itself | Removed current copy; compose scripts now strip this shape in temp output. |
| `bundles/codex/core/userinterface-wiki/userinterface-wiki` | Nested same-name copy with matching parent `SKILL.md` | Generated output copied a skill directory into itself | Removed current copy; compose scripts now strip this shape in temp output. |
| `providers/codex/{chrome-extension-builder,code-quality,plan-build,planning-workflow,userinterface-wiki}/*` | Provider copy of the same nested duplicates | Provider overlay inherited bundle duplication | Removed current copies; future compose dry runs strip the nested copy before moving output. |

Post-cleanup validator result: no nested same-name generated copies found.

## Rule Corpora

| Path | Classification | Parent/router |
|---|---|---|
| `shared/general/userinterface-wiki/rules` | rule-corpus | `userinterface-wiki` |
| `shared/general/react-native-platform/source-rules` | rule-corpus | `react-native-platform` |
| `bundles/codex/core/userinterface-wiki/rules` | generated rule-corpus copy | `userinterface-wiki` |
| `providers/codex/userinterface-wiki/rules` | generated rule-corpus copy | `userinterface-wiki` |
| `providers/codex-routed/react-native-platform/source-rules` | generated rule-corpus copy | `react-native-platform` |
| `archive/original-inventory/skills/userinterface-wiki/rules` | archive-only rule-corpus | none |
| `archive/original-inventory/skills/vercel-react-native-skills/rules` | archive-only rule-corpus | none |
| `archive/legacy/vercel-react-native-skills/rules` | archive-only rule-corpus | none |

## Skills Needing Human Review

| Skill/path | Reason |
|---|---|
| `shared/variants/*` | Variant source roots duplicate active names and need variant-aware routing before entering active manifest. |
| `semantic-commenting` | Active provider copies exist, but no `shared/*` canonical source was found during this pass. |
| `foxctl-*` | Provider overlays expose these imported workflows, but the active manifest keeps `mirrors/*` out by default. Decide whether to explicitly promote selected foxctl skills. |
| `agent-ci` | Active provider copies exist without a `shared/*` canonical row in this manifest. |
| `hard-cut` | Provider copies exist; currently aliased to `zero-tech-debt` because no `shared/*` canonical source was found in this pass. |
| `tdd` | Provider copies exist; currently treated as a `code-quality` mode in aliases. |
| `local-dev` references | Contains allowlisted machine-local absolute paths; leave for local-secret workflow review. |
| Long skill descriptions | `release-bundles` and `six-phase-dev` exceed the compact-description warning threshold. |
