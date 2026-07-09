# Elixir Concurrent Flow

Read this only for the `concurrent-flow` mode.

1. Classify the work as bounded fan-out, long-lived demand flow, broker ingestion, topic fan-out, or a rate-limited boundary.
2. Use supervised, bounded tasks for finite work and await or shut them down so replies and failures are owned.
3. Introduce demand-driven stages only when consumer pacing is central; choose external ingestion tooling only when acknowledgements, failure handling, partitioning, and shutdown are required.
4. Treat topic fan-out as non-durable delivery unless a separate durable/replay contract exists; avoid duplicate subscriptions by design.
5. State concurrency, demand, timeout, rate, failure, and shutdown semantics before implementation.

Verify overload and downstream slowdown behavior. Do not turn a single mailbox owner into a serialization point for independent work.
