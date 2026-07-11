# Agent status semantics

Read this when interpreting or waiting on `agent_status`. Pane records expose `agent`, `agent_status`, and native session metadata when available. Statuses: `idle`, `working`, `blocked`, `done`, `unknown`.

## idle vs done

`idle` and `done` are the same underlying state (agent waiting at its prompt) with different attention semantics:

- `idle` — waiting, and its result is considered seen.
- `done` — finished, and its result has not been seen.

Rules that follow:

- An agent that first opens at its prompt reports `idle`, even in a background pane.
- A working or blocked agent that completes in a background tab or workspace reports `done`; completing in the active tab while the foreground client is focused reports `idle`. An explicitly unfocused foreground client can make even active-tab completion `done`.
- Focusing the pane, switching to its tab, or regaining outer-terminal focus marks the tab seen — `done` becomes `idle`. Switching away does not turn `idle` into `done`; `done` only arises from a completion while unseen.

## Practical waits

- Status waits match the current status immediately or wait for the next matching transition.
- Waiting on background work: wait `working` first (confirms the prompt landed), then `done`. If the user is watching that tab, completion reports `idle` instead — when unsure, treat either `idle` or `done` in `pane get` as completed; the difference is only whether the result was seen.
- `blocked` means the agent needs input — read the pane to find the prompt or dialog. `unknown` means no detected or integrated agent yet — inspect before assuming failure.
