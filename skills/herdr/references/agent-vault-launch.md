# Agent Vault launch

Read this only when a Herdr task may need a secret or authenticated external API.

## Classify before launch

Choose one credential mode before the agent starts:

| Mode | Use when | Launch action |
| --- | --- | --- |
| `none` | Local files, code, public data, or an unauthenticated API are sufficient | Start the model executable normally |
| `agent-vault` | The agent must call an authenticated external HTTP API | Start the model through one named Agent Vault vault |
| `infisical-runtime` | The application or service needs a secret as an environment variable or file | Keep the coding agent unwrapped; inject only into the application process |
| `control-plane` | The task changes Infisical policy, Agent Vault grants, service mappings, identities, or recovery state | Use `agent-secret-infrastructure`; do not give the worker an owner credential |

Default to `none`. Do not wrap every agent. Proxy and CA variables affect the full child process, and vault access must follow the task boundary.

Record only safe launch metadata in the task brief:

```text
credential_mode: agent-vault
agent_vault_vault: <vault>
required_hosts: <host-list>
```

Do not put tokens, secret values, Infisical identities, or broker administrator data in a prompt or Herdr command.

## Preflight

1. Require `agent-vault-run` on the target host. This host-local command owns client authentication and must not print its bootstrap credential.
2. Run `agent-vault-run <vault> -- agent-vault vault discover --json` before the split. Confirm the expected vault and host from safe metadata.
3. Stop if the launcher is missing, the vault is not granted, the broker is unreachable, or the required host is absent. Do not fall back to a raw token or direct request.

One launched process uses one primary vault. If a project task also needs a shared tool, run only that tool command through the shared vault or launch a separate narrowly scoped worker. Do not broaden the project vault.

## Interactive launch

Agent Vault changes only the executable command. Herdr still starts the model interactively, waits for its TUI, and sends the prompt afterward.

```sh
herdr pane run <pane-id> "agent-vault-run <vault> -- codex"
herdr wait agent-status <pane-id> --status idle --timeout 30000
herdr pane run <pane-id> "/rename <task-label>"
herdr pane run <pane-id> "<task-prompt>"
```

Use `claude`, `pi`, `opencode`, or another installed model command in the same position. Never pass the task prompt as an argument to the model executable or to `agent-vault-run`.

If a running agent later discovers a real credential need, stop that task and relaunch it through the selected vault. Do not add a token to the current process environment.

Vault selection is a broker scope and audit boundary. It is not an operating-system sandbox. Use separate host identities or isolated workers when independent revocation or protection from a hostile local process is required.
