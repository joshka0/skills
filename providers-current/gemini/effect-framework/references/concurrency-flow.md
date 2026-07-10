# Effect Concurrency Flow

Read this only for the `concurrency-flow` mode.

1. Decide whether the work is single-result, parent-owned concurrent, independently owned, work-sharing, broadcast, or a back-pressured stream.
2. Default child work to the parent lifetime; detach only with an independent owner, shutdown path, and error observation plan.
3. State capacity, loss/latest-wins semantics, consumer pressure, and shutdown behavior before choosing a queue or stream primitive.
4. Keep mutable coordination state internal to the service unless sharing that state is the explicit contract.
5. Express retries, repeats, polling, and backoff as named policy, using installed APIs verified from local evidence.

Verify interruption, overload, and downstream failure behavior. Unbounded buffering or orphan work needs an explicit, reviewed justification.
