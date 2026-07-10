# Independent pilot rewrite review

Date: 2026-07-09

Authority: `reports/rubric/RUBRIC.md` as currently written, plus the consolidation decisions in `reports/triage/merged-kill-list.md`. This review inspected the five canonical packages, their selected references, the corresponding archived sources, the Terra self-reports, and the current Codex bundle/provider exposure. It did not read `reports/pilot/review-fable.md` and did not use git.

## Verdicts

| Skill | Verdict | Core reason |
| --- | --- | --- |
| `herdr` | **REVISE** | The private-tool delta survives, but reference selection is internally inconsistent, the replaced source is missing from the stated archive, and catalog parity is not complete. |
| `code-quality` | **REVISE** | Several valuable deltas survived, but the deterministic gate contract and part of the confidence-per-test filter were over-trimmed, two unsafe intents share one mode, and trigger/catalog collisions remain. |
| `grill-me` | **REVISE** | The opt-in interaction contract is sound, but docs mode lost the pack's fallback document shapes and the active catalog still exposes the absorbed sibling. |
| `go-lang` | **CUT** | The result is compact, but it is still generic idiomatic-Go guidance, has no demonstrated recurring demand or house divergence, and therefore fails the existence bar. |
| `infra-bundles` | **REVISE** | The consolidation retains useful high-stakes safety invariants, but its metadata claims generic triggers, neighboring ownership is unresolved, and router exposure has not been validated. |

No package qualifies for **CONFORMS** today. The final rubric says every item must be checked and reserves CONFORMS for all 33 passing (`reports/rubric/RUBRIC.md:433`, `reports/rubric/RUBRIC.md:473`); every self-report explicitly defers A30 and A31. More importantly, this is not merely paperwork: the Codex core bundle and provider currently contain the older copies of all five owners, and still expose absorbed siblings such as `diagnose`, `quality-gate`, `ruthless-test-strategy`, `thermo-nuclear-code-quality-review`, `improve-codebase-architecture`, `zero-tech-debt`, and `grill-with-docs` alongside their new owners.

## Checklist-honesty spot check

| Claim | Independent result |
| --- | --- |
| Mechanical validator | **PASS for all five.** `bin/validate-skill.sh` accepts each canonical package. This proves format, budget, local link, and secret/path checks covered by the script; it does not prove semantic collisions, preservation, or installed exposure. |
| A09 collision test | **FAIL for `code-quality`, `go-lang`, and `infra-bundles`; incomplete evidence for the reports generally.** `code-quality` and `go-lang` both claim performance-regression work (`shared/general/code-quality/SKILL.md:23`; `shared/general/go-lang/SKILL.md:16`) without precedence. `infra-bundles` advertises bare `state` and `a plan` (`shared/general/infra-bundles/SKILL.md:3`), even though the rubric explicitly rejects unqualified `plan` (`reports/rubric/RUBRIC.md:140`). The self-reports compare internal modes, not every retained neighbor in the trigger neighborhood. `grill-me` passes because its quoted invocation is exclusive; `herdr` is adequately tool-qualified. |
| A13 reference selection | **Mostly PASS; `herdr` FAILS.** All paths resolve and the other four packages give an observable condition per reference. Herdr says to read `command-recipes.md` only for creating, focusing, splitting, or waiting (`shared/general/herdr/SKILL.md:12`), while the same reference also contains pane-operation and agent-exchange recipes (`shared/general/herdr/references/command-recipes.md:17`, `:30`) that duplicate the active workflow and are not fully covered by that condition. |
| A20–A22 volatility | **PASS for all five.** The packages contain no volatile API matrices or unlabeled pins. Herdr uses installed CLI help/live state; code-quality uses repository/lockfile/types before current docs; Go and infra explicitly use repository state, live tools, then primary docs; grill-me contains no volatile API facts. |
| A15 active duplication | **FAIL for all five, contrary to each A15 PASS claim.** A15 explicitly includes siblings, bundles, and providers (`reports/rubric/RUBRIC.md:449`). The stale Codex copies and exposed absorbed children make the claims factually false even if composition was out of the rewrite's edit scope. Deferral belongs under A30/A31; it does not turn A15 green. |
| A19 router exposure | **Unsupported for `infra-bundles`.** Its report marks A19 PASS while saying overlay exposure is deferred (`reports/pilot/infra-bundles.md:35`), but no-router-and-children exposure is part of A19 itself. |
| A30–A31 composition | **Correctly marked DEFERRED, therefore acceptance is incomplete.** The current bundle/provider state confirms the deferral is substantive. |
| A32 review evidence | **Unsupported for `code-quality`.** Terra's self-report says the designated golden example was “independently reviewed” and had no in-scope finding (`reports/pilot/code-quality.md:48`, `:58`), yet the archived deterministic gate schema was not preserved. A self-report is not independent review evidence. |
| A33 net shrink | **Numerically PASS and honestly reported for all five:** Herdr 175→99, code-quality 3,093→160, grill 222→64, Go 476→99, and infra 1,184→86 text lines; each is also under its cap. A33 nevertheless says nothing about whether qualifying deltas survived, which is the central over-trimming failure in this pilot. |

