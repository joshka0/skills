# Lifecycle and recovery

Use the watcher CLI as the only state-transition surface. Ordinary inspection
and mutation commands ensure the per-Herdr-session daemon automatically.

## Inspect

```sh
"$WATCHER_BIN" status --json
"$WATCHER_BIN" list --json
"$WATCHER_BIN" show "$RESOURCE_ID" --json
```

Use `status` for the whole durable snapshot, `list` for resource inventory, and
`show` for one continuation, delegation, or delivery. Retain IDs from output;
do not scrape pane text to reconstruct watcher state.

Resource states have different meanings:

- `armed` or `open`: the daemon may still probe or accept reports;
- `matched` or `failed`: a continuation outcome is latched;
- `sealed`: a delegation outcome and report snapshot are immutable;
- `cancelled`: no new callback is created for that resource.

Delivery state is separate:

- `queued`: safe to retry before prompt submission; busy or unknown origins
  stay queued;
- `delivered`: lifecycle progress was verified on the pinned origin;
- `unconfirmed`: the write boundary is ambiguous; never auto-resend;
- `origin_lost`: the pinned terminal, agent kind, or session no longer resolves
  exactly; never fall back to another pane;
- `cancelled`: the delivery was explicitly suppressed.

## Daemon operations

Use `ensure-daemon` only when explicitly checking daemon availability. Do not
run `daemon` directly during ordinary work, because a singleton already owns
the session lock.

```sh
"$WATCHER_BIN" ensure-daemon
"$WATCHER_BIN" status --json
```

Run `stop` only when the user requests daemon shutdown or a source-driven
restart. Durable resources remain journaled, but stopping delays all probes,
deadlines, reports, and deliveries until a daemon is ensured again.

## Diagnose without repairing state

1. Read `show <id> --json` and identify the resource outcome and delivery ID.
2. Use current Herdr agent state to confirm the stored terminal has exactly one
   compatible occupant and note its current pane and status.
3. Treat a busy origin as a retry condition, an identity mismatch as
   `origin_lost`, and any uncertain post-prompt failure as `unconfirmed`.
4. Inspect protected daemon logs only when CLI state and current Herdr state do
   not explain the failure. Redact report content and never expose invite data.

The journal is append-only and session-keyed from the effective Herdr socket.
Never rename, edit, truncate, compact, replace, or delete its state files. If
current source lacks an explicit recovery command for a terminal state, report
that limitation instead of changing the files or manually prompting the pane.
