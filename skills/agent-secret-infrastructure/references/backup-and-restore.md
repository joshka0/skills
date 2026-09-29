# Backup and restore

Before you run a backup or restore, verify every name live.

## Infisical backup

- `infisical-backup.timer` runs nightly. `infisical-backup.service` loads encrypted systemd credentials and runs `/usr/local/sbin/backup-infisical-to-r2`.
- Use `/usr/local/sbin/infisical-restic` for all Restic access. Do not paste multi-line `systemd-run` commands: a broken continuation drops a credential.
- One recovery point is three snapshots (`kind:config`, `kind:environment`, `kind:database`) that share one `batch:<timestamp>` tag. Use only a batch with all three kinds.
- Proof: the timer is active with a next run, the last service exit and journal are clean, the snapshots are listed, the Restic check passes, and retention ran. Record the batch tag and snapshot IDs. An upload is not a restore proof.

## Agent Vault backup

- `agent-vault-backup.timer` starts `agent-vault-backup.service`, which runs `/usr/local/sbin/backup-agent-vault-to-r2` with the same Restic wrapper and lock.
- It aborts if any Infisical-backed vault's sync is not `ok`. It uses a SQLite online backup, never a copy of the live file.
- One snapshot holds the broker DB, encrypted CA state, launcher, backup script, and units. Tags: `agent-vault`, `batch:<ts>`, `kind:broker-state`. Host: `agent-vault-vps`.
- It restores to an isolated directory and requires SQLite `integrity_check` = `ok`. Retention is 7 daily, 5 weekly, and 12 monthly, followed by a Restic check.
- Host-bound systemd credentials in the backup are unusable elsewhere. Recovery needs off-host copies of the Agent Vault master password, the Infisical machine identity, R2 access, and the Restic password.

## Recovery custody

- The Cloudflare token factory (Keychain) can mint a replacement R2 token.
- The Restic password has a Keychain copy under service `agent-secret-infrastructure-restic-password`. Verify it before an incident.
- The Agent Vault master and Infisical machine credentials also need named off-host Keychain items. Verify them without printing values.
- Never keep the only recovery password in Infisical or in VPS systemd credentials.
- If an R2 key leaks: create a replacement, update the service credential, test a backup, revoke the old key, unlock stale Restic locks, and run a check.

## Restore drills (never touch the live host or DB)

Agent Vault: use an isolated Tailnet host. Get R2 and Restic from off-host custody. Restore an `agent-vault-vps` snapshot with all three tags to staging. Run the SQLite integrity check. Install the recorded version, a dedicated user, and files with the recorded modes. Recreate the systemd creds via stdin. Bind to the isolated Tailnet address. Require health, sync `ok`, one allowed request, and one deny. Record the snapshot, version, and results.

Infisical: use a new host or DB. Install the pinned Infisical, Postgres, and Restic. Restore one complete batch: config and env to protected files, and the custom dump into the new DB. Start on a private listener with integrations disabled. Test sign-in, project metadata, secret counts, and one controlled retrieval. Connect an isolated Agent Vault and test one allow and one deny. Keep the recovery host until the user approves cleanup.

## Disaster cutover (a drill never authorizes one)

Stop writes to the old instance. Restore the newest complete batch to a new private host. Reissue certificates and update the service address. Update the Agent Vault upstream without copying creds to clients. Test the Mac and `dev`. Re-enable integrations in groups. Keep the old host until the apps prove stable.
