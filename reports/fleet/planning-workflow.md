# Fleet acceptance — planning-workflow

## Verdict

**PACKAGE-CONFORMS.** The canonical one-shot artifact suite passes package-judgable acceptance. A15's bundle/provider clause, A30, and A31 are **DEFERRED** because composition is explicitly out of scope; A19 is not applicable to a suite.

## Result

- Canonical home: `shared/general/planning-workflow`
- Archetype: mode suite with seven modes: `prd`, `reviewed-plan`, `issues`, `triage`, `agent-brief`, `out-of-scope`, and `setup`.
- Final package: 126 text lines / 10,321 bytes.
- Archived originals: 784 text lines; active-package reduction: 658 lines.
- `setup-matt-pocock-skills` survives only as the selected `setup` mode. The previously archived `plan-build` bodies now have their required reviewed-plan outcome in this owner without becoming a standalone skill.
- Composition status: no bundle, provider, mirror, or provider-current file changed.

## Collision matrix

| Phrase or artifact | First owner | Nearest competitor | Discriminator and handoff |
| --- | --- | --- | --- |
| PRD | `planning-workflow` → `prd` | `goal-protocol` | This owner creates a one-shot product artifact; durable multi-session goals, gates, and ledger continuity belong to `goal-protocol`. |
| reviewed implementation plan | `planning-workflow` → `reviewed-plan` | `goal-protocol` | The result is a saved, strictly reviewed plan with a bounded revision loop, not a goal folder or execution lifecycle. |
| issue slicing | `planning-workflow` → `issues` | `goal-protocol` → `orchestrate` | This owner slices one-shot product/spec work into tracker issues; goal-protocol tickets require approved durable parent artifacts and waves. |
| issue triage | `planning-workflow` → `triage` | generic tracker operation | It owns configured classification, maintainer review, public-text preview, and durable rejection routing—not a generic comment or label command. |
| agent brief | `planning-workflow` → `agent-brief` | `goal-protocol` → `orchestrate` | An AFK brief is a one-shot issue contract; an orchestration ticket is parent-traced work inside an approved durable goal. |
| `/setup-matt-pocock-skills` | `planning-workflow` → `setup` | generic repository setup | It configures tracker vocabulary and domain-document discovery through maintainer-confirmed records before planning/triage action; it requires explicit invocation or setup authorization. |
| live agent dispatch | `agent-orchestration` | `planning-workflow` | Dispatch without a requested planning artifact belongs to `agent-orchestration`. |

Metadata-visible legacy signals are PRD, reviewed implementation plan, issue triage, issue slicing, agent brief, and `/setup-matt-pocock-skills`; the first sentence also names out-of-scope records.

## Plan-build preservation handoff

The generic reviewed-plan contract is now implemented by `references/reviewed-plan.md`:

- one to three material clarification rounds;
- repository reconnaissance and a saved draft at `docs/plans/<plan-name>.md` or repository equivalent;
- strict review of exact verified files/ownership, rationale and alternatives, tests/edges/errors, migration/dependencies, order, verification, and open questions/defaults;
- categorized actionable feedback plus retained strengths, bounded to three revision rounds with `approved`, `needs-revision`, or `needs-decision` status; and
- delegated planner analysis without implementation mutation or Git commands.

The Zellij `plan-build` body remains archived at `archive/triage-2026-07/shared/variants/zellij/plan-build`. Its only additional qualifying delta is a persistent-session transport adapter (background start, Escape dismissal, carriage-return submission, input clear, screen-dump monitoring, and same-session revision injection). It is intentionally handed to a future optional planner/agent-orchestration adapter, not made a second planning workflow or a default part of reviewed-plan semantics.

## A34 preservation ledger

| Archived original | Qualifying non-default delta | Disposition |
| --- | --- | --- |
| `shared/general/planning-workflow` | Current-context PRD synthesis, domain glossary/ADR respect, material-question threshold, behavioral durable artifacts, and prototype-only path/snippet exception | Kept in `references/prd.md` and `SKILL.md` Workflow/Hard rules. |
| `shared/general/planning-workflow` | Vertical independently verifiable slices, AFK/HITL classification, granularity/dependency review, no unapproved parent mutation | Kept in `references/issues.md`. |
| `shared/general/planning-workflow` | Configured one-category/one-state triage, prior-context/out-of-scope checks, reproduction before broad questioning, public preview, AI disclaimer, and maintainer overrides | Kept in `references/triage.md` and `SKILL.md` Hard rules. |
| `shared/general/planning-workflow` | Durable AFK brief: current/desired behavior, interfaces not paths, independently testable acceptance criteria, and explicit non-goals | Kept in `references/agent-brief.md`. |
| `shared/general/planning-workflow` | Concept-level rejected-enhancement memory with durable rationale, prior requests, triage reuse, and reconsideration handling | Kept in `references/out-of-scope.md`; destructive deletion becomes a superseding-record default. |
| `shared/general/setup-matt-pocock-skills` | Explore before assumptions; one-at-a-time maintainer choices for tracker, label mapping, and domain layout; draft-before-edit; update existing guidance block rather than duplicate it | Kept in `references/setup.md` and `SKILL.md` setup route. |
| `shared/general/setup-matt-pocock-skills` | Existing `CLAUDE.md`/`AGENTS.md` selection rule and configured `docs/agents/` records | Kept in `references/setup.md`. Provider CLI command catalogs and seed templates are dropped as volatile/generated configuration detail. |
| `shared/general/setup-matt-pocock-skills` | `disable-model-invocation: true` macro behavior | Dropped from suite frontmatter: it cannot safely govern every mode. The explicit `/setup-matt-pocock-skills` trigger and stop-for-authorization rule preserve its no-implicit-activation boundary. |
| prior `shared/general/plan-build` | Reviewed-plan artifact and bounded strict-review loop | Kept in `references/reviewed-plan.md`; see plan-build handoff above. |
| prior Zellij `plan-build` | Persistent Zellij planner transport adapter | Handed to a future optional planner/agent-orchestration adapter; archived body remains authoritative until that scoped adapter work occurs. |

