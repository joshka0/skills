# Fleet acceptance — agent-orchestration

## Result

- Verdict: **PACKAGE-CONFORMS**. All canonical-package checks pass; composition checks are intentionally deferred.
- Canonical home: `shared/general/agent-orchestration`
- Archetype: consolidated mode suite
- Final package: 56-line / 4,157-byte active body; six selected references (7–13 lines each); **114 text lines / 9,557 bytes** total.
- Replaced-source total: **2,301 text lines / 70,891 bytes** across six exact archived packages; net shrink is 2,187 lines (95.0%).
- Modes: `delegate`, `swarm`, `collaborate`, `delta-brief`, `goal-handoff`, and `mux-adapter` (six, below the 10-mode consolidated-owner limit).
- Validator: `PASS: shared/general/agent-orchestration (suite)`
- Composition status: `bundles/` and `providers/` were intentionally not edited or composed in this wave.

## Collision matrix

| Claimed signal | First owner | Nearest competitor | Discriminator / handoff |
| --- | --- | --- | --- |
| `/delegate-codex` or one live agent assignment | `agent-orchestration` → `delegate` | `planning-workflow` → `agent-brief` | This suite owns active dispatch, supervisor review, and integration; planning-workflow owns a saved one-shot brief without live transport. |
| `/swarm` or parallel agent work | `agent-orchestration` → `swarm` | `gtr` | This suite divides, supervises, and integrates bounded tasks; `gtr` owns a requested Git Worktree Runner operation. |
| `Zellij swarm` or named terminal mux | `agent-orchestration` → `mux-adapter` plus the selected dispatch mode | archived `codex-swarm` variant | The retained delta is a safe live-capability adapter, not a separate mux workflow, model choice, or terminal-command manual. |
| `collaboration-protocol` or adversarial convergence | `agent-orchestration` → `collaborate` | `goal-protocol` → `converge` | This mode coordinates a live decision; `goal-protocol` owns durable-goal artifacts, phase gates, and `GOAL_LEDGER.md`. |
| `delta brief` or an in-flight agent with stale context | `agent-orchestration` → `delta-brief` | `planning-workflow` → `agent-brief` | This mode updates an existing recipient after a settled change; planning-workflow creates a durable fresh-start artifact. |
| `codex-goal` or an autonomous-task preflight | `agent-orchestration` → `goal-handoff` | `goal-protocol` → `ledger` | The legacy phrase reaches objective/scope/stop-condition eligibility here; handoff then gives the durable lifecycle and current goal-command behavior to goal-protocol. |
| Herdr or Maestri workspace, pane, participant, or message transport | `herdr` or `maestri` | `agent-orchestration` → `collaborate` | The private leaves own live targets and command syntax; this suite only owns the cross-agent collaboration contract. |

The description retains the six metadata-visible legacy signals: `/delegate-codex`, `/swarm`, `collaboration-protocol`, `delta brief`, `codex-goal`, and `Zellij swarm`.

## A34 preservation ledger

