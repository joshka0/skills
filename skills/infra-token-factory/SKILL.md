---
name: infra-token-factory
description: "Get a Touch ID-approved credential: scoped Cloudflare, PlanetScale, Fly, Tailscale, or capped OpenRouter keys, or a gated Hetzner/Fly command. Use when an agent needs infra access."
---

# Infra token factory

`infra-token-factory` (on `PATH`) holds parent credentials in the login Keychain. An agent runs it; the user approves each request with Touch ID. Agents never read the Keychain or see a parent. Source and full flag list: `~/repos/personal/infra-token-factory` (`README.md`).

| Provider | Command | Result |
| --- | --- | --- |
| Cloudflare | `mint cloudflare` / `revoke cloudflare` | Account-owned child token in Infisical |
| PlanetScale | `mint planetscale` / `revoke planetscale` | Child service token: `<prefix>_SERVICE_TOKEN_ID` and `<prefix>_SERVICE_TOKEN` in Infisical |
| Hetzner Cloud | `exec hetzner --project <env> -- <command>` | One command runs with `HCLOUD_TOKEN`, an admin token for that environment |
| Fly.io | `mint fly`; `exec fly --org <org> -- <command>` | App-scoped child (30 days or less, not revocable alone) in Infisical; or one command with the org token in `FLY_API_TOKEN` |
| Tailscale | `mint tailscale` / `revoke tailscale` | Tagged auth key (90 days or less) in Infisical |
| OpenRouter | `mint openrouter` / `revoke openrouter` | API key with a USD credit limit and reset, in Infisical |

## Run it

- Run on the user's Mac, outside a sandbox that blocks Keychain or LocalAuthentication. Run in the background or with a timeout of 10 minutes or more, and tell the user a Touch ID prompt waits.
- Preflight: `infra-token-factory check <provider> [--org <org> | --project <env> | --tailnet <label>]`. It reports presence and API reachability only.
- Missing parent: the user runs `infra-token-factory import <provider> ...` in their own terminal. Never pipe a secret into it.
- After an install, the first use of each Keychain item asks for the login password: the user clicks **Always Allow**.
- `--expires-in` is required. Agent task tokens: `7d` or less. `never` only on the user's request.
- Revoke leaves the Infisical secrets. Delete or overwrite them through `local-dev`.
- The mint needs an authenticated Infisical CLI. Stop if the destination is ambiguous or the CLI asks for login.

## Self-service flow

1. Test an existing named child against the exact endpoints. Mint only when none exists, its scope is wrong, or isolation is needed. Never widen an unrelated child.
2. Pick the smallest scope. Cloudflare buckets: `Workers R2 Storage Write`. PlanetScale branches: `create_branch`, `connect_branch`, `create_deploy_request` on one database.
3. Mint into the project's Infisical path.
4. Use the child through Agent Vault or as the deploy env var (`CLOUDFLARE_API_TOKEN`, `PLANETSCALE_SERVICE_TOKEN_ID` and `PLANETSCALE_SERVICE_TOKEN`).
5. Declare lasting resources in the repo's Alchemy stack, so they are reviewed and torn down with it.
6. Test each intended endpoint by status code. Never print bodies.

- Fly: `mint fly` attenuates the org token to one existing app; the rest of the org is read-only. Keep `--expires-in` short: a child cannot be revoked alone. `--org` is the slug (`personal`), not the display name. Creating an app needs `exec fly`, which hands the command the org token.
- Tailscale: a key must carry tags the OAuth client owns. Prefer `--with ephemeral --with preauthorized` for short-lived machines.
- Hetzner tokens cannot be minted. `exec hetzner` and `exec fly` hand the command a parent: show the user the exact command, and never pass a command that prints or stores `HCLOUD_TOKEN` or `FLY_API_TOKEN`.
- CI (GitLab): mint the CI child into Infisical. The pipeline reads it through an Infisical OIDC machine identity.
- R2 for one bucket: `--r2-bucket <bucket> --bucket-permission "Workers R2 Storage Bucket Item Write" --r2-s3-secret-prefix <PREFIX>`. The factory stores `<PREFIX>_ACCESS_KEY_ID` and `<PREFIX>_SECRET_ACCESS_KEY`; never derive them yourself.
- A PlanetScale service token cannot approve a deploy request it created. Never grant `approve_deploy_request` or production deletes by default.

## Cloudflare gotchas

- Account-owned is the default. User-owned needs the "Create Additional Tokens" template; a custom token sent to a user endpoint fails with `Valid user-level authentication not found`.
- Verify and revoke an account token through the account endpoints. The user verify endpoint can answer `401` for a good account token.
- Permission names resolve live from the account-scoped listing. Never freeze permission IDs in prose.
- Child verifies but product calls `403`: wrong permission group or resource scope. Adding unrelated permissions never fixes an ownership mismatch.
- Never use or recreate `com.tryshepr.cloudflare-token-factory`.

## Never

- Print, copy, or persist a parent or child credential or a secret-bearing URL.
- Give Terraform or Alchemy a token-write credential, or use Alchemy `AccountApiToken`. Alchemy then holds a second parent and keeps the child in state.
- Read the Keychain from a shell, or move a parent anywhere except Keychain.
- Continue past an interactive login, MFA, or a credential prompt. Name the exact user action.
