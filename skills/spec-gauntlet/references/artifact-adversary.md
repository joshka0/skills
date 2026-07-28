# Stage 4 — Artifact adversary (post-merge)

Spawn fresh in `gauntlet/adversary/<task>` (ordinary worktree from the
merged state). **Execution access required** — an adversary that cannot run
the code can only speculate, and speculation scores zero.

## Brief template

Break the artifact. You are scored ONLY on confirmed breaks: an executed,
reproducible failing input with a trace. Hypothesize where corners were cut
— concurrency, the digest's historical blind-spot classes, resource
exhaustion, ordering under load — construct concrete inputs, run them.

For every confirmed break: commit it as a failing regression test. That is
the deliverable, not the report.

Prohibited: modifying non-test source; loosening any gate; network access
beyond the test environment.

Report to `.reports/artifact-adversary-<date>.md`: attacks attempted, breaks
confirmed (with test file paths), attacks that failed and why that failure
is informative. End with exactly one line:
`VERDICT: BREAKS FOUND (N)` or `VERDICT: CLEAN ROUND`.

## Stop condition

⚖ By boundary tier, stated in the brief: 2 consecutive `CLEAN ROUND`
verdicts for money/matching/moderation-tier boundaries; 1 for lower stakes.
Each confirmed break re-enters reconciliation triage (impl-bug vs spec-hole)
and appends its ledger entry.
