# Goal orchestration

Read only when approved goal and dossier artifacts need tickets, wave state, or replanning before live execution.

1. Refuse to decompose a missing, pending, or revised parent gate; route it to `converge` or `blueprint` first.
2. Build tickets that are one-agent/session-sized, self-contained, parent-traced, verifiable, scoped with non-goals, and independent of conversation memory.
3. Compare cut lines before selecting them. Prefer vertical behavior slices; make a genuine shared foundation an explicit early ticket.
4. Build a dependency DAG and file-disjoint waves with entry and exit criteria. Record each wave as planned, approved, awaiting dispatch, or awaiting returned evidence; preserve completed ticket IDs when replanning.
5. Red-team the breakdown for hidden dependencies, false parallelism, unverifiable work, deferred integration, and orphan work before approval.
6. End with an approved packet set: goal root, ledger, parent IDs, allowed scope, done criteria, escalation triggers, expected evidence, and report destination. Hand it to `agent-orchestration`; do not launch, monitor, review, or integrate the live work here.

When dispatch returns, use `ledger` to record the evidence and transition the related gate or wave state. Stop on an unapproved file, invariant conflict, dossier mismatch, schema/API/dependency expansion, or unavailable verification.
