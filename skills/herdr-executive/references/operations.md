# Coordinator operations

Use this reference for live state inspection and deliberate queue transitions.

## Resolve the executable

Prefer the installed executable. Otherwise use the checked build in the
repository already placed in scope:

```sh
EXECUTIVE_BIN="$(command -v herdr-executive || true)"
if [ -z "$EXECUTIVE_BIN" ] && [ -x ./target/release/herdr-executive ]; then
  EXECUTIVE_BIN="$PWD/target/release/herdr-executive"
fi
test -n "$EXECUTIVE_BIN" && test -x "$EXECUTIVE_BIN"
```

If neither path resolves, identify the repository with the user; do not scan
unrelated home directories. Run the relevant `--help` before using a recipe.

## Inspect without mutation

```sh
"$EXECUTIVE_BIN" status
"$EXECUTIVE_BIN" queue --json
```

Use `jq` to reduce the snapshot to active state. Preserve IDs and correlations:

```sh
"$EXECUTIVE_BIN" queue --json | jq '{
  draft: .pending_draft,
  attention: [.manager_events[] | select(.status != "resolved")],
  questions: [.clarifications[] | select(.status == "awaiting_user")],
  outbound: [.outbound[] | select(.status == "queued" or .status == "delivering")],
  speech: [.speech[] | select(.status == "queued")]
}'
```

The snapshot is authoritative for current state; the append-only journal is
diagnostic history and must remain untouched.

## Drafts and user turns

```sh
"$EXECUTIVE_BIN" draft create '<complete user turn>'
"$EXECUTIVE_BIN" draft revise --id <draft-id> '<replacement>'
"$EXECUTIVE_BIN" draft commit --id <draft-id>
"$EXECUTIVE_BIN" draft cancel --id <draft-id>
```

Create only one pending draft. Commit sends it to the configured Executive, not
to a manager. Prefer Shepr's review/cancel window for a live voice turn.

## Manager attention

```sh
"$EXECUTIVE_BIN" manager add <unique-agent-name>
"$EXECUTIVE_BIN" manager remove <unique-agent-name>
"$EXECUTIVE_BIN" manager pause
"$EXECUTIVE_BIN" manager resume
"$EXECUTIVE_BIN" manager resolve <event-id>
"$EXECUTIVE_BIN" manager address <event-id> '<reviewed response>'
```

Pause suppresses new watcher captures; it does not clear existing state.
`resolve` closes an event without replying. `address` resolves it and queues a
reviewed manager response. Use Shepr's Dismiss or confirmed Dismiss all for the
mobile dismissal workflow; verify current source/help before assuming a CLI
bulk-dismiss command exists.

## Tracked questions and speech

```sh
"$EXECUTIVE_BIN" clarification ask --event <event-id> '<question>'
"$EXECUTIVE_BIN" clarification answer <clarification-id> '<reviewed answer>'
"$EXECUTIVE_BIN" speech enqueue --correlation <source-id> '<spoken response>'
"$EXECUTIVE_BIN" speech skip <speech-id>
"$EXECUTIVE_BIN" speech next
```

Answer the clarification rather than its source event. Skipping speech removes
it from playback while retaining history; it does not resolve attention.
Playing next is local Mac playback, not a phone delivery test.

## Daemon ownership

Use `ensure-daemon` only when no external service owner is present. Before a
restart, inspect the current process and launch service. If the verified owner
is launchd, restart that label rather than starting a second foreground daemon.
Afterward, require a healthy gateway and unchanged durable counts for drafts,
attention, outbound, and speech, except for transitions the running workers can
explain.
