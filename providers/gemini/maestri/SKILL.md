---
name: maestri
description: "Operate Maestri canvas participants, connected notes, and portal browser nodes with exact transport and fresh accessibility refs. Use when the user names Maestri, a canvas participant, connected note, or Maestri portal."
---

# Maestri

Use the installed Maestri CLI for a discovered canvas target; participant, note, and portal names are live state, never guesses.

## Route

Read only the selected reference.

| Mode | Select when | Read |
| --- | --- | --- |
| `participant` | sending to or inspecting a connected agent or terminal | `references/participant-transport.md` |
| `notes` | creating, reading, or editing a connected canvas note | `references/notes.md` |
| `portal` | observing or interacting with an embedded browser portal | `references/portal.md` |

## Workflow

1. Run live listing/help to discover exact target names and installed syntax.
2. Select one mode. Before an action, inspect the current participant, note, or portal state when it can have changed.
3. Verify the result from live output or a fresh portal snapshot.

## Hard rules

- Participant transport is literal: a terminal target receives shell input, while an agent target receives a task packet. Do not add explanatory prose to a shell command.
- Never send secrets, passwords, PINs, or confirmation input through participant transport.
- Prefer note edit over whole-note replacement when preserving existing content matters; re-list after a note's first line changes because its derived name may change.
- Portal interactions use fresh accessibility refs and user-visible state; sensitive or destructive submissions need explicit confirmation.
- On timeout or ambiguity, inspect state and wait; do not resend or interrupt a working participant blindly.

## Output

Report target, transport/mode, verified result, and any ambiguity, consent, or timeout boundary.
