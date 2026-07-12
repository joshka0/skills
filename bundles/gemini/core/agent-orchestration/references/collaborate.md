# Collaborate

Use this mode when a live decision needs evidence from independent agents rather than a single implementation handoff.

Use an existing `GOAL_LEDGER.md` only when the collaboration belongs to that durable goal. Otherwise create or reuse `docs/collaboration/<slug>/COLLABORATION_LEDGER.md` before assigning material work. Keep its current snapshot mutable: question, desired outcome or convergence threshold, participants and scopes, active work, current decision, and blocker. Append decisions, dissent, validation, and handoffs; correct history through a superseding entry rather than deletion.

Name only the roles the decision needs: supervisor, context investigator, implementer or drafter, reviewer, adversarial reviewer, verifier, and synthesizer. Give each participant a bounded question, evidence expectation, and report destination.

Let independent passes finish before sharing an emerging answer unless cross-review is deliberate. A non-trivial convergence requires a reviewer or adversarial reviewer who did not author the proposal. Independence includes framing, not just authorship: point reviewers at the ground-truth artifacts (spec, originals, raw traces) rather than only the supervisor's summary, and keep the supervisor's brief itself in scope for refutation — a brief transmits its author's bias to everyone who reads it. The synthesizer separates agreed facts, unresolved dissent, decision rationale, and residual risk; the supervisor decides whether to act, request another pass, or hand off a durable lifecycle to `goal-protocol`.

## Briefing fresh eyes

A reviewer's critical lens is constructed by the brief, not assumed from the model. Build reviewer briefs with these elements:

1. **Ground truth first.** The reviewer reads the spec/kernel/originals *before* the deliverable, and pre-registers expectations — "list what a correct result must do" — before opening the work. Anchoring runs in file order.
2. **Blind where possible.** Give the question and the artifacts, not the author's conclusion. Strongest form: the reviewer produces its own independent answer first, then diffs against the author's.
3. **Invert the burden.** The job is refutation, not approval: "assume at least one material flaw exists; find it or show exhaustively why each attack failed." A verdict enum with REJECTED as a first-class, expected outcome — never "confirm this is fine."
4. **Strip leading language.** No "looks solid, just double-check," no authorship, no stakes, no hoped-for outcome. Your evaluation words in the brief become the reviewer's prior.
5. **Name the attack surfaces.** A hunt list of specific failure classes (internal contradictions, unverifiable claims, gameable rules, missing negative cases) outperforms "review this" every time.
6. **Make empty reports costly.** A no-findings verdict must enumerate the attacks attempted and why each failed; an evidence-free LGTM is itself a rejected report.
7. **Evidence symmetry.** Every finding needs path/line/repro or a failing check; every pass needs the check that proved it.

If private message or pane transport is required, use the `herdr` or `maestri` skill to discover targets and send safely. This mode owns the collaboration contract and non-goal ledger, not those private command surfaces.
