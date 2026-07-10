# Fleet acceptance — agent-orchestration (revision pass)

## Verdict

**PACKAGE-CONFORMS.** This revision makes the suite solely responsible for live dispatch: it launches bounded packets, monitors returned evidence, reviews, and integrates. Durable-goal approval and ledger state stay with `goal-protocol`; non-goal collaboration now has its own durable ledger. A15's bundle/provider clause, A30, and A31 are **DEFERRED** because composition is out of scope; A19 is not applicable to a suite.

## Result

- Canonical home: `shared/general/agent-orchestration`
- Archetype: consolidated live-dispatch mode suite
- Modes: `delegate`, `swarm`, `collaborate`, `delta-brief`, and `mux-adapter` (five coherent live-coordination modes).
- Final package: 55-line / 4,273-byte active body; five selected references (9–13 lines); **110 text lines / 9,846 bytes** total.
- Source corpus: 1,807 all-text lines across the original owner and absorbed live-dispatch skills plus the 634-line archived Zellij `plan-build` transport source whose narrow durable delta is now merged; 110 < **2,441**. The 494-line `codex-goal` original is transferred to `goal-protocol`, not counted as this suite's replacement shrink. All-text counts include archived `.kdl` transport templates.
- `goal-handoff` and its reference are removed. The metadata-visible legacy `codex-goal` trigger and `GOAL.md` file contract now belong to `goal-protocol`.
- Revision snapshot: the prior 114-line active package was moved intact to `archive/triage-2026-07/revision-pass/shared/general/agent-orchestration/` before rebuild.
- Validator: `PASS: shared/general/agent-orchestration (suite)`
- Composition status: `bundles/` and `providers/` were intentionally not edited or composed in this wave.

## Collision matrix

| Claimed signal | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| `/delegate-codex` or one live agent assignment | `agent-orchestration` → `delegate` | `planning-workflow` → `agent-brief` | This suite owns active dispatch, evidence review, and integration; planning-workflow owns a saved one-shot brief without transport. |
| `/swarm` or parallel agent work | `agent-orchestration` → `swarm` | `gtr` | This suite divides, supervises, and integrates bounded tasks; `gtr` owns a requested Git Worktree Runner operation. |
| `Zellij swarm` or named terminal mux | `agent-orchestration` → `mux-adapter` plus selected dispatch mode | archived `codex-swarm` / `plan-build` variants | The retained delta is a live-discovered transport adapter and persistent-session continuation, not a separate mux workflow, model choice, or keystroke manual. |
| `collaboration-protocol` or adversarial convergence | `agent-orchestration` → `collaborate` | `goal-protocol` → `converge` | This mode owns live collaboration and its non-goal durable ledger; goal-protocol owns a collaboration already inside a durable goal lifecycle. |
| `delta brief` or an in-flight agent with stale context | `agent-orchestration` → `delta-brief` | `planning-workflow` → `agent-brief` | This mode updates an existing recipient after a settled change; planning-workflow creates a fresh-start artifact. |
| `codex-goal`, `/goal`, or `GOAL.md` | `goal-protocol` → `goal-file` | `agent-orchestration` | A durable goal contract and start handoff are not live dispatch modes; this suite receives only approved packets to execute. |
| approved goal packet / live wave | `agent-orchestration` → `delegate` or `swarm` | `goal-protocol` → `orchestrate` | Goal-protocol approves parent-traced packets and wave state; this suite performs the live dispatch and returns evidence for ledger update. |
| Herdr or Maestri workspace, pane, participant, or message transport | `herdr` or `maestri` | `agent-orchestration` → `collaborate` | The private leaves own live targets and command syntax; this suite owns the collaboration and dispatch contract. |

The description retains six metadata-visible selection signals: `/delegate-codex`, `/swarm`, `collaboration-protocol`, `delta brief`, `Zellij swarm`, and live agent dispatch.

## A34 preservation ledger

