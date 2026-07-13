# Herdr command recipes

Read this when splitting panes, launching agents or commands, sending prompts, choosing read sources, or waiting on output. Confirm syntax against the installed command-group help before using version-sensitive flags.

## Split geometry and setup

Inspect the caller's rectangle, then split a wide pane right and a narrow or tall pane down; avoid repeated same-direction splits that create unusable slivers. Keep the user's focus where it is.

```sh
herdr pane layout --pane "$HERDR_PANE_ID"
herdr pane split --current --direction right --no-focus   # or --direction down
```

Read `result.pane.pane_id` from the JSON response, then label the pane — this
is a required step, not optional polish; unlabeled panes make `agent list` and
mixed fleets illegible:

```sh
herdr pane rename <returned-pane-id> "reviewer"
```

One pane per task: split fresh for each independent task instead of queuing
unrelated work into an existing pane; a pane's label should stay true to what
is running in it.

## Launch an agent interactively

Start the agent's normal executable so its interactive TUI opens — Codex: `codex`, Claude Code: `claude`, pi: `pi`, OpenCode: `opencode`, OMP: `omp`. Do not pass the task as an argv prompt and do not add non-interactive flags unless the user explicitly asks for a different launch mode.

```sh
herdr pane run <pane-id> "codex"
herdr wait agent-status <pane-id> --status idle --timeout 30000
herdr pane run <pane-id> "/rename diff-reviewer"
herdr pane run <pane-id> "Review the current diff and report only actionable findings."
```

Send the session rename only when the agent's slash help lists such a command;
match it to the pane label so live view and session history tell one story.

`pane run` sends the text and Enter together — use it for initial prompts and follow-ups instead of coordinating `pane send-text` plus `pane send-keys enter`. Reserve `send-text`/`send-keys` for partial input that must not submit yet.

For background work, wait for the working transition, then for completion, then read (see `status-semantics.md` for why background completion is `done` and watched completion is `idle`):

```sh
herdr wait agent-status <pane-id> --status working --timeout 30000
herdr wait agent-status <pane-id> --status done --timeout 120000
herdr pane read <pane-id> --source recent-unwrapped --lines 120
```

## Run an ordinary command in another pane

```sh
herdr pane split --current --direction right --no-focus
herdr pane run <returned-pane-id> "just test"
herdr wait output <returned-pane-id> --match "test result" --timeout 120000
herdr pane read <returned-pane-id> --source recent-unwrapped --lines 120
```

Inspect existing output before waiting for future output; a wait timeout exits with status 1. On timeout, run `herdr pane get <pane-id>` and `pane read` before deciding what to do.

## Read sources

- `visible` — the current rendered viewport.
- `recent` — recent scrollback as rendered, including soft wraps.
- `recent-unwrapped` — soft wraps joined; prefer for logs and transcripts.
- `detection` — the bottom-buffer snapshot agent detection uses.

Use `--format ansi` only when colors or styling are evidence.

Rendered reads reflect the pane's current rectangle: with many panes open and the target unzoomed, `visible` and `recent` can truncate or mangle output. Prefer `recent-unwrapped` first; if content is still clipped, zoom the pane temporarily and restore it:

```sh
herdr pane zoom --pane <pane-id> --on
herdr pane read <pane-id> --source recent-unwrapped --lines 120
herdr pane zoom --pane <pane-id> --off
```

Zoom changes the user's shared UI — always turn it back off immediately after the read.

## Organization

Use workspace and tab commands for organization: one workspace per repo family or durable mission, a tab per independent task lane, a split pane for a helper working in the same lane. Use `herdr notification show` for user-visible status, never for agent-to-agent transport.

## Worktrees for parallel writers

When multiple agents will mutate the same repo concurrently, isolate each writer in its own checkout instead of sharing one:

```sh
herdr worktree create --cwd <repo> --branch <task-branch> --label <task> --no-focus
herdr worktree list --cwd <repo>
```

Read the created workspace/pane IDs from the JSON and label the panes as usual. For requested cleanup, resolve the exact filesystem path and use a Herdr action only when current help proves it moves the target to Trash; otherwise stop. Never permanently delete a worktree, delete its branch, or use destructive Git, even after confirmation or archival.

## Agent-target transport

`herdr agent list` / `read` / `send` / `wait` address detected agents directly when a unique name or terminal ID exists. `agent send` writes literal text; some integrations do not auto-submit — read the pane afterward and submit Enter explicitly if needed. Prefer pane-ID targeting when names may collide.
