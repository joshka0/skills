# Implement small

Use this mode for a requested behavior change that does not require a review or diagnosis pass first.

1. State the observable behavior and inspect the existing owner, callers, names, and tests.
2. Change the smallest coherent surface that owns the behavior. Keep side effects at the edge and make the domain decision testable.
3. Add a file, abstraction, dependency, or mock only when it removes more complexity than it adds.
4. Verify the requested behavior through its public surface and report any deliberately untouched adjacent debt.

Do not turn a local request into a platform rewrite or refactor unrelated code merely because it is nearby.
