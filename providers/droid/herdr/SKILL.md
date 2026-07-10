---
name: herdr
description: "Operate Herdr workspaces, panes, and agent transport from its CLI. Use when the user names Herdr or wants to message, read, wait on, or coordinate another local terminal agent or pane; Maestri owns canvas agents."
---

# Herdr

Operate Herdr's local workspace, pane, and agent transport without guessing live state.

## Route

Read `references/command-recipes.md` only when the task needs exact CLI syntax for a Herdr discovery, workspace/tab, pane, agent, or wait operation. Read only the selected recipe; otherwise inspect installed CLI help for the exact subcommand.

## Workflow

1. Verify the installed command shape with `herdr --help`, then use the selected recipe to inspect relevant live state.
2. Resolve workspace, tab, pane, and agent IDs from those reads. Use named sessions only when the user names one.
3. Read a target before acting. Select the transport deliberately: agent send delivers literal agent text; pane run executes shell text and submits it; pane send-text only types, so submit separately when intended.
4. For a send or pane-command action, wait or read again to confirm the target's state and surface any confirmation, block, or continuation prompt.
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

Report the resolved target, action, and any blocker or needed user choice. If the action sent text or executed a command, also report the transport and observed post-action state.
