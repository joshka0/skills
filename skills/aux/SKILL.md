---
name: aux
description: "Orient a zero-context agent to the current repository's tools, secret scopes, safe credential names, and launch commands. Use when starting in an unfamiliar workspace or asking what secrets or tools are available."
---

# AUX

Give an agent safe operational context without revealing a credential or requiring prior conversation history.

## Workflow

1. Run `scripts/aux context` from this skill directory. Use `AUX_REPO=<path>` only when the target is not the current directory.
2. Treat the reported repository, primary vault, optional shared vault, services, credential names, and installed-tool status as the live orientation result.
3. Select the credential mode from the result:
   - Use `none` for local work and public requests.
   - Use `agent-vault-command` for an authenticated HTTP command. Run only that command through the reported launcher and vault.
   - Use `infisical-runtime` when an application needs a secret in its environment or a file. Hand off to `local-dev`; Agent Vault proxy mode does not inject application environment variables.
   - Use `control-plane` for vault, service, grant, Infisical policy, or recovery changes. Hand off to `agent-secret-infrastructure`.
4. For a Herdr task, keep the model interactive and unwrapped. Give a separate credential worker the reported vault, host, and one bounded command.
5. Run `scripts/aux secrets` for secret context only or `scripts/aux tools` for tool status only.

## Hard rules

- Report names, scopes, hosts, commands, and status only. Never retrieve or print a credential value.
- One command uses one vault. Do not combine project and shared credentials in one worker.
- Do not infer that a listed credential is usable. Require a matching service for proxy use or an approved runtime injector for application use.
- Do not pass a token, secret value, Infisical identity, or Agent Vault administrator credential through AUX or Herdr.
- Keep employer and personal scopes separate. The Foxway workspace does not inherit the personal `shared` vault.
- Treat a missing mapping, launcher, grant, service, or broker connection as a stop. Do not fall back to `$HOME/.env`.

## Output

Return the detected repository scope, primary and optional vaults, safe services and credential names, installed-tool status, the selected credential mode, exact launch command, and any stop condition.
