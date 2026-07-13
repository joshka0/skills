---
name: local-dev
description: "Operate local development topology through selected Portless, isolation, proxy, or project-context modes without storing credentials or machine facts. Use when configuring a local dev route, isolated workspace, dev proxy, or durable project context."
---

# Local Development

Select one local-development surface from live configuration; use `local-secrets` for credentials and secret retrieval.

## Route

Read only the selected reference.

| Mode | Select when | Read |
| --- | --- | --- |
| `routes-and-worktrees` | starting or resolving a Portless route or isolated worktree | `references/routes-and-worktrees.md` |
| `isolation` | choosing a disposable or persistent local sandbox | `references/isolation.md` |
| `proxy` | configuring a development proxy or remote-browser reachability | `references/proxy.md` |
| `context` | capturing durable, non-secret repository conventions for future sessions | `references/project-context.md` |

## Workflow

1. Inspect repository conventions, installed tools, and live status before selecting a mode.
2. Use one mode by default; combine only when the user explicitly needs an ordered setup.
3. Verify the resulting route, sandbox, proxy, or context file from its authoritative local source.

## Hard rules

- Keep repositories private by default only when creating a new repository and no existing policy says otherwise.
- Do not store, expose, retrieve, or copy credentials; hand off secret work to `local-secrets`.
- Do not freeze hostnames, ports, URLs, or paths in canonical content; discover them from config/status.
- Do not remove worktrees, sandboxes, proxy routes, or shared state without user confirmation.
- Context mode records only durable project decisions; it never copies raw shell output, credentials, or session troubleshooting.

## Output

Report selected mode, discovered source of truth, changed or verified artifact, safe route/status if applicable, and any stop condition.
