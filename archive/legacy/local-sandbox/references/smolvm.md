# smolvm Commands and Lifecycle

## Model

- `smolvm machine run` is **ephemeral**. The VM is created, the command runs,
  and state is discarded.
- `smolvm machine create` + `start` + `exec` is **persistent**. Package
  installs, config edits, and files survive `exec` and `stop`/`start`.
- `/workspace` is the default durable working directory inside a persistent
  machine.
- Networking is opt-in with `--net`. Prefer explicit `--allow-host` or
  `--allow-cidr` when possible.
- `--ssh-agent` forwards the host SSH agent for git/ssh without copying private
  keys into the VM.
- `.smolmachine` artifacts package a machine/workload for fast repeatable
  startup.

## When to Use

- Use a worktree alone for normal repo edits.
- Add smolvm for untrusted scripts, dependency installs, generated artifacts,
  invasive toolchains, reproducible probes, network experiments, or agent
  execution that should not mutate the host.
- Install project dependencies, CLIs, SDKs, package managers, compilers, and
  experimental tools inside a VM by default.
- Use ephemeral `machine run` for quick checks.
- Use persistent named machines for iterative dev state.
- Use foxctl `sandbox smolvm ... --dry-run` plans before spawning agents or
  packaging foxctl workflows.

## Ephemeral Commands

```sh
smolvm machine run --net --image alpine -- echo hello
smolvm machine run --net --image python:3.12-alpine -- python3 script.py
```

## Persistent Dev Machine

```sh
smolvm machine create --net --image alpine dev-name
smolvm machine start --name dev-name
smolvm machine exec --name dev-name -- apk add nodejs npm
smolvm machine exec --name dev-name -it -- /bin/sh
smolvm machine stop --name dev-name
```

## Copy Files Through /workspace

```sh
smolvm machine cp ./script.py dev-name:/workspace/script.py
smolvm machine exec --name dev-name -- python3 /workspace/script.py
smolvm machine cp dev-name:/workspace/results.json ./results.json
```

## SSH Agent Forwarding

```sh
smolvm machine run --ssh-agent --net --image alpine -- ssh-add -l
smolvm machine create dev-name --ssh-agent --net --image alpine
```

## Status and Inventory

```sh
smolvm machine ls --json
smolvm machine status --name dev-name
```

## Naming

Use unique machine names per repo, branch, worktree, task, or agent:

```sh
smolvm machine create --net --image node:22-alpine deeptutor-codex-ui
smolvm machine create --net --image python:3.12-alpine feature-123-py
```

Avoid generic names like `dev`, `myvm`, or `default` in shared agent work.

## Packaging (Snapshots)

Create a reusable packed artifact:

```sh
smolvm pack create --image python:3.12-alpine -o ./python312
smolvm machine create py-dev --from ./python312.smolmachine
smolvm machine start --name py-dev
```

Pack from a stopped persistent machine:

```sh
smolvm machine stop --name py-dev
smolvm pack create --from-vm py-dev -o ./py-dev-packed
```

## Verification

```sh
smolvm --help
smolvm machine ls --json
smolvm machine status --name <name>
```

Report whether the flow used ephemeral execution, a persistent machine, or a
packed artifact.