## `herdr` — REVISE

### What survived

This rewrite clears the existence bar strongly: it records a private local tool contract no model could infer. It preserves the consequential distinctions between literal `agent send`, shell-executing `pane run`, and keystroke-only `send-text`; requires live workspace/tab/pane/agent resolution; confirms state after a send; and forbids guessing IDs or leaking secrets. Those are the right durable deltas, not an API tour.

### Defects

1. **A13/A15 — the lone reference has an inaccurate load condition and duplicated active instructions.** The route condition at `shared/general/herdr/SKILL.md:12` excludes ordinary pane inspection and agent exchange, yet `references/command-recipes.md` dedicates sections to both. Its `agent list/read/send/wait` sequence substantially repeats `SKILL.md:16-30`. Either broaden the selection condition to every recipe-bearing operation and remove active duplication, or split/trim the reference so its contents match the named condition.
2. **A29 — the output contract assumes a mutation.** `SKILL.md:51` always demands the transport used and observed post-send state, even for a read, list, focus, or workspace-creation request. Make the post-send fields conditional on a send/command action.
3. **A15/A30/A31 — canonical and installed views disagree.** `bundles/codex/core/herdr/SKILL.md` and `providers/codex/herdr/SKILL.md` are still the older 175-line body. Until composition is refreshed and checked, the rewritten contract is not the active contract.
4. **Archive/provenance defect.** No `herdr` package exists under `archive/triage-2026-07/`, although the pilot says replaced packages moved there and derives A33 from a 175-line predecessor. The predecessor is recoverable only from stale bundle/provider copies. Put the displaced canonical source in the declared archive before those copies are refreshed.
5. **Self-report drift.** The result correctly gives 2,616 bytes, while its A11 row gives 2,534 bytes (`reports/pilot/herdr.md`). Recompute acceptance evidence from the final artifact.

### Required revision

Keep the private-tool leaf. Align the reference boundary, make output conditional, archive the displaced source, then refresh and verify bundle/provider parity and rerun A01–A33 without deferrals.

## `code-quality` — REVISE

### What survived from the 3,093-line cluster

The 95% reduction was not a wholesale deletion. Several genuinely non-default deltas remain:

- The architecture deletion test and the one-adapter/two-adapter seam rule survive in `references/architecture.md:5-9`.
- The diagnosis loop still requires a trustworthy reproduction, three to five ranked falsifiable hypotheses, one-variable probes, tagged instrumentation, a performance baseline, a real regression seam, and cleanup in `references/diagnose.md:5-10`.
- Sprawl review retains code-judo, scattered-condition, thin-abstraction, atomicity, and line-anchored evidence checks in `references/review-sprawl.md`.
- Clean-slate work retains caller-backed deletion of aliases, wrappers, fallbacks, compatibility branches, and duplicate types in `references/refactor.md:5-11`.
- Test strategy retains behavior risk, appropriate test boundary, outcome-over-choreography, and the deletion question in `references/test-strategy.md:5-11`.

Those deltas justify a consolidated owner. The defects are preservation and routing defects, not an argument to restore the tutorials.

### Defects

