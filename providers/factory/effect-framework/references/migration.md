# Effect Migration

Read this only for the `migration` mode.

1. Inspect package manifests, lockfile, imports, generated types, and existing migration notes before changing compatibility code.
2. Classify each finding as local convention, installed API fact, stale example, or unresolved documentation conflict.
3. Move service, runtime, resource, failure, and concurrency code toward the installed project's current conventions without preserving a hidden legacy architecture.
4. Keep unstable or compatibility-only imports behind local adapters so domain-facing APIs do not inherit framework churn.
5. Verify the smallest affected boundary with the repository typecheck and focused tests, then record unresolved version uncertainty.

Do not copy version-specific examples from memory. If a migration changes lifecycle or error semantics, review it with the matching lifecycle or failure mode before completing it.
