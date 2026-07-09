# Test strategy

Use this mode to choose, improve, or prune tests for confidence rather than test count.

1. Name the important risk and the observable behavior it threatens.
2. Choose the smallest boundary that reproduces that behavior: a pure function, domain service, API, transaction, message contract, UI interaction, or user journey.
3. Select a pattern that matches the risk. Use examples for clear outcomes, properties for invariants, state-machine tests for lifecycles, and fault injection or contracts at real external boundaries.
4. Assert outcomes, not helper calls or implementation choreography. Mock system boundaries only.
5. Keep a test only when removing it would meaningfully reduce confidence; otherwise delete, rewrite, demote, or quarantine it.

For a suite review, return Keep, Delete, Rewrite, Missing High-Value Tests, and the immediate next step. Make failures behavior-named and cheap enough for their feedback stage.