| Replaced source | Qualifying non-default delta | Disposition |
| --- | --- | --- |
| prior `agent-orchestration` | One supervisor owns division, review, integration, and verified dependent progress | Kept in `SKILL.md` workflow and hard rules. |
| prior `agent-orchestration` | File-disjoint parallel work, explicit coordination for overlap, and isolated work surfaces | Kept in `SKILL.md` hard rules and `references/swarm.md`. |
| prior `agent-orchestration` | A packet needs scope, non-goals, verification, stop, and handoff before assignment | Kept in `SKILL.md` workflow and `references/delegate.md` / `references/swarm.md`. |
| prior `agent-orchestration` | Fixed Codex/sandbox capability assertions | Replaced by `SKILL.md` live-capability verification; the old provider claims are volatile. |
| prior `agent-orchestration` goal reference and prior `goal-handoff` | Objective eligibility, `GOAL.md` fields, goal-file/start handoff, and durable lifecycle | Moved to `goal-protocol/references/goal-file.md`; it is no longer a non-live mode in this suite. |
| `collaboration-protocol` | Explicit roles, independent work, adversarial review, evidence-backed synthesis, and preserved dissent | Kept in `references/collaborate.md`. |
| `collaboration-protocol` | Non-goal `docs/collaboration/<slug>/COLLABORATION_LEDGER.md` with a mutable snapshot and append-only decision, dissent, validation, and handoff logs | Kept in `references/collaborate.md`; goal-associated collaboration instead uses its existing `GOAL_LEDGER.md`. |
| `collaboration-protocol` | Herdr discovery, literal send, pane execution, wait, and submit semantics | Handed to the `herdr` private-tool leaf; copying its version-sensitive CLI manual would violate the private-transport boundary. |
| `collaboration-protocol` | No secret transport and coordinated same-wave edits | Kept in `SKILL.md` hard rules. |
| `delta-brief` | Durable source first; identify stale recipients rather than messaging fresh sessions | Kept in `references/delta-brief.md`. |
| `delta-brief` | Five-part update: change, old-to-new, rule, redo area, and what stands | Kept in `references/delta-brief.md`. |
| `delta-brief` worked example | Product-specific consent narrative and full example transcript | Dropped as one-off illustrative prose; the differentiated reusable handoff contract remains. |
| Zellij `codex-swarm` and legacy `delegate-codex` | Bounded literal packet transport, supervisor-visible completion, isolated concurrent mutation, and supervisor-controlled version control | Kept in `references/delegate.md`, `references/swarm.md`, and `references/mux-adapter.md`. |
| Zellij `codex-swarm` assets and legacy delegate mechanics | Model flag, JSON event schema, layout/runner commands, fixed paths, worktree/branch cleanup, and automatic review/PR loop | Dropped as volatile or outside the user-approved live-dispatch boundary. Exact originals remain archived. |
| Zellij `plan-build` | Live-discovered persistent-session continuation and injection of only the new bounded revision, feedback, or decision delta | Merged into `references/mux-adapter.md`. |
| Zellij `plan-build` | Escape dismissal, carriage-return submission, input clear, screen-dump monitoring, pane keystrokes, fixed session paths, model/runner commands, and input protocol | Dropped as version-sensitive or nonessential; installed help and observable live capability are the source of truth. |

## A35 archive-in-place originals

| Original or revision snapshot | Exact archive location | Text lines |
| --- | --- | ---: |
| in-place original owner `agent-orchestration` | `archive/triage-2026-07/shared/general/agent-orchestration/` | 918 |
| `collaboration-protocol` | `archive/triage-2026-07/shared/general/collaboration-protocol/` | 183 |
| `delta-brief` | `archive/triage-2026-07/shared/general/delta-brief/` | 57 |
| `codex-goal` | `archive/triage-2026-07/shared/general/codex-goal/` | 494 |
| Zellij `codex-swarm` | `archive/triage-2026-07/shared/variants/zellij/codex-swarm/` | 508 |
| legacy `delegate-codex` wording | `archive/triage-2026-07/shared/variants/legacy/delegate-codex-zellij-wording/` | 141 |
| inherited Zellij `plan-build` transport source | `archive/triage-2026-07/shared/variants/zellij/plan-build/` | 634 |
| pre-revision active `agent-orchestration` | `archive/triage-2026-07/revision-pass/shared/general/agent-orchestration/` | 114 |

