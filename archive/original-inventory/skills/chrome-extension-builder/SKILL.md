---
name: chrome-extension-builder
description: "Build or refactor product-grade cross-browser browser extensions with WXT, React 19, HeroUI Pro, Tailwind CSS v4, Effect, Shadow DOM content UIs, browser extension storage, InstantDB auth/sync, and optional SQLite/WASM/OPFS. Use for Chrome extension architecture, MV3 service workers, content scripts, extension storage, sidepanel/popup/options UI, cross-browser WebExtension APIs, or extension security reviews."
---

# Chrome Extension Builder

Use this skill when building or refactoring a product-grade cross-browser
extension. Default to WXT, React 19, HeroUI Pro, Tailwind CSS v4, Effect,
Effect Schema, `browser.storage.*`, InstantDB for account-backed sync, Shadow
DOM for injected UI, IndexedDB for large local caches, and SQLite WASM + OPFS
only when relational/offline-heavy storage is genuinely needed.

For detailed platform guidance, layouts, examples, checklists, and gotchas, read
[references/product-engineering.md](references/product-engineering.md).

## Core Rules

- Treat extension surfaces as isolated apps sharing a core: popup, options,
  sidepanel, newtab/page, content script, shadow UI, background, and offscreen.
- Background is an MV3 service worker. Do not rely on durable globals; persist
  state to storage, IndexedDB, InstantDB, backend storage, or a database layer.
- Keep browser APIs behind services. Do not scatter raw `browser.*` calls through
  React components and feature code.
- Prefer `browser.*` promise APIs through WXT/polyfill wrappers for
  cross-browser behavior. Avoid hardcoding `chrome.*` except behind adapters.
- Use `browser.storage.local` for extension settings and local durable state.
  Use `storage.sync` only for small, non-sensitive preferences.
- Use Effect for service boundaries, dependency injection, schemas, retries,
  auth/storage/message workflows, and tests. Do not wrap every UI state change
  in Effect.
- Schema-validate every cross-context message. Use a single typed message
  contract with discriminated unions and JSON-safe payloads.
- Use one message router per runtime, then route internally to handlers.
- Use React + HeroUI + Tailwind for extension-owned pages. Use Shadow DOM by
  default for meaningful injected content UIs.
- Never ship secrets in extension source. Extension code is inspectable.
- Start with narrow permissions. Add host permissions only when the product
  truly needs them.

## Default Stack

```text
WXT
React 19
HeroUI Pro
Tailwind CSS v4
Effect
Effect Schema
browser.storage.local / browser.storage.sync
InstantDB for account-backed sync
Shadow DOM for injected page UI
IndexedDB for larger local caches
SQLite WASM + OPFS only as an advanced optional tier
```

Do not start with SQLite unless there is a real need for local SQL, relational
querying, full-text search, complex offline projections, or import/export of
large structured datasets.

## Implementation Order

1. Identify the surface: popup, options, sidepanel, content script, background,
   offscreen, or backend.
2. Identify the state tier: React state, `storage.local`, `storage.sync`,
   IndexedDB, InstantDB, SQLite, or backend.
3. Add or update schemas: message schema, storage schema, Instant schema, and
   permission rules.
4. Implement service interfaces so raw browser APIs do not leak into React.
5. Implement live layers for browser API, InstantDB, fetch, storage, etc.
6. Implement UI: HeroUI for extension pages, Shadow DOM for injected content UI.
7. Wire through the message bus: popup/content/options to background to service.
8. Add tests for schema decoding, storage migration, service behavior, and
   permission-sensitive paths.
9. Review security: permissions, host permissions, tokens, remote code, page
   injection.
10. Test Chrome and at least one non-Chrome target when cross-browser support is
    in scope.

## Definition Of Done

- No raw browser APIs leak into React components.
- All cross-context messages are schema-validated.
- Background worker has no critical durable global state.
- Storage tier is appropriate for the data.
- InstantDB permissions protect private synced data.
- Content UI is Shadow DOM-isolated when injected into pages.
- HeroUI is used in extension-owned pages and not forced into hostile pages.
- Secrets are absent from extension source.
- Permissions are minimal.
- Chrome and at least one non-Chrome target have been considered.
- Tests cover schemas, storage migration, and service behavior.
