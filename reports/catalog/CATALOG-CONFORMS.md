# Catalog conformance — 2026-07-10

## Verdict

**CATALOG-CONFORMS.** The seven supported live overlays are composed from the 26 retained canonical slots and only the documented provider-native exceptions. Catalog-only checklist items A15, A19, A30, and A31 now pass; the package reports remain historical evidence for the package-only phase.

## Composition policy

- `core` is the only populated bundle surface. Codex keeps empty `infra`, `release`, and `aliases` directories because its existing `--full` implementation enumerates them; they contain no entries.
- The 19 common canonical packages are exposed by every supported overlay. Claude additionally receives `caveman`, `git-guardrails-claude-code`, `grill-me`, `peon-ping`, and `riff-partner`.
- Claude is the only consumer of `disable-model-invocation`: the three interaction packages are not composed into non-Claude overlays, so no unsupported-key behavior is assumed.
- Codex exposes `chrome-extension-builder`; the other six profiles expose `product-platform`. This is the router/independently-triggerable-leaf profile split required by rubric section 7: no default overlay exposes both.
- `providers/codex-routed` is generated non-install output, not a live provider root or snapshot. Its old release children are not bundle entries and are not catalog exposure. `providers/opencode` remains an unsupported placeholder.

## Provider results

| Provider | Entries before | Entries after | Result |
| --- | ---: | ---: | --- |
| `agents` | 56 | 22 | PASS — 20 canonical entries plus `agent-vault-cli` and `agent-vault-http`. |
| `claude` | 61 | 25 | PASS — 24 general canonical entries except Chrome, plus Claude-only `peon-ping`. |
| `codex` | 46 | 21 | PASS — 20 canonical entries including Chrome, plus preserved `.system`. |
| `droid` | 31 | 20 | PASS — common catalog plus `product-platform`. |
| `factory` | 53 | 20 | PASS — common catalog plus `product-platform`. |
| `gemini` | 54 | 20 | PASS — common catalog plus `product-platform`. |
| `gemini-antigravity` | 52 | 22 | PASS — common catalog plus `product-platform` and two HeroUI native entries. |

`providers-current/` was refreshed from each matching live overlay and byte-compared after composition.

## Catalog-only checklist results

The table records the catalog result for each retained package. `N/A` under A19 is correct for non-router archetypes.

| Package | Exposed by | A15 | A19 | A30 | A31 |
| --- | --- | --- | --- | --- | --- |
| `agent-orchestration` | all seven | PASS | N/A | PASS | PASS |
| `caveman` | Claude | PASS | N/A | PASS | PASS |
| `chrome-extension-builder` | Codex | PASS | N/A | PASS | PASS |
| `code-quality` | all seven | PASS | N/A | PASS | PASS |
| `design-family` | all seven | PASS | N/A | PASS | PASS |
| `effect-framework` | all seven | PASS | N/A | PASS | PASS |
| `elixir-lang` | all seven | PASS | N/A | PASS | PASS |
| `git-guardrails-claude-code` | Claude | PASS | N/A | PASS | PASS |
| `go-lang` | all seven | PASS | N/A | PASS | PASS |
| `goal-protocol` | all seven | PASS | N/A | PASS | PASS |
| `grill-me` | Claude | PASS | N/A | PASS | PASS |
| `gtr` | all seven | PASS | N/A | PASS | PASS |
| `herdr` | all seven | PASS | N/A | PASS | PASS |
| `infra-bundles` | all seven | PASS | PASS — reference-only targets; no child package is co-exposed. | PASS | PASS |
| `local-dev` | all seven | PASS | N/A | PASS | PASS |
| `local-http-browser-use` | all seven | PASS | N/A | PASS | PASS |
| `maestri` | all seven | PASS | N/A | PASS | PASS |
| `planning-workflow` | all seven | PASS | N/A | PASS | PASS |
| `product-platform` | Agents, Claude, Droid, Factory, Gemini, Gemini Antigravity | PASS | PASS — its Chrome handoff resolves to the retained Codex profile; no one overlay exposes router and leaf together. | PASS | PASS |
| `prototype` | all seven | PASS | N/A | PASS | PASS |
| `release-bundles` | all seven | PASS | N/A | PASS | PASS |
| `repoprompt-pro-review` | all seven | PASS | N/A | PASS | PASS |
| `riff-partner` | Claude | PASS | N/A | PASS | PASS |
| `skill-authoring` | all seven | PASS | N/A | PASS | PASS |
| `uniwind` | all seven | PASS | N/A | PASS | PASS |
| `peon-ping` | Claude | PASS | N/A | PASS | PASS |

