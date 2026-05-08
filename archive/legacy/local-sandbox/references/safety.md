# Safety Rules

## Network Isolation

- Networking is opt-in with `--net`. Prefer explicit `--allow-host` or
  `--allow-cidr` when possible.
- Use `--local-llm-only` or `--outbound-localhost-only` when probing local model
  endpoints.

## Secret Handling

- Do not pass host secrets into a VM unless the task requires it.
- Prefer `--ssh-agent` over copying keys into the VM.
- Keep host mounts narrow — mount the current worktree or a task-specific output
  directory, not broad home directories.

## Cleanup

- Do not run `machine delete`, `prune`, or broad cleanup commands without user
  confirmation.
- `machine prune` requires stopped VMs. Do not prune shared state casually.
- Read-only inspection commands like `machine ls` and `machine status` should
  not stop running VMs.

## Host Protection

- Treat the host as the protected control plane. Avoid installing or mutating
  host-level tools when a smolvm machine can contain the change.
- For guest agents: mount repos read-only by default unless the task requires
  writes.
- Use `--repo-mode writable` only for deliberate guest edits.
- Use `--out` for guest outputs instead of writing into arbitrary host paths.

## Foxctl Plans

Prefer foxctl plan commands when the goal is a foxctl-managed agent sandbox or
packaged foxctl artifact:

```sh
foxctl sandbox smolvm run-agent-plan --repo "$PWD" --prompt "..." --dry-run
foxctl sandbox smolvm package-plan --image alpine --output ./sandbox
foxctl sandbox smolvm probe-lmstudio --base-url http://127.0.0.1:1234 --outbound-localhost-only
```

Use plan output to inspect argv, env, mounts, repo mode, network policy, and
output paths before running anything mutable.
