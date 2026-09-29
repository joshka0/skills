# Delivery and Shepr

## Trace one correlation ID

```text
phone WAV -> transcript -> pending draft -> committed draft -> outbound to named Executive
  -> Executive result -> queued speech -> phone playback -> complete/fail/skip ack
watched manager -> manager event -> Executive brief -> speech or tracked clarification -> reviewed manager answer
```

Never collapse these into one "message sent" state.

| Evidence | Inspect next |
| --- | --- |
| Transcript exists, draft pending | Shepr auto-commit timer, held/busy state, commit request |
| Committed, outbound queued with 0 attempts | Dispatcher selection, unavailable head item, Executive availability |
| Outbound delivering repeatedly | Herdr prompt submission and fallback Enter verification |
| Outbound completed, no response | Executive pane output: did it enqueue speech or a clarification? |
| Speech queued | Shepr handsfree state, user recording, turn-phase playback gate, audio fetch |
| Speech stuck delivering or repeats after reconnect | Phone ack and playback-interruption handling |
| Needs Attention grows after resolution | Queued Executive briefs that point to already-resolved events |

Hands-free is a short gateway lease that Shepr and the web client renew. It expires to `manual` after a crash, suspend, or disconnect. Each outbound carries the mode at send time. Never enqueue a synthetic turn just to announce a mode toggle.

## Changing and restarting

- In the Executive repo, run `cargo fmt --check`, `check`, `test`, `clippy --all-targets --all-features -- -D warnings`, and `build --release`. Report the actual test count.
- Shepr: run the unsigned simulator build from `ios/Shepr/README.md`. It is not device evidence. Route handling, Bluetooth, background audio, the mic, and auto-playback need a real phone.
- Before you replace a live binary, capture the queue counts. Restart through the discovered owner. Wait for the loopback health endpoint from the current config. Compare the counts and check the turn under test. Never create a synthetic live attention item that could notify someone.

## TestFlight (only on an explicit request)

```sh
cd ios/Shepr
./scripts/with-apple-secrets.sh ./scripts/signing-status.sh
./scripts/with-apple-secrets.sh ./scripts/upload-testflight.sh
```

- The phone reaches the gateway through the authenticated HTTPS origin in front of loopback. Never expose the raw control socket, and never put the bearer in a URL.
- Stop at a signing or App Store Connect gate and name the user action.
- A release is done only when the build is processed and attached to the intended TestFlight group.
