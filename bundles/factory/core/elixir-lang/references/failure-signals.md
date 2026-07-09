# Elixir Failure Signals

Read this only for the `failure-signals` mode.

1. Return expected validation and remote-failure outcomes explicitly; isolate invariant violations where a supervisor can recover safely.
2. Make reconstructable state, restart intensity, dependency timeouts, retry limits, and circuit-breaker or bulkhead scope explicit.
3. Emit portable library/application events through the installed telemetry mechanism; attach metrics, logs, and tracing at application boundaries.
4. Keep event names stable and metadata low-cardinality; propagate log and trace context deliberately across task and process hops.
5. Preserve enough failure evidence for operations without exposing internal or user-sensitive detail at public boundaries.

Verify both a crash/restart path and the event or trace evidence it produces. Do not rescue every worker failure into an invisible return value.