All current-package originals were moved intact before this revision was written; no source package was deleted.

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The non-default delta is supervised, bounded live dispatch with integration, durable non-goal collaboration records, stale-context propagation, and mux continuation safety. |
| A02 | PASS | Delegation, parallel coordination, collaboration, and evidence return recur across agent work. |
| A03 | PASS | The collision matrix assigns durable goals, one-shot artifacts, private transport, and live execution to distinct owners. |
| A04 | PASS | Exactly one consolidated live-dispatch mode suite. |
| A05 | PASS | `shared/general/agent-orchestration` matches unique `name: agent-orchestration`; validator checks uniqueness. |
| A06 | PASS | Frontmatter contains only `name` and a one-line description. |
| A07 | PASS | The one-line two-sentence description is 244 bytes including quotes/newline, below the 320-character suite cap. |
| A08 | PASS | The first sentence names bounded live dispatch; the final `Use when ...` sentence supplies six concrete signals. |
| A09 | PASS | The collision matrix records first owner, competitor, discriminator, and handoff for every claimed signal. |
| A10 | PASS | Six bounded triggers remain; no generic always-on, model, persona, or implicit-mux activation is claimed. |
| A11 | PASS | The 55-line / 4,273-byte active body is below the suite 120-line / 10 KiB cap. |
| A12 | PASS | The active body contains route, boundaries, workflow, non-default rules, stops, output, and reference selection only. |
| A13 | PASS | Five exact linked references each have one route condition; the suite says to load only the selected reference. |
| A14 | PASS | References are 9–13 lines each and the 110-line package is below all hard caps; no scripts, assets, or metadata hide prose. |
| A15 | DEFERRED | Canonical references are non-duplicated; bundle/provider exposure is deliberately outside this revision. |
| A16 | PASS | Five modes share one live-dispatch lifecycle and safety contract. |
| A17 | PASS | Five distinct kebab-case rows select one mode by default; mux-adapter is an explicit adapter sequence only. |
| A18 | N/A | This is a suite, not a router. |
| A19 | N/A | This is a suite, so it has no router targets or router exposure rule. |
| A20 | PASS | Version-sensitive execution facts are deferred to current repository state, live execution-surface capability, and installed help. |
| A21 | PASS | The old provider manuals, model flags, KDL templates, JSON event catalog, and command recipes were not copied into the active package. |
| A22 | N/A | No pinned volatile pack constraint remains. |
| A23 | PASS | The package contains no credential-shaped values and prohibits secret values in packets, ledgers, and reports. |
| A24 | PASS | The package does not prescribe broad environment or secret discovery; evidence and reports omit values. |
| A25 | PASS | No literal user home path appears in the rebuilt package. |
| A26 | PASS | Transport, permissions, flags, models, protocols, and persistent-session state are verified live or reported uncertain rather than guessed. |
| A27 | N/A | No active scripts remain. |
| A28 | N/A | No active assets or provider metadata remain. |
| A29 | PASS | Rules protect ownership, overlap, side effects, current capability, evidence, durable records, and secret boundaries without tutorial filler. |
| A30 | DEFERRED | Canonical/bundle/provider parity and intended exposure await the permitted composition pass. |
| A31 | DEFERRED | Compose dry runs and installed-view checks await composition; local links and the no-internal-symlink validator check pass. |
| A32 | PASS | Compared with accepted pilot artifacts `reports/pilot/code-quality.md` (suite mode/reference shape) and `reports/pilot/herdr.md` (compact private-transport boundaries); rubric differences govern. |
| A33 | PASS | 110 is strictly smaller than the 2,441-line all-text absorbed/replaced corpus and below the 1,200-line consolidated-owner cap. |
| A34 | PASS | The preservation ledger accounts for each qualifying absorbed and revision-pass delta, including the final Zellij plan-build disposition. |
| A35 | PASS | The initial originals and the pre-revision active package are listed above at exact archive paths. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/agent-orchestration suite
PASS: shared/general/agent-orchestration (suite)
```
