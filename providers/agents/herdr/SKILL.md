---
name: herdr
description: "Operate Herdr workspaces, panes, and agent transport from its CLI. Use when the user names Herdr or wants to message, read, wait on, or coordinate another local terminal agent or pane; Maestri owns canvas agents."
---

# Herdr

Operate Herdr — a terminal multiplexer and runtime for coding agents — through its CLI without guessing live state.

## Preflight

1. Confirm this agent runs inside a Herdr-managed pane: `test "${HERDR_ENV:-}" = 1`. If it fails, say you are not running inside Herdr and stop; do not control the focused session from outside.
2. The caller's stable context is injected: `$HERDR_WORKSPACE_ID`, `$HERDR_TAB_ID`, `$HERDR_PANE_ID`. Target the calling pane with `--pane "$HERDR_PANE_ID"` — `--current` has been observed mis-resolving to another workspace, and omitting a target can act on the user's focused pane.
3. Discover syntax from the installed binary: `herdr --help`, then print a command group by running it bare (`herdr pane`, `herdr workspace`, `herdr tab`, `herdr wait`, `herdr worktree`). Never run bare `herdr` for discovery — it launches the TUI — and never probe a mutating command by omitting arguments (`herdr workspace create` is valid with defaults and will execute).

## Route

| Reference | Read when |
| --- | --- |
| `references/command-recipes.md` | Splitting panes, launching agents or commands, sending prompts, choosing read sources, or waiting on output |
| `references/status-semantics.md` | Interpreting or waiting on `agent_status` (idle, done, working, blocked, unknown) |

## Workflow

1. Inspect live state first: `herdr workspace list`, `herdr pane list --workspace "$HERDR_WORKSPACE_ID"`, `herdr agent list`. Most control commands print JSON; read identifiers and state from those responses.
2. Target with `--pane "$HERDR_PANE_ID"` or an explicit ID parsed from a JSON response. IDs (`w1`, `w1:t1`, `w1:p1`, `term_...`) are opaque strings; closed IDs are not reused, moved panes get new IDs — re-read after every mutation and never construct an ID from display order.
3. Act through the pane as the one stable control surface for agents, shells, servers, and logs. `herdr pane run <pane-id> '<text>'` sends the text and Enter together — use it for prompts and follow-ups. `herdr agent send <target> '<text>'` sends literal text to a detected agent; verify submission by reading afterward.
4. Read before and after acting; wait for the specific state or output you expect (`herdr wait agent-status ...`, `herdr wait output ...`), then re-read.
5. Keep cross-agent requests self-contained: task, context to read first, allowed scope, prohibitions, and expected return shape.

## Hard rules

- Do not guess targets or IDs. Parse them from JSON responses, never from sidebar order or examples.
- Use `--no-focus` for background work; keep the user's focus in their pane unless they asked to switch.
- **One pane per task, always labeled**: each new independent task gets its own split, renamed to its role/task (`herdr pane rename <id> "<role>"`) before work starts. Reuse a pane only for follow-ups to that pane's existing task; never queue an unrelated task into a busy or differently-labeled pane.
- **Name the agent's session too**: after launching an agent, give its own session the same label where its TUI supports renaming (confirm in its slash help; e.g. Claude Code `/rename <label>`), so resume pickers and history stay legible thread-by-thread.
- **Clean up what you opened**: close panes and remove worktrees you created once their task is complete and its results are read; never close surfaces you did not create.
- Default new work to a sibling split in the current tab and cwd; create a workspace, tab, or different cwd only when the user requests that topology.
- **Parallel writers get isolated checkouts**: when two or more agents will mutate the same repo concurrently, give each its own `herdr worktree create --branch <task> --label <task>` instead of sharing the checkout; file-disjoint sharing is only for explicitly coordinated same-wave edits with a named coordinator.
- Quote literal messages so the calling shell cannot expand metacharacters. Never send secrets through Herdr.
- Do not close workspaces, tabs, panes, or sessions you did not create unless the user explicitly asked.
- Reads render at the pane's current size: on crowded layouts prefer `recent-unwrapped`, and if output is still clipped, `pane zoom --on`, read, then `--off` — never leave a zoom you set.
- Never run `herdr server stop` from an active session and never kill the main Herdr process; use named test sessions for isolated experiments.
- Move filesystem cleanup targets only with `/usr/bin/trash <path>`. Never use destructive Git or a Herdr action that permanently deletes a worktree; confirmation does not override this rule.
- Do not ask another agent to run git commands, install packages, or modify broad/generated areas without the user's explicit approval.

## Stop conditions

- Stop and report the observed state when no unambiguous target can be resolved or `HERDR_ENV` is not 1.
- Stop rather than guessing when installed command-group help disagrees with a needed command or flag.

## Output

Report the target resolved, action taken, observed post-action state or output, and any blocker or needed user choice.
