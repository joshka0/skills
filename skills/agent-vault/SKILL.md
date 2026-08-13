---
name: agent-vault
description: "Use brokered credentials without revealing their values. Use when a process already runs through Agent Vault and must call an authenticated external API."
---

# Agent Vault

Use this skill inside an Agent Vault-launched process. Agent Vault is the credential injection plane. Infisical remains the source of truth.

## Preflight

1. Require `AGENT_VAULT_TOKEN`, `AGENT_VAULT_ADDR`, and `AGENT_VAULT_VAULT` in the process environment. Check presence only. Never print their values.
2. Run `agent-vault vault discover --json`. Read only the vault name, service hosts, and credential key names.
3. Confirm that the required upstream host appears in discovery before making an authenticated request.

If the session variables are absent, do not retrieve a client token or open local credential storage. For Herdr work, stop and request a relaunch through the task's named vault.

## Workflow

1. Send the request to the real upstream URL. Let the proxy and CA variables from `agent-vault run` route and authenticate it.
2. Keep application auth headers empty unless the service contract requires a non-secret placeholder. Never invent, copy, or log a credential value.
3. Verify the real operation and its status. Use broker request metadata only when diagnosis needs it.
4. Treat an unmatched-host `403` as an enforced policy boundary. Do not bypass the proxy, change the host, use a second ingress, or create a local credential.
5. Respect `Retry-After` on `429`. On `401`, report an expired or invalid Agent Vault session. On a missing credential or service mapping, report the safe host and key name.

## Handoffs

- Use `herdr` to classify the task and launch an interactive agent through a named vault.
- Use `agent-secret-infrastructure` for vault grants, service mappings, Infisical sync, deployment, or recovery.
- Use `local-dev` when an application process needs named runtime injection rather than a brokered HTTP request.

This deployment does not use Agent Vault proposals as a second secret store. Do not run raw credential-read commands. A new or changed value must go through an approved write-only Infisical publisher, then sync into Agent Vault.

## Output

Report the vault name, upstream host, safe credential key names, request status, and any policy or sync blocker. Never report token, header, proxy credential, or secret values.
