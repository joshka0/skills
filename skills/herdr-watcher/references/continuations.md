# Continuations

Use a continuation when one repeatable command can decide whether the origin
agent should resume. The daemon runs the first probe immediately, then waits a
fixed delay after each completed pending probe.

## Arm

Prefer a message file for a callback with shell-significant text:

```sh
"$WATCHER_BIN" continue \
  --every 5m \
  --probe-timeout 30s \
  --max-errors 3 \
  --deadline 2h \
  --message-file "$MESSAGE_FILE" \
  -- /usr/bin/grep -q 'ready' "$STATUS_FILE"
```

Use the installed command help to confirm supported duration syntax and flags.
The executable after `--` is canonicalized, its argv is retained without an
implicit shell, and the current working directory is captured at registration.
Resolve a command through `command -v` first when its absolute path is not
known; do not guess a machine path.

The probe contract is:

| Result | Meaning |
| --- | --- |
| exit `0` | Match once and enqueue the callback |
| exit `1` | Still pending; reset consecutive errors and schedule again |
| exit `2+` | Probe error; consume the consecutive-error budget |
| spawn failure, signal, or timeout | Probe error; consume the budget |

Make the condition repeatable and preferably read-only. Do not use it to
deploy, publish, acknowledge, delete, or mutate the watched system. Put the
action the resumed agent should take in the callback message, not in the probe.

## Confirm and hand off

Capture the printed `continuation-...` ID only after the arming command exits
zero, then verify it durably:

```sh
"$WATCHER_BIN" show "$CONTINUATION_ID" --json
```

Confirm the origin binding is the current agent terminal and the command,
cadence, deadline, and message are the intended values. If the state remains
`armed`, the origin can end its turn and must not keep polling in parallel. If
the immediate first probe already made it terminal, inspect the resulting
delivery instead; do not treat the missing `armed` state as lost registration.

A match and a permanent probe failure each enqueue one callback. Deadline
expiry also produces a failure callback. Cancellation produces no callback.

## Cancel

Cancel only an active resource and only when the user wants to suppress its
future outcome:

```sh
"$WATCHER_BIN" cancel "$CONTINUATION_ID"
"$WATCHER_BIN" show "$CONTINUATION_ID" --json
```

Do not reinterpret failure to cancel a terminal resource as a reason to create
a replacement. Inspect its delivery state first.
