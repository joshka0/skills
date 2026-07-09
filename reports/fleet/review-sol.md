# Independent FLEET wave review

Date: 2026-07-10

Authority: the current `reports/rubric/RUBRIC.md`, including A34, A35, collision-matrix evidence, and the PACKAGE-versus-CATALOG conformance split. This review read all 24 reports under `reports/fleet/`, their canonical packages, relevant archived originals, and the declared archive paths. It did not read `reports/fleet/review-fable.md`, modify a skill, or use git.

## Result

| Verdict | Count |
| --- | ---: |
| **PACKAGE-CONFORMS confirmed** | **10** |
| **REVISE** | **11** |
| **CUT confirmed** | **3** |
| **Total** | **24** |

These are package-level verdicts only. No CATALOG-CONFORMS claim was reviewed because the reports consistently defer the bundle/provider/installed-view clauses of A15, A19, A30, and A31. All 21 retained canonical packages pass `bin/validate-skill.sh`; the revisions below are semantic ownership, preservation, or acceptance-evidence failures that the mechanical validator cannot detect.

## Per-package verdicts

| Package/report | Independent verdict | Reason |
| --- | --- | --- |
| `agent-orchestration` | **REVISE** | It overlaps `goal-protocol` on live wave execution, its `goal-handoff` compatibility mode does not share the live-dispatch lifecycle, and its A34 handoffs lose the general collaboration ledger and Codex goal-file contract. |
| `caveman` | **PACKAGE-CONFORMS** | Exact opt-in, persistent interaction shape, safety clarity exception, archive, and ledger are all proportionate and evidenced. |
| `chrome-extension-builder` | **REVISE** | The canonical extension contract is otherwise sound, but A32 cites the non-golden Go/infra pilots instead of either rubric-designated golden example. This is an acceptance-evidence revision, not a requested body expansion. |
| `design-family` | **REVISE** | The `userinterface-wiki` preservation ledger classifies a 152-rule source with an overbroad “manual/API detail” bucket and omits stable non-default rules that must be kept or individually rejected. |
| `effect-framework` | **REVISE** | The six-mode package and A34 ledger are substantively sound, but A32 uses the non-golden Go/infra pilots; PACKAGE-CONFORMS cannot be confirmed until comparison is rerun against the actual golden suite. |
| `elixir-lang` | **REVISE** | The BEAM-specific package and ledger are substantively sound, but its A32 evidence names the non-golden Go/infra pilots. |
| `git-guardrails-claude-code` | **PACKAGE-CONFORMS** | The deterministic hook, non-overwrite merge boundary, generic secret-safe output, smoke test, and archive evidence survive accurately. |
| `goal-protocol` | **REVISE** | Durable artifacts and council/dossier/six-phase gates survive, but the suite still dispatches live tickets and does not contain the Codex `/goal` file contract declared handed to it. |
| `gtr` | **PACKAGE-CONFORMS** | Tool-qualified triggers, live topology discovery, destructive-operation confirmation, and archived-delta classification are coherent. |
| `local-dev` | **PACKAGE-CONFORMS** | Manual inspection and a high-signal scan found zero credential values and zero literal hostnames, IPs, ports, URLs, device names, user-home paths, or other machine facts; all such state is discovered live or handed to `local-secrets`. |
| `local-http-browser-use` | **PACKAGE-CONFORMS** | Random ledger audit confirmed that observe-act-verify, authorization, sensitive-action consent, fresh refs, failure classes, and volatile endpoint removal match the archived source. |
| `maestri` | **PACKAGE-CONFORMS** | Participant-versus-terminal transport, note rename/edit behavior, portal refs, consent, and timeout recovery are retained without the CLI catalog. |
| `native-data-fetching` | **CUT** | The archived body is a greedy networking/tutorial/API bundle with no durable pack-owned invariant; the repository data boundary, `code-quality`, `local-secrets`, and `product-platform` are sufficient owners. |
| `peon-ping` | **REVISE** | Its ledger falsely says private hook/config location and toggle mechanics were kept, but the current body omits both the relative config/script topology and the toggle invocation. |
| `planning-workflow` | **REVISE** | The one-shot artifact boundary and reviewed-plan outcome are good, but the Zellij `plan-build` delta is classified as a future handoff rather than kept/merged/dropped as A34 requires. |
| `product-platform` | **REVISE** | The five-target router, native-data cut, and Uniwind boundary are substantively sound; A32 nevertheless cites non-golden Go/infra pilots, so its package acceptance report is incomplete. |
| `prototype` | **PACKAGE-CONFORMS** | The explicit throwaway-question boundary, two coherent modes, observable learning, cleanup, and archive ledger all hold. |
| `release-bundles` | **REVISE** | Terra correctly found the blocker: 21 targets violate A18. The mirror-path repair also does not create installed one-hop targets, so the current router is not a portable runtime design. |
| `repoprompt-pro-review` | **PACKAGE-CONFORMS** | Random ledger audit confirmed bounded selection, full-versus-slice policy, prompt/export evidence, tool exclusions, and removal of fixed host/tool syntax. |
| `riff-partner` | **PACKAGE-CONFORMS** | Exact invocation, grounded committed verdict, strongest-objection pass, artifact boundary, and single next move are preserved without the persona sprawl. |
| `setup-pre-commit` | **CUT** | The archived skill hard-codes Husky, lint-staged, Prettier, package-manager behavior, and auto-commit; repository convention should own all of it. |
| `skill-authoring` | **PACKAGE-CONFORMS** | The four selected references faithfully route the current rubric's existence, routing, volatility/safety, composition, A01–A35, and two-stage verdict contracts; no material divergent policy was found. |
| `uniwind` | **REVISE** | The actual house conventions survived and the API matrix was correctly deferred, but A32 cites non-golden Go/infra pilots rather than the rubric's designated example. This is an acceptance-evidence revision only. |
| `zoom-out` | **CUT** | The explicit request already contains the whole behavior; the archived body adds no persistent non-default contract. |

