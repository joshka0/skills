# Architecture and secret policy

## Recorded baseline

Verify this state before use.

- Infisical runs on the private `vps` host. It is the only secret source of truth.
- Cloudflare R2 stores encrypted Restic backups of Infisical.
- The Mac Agent Vault broker currently runs on loopback. Its `shared` and `skills` vaults read the Infisical development environment.
- The old local Infisical instance stays intact until the VPS deployment and its clients remain stable.
- The `dev` host is an intended Agent Vault client. It must not receive a copied broker database, broker master material, or an Infisical machine credential.
- The secret publisher can describe, create, and edit secrets in approved development paths. It cannot read values or delete secrets.

## Target topology

Use one private Agent Vault broker for Herdr workers on the Mac and `ssh dev`.

```text
Infisical on vps ── encrypted Restic backup ──> private R2 bucket
        │
        └── read by one private Agent Vault broker
                         │
                   Tailscale only
                    ┌────┴────┐
                 Mac Herdr  dev Herdr
```

Prefer a broker on an isolated VPS service or microVM. A broker on the Infisical VPS is acceptable for this small private setup. It isolates secret material from agent hosts, but it does not isolate the broker from the secret server. Use a separate microVM later only if that stronger host boundary is worth the extra operations.

Keep the Mac loopback broker as rollback state until the central broker passes tests from both clients. Do not install a full broker on `dev` while its agents can use Docker or inspect host processes. Install only the client tooling, client configuration, and CA trust there.

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

## Credential rules

- Prefer workload identity and short-lived provider tokens.
- Prefer a GitHub App installation token over a broad personal access token.
- If a PAT is required, create one per trust group. Limit its repositories and permissions.
- Put a credential in `/shared` only when every consumer has the same trust level and needs the same permissions.
- Keep bootstrap credentials outside the system they recover. The R2 token factory can create a new bucket token, but it cannot reproduce a lost Restic password.
- Rotate the upstream credential first. Then update Infisical. Let Agent Vault refresh. Test the proxy. Revoke the old credential last.

## Herdr assignment

Give each worker only the vault needed for its task. Use a project vault for repository work. Use a separate shared-tool vault only for the command that needs the shared service.

The Herdr coordinator can pass a broker endpoint, CA location, vault name, and narrow session to the pane. It must not pass raw provider secrets or Infisical credentials. Keep strict host and service allowlists in the broker. Use the Agent Vault native skills for exact CLI and proxy commands.

## Live discovery

Check these facts before a change:

1. Resolve `ssh vps` and `ssh dev` without copying their configuration into a report.
2. Confirm Tailscale state and the broker listener address.
3. Check the Agent Vault client and server versions.
4. List vault names and grant metadata without showing values.
5. Check the Infisical project, environment, and path attached to each vault.
6. Test one allowed upstream endpoint and one deliberate deny case.
