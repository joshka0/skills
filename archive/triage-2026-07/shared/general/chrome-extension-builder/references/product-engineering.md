# Chrome Extension Product Engineering Reference

## Platform Facts

- Chrome Manifest V3 background logic runs in an extension service worker and
  may be terminated after inactivity or long-running work. Do not rely on
  long-lived global variables in background code; persist durable state.
- Use WXT as the default extension framework. Prefer WXT project structure and
  helpers such as `createShadowRootUi` for isolated content-script UIs.
- HeroUI v3 fits extension-owned pages because it targets React 19+ and
  Tailwind CSS v4. Import Tailwind before HeroUI styles.
- Use Effect for typed service boundaries, dependency injection, retries,
  schema validation, message routing, and testable business logic.
- Prefer the `browser.*` promise-style API through WXT/polyfill wrappers for
  cross-browser compatibility. Wrap Chrome-only APIs behind adapters.
- Use `browser.storage.local`, not `window.localStorage`, for extension durable
  state.
- Use `storage.sync` only for small preferences. Treat it as nice-to-have sync,
  not as an app database.
- InstantDB is appropriate for app accounts, cross-device sync, shared data, or
  auth-backed state.
- SQLite WASM + OPFS is optional and reserved for relational/offline-heavy
  workloads.

## Surface Model

```text
popup          -> small React app, HeroUI allowed
options        -> larger React app, HeroUI allowed
sidepanel      -> product UI, HeroUI allowed
newtab/page    -> normal React web app, HeroUI allowed
content script -> DOM bridge; React overlay only if needed
shadow UI      -> React mounted into ShadowRoot
background     -> service worker event router; no React
offscreen doc  -> special DOM-only helper; not a background replacement
```

The background worker should orchestrate, not own durable state. The content
script should touch the host page, not contain product logic. UI surfaces should
own UI and call services through message contracts.

## Recommended Repo Layout

```text
extension/
  package.json
  wxt.config.ts
  tsconfig.json
  public/
    icon-16.png
    icon-48.png
    icon-128.png

  entrypoints/
    background.ts
    content.tsx
    popup/index.html
    popup/main.tsx
    options/index.html
    options/main.tsx
    sidepanel/index.html
    sidepanel/main.tsx
    offscreen/index.html
    offscreen/main.ts

  src/
    app/AppProviders.tsx
    app/ErrorBoundary.tsx
    ui/components/
    ui/theme/
    ui/globals.css
    content-ui/ContentOverlay.tsx
    content-ui/mountShadowUi.tsx
    content-ui/shadow.css
    core/messages.ts
    core/schema.ts
    core/errors.ts
    core/ids.ts
    core/constants.ts
    services/Runtime.ts
    services/BrowserApi.ts
    services/StorageService.ts
    services/AuthService.ts
    services/InstantService.ts
    services/TabsService.ts
    services/MessageBus.ts
    services/Logger.ts
    storage/extensionStorage.ts
    storage/migrations.ts
    storage/indexedDb.ts
    storage/sqlite/README.md
    storage/sqlite/sqliteWorker.ts
    instant/db.ts
    instant/instant.schema.ts
    instant/instant.perms.ts
    background/handlers/index.ts
    background/handlers/authHandlers.ts
    background/handlers/tabHandlers.ts
    background/handlers/storageHandlers.ts
    tests/fixtures/
    tests/services/
    tests/messages.test.ts
```

Prefer this separation:

```text
entrypoints/*    = browser lifecycle glue
src/core/*       = pure types and domain contracts
src/services/*   = Effect service interfaces and live layers
src/background/* = message/event handlers
src/ui/*         = reusable extension page UI
src/content-ui/* = Shadow DOM mounted UI
src/instant/*    = InstantDB schema, client, permissions
src/storage/*    = storage adapters and migrations
```

## Architecture Rules

Keep browser APIs behind services:

```ts
StorageService.getSettings()
TabsService.getActiveTab()
MessageBus.sendToTab(...)
```

Use Effect for:

```text
storage reads/writes
auth flows
InstantDB session synchronization
message decoding
retry/backoff
API calls
permission checks
tab/content orchestration
logging
migration steps
```

Avoid:

```text
wrapping every button click in heavy Effect ceremony
putting Effect fibers in React render
sending Effect values over runtime messages
keeping durable Effect state inside the MV3 background worker
```

## Message Contracts

Every cross-context message must be schema-validated. Use discriminated unions,
JSON-safe payloads, typed result objects, and typed error objects. Never pass
functions, classes, Dates, Errors, Effects, or non-JSON values.

```ts
import { Schema } from "effect";

export const GetSelection = Schema.Struct({
  type: Schema.Literal("content.getSelection"),
});

export const SelectionResult = Schema.Struct({
  text: Schema.String,
});

export const OpenAuth = Schema.Struct({
  type: Schema.Literal("auth.open"),
  provider: Schema.Literal("instant", "google", "github"),
});

export const Message = Schema.Union(GetSelection, OpenAuth);
export type Message = typeof Message.Type;
```

Prefer one message router per runtime:

```ts
browser.runtime.onMessage.addListener((raw, sender) => {
  return runMessageHandler(raw, sender);
});
```

## UI Strategy

Use React + HeroUI Pro + Tailwind v4 for popup, options, sidepanel, newtab, and
extension-owned pages.

```css
@import "tailwindcss";
@import "@heroui/styles";
```

```tsx
import { HeroUIProvider } from "@heroui/react";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
```

For injected page UI, use Shadow DOM by default:

```ts
import React from "react";
import ReactDOM from "react-dom/client";
import { createShadowRootUi } from "wxt/client";
import { ContentOverlay } from "@/content-ui/ContentOverlay";

export default defineContentScript({
  matches: ["<all_urls>"],
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "my-extension-overlay",
      position: "inline",
      isolateEvents: true,
      onMount(container) {
        const root = ReactDOM.createRoot(container);
        root.render(<ContentOverlay />);
        return root;
      },
      onRemove(root) {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
```

Content UI rules:

- Inject required CSS into the ShadowRoot, not `document.head`.
- Assume host page CSS is hostile.
- Avoid relying on page fonts, resets, rem assumptions, or global variables.
- Avoid broad overlays that interfere with page accessibility.
- Make injected UI removable and idempotent.
- Test hostile pages: Gmail, X/Twitter, YouTube, GitHub, Google Docs, Notion.

HeroUI may inject styles into `document.head`; verify styles and CSS variables
exist inside the ShadowRoot before using HeroUI in content overlays. If it is
painful, build a smaller internal overlay component set.

## Uniwind Guidance

Use Uniwind as a design-language source, not as the primary browser extension UI
runtime. Reuse tokens, semantic colors, spacing, radius, typography, motion, and
component naming. Do not try to share React Native components directly in
extension UI without a deliberate adapter.

For shared Expo + extension design, create a neutral token package:

```text
packages/design-tokens/
  colors.ts
  spacing.ts
  radius.ts
  typography.ts
  motion.ts
  semantic.ts
```

## Storage Strategy

### Tier 1: `browser.storage.local`

Use for settings, feature flags, auth session pointer, selected account,
small local caches, migration version, and preferences.

Do not use for huge logs, large scraped datasets, high-frequency writes, large
embeddings, or binary blobs.

```ts
import browser from "webextension-polyfill";

export type ExtensionSettings = {
  theme: "system" | "light" | "dark";
  accountId?: string;
  onboardingCompleted: boolean;
};

const SETTINGS_KEY = "settings:v1";

export async function getSettings(): Promise<ExtensionSettings> {
  const result = await browser.storage.local.get(SETTINGS_KEY);
  return (
    result[SETTINGS_KEY] ?? {
      theme: "system",
      onboardingCompleted: false,
    }
  );
}

export async function setSettings(next: ExtensionSettings): Promise<void> {
  await browser.storage.local.set({ [SETTINGS_KEY]: next });
}
```

### Tier 2: `browser.storage.sync`

Use only for small, non-sensitive preferences such as theme, compact mode,
default workspace id, and small feature preferences.

### Tier 3: IndexedDB

Use for large local caches, offline queues, scraped/indexed page content, bulk
imports, structured non-relational state, and query result caches.

### Tier 4: InstantDB

Use for cross-browser login, account-backed user state, cross-device sync,
shared workspaces, collaboration, presence, server-enforced permissions, and
data that should survive browser reinstall.

Recommended layering:

```text
browser.storage.local -> local session/account pointer and bootstrap cache
InstantDB             -> canonical user/account/app data
IndexedDB             -> heavier local extension cache
```

Never expose InstantDB admin tokens in the extension.

### Tier 5: SQLite WASM + OPFS

Use only for local relational queries, offline-first complex datasets,
full-text search, large local indexes, import/export snapshots, analytical
queries, multi-table projections, or agent-readable local memory stores.

Rules:

- Put SQLite behind a StorageService interface.
- Prefer a dedicated Worker or offscreen-backed storage runtime.
- Feature-detect OPFS and WASM support.
- Keep migrations explicit and versioned.
- Do not keep critical DB state only in MV3 background globals.
- Keep a fallback path: IndexedDB or InstantDB.

## InstantDB Strategy

Use InstantDB as the extension account and sync layer:

```text
User signs in
  -> extension stores local session/account pointer
  -> InstantDB stores canonical user data
  -> extension pages subscribe/query through InstantDB client
  -> background uses backend/admin only through secure server endpoints
```

Prefer auth in this order:

```text
1. Magic code auth for simplest cross-browser extension login
2. Guest auth for try-before-signup
3. OAuth via browser.identity.launchWebAuthFlow when provider UX matters
4. Clerk + InstantDB for fuller auth/session management
5. Custom backend auth if needed
```

Use typed schemas and explicit permissions before production. Never ship
permissive defaults for private user data.

```ts
import { i } from "@instantdb/react";

const schema = i.schema({
  entities: {
    $users: i.entity({
      email: i.string().unique().indexed(),
    }),
    workspaces: i.entity({
      name: i.string(),
      createdAt: i.number().indexed(),
      ownerId: i.string().indexed(),
    }),
    extensionSettings: i.entity({
      userId: i.string().indexed(),
      browserProfileId: i.string().optional(),
      theme: i.string(),
      updatedAt: i.number().indexed(),
    }),
    captures: i.entity({
      userId: i.string().indexed(),
      url: i.string().indexed(),
      title: i.string().optional(),
      selectedText: i.string().optional(),
      createdAt: i.number().indexed(),
    }),
  },
});

export default schema;
```

## Effect Service Pattern

Create services for boundaries:

```text
BrowserApi
StorageService
InstantService
AuthService
MessageBus
TabsService
Logger
Clock
Config
```

```ts
import { Context, Effect, Layer, Schema } from "effect";
import browser from "webextension-polyfill";

const Settings = Schema.Struct({
  theme: Schema.Literal("system", "light", "dark"),
  onboardingCompleted: Schema.Boolean,
});

type Settings = typeof Settings.Type;

export class StorageService extends Context.Tag("@ext/StorageService")<
  StorageService,
  {
    readonly getSettings: Effect.Effect<Settings>;
    readonly setSettings: (settings: Settings) => Effect.Effect<void>;
  }
>() {}

const SETTINGS_KEY = "settings:v1";

export const StorageServiceLive = Layer.succeed(
  StorageService,
  StorageService.of({
    getSettings: Effect.tryPromise(async () => {
      const result = await browser.storage.local.get(SETTINGS_KEY);
      return Schema.decodeUnknownSync(Settings)(
        result[SETTINGS_KEY] ?? {
          theme: "system",
          onboardingCompleted: false,
        },
      );
    }),

    setSettings: (settings) =>
      Effect.tryPromise(() =>
        browser.storage.local.set({ [SETTINGS_KEY]: settings }),
      ),
  }),
);
```

Runtime:

```ts
import { Layer, ManagedRuntime } from "effect";
import { StorageServiceLive } from "./StorageService";
import { LoggerLive } from "./Logger";
import { BrowserApiLive } from "./BrowserApi";

const AppLayer = Layer.mergeAll(
  LoggerLive,
  BrowserApiLive,
  StorageServiceLive,
);

export const Runtime = ManagedRuntime.make(AppLayer);
```

Use from background:

```ts
import browser from "webextension-polyfill";
import { Runtime } from "@/services/Runtime";
import { handleMessage } from "@/background/handlers";

export default defineBackground(() => {
  browser.runtime.onMessage.addListener((message, sender) => {
    return Runtime.runPromise(handleMessage(message, sender));
  });
});
```