## 1. Three-owner boundary: goal, planning, and live orchestration

The intended boundary is defensible and should remain:

| Owner | Exclusive job |
| --- | --- |
| `goal-protocol` | Durable goal artifacts, phase gates, traceability, ticket/wave design, ledger state, verification, and handoff. |
| `planning-workflow` | One-shot PRDs, reviewed plans, issue artifacts, triage, AFK briefs, rejection records, and their setup records. |
| `agent-orchestration` | Live delegation, parallel dispatch, collaboration, stale-context updates, transport adaptation, review, and integration. |

The implementation crosses that boundary in two places.

First, `goal-protocol` says `agent-orchestration` owns live dispatch (`shared/general/goal-protocol/SKILL.md:25`), but its `orchestrate` route claims “execution” (`SKILL.md:17`) and its selected reference directly dispatches approved-wave tickets and integrates reports (`references/orchestration.md:3-10`). This is not merely a handoff record: both suites claim the live operation. Goal-protocol should end with approved, parent-traced packets and wave state; agent-orchestration should dispatch them and return evidence; goal-protocol should then update the ledger and gates.

Second, `agent-orchestration` retains `goal-handoff` as a mode (`shared/general/agent-orchestration/SKILL.md:18`) even though that reference performs no live agent work and immediately transfers ownership to `goal-protocol`. It therefore fails the shared-lifecycle test for a suite mode and makes `codex-goal` route through the wrong first owner. Move the metadata-visible legacy phrase to `goal-protocol`, restore the goal-file mechanics there, and remove the compatibility-only mode from agent-orchestration.

### Absorbed-delta audit

