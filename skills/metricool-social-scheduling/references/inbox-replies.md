# Inbox replies

The Metricool MCP has no tools for comments or messages. To read and reply,
drive the Metricool web inbox through the visible browser bridge
(`local-http-browser-use` skill). Run `aux browser` first.

## Open the inbox

- Open `https://app.metricool.com/inbox/_?blogId=<blogId>&userId=<userId>`.
  The short form `/inbox?blogId=<blogId>` stays on "Loading, please wait..."
  for the bridge.
- Read the list with `browser_observe` (`textPreview`) or `browser_extract_text`.
  The **Unresolved** tab lists one row per conversation, with the newest message.
- Open each conversation before you write a reply. A comment can be on a
  different post than you expect. The thread shows the post caption.

## Write and approve

1. Draft every reply in the chat and get the user's approval of the exact text.
2. Only then send. A reply is public and you cannot take it back.

## Send

- Bring the agent tab to the front with `browser_select_tab` before each
  action. A click, wait, or screenshot on a background tab returns HTTP 503 or
  500. `browser_observe` and `browser_extract_text` work on background tabs.
  Selecting the tab takes focus from the user, so tell them first.
- The reply box is a `span` with role `textbox` and name `Post content`. Type
  into it with `browser_type` and `clear: true`. Read it back through the
  element `text` (not `value`).
- The bridge holds the **Send (⌘ + Enter)** button click and returns
  `requiresConfirmation`. Click again with `confirm: true` only for text the
  user approved.
- Send method per network, as observed on 2026-10-13:

  | Network | What sends |
  | --- | --- |
  | Facebook | `browser_press` Enter with `meta: true` in the box |
  | YouTube | Send button click with `confirm: true` |
  | Instagram | `browser_press` Enter with `meta: true` (the button click returned 500) |

  If one method leaves the text in the box, try the other. Never retype before
  you confirm the first attempt did not send.
- Verify each send: the box counter reads `0 / <limit>`, the reply shows in
  the thread with a time stamp, and the list row shows the reply as the newest
  message. Check that the reply occurs once.

## Resolve

Each list row has two icon buttons on the right. The left one is **Click to
mark as unread**, the right one is **Click to resolve**. Hover to read the
tooltip before you click. On 2026-10-13 the resolve click reported success but
the row stayed in **Unresolved**. If that happens, ask the user to resolve the
rows by hand.

## Rows you cannot read

A row that shows "Message not available" is a comment or message that Metricool
cannot load. Ask the user to check it in the network's own app.
