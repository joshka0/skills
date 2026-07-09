---
name: herdr
description: "Operate local Herdr workspaces, panes, and agent transport safely from its CLI. Use when a task names Herdr or needs a Herdr pane read, literal agent send, pane command, or workspace operation."
---

# Herdr

Operate Herdr's local workspace, pane, and agent transport without guessing live state.

## Route

Read `references/command-recipes.md` only when creating, focusing, splitting, or waiting on Herdr surfaces; otherwise inspect the installed CLI help for the exact subcommand.

## Workflow

1. Verify the installed command shape, then inspect live state:

   ```sh
   herdr --help
   herdr status
   herdr workspace list
   herdr agent list
   ```

2. Resolve workspace, tab, pane, and agent IDs from those reads. Use named sessions only when the user names one.
3. Read a target before acting. Select the transport deliberately:
   - `herdr agent send <target> <text>` sends literal agent text.
   - `herdr pane run <pane-id> <command>` executes shell text and submits Enter.
   - `herdr pane send-text <pane-id> <text>` only types; follow with `herdr pane send-keys <pane-id> enter` when submission is intended.
4. After sending, wait or read again to confirm the target's state and surface any confirmation, block, or continuation prompt.
5. Keep cross-agent requests self-contained: task, context to read first, allowed scope, prohibitions, and expected return shape.

## Hard rules

- Do not guess targets. Agent names can collide; prefer an unambiguous live target or a terminal/pane ID.
- Run `herdr <area> --help` before using version-sensitive flags or commands not confirmed by live output.
- Quote literal messages so the calling shell cannot expand metacharacters or split intended newlines. Never send secrets through Herdr.
- Do not use `pane run` for natural-language prompts unless shell execution is intended.
- Use `--cwd <path>` for new workspaces, tabs, panes, and agents. Keep independent same-wave agents file-disjoint unless a supervisor coordinates overlap.
- Use `herdr pane process-info` before interrupting or closing an unknown pane.
- Use notifications for user-visible status, not agent-to-agent transport.
- Do not ask an agent to run git commands, install packages, or modify broad/generated areas without the user's explicit approval.

## Stop conditions

- Stop and report the observed state when no unambiguous target can be resolved.
- Stop rather than guessing when installed help disagrees with a needed command or flag.

## Output

Report the target resolved, transport used, observed post-send state, and any blocker or needed user choice.
