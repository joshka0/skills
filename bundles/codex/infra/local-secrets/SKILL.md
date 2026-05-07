---
name: local-secrets
description: "Handle local secrets on this machine without exposing values. Use when a task needs env vars, API keys, Infisical, Agent Vault, .env files, repo runtime secrets, or secret discovery."
---

# Local Secrets

Use this skill whenever a command, repo, agent, MCP, API client, CI flow, or local dev server needs secrets or environment variables.

Prime directive: do not print, summarize, quote, or expose secret values. Report only paths, key names, counts, hashes, and statuses unless the user explicitly requests a value and the request is appropriate for the current security context.

## Control Plane

Local vault root:

```text
/Users/joshka/.vault
```

Treat everything under this tree as sensitive.

Before touching files under `/Users/joshka/.vault`, read and follow:

```text
/Users/joshka/.vault/AGENTS.md
```

That file is the local vault operating contract and may contain newer
machine-specific rules than this skill.

- Infisical is the source of truth for app/runtime secrets, repo `.env` replacement, local `~/.env`, and migrated file-like secrets.
- Any secret-bearing file kept in `/Users/joshka/.vault` outside Infisical must
  be encrypted at rest. The local file-encryption key lives in Infisical at
  path `/home` as `LOCAL_VAULT_FILE_ENCRYPTION_KEY`.
- Agent Vault is for brokered HTTP access by AI agents. Agents should receive scoped proxy/session access, not raw API keys.
- macOS Keychain is for bootstrap material such as Agent Vault's master password and SSH key passphrases.
- SSH private keys should not be stored in Agent Vault. Prefer passphrases, Keychain, hardware-backed keys, and explicit rotation.
- AWS should prefer SSO/OIDC. Static keys in `~/.aws/credentials` are legacy or temporary until reviewed.

## Infisical

Local Infisical UI:

```text
http://127.0.0.1:18080
```

Umbrella project:

```text
name: home-root
project id: 4cf07c20-ea10-4ecc-ae9d-bc5307cb0241
default env: dev
linked dir: /Users/joshka/.vault/umbrella/home-root
```

Run umbrella Infisical commands from:

```sh
cd /Users/joshka/.vault/umbrella/home-root
```

Runtime pattern for repos:

```sh
infisical run --env dev --path /repos/personal/example -- pnpm dev
```

Export only when a tool requires a file, and write to ignored/generated paths:

```sh
infisical export --env dev --path /repos/personal/example --format dotenv --output-file .env.local
```

Do not use `infisical export` or `infisical secrets` as a discovery mechanism unless output is redirected to a locked file and the user explicitly wants that.

## Discovery

Agents should discover required secret names from code and config, not by dumping vault contents.

Use this order:

