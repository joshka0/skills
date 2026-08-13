# Backup and restore

## Current Infisical backup design

Verify these names live before use.

- `infisical-backup.timer` starts the backup each night.
- `infisical-backup.service` loads encrypted systemd credentials.
- `/usr/local/sbin/backup-infisical-to-r2` creates the backup.
- `/usr/local/sbin/infisical-restic` provides controlled Restic access.
- The private R2 bucket is the Restic repository.
- Each complete backup batch has three snapshots: `kind:config`, `kind:environment`, and `kind:database`.
- All three snapshots share one `batch:<timestamp>` tag.

Do not paste a multi-line `systemd-run` command into an interactive shell unless each continuation is exact. A broken continuation can omit a credential. Prefer the installed wrapper.

## Backup proof

Use safe metadata only.

1. Check that the timer is active and has a next run.
2. Check the last service exit status and journal.
3. List recent snapshots through `infisical-restic`.
4. Select a batch only when all three required kinds have the exact same batch tag.
5. Run the configured Restic integrity check.
6. Confirm the retention action completed.
7. Record the batch tag and snapshot IDs. Do not record repository credentials.

A successful upload is not a restore proof. Run an isolated restore drill after a material configuration change and on a regular schedule.

## Isolated Infisical restore drill

Do not modify the active VPS or database.

1. Provision a new isolated host or recovery database.
2. Obtain the R2 access key and Restic password from off-host recovery custody.
3. Install the pinned compatible Infisical, PostgreSQL, and Restic versions.
4. Select one complete batch by its exact batch tag.
5. Restore the config and environment snapshots into protected files.
6. Restore the PostgreSQL custom dump into the new database.
7. Start Infisical on a private listener with outbound integrations disabled.
8. Test sign-in, project metadata, secret counts, and one controlled secret retrieval.
9. Connect an isolated Agent Vault instance and test one allowed proxy request plus one deny case.
10. Record the versions, batch tag, checks, and result. Preserve the recovery host until the user approves cleanup.

## Disaster cutover

A restore drill does not authorize a cutover.

1. Stop writes to the failed or old Infisical instance when possible.
2. Restore the newest complete batch to a new private host.
3. Reissue host certificates and update the private service address.
4. Update Agent Vault upstream configuration without copying credentials to clients.
5. Test Mac and `dev` through Agent Vault.
6. Re-enable integrations in controlled groups.
7. Keep the previous host and local Infisical state unchanged until application stability is confirmed.

## Agent Vault recovery gap

The Infisical backup cannot rebuild Agent Vault. Before the broker becomes central, add an encrypted backup or a fully tested bootstrap for:

- broker configuration and service definitions;
- broker database;
- master and CA recovery material;
- vault and service policy;
- user, agent, and grant state;
- audit data when retention requires it.

Back up that state to R2 with a distinct tag and retention policy. Quiesce the broker or use its supported consistent database backup method. Do not copy a live database file while it can change.

## Recovery credential custody

Keep at least two independent recovery paths:

- The Cloudflare token factory in macOS Keychain can mint a replacement bucket token.
- A separate protected off-host copy must retain a valid Restic password or Restic repository key.

Do not store the only Restic recovery password in Infisical or in host-bound systemd credentials on the VPS. Test the off-host copy by opening the repository from an isolated environment without printing the password.

If any R2 key appears in output, history, a prompt, or a log, treat it as exposed. Create a replacement key, update the encrypted service credential, test a backup, revoke the old key, unlock stale Restic locks, and run an integrity check.
