# Delegations

Use a delegation when a fixed roster of Herdr worker panes should report back
without the origin remaining alive as their supervisor. Use the `herdr` skill
to discover each current worker pane; do not derive pane IDs from layout order.

## Create the closed roster

```sh
"$WATCHER_BIN" delegation create \
  --join all \
  --deadline 2h \
  --message-file "$MESSAGE_FILE" \
  --worker reviewer="$REVIEWER_PANE" \
  --worker executor="$EXECUTOR_PANE"
```

Use `--join any` only when the first completed worker is sufficient. The create
response prints the delegation ID followed by one label and invite-file path
per worker. Preserve that mapping exactly.

The daemon resolves and pins each worker terminal when it creates the roster.
A worker added later requires a new delegation; open rosters are unsupported.

## Brief each worker

Give each worker a self-contained task plus only:

- its delegation ID;
- its own invite-file path;
- the exact report command shape;
- the allowed final statuses and report expectations.

Do not read the capability into the brief, terminal output, or environment.
The report command reads it from the protected file and verifies that the
caller is still the pinned worker terminal.

```sh
"$WATCHER_BIN" report "$DELEGATION_ID" \
  --invite-file "$INVITE_FILE" \
  --attempt 1 \
  --status completed \
  --summary 'bounded final summary' \
  --body-file "$BODY_FILE"
```

Use `completed`, `blocked`, or `failed` literally. Omit `--body-file` when the
summary is sufficient. Keep reports secret-free; they become durable state and
may be included in the origin callback.

An identical retry for the same worker and attempt is idempotent. A conflicting
retry is rejected. Use a higher attempt only for a genuinely revised final
report, not to work around a rejected payload.

## Join semantics

- `all` matches only when every worker's latest report is `completed`; the
  first `blocked` or `failed` report fails the join.
- `any` matches on the first `completed`; it fails after every worker has a
  terminal non-completed report.
- Reaching the deadline fails either open join.

Sealing snapshots the included report IDs and enqueues one aggregate callback.
The seal never changes. Late reports remain audit data and never cause a second
callback.

## Verify

```sh
"$WATCHER_BIN" show "$DELEGATION_ID" --json
"$WATCHER_BIN" status --json
```

Confirm the roster, latest attempts, seal outcome, included report IDs, and
delivery state. Do not claim the origin resumed merely because the join sealed;
the callback delivery must independently be `delivered`.