| Required delta | Result | Evidence |
| --- | --- | --- |
| Goal-council red-team gate | **KEPT** | `references/convergence.md` requires three substantive attacks or a reasoned none-found, strongest objection, invalidating test, blocking return, preserved dissent, and a lock standard. |
| Code-council dossier traceability | **KEPT** | `references/implementation-dossier.md` traces goal → feature/non-feature → behavior → structure/interface/test/location/invariant, preserves IDs/dissent, maps edit sites, spikes/reverts, and runs contract/blueprint/diff red teams. |
| Six-phase human gates | **KEPT** | `references/six-phase.md` stops after plan, structures, interfaces, TODO blast radius, trial/revert deviations, and invariants; human edits remain authoritative and shipping remains human-owned. |
| Collaboration-protocol ledger | **MISSING** | The archive requires `docs/collaboration/<slug>/COLLABORATION_LEDGER.md` when no goal exists, with a mutable snapshot and append-only decision, dissent, validation, and handoff logs. The report says this was handed to goal-protocol (`reports/fleet/agent-orchestration.md:40`), but goal-protocol only owns durable goals; current collaborate mode keeps only a “lightweight live decision record” (`references/collaborate.md:5`). Non-goal collaboration has lost its durable owner. |
| Delta-brief change/rule/what-stands contract | **KEPT** | `references/delta-brief.md` preserves durable-source-first, stale-recipient selection, change, old→new, invariant, exact redo area, what remains unchanged, and the source pointer. |
| Codex-goal file mechanics | **MISSING** | The report hands goal files and output shape to goal-protocol (`reports/fleet/agent-orchestration.md:47`), but current goal-protocol retains only eligibility, live-help lookup, and status persistence. It does not preserve the durable `GOAL.md` contract of objective/context/constraints/verification/stop/done fields or the file/start handoff. Volatile commands and flags should stay live-discovered; the file contract should not disappear with them. |
| Reviewed `plan-build` artifact | **KEPT** | `planning-workflow/references/reviewed-plan.md` preserves repository reconnaissance, saved artifact, exact file/ownership/test/error/migration/order content, categorized review, bounded revisions, and approval statuses. |
| Zellij `plan-build` adapter | **UNRESOLVED, A34 FAIL** | The report itself calls persistent session setup, Escape dismissal, carriage-return submission, input clear, screen-dump monitoring, and same-session revision injection a qualifying delta, then hands it to a “future optional” adapter (`reports/fleet/planning-workflow.md:40,55`). A34 permits kept, merged, or dropped with an existence-bar reason—not future ownership. Merge the still-durable subset into the mux adapter or explicitly drop it as volatile/nonessential. |

These defects make all three owner reports **REVISE**. The valuable councils, dossier traceability, human gates, reviewed-plan outcome, and delta brief should remain; the fix is a clean ownership transfer, not re-expansion into the archived catalog.

## 2. Design family, product platform, and Uniwind

### `design-family`: mining was too selective to satisfy A34

The compact production-interface suite is directionally right, and the seven rules in `references/standards.md` are useful. The ledger is not honest enough to prove that the 8,250-line source was mined rather than merely discarded. It classifies the remaining 152-rule corpus as framework/API detail and static thresholds (`reports/fleet/design-family.md:42`), but at least these stable, non-default rules are neither retained nor individually rejected:

- every audio cue has a visual equivalent (`archive/triage-2026-07/shared/general/userinterface-wiki/rules/a11y-visual-equivalent.md:9`);
- guard a dynamic container's initial zero measurement before animation (`archive/triage-2026-07/shared/general/userinterface-wiki/rules/container-guard-initial-zero.md`);
- preserve gesture velocity when choosing interruptible spring behavior (`archive/triage-2026-07/shared/general/userinterface-wiki/rules/spring-preserves-velocity.md:9`);
- related durable candidates include sound disable/high-frequency boundaries, interruptible-motion policy, and keyboard/touch prefetch fallbacks.

The correct repair is not to restore 152 rules. Build a category-level inventory, keep the few pack-worthy invariants, and give every other candidate a specific generic/volatile/library-bound reason. A blanket “manual/API” row cannot support A34 PASS.

### `product-platform`: canonical boundary is good; A32 is stale

The five surfaces are distinct enough for a router, the `native-data-fetching` cut is correct, `chrome-extension-builder` is a real direct leaf, and the description names that retained child. The package itself needs no content expansion from this review. Its report cannot claim PACKAGE-CONFORMS because A32 says it was compared with the Go suite and infra pilot (`reports/fleet/product-platform.md:94`), while the current rubric names only `herdr` and post-merge `code-quality` as golden examples (`reports/rubric/RUBRIC.md:488-493`). Re-run and record the correct comparison.

