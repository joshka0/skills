---
name: local-procs
description: "Find who owns a local process or port, what runs in your repo, the house launchd daemons, and CPU load. Use before you stop, restart, or start a server, build, or fan-out on this Mac."
---

# Local processes

`scripts/local-procs` reads process metadata only. It never stops anything. From a process environment it reads only `HERDR_*` names.

- `local-procs who <port|pid>...` gives the owner chain and a stop verdict: the Herdr pane and agent, the launchd label, the container, the `kubectl` port-forward, the Portless route, and the repo. A number that has a TCP listener is read as a port.
- `local-procs mine [path]` lists the listeners and the CPU-active processes whose working directory is in the repo. Run it before you start a dev server or a build.
- `local-procs daemons` lists the user launchd jobs with their state, schedule, log, and restart command.
- `local-procs load` shows CPU capacity, current use, and the heaviest command groups, with a verdict for a fan-out.

## Stopping and restarting

- Before you stop a process that you did not start in this run, run `who`. Act only on the `yours` verdict. For any other verdict, follow the verdict or ask the user.
- When you start a background process, record its PID. Stop it with `kill <pid>`. Check that it exited with `kill -0 <pid>`.
- Never kill by pattern. macOS has BSD `pkill`, `pgrep` and `killall`: they have no GNU long options, and every argument after the pattern is another pattern. Before you use a pattern, list its matches with `pgrep -lf`.
- If a port is busy, reuse the server that `who` reports, or start yours on another port. Never stop the other agent's server to free the port.
- Restart a launchd job only with `launchctl kickstart -k gui/$(id -u)/<label>`, and only after the user agrees. Never `unload`, `bootout`, or edit a plist unless the user asks.
- Herdr plugin services restart through their pane: see `herdr-plugin-service`.

## Shared machine

- Many agents share this Mac. Assume that each server, port-forward, and build that you did not start belongs to a live agent, even when its pane looks idle.
- Run one build, render, or test pass per tree at a time. Before you start one, check `mine` for a running one. If another agent changes the same tree, use a worktree (`herdr worktree create`) or wait on its PID.
- Before a parallel CPU fan-out, run `load`. If it reports `busy`, run one job at a time or wait. Bend has its own per-agent cap: see `bend`.
- High CPU from Microsoft Defender (`wdavdaemon`), FortiClient, `sysmond`, or OrbStack is normal. Those processes are managed. Never stop them. The 1-minute load average stays far above the core count on this Mac, so judge capacity by `load`'s CPU-use line.

## Where things run

- OrbStack runs Docker and the `orbstack` Kubernetes context. A port owned by `OrbStack Helper` belongs to a container: `who` names it from `docker ps`.
- Praze services reach the host through long-lived `kubectl --context=orbstack port-forward` processes, started from a Praze checkout. Their logs are in `<checkout>/.port-forwards/logs/`.
- Phoenix apps run as `beam.smp`. Their working directory names the worktree.
- Portless serves named `.localhost:1355` routes. Routes and proxies belong to `local-dev`.
- The browser bridge daemon is `com.joshka.llm-browser-bridge`. Check it with `aux browser`, not here.
