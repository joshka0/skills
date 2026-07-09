# Effect Failure Boundary

Read this only for the `failure-boundary` mode.

1. Classify each failure as expected domain, validation, dependency, interruption, or defect before choosing recovery.
2. Keep expected recoverable outcomes in the typed error channel and give callers a stable, machine-readable vocabulary.
3. Translate dependency-specific failures at the application boundary; do not expose raw vendor exceptions as a public contract.
4. Inspect aggregate failure and interruption detail at adapters, supervisors, logging, retry, or shutdown boundaries—not ordinary domain flow.
5. Make retry eligibility, delay, and exhaustion visible as policy rather than an ad hoc sleep loop.

Verify both the caller-facing error mapping and the failure evidence retained for operations. Do not turn defects into ordinary business branches.
