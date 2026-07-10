# Merged Triage — Fable ⊕ Sol ⊕ Terra evidence

Date: 2026-07-09. Inputs: `fable.md` (blind), `sol.md` (blind), `terra-usage.md` (transcript evidence).
Status: **awaiting user sign-off. Nothing has been moved, archived, or edited.**

## Evidence headline (terra)
Only 13 of 85 skills have any direct invocation record across all provider histories (Claude/Codex/Factory/Gemini). Top: `uniwind` 32, `maestri` 6, `caveman` 3, `riff-partner` 3, then a five-way tie at 2. Caveat: zeros mean *no structured evidence*, not proven non-use — implicit/description-triggered loads are invisible to the sweep. Usage is a tiebreaker, not a hammer.

## Where the two blind passes agreed (auto-accepted)
Both passes independently converged on the same architecture — strong signal it's right:

1. **Goal cluster collapses under `goal-protocol`** — goal-council, code-council, goal-orchestrator, six-phase-dev become phases/modes. `plan-build` dies as a standalone (both copies; terra also flagged its duplicate `name:`).
2. **Quality cluster collapses under `code-quality`** — ruthless-test-strategy, thermo-nuclear, quality-gate, improve-codebase-architecture, zero-tech-debt become modes; diagnose becomes the diagnose mode.
3. **Design cluster collapses under `design-family`** — frontend-design (trimmed, as the opinionated source), ui-audit/critique/improve/tune as modes, userinterface-wiki mined into a small reference layer (155 files → curated).
4. **Language packs 22 → 3** — one entry each for effect/elixir/go; sub-skills become references. Retain only opinionated deltas; live docs MCPs carry APIs.
5. **Mobile/product consolidation** — building-native-ui, mobile-rn, react-native-platform, expo-platform, migrate-nativewind fold into one product router; `native-data-fetching` **CUT** (greedy trigger, generic content).
6. **Infra 6 → 1** — one infra router; platform/op twins become references. Zero usage observed anywhere; full archive remains on the table.
7. **Private-infra skills keep their slots** — herdr, local-http-browser-use, peon-ping, maestri, repoprompt-pro-review, git-guardrails, gtr (trimmed), local-dev, skill-authoring, grill-me (absorbs grill-with-docs), prototype, delta-brief content survives.
8. **Variants die** — zellij codex-swarm/plan-build and legacy delegate wording archive; any transport detail worth keeping becomes an agent-orchestration reference.
9. **Overlay policy** — expose routers + precise private-tool skills, never routers *and* their children; single-line descriptions, one or two trigger-specific sentences.

## Disagreements, resolved with recommendation

| Skill | Fable | Sol | Evidence | Recommendation |
| --- | --- | --- | --- | --- |
| `planning-workflow` | merge into goal-protocol | keep as one-shot-artifact owner | 0 uses | **Adopt sol's three-owner design**: goal-protocol = durable lifecycle, planning-workflow = one-shot artifacts (PRD/issues/briefs), agent-orchestration = live dispatch. Crisper boundaries than my two-owner version. |
| `collaboration-protocol`, `delta-brief`, `codex-goal` | keep standalone | merge into agent-orchestration / goal-protocol | 0 uses | **Concede to sol** — they become modes; falls out of the three-owner design. |
| `uniwind` | keep standalone | merge into product-platform | **32 uses — #1 skill** | **Keep standalone (overrule sol).** Never merge away the most-used trigger in the pack; trim its API matrix to defer to the uniwind MCP. |
| `setup-pre-commit` | keep | cut | 0 uses | **Concede to sol — CUT.** Hard-coding husky/prettier + auto-commit is often wrong; a strong agent infers the repo's hook stack. |
| `opentui` | keep | merge into product-platform | 0 uses | **Lean sol — merge** as a routed child; content survives as reference. |
| `maestri-portal` | merge into maestri | keep separate | 0 uses (maestri itself: 6) | **Merge into maestri** — one tool, one skill; portal becomes a mode. |
| `infra-bundles` router | cut router, keep ops | keep router, merge ops | 0 uses across all 6 | **Sol's shape wins** (6→1). Open question for user: does infra work still happen at all? If not, archive the whole suite. |
| `zoom-out` | keep (7L macro) | cut | 0 uses | **CUT** — near-zero value either way; sol's right that the request itself carries the instruction. |
| `riff-partner`, `caveman` | keep as-is | trim to narrow opt-in triggers | 3 each, recent | **Keep, adopt sol's trigger-narrowing** so personas never fire implicitly. |
| `setup-matt-pocock-skills` | cut | merge into planning-workflow setup mode | 0 uses | **Sol's merge** — deterministic setup mode, brand trigger dies. |
| `go-lang` family | merge to 1, cut-candidate | merge to 1 | 0 uses ever | **Merge to 1 and flag for user**: if no Go work is coming, archive entirely. (`elixir-lang` used 2026-07-02 — keep its single entry.) |

## Security finding (sol, must-fix regardless of triage)
`local-dev` embeds **absolute user paths and login credentials/tokens** in the portable skill body. These move to a machine-profile file outside the pack during the rewrite. Flagging now; not waiting for the execution wave to plan it.

## Net result
~85 catalog slots → **~27–30 retained** (three-owner work system + code-quality + design-family + product router + 3 language entries + 1–2 infra/release routers + ~12 private-tool skills + opt-in interaction modes). Everything cut is archived, not deleted; one compose run restores.

## Execution preconditions (unchanged)
1. Commit the 478-file dirty tree to a clean baseline first.
2. Write the skill-design rubric (fable+sol converge; becomes the new `skill-authoring`) + 2 golden examples.
3. Terra pilots the rubric on 3–5 skills; review; then fleet over the survivors.
