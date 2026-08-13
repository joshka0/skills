---
name: agent-vault
description: "Run one command through a named credential-brokering vault without exposing values. Use when a shell or API operation needs an existing Agent Vault service."
---

# Agent Vault

Use Agent Vault for the smallest command that needs a credential. Keep the interactive agent and its general tools outside the proxy. Infisical remains the source of truth.

## Preflight

1. Require `agent-vault-run` on the host. This local launcher owns client authentication. Never inspect its credential source.
2. Select one project or shared vault for the command.
3. Run `agent-vault-run <vault> -- agent-vault vault discover --json`. Read only the vault name, service hosts, and credential key names.
4. Confirm that the required upstream host appears before making an authenticated request.

If the launcher, vault grant, or service is absent, stop. Do not retrieve a client token, open local credential storage, or relaunch the whole agent through the vault.

## Workflow

1. Run only the credential-bearing operation as `agent-vault-run <vault> -- <command>`. Send requests to the real upstream URL.
2. Keep the model TUI, MCP servers, browser bridge, web tools, and unrelated network commands outside that subprocess.
3. Keep application auth headers empty unless the service contract requires a non-secret placeholder. Never invent, copy, or log a credential value.
4. Verify the real operation and its status. Use broker request metadata only when diagnosis needs it.
5. Treat an unmatched-host `403` as an enforced policy boundary for that command. Do not bypass the proxy, change the host, use a second ingress, or create a local credential.
6. Respect `Retry-After` on `429`. On `401`, report an expired or invalid Agent Vault session. On a missing credential or service mapping, report the safe host and key name.

## Handoffs

- Use `herdr` to launch the interactive agent normally and pass safe command-scoped vault instructions in the prompt.
- Use `agent-secret-infrastructure` for vault grants, service mappings, Infisical sync, deployment, or recovery.
- Use `local-dev` when an application process needs named runtime injection rather than a brokered HTTP request.

This deployment does not use Agent Vault proposals as a second secret store. Do not run raw credential-read commands. A new or changed value must go through an approved write-only Infisical publisher, then sync into Agent Vault.

## Output

Report the vault name, upstream host, safe credential key names, request status, and any policy or sync blocker. Never report token, header, proxy credential, or secret values.
