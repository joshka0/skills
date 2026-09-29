---
name: aux
description: "Orient a zero-context agent: repository scope, vaults, credential names, installed tools, and visible-browser readiness. Use in an unfamiliar workspace or before visible-browser work."
---

# AUX

`aux [context|secrets|tools|browser]` (`scripts/aux`) prints names and status only. It never reads a value. Use `AUX_REPO=<path>` to target another repo. Do not `cd` into this skill directory.

- Its output (repo, primary vault, optional shared vault, services, credential names, tool status) is the live orientation result. Choose the credential mode from it (modes: `agent-vault`).
- Visible browser: run `aux browser`. On a remote target, run it first, right after the minimum SSH check. On `ready`, use the reported `browser-bridge` client with `local-http-browser-use`. Any other result stops work that needs the visible or logged-in browser: report it with its one-line reason, and do not inspect processes, ports, config, or bridge internals unless the user asks. Never fall back to hidden or headless browsing for that work. Continue steps that need no browser. A task that needs only public content may use another fetch tool.
- A stop about a repo mapping, vault, or grant matters only for steps that need a credential. If the task needs none, say so in one line and continue. Never create a mapping or grant just to clear the stop.
- A listed credential is not proof that it is usable. Proxy use needs a matching service; app use needs an approved injector.
- Keep the Foxway scope separate: it does not inherit the personal `shared` vault.
- Do not re-run AUX or re-discover vaults when the current result or context already answers the question.
- Repeated AUX friction goes to `wiki` (it owns the recurrence threshold).
