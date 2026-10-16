---
name: local-dev
description: "Local routes (Portless, dev proxies, worktree routes, tailnet publishing) and secret ownership (Infisical imports, Keychain issuers, named-secret injection). Use for any of these."
---

# Local development

Secret ownership and injection: `references/secrets.md`.

## Secrets with `isec`

Use `isec` for every Infisical read, run, import, and publish. It finds the repo folder from the Git root (also in Herdr worktrees), signs in with a machine identity, and prints names only.

- `isec run -- <cmd>`: run with the folder's secrets and imports. `--env prod` only for a deploy or release step.
- `isec ls [path]`, `isec where <KEY>`: key names, imports, owners.
- `isec need <KEY>`: import a `/shared/` owner folder into this repo folder. Never copy a value instead.
- `isec set <KEY> [--env staging|prod]` reads the value from stdin; without `--env` it writes `dev`.
- Foxway secrets live under `/repos/foxway` (repos, and `tooling/jira`, `tooling/azure-devops`). Only an agent working under `~/repos/foxway` may read or write them, and that agent uses only `/repos/foxway`. Never pass a `/repos/foxway` path from elsewhere; `isec` refuses both directions.
- Never use `infisical run` directly: its result depends on the active CLI profile.

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

## POC apps on the VPS

- `ssh vps` logs in as `admin` (sudo, docker). `ssh vps-dev` is the plain `dev` user that Hermes runs as; it has no sudo or docker.
- A POC app's database goes in the shared Postgres, never a new Postgres service: container `shared-pg` (pgvector, Postgres 17). Compose apps join the external network `shared-pg` and use host `shared-pg`; k3s pods use `10.42.0.1:5432`.
- Per app: one login role and one database with the app's name. Make them with infra-kit `AppDatabase` (`infra-kit` skill), never by hand. The role password stays in the app's Infisical `prod` folder; the superuser password is in `prod:/shared/tooling/shared-pg`. For SQL by hand, pass passwords to `psql` through the container environment and `\getenv`, never argv.
- Moving an existing database: dump, restore with `--no-owner --role=<app>`, compare exact row counts per table, repoint only the host, keep the old server stopped for 7 days.
- The `vps-infra` repo (`~/repos/personal/vps-infra`) owns `shared-pg`'s nightly backup to R2. To back up a new database, add it to `databases` in its `stages.json` and run `./deploy.sh prod deploy`.
- Observability is Maple Local on the VPS, owned by `vps-infra` (`maple/README.md`, section **Sender contract**). Send OTLP/HTTP to `http://100.103.21.53:4318` over the tailnet, with batches of 200 or fewer, and set `service.namespace` to the app name. Each sending host needs a Tailscale ACL grant to `tcp:4318`. Maple has no auth, so never send secrets or personal data in telemetry. Never deploy a separate Maple, Prometheus or Grafana for a POC.

