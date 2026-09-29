---
name: agent-vault
description: "Run one credential-bearing command through a named Agent Vault, and pick the credential mode for a task. Use when a command or API call needs a secret."
---

# Agent Vault

Infisical is the source of truth. Agent Vault injects credentials into one subprocess. It is not a secret store.

## Credential modes

Pick one mode before you launch the task. The default is `none`.

| Mode | When | Action |
| --- | --- | --- |
| `none` | Local files, public data, unauthenticated APIs | Run normally |
| `agent-vault-command` | A command calls an authenticated external HTTP API | Wrap only that command: `agent-vault-run <vault> -- <command>` |
| `infisical-runtime` | An app needs a secret in its env or a file | `local-dev`. Proxy mode does not inject env vars. |
| `control-plane` | Grants, service mappings, identities, Infisical policy, recovery | `agent-secret-infrastructure` |

## Run a command

1. Require `agent-vault-run` on the host. It owns client auth. Never inspect its credential source.
2. Reuse the current `aux` result when it already shows the vault. Otherwise discover once per task: `agent-vault-run <vault> -- agent-vault vault discover --json`. Read only the vault name, service hosts, and key names.
3. Confirm the upstream host is mapped. If the launcher, grant, service, or broker is missing, stop that command and continue steps that need no credential. Never fall back to a raw token, `$HOME/.env`, or a direct request.
4. `agent-vault-run <vault> -- <command>` with the real upstream URL. Leave auth headers empty unless the service needs a non-secret placeholder.

## Credential worker (Herdr)

- Use a separate labeled pane, `credential-worker-<vault>`. Launch its model normally, then send a brief with the role, vault, required hosts, one bounded operation, allowed scope, and this return rule: "status, safe IDs, and artifact paths only; never credential values".
- One vault per command and per worker. Project and shared services get two workers. Never merge shared credentials into a project vault.
- Never launch the model TUI through Agent Vault. Only a user request for full-session egress control allows that, and it needs a tested passthrough allowlist.
- Claude: the worker must be a separate Herdr pane. `claude agents`, `--bg`, and `/background` share a supervisor and are not a credential boundary. Before you change this, test the installed version live.
- A vault and a pane are an audit and scope boundary, not an OS sandbox. Hard isolation needs a separate host identity.

## Behavior facts

- A service mapping authorizes injection. It does not deny unmatched hosts: they pass through uninjected unless the vault has strict unmatched-host deny. Verify it live before you claim a network boundary.
- A strict-deny `403` is the boundary. Do not route around it.
- `429`: respect `Retry-After`. `401`: the Agent Vault session expired. A missing mapping: report the safe host and key name.
- There are no Agent Vault proposals and no raw credential reads. A new value goes through the write-only Infisical publisher and then syncs (`agent-secret-infrastructure`).
