# Pilot review — Fable

Date: 2026-07-09. Reviewed all 5 pilot rewrites against RUBRIC.md and the archived originals. Written before reading sol's review.

## Verdicts

| Skill | Verdict | Notes |
| --- | --- | --- |
| `herdr` (private-leaf) | **CONFORMS** | The transport gotchas (send vs run vs send-text+enter, quoting, target ambiguity, no-secrets) all survived; command catalog lives in `references/command-recipes.md` with a proper read-when condition. 99 package lines from 175 with no safety loss I can find. |
| `code-quality` (suite) | **CONFORMS, one REVISE item** | 10 modes at the consolidated-owner ceiling; the load-bearing deltas survived compression (deletion test, two-adapters seam rule, boundary-only mocking, gate verdict schema, diagnose feedback-loop discipline, Keep/Delete/Rewrite suite verdicts). REVISE: `zero-tech-debt`'s day-one/hard-cut posture is only implicit in `refactor`'s "clean-slate rewrite" — one sentence in refactor.md should state the posture explicitly (rework as if the intended architecture existed from day one; delete compatibility cruft). |
| `grill-me` (leaf) | **CONFORMS** | Correct `disable-model-invocation`, docs mode absorbed with write boundary, one-question-at-a-time contract intact. |
| `go-lang` (suite) | **CONFORMS** | Best of the five. 7 skills → 3 decision surfaces (public-contract, goroutine-lifetime, verification-evidence); what remains is genuinely opinionated (goroutine ownership, exported API as commitment, no producer-side test interfaces, no unevidenced perf changes). Correct application of the volatility policy. |
| `infra-bundles` (router) | **CONFORMS** | 4 targets, safety invariants preserved (audit-before-mutate, evidence-before-restart, declarative end-state), routes only. |

## Process findings

1. **Archive asymmetry**: rewritten-in-place skills (herdr) did not get their originals archived; absorbed/replaced ones did. Originals are recoverable from the baseline commit, but the fleet convention should be uniform: archive the original of every rewritten skill, not only replaced ones.
2. **160-line suite total is legitimate.** I went in expecting over-trimming at code-quality's compression ratio (~2,900 combined → 160). Reading every mode reference against its archived original: the deltas are there; what died was tutorial prose, repeated cautions, and pep talk. The rubric's compression demand is validated.
3. **Trigger-phrase drift risk**: rewritten descriptions dropped some literal user phrases (e.g. "thermo-nuclear" survives only inside the mode table; "TDD" survives; "ruthless" is gone). Fleet rule: when absorbing a skill users invoke by name, its invocation phrase must appear in the owning description or mode table. Mode tables cover this for code-quality; check per skill.

## Rubric changes recommended from the pilot

- Add to §12/mechanics: "archive the pre-rewrite original of every touched skill under `archive/<wave>/`, including in-place rewrites."
- Add to §4: "a phrase users are known to invoke verbatim (slash command, skill name) MUST survive in the owning skill's description or mode table."

## Gate decision

Golden examples: accept `herdr` (private-leaf) and `code-quality` (suite) as the golden examples once the zero-debt sentence lands. Fleet is unblocked from my side subject to sol's independent review.
