# Goroutine lifetimes

Read only when concurrent work, channels, cancellation, worker limits, or concurrent failures are in scope.

## Decision procedure

1. Keep the operation sequential unless concurrency has a stated capacity, latency, or isolation benefit.
2. Name the owner that starts each goroutine, its completion signal, its cancellation source, and the consumer that observes its result or error.
3. Bound work before accepting unbounded input. Tie the bound to discovered CPU, I/O, or downstream capacity rather than a decorative constant.
4. Make blocked sends and receives interruptible by the owning shutdown path. A channel buffer does not replace cancellation, and only the owner of all sends closes an outbound channel.
5. Preserve result ordering deliberately when callers rely on it; fan-out does not retain ordering by accident.
6. Verify cancellation, downstream abandonment, and concurrent mutation with the repository's focused checks; consult installed help for exact helper semantics.

## Review questions

- Who can stop this work, and what wakes every blocked participant?
- Who owns each channel close and each error?
- What real capacity sets the concurrency bound?
- Does the failure path leave work running after the caller has abandoned it?
