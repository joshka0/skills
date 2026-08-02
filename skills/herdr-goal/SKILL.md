---
name: herdr-goal
description: "Operate bounded Herdr goal loops with an explicit Luna verifier, sealed epoch packets, and watcher callbacks. Use when the user names herdr-goal, wants a Ralph loop, or asks for verifier-gated continuation."
---

# Herdr Goal

Run a main Codex worker and a separate read-only Luna verifier as a bounded,
durable loop. The main seals an exact epoch packet while working; watcher wakes
Luna only after that pinned main session settles, then returns one authenticated
verdict to the same main terminal.

## Boundary

- `herdr-goal` owns goal epochs, verifier launch, sealed packets, convergence,
  stalls, and final completion reconciliation.
- `herdr-watcher` owns settled wakes, epoch callbacks, terminal pinning,
  delivery, and unknown write boundaries.
- `herdr` owns pane creation and agent transport. Apply its targeting rules;
  never substitute the focused pane.
- `goal-protocol` owns authoring or changing a durable `GOAL.md`; this skill
  executes an already measurable verification loop.

## Preflight

1. Require `HERDR_ENV=1`, nonempty Herdr workspace/tab/pane IDs, and direct
   invocation from the main agent pane. Reject plugin-action context.
2. Resolve `herdr-goal` and `herdr-watcher` from live plugin state or validated
   paths. Read their live help and watcher `capabilities --json`.
3. Run `herdr integration status`; require the Codex integration to be current
   and verify both panes expose native `agent_session.value` identity.
4. Require watcher capabilities `settled_wake_v1` and `epoch_callback_v1`.
5. Inspect current goal state before mutation. Never infer an epoch or verdict
   from pane text.

## Route

| Reference | Read when |
| --- | --- |
| `references/start-loop.md` | Starting a loop, selecting bounds, or launching the Luna verifier |
| `references/checkpoint-and-report.md` | Sealing an epoch, executing a verifier packet, or returning a verdict |
| `references/lifecycle.md` | Inspecting, completing, cancelling, recovering, or diagnosing a stalled loop |

Read only the selected reference. Read more than one only when the requested
operation crosses those lifecycle surfaces.

## Workflow

1. Confirm the goal and acceptance criteria are measurable. Do not give Luna a
   bare goal; produce an exact read-only verification packet.
2. Start with explicit maximum epochs, overall deadline, settle timeout, wake
   timeout, and verifier timeout. Record the returned goal and verifier IDs.
3. Before each main work turn ends, seal the current epoch with `checkpoint`.
   Re-read state and require durable watcher acknowledgements before ending.
4. Let watcher wake Luna after the recorded main session reaches `idle` or
   `done`. Luna executes only the sealed packet and submits one report.
5. On `changes-requested`, address only failing criteria and checkpoint the next
   epoch. On `pass`, let the pinned main reconcile evidence and run `complete`.
6. Treat timeout, identity loss, blocked/failed verification, exhausted epochs,
   or unconfirmed delivery as a durable stall, not another automatic attempt.

## Hard rules

- Launch the verifier explicitly as Codex `gpt-5.6-luna` with effort `max`.
  Luna executes the exact packet; it never plans, edits source, mutates Git,
  delegates, or broadens scope.
- Pin main and verifier by terminal ID, agent kind, and native session. Pane IDs
  are addresses only; never route by focus, layout order, or a reused name.
- Never interrupt an agent in `working`, `blocked`, or `unknown`. A goal settle
  requires the recorded main to transition from working to `idle` or `done`.
- Never place a callback capability in a packet, prompt, report, or log. Pass
  only its protected invite-file path to the pinned Luna terminal.
- A Luna `pass` is necessary but insufficient. Only the pinned main may mark the
  goal complete after validating accepted evidence.
- Never reuse an epoch after an ambiguous prompt write, resend an unconfirmed
  delivery, hand-repair a journal, or weaken bounds to keep a loop alive.
- Do not cancel or close resources the plugin did not create.

## Stop conditions

- Stop if either agent identity is missing, ambiguous, replaced, or no longer
  matches its pinned native session.
- Stop if live watcher capabilities or CLI syntax do not match the required
  protocol, or if a packet has ambiguous steps or forbidden side effects.
- Stop after the configured epoch/deadline/error boundary. Report the durable
  stall rather than inventing recovery.

## Output

Report the goal ID, main and verifier terminal IDs, current epoch/state,
watcher resource IDs, packet digest, verdict and evidence, delivery state,
bounds remaining, resources left active, and the exact next action or stall.
