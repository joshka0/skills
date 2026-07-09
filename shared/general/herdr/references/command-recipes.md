# Herdr command recipes

Read this only when the task needs exact syntax for one selected discovery, workspace/tab, pane, agent, or wait operation. Confirm the relevant installed CLI help before applying a command; do not load unrelated recipes.

## Discover relevant live state

```sh
herdr status
herdr workspace list
herdr tab list --workspace <workspace-id>
herdr pane list --workspace <workspace-id>
herdr agent list
```

Use only the reads needed to resolve the requested surface and target.

## Create or focus a work surface

```sh
herdr workspace create --cwd <path> --label <name> --focus
herdr workspace focus <workspace-id>
herdr tab create --workspace <workspace-id> --cwd <path> --label <task> --focus
herdr tab focus <tab-id>
```

Use a workspace for a repo family or durable mission, a tab for an independent task lane, and a split pane for a helper shell or peer working in that lane.

## Inspect and operate a pane

```sh
herdr pane read <pane-id> --source recent --lines <count>
herdr pane split <pane-id> --direction <right|down> --cwd <path> --focus
herdr pane run <pane-id> '<command>'
herdr pane send-text <pane-id> '<literal text>'
herdr pane send-keys <pane-id> enter
```

`send-text` does not submit. Read after a send before deciding whether to wait, submit, or escalate.

## Exchange work with an agent

```sh
herdr agent read <target> --source recent --lines <count>
herdr agent send <target> '<literal message>'
herdr agent wait <target> --status idle --timeout <milliseconds>
```

When an integration does not auto-submit an agent message, inspect its pane and submit Enter explicitly.

## Wait for a concrete signal

```sh
herdr wait output <pane-id> --match '<text>' --lines <count> --timeout <milliseconds>
herdr wait agent-status <pane-id> --status idle --timeout <milliseconds>
```

Use a bounded wait only for a concrete output or status. Re-read the target after the wait before assigning more work.
