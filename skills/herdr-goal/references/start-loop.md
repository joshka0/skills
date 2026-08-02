# Start a bounded goal loop

Read this only when creating a goal loop or launching its verifier.

## Inputs

Require:

- a measurable goal and criterion IDs;
- repository/cwd and authoritative files;
- maximum epochs and an overall deadline;
- settle, wake-delivery, and verifier timeouts;
- explicit allowed verification side effects.

If the goal is still vague or disputed, hand it to `goal-protocol` before
starting runtime supervision.

## Start

1. Inspect live Herdr agents, current goal/watcher status, and `herdr
   integration status`. Require the Codex integration to be current and the
   main pane to expose `agent_session.value`.
2. Run live `herdr-goal start --help`; do not copy stale flags from this skill.
3. Start directly inside the intended main Codex pane with every required
   bound. Capture the acknowledged goal ID.
4. Verify that the plugin created one no-focus sibling pane in the selected
   cwd, gave the pane and agent the same goal-specific name, and launched:

   ```text
   codex -m gpt-5.6-luna -c model_reasoning_effort=max --no-alt-screen
   ```

5. Re-read the goal. Require pinned main and verifier terminal/session
   identities and an active first epoch before continuing work.

Herdr may acknowledge agent start before its Codex SessionStart hook exposes a
native session. In that case, Goal itself sends one bounded protocol-only
`READY` bootstrap that forbids work, tools, and edits, then performs a fresh
agent read. Accept `idle` or `done` only when the label, kind, pane, terminal,
and native session still match. Do not reproduce this bootstrap manually.

Goal may also retry Herdr's exact pre-mutation `agent_pane_busy` response while
the new shell becomes discoverable. This retry is bounded and does not apply to
any other launch failure. Preserve the returned adapter diagnostic when start
stalls.

Let goal derive the verifier label unless the exact public derivation is known.
Do not build a label by concatenating an arbitrary goal ID; Herdr agent names
are limited to 32 bytes and a restricted lowercase alphabet.

Do not send Luna a bootstrap goal prompt. The protocol-only session bootstrap
contains no goal, and Luna receives no work until watcher delivers a sealed
epoch packet.

## Packet preparation

Prepare a versioned JSON packet containing the objective, criterion IDs,
allowed sources, ordered verification argv/cwd/expected results, evidence to
capture, allowed side effects, prohibitions, ambiguity stops, and report
contract. See `checkpoint-and-report.md` when sealing it.

## Failure

If pane creation or agent start fails, report the created resources and the
durable setup state. Close only a pane that this start attempt created and only
when current live state proves it is safe.
