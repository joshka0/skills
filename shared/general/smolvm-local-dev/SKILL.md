---
name: smolvm-local-dev
description: "Use smolvm microVMs for isolated local development, agent sandboxes, network-constrained probes, and packaged dev environments. Use with local-dev when a task needs stronger isolation than a worktree, disposable execution, persistent VM state, or foxctl smolvm planning."
---

# smolvm Local Dev

Use this skill when local development should be isolated from the host checkout, host tools, global package managers, local ports, or other agents. Pair it with `local-dev` for worktrees, `portless`, GitLab defaults, and local service naming.

Prefer isolation whenever practical. If a task installs packages, bootstraps a new toolchain, runs unfamiliar scripts, changes global caches, pulls images, executes generated code, or needs broad network access, do it inside smolvm instead of directly on the host machine unless there is a clear reason not to.

## Model

- `smolvm machine run` is ephemeral. The VM is created, the command runs, and state is discarded.
- `smolvm machine create` plus `start` plus `exec` is persistent. Package installs, config edits, and files survive `exec` and `stop`/`start`.
- `/workspace` is the default durable working directory inside a persistent machine.
- Networking is opt-in with `--net`. Prefer explicit `--allow-host` or `--allow-cidr` when possible.
- `--ssh-agent` forwards the host SSH agent for git/ssh without copying private keys into the VM.
- `.smolmachine` artifacts package a machine/workload for fast repeatable startup.

## When To Use

- Use a worktree alone for normal repo edits.
- Add smolvm for untrusted scripts, dependency installs, generated artifacts, invasive toolchains, reproducible probes, network experiments, or agent execution that should not mutate the host.
- Install project dependencies, CLIs, SDKs, package managers, compilers, and experimental tools inside a VM by default.
- Run `npm install`, `pnpm install`, `pip install`, `cargo install`, `brew` alternatives, curl-piped installers, and one-off setup scripts in smolvm unless host installation is explicitly required.
- Use ephemeral `machine run` for quick checks.
- Use persistent named machines for iterative dev state.
- Use foxctl `sandbox smolvm ... --dry-run` plans before spawning agents or packaging foxctl workflows.

## Commands

Ephemeral command:

```sh
smolvm machine run --net --image alpine -- echo hello
smolvm machine run --net --image python:3.12-alpine -- python3 script.py
```

Persistent dev machine:

```sh
smolvm machine create --net --image alpine dev-name
smolvm machine start --name dev-name
smolvm machine exec --name dev-name -- apk add nodejs npm
smolvm machine exec --name dev-name -it -- /bin/sh
smolvm machine stop --name dev-name
```

Copy files through `/workspace`:

```sh
smolvm machine cp ./script.py dev-name:/workspace/script.py
smolvm machine exec --name dev-name -- python3 /workspace/script.py
smolvm machine cp dev-name:/workspace/results.json ./results.json
```

SSH agent forwarding:

```sh
smolvm machine run --ssh-agent --net --image alpine -- ssh-add -l
smolvm machine create dev-name --ssh-agent --net --image alpine
```

Status and inventory:

```sh
smolvm machine ls --json
smolvm machine status --name dev-name
```

Do not delete or prune machines without user confirmation:

```sh
smolvm machine stop --name dev-name
smolvm machine delete dev-name
```

## Naming

Use unique machine names per repo, branch, worktree, task, or agent:

```sh
smolvm machine create --net --image node:22-alpine deeptutor-codex-ui
smolvm machine create --net --image python:3.12-alpine feature-123-py
```

Avoid generic names like `dev`, `myvm`, or `default` in shared agent work. They collide and make cleanup unsafe.

## Portless And Local Services

`portless` remains the host-facing URL layer. smolvm isolates the process environment.

- If a service runs on the host, wrap it directly with `portless`.
- If a service runs inside smolvm, expose it through a smolvm port mapping, then use `portless alias` or a named host wrapper for the host-facing URL.
- Use unique portless names just like unique VM names.
- Do not assume a port-free URL. In high-port proxy mode, use `PORTLESS_URL`, `portless get <name>`, or the emitted URL.

Example shape:

```sh
smolvm machine create --net --image node:22-alpine deeptutor-ui
smolvm machine start --name deeptutor-ui
smolvm machine exec --name deeptutor-ui -- sh -lc "cd /workspace && npm run dev -- --host 0.0.0.0"
portless alias deeptutor-ui 5173
portless get deeptutor-ui
```

Verify actual smolvm port mapping behavior for the repo before documenting the final URL.

## Foxctl Plans

Prefer foxctl plan commands when the goal is a foxctl-managed agent sandbox or packaged foxctl artifact:

```sh
foxctl sandbox smolvm run-agent-plan --repo "$PWD" --prompt "..." --dry-run
foxctl sandbox smolvm package-plan --image alpine --output ./sandbox
foxctl sandbox smolvm probe-lmstudio --base-url http://127.0.0.1:1234 --outbound-localhost-only
```

Use plan output to inspect argv, env, mounts, repo mode, network policy, and output paths before running anything mutable.

For guest agents:

- Mount repos read-only by default unless the task requires writes.
- Use `--repo-mode writable` only for deliberate guest edits.
- Use `--out` for guest outputs instead of writing into arbitrary host paths.
- Use `--local-llm-only` or `--outbound-localhost-only` when probing local model endpoints.

## Packaging

Create a reusable packed artifact when startup speed or repeatability matters:

```sh
smolvm pack create --image python:3.12-alpine -o ./python312
smolvm machine create py-dev --from ./python312.smolmachine
smolvm machine start --name py-dev
```

Pack from a stopped persistent machine only when the current VM state is intentionally part of the artifact:

```sh
smolvm machine stop --name py-dev
smolvm pack create --from-vm py-dev -o ./py-dev-packed
```

## Safety

- Read-only inspection commands like `machine ls` and `machine status` should not stop running VMs.
- `machine prune` requires stopped VMs. Do not prune shared state casually.
- Treat the host as the protected control plane. Avoid installing or mutating host-level tools when a smolvm machine can contain the change.
- Do not pass host secrets into a VM unless the task requires it.
- Prefer `--ssh-agent` over copying keys.
- Keep host mounts narrow. Mount the current worktree or a task-specific output directory, not broad home directories.
- Do not run `machine delete`, `prune`, or broad cleanup commands without user confirmation.

## Verification

After setup or changes:

```sh
smolvm --help
smolvm machine ls --json
smolvm machine status --name <name>
portless list
```

Report whether the flow used ephemeral execution, a persistent machine, or a packed artifact, and note any host-facing `portless` URL separately from guest-internal ports.
