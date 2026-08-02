---
name: herdr-watcher
description: "Operate durable Herdr continuations, polled probes, delegation joins, and origin-pinned callbacks. Use when the user names herdr-watcher, wants an agent resumed later, or needs worker reports joined."
---

# Herdr Watcher

Operate the durable callback layer above Herdr transport. Arm work from the
origin pane, let that agent end its turn, and allow the daemon to resume the
same terminal only after a condition or delegation join reaches an outcome.

## Boundary

- `herdr-watcher` owns probe scheduling, durable resources, worker invites,
  joins, callback delivery, and recovery state.
- `herdr` owns workspace and pane discovery, worker-pane creation, agent
  transport, and live status. Apply it when worker panes must be resolved.
- `agent-orchestration` owns selecting and briefing workers. It does not own
  watcher invites, reports, or join state.
- `herdr-executive` owns manager attention and voice queues, not watcher
  continuations.

## Preflight

1. Resolve `herdr-watcher` from `PATH` or the repository the user placed in
   scope. Store the validated executable in `$WATCHER_BIN`; do not search the
   whole home directory.
2. Run `"$WATCHER_BIN" --help` and the selected command's `--help`. Prefer the
   checked-in source and live help over command shapes in this skill.
3. Read `"$WATCHER_BIN" status --json` before a mutation. Record resource and
   delivery IDs; do not infer state from a pane alone.
4. For `continue`, `delegation create`, or `report`, require `HERDR_ENV=1` and
   a nonempty `HERDR_PANE_ID`. These commands must run directly in the arming
   or reporting agent pane and must not run as a plugin action.

## Route

| Reference | Read when |
| --- | --- |
| `references/continuations.md` | Arming or cancelling a polled command condition |
| `references/delegations.md` | Creating a worker roster, briefing reporters, or joining reports |
| `references/lifecycle.md` | Inspecting daemon, resource, delivery, or recovery state |

Read only the selected reference. Read more than one only when the requested
workflow crosses those surfaces.

## Workflow

1. Identify whether the origin needs a command continuation or a closed worker
   delegation. Resolve every participating pane from current Herdr state.
2. Inspect watcher status, then arm the resource with a bounded deadline,
   explicit callback message, and the narrowest repeatable condition or roster.
3. Capture the acknowledged resource ID. For a delegation, also capture each
   label-to-invite-file mapping and place only that path in the matching worker
   brief.
4. Re-read the resource with `show <id> --json`. The origin may end its turn
   only after the durable acknowledgment and expected origin binding appear.
5. On follow-up, distinguish resource outcome from callback delivery state.
   Report unresolved, unconfirmed, or origin-lost delivery honestly.

## Hard rules

- Never target the focused pane or reconstruct an opaque ID. Let the watcher
  pin terminal identity and re-resolve its current pane before delivery.
- Never type a callback directly into the origin pane as a substitute for a
  watcher delivery.
- Prefer direct, read-only probe argv. There is no implicit shell; use an
  explicit shell only when its expansion is required and safely quoted.
- Never place credentials, secret-bearing URLs, or broad environment output in
  probes, messages, summaries, bodies, or worker briefs.
- Never print or transmit an invite capability. Give one worker only its
  mode-private invite file path and let `report` read it locally.
- Never edit, truncate, replace, compact, or hand-repair the journal, invite
  files, control socket, lock, or daemon state directory.
- Treat terminal resource states and delegation seals as immutable. Do not
  re-arm or resend automatically after `unconfirmed`; duplicate delivery is
  possible across an unknown write boundary.
- Do not stop the daemon, cancel a resource, or discard a late report unless
  the user requested that state change.

## Stop conditions

- Stop when an arming/reporting command is outside a Herdr-managed pane, comes
  from a plugin action, or lacks an exact current pane identity.
- Stop when an origin or worker pane does not resolve to exactly one compatible
  agent; never substitute a name or focused pane.
- Stop and report when live help, source, or current state contradicts a recipe
  rather than inventing a compatibility path.

## Output

Report the resolved executable, origin terminal or worker panes, resource ID,
poll or join policy, durable resource state, callback delivery state, commands
verified, and any resource deliberately left active.