### `uniwind`: house conventions survived; API matrix correctly deferred

The rewrite kept the important pack decisions:

- inspect config, CSS entry, scanner/source paths, and generated output before component churn;
- keep utility candidates statically scanner-visible and use the repository's approved composition helper rather than interpolated fragments;
- keep semantic token coverage complete across themes and scope only deliberate subtree divergence;
- bind third-party props deliberately and treat non-style color props as a separate contract;
- defer wrappers, hooks, component props, Pro behavior, pricing, and integration matrices to the installed package, Uniwind MCP, or current primary docs.

That is an honest framework-megapack trim. The only revision is its stale A32 comparison (`reports/fleet/uniwind.md:79`), shared with `chrome-extension-builder`, `effect-framework`, `elixir-lang`, and `product-platform`. Those five otherwise sound packages should rerun A32 against the rubric's actual examples and update their reports; no tutorial restoration follows from this finding.

## 3. `local-dev`: Section 9 audit

**PACKAGE-CONFORMS confirmed.** The active package contains no credential, password, token value, key, secret URL, real login, literal hostname, IP address, port, local URL, device name, filesystem location, `/Users/...`, or `/home/...` path. It names only safe concepts and tool identifiers such as Portless and `local-secrets`.

The body explicitly hands secret retrieval to `local-secrets`, forbids storing/exposing/retrieving/copying credentials, discovers routes/hosts/ports/URLs/paths from config or status, and records no raw shell output in context mode. The four references follow the same policy. A high-signal credential/machine-literal scan returned no match, and manual reading found no disguised literal. A23–A26 are honest.

## 4. `skill-authoring`: rubric fidelity

**PACKAGE-CONFORMS confirmed.** The package is a progressive split of the current rubric rather than a materially divergent rewrite:

- `existence-and-ownership.md` carries the archetypes, five-part existence gate, cut/merge/trim decisions, and canonical-source model;
- `package-and-routing.md` carries one-line descriptions, six-signal collision rules, budgets, selected references, suites, and routers;
- `evidence-and-safety.md` carries volatility source order, secret/path/machine policy, scripts/assets, and operational/output discipline;
- `validation-and-acceptance.md` carries composition, the canonical validator invocation, A01–A35, collision/preservation/archive evidence, and PACKAGE-versus-CATALOG conformance.

The active body correctly says the four references form one contract and always requires validation before completion. Calling `bin/validate-skill.sh` instead of copying its implementation is faithful progressive disclosure because the repository script is the canonical deterministic operation. No rubric rule with a different outcome was found.

## 5. `release-bundles`: investigation and disposition

Terra's investigation is materially correct:

- the original `.routed/release/...` targets were dead;
- the source corpus has 21 distinct Apple/Android packages;
- 21 direct targets exceed A18's maximum of eight and cannot all be represented in compliant metadata;
- therefore the report correctly refuses PACKAGE-CONFORMS.

The “repair” should not be retained as the final design. `shared/general/release-bundles/references/skill-map.md:7-30` points into `mirrors/foxctl/external`, which proves source existence from the repository root but does not create one-hop installed provider targets. A composed provider copy cannot rely on the source-repository mirror tree as its runtime child catalog, and the 21-target cardinality remains unchanged.

**Disposition: REVISE `release-bundles` into one mode suite, not a 21-child router.** Use at most eight risk modes—for example production overview, binary/build, testing/quality, metadata, privacy/safety/permissions, subscriptions/commerce, accessibility/rating/regulated category, and submission/automation—with Apple/Android as an input dimension. Mine only durable evidence gates and handoff rules from the 21 imported bodies; resolve current store policy and CLI behavior from repository state, live stores/tools, and primary docs. Keep the mirrors as import/archive evidence, not runtime targets, and do not expose the 21 children by default.

