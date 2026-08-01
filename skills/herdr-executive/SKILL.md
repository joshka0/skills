---
name: herdr-executive
description: "Operate the Herdr Executive coordinator, manager attention, durable queues, phone gateway, and Shepr voice client. Use when the user names Executive, Shepr, handsfree replies, or manager blockers/questions."
---

# Herdr Executive

Operate the durable executive-assistant layer above Herdr transport. Keep user
turns, manager attention, Executive review, and phone speech as separate state.

## Boundary

- `herdr-executive` owns coordinator state, drafts, manager events,
  clarifications, outbound delivery, speech, the phone gateway, and Shepr.
- `herdr` owns workspaces, panes, named-agent resolution, prompt submission, and
  live agent status. Apply that skill too when diagnosis crosses into a pane.
- `agent-orchestration` owns choosing or coordinating delegated agents; it does
  not own Executive queue operations.

## Preflight

1. Resolve the current `herdr-executive` executable from `PATH` or from the
   repository the user placed in scope. Store the validated path in
   `$EXECUTIVE_BIN`; do not search the whole home directory.
2. Discover current syntax with `"$EXECUTIVE_BIN" --help` and the selected
   command's `--help`. Treat checked-in source and live help as newer than this
   skill.
3. Read `status` and `queue --json` before mutation. Record the relevant draft,
   event, clarification, outbound, and speech IDs rather than relying on UI
   counts alone.
4. When a named Executive or manager pane matters, verify `$HERDR_ENV` and use
   the `herdr` skill to resolve the target. Never infer a route from pane focus
   or a pane label.

## References

| Read | Select when |
| --- | --- |
| `references/operations.md` | Inspecting or changing drafts, managers, attention, clarifications, speech, daemon state, or queue state |
| `references/delivery-and-shepr.md` | Diagnosing end-to-end voice delivery, changing the Swift client or gateway, restarting live service, or shipping TestFlight |

Read only the selected reference. Read both only when a requested repair crosses
the coordinator and mobile-client boundary.

## Workflow

1. Identify the user's intended object and outcome: a pending draft, attention
   item, tracked question, manager enrollment, outbound turn, or speech item.
2. Trace one correlation chain through the snapshot before diagnosing. Separate
   “submitted to Executive” from “Executive responded” and “phone acknowledged
   playback.”
3. Use the narrow coordinator command or authenticated client action that owns
   the transition. Do not type directly into a manager pane as a substitute for
   a journaled Executive action.
4. Re-read the snapshot and, when delivery is involved, verify the uniquely
   named target and its post-action state through Herdr.
5. For code changes, validate the affected Rust and Swift surfaces, restart only
   through the discovered service owner, and prove queue counts survived.

## Hard rules

- Never edit, truncate, replace, or hand-repair `coordinator.jsonl`. All durable
  transitions go through the coordinator CLI, control socket, or gateway.
- Never forward raw or partial dictation to a manager. A phone turn targets the
  named Executive; only an explicit reviewed answer targets a manager.
- Do not report an outbound item as a response. `completed` proves prompt
  submission; speech or an observed Executive result proves a response.
- Treat the Herdr agent name, pane label, and agent kind as separate facts.
  Replacing Claude with Codex in one pane requires verifying or restoring the
  unique `executive` agent name even when the pane label survives.
- Do not resolve, dismiss, skip, or bulk-clear live items unless the user asked
  for that state change. Preserve unreachable items unless their disposition is
  explicit.
- Never print, log, place in argv, or summarize the phone bearer token, Apple
  credentials, Infisical values, Fish credentials, or secret-bearing URLs.
- Do not start a second gateway or daemon when a service owner already exists.
- Do not upload TestFlight, change signing, or alter Tailscale Serve unless the
  user explicitly requested that external mutation.

## Stop conditions

- Stop when the executable, state owner, or named target cannot be resolved
  unambiguously from live state.
- Stop before a queue transition whose product meaning differs from the user's
  request, such as treating dismissal as a manager reply or playback skip as
  blocker resolution.
- Stop and report when current CLI help or source contradicts a recipe rather
  than inventing a compatibility path.

## Output

Report the resolved executable and target, the correlation IDs inspected, the
transition or repair performed, before/after queue evidence, verification run,
and any live item deliberately left untouched.
