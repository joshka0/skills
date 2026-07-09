# Local Secrets

Prime directive: do not print, summarize, quote, or expose secret values. Report
only paths, key names, counts, hashes, and statuses unless the user explicitly
requests a value and the request is appropriate for the current security context.

## Control Plane

Local vault root: `/Users/joshka/.vault`

Before touching files under `/Users/joshka/.vault`, read `/Users/joshka/.vault/AGENTS.md`.

- Infisical is the source of truth for app/runtime secrets, repo `.env` replacement, local `~/.env`, and migrated file-like secrets.
- Any secret-bearing file kept in `/Users/joshka/.vault` outside Infisical must be encrypted at rest. The local file-encryption key lives in Infisical at path `/home` as `LOCAL_VAULT_FILE_ENCRYPTION_KEY`.
- Agent Vault is for brokered HTTP access by AI agents. Agents should receive scoped proxy/session access, not raw API keys.
- macOS Keychain is for bootstrap material such as Agent Vault's master password and SSH key passphrases.
- SSH private keys should not be stored in Agent Vault. Prefer passphrases, Keychain, hardware-backed keys, and explicit rotation.
- AWS should prefer SSO/OIDC. Static keys in `~/.aws/credentials` are legacy or temporary until reviewed.

## Infisical

Local Infisical UI: `http://127.0.0.1:18080`

Umbrella project:

```text
name: home-root
project id: 4cf07c20-ea10-4ecc-ae9d-bc5307cb0241
default env: dev
linked dir: /Users/joshka/.vault/umbrella/home-root
```

Runtime pattern for repos:

```sh
infisical run --env dev --path /repos/personal/example -- pnpm dev
```

Export only when a tool requires a file, and write to ignored/generated paths:

```sh
infisical export --env dev --path /repos/personal/example --format dotenv --output-file .env.local
```

## Discovery

Agents should discover required secret names from code and config, not by
dumping vault contents.

Good discovery commands:

```sh
rg -n "process\\.env\\.|Deno\\.env|getenv\\(|System\\.getenv|ENV\\[|import\\.meta\\.env|VITE_|NEXT_PUBLIC_|EXPO_PUBLIC_" .
rg -n "OPENAI_API_KEY|ANTHROPIC_API_KEY|GITHUB_TOKEN|SUPABASE|TURSO|DATABASE_URL|AWS_|KUBECONFIG" .
find . -maxdepth 3 \( -name '.env.example' -o -name '.env.template' -o -name '.env.sample' -o -name '.envrc' \) -print
```

Do not run commands that print values:

```sh
env
printenv
infisical secrets --output dotenv
infisical export
cat .env
```

Only use those when the user explicitly asks and there is a clear reason.

## Infisical Paths

If a repo has `.infisical.json`, use that project. Otherwise use the umbrella
project.

Recommended path mapping:

```text
/Users/joshka/repos/personal/foo -> /repos/personal/foo
/Users/joshka/repos/foxway/foo   -> /repos/foxway/foo
/Users/joshka/repos/mobiles/foo  -> /repos/mobiles/foo
home-level secrets               -> /migration/home or /home
migrated raw files               -> /migration/...
```

## Dotenv Imports

When a secret-bearing `.env` lands in a repo, promote it with the vault import
helper:

```sh
/Users/joshka/.vault/scripts/infisical-import-dotenv.sh \
  /path/to/repo/.env \
  /repos/personal/example \
  dev \
  --move-source-to-vault
```

## Agent Vault

Use Agent Vault when an agent needs outbound HTTP API access. Do not expose raw
keys to the agent.

```sh
agent-vault server -d
agent-vault vault run --no-mitm -- codex
```

Prefer `--no-mitm` when launching full agents that also start MCP servers.

## File Hygiene

- Keep `.env.local`, generated dotenv exports, and migration mirrors ignored.
- Never commit secret-bearing files.
- Do not copy secrets from `.vault` into repos unless the user explicitly
  requests an export and the target path is ignored.
- Prefer `smolvm-local-dev` for risky setup, but do not pass secrets into a VM
  unless required.
- Prefer `--ssh-agent` for VM git/ssh access instead of copying keys.
