---
name: herdr
description: "Operate Herdr workspaces, panes, and agent transport from its CLI. Use when the user names Herdr or wants to message, read, wait on, or coordinate another local terminal agent or pane."
---

# Herdr

Herdr is a terminal multiplexer and runtime for coding agents. Drive it only through its CLI.

## Preflight

- Require `HERDR_ENV=1`. If it is not set, say so and stop, unless the user names the exact target. Never control the user's focused session from outside Herdr. Never use `--current` or omit a target.
- Your identity: `$HERDR_WORKSPACE_ID`, `$HERDR_TAB_ID`, `$HERDR_PANE_ID`. Always target with `--pane "$HERDR_PANE_ID"`. `--current` has been seen resolving to a pane in another workspace. Omitting a target can act on the user's focused pane.
- Discover syntax with `herdr --help` and bare command groups (`herdr pane`, `herdr workspace`, `herdr tab`, `herdr agent`, `herdr worktree`). Never run bare `herdr`: it launches the TUI. Never probe a mutating command by omitting its arguments: `herdr workspace create` runs with defaults.
- Inspect first: `herdr workspace list`, `herdr pane list --workspace "$HERDR_WORKSPACE_ID"`, `herdr agent list`. Most commands print JSON.

## IDs

- IDs (`w1`, `w1:t1`, `w1:p1`, `term_...`) are opaque. Closed IDs are not reused. A moved pane gets a new ID. A live handoff keeps the pane ID but issues a new `term_...` ID.
- Parse IDs from JSON responses only. Never build one from display order or examples. Re-read after every mutation.

## Split, label, launch

```sh
herdr pane layout --pane "$HERDR_PANE_ID"                                   # wide pane: split right; tall pane: split down
herdr pane split --pane "$HERDR_PANE_ID" --direction right --no-focus      # read result.pane.pane_id
herdr pane rename <id> "<role>"                                             # required, before work starts
herdr pane run <id> "codex"                                                 # or claude, pi, opencode, omp
herdr agent wait <id> --until idle --timeout 30000
herdr pane run <id> "/rename <role>"                                        # only if the agent's slash help lists it
herdr pane run <id> "<self-contained brief>"
```

- Use one pane per task, labeled with its role. Reuse a pane only for follow-ups to its own task.
- Start the plain interactive TUI, wait until it is ready, and then send the prompt. For a long or interactive task, never pass the task as an argv prompt and never add non-interactive flags unless the user asks. A short one-shot query may use the harness's non-interactive mode.
- `pane run` sends the text and Enter together. Use `send-text`/`send-keys` only for input that must not submit yet.
- `agent send <target> '<text>'` writes literal text. Some integrations do not auto-submit, so read afterward and send Enter if needed. Prefer pane IDs when agent names can collide.
- Default to a sibling split in the current tab and cwd. Create a workspace, tab, or other cwd only when the user asks.
- Parallel writers on one repo each get `herdr worktree create --cwd <repo> --branch <task> --label <task> --no-focus`.
- A credential-bearing task gets its own `credential-worker-<vault>` pane. Follow `agent-vault`. Never wrap the model TUI.

## Wait and read

- Status: `idle` and `done` are the same state (at the prompt). `done` means the result is unseen: the agent finished in a background tab, or while the client was unfocused. Focusing the pane turns `done` into `idle`. A fresh agent reports `idle`.
- For background work, wait for `working` (the prompt landed), then for `done`. If the user watches that tab, completion shows `idle`. In `pane get`, treat either one as finished.
- `blocked`: the agent needs input, so read the pane. `unknown`: no agent detected yet, so inspect before you assume failure.
- A wait timeout exits 1. Then run `pane get` and `pane read` before you decide.
- `herdr pane wait-output --match "<text>" --timeout <ms> <id>` works for ordinary commands.
- `herdr agent wait <id>` with no `--until` matches idle, done, or blocked. Without `--timeout` it waits forever.
- Read sources: `recent-unwrapped` (prefer it for logs and transcripts), `recent`, `visible`, `detection`. Use `--format ansi` only when color is evidence.
- Reads render at the pane's current size. If output is clipped, run `pane zoom --pane <id> --on`, read, then `--off` immediately.

## Rendered pages in a pane

- Herdr passes Kitty graphics through by default (`terminal.kitty_graphics`), so `terminal-browser` (Homebrew cask) shows real Chromium pixels in a pane.
- Open: `terminal-browser open <url|port|file.html> --split right`. Drive the open tab: `terminal-browser action -- snapshot|click|fill|eval`.
- The first `open` symlinks a `terminal-browser` skill into `providers/claude` and `providers/agents` (outside `manifest.json`, pinned to the cask version). Remove the links. Never run `terminal-browser setup`.
- Text-only viewers (`glow`, `herdr-file-viewer`) show mdxcn ASCII fences but not MDX components.

## Completion callback (optional)

To go idle instead of polling, put your pane ID in the child's brief with a final instruction:

```
herdr pane run <coordinator-pane-id> 'DONE <label>: <one-line summary>'      # or 'BLOCKED <label>: <need>'
```

- The callback is a wake signal, not the result. Read the child's pane and artifacts.
- Callbacks can be lost. Keep a backstop: a background `herdr agent wait <id>` or a `pane get` sweep.
- Keep it one line and single-quoted, with no secrets. Only children inside Herdr can call back.

## Never

- Change the user's focus (use `--no-focus`) or leave a zoom set.
- Close or remove workspaces, tabs, panes, sessions, or worktrees you did not create. Do close the ones you created, once you have read their results, except a worktree or branch with unmerged or unpushed commits: report it instead of deleting it.
- Run `herdr server stop` from an active session or kill the main Herdr process. Use named test sessions for experiments.
- Test `herdr update` or live handoff against real sessions. A named session does not isolate `herdr update`: it targets every session under `XDG_CONFIG_HOME`. For these tests, point `XDG_CONFIG_HOME`, `XDG_RUNTIME_DIR`, and `XDG_STATE_HOME` at a temp base, pass `--session`, and check that `session list` shows only temp sockets.
- Send secrets through Herdr.
- Use `herdr notification show` for agent-to-agent transport. It is for user-visible status only.
- Ask another agent to write git state outside its own assigned worktree, install packages, or edit generated areas without the user's approval. Git inside its own worktree is fine.
- Continue when the target is ambiguous. Stop and report. If live help disagrees with a read-only command, use the live syntax. If it disagrees with a mutating command, stop and report.
