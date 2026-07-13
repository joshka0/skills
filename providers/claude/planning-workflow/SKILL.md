---
name: planning-workflow
description: "Produce governed one-shot PRDs, reviewed plans, issue slices, and triage decisions. Use when the user requests a PRD, reviewed implementation plan, issue slicing, issue triage, or an AFK-ready issue brief."
---

# Planning Workflow

Own one-shot product and issue artifacts through an explicit review or maintainer-decision boundary. It does not own a durable goal lifecycle or live agent transport.

## Route

| Mode | Select when | Read |
| --- | --- | --- |
| `prd` | Current context needs a product requirements document | `references/prd.md` |
| `reviewed-plan` | A bounded implementation request needs a saved, strictly reviewed plan | `references/reviewed-plan.md` |
| `issues` | A PRD, spec, or reviewed plan needs independently grabbable slices or an AFK-ready issue brief | `references/issues.md` |
| `triage` | An incoming issue needs a configured classification, state recommendation, or public outcome | `references/triage.md` |

Select exactly one mode. Start with `prd` only when the request asks for a one-shot artifact but does not identify a more specific route. Combine modes only when the user explicitly asks for a product-to-issue sequence.

## Do not use when

- Work needs durable multi-session goals, phase gates, or a `GOAL_LEDGER.md`; `goal-protocol` owns that lifecycle.
- Work is live agent dispatch or wave execution without a one-shot artifact; `agent-orchestration` owns that transport.

## Workflow

1. Read the current request, relevant repository context, configured tracker vocabulary, and applicable domain documentation. Ask only for a missing decision that would materially change the selected artifact or public action.
2. If required tracker, label, or domain-document configuration is missing, state the exact missing record and preview the minimum proposed guidance; obtain explicit authorization before editing repository guidance or configuration. Do not infer a generic setup.
3. Select one mode and read only its reference. Resolve version-sensitive tracker/tool behavior from repository configuration, live help, then primary documentation.
4. Draft the artifact or recommendation with its evidence, scope, and decision boundary. Preview exact public text before publishing, labeling, closing, or recording a decision unless the maintainer supplied it.
5. Return the artifact status, any external action taken or awaiting approval, and the next maintainer decision.

## Hard rules

- Use actual configured tracker and label mappings; do not infer or create role names from a generic state machine.
- Do not put unstable file paths or line numbers in a PRD, issue slice, or agent brief; a reviewed plan may name paths verified during reconnaissance.
- Issue slices are end-to-end, independently verifiable, and explicit about AFK versus human input.
- Agent briefs define current/desired behavior, acceptance criteria, non-goals, and durable interfaces without conversation memory.
- A triage comment starts with the configured AI-triage disclaimer, and a public mutation remains previewed or explicitly authorized.
- Record out-of-scope decisions only after maintainer approval; distinguish a durable rejection from a temporary deferral.

## Stop conditions

- Stop for explicit authorization when tracker, label, or domain-document configuration must be added before a public planning/triage action.
- Stop for maintainer direction when classification, public wording, scope, or a rejection decision is materially unresolved.

## Output

Return the selected mode, artifact or recommendation, evidence and scope, public action status, and the next maintainer decision.
