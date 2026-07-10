# Effect Test Proof

Read this only for the `test-proof` mode.

1. Test exported use cases or adapter behavior; do not make requirements disappear inside helpers before the test can provide them.
2. Replace owned boundaries with explicit test layers or deterministic fakes rather than monkeypatching modules.
3. Use the repository's installed Effect test integration and deterministic clock/context facilities when time, retry, or scheduling matters.
4. Keep production network and database layers out of unit tests; reserve them for explicit integration boundaries.
5. Exercise resource cleanup when a test creates a runtime, scope, or live layer.

Prove the behavior, typed failure, and cleanup boundary. A test that only asserts layer wiring is not sufficient evidence.