1. **Over-trimmed deterministic gate contract.** The current `references/quality-gate.md:5-11` names three decisions and loose blocking conditions, but deletes the exact machine-readable schema, severity policy, warning budget, required-check treatment, unknown-severity policy, counts, and incomplete-check list from `archive/triage-2026-07/shared/codex/quality-gate/references/output-schema.md:5-42`. The approved consolidation explicitly depended on preserving this deterministic delta. Restore a compact exact output schema and decision table; do not restore provider-specific CodeRabbit ceremony.
2. **Over-trimmed confidence-per-test filter.** `references/test-strategy.md` keeps the deletion question but drops the explicit value/cost calculus from `archive/triage-2026-07/shared/general/ruthless-test-strategy/SKILL.md:21-63`: regression probability, impact, execution speed, diagnostic clarity, maintenance cost, flakiness, and false-confidence risk. Restore that as a short scoring/filter procedure, not a long catalog of test types.
3. **Unsafe mode conflation.** `refactor` covers both behavior-preserving refactoring and a clean-slate rewrite (`shared/general/code-quality/SKILL.md:16`; `references/refactor.md:3`). Those intents have opposite compatibility defaults. Make clean-slate/zero-debt an explicit separate mode, or require an unmistakable clean-slate invocation before compatibility deletion; an ordinary refactor must remain behavior-preserving.
4. **A08/A09 — pre-routing signals are incomplete and collide.** The description does not expose several absorbed trigger terms (`thermonuclear`, `zero-tech-debt`, `ruthless test strategy`, ShoeHorn, regression), so the internal route table cannot help before the skill loads. It also claims performance regression alongside `go-lang`. Add the few proven legacy phrases that matter, within the six-signal budget, and state owner precedence for language-specific versus general diagnosis.
5. **A15/A30/A31 — the consolidation is not reflected in exposure.** The old owner and the absorbed quality/diagnosis children remain simultaneously present in the Codex core bundle and provider. Remove child exposure only after copying the revised canonical owner, then inspect compose output and installed metadata.
6. **A32 — the self-report overclaims review.** “Independently reviewed” and “no in-scope finding” are contradicted by the archived gate-schema omission. Replace this with the actual review disposition and evidence.

### Required revision

Restore the compact deterministic gate schema and confidence/cost filter, split or hard-gate clean-slate behavior, repair pre-routing ownership, then complete catalog composition. The correct end state is still one `code-quality` suite, not a return to separate children.

## `grill-me` — REVISE

### What survived

The rewrite correctly preserves a named interaction contract that the model should not silently infer: exact opt-in invocation, one concrete question per turn, a recommended answer and basis, repository lookup instead of unnecessary questioning, decision carry-forward, and an explicit stopping point. Docs mode also retains evidence checks, narrow writes, user confirmation, and the three-part ADR threshold. The quoted phrase plus `disable-model-invocation: true` makes accidental activation unlikely.

### Defects

1. **Over-trimmed docs fallback.** `references/docs-mode.md:15-23` tells the executor to update or create context and ADR records, but gives no canonical fallback when the repository has no local convention. The archived `CONTEXT-FORMAT.md:1-77` supplied a compact context/relationships/ambiguities model, and `ADR-FORMAT.md:3-27` supplied a minimal decision record and numbering rule. Preserve a much smaller fallback schema in a reference or asset; local repository conventions should still win.
2. **A15/A30/A31 — the absorbed sibling is still exposed.** Both old `grill-me` and separate `grill-with-docs` entries remain in `bundles/codex/core` and `providers/codex`, so the intended single owner does not yet exist for users.
3. **Rubric/validator mismatch.** The rubric classifies this as an explicit interaction mode (`reports/rubric/RUBRIC.md:23`), but `bin/validate-skill.sh` does not accept that archetype, forcing the pilot to validate it as a leaf. This does not invalidate the content, but it makes A04 mechanically unverifiable under the rubric's own vocabulary.
4. **Provider-key portability needs an explicit exposure rule.** `disable-model-invocation` has a known Claude Code consumer, but this canonical shared package is composed to non-Claude providers too. The rubric should say whether unknown frontmatter keys must be stripped in overlays or are required to be harmless when ignored; the pilot currently assumes the latter without evidence.

### Required revision

Keep one explicit interaction package with `standard` and `docs` modes, restore only a compact no-local-convention document fallback, and remove the old/sibling exposure during composition.

## `go-lang` — CUT

### Positive assessment

As a compression exercise, this is clean. It retains consumer-owned interfaces, public API support-cost reasoning, explicit error inspection boundaries, goroutine ownership/cancellation/bounds, race checks, and baseline-before-performance claims. Its references are selective, volatile details defer to installed tools and primary docs, and A33 is honest.

### Why the slot still fails

