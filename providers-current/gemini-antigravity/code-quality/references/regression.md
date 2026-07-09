# Regression

Use this mode after a resolved bug or incident needs a durable behavioral lock.

1. Capture the original trigger and the exact assertion that distinguishes fixed from broken behavior.
2. Reuse the repository's existing test runner and place the test at the seam that reproduces the real bug pattern.
3. Make the case minimal, deterministic, local-fixture-based, and fast. For a flaky incident, control the source of nondeterminism instead of committing a flaky test.
4. If no correct seam exists, record that architectural limitation rather than adding a false-confidence test.
5. Run the narrow case and the relevant repository verification command.

Report the protected behavior, bug pattern, selected boundary, commands run, and any fixture or integration trade-off.
