---
name: herdr-watcher
description: "Arm durable Herdr continuations (polled probes) and delegation joins that resume the origin agent later. Use when the user names herdr-watcher, wants an agent resumed later, or needs worker reports joined."
---

# Herdr watcher

Arm the resource from the origin pane, confirm it is durable, and end your turn. The daemon resumes the same terminal on an outcome.

## Preflight

- Resolve `WATCHER_BIN` from `PATH` or the repo in scope (never search `$HOME`). Check `--help` for each command. Live help and source beat this skill.
- Run `"$WATCHER_BIN" status --json` before any mutation.
- `continue`, `delegation create`, and `report` must run directly in the arming or reporting agent pane, with `HERDR_ENV=1` and a nonempty `HERDR_PANE_ID`. Never run them as a plugin action.
- Ordinary commands start the per-session daemon. Use `ensure-daemon` only to check it. Never run `daemon` directly (the singleton holds the lock). Run `stop` only on user request. Resources survive a stop but are delayed.

## Continuation (one repeatable probe)

```sh
"$WATCHER_BIN" continue --every 5m --probe-timeout 30s --max-errors 3 --deadline 2h \
  --message-file "$MESSAGE_FILE" -- /usr/bin/grep -q 'ready' "$STATUS_FILE"
```

- The first probe runs at once, then waits a fixed delay after each pending result. Argv runs with no shell. The executable is canonicalized and the cwd is captured, so resolve paths with `command -v`.
- Exit `0`: match, one callback. Exit `1`: pending (resets errors). Exit `2+`, spawn failure, signal, or timeout: an error that uses the budget.
- The probe must be read-only. Put the action in the callback message, never in the probe.
- A match, a permanent failure, or the deadline each give one callback. Cancel gives none.
- After a zero exit, capture the `continuation-...` ID and run `show <id> --json`. Check the origin binding, command, cadence, deadline, and message. If it is `armed`, end your turn and do not poll in parallel. If the first probe already finished it, inspect the delivery. That is not a lost registration.

## Delegation (fixed worker roster)

```sh
"$WATCHER_BIN" delegation create --join all --deadline 2h --message-file "$MESSAGE_FILE" \
  --worker reviewer="$REVIEWER_PANE" --worker executor="$EXECUTOR_PANE"
```

- Resolve worker panes through `herdr`. Workers are pinned at creation, and rosters are closed (a new worker needs a new delegation).
- The output gives the delegation ID, then one `label invite-file` line per worker. Give each worker only its own ID, invite path, report command, and allowed statuses. Never read the capability into a brief, output, or env.

```sh
"$WATCHER_BIN" report "$DELEGATION_ID" --invite-file "$INVITE_FILE" --attempt 1 \
  --status completed|blocked|failed --summary '<summary>' [--body-file "$BODY_FILE"]
```

- An identical retry is idempotent. A conflicting retry is rejected. Raise `--attempt` only for a truly revised final report.
- `--join all`: matches when every latest report is `completed`. The first `blocked` or `failed` fails it. `--join any`: the first `completed` matches; it fails when all are terminal and none completed. The deadline fails both.
- The seal snapshots the report IDs and sends one callback. Late reports are audit data only.

## States

- Resource: `armed`/`open` (live), `matched`/`failed` (latched), `sealed` (immutable), `cancelled` (no callback).
- Delivery is separate: `queued` (safe to retry; a busy origin stays queued), `delivered` (verified on the pinned origin), `unconfirmed` (ambiguous write: never auto-resend), `origin_lost` (terminal, kind, or session no longer matches: never fall back to another pane), `cancelled`.
- A sealed join is not a resumed origin. The delivery must show `delivered`.
- Diagnose with `show <id> --json`, then current Herdr state for the stored terminal. Read the protected daemon logs only if both fail to explain the problem, and redact report content.

## Never

- Target the focused pane, build an opaque ID, or type a callback into the origin by hand.
- Put credentials or broad env output in probes, messages, summaries, or briefs, or print an invite capability.
- Edit, truncate, compact, or delete the journal, invite files, socket, lock, or state dir. If no recovery command exists, report that.
- Re-arm or resend after `unconfirmed`. Cancel, stop, or discard reports without a user request.
