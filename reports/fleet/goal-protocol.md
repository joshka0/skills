# Fleet acceptance — goal-protocol

## Verdict

**PACKAGE-CONFORMS.** The canonical durable-goal suite passes every package-judgable item. A15's bundle/provider clause, A30, and A31 are **DEFERRED** because this fleet task forbids bundle and provider composition; A19 is not applicable to a suite.

## Result

- Canonical home: `shared/general/goal-protocol`
- Archetype: mode suite with five lifecycle modes: `converge`, `blueprint`, `six-phase`, `orchestrate`, and `ledger`.
- Final package: 110 text lines / 9,995 bytes.
- Archived originals: 2,905 text lines across seven pre-rewrite directories; active-package reduction: 2,795 lines.
- `goal-council`, `code-council`, `goal-orchestrator`, and `six-phase-dev` now survive only as selected goal-protocol deltas. Both `plan-build` bodies are CUT to archive and handed to `planning-workflow` below.
- Composition status: deferred by scope; no bundle, provider, mirror, or provider-current file changed.

## Collision matrix

| Phrase or artifact | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| `/goal` | `goal-protocol` → `converge` or `ledger` | `planning-workflow` | A `/goal` here has durable phase artifacts, objective verification, stop conditions, and a ledger; a one-shot planning artifact goes to `planning-workflow`. |
| `/goal-council` | `goal-protocol` → `converge` | generic brainstorming | Converges a long-horizon goal through alternatives, dissent, a red team, metrics, and pivot triggers rather than merely discussing options. |
| `/code-council` | `goal-protocol` → `blueprint` | `code-quality` | Owns pre-production feature-to-test/location traceability and dossier gates; `code-quality` owns implementation, refactor, and diagnosis passes. |
| `/goal-orchestrator` | `goal-protocol` → `orchestrate` | `agent-orchestration` | Owns parent-traced tickets and verified waves from approved artifacts; `agent-orchestration` owns live dispatch transport without the durable lifecycle contract. |
| `six-phase` | `goal-protocol` → `six-phase` | `code-quality` → `tdd` | Requires explicit human gates, trial implementation/revert, and deviation review; ordinary TDD or implementation work does not activate it. |
| `GOAL_LEDGER.md` | `goal-protocol` → `ledger` | `planning-workflow` | The ledger is append-only operational memory across goal, dossier, tickets, and handoffs; planning artifacts do not require that persistent lifecycle. |
| reviewed implementation plan / `plan-build` | `planning-workflow` | `goal-protocol` | A reviewed plan is a one-shot artifact outcome, not a durable goal mode; see the required handoff below. |

The metadata preserves every important absorbed invocation before loading: `/goal`, `/goal-council`, `/code-council`, `/goal-orchestrator`, and `six-phase`; `GOAL_LEDGER.md` is the durable artifact trigger.

## Required planning-workflow handoff

`planning-workflow` must absorb a **reviewed-implementation-plan** outcome from both archived `plan-build` bodies. It is not a new goal-protocol mode.

- **Input:** a bounded implementation request plus repository reconnaissance and user constraints.
- **Required artifact:** `docs/plans/<plan-name>.md` or the repository's equivalent, with problem/outcome, architecture decision and rejected alternatives, exact file changes and ownership, test/edge/error strategy, migration and dependency implications, ordered implementation steps, verification, and open questions/defaults.
- **Review contract:** review the saved draft against those facts; emit categorized actionable gaps and retained strengths; revise and re-review until it is `approved`, `needs-revision`, or `needs-decision`. A draft printed only in an agent pane is not the reviewed outcome.
- **Delegated planner boundary:** when a planner agent is used, it may analyze repository state but must not mutate the implementation or run Git commands. Mux transport is optional implementation support, not planning semantics.
- **Zellij adapter delta:** if `planning-workflow` retains a persistent Zellij planner adapter, preserve its background-session setup, initial Escape dismissal, carriage-return submission, input clear, screen-dump monitoring, and same-session revision injection as a selected adapter reference. Do not reintroduce the duplicated broad plan-build body.

