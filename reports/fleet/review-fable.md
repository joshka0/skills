# Fleet review — Fable (spot-check pass)

Date: 2026-07-10. Targeted review of the high-risk fleet packages; written before reading sol's review. Sol carries the exhaustive pass.

## Spot-check results

| Package | Verdict | Notes |
| --- | --- | --- |
| `goal-protocol` | **PACKAGE-CONFORMS confirmed** | Five modes map the lifecycle cleanly; legacy invocations (/goal, /goal-council, /code-council, /goal-orchestrator, six-phase) survive in the description; traceable-parent-ID and human-gate rules preserved; explicit "Do not use when" handoffs to planning-workflow and agent-orchestration. |
| `agent-orchestration` | **PACKAGE-CONFORMS confirmed** | Six modes cover delegate/swarm/collaborate/delta-brief/goal-handoff/mux-adapter; supervisor-owns-integration and file-disjoint rules preserved; correct handoffs to herdr/maestri for private transport; delta-brief's durable-source-of-truth rule survives. |
| `local-dev` | **PASS on the security gate** | Zero credentials, zero tailnet identifiers, zero literal home paths (grep-verified). The proxy reference is now a 7-line connectivity-decision stub — acceptable under the rubric, though the hop-* alias names lost their last in-pack mention; they live in the machine profile now, which is the designed home. |
| `skill-authoring` | **PACKAGE-CONFORMS confirmed** | Faithful 4-reference split of the rubric with a mode table; validator wired as its script; correctly states references are normative, not advice. Divergence risk noted below. |
| `riff-partner`, `uniwind` | **Descriptions correct** | riff-partner narrowed to explicit invocation; uniwind kept house conventions with qualified triggers. |
| `release-bundles` | **Blocker legitimately reported** | Terra's investigation is solid: 21 children exist only as `mirrors/foxctl/external` bodies plus generated `providers/codex-routed` copies; the old router targeted dead `.routed/` paths. |

## Release-bundles disposition (proposal)

Keep one `release-bundles` router with **two reference targets** — `references/apple-release.md` and `references/android-release.md` — each a stage map pointing at the mirror bodies. Router→reference is one legal hop, cardinality drops from 21 to 2, no content import needed, and the mirrors stay canonical for the checklist bodies. Overlay exposure of the 21 `codex-routed` copies gets resolved at composition (they are generated output, not source).

## Standing risk to record

`skill-authoring`'s references are now a second copy of RUBRIC.md's content. Two normative sources will drift. Resolution for the composition phase: make `reports/rubric/RUBRIC.md` historical (pointer note at top) and declare `shared/general/skill-authoring/references/` the single living contract.

## Verdict

Fleet wave accepted from my side subject to sol's exhaustive pass; release-bundles gets the two-reference fix; skill-authoring/RUBRIC source-of-truth decision executes with composition.
