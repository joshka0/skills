---
name: herdr-executive
description: "Operate the Herdr Executive: drafts, manager attention, clarifications, speech queue, phone gateway, Shepr. Use when the user names Executive, Shepr, or manager blockers."
---

# Herdr Executive

User turns, manager attention, Executive review, and phone speech are separate state. Pane transport: `herdr`. End-to-end delivery diagnosis, Swift/gateway changes, live restarts, TestFlight: `references/delivery-and-shepr.md`.

## Resolve and inspect

```sh
EXECUTIVE_BIN="$(command -v herdr-executive || true)"
[ -z "$EXECUTIVE_BIN" ] && [ -x ./target/release/herdr-executive ] && EXECUTIVE_BIN="$PWD/target/release/herdr-executive"
"$EXECUTIVE_BIN" --help                  # live help and checked-in source beat this skill
"$EXECUTIVE_BIN" status
"$EXECUTIVE_BIN" queue --json | jq '{draft: .pending_draft,
  attention: [.manager_events[] | select(.status != "resolved")],
  questions: [.clarifications[] | select(.status == "awaiting_user")],
  outbound: [.outbound[] | select(.status == "queued" or .status == "delivering")],
  speech: [.speech[] | select(.status == "queued")]}'
```

If neither path resolves, ask the user for the repo. Do not search `$HOME`. The snapshot is the current state. The journal is history.

## Commands

```sh
draft create '<turn>' | draft revise --id <id> '<text>' | draft commit --id <id> | draft cancel --id <id>
manager add [pane-id|agent-name] | manager remove [pane-id] | manager pause|resume
manager resolve <event-id>                    # closes, no reply
manager address <event-id> '<reviewed reply>' # resolves + queues a manager reply
clarification ask --event <event-id> '<question>' | clarification answer <clar-id> '<answer>'
speech enqueue --correlation <source-id> '<spoken text>' | speech skip <id> | speech next
```

- There is only one pending draft. Commit sends it to the Executive, never to a manager.
- Managers are pane enrollments in the journal, not agent names. `manager add` and `manager remove` default to `$HERDR_PANE_ID`. The headless Executive has no `$HERDR_PANE_ID`, so it always passes the pane ID.
- `pause` stops new captures and clears nothing. Answer a clarification by its ID, not its source event.
- `speech skip` keeps history and does not resolve attention. `speech next` plays on the Mac, so it is not a phone test.
- Bulk dismiss is Shepr's Dismiss / Dismiss all. Check help before you assume a CLI version exists.
- `ensure-daemon` runs only when no service owner exists. If launchd owns it, restart that label. Never start a second daemon or gateway.

## Rules

- Never edit, truncate, or hand-repair `coordinator.jsonl`. Every transition goes through the CLI, control socket, or gateway. Never type into a manager pane instead of a journaled action.
- Never forward raw or partial dictation to a manager. Only an explicit reviewed answer targets a manager.
- An outbound `completed` means the prompt was submitted, not that the Executive responded. Speech or an observed result proves a response.
- The Executive runs headless in `executive-host/` (launchd job `dev.herdr.executive-host`), not in a Herdr pane. If Executive outbound waits with "executive host unavailable", check that job and `executive-host.err.log` in the plugin state directory. Managers are pane enrollments; agent names are labels only, and Herdr clears them on agent exit.
- Do not resolve, dismiss, skip, or bulk-clear items unless the user asked. Stop if the requested meaning differs from the transition (dismissal is not a reply; a skip is not resolution).
- Never print or put in argv the phone bearer token, Apple credentials, Infisical values, Fish credentials, or secret-bearing URLs.
- No TestFlight upload, signing change, or Tailscale Serve change without an explicit request.

## Executive speech contract

- When the turn came from the phone or hands-free mode, every user-facing Executive response MUST be queued as speech before the turn is complete. Text may supplement it, never replace it. For a typed turn, text is enough unless the user asked for speech. If the enqueue fails, the response is incomplete: report it and keep the state for retry.
- Correlate speech to its draft, event, or clarification ID.
- Mode is the cadence contract. `hands_free`: short checkpoints at meaningful stages or waits. `manual`: speak only on completion, blockers, tracked questions, and material changes. Re-read `status` before optional progress speech, because the lease can expire mid-turn. Mode never removes the completion speech.
- Spoken text omits UUIDs, App Store Connect/build/bundle/profile IDs, SHAs, correlation/event/ticket IDs, and raw paths. Use natural labels ("Shepr build 14 is with internal testers"). Keep the exact IDs in written reports, commands, and queue metadata.
- Audio transcripts are lossy. Fix obvious mishearings (homophones, product and agent names, broken sentences) from the conversation and project context. Never invent a target, ID, credential, destructive intent, or a materially different instruction. If readings would route work differently, keep the turn and queue one tracked clarification. Mention an inferred wording only when it matters.
