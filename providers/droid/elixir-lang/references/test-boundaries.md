# Elixir Test Boundaries

Read this only for the `test-boundaries` mode.

1. Use plain ExUnit for pure behavior; start OTP components under test supervision so the test owns cleanup.
2. Enable asynchronous execution only when named processes, shared tables, application state, and external resources are genuinely isolated.
3. Test process behavior through the public protocol; use behaviours, fakes, or owned adapters at external boundaries rather than mocking arbitrary internals.
4. Use generated inputs for named laws such as round trips, ordering, idempotence, or parser behavior, with diagnostics that explain failures.
5. Keep provider compatibility or consumer contracts under boundary-level tests; unit mocks alone do not prove them.

Verify cleanup on both success and failure. A test that depends on process state it does not own is not safe to parallelize.
