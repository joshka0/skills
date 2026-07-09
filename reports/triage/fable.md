# Skill Triage — Fable (independent pass)

Date: 2026-07-09
Scope: all 85 SKILL.md under `shared/`. Bar: **a skill earns its slot only if it beats the model's defaults** — would a strong agent, unprompted, behave materially differently without it? Verdicts: KEEP / TRIM (keep, shrink to deltas) / MERGE-into-X / CUT (archive, remove from overlays). Usage evidence (terra's sweep) may demote KEEPs; noted where it matters.

## Scorecard

### claude/
- `peon-ping` — **KEEP**. Private tool config no model could know; tiny (57L).

### codex/
- `frontend-design` — **MERGE-into-design-suite**. Competes with impeccable/design-family/ui-* for the same trigger.
- `k8s-op` — **KEEP (suite root, infra)**. Ops checklists + safety posture beat defaults; absorb platform skill.
- `kubernetes-platform` — **MERGE-into-k8s-op**. Posture content belongs inside the op skill's references.
- `mobile-rn` — **MERGE-into-expo-platform**. Fourth skill competing for the RN/Expo trigger.
- `opentui` — **KEEP**. Niche library, weak model coverage, small and opinionated.
- `quality-gate` — **MERGE-into-code-quality**. Same territory as its review modes; one quality suite.
- `teach-context` — **TRIM**. Useful setup verb but generic; keep as a small mode of the infra suite or fold into CLAUDE.md-management.
- `terraform-op` — **KEEP (suite root, infra)**. Same rationale as k8s-op. Usage evidence may demote both to CUT if infra work is rare.
- `terraform-platform` — **MERGE-into-terraform-op**.
- `ui-audit` — **MERGE-into-design-suite**.
- `ui-critique` — **MERGE-into-design-suite**.
- `ui-improve` — **MERGE-into-design-suite**.
- `ui-tune` — **MERGE-into-design-suite**.

### general/ — private infrastructure (highest-value genre)
- `agent-orchestration` — **KEEP**. Router over private multi-agent tooling; recently authored.
- `herdr` — **KEEP**. Core private infra; powering this very workflow.
- `collaboration-protocol` — **KEEP**. Distinct (multi-agent convergence w/ ledger); complements goal-protocol.
- `codex-goal` — **KEEP**. Private Codex /goal machinery.
- `delta-brief` — **KEEP**. Small, sharp, non-default behavior.
- `local-dev` — **KEEP**. Private environment facts.
- `local-http-browser-use` — **KEEP**. Private bridge protocol.
- `gtr` — **TRIM**. Keep, but 216L for a CLI wrapper; compress to command reference.
- `git-guardrails-claude-code` — **TRIM**. Keep the hook payload; shrink prose.
- `maestri` — **KEEP pending usage**. Private tool; if terra's sweep shows zero invocations, CUT.
- `maestri-portal` — **MERGE-into-maestri**. One tool, one skill.
- `repoprompt-pro-review` — **TRIM pending usage**. Private workflow but 148L; cut if unused.
- `setup-pre-commit` — **KEEP**. Encodes preferred stack; small.
- `setup-matt-pocock-skills` — **CUT-candidate**. One-time setup for an imported pack; archive unless actively re-run.
- `skill-authoring` — **KEEP**. Core to this repo; becomes the home of the new rubric.
- `prototype` — **KEEP**. Sharp, distinct behavior (throwaway-prototype discipline).
- `riff-partner` — **KEEP**. Distinct register a model won't adopt by default.
- `grill-me` — **KEEP**. 10 lines, genuinely non-default behavior.
- `grill-with-docs` — **MERGE-into-grill-me**. Same verb, docs-updating mode.
- `zoom-out` — **KEEP**. 7-line user macro, `disable-model-invocation`, zero tax.
- `caveman` — **KEEP**. Novelty, but tiny and genuinely changes output.
- `diagnose` — **KEEP**. The reproduce→minimise→regression-test discipline beats default debugging.
- `zero-tech-debt` — **KEEP (TRIM)**. Distinct invocable stance; pairs with hard-cut.

### general/ — the goal/planning cluster (biggest consolidation target)
Nine skills compete for "turn intent into structured work": goal-council, code-council, goal-orchestrator, goal-protocol, plan-build, planning-workflow, six-phase-dev, codex-goal, collaboration-protocol.
- `goal-protocol` — **KEEP (suite root)**. Already self-describes as the umbrella over council/code/orchestrator; make that true structurally.
- `goal-council` — **MERGE-into-goal-protocol** (convergence phase reference).
- `code-council` — **MERGE-into-goal-protocol** (implementation-dossier phase).
- `goal-orchestrator` — **MERGE-into-goal-protocol** (ticketing/orchestration phase).
- `six-phase-dev` — **MERGE-into-goal-protocol**. Human-gated phasing is code-council's ancestor; keep as a strictness mode, not a peer skill.
- `plan-build` — **CUT**. 473L plan builder superseded by goal-protocol + codex-goal + native plan mode.
- `planning-workflow` — **MERGE-into-goal-protocol** (PRD/issue-slicing references).

