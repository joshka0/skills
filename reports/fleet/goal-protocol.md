# Fleet acceptance — goal-protocol (revision pass)

## Verdict

**PACKAGE-CONFORMS.** This revision repairs the durable-goal boundary: it creates and approves parent-traced packets and records returned evidence, but never dispatches, monitors, reviews, or integrates live agent work. A15's bundle/provider clause, A30, and A31 are **DEFERRED** because composition is out of scope; A19 is not applicable to a suite.

## Result

- Canonical home: `shared/general/goal-protocol`
- Archetype: mode suite with six lifecycle modes: `converge`, `goal-file`, `blueprint`, `six-phase`, `orchestrate`, and `ledger`.
- Final package: 53-line / 4,278-byte active body; six selected references (11–16 lines); **128 text lines / 12,310 bytes** total.
- Source corpus: 2,915 all-text lines across the original durable-goal family plus 494 archived `codex-goal` lines now absorbed as the `goal-file` mode; 128 < **3,409**. This count includes archived text templates such as the Zellij `.kdl` layout.
- Revision snapshot: the prior 110-line active package was moved intact to `archive/triage-2026-07/revision-pass/shared/general/goal-protocol/` before rebuild.
- Live execution boundary: `orchestrate` ends at approved packets and wave state; `agent-orchestration` dispatches and integrates them, then `ledger` records returned evidence and gate transitions.
- Validator: `PASS: shared/general/goal-protocol (suite)`
- Composition status: no bundle, provider, mirror, or provider-current file changed.

## Collision matrix

| Phrase or artifact | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| `/goal` | `goal-protocol` → `goal-file` or `converge` | `planning-workflow` | A `/goal` creates a durable `GOAL.md`, phase artifacts, and ledger; a one-shot planning artifact belongs to planning-workflow. |
| `codex-goal` | `goal-protocol` → `goal-file` | `agent-orchestration` | This legacy phrase names a durable objective contract and live-discovered start handoff, not a live delegation mode. |
| `/goal-council` | `goal-protocol` → `converge` | generic brainstorming | It converges a long-horizon goal through alternatives, dissent, red-team evidence, metrics, and pivot triggers. |
| `/code-council` | `goal-protocol` → `blueprint` | `code-quality` | It owns pre-production behavior-to-test/location traceability and dossier gates; code-quality owns implementation and diagnosis passes. |
| `/goal-orchestrator` | `goal-protocol` → `orchestrate` | `agent-orchestration` | It designs parent-traced tickets and approves wave state; agent-orchestration alone launches, monitors, reviews, and integrates live work. |
| `six-phase` | `goal-protocol` → `six-phase` | `code-quality` → `tdd` | It requires explicit human gates, trial/revert evidence, and deviation review; ordinary TDD does not activate it. |
| `GOAL_LEDGER.md` or returned packet evidence | `goal-protocol` → `ledger` | `agent-orchestration` | The ledger owns durable state and gate transitions; orchestration returns execution evidence but does not own the goal lifecycle. |
| live agent dispatch | `agent-orchestration` | `goal-protocol` → `orchestrate` | A goal packet becomes live work only after it leaves this suite with an approved parent and evidence-return contract. |
| reviewed implementation plan / `plan-build` | `planning-workflow` | `goal-protocol` | A reviewed plan is a one-shot artifact; persistent mux continuation is a narrow `agent-orchestration` transport adapter, not a goal mode. |

The metadata-visible triggers are `/goal`, `codex-goal`, `/goal-council`, `/code-council`, `/goal-orchestrator`, and `six-phase`.

## A34 preservation ledger

| Archived original | Qualifying non-default delta | Disposition |
| --- | --- | --- |
| original `goal-protocol` | Durable goal root, ledger-first/resume discipline, mutable current state, append-only history, phase gates, traceability IDs, and evidence-based handoff | Kept in `SKILL.md` and `references/ledger-handoff.md`. |
| original `goal-protocol` | Objective-only `/goal` eligibility, verification/stop posture, status persistence, and a durable goal-file contract | Kept and clarified in `references/goal-file.md` and `references/ledger-handoff.md`; volatile command variants are live-discovered. |
| original `goal-protocol` | Approved tickets, dependency DAG, file-disjoint waves, breakdown red team, integration/verification end state, and replan preservation | Kept as packet and wave-state design in `references/orchestration.md`; live dispatch, review, and integration move to `agent-orchestration`. |
| original `goal-council` | Goal-as-hypothesis, real alternatives, tradeoff cross-examination, preserved dissent, non-skippable red team, lock standard, and pivot maintenance | Kept in `references/convergence.md`; theatrical role roster and long examples are dropped as presentation rather than a durable invariant. |
| original `code-council` | Goal-to-feature-to-behavior-to-structure/interface/test/location/invariant traceability, read-only reconnaissance, dissent, TODO map, spike-verify-revert, and red teams | Kept in `references/implementation-dossier.md`; root-level placement remains input compatibility only. |
| original `goal-orchestrator` | One-agent self-contained parent-traced tickets, vertical cut lines, dependency DAG waves, breakdown red team, replan preservation, and escalation stops | Kept in `references/orchestration.md`; execution is explicitly handed to `agent-orchestration`, and per-ticket commit wording is dropped as repository policy. |
| original `six-phase-dev` | Human phase gates, structures/interfaces/TODO blast-radius review, trial/verify/revert, deviation report, authoritative human edits, invariants, and human-owned shipping | Kept in `references/six-phase.md`; the tool-specific harness tutorial is reduced to a truthful testability-gap rule. |
| archived `codex-goal` | `GOAL.md` objective, context, constraints, verification, stop, and done fields; measurable eligibility; file/start handoff | Kept in `references/goal-file.md`. Installed help resolves current `/goal` syntax rather than copying flags or config toggles. |
| original `plan-build` | Strict saved reviewed-plan outcome, bounded review/revision loop, exact file/rationale/test/error/migration/dependency/order/open-question plan | Merged into `planning-workflow` → `reviewed-plan`; not a durable-goal mode. |
| Zellij `plan-build` | Generic persistent-session continuation and bounded revision injection | Merged into `agent-orchestration/references/mux-adapter.md`; Escape, carriage-return, input-clear, screen-dump, keystroke, fixed path, model, and runner mechanics are dropped as volatile or nonessential. |

