---
name: local-dev
description: "Operate local topology and secret-safe handoffs through route, isolation, proxy, context, or credential-injection modes. Use when configuring a local route, sandbox, dev proxy, project context, or local secret handoff."
---

# Local Development

Select one local-development surface from live configuration without exposing credentials or freezing machine facts.

## Route

Read only the selected reference.

| Mode | Select when | Read |
| --- | --- | --- |
| `routes-and-worktrees` | starting or resolving a Portless route or isolated worktree | `references/routes-and-worktrees.md` |
| `isolation` | choosing a disposable or persistent local sandbox | `references/isolation.md` |
| `proxy` | configuring a development proxy or remote-browser reachability | `references/proxy.md` |
| `context` | capturing durable, non-secret repository conventions for future sessions | `references/project-context.md` |
| `secrets` | handing required credential names to an existing local injector without revealing values | `references/secrets.md` |

## Workflow

1. Inspect repository conventions, installed tools, and live status before selecting a mode.
2. Use one mode by default; combine only when the user explicitly needs an ordered setup.
3. Verify the resulting route, sandbox, proxy, or context file from its authoritative local source.

## Hard rules

- Keep repositories private by default only when creating a new repository and no existing policy says otherwise.
- Do not store, print, summarize, or copy credential values. The `secrets` mode may pass names and inject values only for the user's exact authorized operation.
- Do not freeze hostnames, ports, URLs, or paths in canonical content; discover them from config/status.
- Move filesystem cleanup targets to Trash with `/usr/bin/trash <path>`; never permanently delete them. Confirmation does not authorize destructive Git or a cleanup command that bypasses Trash.
- Context mode records only durable project decisions; it never copies raw shell output, credentials, or session troubleshooting.

## Output

Report selected mode, discovered source of truth, changed or verified artifact, safe route/status if applicable, and any stop condition.
