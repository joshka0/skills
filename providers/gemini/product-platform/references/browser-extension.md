# Browser extension platform

Read this only for the `browser-extension` target when an extension runtime boundary, storage tier, permission, message contract, or injected UI changes.

## Workflow

1. Inspect the manifest, installed extension framework, target browsers, entrypoints, storage, permissions, and repository verification commands.
2. Identify the affected surface and its state owner: extension page, content script, injected UI, background worker, offscreen document, or backend.
3. Keep entrypoints as lifecycle glue, shared core as typed contracts, services as browser/storage boundaries, and UI/content modules separate from privileged background orchestration.
4. Keep browser-specific APIs behind an adapter, validate cross-context input at the privileged boundary, and test the smallest affected surface on each supported browser.

## Architecture decisions

- Treat the MV3 worker as restartable: persist durable state, rehydrate deliberately, and use an offscreen document only for a real DOM-only need.
- Use local extension storage for small durable settings, a larger local store for heavy caches, and account/backend storage only when product sync or authority requires it; do not place sensitive data in sync preferences.
- Define discriminated, JSON-safe message requests and results. Validate at ingress, include only needed context, return stable errors, and never send privileged objects or unchecked page input across a runtime boundary.
- Mount meaningful page injection in an isolated root, contain its styles, and make mounting and removal idempotent on hostile pages. Never give page context privileged extension access.
- Keep permission and host-access scope minimal, allow no remote executable code, sanitize untrusted page data, and keep secrets out of inspectable extension source.
- Verify manifest fields, API names, storage quotas, and cross-browser capability differences from the installed framework and current browser documentation rather than hardcoding Chromium-only behavior.

## Verification and stops

Verify message decoding, storage migration and recovery, worker restart, permission-sensitive behavior, hostile-page mounting and removal, and every claimed browser target.

Ask for direction when a permission, host-access scope, storage tier, authentication flow, or browser-support commitment changes product exposure. Report blocked validation when the required browser or extension lifecycle cannot be exercised.

Return the affected surface, state/message/permission decision, focused browser verification, and residual security risk.
