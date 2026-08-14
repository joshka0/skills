# Browser bridge contract

Read this only after loading the active bridge skill and needing request detail.

Use the bridge URL and bearer token supplied through the approved local-secret path. Use the AUX result to confirm status and extension connection before a workflow. Use its advertised tool surface rather than assuming names or parameter variants.

For the installed bridge, use these common calls instead of searching its source:

```sh
browser-bridge call browser_observe '{"maxElements":80}'
browser-bridge call browser_new_tab '{"url":"https://example.com","active":true}'
browser-bridge call browser_wait '{"tabId":123,"ms":500}'
browser-bridge call browser_observe '{"tabId":123,"maxElements":80}'
```

Replace the example URL and returned tab ID. Read the advertised schema only when a task needs another tool or request shape.

The normal sequence is:

1. Observe visible URL, title, text, inputs, warnings, and interactable refs.
2. Choose the smallest safe action using a freshly observed ref.
3. Wait only as needed.
4. Observe again and verify page state.

Use the DOM/accessibility observation for text, roles, and interaction refs. Use screenshots for rendered layout, clipping, overlays, canvas, charts, and other visual state. If the advertised screenshot tool offers scopes, prefer a bounded full-page thumbnail for composition and an element or document region for readable detail.

When a screenshot result includes an artifact path, load that file through the available image-reading capability. A path, a data URL, or base64 text is not visual verification. Keep file-backed output unless the calling integration specifically requires inline image data.

Classify click, key, and submit actions. Navigation, menus, filters, and panels are ordinarily safe. Submit, buy, delete, publish, send, save, transfer, invite, remove, and unsubscribe need explicit confirmation unless already exact-authorized. Never type an unapproved secret or sensitive value.

On failure, distinguish connection, authorization, extension/tab, stale-ref, page, permission, capture, and policy failures. Retry only a clearly transient failure; stale refs require a fresh observation. A scroll-stitched capture may repeat fixed or sticky elements or miss content loaded after its initial page measurement; report the tool's warnings rather than treating the image as exact DOM evidence. Screenshots are for visual confirmation and must not capture secrets.
