# Extension Product Engineering

Read this only for cross-surface architecture, storage, message contracts, or hostile-page isolation.

1. Keep entrypoints as lifecycle glue, shared core as typed contracts, services as browser/storage boundaries, and UI/content modules separate from privileged background orchestration.
2. Treat the MV3 worker as restartable: persist durable state, rehydrate deliberately, and use an offscreen document only for a real DOM-only need.
3. Use local extension storage for small durable settings, a larger local store for heavy caches, and account/backend storage only when product sync or authority requires it; do not place sensitive data in sync preferences.
4. Define discriminated, JSON-safe message requests/results; validate at ingress, include only needed context, and return stable errors.
5. Mount meaningful page injection in an isolated root, contain its styles, and make mounting/removal idempotent on hostile pages.
6. Keep permission and host-access scope minimal, sanitize untrusted page data, and never expose secrets or privileged APIs to page context.

Use installed framework and browser documentation for manifest fields, API names, storage quotas, and capability support. Verify message decoding, storage migration, worker restart, permission-sensitive behavior, and each claimed browser target.
