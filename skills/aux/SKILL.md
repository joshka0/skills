---
name: aux
description: "Orient a zero-context agent to repository secrets, tools, and visible-browser bridge readiness. Use when starting in an unfamiliar workspace or before visible-browser automation."
---

# AUX

Give an agent safe operational context without revealing a credential or requiring prior conversation history.

## Workflow

1. Run `aux` from the target repository. Use `AUX_REPO=<path> aux` only when the target is not the current directory. Do not change into this skill directory before discovery.
2. Treat the reported repository, primary vault, optional shared vault, services, credential names, and installed-tool status as the live orientation result.
3. Select the credential mode from the result:
   - Use `none` for local work and public requests.
   - Use `agent-vault-command` for an authenticated HTTP command. Run only that command through the reported launcher and vault.
   - Use `infisical-runtime` when an application needs a secret in its environment or a file. Hand off to `local-dev`; Agent Vault proxy mode does not inject application environment variables.
   - Use `control-plane` for vault, service, grant, Infisical policy, or recovery changes. Hand off to `agent-secret-infrastructure`.
4. For a Herdr task, keep the model interactive and unwrapped. Give a separate credential worker the reported vault, host, and one bounded command.
5. For visible browser work, run `aux browser`. On a remote target, make it the first target command after the minimum connection check. Require `ready` status, then use the reported `browser-bridge` client with `local-http-browser-use`; do not retrieve or export its token.
6. Run `aux secrets` only when tool status is irrelevant. Run `aux tools` only when secret context is irrelevant.
7. If the same AUX-owned friction repeats, hand it to `wiki` after the main task reaches a safe checkpoint. The wiki skill owns the recurrence threshold, deduplication, and request format.

## Hard rules

- Report names, scopes, hosts, commands, and status only. Never retrieve or print a credential value.
- One command uses one vault. Do not combine project and shared credentials in one worker.
- Do not infer that a listed credential is usable. Require a matching service for proxy use or an approved runtime injector for application use.
- A service mapping proves where Agent Vault may inject a credential. It does not prove that unmatched hosts are denied. Treat unmatched-host policy as unknown until a safe behavior test or control-plane check proves it.
- Do not pass a token, secret value, Infisical identity, or Agent Vault administrator credential through AUX or Herdr.
- Keep employer and personal scopes separate. The Foxway workspace does not inherit the personal `shared` vault.
- Treat a missing mapping, launcher, grant, service, or broker connection as a stop. Do not fall back to `$HOME/.env`.
- Treat a browser controller without a connected visible-browser extension as a terminal stop. Report the AUX result without inspecting browser processes, desktop sessions, services, ports, configuration, or bridge internals unless the user asks for diagnosis. Do not use a hidden or headless browser fallback.
- Do not repeat vault discovery or search local memory when the current AUX result already answers the task.

## Output

Return the detected repository scope, primary and optional vaults, safe services and credential names, installed-tool status, verified browser controller and extension status, the selected credential mode, exact client command, and any stop condition.