1. **A01/A02 — no demonstrated non-default owner delta.** The rules in `shared/general/go-lang/SKILL.md:22-33` and its three references are good idiomatic Go practice, but not a private topology, house divergence, exact downstream gate, or deterministic local procedure. The rubric is explicit that generic domain knowledge and a broad language label do not qualify (`reports/rubric/RUBRIC.md:47-55`). A strong coding agent using repository conventions, `go test`, `go vet`, `go test -race`, benchmarks, and current Go documentation should already behave this way.
2. **The approved plan supplies no demand counterweight.** It records zero uses ever and says to archive the merged owner if no Go work is coming (`reports/triage/merged-kill-list.md:36`). This review found no declared incoming Go program or opinionated pack-specific Go contract.
3. **A09 — performance ownership collides with `code-quality`.** `verification-evidence` claims performance regressions while `code-quality` claims the same failure class. The descriptions contain no first-owner rule.
4. **A15/A30/A31 remain incomplete.** The old router is still the active bundle/provider copy. This rollout issue would need correction if the skill were retained, but it does not rescue the failed existence gate.

### Disposition

Archive the consolidated package rather than restoring seven Go slots. Reconsider only when recurring Go work produces a durable house policy or exact contract that current docs and strong-model defaults do not supply.

## `infra-bundles` — REVISE

### What survived

The 86-line result retains more than a generic command catalog: desired-versus-live comparison, evidence before restart, configuration/state/provider ownership separation, replacement/downtime/rollback review, no blind apply, state edits only as a last resort, and no routine targeting. These are compact, high-stakes operational invariants, and the approved plan selected the 6→1 shape rather than six exposed manuals. That is enough to revise before making the plan's separate usage-based archive decision.

### Defects

1. **A08/A09 — metadata uses generic and greedy-enough signals.** The description's bare `state` and `a plan` (`shared/general/infra-bundles/SKILL.md:3`) can steal application state, project plans, goal plans, and code plans. Replace them with `Terraform/OpenTofu state`, `Terraform/OpenTofu plan`, or equivalent qualified artifacts. Keep the total within six signals as required by the rubric.
2. **A09 — neighboring owner precedence is absent.** The report compares only the four internal targets. State explicitly that Kubernetes/IaC desired/live work belongs here, source-code diagnosis remains with `code-quality`, and product/implementation planning remains with its planning owner. A generic “failure,” “audit,” or “plan” cannot decide among them before load.
3. **A19 — the self-report marks an unverified condition PASS.** One-hop reference resolution passes, but default-overlay exposure is part of A19 and was deferred. Mark A19 incomplete until bundle/provider inspection proves the router is not co-exposed with its retired children.
4. **A15/A30/A31 — the active overlay is stale.** The current Codex bundle/provider still contains the older router body. Refresh canonical copies, remove retired child exposure, dry-run composition, and inspect the installed view.
5. **Existence rationale needs an owner decision.** The approved plan explicitly leaves “does infra work still happen?” open because the cluster had zero measured uses. A01 can justify the high-stakes invariants, but A02 cannot be signed indefinitely without an owner confirming recurring infra work. If the answer is no, apply the plan's archive option rather than polishing the router.

### Required revision

Qualify all metadata triggers, document neighbor precedence, complete composition, and obtain the explicit recurring-use decision. If infra work remains in scope, keep the 6→1 package; if not, CUT the whole suite as the approved plan permits.

## Rubric changes exposed by the pilot

### R1 — Add a preservation ledger to consolidation acceptance

A33 rewards shrink but does not prove preservation. Require every consolidation/trim to inventory each archived skill's qualifying non-default deltas and classify each as **kept at `<path>`**, **merged into `<mode/reference>`**, or **dropped with existence-bar reason**. Reviewers should reject an unaccounted qualifying delta even when line counts pass. This would have caught the deleted quality-gate schema, the weakened test-value filter, and the missing grill docs fallback without encouraging restoration of tutorials.

### R2 — Make A09 produce a catalog-level collision artifact

Require a matrix over the final retained descriptions in the same trigger neighborhood, with each claimed phrase/artifact, its first owner, nearest competitor, discriminator, and any precedence/handoff rule. For a consolidated suite, also require evidence that important absorbed legacy invocations remain selectable from metadata; an internal mode table is invisible until after routing. Add a fail-closed check for unqualified forbidden generic triggers where feasible. This would have caught the Go/code-quality performance collision and infra's bare `plan`/`state` claims.

### R3 — Separate package conformance from catalog conformance and align the validator's archetypes

Define a **PACKAGE-CONFORMS** gate for body/reference checks that can pass before composition, and a final **CATALOG-CONFORMS** gate that additionally requires A15, A19, A30, and A31 across bundles/providers/installed views. Keep the public reviewer verdict CONFORMS only for the latter. Teach `bin/validate-skill.sh` the rubric's `explicit-interaction` archetype and define how provider-specific frontmatter is handled in shared overlays. This prevents self-reports from calling deferred catalog checks PASS while still allowing pilot content to receive an honest intermediate status.
