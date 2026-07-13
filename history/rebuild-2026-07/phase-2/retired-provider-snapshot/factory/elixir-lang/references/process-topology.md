# Elixir Process Topology

Read this only for the `process-topology` mode.

1. Define a public protocol before callbacks; use a long-lived process only for state, timers, resource ownership, or an isolated runtime entity.
2. Use a simple state cell only when a richer protocol is unnecessary; keep slow CPU or I/O work outside a mailbox owner.
3. Select supervision strategy from actual dependency and recovery relationships, then make repeated-crash behavior and shutdown intent explicit.
4. Use local naming plus dynamic supervision for on-demand entities; do not infer cluster-wide identity from a local registry.
5. Give entity processes an idle, reconstruction, and capacity policy; inspect mailbox pressure before treating a process as an unbounded queue.

Verify the public protocol, child restart behavior, and cleanup path under failure rather than callback internals alone.
