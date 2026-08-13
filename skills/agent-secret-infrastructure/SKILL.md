---
name: agent-secret-infrastructure
description: Operate the private Infisical and Agent Vault deployment, including multi-host access, R2 recovery, and Herdr vault assignment. Use when checking, recovering, extending, or explaining this secret infrastructure.
---

# Agent Secret Infrastructure

Use this skill as the control-plane runbook. Treat all recorded host state as a baseline to verify, not as permanent truth.

## Ownership

| Concern | Owner |
| --- | --- |
| Secret source of truth and access policy | Infisical |
| Agent-safe credential injection | Agent Vault broker |
| One-secret create or update from this Mac | `local-dev` with its secrets reference |
| Agent Vault commands and HTTP proxy behavior | `agent-vault-cli` or `agent-vault-http` |
| Cloudflare token creation and R2 changes | `cloudflare-operations` |
| Private topology, project boundaries, Herdr vault assignment, and recovery | This skill |

Do not use this skill for an ordinary proxied API call. Use the Agent Vault skill for that service. Do not use it for a one-key import or Keychain handoff. Use `local-dev` with its secrets reference.

## Load references

- Read [references/architecture-and-policy.md](references/architecture-and-policy.md) for every task.
- Also read [references/backup-and-restore.md](references/backup-and-restore.md) for backup, recovery, key rotation, or host replacement.

## Workflow

1. Discover the live state. Check the `vps` and `dev` SSH aliases, Tailscale reachability, service status, installed client versions, and listener addresses. Do not infer state from this document.
2. Classify the request. Read-only checks and a requested secret write can proceed. Stop before a host move, broker centralization, identity redesign, project split, restore cutover, or destructive rotation unless the user approved that change.
3. Keep Infisical authoritative. Use a human administrator for policy changes. Use the write-only publisher for routine secret create or update work. Never give that publisher secret-read or delete rights.
4. Keep agents behind Agent Vault. A Herdr worker receives a broker address, CA trust, vault name, and narrow Agent Vault session or token. It does not receive an Infisical machine identity.
5. Assign one primary vault for each task. Add a separate shared-tool session only when the task needs it. Do not merge broad shared credentials into every project vault.
6. Verify through behavior. Confirm that an allowed proxied request works and that a denied host, path, or service stays denied. Never print the injected value.
7. For recovery work, follow the batch and restore gates in the recovery reference. Preserve the old host and local state until the replacement passes application checks.
8. Report only safe metadata: project, environment, path, key name, identity name, vault name, service state, snapshot ID, and test result.

## Hard rules

- Never put a secret value, private key, bearer token, or secret-bearing URL in this repository, a prompt, a command argument, a log, or a report.
- Pass secret values through standard input, a protected credential file, or an encrypted systemd credential.
- Bind the broker to loopback or the private Tailnet. Never expose it to the public Internet.
- Do not run the broker on an agent-controlled host when that agent can inspect the broker process, container, database, or master material.
- Treat a database dump, environment file, and service configuration with one batch tag as one Infisical recovery point.
- Never restore into the live database as a test. Use a new host, database, or isolated recovery stack.
- Back up Agent Vault state separately. An Infisical backup does not contain broker users, sessions, grants, audit data, CA material, or the broker database.
- Keep one off-host recovery copy of the Restic password. Host-bound systemd credentials alone cannot recover a lost VPS.