## 6. Random remaining-leaf ledger check

The candidate set was `chrome-extension-builder`, `git-guardrails-claude-code`, `gtr`, `local-http-browser-use`, `peon-ping`, and `repoprompt-pro-review`. A randomized numeric sort selected:

| Selected leaf | Result |
| --- | --- |
| `local-http-browser-use` | **Ledger honest.** Current body retains visible observe-act-verify, fresh refs, authorized token path, sensitive/destructive confirmation, stale-ref recovery, screenshots-without-secrets, and removes only literal endpoint/tool catalogs. |
| `peon-ping` | **Ledger false; REVISE.** The archive's private facts are `${CLAUDE_CONFIG_DIR:-$HOME/.claude}/hooks/peon-ping/config.json`, `peon.sh toggle`, and `peon.sh packs list` (`archive/triage-2026-07/shared/claude/peon-ping/SKILL.md:13,20,33`). Current `shared/claude/peon-ping/SKILL.md:12` merely says to “confirm the hook script exists,” giving no relative location or invocation. The report's claim that location and toggle action were kept is false. Restore portable relative topology and live-help entrypoint, while keeping the static pack/category schema removed. |
| `repoprompt-pro-review` | **Ledger honest.** Current body keeps selection-only tooling, Context Builder/Oracle/send exclusions, whole-file versus slice strategy, token reduction loop, prompt contract, and export evidence while dropping copied JSON syntax and a fixed `/tmp` path. |

## 7. Cross-wave acceptance findings

### Mechanical validation and archives

- All 21 retained packages emit the reported PASS line from `bin/validate-skill.sh`.
- All archive paths named by the 24 reports exist, including in-place owners and absorbed siblings.
- `native-data-fetching`, `setup-pre-commit`, and `zoom-out` are absent from active `shared/` and present in the archive as reported.
- Mechanical PASS does not validate A09, A16 ownership coherence, A32 evidence, or A34 preservation; the failures in this review demonstrate that boundary.

### Systemic A32 defect

The current rubric requires comparison with its golden examples (`reports/rubric/RUBRIC.md:467,488-493`): `herdr` for a leaf/private-tool shape and post-merge `code-quality` for a suite shape. Five reports instead call Go and/or infra pilot packages golden:

- `chrome-extension-builder` (`reports/fleet/chrome-extension-builder.md:80`)
- `effect-framework` (`reports/fleet/effect-framework.md:90`)
- `elixir-lang` (`reports/fleet/elixir-lang.md:88`)
- `product-platform` (`reports/fleet/product-platform.md:94`)
- `uniwind` (`reports/fleet/uniwind.md:79`)

Because A32 is package-judgable and every package item must pass for PACKAGE-CONFORMS, all five are **REVISE**, even though no substantive body defect was found in this review. Re-run the comparison and record any actual differences; do not change content merely to mimic an example.

## Five worst defects

1. **The three-owner boundary is contradicted by execution:** `goal-protocol` directly dispatches/integrates approved waves while `agent-orchestration` claims live dispatch.
2. **A34 creates a preservation black hole:** the general `COLLABORATION_LEDGER.md` and durable Codex `/goal` file mechanics are declared handed to goal-protocol but do not exist there.
3. **`design-family` does not prove honest mining:** a blanket 152-rule discard leaves stable accessibility, motion, and dynamic-layout invariants unclassified.
4. **`release-bundles` is structurally invalid and non-portable:** 21 direct targets violate A18, and mirror source paths are not installed one-hop targets.
5. **`peon-ping` deleted its slot-justifying private topology while claiming it survived:** the current skill cannot locate or invoke the hook from its own contract.

## Required next pass

1. Repair the three-owner transfer and the two missing preserved contracts; resolve the planning adapter disposition.
2. Re-mine `userinterface-wiki` with a category-level A34 ledger and restore only selected durable deltas.
3. Restore portable peon-ping topology.
4. Replace release-bundles with the bounded mode-suite design.
5. Rerun A32 against the actual golden examples for the five evidence-only revisions, then repeat package acceptance before composition.
