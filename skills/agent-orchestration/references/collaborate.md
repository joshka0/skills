# Collaborate

Use this mode when a live decision needs evidence from independent agents rather than a single implementation handoff.

Use the governing `GOAL_LEDGER.md` when the collaboration belongs to a durable goal. Otherwise keep a decision record when the work needs a persistent handoff. Record the question, participants, evidence, decision, dissent, and blocker; correct history through a superseding entry.

Name only the roles the decision needs: supervisor, context investigator, implementer or drafter, reviewer, adversarial reviewer, verifier, and synthesizer. Give each participant a bounded question, evidence expectation, and report destination.

Let independent passes finish before sharing an emerging answer unless cross-review is deliberate. A non-trivial convergence requires a reviewer or adversarial reviewer who did not author the proposal. Independence includes framing, not just authorship: point reviewers at the ground-truth artifacts (spec, originals, raw traces) rather than only the supervisor's summary, and keep the supervisor's brief itself in scope for refutation — a brief transmits its author's bias to everyone who reads it. The synthesizer separates agreed facts, unresolved dissent, decision rationale, and residual risk; the supervisor decides whether to act, request another pass, or hand off a durable lifecycle to `goal-protocol`.

## Briefing fresh eyes

A reviewer's critical lens is constructed by the brief, not assumed from the model. Build reviewer briefs with these elements:

1. **Ground truth first.** The reviewer reads the spec/kernel/originals *before* the deliverable, and pre-registers expectations — "list what a correct result must do" — before opening the work. Anchoring runs in file order.
2. **Blind where possible.** Give the question and the artifacts, not the author's conclusion. Strongest form: the reviewer produces its own independent answer first, then diffs against the author's.
3. **Allow either verdict.** Ask reviewers to test the requirements and plausible failure cases. Do not presuppose a flaw or request confirmation of a preferred result.
4. **Strip leading language.** No "looks solid, just double-check," no authorship, no stakes, no hoped-for outcome. Your evaluation words in the brief become the reviewer's prior.
5. **Name relevant failure cases.** Give scope without limiting review to the supervisor's suspected defects.
6. **Explain a clean result.** Report the coverage and remaining limits of a no-findings verdict; do not manufacture findings to fill a quota.
7. **Evidence symmetry.** Every finding needs path/line/repro or a failing check; every pass needs the check that proved it.

If private message or pane transport is required, use the `herdr` or `maestri` skill to discover targets and send safely. This mode owns the collaboration contract and non-goal ledger, not those private command surfaces.
