# Architecture and secret policy

## Recorded baseline

Verify this state before use.

- Infisical runs on the private `vps` host. It is the only secret source of truth.
- One Agent Vault broker runs as a dedicated system service on `vps`. It binds only to the Tailnet address.
- The central `shared` and `skills` vaults read the Infisical development environment. Verify their latest sync status before use.
- The Mac central launcher and the client-only installation on `ssh dev` both pass one allowed GitHub request and one unmatched-host deny test.
- The original Mac loopback broker and files stay preserved. Its current Infisical sync is expired, and its logs report a malformed database. It is not a verified rollback. Do not remove or repair it until the central path remains stable and the user selects a recovery action.
- Cloudflare R2 stores encrypted Restic backups of Infisical and Agent Vault. Each Agent Vault backup includes an isolated restore and SQLite integrity check.
- The old local Infisical instance stays intact until the VPS deployment and its clients remain stable.
- Client hosts must not receive a copied broker database, broker master material, or an Infisical machine credential.
- The Mac uses the scoped `local-codex` identity. The `dev` host uses the scoped `dev-herdr` identity. Both have no instance access and only `proxy` grants for `shared` and `skills`.
- The secret publisher can describe, create, and edit secrets in approved development paths. It cannot read values or delete secrets.

## Live topology

Use the central broker for Herdr workers on the Mac and `ssh dev`.

```text
Infisical on vps ───┐
                  ├── encrypted Restic backups ──> private R2 bucket
Agent Vault on vps ─┘
        │
  Tailscale only
   ┌────┴────┐
Mac clients  dev clients
```

The shared VPS isolates broker material from agent-controlled hosts. It does not isolate Agent Vault from Infisical. Use a separate microVM later only when that stronger host boundary is worth the extra operations.

Keep management and proxy ports private in the Tailnet policy. Grant only the required client hosts and both Agent Vault TCP ports. Do not install a full broker on `dev` while its agents can use Docker or inspect host processes. Install only the client tooling, client configuration, encrypted client token, and CA trust there.

The migration snapshot and central R2 backup are the current recovery evidence. Do not call the running Mac broker a rollback until it has a separate integrity and proxy test.

## Infisical project boundaries

Use a project as a product and trust boundary. Do not make one project for every repository. Do not keep all products in `home-root`.

| Boundary | Project guidance |
| --- | --- |
| Personal shared agent tooling and migration bootstrap | Keep `home-root`, but narrow its purpose |
| Herdr control plane and integrations | Create a `herdr` project |
| A product with its own runtime, deploy identity, or production access | Create one project for that product |
| Several repositories with the same operators and deploy boundary | One project can contain their paths |
| Employer or customer secrets | Use a separate project; prefer a separate organization |

Use environments for lifecycle separation: `dev`, `staging`, and `prod`. Use paths for scope inside one project:

```text
/shared/vendors/<provider>
/shared/tooling/<tool>
/repos/<owner>/<repository>
/services/<service>
```

Infisical Secret Imports compose folders inside one project. They do not replace a cross-project trust decision. For cross-project use, prefer a separate scoped credential for each project. If one credential must stay shared, expose it through a narrow Agent Vault shared vault instead of copying its value into every project.

## Secret create and update flow

Agent Vault is the injection plane. It is not the write path.

1. Use the write-only Infisical publisher to create or update one approved secret key.
2. Keep the project, environment, and path as narrow as the consumer boundary.
3. Wait for the related Agent Vault store to report a successful sync. Discover the configured poll interval live.
4. Test one request through the service mapping without printing the value.
5. If a new key needs a new host, header, or service rule, require a separate Agent Vault policy change. A successful secret sync does not create that mapping.

Agents can perform steps 1, 3, and 4 when their task authorizes the write. They must not receive Infisical read, delete, identity-administration, or Agent Vault policy-administration rights.

## Credential rules

- Prefer workload identity and short-lived provider tokens.
- Prefer a GitHub App installation token over a broad personal access token.
- If a PAT is required, create one per trust group. Limit its repositories and permissions.
- Put a credential in `/shared` only when every consumer has the same trust level and needs the same permissions.
- Keep bootstrap credentials outside the system they recover. The R2 token factory can create a new bucket token, but it cannot reproduce a lost Restic password.
- Rotate the upstream credential first. Then update Infisical. Let Agent Vault refresh. Test the proxy. Revoke the old credential last.

## Herdr assignment

Give each worker only the vault needed for its task. Use a project vault for repository work. Use a separate shared-tool vault only for the command that needs the shared service.

Create a distinct Agent Vault identity per host or stable Herdr trust group. Use separate identities per worker only when independent revocation or audit attribution is required. Rotate the retained identity after a host split so copied migration tokens become invalid.

The Herdr coordinator can pass a broker endpoint, CA location, vault name, and narrow session to the pane. It must not pass raw provider secrets or Infisical credentials. Keep strict host and service allowlists in the broker. Use the Agent Vault native skills for exact CLI and proxy commands.

## Live discovery

Check these facts before a change:

1. Resolve `ssh vps` and `ssh dev` without copying their configuration into a report.
2. Confirm Tailscale state and the broker listener address.
3. Check the Agent Vault client and server versions.
4. List vault names and grant metadata without showing values.
5. Check the Infisical project, environment, and path attached to each vault.
6. Test one allowed upstream endpoint and one deliberate deny case.
7. Check both backup timers and the newest complete snapshot metadata.
