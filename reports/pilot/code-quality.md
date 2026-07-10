# Pilot acceptance — code-quality (revision)

## Verdict

**PACKAGE-CONFORMS.** Canonical package checks pass. Catalog checks remain deferred because this task forbids bundle/provider composition: A15's bundle/provider clause, A30, and A31 are not claimed as passed.

## Result

- Canonical home: `shared/general/code-quality`
- Archetype: consolidated mode suite with 10 modes.
- Final package: 187 text lines / 12,744 bytes; replaced source packages: 3,093 text lines.
- Net shrink: 2,906 lines while retaining the qualifying deltas below.
- Validator: `PASS: shared/general/code-quality (suite)`

## Collision matrix

| Claimed phrase or artifact | First owner | Nearest competitor | Discriminator / precedence |
| --- | --- | --- | --- |
| `thermonuclear review` | `code-quality` → `review-sprawl` | archived thermonuclear review | Explicit harsh structural pass; never a silent default. |
| `ruthless test strategy` | `code-quality` → `test-strategy` | archived ruthless-test-strategy | Confidence-per-test, value/cost filter, and pruning. |
| `TDD` | `code-quality` → `tdd` | generic implementation work | Explicit test-first/red-green-refactor request. |
| `zero tech debt` | `code-quality` → `clean-slate` | ordinary `refactor` | Requires explicit clean-slate/zero-tech-debt/hard-cut invocation before deleting compatibility. |
| `ShoeHorn migration` | `code-quality` → `test-strategy` | generic TypeScript migration | Test-only assertion migration after installed-package inspection. |
| `merge gate` | `code-quality` → `quality-gate` | generic review | Deterministic readiness decision with policy and result schema. |
| non-Go diagnosis | `code-quality` → `diagnose` | `go-lang`, `infra-bundles` | Go performance/verification goes to `go-lang`; Kubernetes/IaC desired/live failure goes to `infra-bundles`. |

The description preserves the important absorbed invocations visible before skill load: thermonuclear, ruthless test strategy, TDD, zero tech debt, ShoeHorn migration, and merge gate.

## A34 preservation ledger

| Replaced source | Qualifying non-default delta | Disposition |
| --- | --- | --- |
| old `code-quality` | Small coherent change, behavior-facing test, TDD, regression, and ShoeHorn migration routes | Kept in `implement-small.md`, `tdd.md`, `regression.md`, and `test-strategy.md`; old tutorial material dropped as generic guidance. |
| `ruthless-test-strategy` | Confidence-per-test value/cost filter, risk-to-boundary selection, outcome assertions, keep/delete/rewrite judgment | Kept in `test-strategy.md`; catalog-of-pattern prose dropped as generic reference material. |
| `thermo-nuclear-code-quality-review` | Explicit harsh code-judo pass; branch, wrapper, type, ownership, and atomicity pressure | Merged into `review-sprawl.md`; persona framing and arbitrary line threshold dropped. |
| `quality-gate` | Evidence-based readiness decision, fixed severity/check policy, decision outcomes, deterministic result fields | Kept in `quality-gate.md`; provider-specific review-loop ceremony dropped. |
| `improve-codebase-architecture` | Deletion test, interface-as-test-surface, one-versus-two-adapter seam rule | Kept in `architecture.md`; interactive docs/grilling behavior belongs to `grill-me` docs mode. |
| `zero-tech-debt` | Day-one intended-shape posture, caller-evidenced compatibility deletion, canonical ownership | Kept in `clean-slate.md`; broad cleanup-tool catalog dropped as generic. |
| `diagnose` | Trusted feedback loop, ranked falsifiable hypotheses, one-variable probes, tagged instrumentation, regression seam, cleanup | Kept in `diagnose.md`; raw-input local HITL script dropped as unsafe/nonportable. |
| prior pilot `migrate-shoehorn` reference | Test-only assertion migration and installed-version check | Merged into `test-strategy.md`; prior compact reference preserved at `archive/triage-2026-07/shared/general/code-quality/revision-1-migrate-shoehorn.md`. |

## A35 archive-in-place originals

The pre-rewrite originals exist at `archive/triage-2026-07/shared/general/code-quality/`, `.../ruthless-test-strategy/`, `.../thermo-nuclear-code-quality-review/`, `.../improve-codebase-architecture/`, `.../zero-tech-debt/`, `.../diagnose/`, and `archive/triage-2026-07/shared/codex/quality-gate/`.

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | Consolidated owner supplies non-default evidence, gating, clean-slate, architecture, and diagnosis contracts. |
| A02 | PASS | These quality passes recur across implementation, review, and failure resolution. |
| A03 | PASS | The collision matrix names one owner for each absorbed and neighboring intent. |
| A04 | PASS | Exactly one consolidated mode suite. |
| A05 | PASS | Canonical directory/name match and validator confirms uniqueness. |
| A06 | PASS | Minimal two-key frontmatter. |
| A07 | PASS | One-line, two-sentence suite description within 320 characters. |
| A08 | PASS | Concrete capability plus six metadata-visible legacy selection signals. |
| A09 | PASS | Collision matrix supplies first owner, competitor, discriminator, and precedence. |
| A10 | PASS | Harsh and clean-slate behavior require explicit phrases. |
| A11 | PASS | Validator passed the suite budget. |
| A12 | PASS | Active file is route, shared workflow, rules, stops, output, and precedence only. |
| A13 | PASS | Ten exact route references resolve; only the selected one is loaded. |
| A14 | PASS | All references and the 187-line package are within hard budgets. |
| A15 | DEFERRED | Canonical references are non-duplicated; stale bundle/provider copies cannot be corrected in this scope. |
| A16 | PASS | Ten modes share a quality lifecycle and use the >=4-absorbed-skill exception. |
| A17 | PASS | Ten kebab-case rows select one reference by default. |
| A18 | N/A | Not a router. |
| A19 | N/A | Not a router. |
| A20 | PASS | Volatile tool details follow repository state, live help, then primary docs. |
| A21 | PASS | No copied external manual or provider ceremony remains. |
| A22 | N/A | No pinned volatile pack constraint. |
| A23 | PASS | No secret-bearing content. |
| A24 | PASS | Evidence policy exposes paths, counts, traces, and check status only. |
| A25 | PASS | No literal user home path. |
| A26 | PASS | Missing repo/tool facts are blocked rather than guessed. |
| A27 | PASS | No active scripts; unsafe legacy HITL template stays archived. |
| A28 | PASS | No active assets or provider metadata. |
| A29 | PASS | Rules preserve explicit evidence, behavior, invocation, and output boundaries. |
| A30 | DEFERRED | Canonical/bundle/provider parity awaits a permitted composition pass. |
| A31 | DEFERRED | Compose dry run and installed-view checks await that pass; validator covers local links and symlinks. |
| A32 | PASS | Revised against both converged reviews and the rubric's mode-suite golden shape. |
| A33 | PASS | 187 < 3,093 and below the 1,200-line consolidated-owner cap. |
| A34 | PASS | Preservation ledger above accounts for every qualifying absorbed delta. |
| A35 | PASS | Archive-in-place originals are listed above. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/code-quality suite
PASS: shared/general/code-quality (suite)
```
