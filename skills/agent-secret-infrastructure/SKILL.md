---
name: agent-secret-infrastructure
description: "Control plane for the private Infisical + Agent Vault deployment: topology, identities, secret publishing, backups, and recovery. Use when checking, changing, recovering, or explaining it."
---

# Agent secret infrastructure

Everything below is a recorded baseline. Before you change, diagnose, or recover, verify it live. To explain it, state the baseline and say it was not checked live. Ordinary proxied calls go to `agent-vault`. One-key imports and Keychain handoffs go to `local-dev`. Cloudflare tokens and R2 changes go to `cloudflare-operations`.

## Baseline

- Infisical runs on `ssh vps` and is the only source of truth. The old local Infisical stays intact until the VPS and its clients prove stable.
- One Agent Vault broker runs on `vps` as a system service, bound only to the Tailnet address. The `shared` and `skills` vaults read the Infisical dev environment. Check sync status before use.
- Clients: the Mac central launcher, and a client-only install on `ssh dev`. Identities: Mac `local-codex`, dev `dev-herdr`. Both have no instance access and only `proxy` grants for `shared` and `skills`.
- The old Mac loopback broker is preserved but not a rollback: its sync expired and its DB is malformed. Do not repair or remove it until the user picks a recovery action.
- Encrypted Restic backups of both services go to a private R2 bucket (details: `references/backup-and-restore.md`).
- No write-only publisher is verified as installed. Secret create/update stops until `infisical-secret-publish` exists and passes its capability checks.

```text
Infisical (vps) ──┐
                  ├─ Restic ─> private R2
Agent Vault (vps) ┘
      │ Tailscale only
  Mac clients · dev clients
```

## Topology rules

- A client host never gets a broker DB, broker master material, or an Infisical machine credential.
- Never run a broker on a host whose agents can inspect its process, container, or DB (for example `dev`, which has Docker). On `dev`, install only the client, config, encrypted client token, and CA trust.
- Keep the management and proxy ports private in the Tailnet policy, granted only to the required clients.
- The shared VPS isolates broker material from agents, not Agent Vault from Infisical. A separate microVM is the stronger option.
- Use one identity per host or stable Herdr trust group. Use per-worker identities only when independent revocation or attribution is needed. Rotate the retained identity after a host split.

## Infisical boundaries

- Projects are product/trust boundaries: narrow `home-root` to personal shared tooling and bootstrap. Herdr gets a `herdr` project. Each product with its own runtime or deploy identity gets its own project. Employer or customer secrets go in a separate project, ideally a separate org.
- Environments: `dev`, `staging`, `prod`. Paths: `/shared/vendors/<provider>`, `/shared/tooling/<tool>`, `/repos/<owner>/<repo>`, `/services/<service>`.
- Secret Imports compose folders within one project. Across projects, prefer a scoped credential per project, or expose one shared credential through a narrow shared vault. Never copy the value.

## Publish or rotate a secret

`infisical-secret-publish` is required. It must take the value on stdin, allow only approved project/env/path/key, write one value, return metadata only, and have no read, delete, or admin rights. If it is missing or unproven, stop. Never use `infisical secrets set KEY=value`, a dotenv import, Agent Vault proposals, or a temp file.

1. Confirm the exact project, env, path, key, and action are authorized, and that the path fits the boundaries above.
2. Publish via stdin. Check only the result metadata.
3. Wait for the Agent Vault sync status `ok` (discover the poll interval live).
4. Run `agent-vault vault discover --json` through the vault. Test one allowed request and one deliberate deny.
5. A new host, header, or service rule is a separate policy change done by a human admin. A sync never creates a mapping.

Rotation order: new upstream credential, publish, sync, test the consumer, revoke the old one last. Stop before revoke if the test fails.

Agents may publish, wait for sync, and test. They never get Infisical read/delete/identity-admin or Agent Vault policy-admin rights.

## Credential policy

- Prefer workload identity and short-lived tokens. Prefer a GitHub App installation token over a PAT. If a PAT is needed, use one per trust group with minimal repos and permissions.
- `/shared` only when every consumer has the same trust level and needs the same permissions.
- Keep bootstrap credentials outside the system they recover. The R2 token factory can mint a bucket token, but it cannot recover a lost Restic password.

## Rules

- Stop for approval before: a host move, broker centralization, identity redesign, project split, restore cutover, or destructive rotation.
- Secrets travel only by stdin, a protected file, or an encrypted systemd credential. Never in the repo, argv, prompts, logs, or reports.
- Never expose the broker publicly. Never restore into the live DB as a test.
- An Infisical backup does not contain broker state. Back up Agent Vault separately.
- Live checks before you change, diagnose, or recover: resolve `ssh vps`/`ssh dev`, Tailscale state, broker listener, client/server versions, vault names and grants, each vault's Infisical binding, one mapped and one unmatched request (record pass-through or deny), and backup timers with the newest snapshot.
