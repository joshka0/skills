# Secret ownership and handoff

Scope: the boundary between a secret source, Infisical, macOS Keychain, and a consumer. When a provider skill or Agent Vault owns the operation, hand it off.

## Lookup order

1. Repo `.infisical.json`: project binding and default env.
2. Repo code, examples, and commands: required key names and the exact `/repos/...` path. Names only.
3. `$HOME/.vault/AGENTS.md` if present: machine-local import, cache, and encryption procedures.
4. Infisical: the exact repo folder, its Secret Imports, and the canonical shared owner. Never use recursive lookup as the default.
5. `$HOME/.env` and repo dotenv files are migration inputs only. Read one authorized key at a time. Never dump a file or env.

## Infisical layout

Infisical Cloud EU (`https://eu.infisical.com`), project `home-root` (`92b6f336-b5cb-495b-bc03-845b2d2c81b6`). Environments: `dev` (local and agents), `staging`, `prod`. The same folder path and key names repeat in each environment.

| Secret | Canonical path |
| --- | --- |
| Low-risk keys every repo gets (LLM and search APIs) | `/shared/common`, imported into every `dev:/repos/*` folder |
| Vendor credential with real reach | `/shared/vendors/<vendor>` |
| Cross-project tool credential | `/shared/tooling/<tool>` |
| Repo-specific credential and imports | `/repos/<scope>/<repo>` |

- Name a key as its consumer reads it. A vendor key uses the vendor's own name (`OPENAI_API_KEY`).
- Store a shared value once. Add a Secret Import in each consumer repo folder. When an app reads a shared value under its own name, store a secret reference (`${dev.shared.common.OPENAI_API_KEY}`), not a copy.
- Never use recursive injection as inheritance.
- A direct repo secret shadows an imported one with the same key. Check direct keys before you call a shared rotation done. If the values differ, stop and classify it: separate identity, intentional override, or stale copy. Remove a stale direct secret only after the import works and with explicit authorization.
- `prod` is a naming guard only: the free plan cannot limit an identity to one environment. Use `--env prod` only for a deploy or release step.

## CLI and API gotchas

- The CLI keeps one profile per login; `infisical user switch` picks the active one, and `infisical user get token` returns only the active profile's token. The EU profile must be active.
- Foxway secrets are in the same project under `/repos/foxway`, with Foxway tooling under `/repos/foxway/tooling/<tool>`. No personal repo imports a Foxway folder, and no Foxway folder imports `/shared`.
- `isec` signs in with the `agent-secret-publisher` identity: Keychain `infisical-agent-publisher-client-{id,secret}` (account `agent-secret-publisher`, Developer). Agents never read it directly.
- The `isec` boundary is a convention, not a permission: your CLI login and the publisher identity can read every folder.
- Infisical Cloud sits behind Cloudflare, which rejects the default Python `urllib` user agent (error 1010). Send a `User-Agent` header from scripts.
- The CLI has no command for Secret Imports. Use the REST API (`/api/v1/secret-imports`), with `infisical user get token --plain` kept out of output.
- Publish a value with `isec set <KEY>` (or `infisical-secret-publish <path> <KEY>`) on stdin. `infisical secrets set --file` can leave a secret that a direct read sees but an import does not carry.
- Verify an import on the server: `GET /api/v3/secrets/raw?...&include_imports=true` must list the key under the imported path. Then run the consumer from its repo path.
- Never print `~/.infisical/infisical-config.json`. It holds `vaultBackendPassphrase`, which a key-name filter for "token" or "secret" misses.

## Keychain issuers

Long-lived local bootstrap/issuer credentials live in Keychain. The scoped runtime tokens they mint live in Infisical. Never copy an issuer into Infisical or dotenv. Verify each provider's current issuer mechanism in its docs:

- Cloudflare and PlanetScale: `infra-token-factory` mints scoped tokens. Hetzner: it runs one approved command.
- GitHub: a GitHub App mints installation tokens. A PAT is not the default issuer.
- Azure DevOps: PAT lifecycle calls need an Entra user or on-behalf-of token. A PAT is a runtime credential, not an issuer. Prefer Entra auth.
- GitLab: prefer group/project access tokens and their rotation. Keep a broad PAT in Keychain only when the API requires it.
- Never assume that one PAT can create another.

## Mutation flow

1. Get authorization for the exact source key, destination path, import, or issuer action.
2. Stream only that key into Infisical. Values never go in argv, temp files, output, logs, history, or agent messages.
3. Add or verify the imports for the named consumer folders.
4. Verify presence and an exact value match inside an injected process. Report the key name and match status only.
5. Verify the real consumer from its exact path. A root or recursive lookup proves nothing.
6. Resolve a shadowing direct secret only after the import works. Stop before any unapproved revoke, rotation, overwrite, or removal.
7. Last step, after the final Infisical command: check `$HOME/.infisical/secrets-backup` by file count, and follow the local vault policy for any plaintext cache.

If no safe injector exists, stop and propose a placeholder (`<token>`, `SERVICE_TOKEN`). Never create a plaintext store.
