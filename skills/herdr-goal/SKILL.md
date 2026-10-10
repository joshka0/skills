---
name: herdr-goal
description: "Run a bounded Herdr goal loop: a main Codex worker, a read-only Luna verifier, sealed epoch packets, and watcher callbacks. Use when the user names herdr-goal, wants a Ralph loop, or asks for verifier-gated continuation."
---

# Herdr goal

The main worker seals an exact verification packet each epoch. After the pinned main session settles, the watcher wakes Luna. Luna runs only the packet and returns one authenticated verdict to the same main terminal.

## Preflight

- `HERDR_ENV=1` and nonempty workspace/tab/pane IDs. Invoke directly from the main agent pane, never a plugin action.
- Resolve `herdr-goal` and `herdr-watcher`. Read their live help (`herdr-goal start --help`; never copy flags from here) and `herdr-watcher capabilities --json`. Require `settled_wake_v1` and `epoch_callback_v1`.
- `herdr integration status`: the Codex integration must be current, and both panes must expose `agent_session.value`.
- Read the current goal state before any mutation. Never infer an epoch or verdict from pane text.

## Start

- Required inputs: a measurable goal with criterion IDs, the cwd and authoritative files, max epochs, an overall deadline, settle/wake/verifier timeouts, and the allowed verification side effects. If the goal is vague, settle it with the user first.
- Run `start` inside the main Codex pane with every bound. Capture the goal ID.
- Verify that it created one no-focus sibling pane in that cwd, with the pane and agent sharing the goal-specific name, running Luna through `codex -m <luna-id> -c model_reasoning_effort=max --no-alt-screen` (the ID that goal pins). Re-read: both identities are pinned, and epoch 1 is active.
- Goal handles its own `READY` bootstrap (sent when SessionStart has not yet exposed the session) and a bounded `agent_pane_busy` retry. Never reproduce either by hand. Never send Luna a goal prompt; it gets work only through a sealed packet.
- Let goal derive the verifier label. Agent names are at most 32 bytes, lowercase, from a restricted alphabet.
- If start fails, report the created resources. Close only a pane this attempt created, and only when live state proves it is safe.

## Each epoch (from the pinned main, while it is `working`)

1. Copy `assets/verification-packet-v1.json`. Replace the goal, epoch, objective, scopes, criteria, steps, and absolute cwd. Keep every key and the four prohibitions. List every side effect, including `target/`. Never add `callback_invite_path` or `callback_command`: goal injects those into the sealed copy.
2. Validate against the goal ID and epoch. Create the dormant fixed-epoch callback (you get the invite path). Seal once with the invite path and the injected `callback_command` argv prefix, never the bearer. Sync, and record the SHA-256.
3. Create the linked settle wake with deterministic goal/epoch client keys. Require durable callback and wake acks, plus `VerificationArmed`, before the main ends its turn.
4. An equivalent retry returns the same resources. A conflicting client key or packet is a stall, never an overwrite.

## Luna (on wake)

- Match the goal ID, epoch, packet path, and digest against protected state. Run the ordered commands exactly. Capture only the requested evidence.
- No source edits, git mutation, delegation, plan changes, or invented checks. On ambiguity, submit `blocked` with the missing decision.
- Submit with the sealed `callback_command` prefix plus status, summary, and body file. Never use a PATH command, and never read the capability. Statuses: `pass`, `changes-requested`, `blocked`, `failed`. The JSON spells `changes_requested`; the CLI flag is `--status changes-requested`.
- There is one callback per epoch. An identical replay is idempotent. A conflicting replay is rejected.

## States

`active` (work) · `verification_armed`/`waiting_for_callback` (no new epoch; inspect the watcher) · `revision_required` (fix the named findings, checkpoint the next epoch) · `awaiting_main_completion` (Luna passed) · `completed` · `stalled` · `cancelled`.

- A `pass` is necessary but not enough. Only the pinned main runs `complete`, after it checks the accepted report, criterion evidence, digest, and delivery state. Completion latches before any final callback.
- Stalls: identity/session drift, a settle or verifier timeout, a blocked/failed report, exhausted epochs, a capability or client-key or packet conflict, origin loss, or unconfirmed delivery. Report the last safe journal event, the watcher delivery, the bound reached, and whether a new human-approved epoch is possible. Never auto-retry an ambiguous write.
- Cancel only when asked. Inspect goal and watcher state first. Cancel only pre-write queued resources the goal owns. Never claim a started delivery was prevented. Close only this goal's verifier pane.
- Recovery: replay the append-only state and query the watcher by client key. Repeat only idempotent pre-write requests.

## Never

- Interrupt an agent that is `working`, `blocked`, or `unknown`. A settle requires the recorded main to go from working to `idle`/`done`.
- Route by focus, layout, or a reused name. Pin by terminal ID, agent kind, and native session.
- Put a callback capability in a packet, prompt, report, or log.
- Reuse an epoch after an ambiguous write, resend an unconfirmed delivery, hand-repair a journal, replace a sealed packet, or weaken bounds to keep a loop alive.
