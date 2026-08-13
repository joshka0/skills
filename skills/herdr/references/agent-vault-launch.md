# Agent Vault launch

Read this only when a Herdr task may need a secret or authenticated external API.

## Classify before launch

Choose one credential mode before sending the task prompt:

| Mode | Use when | Launch action |
| --- | --- | --- |
| `none` | Local files, code, public data, or an unauthenticated API are sufficient | Start the model executable normally |
| `agent-vault-command` | One or more commands must call an authenticated external HTTP API | Start the model normally; wrap each credential-bearing command through one named vault |
| `infisical-runtime` | The application or service needs a secret as an environment variable or file | Keep the coding agent unwrapped; inject only into the application process |
| `control-plane` | The task changes Infisical policy, Agent Vault grants, service mappings, identities, or recovery state | Use `agent-secret-infrastructure`; do not give the worker an owner credential |

Default to `none`. Do not wrap the model TUI. A command-scoped wrapper leaves the model, MCP servers, browser bridge, and unrelated tools on their normal network paths.

Record only safe launch metadata in the task brief:

```text
credential_mode: agent-vault-command
agent_vault_vault: <vault>
required_hosts: <host-list>
```

Do not put tokens, secret values, Infisical identities, or broker administrator data in a prompt or Herdr command.

## Preflight

1. Require `agent-vault-run` on the target host. This host-local command owns client authentication and must not print its bootstrap credential.
2. Run `agent-vault-run <vault> -- agent-vault vault discover --json` before the split. Confirm the expected vault and host from safe metadata.
3. Stop if the launcher is missing, the vault is not granted, the broker is unreachable, or the required host is absent. Do not fall back to a raw token or direct request.

One command uses one vault. Use a separate credential worker for each project or shared vault. Do not merge broad shared credentials into a project vault.

## Dedicated credential worker

Create a sibling Herdr pane labeled `credential-worker-<vault>`. Launch its model normally, wait for the TUI, rename the session, and then send a bounded brief:

```text
Role: credential worker
Vault: <vault>
Required hosts: <host-list>
Operation: <one bounded external operation>
Allowed scope: <safe project or resource identifiers>
Return: status, safe identifiers, and artifact paths only
Never return credential, header, token, or secret values.
```

The worker runs only the external operation as `agent-vault-run <vault> -- <command>`. It returns the verified result to the coordinating agent and then becomes eligible for normal Herdr cleanup.

Use one worker per vault. If a task needs project and shared services, use two workers or two sequential worker tasks. This separation makes the audit trail and task scope clear. It is an operating convention, not an OS access boundary.

### Claude constraint

**Pack constraint — Herdr owner:** a Claude credential worker must be a separate Herdr pane. Do not use `claude agents`, `--bg`, or `/background` as the credential boundary. Claude background agents run under a shared supervisor, and shell launcher or environment inheritance is not a stable boundary across versions.

Before changing this constraint, inspect the installed Claude version and current official enterprise network documentation. Require a live test that the worker uses the intended launcher, keeps the model and local tools outside its proxy subprocess, and returns no secret value.

## Interactive launch

Herdr starts the model normally, waits for its TUI, and sends the prompt afterward.

```sh
herdr pane run <pane-id> "codex"
herdr wait agent-status <pane-id> --status idle --timeout 30000
herdr pane run <pane-id> "/rename <task-label>"
herdr pane run <pane-id> "<task-prompt and safe command-scoped vault instruction>"
```

Use `claude`, `pi`, `opencode`, or another installed model command in the same position. Never pass the task prompt as an argument to the model executable or to `agent-vault-run`.

The worker runs an approved operation as `agent-vault-run <vault> -- <command>`. The wrapper injects proxy state only into that subprocess. It does not add a token to the model environment.

Do not launch the full model through Agent Vault unless the user explicitly requests full-session egress control. That separate design needs a tested passthrough allowlist for the model and every required remote tool.

Vault selection is a broker scope and audit boundary. It is not an operating-system sandbox. Use separate host identities or isolated workers when independent revocation or protection from a hostile local process is required.