### general/ — the quality cluster
- `code-quality` — **KEEP (suite root)**. Absorbs the rest.
- `ruthless-test-strategy` — **MERGE-into-code-quality**. Already shipped as its reference; standalone copy is duplication.
- `thermo-nuclear-code-quality-review` — **MERGE-into-code-quality** (strict-review mode).
- `improve-codebase-architecture` — **MERGE-into-code-quality** (architecture-deepening mode).

### general/ — framework mega-packs (22 slots)
- `effect-framework` + 7 sub-skills — **MERGE to 1**. Effect v4 is niche/fast-moving so the content earns its place, but 8 catalog slots don't; sub-skills become references of one skill.
- `elixir-lang` + 6 sub-skills — **MERGE to 1, CUT-candidate**. OTP idiom is well in-model; keep only opinionated deltas, and only if usage evidence shows Elixir work.
- `go-lang` + 6 sub-skills — **MERGE to 1, CUT-candidate**. Go is the most in-model language there is; most of this is prosaic.

### general/ — mobile/product cluster
- `expo-platform` — **KEEP (suite root, mobile)**.
- `building-native-ui` — **TRIM hard, fold under expo-platform**. 322L+14f of tutorial the docs MCPs serve fresher.
- `react-native-platform` — **TRIM hard, fold under expo-platform**. 47 reference files is a wiki, not a skill.
- `native-data-fetching` — **TRIM hard or CUT**. 507L, greedy trigger ("ANY network request"), mostly model-default knowledge.
- `uniwind` — **KEEP**. Private stack conventions; trim overlap with the uniwind MCP.
- `migrate-nativewind-to-uniwind` — **CUT (archive)**. 725L one-time migration; restore if a NativeWind repo resurfaces.
- `chrome-extension-builder` — **KEEP (TRIM)**. Encodes a private opinionated stack.
- `product-platform` — **CUT**. Meta-router made redundant once suites self-route.

### routers & bundles
- `design-family` — **KEEP (suite root, design)**. Single design entry absorbing frontend-design + ui-* + userinterface-wiki refs.
- `userinterface-wiki` — **MERGE-into-design-suite as reference layer**. 155 ref files must not be a standalone catalog slot.
- `infra-bundles` — **CUT**. Redundant once k8s-op/terraform-op self-route.
- `release-bundles` — **KEEP pending**. Release checklists are rare-but-critical insurance; NOTE: its 21 target skills don't exist under shared/ — resolve this inconsistency.

### variants/
- `legacy/delegate-codex-zellij-wording` — **CUT (archive)**. Legacy wording variant.
- `zellij/codex-swarm` — **CUT (archive)**. Superseded by herdr-based orchestration.
- `zellij/plan-build` — **CUT** (with plan-build).

## Tallies
KEEP ~32 · TRIM ~7 · MERGE ~33 · CUT ~13. Net effect: ~85 catalog slots → ~35–40, before usage-evidence demotions.

## Consolidation designs
1. **Goal suite** (9→2): `goal-protocol` (phases: converge → dossier → tickets → run, with six-phase strictness mode) + `collaboration-protocol` (multi-agent convergence). `codex-goal` stays under agent-orchestration.
2. **Quality suite** (5→1): `code-quality` with modes: tdd, ruthless-tests, strict-review (thermo-nuclear), quality-gate, architecture-deepening.
3. **Design suite** (7→1): one entry (design-family or impeccable) with audit/critique/improve/tune as modes; userinterface-wiki demoted to its reference layer.
4. **Mobile suite** (8→2): `expo-platform` (absorbs building-native-ui, react-native-platform, native-data-fetching deltas, mobile-rn) + `uniwind`.
5. **Language packs** (22→3): one skill each for effect/elixir/go, sub-skills as references; elixir and go are cut-candidates pending usage.
6. **Infra suite** (6→2): `k8s-op` + `terraform-op`, platforms absorbed, router cut.
7. **Router policy**: a router earns a slot only if it routes ≥3 sibling skills that stay separate; otherwise suites self-route via their own references.

## Structural notes (out of scorecard scope but load-bearing)
- Nothing is deleted: CUT = move to `archive/`, drop from overlays; one compose run restores.
- The `>`/`>-` folded descriptions render uselessly in tooling that greps frontmatter — the rubric should mandate single-line descriptions.
- 478 uncommitted changes in the tree must be committed to a clean baseline before any execution wave.