| Replaced source | Qualifying non-default delta | Disposition |
| --- | --- | --- |
| prior `agent-orchestration` | One supervisor owns division, review, integration, and verified dependent progress | Kept in `SKILL.md` workflow and hard rules. |
| prior `agent-orchestration` | File-disjoint parallel work, explicit coordination for overlap, and isolated work surfaces | Kept in `SKILL.md` hard rules and `references/swarm.md`. |
| prior `agent-orchestration` | A packet needs scope, non-goals, verification, stop, and handoff before assignment | Kept in `SKILL.md` workflow and `references/delegate.md` / `references/swarm.md`. |
| prior `agent-orchestration` | Collaboration needs a ledger-like decision record and independent critical review | Merged into `collaborate` at `references/collaborate.md`; durable ledger ownership hands off to `goal-protocol`. |
| prior `agent-orchestration` | Agent sandbox and Codex CLI limitations | Replaced by `SKILL.md` live-capability verification; the old fixed provider claims are volatile. |
| prior `agent-orchestration` references | Codex `/goal` suitability, objective verification, scope, verification, and stop-condition posture | Merged into `goal-handoff` at `references/goal-handoff.md`; durable lifecycle mechanics hand off to `goal-protocol`. |
| prior `agent-orchestration` references | tmux/Codex swarm monitoring, work-surface isolation, and task-packet supervision | Kept only as durable policy in `references/mux-adapter.md` and `references/swarm.md`; model flags, JSON event names, terminal commands, and auto-commit/PR ceremony are dropped as volatile or outside the dispatch boundary. |
| `collaboration-protocol` | Explicit roles, independent work, adversarial review, evidence-backed synthesis, and preserved dissent | Kept in `references/collaborate.md`. |
| `collaboration-protocol` | Durable `COLLABORATION_LEDGER.md` lifecycle | Handed to `goal-protocol`, which owns durable ledger artifacts; a compact live decision record remains in `references/collaborate.md`. |
| `collaboration-protocol` | Herdr discovery, literal send, pane execution, wait, and submit semantics | Handed to the `herdr` private-tool leaf; copying its version-sensitive CLI manual would violate the private-transport boundary. |
| `collaboration-protocol` | No secret transport and coordinated same-wave edits | Kept in `SKILL.md` hard rules. |
| `delta-brief` | Durable source first; identify stale recipients rather than messaging fresh sessions | Kept in `references/delta-brief.md`. |
| `delta-brief` | Five-part update: change, old-to-new, rule, redo area, and what stands | Kept in `references/delta-brief.md`. |
| `delta-brief` worked example | Product-specific consent narrative and full example transcript | Dropped as one-off illustrative prose; the differentiated reusable handoff contract remains. |
| `codex-goal` | Objective eligibility, bounded scope, evidence, stop conditions, and risky-operation exclusion | Kept in `references/goal-handoff.md`. |
| `codex-goal` | Goal files, `/goal` commands, config flags, loop monitoring, phase templates, and output schema | Handed to `goal-protocol`; commands and flags are version-sensitive, while durable phase behavior belongs to that owner. |
| Zellij `codex-swarm` | Explicit mux selection, completion visibility, packet transport, and isolated concurrent mutation | Kept as the optional `references/mux-adapter.md` policy. |
| Zellij `codex-swarm` assets | Layout KDL, runner shell, fixed model flag, JSONL schema, fixed session paths, worktree/branch cleanup, and automatic review/PR loop | Dropped: version- and environment-specific mechanics, plus version-control and publishing actions outside this suite's user-approved dispatch boundary. Exact originals remain archived. |
| legacy `delegate-codex` wording | Lightweight one-agent dispatch, bounded prompt, evidence review, and supervisor-controlled version control | Merged into `references/delegate.md` and `SKILL.md` hard rules. |
| legacy `delegate-codex` wording | Fixed Codex command, model flag, worktree commands, paths, JSON event names, and sandbox capability assertions | Dropped as volatile provider/mux implementation detail; current capability must be discovered live. |

## A35 archive-in-place originals

| Original package | Exact archive location | Original text lines |
| --- | --- | ---: |
| in-place owner `shared/general/agent-orchestration` | `archive/triage-2026-07/shared/general/agent-orchestration/` | 918 |
| `shared/general/collaboration-protocol` | `archive/triage-2026-07/shared/general/collaboration-protocol/` | 183 |
| `shared/general/delta-brief` | `archive/triage-2026-07/shared/general/delta-brief/` | 57 |
| `shared/general/codex-goal` | `archive/triage-2026-07/shared/general/codex-goal/` | 494 |
| `shared/variants/zellij/codex-swarm` | `archive/triage-2026-07/shared/variants/zellij/codex-swarm/` | 508 |
| `shared/variants/legacy/delegate-codex-zellij-wording` | `archive/triage-2026-07/shared/variants/legacy/delegate-codex-zellij-wording/` | 141 |

