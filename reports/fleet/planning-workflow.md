# Fleet acceptance — planning-workflow (A34 revision)

## Verdict

**PACKAGE-CONFORMS.** The canonical one-shot artifact suite was not changed in this revision; this report resolves its previously incomplete Zellij `plan-build` disposition. A15's bundle/provider clause, A30, and A31 remain **DEFERRED** because composition is out of scope; A19 is not applicable to a suite.

## Result

- Canonical home: `shared/general/planning-workflow`
- Archetype: mode suite with seven modes: `prd`, `reviewed-plan`, `issues`, `triage`, `agent-brief`, `out-of-scope`, and `setup`.
- Unchanged final package: **126 text lines / 10,321 bytes**.
- Direct original corpus: 784 text lines. With the inherited 633-line generic and 634-line all-text Zellij `plan-build` source, the accounted consolidation corpus is **2,051** lines; 126 < 2,051.
- `setup-matt-pocock-skills` survives as the selected `setup` mode. The generic `plan-build` reviewed-plan outcome survives in `references/reviewed-plan.md`; the only durable Zellij transport subset is now merged into `agent-orchestration` rather than deferred to future work.
- No planning-workflow source, bundle, provider, mirror, or provider-current file was changed in this report-only revision.

## Collision matrix

| Phrase or artifact | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| PRD | `planning-workflow` → `prd` | `goal-protocol` | This owner creates a one-shot product artifact; durable multi-session goals, gates, and ledger continuity belong to goal-protocol. |
| reviewed implementation plan | `planning-workflow` → `reviewed-plan` | `goal-protocol` | The result is a saved, strictly reviewed plan with a bounded revision loop, not a goal folder or execution lifecycle. |
| issue slicing | `planning-workflow` → `issues` | `goal-protocol` → `orchestrate` | This owner slices one-shot product/spec work into tracker issues; goal-protocol tickets require approved durable parent artifacts and waves. |
| issue triage | `planning-workflow` → `triage` | generic tracker operation | It owns configured classification, maintainer review, public-text preview, and durable rejection routing—not a generic comment or label command. |
| agent brief | `planning-workflow` → `agent-brief` | `goal-protocol` → `orchestrate` | An AFK brief is a one-shot issue contract; an orchestration ticket is parent-traced work inside an approved durable goal. |
| `/setup-matt-pocock-skills` | `planning-workflow` → `setup` | generic repository setup | It configures tracker vocabulary and domain-document discovery through maintainer-confirmed records before planning/triage action. |
| Zellij planner continuation | `agent-orchestration` → `mux-adapter` | `planning-workflow` → `reviewed-plan` | A persistent session is optional live transport; reviewed-plan owns the saved artifact and review contract, not pane mechanics. |
| live agent dispatch | `agent-orchestration` | `planning-workflow` | Dispatch without a requested planning artifact belongs to agent-orchestration. |

Metadata-visible legacy signals remain PRD, reviewed implementation plan, issue triage, issue slicing, agent brief, and `/setup-matt-pocock-skills`; the first sentence names out-of-scope records.

## Plan-build preservation disposition

The generic reviewed-plan contract remains implemented by `references/reviewed-plan.md`:

- one to three material clarification rounds;
- repository reconnaissance and a saved draft at `docs/plans/<plan-name>.md` or repository equivalent;
- strict review of verified files/ownership, rationale and alternatives, tests/edges/errors, migration/dependencies, order, verification, and open questions/defaults;
- categorized actionable feedback plus retained strengths, bounded to three revision rounds with `approved`, `needs-revision`, or `needs-decision` status; and
- delegated planner analysis without implementation mutation or Git commands.

The Zellij source's only reusable transport delta—live-discovered persistent-session continuation and injection of a bounded revision, feedback, or decision delta—is **merged** into `shared/general/agent-orchestration/references/mux-adapter.md`. Escape dismissal, carriage-return submission, input clearing, screen-dump monitoring, pane keystrokes, fixed session paths, model flags, runner scripts, and terminal input protocol are **dropped** as version-sensitive or nonessential. No future handoff remains.

## A34 preservation ledger

| Archived original | Qualifying non-default delta | Disposition |
| --- | --- | --- |
| `shared/general/planning-workflow` | Current-context PRD synthesis, domain glossary/ADR respect, material-question threshold, behavioral durable artifacts, and prototype-only path/snippet exception | Kept in `references/prd.md` and `SKILL.md` workflow/hard rules. |
| `shared/general/planning-workflow` | Vertical independently verifiable slices, AFK/HITL classification, granularity/dependency review, and no unapproved parent mutation | Kept in `references/issues.md`. |
| `shared/general/planning-workflow` | Configured one-category/one-state triage, prior-context/out-of-scope checks, reproduction before broad questioning, public preview, AI disclaimer, and maintainer overrides | Kept in `references/triage.md` and `SKILL.md` hard rules. |
| `shared/general/planning-workflow` | Durable AFK brief: current/desired behavior, interfaces not paths, independently testable acceptance criteria, and explicit non-goals | Kept in `references/agent-brief.md`. |
| `shared/general/planning-workflow` | Concept-level rejected-enhancement memory with durable rationale, prior requests, triage reuse, and reconsideration handling | Kept in `references/out-of-scope.md`; destructive deletion becomes a superseding-record default. |
| `shared/general/setup-matt-pocock-skills` | Explore before assumptions; one-at-a-time maintainer choices for tracker, label mapping, and domain layout; draft-before-edit; update existing guidance rather than duplicate it | Kept in `references/setup.md` and the setup route. |
| `shared/general/setup-matt-pocock-skills` | Existing `CLAUDE.md`/`AGENTS.md` selection rule and configured `docs/agents/` records | Kept in `references/setup.md`; provider command catalogs and seed templates are dropped as volatile/generated configuration detail. |
| `shared/general/setup-matt-pocock-skills` | `disable-model-invocation: true` macro behavior | Dropped from suite frontmatter because it cannot govern every mode; the explicit legacy trigger and authorization stop preserve the no-implicit-activation boundary. |
| prior generic `plan-build` | Reviewed-plan artifact and bounded strict-review loop | Kept in `references/reviewed-plan.md`. |
| prior Zellij `plan-build` | Persistent session continuation and bounded revision/feedback injection | Merged into `agent-orchestration/references/mux-adapter.md`. |
| prior Zellij `plan-build` | Escape, carriage-return, input-clear, screen-dump, pane keystroke, fixed path/model/runner, and terminal-input mechanics | Dropped with a volatility/nonessential reason; no future adapter or hidden owner remains. |

