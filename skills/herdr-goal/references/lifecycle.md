# Goal lifecycle

Read this only for inspection, completion, cancellation, recovery, or stalls.

## State interpretation

- `active`: main work may continue for the current epoch.
- `verification_armed` or `waiting_for_callback`: do not create another epoch;
  inspect linked watcher resources.
- `revision_required`: apply named findings, then checkpoint the next epoch.
- `awaiting_main_completion`: Luna passed; the pinned main must reconcile and
  explicitly complete.
- `completed`: terminal success; no further wake or callback is valid.
- `stalled`: terminal automatic-loop stop requiring inspection or a new human
  decision.
- `cancelled`: terminal user-requested stop; started or ambiguous deliveries
  may still need audit.

## Completion

Run `complete` only from the pinned main terminal and only after confirming the
accepted pass report, criterion evidence, packet digest, and watcher delivery
state. Completion latches before any final user-facing callback so it cannot
open another epoch.

## Stalls

Treat these as stalls: identity/session drift, settle or verifier timeout,
blocked/failed report, epoch exhaustion, capability or client-key conflict,
packet conflict, origin loss, and unconfirmed delivery.

Do not automatically retry an ambiguous write. Report the last safe journal
event, relevant watcher delivery, exact bound reached, and whether a new human-
approved epoch is possible.

## Cancellation

Cancellation is explicit. Inspect both goal and watcher state first. Cancel
only pre-write queued resources owned by the goal; never claim that a started
or unconfirmed delivery was prevented. Close only the verifier pane created by
this goal after current state proves it is no longer running.

## Recovery

Replay append-only goal state and query watcher by deterministic client key.
Repeat only idempotent pre-write requests. Never truncate state, replace a
sealed packet, reuse an ambiguous epoch, or target a replacement agent.
