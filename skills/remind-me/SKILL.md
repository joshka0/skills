---
name: remind-me
description: File a reminder in the operator's menu bar app (remind-me MCP) for a task only they can do later. Use for a key rotation, an expiry, an approval, a purchase, or a follow-up.
---

# remind-me

RemindMe is the operator's macOS menu bar app. A reminder that you file shows there, and the
operator gets a notification at each alert time. The MCP server `remind-me` has the tools
`add_reminder`, `list_reminders` and `complete_reminder`. Source and design:
`$HOME/repos/personal/remind-me`.

## When to file

File a reminder when the operator must do something after this session and you cannot do it for
them:

- A secret or key that needs rotation, also one that leaked into a log or a chat.
- An expiry: certificate, domain, token, trial, subscription.
- An approval, a payment, a purchase, or a message to a person.
- A manual step that the operator said they will do later.
- An errand that the operator asks you to remember.

Do not file:

- Your own task list or work you can finish now. Use the project's tracker (beads) for work items.
- A question that blocks you now. Ask it.
- A fact for other agents. That goes in the memo line.

Say in your reply that you filed the reminder, with its title.

## How to file

1. Call `list_reminders`. If an open reminder covers the task, do not add a second one.
2. Call `add_reminder`:
   - `title`: the action and its object, clear without this conversation. Write "Rotate the
     Stripe live API key", not "Rotate the key".
   - `notes`: the reason, where to do it, the steps, links. The operator reads the notes weeks
     later without your context.
   - `due_at`: the real deadline. For an expiry, use the expiry time. Omit it when the task is
     "as soon as possible"; the operator then gets a notification at once.
   - `remind_at`: omit it for alerts one day before, one hour before and at the deadline. Give
     your own times when the task needs lead time, for example 14 days and 3 days before a
     certificate expires.
3. Timestamps are RFC 3339 with a time zone: `2026-12-01T09:00:00+02:00`. Get the current time
   with `date +%Y-%m-%dT%H:%M:%S%z`; do not guess it.

Call `complete_reminder` only when you have verified that the task is done, for example after you
rotated the key yourself.

## Never

- Never put a secret value in `title` or `notes`. They show in notifications and are stored as
  plain text. Name the secret (`STRIPE_LIVE_KEY` in vault path X).
- Never use a reminder as proof that a task is handled. A filed reminder is an open item; report
  it as open.

## If the tools are missing

The server is the app binary: `$HOME/Applications/RemindMe.app/Contents/MacOS/remind-me mcp`
(stdio). If your harness does not list the `remind-me` tools, tell the operator. Do not write to
the store file directly.