## A35 archive inventory

| Touched original | Archive path | Archived text lines |
| --- | --- | ---: |
| `planning-workflow` | `archive/triage-2026-07/shared/general/planning-workflow` | 533 |
| `setup-matt-pocock-skills` | `archive/triage-2026-07/shared/general/setup-matt-pocock-skills` | 251 |
| **Total** |  | **784** |

The inherited plan-build preservation inputs remain at `archive/triage-2026-07/shared/general/plan-build` (633 lines) and `archive/triage-2026-07/shared/variants/zellij/plan-build` (624 lines); they were archived before this workstream and were not moved or recreated here.

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The retained delta is governed one-shot artifact work: reviewed-plan quality gates, configured triage/public-text safety, durable AFK briefs, concept-level rejection memory, and confirmed setup records. |
| A02 | PASS | PRDs, reviewed plans, issue work, triage, and AFK briefs recur across product delivery without needing a long-lived goal lifecycle. |
| A03 | PASS | The collision matrix names first owners for durable goals, goal tickets, live dispatch, and each claimed planning trigger. |
| A04 | PASS | Exactly one mode suite owns the one-shot product/issue artifact lifecycle. |
| A05 | PASS | `shared/general/planning-workflow` matches unique `name: planning-workflow`; validator checks canonical uniqueness. |
| A06 | PASS | Frontmatter has only `name` and a one-line description. |
| A07 | PASS | The two-sentence description is one physical line and within the suite 320-character limit. |
| A08 | PASS | It names the differentiated one-shot artifact capability and ends with six concrete legacy/artifact triggers. |
| A09 | PASS | The collision matrix supplies first owner, competitor, discriminator, and handoff for every trigger neighborhood. |
| A10 | PASS | Setup requires the explicit legacy phrase or explicit configuration request; generic planning, durable goals, and live dispatch are excluded. |
| A11 | PASS | `SKILL.md` is 53 lines / 3,884 bytes, below the suite 120-line / 10 KiB cap; validator passes. |
| A12 | PASS | The active body is route, boundaries, shared workflow, hard rules, stops, output, and selected-reference routing only. |
| A13 | PASS | Every one of seven modes has one selection condition and resolving reference; the active file requires loading only the selected reference. |
| A14 | PASS | References are 9–13 lines each; the 126-line / 10,321-byte package is below all package caps with no scripts, assets, or provider metadata. |
| A15 | DEFERRED (bundle/provider clause) | The active canonical body has no duplicate former package. Bundle/provider parity and stale exposure remain intentionally unmodified. |
| A16 | PASS | Seven modes share the one-shot artifact and maintainer-decision lifecycle and fit the two-to-eight mode range. |
| A17 | PASS | Seven distinct kebab-case routes select one exact reference by default; `prd` is the documented fallback only for an otherwise unspecified one-shot artifact. |
| A18 | N/A | This is a mode suite, not a router. |
| A19 | N/A | This is a mode suite, not a router. |
| A20 | PASS | Tracker/provider behavior is resolved from repository configuration, live help, and primary docs; no CLI/API syntax or version is frozen. |
| A21 | PASS | Long templates, provider command catalogs, stale examples, and broad tutorials were removed or archived. |
| A22 | N/A | No volatile value is pinned as a pack constraint. |
| A23 | PASS | No credential, token, key, or secret URL appears in the active package. |
| A24 | PASS | The workflow does not discover secrets; it reports artifact, configuration, public-action, and decision status only. |
| A25 | PASS | All paths are repository-relative placeholders or conventions; no literal user home path exists. |
| A26 | PASS | Tracker, labels, and domain layout are discovered or confirmed; missing configuration stops for explicit setup authorization rather than being guessed. |
| A27 | N/A | The active package has no scripts. |
| A28 | N/A | The active package has no assets or provider metadata. |
| A29 | PASS | Rules protect configured vocabulary, durable scope, AFK autonomy, public-text authorization, rejection authority, and setup confirmation without filler. |
| A30 | DEFERRED | Canonical/bundle/provider parity and final exposure await the explicitly excluded composition phase. |
| A31 | DEFERRED | Local references and validator symlink checks pass; compose dry run and installed-view checks await that phase. |
| A32 | PASS | The suite follows the code-quality golden mode-table/reference shape and the herdr compact active/reference boundary, with rubric-first collision and preservation evidence. |
| A33 | PASS | 126 active package lines is strictly smaller than 784 replaced lines and below every hard cap. |
| A34 | PASS | The preservation ledger accounts for the two archived sources plus inherited plan-build and Zellij-plan-build deltas. |
| A35 | PASS | The archive inventory proves both pre-rewrite originals, including the in-place planning-workflow rewrite, were archived before recreation. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/planning-workflow suite
PASS: shared/general/planning-workflow (suite)
```
