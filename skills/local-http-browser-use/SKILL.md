---
name: local-http-browser-use
description: "Drive the user's visible Chrome or Brave through the private local HTTP bridge. Use after `aux browser` reports ready."
---

# Local HTTP browser use

Precondition: `aux browser` reported both the controller and the visible-browser extension as ready. Do not repeat the check.

```sh
browser-bridge call browser_observe '{"maxElements":80}'
browser-bridge call browser_new_tab '{"url":"https://example.com","active":true}'
browser-bridge call browser_wait '{"tabId":123,"ms":500}'
browser-bridge call browser_observe '{"tabId":123,"maxElements":80}'
```

- Loop: observe, act once on a fresh ref, wait briefly, observe again, verify. A stale ref needs a new observation. Read the advertised schema only for other tools.
- Use the DOM/accessibility observation for text, roles, and refs. Use screenshots for layout, overlays, and canvas. When a screenshot returns an artifact path, load that file as an image before you make a visual claim. A path or base64 is not verification.
- Scroll-stitched captures can repeat sticky elements or miss lazy content. Report the tool's warnings.
- The client reads the protected token itself. Never read, print, or export the token.
- Navigation, menus, and filters are safe. Submit, buy, delete, publish, send, save, transfer, invite, remove, and unsubscribe need explicit confirmation unless that exact action is already authorized. Never type passwords, MFA codes, payment data, or secrets without exact authorization.
- Never use hidden, stealth, internal-page, CAPTCHA, or bulk-scraping paths. Never capture a page that shows a secret.
- If the bridge stops, that is final for work that needs the visible session. Report the stop with its one-line reason. Do not inspect browser processes or bridge internals unless the user asks.
