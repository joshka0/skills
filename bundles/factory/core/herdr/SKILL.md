---
name: herdr
description: >
  Operate Herdr workspaces, tabs, panes, and agent terminals from the CLI. Use
  when launching or inspecting Herdr sessions, organizing agents by workspace,
  reading panes, sending exact text to other agents, or coordinating terminal
  panes without using the visual UI.
---

# Herdr

Use Herdr as the local terminal workspace manager for agent sessions.

## When To Use

Use this skill when the task involves Herdr sessions, workspaces, tabs, panes,
agent terminals, reading another agent's pane output, sending exact text to an
agent, starting an agent in a pane, or coordinating local terminal panes without
the visual UI.

## First Checks

Start with:

```sh
herdr status
herdr workspace list
herdr agent list
```

Do not guess IDs. Read the current workspace, tab, pane, and agent state before
acting.

## Mental Model

- **Session**: persistent Herdr server/client state. Default is usually enough.
  Use `herdr --session <name>` or `herdr session attach <name>` only when the
  user names a session.
- **Workspace**: project or repo grouping, usually one repo family or mission.
- **Tab**: task lane inside a workspace, such as review, implementation, tests,
  logs, or a specific goal.
- **Pane**: one terminal surface inside a tab.
- **Agent**: detected or reported agent running in a pane. Targets can be
  terminal IDs, unique agent names, detected/reported labels, or legacy pane IDs.

## Common Commands

Workspaces:

```sh
herdr workspace list
herdr workspace create --cwd <path> --label <name> --focus
herdr workspace focus <workspace_id>
herdr workspace rename <workspace_id> <label>
```

Tabs:

```sh
herdr tab list --workspace <workspace_id>
herdr tab create --workspace <workspace_id> --cwd <path> --label <task> --focus
herdr tab focus <tab_id>
herdr tab rename <tab_id> <label>
```

Panes:

```sh
herdr pane list --workspace <workspace_id>
herdr pane read <pane_id> --source recent --lines 80
herdr pane split <pane_id> --direction right --ratio 0.5 --cwd <path> --focus
herdr pane run <pane_id> '<command>'
herdr pane send-text <pane_id> '<literal text>'
herdr pane send-keys <pane_id> enter
```

Agents:

```sh
herdr agent list
herdr agent read <target> --source recent --lines 80
herdr agent send <target> '<literal message>'
herdr agent wait <target> --status idle --timeout 300000
herdr agent focus <target>
herdr agent start <name> --cwd <path> --workspace <workspace_id> --split right -- <argv...>
```

Waits:

```sh
herdr wait output <pane_id> --match '<text>' --lines 120 --timeout 300000
herdr wait agent-status <pane_id> --status idle --timeout 300000
```

## Talking To Other Agents

1. Run `herdr agent list`.
2. Pick a unique target: preferably the agent `name`, otherwise agent label,
   terminal ID, or pane ID.
3. Read recent output before sending:

```sh
herdr agent read <target> --source recent --lines 80
```

4. Send exact text:

```sh
herdr agent send <target> '<message>'
```

5. Wait or poll:

```sh
herdr agent wait <target> --status idle --timeout 300000
herdr agent read <target> --source recent --lines 120
```

Use `herdr pane run <pane_id> '<command>'` when you want command text executed
with Enter. Use `herdr agent send` for messages/prompts to an agent. If a raw
interactive pane needs submission after `send-text`, send `enter` explicitly.

## Gotchas

- `herdr pane send-text` only types text. It does not submit. Follow with
  `herdr pane send-keys <pane_id> enter` when the pane needs Enter.
- `herdr agent send` sends literal text to an agent target. If the agent UI does
  not auto-submit in that integration, read the pane and submit with
  `pane send-keys ... enter`.
- `herdr pane run` is for shell commands; it sends the command plus Enter. Do
  not use it for natural-language agent prompts unless you intentionally want
  the shell to execute that text.
- Always read after sending. A pane may be waiting for confirmation, blocked on
  input, or sitting at a continuation prompt.
- Quote messages carefully. Newlines and shell metacharacters can be interpreted
  by your shell before Herdr receives them.
- Agent names are not always unique. Prefer unique `name` values from
  `herdr agent list`; otherwise use terminal or pane IDs.

## Message Shape

Keep agent messages self-contained:

```text
Task: <one sentence>
Context: <paths/artifacts to read first>
Scope: <allowed files/actions>
Do not: <forbidden actions>
Return: <expected report shape>
```

Never send secrets through Herdr. Do not ask another agent to run git commands,
install packages, or touch broad/generated areas unless the user explicitly
approved that scope.

## Workspace Practice

- Use one workspace per repo family or durable mission.
- Use tabs for independent task lanes, not random context.
- Use panes for agents, shells, logs, servers, or focused command runners.
- Name workspaces, tabs, panes, and agents clearly enough that `agent list` is
  readable later.
- Prefer a new tab for a new ticket/wave. Prefer a split pane for a helper shell
  or peer agent working in the same lane.
- Keep same-wave agents file-disjoint unless a supervisor coordinates overlap.

## Safety

- `herdr agent send` writes literal text.
- `herdr pane run` executes a shell command in the pane.
- Read before sending. Wait after sending.
- Prefer `--cwd <path>` so new tabs/panes/agents start in the intended repo.
- Use `herdr pane process-info` before interrupting or closing unknown panes.
- Use `herdr notification show <title> --body <text>` for user-visible status,
  not for agent-to-agent communication.
