# Reviewed implementation plan

Read only when a bounded implementation request needs a saved, reviewed plan rather than a durable goal lifecycle.

1. Run one to three clarification rounds only for decisions that materially change scope, constraints, or the plan; record assumptions when proceeding without an answer.
2. Reconnoiter the current repository before drafting. Write the full draft to `docs/plans/<plan-name>.md` or the repository's equivalent before review; a pane-only response is not the artifact.
3. Require problem/outcome, chosen architecture and rejected alternatives, exact verified file changes and ownership, tests/edge cases/errors, migration and dependency implications, implementation order, verification, and open questions with defaults.
4. Review against that contract. Record categorized actionable gaps and retained strengths, revise in the same artifact, and re-review.
5. Stop after three review iterations for a maintainer decision. Mark the result `approved`, `needs-revision`, or `needs-decision` rather than implying approval.

When a planner agent drafts the plan, it may analyze repository state but must not mutate implementation or run Git commands. Mux transport is optional support, not part of the artifact contract.