### A15 — no active duplicate/orphan exposure

Every populated bundle entry is either a byte-identical canonical package or a documented provider-native exception. Retired goal, quality, design, language, infra, product, planning, interaction, and 21-checklist release entries are absent from every composed overlay. The obsolete loose `providers/agents/gtr.md` disappeared during composition. The historical Agents `maestri` and `maestri-portal` exception copies were not restored: canonical `maestri` owns portal mode and `maestri-portal` is archive-only.

### A19 — router exposure

`infra-bundles` resolves only to selected local references. `product-platform` uses the documented profile split above: Chrome is the retained separately triggerable leaf in Codex, while the router is exposed in the other default profiles. This follows the rubric rule to keep hidden child packages out of the same default provider exposure; no provider has both `product-platform` and `chrome-extension-builder`.

### A30 — canonical/bundle/provider parity

All canonical entries in `bundles/*/core` and `providers/*` were recursively byte-compared against their `shared/` source. The only non-canonical entries are documented exceptions: Codex `.system`, Agents Agent Vault CLI/HTTP, and Gemini Antigravity HeroUI React Pro/design taste. The Agent Vault bundle copy has only its provider-native folded description normalized to one physical YAML line; its description text and instructional body are otherwise preserved.

### A31 — compose and installed-view checks

Both `core` and `--full` dry runs were inspected for every supported provider before apply. The applied top-level lists matched their reviewed dry runs. Post-apply checks verified unique frontmatter names per provider, single-line descriptions, approved top-level entries only, router XOR, canonical coverage, snapshot parity, canonical byte parity, and no repository-internal symlink.

## Provider-native and generated exceptions

| Surface | Disposition | Justification |
| --- | --- | --- |
| `providers/codex/.system` | kept | Provider-owned system surface; the Codex composer preserves it. |
| `providers/agents/agent-vault-cli`, `agent-vault-http` | kept | Real Agents credential-broker integration; included in its core bundle because the generic composer otherwise clears top-level native entries. |
| `providers/gemini-antigravity/heroui-react-pro`, `heroui-pro-design-taste` | kept | Required Gemini Antigravity provider-native surfaces; included in its core bundle for the same generic-compose reason. |
| historical Agents `maestri`, `maestri-portal` | not retained | The live overlay did not contain them; canonical `maestri` replaces the former and the latter is archived after its mode merge. |
| `providers/codex-routed` | excluded | Generated non-install output, including stale release children; not composed, counted, or snapshotted. |

## Method and evidence

1. Rebuilt each supported `bundles/<provider>/core` from canonical `shared/` bodies; removed stale bundle entries and left Codex's required auxiliary bundle directories empty.
2. Ran `bin/compose-codex-skills.sh --bundles core` and `--full`, plus `bin/compose-provider-skills.sh --provider <provider> --bundles core` and `--full` for the other six providers; inspected every resulting entry list before applying.
3. Applied the reviewed core bundle to each live provider, checking its exact top-level list immediately after each operation.
4. Refreshed `providers-current/` from the live overlays, then recursively compared each provider/snapshot pair.
5. Ran the catalog scans described in A15/A19/A30/A31, rebuilt `manifests/skills.jsonl` to the 26 canonical rows, reconciled aliases to retained owners, and refreshed `overlay-manifest.json`. `README.md` did not change because no mental-model path changed.
6. Updated the top of `reports/rubric/RUBRIC.md` to point to `shared/general/skill-authoring/references/` as the living contract as of 2026-07-10.

## Final validation evidence

```text
$ node scripts/validate-skills.mjs
Skills validation
- manifest rows: 26
- active skill names: 26
- errors: 0
- warnings: 1
  - WARN: caveman has weak routing clarity in SKILL.md
```

The validator warning is its pre-existing heuristic for an explicit interaction skill; it does not fail the command. `manifests/aliases.json` has 119 mappings, and every non-null canonical owner is one of the retained 26. `bin/validate-skill.sh` was rerun against all 26 canonical packages with their recorded archetypes: all 26 returned their literal `PASS:` line. The post-apply catalog scan and each live/snapshot recursive comparison also passed.
