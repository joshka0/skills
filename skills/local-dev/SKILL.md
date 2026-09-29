---
name: local-dev
description: "Local routes (Portless, dev proxies, worktree routes, tailnet publishing) and secret ownership (Infisical imports, Keychain issuers, named-secret injection). Use for any of these."
---

# Local development

Secret ownership and injection: `references/secrets.md`.

## Routes and proxies

- Use the URL that the running tool or its status command prints. Never guess a hostname, port, or service name.
- Concurrent worktrees get distinct task-derived route names. Inspect an existing registration before you replace it. Stop if its owner is unclear.
- Do not publish an internal service, change trust settings, or store access values without explicit authorization.
- Browser interaction belongs to `local-http-browser-use`. This skill covers only reachability.

## Tailnet publishing

- `.localhost` routes are loopback-only on every device, so they cannot cross machines. Keep the local proxy and tailnet naming side by side. Do not chain them.
- Surfaces, cheapest first (confirm support in the CLI help): a path prefix on the node hostname, a distinct port, or a named service with its own virtual address (needs tenant-side setup, so verify it exists).
- Tailnet-only and public publishing are different verbs. Never use public publishing for a tailnet reachability problem, and never enable it without explicit authorization.
- Read the live serve config first. Every existing mount belongs to someone. Add a mount; never reset or replace one. If a path is taken, pick another.
- Bind the backend to loopback. Binding all interfaces also exposes it to the LAN.
- Prefix trap: the proxy usually strips the prefix (verify it). A page with relative assets must load from a path that ends in `/`. Without the slash, relative URLs resolve one level up and silently half-load. The proxy answers both spellings. Fix it with a path-normalizing guard that runs before subresources load, not a hard-coded base URL.
- Verify from the tailnet name, not loopback: the document, one asset, and one API path through the prefix; the no-slash spelling; existing mounts unchanged; a real browser load with no failed subresources. Report the URL the tool printed and the exact command that removes only your mount.
