---
name: local-http-browser-use
description: >
  Operate a user-authorized Chrome or Brave browser through a local HTTP
  browser bridge. Use when a local extension-backed bridge exposes browser
  tools at BROWSER_BRIDGE_URL for visible navigation, observation, clicking,
  typing, screenshots, or web app QA.
category: tooling
priority: default
---

# Local HTTP Browser Use

Use this skill to control a visible browser tab through a local HTTP bridge
backed by a user-installed Chrome or Brave extension.

The bridge is not MCP by default. It is a local HTTP tool server:

```text
agent -> HTTP tool call -> local bridge -> WebSocket -> browser extension -> active tab
```

## Required Inputs

The runtime needs:

- `BROWSER_BRIDGE_URL`, usually `http://127.0.0.1:8765`.
- `BROWSER_BRIDGE_TOKEN`, passed as a bearer token.
- A connected extension.
- A visible active browser tab.

Never guess or print the token. If unavailable, ask the user to start the
bridge or provide it through an approved local-secret path.

## Use When

- Navigating websites on the user's behalf.
- Reading visible page content.
- Clicking visible UI.
- Filling ordinary non-sensitive forms.
- Taking screenshots for visual confirmation.
- Manually testing a web app through Chrome or Brave.
- Driving browser workflows where normal APIs are unavailable.

## Do Not Use When

- Bypassing CAPTCHAs, bot checks, rate limits, paywalls, or access controls.
- Extracting cookies, tokens, local storage, passwords, payment details, or
  session data.
- Automating spam, scraping at scale, credential stuffing, or abusive account
  creation.
- Entering passwords, MFA codes, private keys, API keys, card numbers, or
  sensitive personal data unless the user explicitly authorizes that exact
  action.
- Performing destructive account actions without explicit user confirmation.
- Hidden or stealth browsing. The user should be able to see what happens.

## Authentication

Every HTTP call must include:

```http
Authorization: Bearer <BROWSER_BRIDGE_TOKEN>
Content-Type: application/json
```

## Standard Loop

Always operate in this loop:

1. Observe the current page.
2. Identify the target element or state from the observation.
3. Take the smallest safe action.
4. Wait briefly for page changes.
5. Observe again.
6. Verify the result.
7. Continue or stop.

Never chain many browser actions without verification.

## First Action

Before meaningful browser work, call:

```text
POST /tool/browser_observe
```

Use it to identify the current URL, title, visible text, clickable elements,
input fields, warnings, sensitive fields, and whether the extension is
connected. Treat observed element IDs or refs as the source of truth.

## Safe Tool Preference

Prefer bridge tools over raw script execution:

- `browser_status`
- `browser_observe`
- `browser_navigate`
- `browser_click`
- `browser_type`
- `browser_press` or `browser_key`
- `browser_wait`
- `browser_screenshot`

Read `references/tool-contract.md` when you need request examples, errors, or
tool-specific details.

## Safety Rules

- Keep actions user-visible.
- Prefer observation over guessing.
- Use the smallest action that advances the task.
- Verify every important state change.
- Stop when page state is ambiguous.
- Ask before sensitive submissions: submit, buy, delete, publish, send, save,
  transfer, invite, remove, unsubscribe, or confirm.
- Do not type into secret-bearing fields unless explicitly authorized for that
  exact value and action.
- Do not navigate to `chrome://`, `brave://`, `file://`, extension pages,
  internal browser URLs, or local admin panels unless explicitly authorized.
- Never claim success without observing the resulting state.

## Planning

Before a multi-step workflow, briefly state the intended browser steps. For a
single safe action, no plan is needed.

## Error Handling

If a bridge call fails:

1. Read the error.
2. Classify it as connection, auth, page, selector, permission, or policy.
3. Retry only if clearly transient.
4. If auth or extension connection failed, ask the user to reconnect the
   extension or provide the correct token through an approved channel.
5. If an element is stale, observe again and choose a new observed element.

## Output

Summarize browser state in plain language. Mention raw element IDs only when
debugging the bridge.

Good:

```text
I found the pricing page and verified that the Pro plan is listed at $20/month.
```

Bad:

```text
Clicked button_14, then input_8, then div_21.
```