All originals were moved intact before the owner was rebuilt; no source package was deleted.

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The non-default delta is supervised, bounded live dispatch with integration, adversarial convergence, stale-context propagation, and compatibility handoff rules. |
| A02 | PASS | Delegation, parallel coordination, convergence, and handoff recur across agent work. |
| A03 | PASS | The collision matrix assigns the close owners and explicit handoffs. |
| A04 | PASS | Exactly one archetype: consolidated mode suite. |
| A05 | PASS | `shared/general/agent-orchestration` matches the unique kebab-case `name`; the validator checked uniqueness. |
| A06 | PASS | Frontmatter contains only `name` and a one-line `description`. |
| A07 | PASS | The one-line two-sentence description is 248 bytes including quotes/newline, below the 320-character suite cap. |
| A08 | PASS | The first sentence names bounded live dispatch; the final `Use when ...` sentence supplies six concrete signals. |
| A09 | PASS | The collision matrix records first owner, competitor, discriminator, and handoff for each claimed signal. |
| A10 | PASS | Six bounded triggers remain; no generic always-on, model, persona, or implicit-mux activation is claimed. |
| A11 | PASS | The 56-line / 4,157-byte active body is below the suite 120-line / 10 KiB cap. |
| A12 | PASS | The active body contains route, boundaries, workflow, non-default rules, stops, output, and reference selection only. |
| A13 | PASS | Six exact linked references each have one route condition; the suite says to load only the selected reference. |
| A14 | PASS | References are 7–13 lines each and the 114-line package is below the 1,200-line consolidated-owner cap; no scripts, assets, or metadata hide prose. |
| A15 | DEFERRED | Canonical references are non-duplicated; bundle/provider exposure is deliberately outside this wave. |
| A16 | PASS | Six modes share a single live-dispatch lifecycle and safety contract. |
| A17 | PASS | The route has six distinct kebab-case modes and selects one by default. |
| A18 | N/A | This is a suite, not a router. |
| A19 | N/A | This is a suite, so it has no router targets or router exposure rule. |
| A20 | PASS | Version-sensitive execution facts are deferred to current repository state, live execution-surface capability, and installed help. |
| A21 | PASS | The old provider manuals, model flags, KDL templates, JSON event catalog, and command recipes were not copied into the active package. |
| A22 | N/A | No pinned volatile pack constraint remains. |
| A23 | PASS | The package contains no credential-shaped values and prohibits secret values in packets and reports. |
| A24 | PASS | The package does not prescribe broad environment or secret discovery; evidence and reports must omit values. |
| A25 | PASS | No literal user home path appears in the rebuilt package. |
| A26 | PASS | Transport, permissions, flags, models, and protocols are verified live or reported uncertain rather than guessed. |
| A27 | N/A | No active scripts remain. |
| A28 | N/A | No active assets or provider metadata remain. |
| A29 | PASS | The rules protect ownership, overlap, side effects, current capability, evidence, durable sources, and secret boundaries without generic tutorial filler. |
| A30 | DEFERRED | Canonical/bundle/provider parity and intended exposure await the permitted composition pass. |
| A31 | DEFERRED | Compose dry runs and installed-view checks await composition; the local validator passed link/path/name and no-internal-symlink checks. |
| A32 | PASS | The result was compared with the code-quality mode-suite and herdr private-transport golden shapes; rubric boundaries win where they differ. |
| A33 | PASS | 114 is strictly smaller than 2,301 and below the absolute 1,200-line consolidated-owner cap. |
| A34 | PASS | The preservation ledger accounts for every qualifying absorbed or replaced delta and its disposition. |
| A35 | PASS | The six exact pre-rewrite originals are listed above under `archive/triage-2026-07/`. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/agent-orchestration suite
PASS: shared/general/agent-orchestration (suite)
```
