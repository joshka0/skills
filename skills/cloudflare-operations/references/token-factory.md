# Token factory

## Broker

- `cloudflare-token-mint` (on `PATH`) owns the one host-wide bootstrap in Keychain: service `com.joshka.cloudflare-token-factory`, account `bootstrap`. Never use or recreate `com.tryshepr.cloudflare-token-factory`.
- Preflight: `cloudflare-token-mint --check-keychain` (needs local user auth; reports presence only). Stop if the broker is missing, the check fails, or the old service still exists. Never read the Keychain from a shell.
- Every mint needs device-owner approval. Agents never get Keychain read access or a plaintext child.
- New bootstrap value in an authorized temp env file: move it into Keychain without printing it, verify it in memory, trash only that entry, and confirm it is gone.

```text
cloudflare-token-mint --name <token-name> --zone <zone> \
  --account-id <id> --zone-id <id> \
  --account-permission <name> [--account-permission ...] \
  --zone-permission <name> [--zone-permission ...] \
  --infisical-project <id> --infisical-env <env> \
  --infisical-path <path> --infisical-secret CLOUDFLARE_<CAPABILITY>_API_TOKEN
```

Before approval, show the token name, account and zone labels, permission names, and Infisical destination. The broker creates the token, verifies it, writes it to Infisical via stdin, and revokes the child if verification or storage fails. Then test each intended product endpoint by status code, never by printing bodies. The broker needs an authenticated Infisical CLI. Stop if the destination is ambiguous or the CLI asks for login.

## Decide whether to mint

Test the existing named child against the exact endpoints first. Mint only when no approved secret exists, the scope is wrong, or isolation is needed. Never widen an unrelated child. Before you conclude a scope is missing, rule out bad auth, the wrong ownership class, the wrong resource scope, and unavailable product state.

## Ownership gotchas

| Child | Bootstrap needs | Endpoints |
| --- | --- | --- |
| Account-owned (default) | Account API Tokens Write on that account | account token endpoints |
| User-owned (only on explicit request) | the "Create Additional Tokens" template | user token endpoints |

- The custom-token builder has no User API Tokens Write. A custom token sent to a user endpoint fails with `Valid user-level authentication not found`, whatever its account permissions.
- An account token can show `Invalid API Token` or `401` at the user verify endpoint even when creation succeeded. Verify through the matching family, and revoke through it too.
- Use the account-scoped permission-group API. The user listing can `403` for an active token.
- Alchemy and the Terraform provider ship permission-group catalogs. Trust them only after you check the installed version. Never freeze permission IDs in prose.
- Adding unrelated permissions never fixes an ownership mismatch.

Email Routing child (resolve the current names): Account Email Routing Addresses Write; Zone Email Routing Rules Write, Zone Settings Write, DNS Write. Scope it to one account and one zone.

| Evidence | Cause |
| --- | --- |
| User-token create `403`, asks for user-level auth | Account/custom factory sent to the user endpoint |
| Child verifies, but product calls `403` | Wrong permission group or resource scope |
| Vault write fails after create | Revoke the child and report that it was not retained |