## A35 archive inventory

| Touched or inherited original | Archive path | Text lines |
| --- | --- | ---: |
| `planning-workflow` | `archive/triage-2026-07/shared/general/planning-workflow/` | 533 |
| `setup-matt-pocock-skills` | `archive/triage-2026-07/shared/general/setup-matt-pocock-skills/` | 251 |
| inherited generic `plan-build` | `archive/triage-2026-07/shared/general/plan-build/` | 633 |
| inherited Zellij `plan-build` | `archive/triage-2026-07/shared/variants/zellij/plan-build/` | 634 |

The two direct originals were archived before the original planning-workflow rewrite. This A34 revision changed no active planning package, so no additional planning-workflow snapshot was required.

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The retained delta is governed one-shot artifact work: reviewed-plan quality gates, configured triage/public-text safety, durable AFK briefs, rejection memory, and confirmed setup records. |
| A02 | PASS | PRDs, reviewed plans, issue work, triage, and AFK briefs recur without needing a long-lived goal lifecycle. |
| A03 | PASS | The collision matrix names first owners for durable goals, goal packets, live mux transport, and each claimed planning trigger. |
| A04 | PASS | Exactly one mode suite owns the one-shot product/issue artifact lifecycle. |
| A05 | PASS | `shared/general/planning-workflow` matches unique `name: planning-workflow`; validator checked canonical uniqueness. |
| A06 | PASS | Frontmatter has only `name` and a one-line description. |
| A07 | PASS | The two-sentence description is one physical line and within the suite 320-character limit. |
| A08 | PASS | It names the differentiated one-shot artifact capability and ends with six concrete legacy/artifact triggers. |
| A09 | PASS | The collision matrix supplies first owner, competitor, discriminator, and handoff for every trigger neighborhood. |
| A10 | PASS | Setup requires the explicit legacy phrase or explicit configuration request; generic planning, durable goals, and live dispatch are excluded. |
| A11 | PASS | `SKILL.md` remains 53 lines / 3,884 bytes, below the suite cap; validator remains applicable. |
| A12 | PASS | The unchanged active body is route, boundaries, workflow, hard rules, stops, output, and selected-reference routing only. |
| A13 | PASS | Every one of seven modes has one selection condition and resolving reference; the active file requires loading only the selected reference. |
| A14 | PASS | References are 9–13 lines each; the 126-line package is below all hard caps with no scripts, assets, or provider metadata. |
| A15 | DEFERRED | The active canonical body has no duplicate former package; bundle/provider parity remains intentionally unmodified. |
| A16 | PASS | Seven modes share the one-shot artifact and maintainer-decision lifecycle and fit the two-to-eight range. |
| A17 | PASS | Seven distinct kebab-case routes select one exact reference by default. |
| A18 | N/A | This is a mode suite, not a router. |
| A19 | N/A | This is a mode suite, so it has no router targets or router exposure rule. |
| A20 | PASS | Tracker/provider behavior is resolved from repository configuration, live help, and primary docs; no syntax or version is frozen. |
| A21 | PASS | Long templates, provider command catalogs, stale examples, and broad tutorials remain archived. |
| A22 | N/A | No volatile value is pinned as a pack constraint. |
| A23 | PASS | No credential, token, key, or secret URL appears in the active package. |
| A24 | PASS | The workflow does not discover secrets; it reports artifact, configuration, public-action, and decision status only. |
| A25 | PASS | All paths are repository-relative placeholders or conventions; no literal user home path exists. |
| A26 | PASS | Tracker, labels, and domain layout are discovered or confirmed; missing configuration stops for authorization rather than being guessed. |
| A27 | N/A | The active package has no scripts. |
| A28 | N/A | The active package has no assets or provider metadata. |
| A29 | PASS | Rules protect configured vocabulary, durable scope, AFK autonomy, public-text authorization, rejection authority, and setup confirmation without filler. |
| A30 | DEFERRED | Canonical/bundle/provider parity and final exposure await the excluded composition phase. |
| A31 | DEFERRED | Compose dry run and installed-view checks await that phase; local references and validator symlink checks pass. |
| A32 | PASS | Reconfirmed against accepted pilot artifacts `reports/pilot/code-quality.md` (suite shape) and `reports/pilot/herdr.md` (compact active/reference shape); no planning body change was needed. |
| A33 | PASS | 126 is strictly smaller than the 2,051-line direct-plus-inherited all-text consolidation corpus and below every hard cap. |
| A34 | PASS | The ledger now gives the Zellij plan-build delta a final merged or dropped disposition with no future-owner placeholder. |
| A35 | PASS | Direct and inherited originals are listed at exact archive paths; this report-only correction did not alter an active planning package. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/planning-workflow suite
PASS: shared/general/planning-workflow (suite)
```
