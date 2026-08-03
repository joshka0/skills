# Delivery and Shepr diagnosis

Use this reference for end-to-end failures, mobile-client changes, live service
replacement, or an explicitly requested TestFlight release.

## Trace one turn

Follow one correlation ID through these independent stages:

```text
phone WAV -> transcript -> pending draft -> committed draft
          -> outbound to named Executive -> Executive result
          -> queued speech -> phone playback -> complete/fail/skip acknowledgement
```

Manager attention follows a different entry path:

```text
watched named manager -> manager event -> Executive brief
                      -> speech update or tracked clarification
                      -> reviewed manager answer
```

Never collapse these into a single “message sent” state.

## Spoken delivery contract

Before enqueueing Executive speech, rewrite operational evidence for listening:

- Name the product, manager, project, or action naturally and use human-scale
  version or status language where it helps the user.
- Do not speak UUIDs, App Store Connect or build resource IDs, bundle or profile
  IDs, commit SHAs, correlation or event IDs, ticket IDs, or raw file paths.
- Retain every exact identifier needed for diagnosis or traceability in the
  written report, CLI command, queue metadata, and correlation fields. Speech
  wording is a presentation layer; it does not alter durable state or weaken
  the requirement to enqueue every user-facing Executive response as audio.

## Interaction-mode cadence

Shepr and the web client renew a short gateway lease while hands-free capture
is active. Each outbound delivery to the named Executive includes the current
aggregate mode. The lease expires to `manual` after a client crash, suspension,
or lost connection instead of leaving the Executive permanently chatty.

- In `hands_free`, use brief conversational speech at meaningful stages or
  waits, plus blockers, tracked questions, material changes, and turn completion.
- In `manual`, suppress routine progress speech. Speak only for blockers,
  tracked questions, material changes, and turn completion.
- Before optional progress speech during a long-running turn, re-read `status`;
  the mode delivered at turn start is a snapshot and may have changed.
- Do not enqueue a synthetic mode-change turn or interrupt active work merely to
  announce a toggle. The next delivery and the live status are the control seam.

## Failure localization

| Evidence | Inspect next |
| --- | --- |
| Transcript exists and draft is pending | Shepr auto-commit timer, held/busy state, commit request |
| Draft committed and outbound is queued with zero attempts | Dispatcher selection, unavailable head item, named Executive availability |
| Outbound is delivering repeatedly | Herdr prompt submission and fallback Enter verification |
| Outbound completed but no response exists | Executive pane output and whether it enqueued speech or a clarification |
| Speech is queued | Shepr handsfree state, user recording, turn-phase playback gate, audio fetch |
| Speech remains delivering or repeats after reconnect | Phone acknowledgement and playback interruption handling |
| Needs Attention grows after resolution | Queued Executive briefs correlated to already-resolved events |

For pane evidence, apply the `herdr` skill. Resolve the configured Executive by
unique agent name, not pane label or agent kind. Replacing Claude with Codex in
the same pane can preserve the label while dropping the `executive` route; run
`herdr agent get executive` and restore the name explicitly when authorized.
A completed outbound proves the prompt was submitted, not that the Executive
produced or the phone played a response.

## Safe implementation verification

From the Executive repository, validate Rust changes with the current project
toolchain:

```sh
cargo fmt --check
cargo check
cargo test
cargo clippy --all-targets --all-features -- -D warnings
cargo build --release
```

Report the actual test count. For Shepr changes, run the unsigned simulator
build described in `ios/Shepr/README.md`; do not treat it as physical-device
evidence. Verify route handling, Bluetooth, background audio, microphone, and
automatic playback on a real phone when those behaviors changed.

Before replacing a live binary, capture compact queue counts. Restart through
the discovered service owner, wait for the loopback health endpoint exposed by
the current configuration, then compare counts and inspect the exact turn under
test. Never create a synthetic live attention item when it could notify the
user or another agent without approval.

## Shepr and TestFlight

Treat the checked-in Swift project and `ios/Shepr/README.md` as current truth.
The phone connects to the authenticated HTTPS origin that fronts the loopback
gateway; never expose the raw control socket or put the bearer token in a URL.

For a signed release, use only the repository's secret-injection wrapper and
upload script after the user explicitly asks to publish:

```sh
cd ios/Shepr
./scripts/with-apple-secrets.sh ./scripts/signing-status.sh
./scripts/with-apple-secrets.sh ./scripts/upload-testflight.sh
```

Do not request, inspect, or print credential values. Stop at a signing or App
Store Connect gate and name the exact user-owned action required. A release is
complete only after the build is processed and attached to the intended
TestFlight group; archive or upload success alone is insufficient.