1. Identify the command or workflow the user wants to run.
2. Inspect repo files for required environment variable names only.
3. Map names to the repo's Infisical path or to an Agent Vault service.
4. Check whether keys exist without printing values.
5. Run the workflow through Infisical or Agent Vault.
6. If a secret is missing, report the missing key name and expected provider.

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
cat ~/.env
cat ~/.aws/credentials
cat ~/.kube/config
cat ~/.ssh/*
```

Only use those when the user explicitly asks and there is a clear reason. Even then, prefer redacted output.

## Infisical Paths

If a repo has `.infisical.json`, use that project. Otherwise use the umbrella project.

Recommended path mapping:

```text
/Users/joshka/repos/personal/foo -> /repos/personal/foo
/Users/joshka/repos/foxway/foo   -> /repos/foxway/foo
/Users/joshka/repos/mobiles/foo  -> /repos/mobiles/foo
home-level secrets               -> /migration/home or /home
migrated raw files               -> /migration/...
```

Check for a key without printing the value:

```sh
infisical run --env dev --path /repos/personal/example -- sh -lc 'test -n "${OPENAI_API_KEY:-}" && echo OPENAI_API_KEY=present || echo OPENAI_API_KEY=missing'
```

Check multiple keys:

```sh
infisical run --env dev --path /repos/personal/example -- sh -lc '
for key in OPENAI_API_KEY DATABASE_URL SUPABASE_URL; do
  eval "value=\${$key:-}"
  if [ -n "$value" ]; then
    printf "%s=present\n" "$key"
  else
    printf "%s=missing\n" "$key"
  fi
done
'
```

Use `--silent` and redirect output when importing secrets because Infisical CLI may print secret values in tables:

```sh
infisical secrets set --file /path/to/.env \
  --env dev \
  --path /migration/somewhere \
  --domain http://127.0.0.1:18080 \
  --silent >/dev/null 2>/dev/null
```

## Dotenv Imports

When a secret-bearing `.env` lands in a repo, do not inspect values and do not
leave the file in the repo. Promote it with the vault import helper:

```sh
/Users/joshka/.vault/scripts/infisical-import-dotenv.sh \
  /path/to/repo/.env \
  /repos/personal/example \
  dev \
  --move-source-to-vault
```

The helper:

- Imports through Infisical with command output suppressed.
- Verifies key presence with `present/missing` logic only.
- Moves or copies the dotenv file into `/Users/joshka/.vault/staging` as an
  encrypted `.enc` file.
- Writes a redacted report under `/Users/joshka/.vault/imports`.
- Prints only paths, key counts, hashes, and statuses.

If the Infisical path is omitted, the helper infers it from the repo path using
the path mapping below. Use an explicit path when the secret belongs somewhere
more specific than the repo folder.

For a new key in a repo `.env`, report the key name and destination path, then
run the helper. If the key looks misspelled, import it as written to avoid data
loss and call out the suspected typo separately.

## Vault File Encryption

Use these helpers for secret-bearing files that must remain on disk outside
Infisical:

```sh
/Users/joshka/.vault/scripts/vault-encrypt-file.sh /path/to/file /path/to/file.enc --remove-plaintext
/Users/joshka/.vault/scripts/vault-decrypt-file.sh /path/to/file.enc /tmp/file
```

Rules:

- Prefer deleting plaintext once it has been imported into Infisical.
- Keep encrypted vault artifacts under `/Users/joshka/.vault/staging` with mode
  `0600`.
- Decrypt only to a temporary ignored path, use it briefly, then delete it.
- Do not print decrypted content.
- Do not store the encryption key on disk. Load
  `LOCAL_VAULT_FILE_ENCRYPTION_KEY` through Infisical.

## Infisical Backups

The local self-hosted Infisical instance is backed up by:

```text
/Users/joshka/.vault/scripts/backup-infisical-if-changed.sh
```

The launchd job is:

```text
/Users/joshka/Library/LaunchAgents/com.joshka.infisical-backup.plist
```

Operational rules:

- The job runs at 03:00 local time.
- It creates a Postgres dump plus restore metadata, then encrypts the archive.
- It keeps encrypted artifacts under `/Users/joshka/.vault/infisical/backups`.
- It uploads encrypted artifacts to `dev:backups/infisical` when SSH is
  reachable.
- It keeps 7 local encrypted backups and 14 remote encrypted backups by
  default.
- Only sync or upload completed `*.tar.enc` archives and redacted reports.
- Do not sync live Docker volumes, plaintext dumps, plaintext `.env` files, or
  all of `/Users/joshka/.vault`.
- The backup passphrase must be recoverable from the user's password vault and
  must not live only inside Infisical.

## Agent Vault

Use Agent Vault when an agent needs outbound HTTP API access. Do not expose raw keys to the agent.

Expected usage:

```sh
agent-vault server -d
agent-vault vault run --no-mitm -- codex
```

Prefer `--no-mitm` when launching full agents that also start MCP servers. The
transparent MITM mode injects `HTTPS_PROXY`, `NODE_USE_ENV_PROXY`, and CA bundle
variables into the whole child process tree, so MCP clients and stdio MCP
servers inherit them. That can break remote MCP handshakes or route MCP traffic
through Agent Vault unintentionally. Use transparent MITM only for a focused
agent/session that needs brokered outbound HTTPS, or set `AGENT_VAULT_MITM=1`
for the local `av-*` wrappers.

Infer service needs from hostnames and SDKs:

```text
api.openai.com       -> OPENAI_API_KEY
api.anthropic.com    -> ANTHROPIC_API_KEY
api.github.com       -> GITHUB_TOKEN
api.exa.ai           -> EXA_API_KEY
api.tavily.com       -> TAVILY_API_KEY
api.perplexity.ai    -> PERPLEXITY_API_KEY
openrouter.ai        -> OPENROUTER_API_KEY
api.groq.com         -> GROQ_API_KEY
api.cerebras.ai      -> CEREBRAS_API_KEY
```

If a service is unavailable, ask for scoped Agent Vault service approval. Do not ask the user to paste an API key into chat.

## Missing Secret Reports

Use this format:

```text
Missing secret requirements:
- KEY_NAME: needed by <file or command>, expected in Infisical path <path>
- SERVICE_HOST: needed by <SDK/tool>, expected via Agent Vault service <host>
```

## File Hygiene

- Keep `.env.local`, generated dotenv exports, and migration mirrors ignored.
- Never commit secret-bearing files.
- Do not copy secrets from `.vault` into repos unless the user explicitly requests an export and the target path is ignored.
- Prefer `smolvm-local-dev` for risky setup, but do not pass secrets into a VM unless required.
- Prefer `--ssh-agent` for VM git/ssh access instead of copying keys.