## A34 preservation ledger

| Archived original | Qualifying non-default delta | Disposition |
| --- | --- | --- |
| `shared/general/goal-protocol` | Durable goal root, ledger-first/resume discipline, mutable-current versus append-only history, phase gates, traceability IDs, and supervisor-owned integration | Kept in `SKILL.md` Workflow/Hard rules and `references/ledger-handoff.md`. |
| `shared/general/goal-protocol` | Objective-only Codex `/goal` use, status persistence, red-team/verification/handoff gates, three-failed-check stop | Kept in `references/ledger-handoff.md`, the selected mode references, and `SKILL.md` Hard rules. |
| `shared/general/goal-protocol` | Blank goal, ledger, dossier, orchestration, and ticket templates | Dropped: generic forms duplicate the compact artifact contracts and have no downstream consumer requiring a fixed template. |
| `shared/general/goal-council` | Goal-as-hypothesis, real alternatives, tradeoff cross-examination, simulation/premortem, preserved dissent, non-skippable red team, lock standard, review/pivot/compact maintenance | Kept in `references/convergence.md`; theatrical role roster and long example dossier are dropped as non-default-free presentation. |
| `shared/general/code-council` | Goal-to-feature-to-behavior-to-structure/interface/test/location/invariant traceability, read-only recon, alternatives with dissent, TODO map, spike-verify-revert, and contract/blueprint/diff red teams | Kept in `references/implementation-dossier.md`; root-level dossier placement remains input compatibility only. |
| `shared/general/goal-orchestrator` | Self-contained, one-agent, parent-traced tickets; vertical-slice cut lines; file-disjoint DAG waves; breakdown red team; integration wave; replan preserves completed IDs; escalation stops | Kept in `references/orchestration.md` and `SKILL.md` Hard rules. Per-ticket commit wording is dropped as repository policy, not a protocol invariant. |
| `shared/general/six-phase-dev` | Explicit human phase gates; structures/interfaces/TODO blast-radius review; trial implementation, verification, revert, and deviation report; human edits authoritative; invariants before final implementation; shipping stays human-owned | Kept in `references/six-phase.md` and `SKILL.md` Hard rules. The tool-specific harness tutorial is reduced to a truthful testability-gap rule. |
| `shared/general/plan-build` | Strict reviewed-plan outcome: saved draft, bounded clarification and revision loop, evidence-backed review, exact file/rationale/test/error/migration/dependency/order/open-question plan | CUT from this family and handed to `planning-workflow` as **reviewed-implementation-plan** above. Tmux/model transport is not a durable goal invariant. |
| `shared/variants/zellij/plan-build` | Same reviewed-plan outcome plus persistent Zellij input/monitoring adapter | CUT from this family and handed to `planning-workflow` as an optional selected Zellij adapter; it must not create a second plan-build catalog slot. |

## A35 archive inventory

