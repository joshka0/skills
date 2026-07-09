---
name: chrome-extension-builder
description: "Build browser extensions with MV3-safe state, typed messages, isolated content UI, and narrow permissions. Use when a service worker, content script, extension storage, permission, or browser message changes."
---

# Chrome Extension Builder

Build extension boundaries that remain correct across isolated surfaces and an ephemeral MV3 worker.

## Workflow

1. Inspect the manifest, installed extension framework, target browsers, entrypoints, storage, permissions, and repository verification commands.
2. Identify the affected surface and its state owner: extension page, content script, injected UI, background worker, offscreen document, or backend.
3. Read `references/product-engineering.md` only when cross-surface architecture, storage selection, message contracts, or hostile-page isolation needs detail.
4. Keep browser-specific APIs behind an adapter, validate cross-context input at the privileged boundary, and test the smallest affected surface on each supported browser.

## Hard rules

- Treat extension surfaces as isolated applications sharing a core; do not rely on durable background-worker globals.
- Persist durable state in an appropriate storage tier and make migrations/recovery explicit.
- Use one schema-validated, JSON-safe message contract per runtime boundary; never send privileged objects or unchecked page input across it.
- Keep injected UI isolated, removable, and idempotent; do not give page context privileged extension access.
- Start with narrow permissions, no remote executable code, and no secrets in inspectable extension source.
- Verify cross-browser capability differences from installed platform evidence instead of hardcoding Chromium-only behavior.

## Stop conditions

- Ask for direction when a permission, host access, storage tier, authentication flow, or browser-support commitment changes product exposure.
- Report blocked validation when the required target browser or extension lifecycle cannot be exercised.

## Output

Return the affected surface, state/message/permission decision, focused browser verification, and residual security risk.