## Background Worker Rules

The background worker should register listeners, route messages, call Effect
services, coordinate tabs/content/offscreen/auth, persist state explicitly, and
exit cleanly.

It should not hold durable state in globals, mount React, run long-lived app
loops, keep WebSocket subscriptions alive without browser lifecycle testing,
store secrets, or perform heavy DOM work.

For DOM-only work that a service worker cannot do, use an offscreen document.

## Cross-Browser Rules

Good defaults:

```text
browser.storage.local
browser.runtime.sendMessage
browser.tabs.query
browser.identity.launchWebAuthFlow, with testing
content scripts
options pages
browser action popup
```

Needs adapter/fallback:

```text
chrome.sidePanel
chrome.offscreen
chrome.identity.getAuthToken
declarativeNetRequest edge cases
Chrome-specific AI APIs
browser-specific manifest keys
```

Wrap browser-specific APIs:

```ts
export const supportsSidePanel = () =>
  typeof chrome !== "undefined" && "sidePanel" in chrome;
```

## Security Rules

Start narrow:

```json
{
  "permissions": ["storage", "activeTab"],
  "host_permissions": []
}
```

Avoid `<all_urls>` unless the product truly needs it.

Never ship API keys, Instant admin tokens, backend admin tokens, Stripe secret
keys, OAuth client secrets, or database credentials. Do not load remote scripts
into extension pages or content scripts.

Assume pages are hostile:

- Do not trust DOM text as safe.
- Sanitize rendered HTML.
- Do not expose privileged extension APIs to page context.
- Do not inject secrets into page context.
- Keep page bridge messages minimal and validated.

## Build Checklist

1. Create WXT project.
2. Add React 19.
3. Add HeroUI and Tailwind v4.
4. Add Effect and Effect Schema.
5. Add webextension-polyfill if not already handled.
6. Create popup, options, background, and content entrypoints.
7. Create core message schema.
8. Create StorageService.
9. Create MessageBus.
10. Add Shadow DOM content UI only if needed.
11. Add InstantDB schema and auth if account sync is needed.
12. Add permissions file before production.
13. Add browser adapters for Chrome/Firefox differences.
14. Add tests for message decoding and storage migrations.
15. Add extension review checklist.

## Common Gotchas

- MV3 globals disappear. Persist state explicitly.
- Popup closes when it loses focus; long workflows belong in background with
  persisted status.
- Shadow DOM styling can fail when styles inject into `document.head`; ensure
  CSS variables, Tailwind output, and portal containers exist inside the shadow
  root.
- Avoid dynamic Tailwind class names that the scanner cannot see.
- InstantDB permissions must enforce privacy; client filtering is not enough.
- Do not default to SQLite for simple settings or sync state.

## Preferred Feature Patterns

Save selected text:

```text
content reads selection
  -> content sends message to background
  -> background validates message
  -> background checks auth/session
  -> background writes capture to InstantDB or queues offline
  -> popup/sidepanel reflects saved state
```

Open authenticated sidepanel:

```text
user clicks action
  -> background opens sidepanel if supported
  -> fallback to popup/options page if unsupported
  -> React app loads user/session from StorageService
  -> InstantDB hydrates account data
```

Page overlay:

```text
content mounts ShadowRoot UI
  -> Shadow UI asks background for settings/session
  -> Shadow UI does not access secrets
  -> background mediates privileged operations
```

## Minimal Package Set

```json
{
  "dependencies": {
    "@heroui/react": "latest",
    "@heroui/styles": "latest",
    "@instantdb/react": "latest",
    "effect": "latest",
    "react": "latest",
    "react-dom": "latest",
    "webextension-polyfill": "latest"
  },
  "devDependencies": {
    "typescript": "latest",
    "wxt": "latest",
    "tailwindcss": "latest",
    "vite": "latest"
  }
}
```

## Sources To Check When Precision Matters

- Chrome extension service worker lifecycle
- WXT docs for content UI and ShadowRoot isolation
- HeroUI v3 React/Tailwind quick start
- Effect services and layers
- MDN WebExtensions cross-browser and storage docs
- InstantDB auth, guest auth, magic codes, schemas, permissions, backend docs
- SQLite WASM persistent storage docs
- Chrome offscreen documents docs