| Original | Archive path | Archived text lines |
| --- | --- | ---: |
| `goal-protocol` | `archive/triage-2026-07/shared/general/goal-protocol` | 1,097 |
| `goal-council` | `archive/triage-2026-07/shared/general/goal-council` | 166 |
| `code-council` | `archive/triage-2026-07/shared/general/code-council` | 133 |
| `goal-orchestrator` | `archive/triage-2026-07/shared/general/goal-orchestrator` | 134 |
| `six-phase-dev` | `archive/triage-2026-07/shared/general/six-phase-dev` | 118 |
| `plan-build` | `archive/triage-2026-07/shared/general/plan-build` | 633 |
| Zellij `plan-build` | `archive/triage-2026-07/shared/variants/zellij/plan-build` | 624 |
| **Total** |  | **2,905** |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The non-default delta is a durable, traceable goal lifecycle with append-only operational memory, gated upstream artifacts, parent IDs, wave safety, and exact handoff requirements. |
| A02 | PASS | Long-running multi-phase goals repeatedly need continuity across sessions and agents; a ledger and phase gates solve a recurring coordination problem rather than one planning conversation. |
| A03 | PASS | The collision matrix assigns durable goals, one-shot plans, code-quality work, and live dispatch to distinct first owners. |
| A04 | PASS | Exactly one mode suite owns the durable-goal lifecycle. |
| A05 | PASS | `shared/general/goal-protocol` matches unique `name: goal-protocol`; validator checks canonical uniqueness. |
| A06 | PASS | Frontmatter contains only `name` and a one-line description. |
| A07 | PASS | The two-sentence description is one physical line and is within the suite 320-character limit. |
| A08 | PASS | It states the durable lifecycle and ends with six concrete legacy/artifact triggers. |
| A09 | PASS | The collision matrix gives every claimed trigger an owner, nearest competitor, discriminator, and handoff. |
| A10 | PASS | Six-phase behavior requires an explicit phrase; no generic planning or implementation request activates a persistent human-gated mode. |
| A11 | PASS | `SKILL.md` is 51 lines / 3,531 bytes, below the suite 120-line / 10 KiB cap; validator passes. |
| A12 | PASS | The active body contains route, precedence, workflow, hard rules, stops, output, and reference routing only. |
| A13 | PASS | Each of five modes has one exact reference and selection condition; the active body instructs loading only that selected reference. |
| A14 | PASS | References are 11–13 lines each; the 110-line / 9,995-byte package stays below standard and consolidated-owner caps with no scripts or assets. |
| A15 | DEFERRED (bundle/provider clause) | The canonical package has no active duplicate former body. Existing bundle/provider exposure is intentionally untouched and cannot be claimed as conforming in this scope. |
| A16 | PASS | Five modes share one durable goal lifecycle and fall within the two-to-eight mode range. |
| A17 | PASS | Five distinct kebab-case rows select exactly one reference by default; `converge` and `ledger` have deterministic default conditions. |
| A18 | N/A | This is a mode suite, not a router. |
| A19 | N/A | This is a mode suite, not a router. |
| A20 | PASS | The suite directs current repository conventions and installed `/goal` help before version-sensitive behavior; no CLI/API fact is frozen. |
| A21 | PASS | External manuals, transport guides, model flags, long templates, and duplicated tutorials were removed or archived. |
| A22 | N/A | No volatile value is pinned as a pack constraint. |
| A23 | PASS | No credential, token, key, or secret URL exists in the active package. |
| A24 | PASS | The suite does not prescribe secret discovery; its reports use artifacts, parent IDs, validation status, and blockers. |
| A25 | PASS | Canonical paths are repository-relative and contain no literal user home path. |
| A26 | PASS | Existing artifacts and local conventions are inspected; missing parent facts stop or route backwards rather than being guessed. |
| A27 | N/A | The active package has no scripts. |
| A28 | N/A | The active package has no assets or provider metadata. |
| A29 | PASS | Rules protect ledger history, traceability, approval gates, wave ownership, human control, and validation without generic coaching. |
| A30 | DEFERRED | Canonical/bundle/provider parity and final exposure await the explicitly excluded composition phase. |
| A31 | DEFERRED | Local links and the validator's symlink check pass; compose dry run and installed-view checks await that phase. |
| A32 | PASS | The suite follows the `code-quality` golden mode-table shape and the `herdr` compact active/reference boundary; the current rubric resolved all shape decisions. |
| A33 | PASS | 110 active package lines is strictly smaller than 2,905 replaced lines and below every hard cap. |
| A34 | PASS | The preservation ledger above accounts for every qualifying delta, including both CUT plan-build bodies and their named handoff. |
| A35 | PASS | The archive inventory lists the pre-rewrite original of every touched skill, including the in-place goal-protocol original. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/goal-protocol suite
PASS: shared/general/goal-protocol (suite)
```
