# Elixir Runtime Evidence

Read this only for the `runtime-evidence` mode.

1. Measure the suspected bottleneck first: mailbox pressure, process cardinality, scheduler work, binaries, table memory, latency, or I/O.
2. Give every shared in-memory table an owner and crash/recovery story; choose it only when concurrent local access is clearer than process ownership or durable storage.
3. Treat process count as cheap but bounded by idle lifecycle, startup pressure, and supervision contention.
4. Prefer an isolated port or process over a NIF when VM blocking, corruption, or failure containment matters; use native execution only when its bounded risk is justified by evidence.
5. Treat hibernation as a long-idle policy, not per-event cleanup, and do not use macros for ordinary runtime composition without measuring the compile-time cost.
6. Treat runtime flags, table options, native APIs, and compiler behavior as installed-version facts to verify live rather than a static manual.

Compare the intended workload before and after the change. Do not optimize micro-costs while mailbox growth or retained binaries are the dominant pressure.
