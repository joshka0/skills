---
name: local-dev
description: "Operate local route/worktree topology and secret-safe credential handoffs. Use when configuring Portless, a development proxy, an isolated worktree route, tailnet-reachable endpoints, or named-secret injection."
---

# Local Development

Operate the local topology or credential boundary that a repository cannot infer without live machine evidence.

## Route

Read only the selected reference.

| Mode | Select when | Read |
| --- | --- | --- |
| `topology` | starting or resolving a Portless route, worktree-scoped route, development proxy, tailnet-reachable endpoint, or reachability path | `references/topology.md` |
| `secrets` | handing required credential names to an existing local injector without revealing values | `references/secrets.md` |

Select exactly one mode. Combine them only when a topology operation also needs an authorized named credential.

## Do not use when

- A named injector or Agent Vault tool operation is requested; its provider-specific skill owns exact commands.
- Browser interaction rather than local reachability is requested; `local-http-browser-use` owns the browser operation.
- The request is only generic sandbox selection or project-context writing with no route or secret boundary.

## Workflow

1. Inspect repository conventions, installed tools, configuration, and live status before selecting a mode.
2. Read only the selected reference and keep machine-specific values in live configuration rather than canonical prose.
3. Verify the resulting route, reachability path, or named-credential receipt from its authoritative local source.

## Hard rules

- Do not store, print, summarize, or copy credential values. The `secrets` mode may pass names and inject values only for the user's exact authorized operation.
- Do not freeze hostnames, ports, URLs, or paths in canonical content; discover them from config/status.
- Keep filesystem cleanup within the requested scope and prefer Trash when practical. Preserve unrelated files, uncommitted changes, branches, and Git history.

## Output

Report the selected mode, live source of truth, verified route or safe credential identifiers, operation status, and any stop condition.