## A35 archive inventory

| Original or revision snapshot | Archive path | Text lines |
| --- | --- | ---: |
| original `goal-protocol` | `archive/triage-2026-07/shared/general/goal-protocol/` | 1,097 |
| original `goal-council` | `archive/triage-2026-07/shared/general/goal-council/` | 166 |
| original `code-council` | `archive/triage-2026-07/shared/general/code-council/` | 133 |
| original `goal-orchestrator` | `archive/triage-2026-07/shared/general/goal-orchestrator/` | 134 |
| original `six-phase-dev` | `archive/triage-2026-07/shared/general/six-phase-dev/` | 118 |
| original `plan-build` | `archive/triage-2026-07/shared/general/plan-build/` | 633 |
| original Zellij `plan-build` | `archive/triage-2026-07/shared/variants/zellij/plan-build/` | 634 |
| absorbed `codex-goal` | `archive/triage-2026-07/shared/general/codex-goal/` | 494 |
| pre-revision active `goal-protocol` | `archive/triage-2026-07/revision-pass/shared/general/goal-protocol/` | 110 |

All current-package originals were archived before this revision was written. No archive was deleted or overwritten.

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The non-default delta is durable, parent-traced goal governance with a `GOAL.md` contract, gates, packet approval, and ledgered returned evidence. |
| A02 | PASS | Multi-session goals repeatedly need continuity, approval state, and evidence after delegated work. |
| A03 | PASS | The collision matrix separates durable goals, one-shot artifacts, live dispatch, private transport, and reviewed plans. |
| A04 | PASS | Exactly one mode suite owns the durable-goal lifecycle. |
| A05 | PASS | `shared/general/goal-protocol` matches unique `name: goal-protocol`; validator checks uniqueness. |
| A06 | PASS | Frontmatter has only `name` and a one-line description. |
| A07 | PASS | The two-sentence one-line description is 230 bytes including quotes/newline, below the 320-character suite cap. |
| A08 | PASS | The description states the durable lifecycle and ends with six concrete metadata-visible legacy triggers. |
| A09 | PASS | The collision matrix supplies a first owner, competitor, discriminator, and handoff for every claimed trigger. |
| A10 | PASS | Six-phase remains explicit-only; generic planning and live dispatch do not silently activate durable phases. |
| A11 | PASS | The 53-line / 4,278-byte active body is below the suite 120-line / 10 KiB cap. |
| A12 | PASS | Active instructions contain route, lifecycle workflow, boundaries, stops, output, and reference selection only. |
| A13 | PASS | Six exact linked references each have one route condition, and the suite says to load only the selected one. |
| A14 | PASS | References are 11–16 lines and the 128-line package is below all hard caps; no scripts, assets, or metadata hide prose. |
| A15 | DEFERRED | Canonical content is non-duplicated; bundle/provider exposure is outside this revision scope. |
| A16 | PASS | Six modes share the durable goal lifecycle and fit the two-to-eight mode range. |
| A17 | PASS | Six distinct kebab-case routes select one mode by default with clear lifecycle entry conditions. |
| A18 | N/A | This is a suite, not a router. |
| A19 | N/A | This is a suite, so it has no router target or exposure rule. |
| A20 | PASS | Repository conventions and installed `/goal` help precede any version-sensitive behavior; no flags are frozen. |
| A21 | PASS | Command catalogs, model recommendations, config toggles, transport manuals, and broad templates were removed or archived. |
| A22 | N/A | No volatile pack constraint is pinned. |
| A23 | PASS | The active package contains no credential, token, key, or secret URL. |
| A24 | PASS | Goal artifacts and reports exclude secret values; no secret-discovery procedure is prescribed. |
| A25 | PASS | All paths are repository-relative conventions or placeholders, with no literal user home path. |
| A26 | PASS | Missing parent facts and current `/goal` behavior are inspected or reported uncertain rather than guessed. |
| A27 | N/A | No active scripts remain. |
| A28 | N/A | No active assets or provider metadata remain. |
| A29 | PASS | Rules protect phase gates, traceability, live-execution separation, returned-evidence verification, human authority, and secret boundaries. |
| A30 | DEFERRED | Canonical/bundle/provider parity and exposure await the excluded composition pass. |
| A31 | DEFERRED | Compose and installed-view checks await composition; local links and the no-internal-symlink validator check pass. |
| A32 | PASS | Compared with accepted pilot artifacts `reports/pilot/code-quality.md` (suite mode/reference shape) and `reports/pilot/herdr.md` (compact active/reference boundaries); the rubric governs differences. |
| A33 | PASS | 128 is strictly smaller than the 3,409-line all-text absorbed/replaced corpus and below the 1,200-line consolidated-owner cap. |
| A34 | PASS | The preservation ledger accounts for every qualifying goal, Codex-goal, and plan-build delta with a kept, merged, or dropped disposition. |
| A35 | PASS | Initial originals and the pre-revision active package are listed at exact archive paths above. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/goal-protocol suite
PASS: shared/general/goal-protocol (suite)
```
