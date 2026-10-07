---
name: herdr-plugin-service
description: "Run a daemon as a Herdr plugin service pane: manifest, ensure-service startup command, relink, and safe restart. Use when you add, start, restart, or debug a plugin service."
---

# Herdr plugin service

A Herdr plugin can run a daemon in a plugin-owned pane. This skill covers the
manifest, the start path at Herdr start, and safe restarts. For panes,
workspaces and agent messages in general, use the `herdr` skill.

## Reference versions

Read one of these before you write a new service. Copy its shape.

| Plugin | Manifest | Ensure and supervise |
| --- | --- | --- |
| `joshka.coordinator` | `~/repos/personal/herdr-coordinator/herdr-plugin.toml` | `herdr-coordinator/src/service.ts`: `ensureService` and `superviseService` (restart with backoff) |
| `joshka.fleet-memory` | `~/repos/personal/memoryd/herdr-plugin.toml` | `memoryd/bin/fleet-memory-service ensure-service` and `supervise` |
| `joshka.blackboard` | `~/repos/personal/herdr-blackboard/herdr-plugin.toml` | `herdr-blackboard/scripts/ensure-service.sh` (POSIX sh, no supervisor) |

## Manifest

- `[[panes]]` declares the service pane. Give it `id = "service"`.
- Use `placement = "tab"` for a service in its own workspace. Herdr rejects a
  `split` plugin pane without a target pane: `split and zoomed plugin panes
  target an existing pane; use target_pane_id`.
- `[[startup]]` runs when Herdr starts. The command must exit. Do not run the
  daemon there; open the pane instead. Herdr allows at most 32 startup
  commands in total.
- Add an `[[actions]]` entry with the same command as `[[startup]]`
  (`id = "ensure-service"`). The operator uses it to start the service by
  hand.
- Commands run from the plugin root, so relative command paths resolve
  there.
- Each pane command is a fixed argv. To set environment variables, use
  `["/bin/sh", "-c", "export A=...; exec node ..."]`. Use `exec`, so that the
  daemon receives the pane's signals directly.

## The ensure-service startup command

Write it in this order:

1. Probe the service socket. If it answers, exit 0. A stale socket file
   refuses the connection, so a connect probe is enough. A protocol probe
   (as in the coordinator) is better.
2. Take a lock in the state directory, so that two runs cannot open two
   panes. Treat a lock as stale when its owner PID is dead or the lock is
   older than a fixed age.
3. Probe again. Another run can have started the service.
4. Find the workspace with your service label (`herdr workspace list`). If
   none exists, create it:
   `herdr workspace create --label <label> --cwd <root> --no-focus`. The JSON
   result gives `result.workspace.workspace_id` and
   `result.root_pane.pane_id`. The root pane is a starter shell.
5. Open the service pane:
   `herdr plugin pane open --plugin <id> --entrypoint service --workspace <ws> --no-focus`.
   The pane ID is at `result.plugin_pane.pane.pane_id`.
6. Close the starter shell if it is not the service pane.
7. Wait for the socket with a bounded deadline. If the deadline passes,
   print the reason to stderr and exit 1.
8. Release the lock on exit.

Never fall back to the focused or default Herdr session.

## Restart after a crash

A startup command runs only when Herdr starts. It does not restart a daemon
that stops while Herdr runs. If the service must survive a crash, run a
supervisor in the pane that restarts the daemon with backoff (see the
coordinator's `superviseService`). Without a supervisor, the operator runs
the `ensure-service` action:

```sh
herdr plugin action invoke ensure-service --plugin <id>
```

## Link and relink

After every manifest change, relink the plugin:

```sh
herdr plugin link <plugin-root>
```

Do not use `--enabled <path>`; Herdr rejects the path. Do not name a zsh
variable `path`: it is tied to `PATH` and breaks the shell. Relink updates
Herdr's copy of the manifest in `~/.config/herdr/plugins.json`. A running
pane keeps its old command until you reopen it.

## Restart a running service safely

1. Ask the user before you restart a live service that other agents use.
2. Identify the service pane and the daemon PID. Check the pane label
   (`herdr pane get <pane>`) and the process (`pgrep -lf <daemon>`). Record
   the PID.
3. Close the pane: `herdr pane close <pane>`. Wait until the recorded PID
   exits (`kill -0 <pid>`).
4. Run the ensure-service script or action.
5. Verify: a new PID, the expected environment (`ps eww -o command= -p <pid>`),
   the daemon's startup log in the pane (`herdr pane read <pane>`), and one
   real request through the socket.

Never kill by pattern. On macOS, `pkill` is BSD: every argument after the
pattern is another pattern.

## Test the start path

- A fake `herdr` on `PATH` checks the script's own logic: the call order, the
  lock, and the no-op path. It cannot catch Herdr's own argument checks.
  After the fake test passes, run the start path once against real Herdr.
- Keep test socket paths under 104 bytes. That is the macOS limit for Unix
  socket paths. Scratchpad paths are longer. Use a path such as
  `/tmp/<name>-$$.sock`. Otherwise the fake daemon never listens, and the
  script waits its full deadline.

## Debug

- If the service pane shows a shell and no daemon runs, close the pane and
  run ensure-service. On 2026-10-07 the blackboard router was found this way;
  the cause is unknown.
- To see what a plugin command printed, run
  `herdr plugin log list --plugin <id>`.
- To see the manifest Herdr uses, check `herdr plugin link` output or
  `~/.config/herdr/plugins.json`.
