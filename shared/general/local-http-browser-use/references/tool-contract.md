# Tool Contract

Use these details only after loading `local-http-browser-use`.

## Base Calls

Set:

```sh
BASE="${BROWSER_BRIDGE_URL:-http://127.0.0.1:8765}"
TOKEN="${BROWSER_BRIDGE_TOKEN:?missing browser bridge token}"
```

Every call uses:

```sh
curl -sS -X POST "$BASE/tool/<tool_name>" \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '<json body>'
```

## Status

```json
{}
```

Tool:

```text
browser_status
```

Use this to confirm the server is running and the extension is connected.

## Observe

```json
{
  "maxElements": 80,
  "textPreviewChars": 2000
}
```

Tool:

```text
browser_observe
```

Observe frequently. Do not invent element IDs, refs, selectors, or page state.

## Navigate

```json
{
  "url": "https://example.com"
}
```

Tool:

```text
browser_navigate
```

Normally allow only `http://` and `https://` URLs.

## Click

```json
{
  "ref": "button_12"
}
```

or, if the bridge exposes element IDs:

```json
{
  "elementId": "button_12"
}
```

Classify every click first:

- Safe: navigation, menus, filters, panels.
- Sensitive: submit, buy, delete, publish, send, confirm, save, transfer,
  invite, remove, unsubscribe.
- Destructive: delete account, cancel subscription, submit payment, place order,
  transfer funds.

Sensitive or destructive clicks require explicit user confirmation unless the
user already gave exact permission.

## Type

```json
{
  "ref": "input_4",
  "text": "search query",
  "clear": true
}
```

or, if the bridge exposes element IDs:

```json
{
  "elementId": "input_4",
  "text": "search query",
  "clear": true
}
```

Do not type secrets or sensitive personal data without explicit authorization
for the exact entry.

## Keyboard

Depending on bridge naming:

```text
browser_press
browser_key
```

Example:

```json
{
  "key": "Enter"
}
```

Do not use keyboard shortcuts to trigger destructive actions unless confirmed.

## Wait

```json
{
  "ms": 1000
}
```

Prefer short waits followed by observation.

## Screenshot

Use screenshots for visual confirmation, layout bugs, ambiguous UI, login
state, review pages, or confirmation screens. Do not capture secrets.

## Common Failures

```text
401 Unauthorized      -> token missing or wrong
404 Unknown tool      -> bridge does not expose that command
409/503 No tab        -> extension not connected or no active tab
422 Element not found -> stale element; observe again
423 Confirmation      -> action requires user confirmation
```

## Success Criteria

The skill is being used correctly when:

- The agent observes before acting.
- The browser remains user-visible.
- Actions are small and reversible where practical.
- Sensitive actions require confirmation.
- Results are verified from page state.
- The user receives a useful summary, not automation logs.
