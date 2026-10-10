---
name: agent-vault
description: "Use credentials without reading them: Herdr agent panes run through the shared Agent Vault proxy; wrap other commands. Use when a command or API call needs a secret."
---

# Agent Vault

Infisical is the source of truth. The Agent Vault proxy adds a mapped key to requests for its host. The agent never sees the value. It is not a secret store.

## Credential modes

| Mode | When | Action |
| --- | --- | --- |
| `proxy` | A command calls a mapped external HTTP API | Inside a proxied Herdr agent pane, run it normally. Elsewhere, wrap it: `agent-vault-run shared -- <command>` |
| `infisical-runtime` | An app or install script reads a secret from its env or a file | `local-dev`. The proxy does not inject env vars. |
| `control-plane` | Mappings, grants, identities, Infisical policy, recovery | `agent-secret-infrastructure` |

## Herdr agent panes

- Launch every agent pane with `av-agent <agent>` (`~/.local/bin`, linked to `scripts/av-agent`) from the repo directory (`herdr`, "Split, label, launch"). It uses the vault named in the nearest `agent-vault.json` up to the git root, else `shared`, and refuses droid, grok, and devin on Foxway vaults. The model API, MCP servers, git, and package registries pass through. Mapped hosts get their key.
- A pane shows that it is proxied when `HTTPS_PROXY` is set. Check presence only. The env also holds `AGENT_VAULT_TOKEN`: never print the env.
- Never use the `shared` proxy for Foxway work. Foxway credentials are not in the broker.

## Use a key

1. Discover once per task: `agent-vault vault discover --json` inside a proxied pane, or wrapped elsewhere. Read only the vault name, service hosts, and key names.
2. Call the real upstream URL. Leave auth headers empty unless the service needs a non-secret placeholder.
3. If the host is not mapped, report the host and the key name it needs. Continue steps that need no credential. Never fall back to a raw token, `$HOME/.env`, or a direct request.

## Project vaults

- A repo gets its own vault only when it holds its own keys for a catalog service. Otherwise it uses `shared`: no `agent-vault.json`.
- Onboard or refresh a repo: `scripts/av-project /repos/<owner>/<repo> --repo-dir <dir> --admin-home <admin HOME>`. Run `--dry-run` first. The user supplies the admin session (`agent-vault auth login` into a temporary HOME); revoke it afterwards.
- `av-project` names the vault `<owner>-<repo>-dev`, publishes references into `/repos/<owner>/<repo>/agent-vault` (a project key wins unless it equals the shared value), grants `local-codex` and `dev-herdr`, adds the services, sets passthrough, syncs, and writes `agent-vault.json`.
- A new service goes into `references/services.json` first: hosts, auth style, canonical key, shared reference, and the project key names to look for.

## Behavior facts

- `shared` passes unmatched hosts through uninjected (policy `passthrough`). A vault with `unmatched_host_policy=deny` answers `403` for unmapped hosts; do not route around it.
- Through `shared`, a mapped `api.github.com/user` returns 200 (401 without the proxy); httpbin gets no `Authorization` header; Claude Code, its stdio MCP servers, git, and npm work.
- `429`: respect `Retry-After`. `401` from the broker: the agent token expired.
- An agent can write or update a key value only through the write-only Infisical publisher (`agent-secret-infrastructure`). It never reads a value. A mapping (host to key) is an admin change.
- A vault and a pane are an audit and scope boundary, not an OS sandbox.
