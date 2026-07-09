# Effect System Shape

Read this only for the `system-shape` mode.

1. Keep domain vocabulary and pure transformations independent of framework adapters; keep effectful use cases explicit until composition.
2. Define service contracts around business capabilities, not constructors, mutable primitives, or external framework types.
3. Export explicit Live, Test, or named layers and compose the application graph near the process or adapter edge.
4. Use a scoped layer whenever construction acquires a resource or starts managed background work; use a plain layer only when no lifecycle is owned.
5. Let adapters translate requests, responses, and framework failures; do not leak them into domain contracts.

Preserve a legible graph rather than scattered local provisioning or hidden singleton dependencies. Verify callers can provide a test layer without changing business code.
