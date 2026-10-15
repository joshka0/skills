---
name: infra-kit
description: "Compose app infrastructure from proven Alchemy v2 Layers: R2 storage, Postgres backups, VPS containers, tailnet joins, capped LLM calls. Use when an app needs any of these."
---

# Infra kit

`~/repos/personal/infra-kit` is a bun package of Alchemy v2 Layers (alchemy `2.0.0-beta.83`, effect `4.0.5`). Each piece is an Effect service or resource constructor that owns its infrastructure. Use it as a dependency (`"infra-kit": "file:../infra-kit"` until it has a remote); never copy its code. Proof stacks are in `examples/`, proofs in `e2e/`.

| Import | Piece | Deploy side | Runtime side |
| --- | --- | --- | --- |
| `infra-kit/object-store` | R2 storage | `ObjectStoreBucket` (CORS from origins, per-prefix expiry, multipart abort) | `ObjectStore.layerS3("<PREFIX>")`: put, get, delete, presignPut, presignGet |
| `infra-kit/postgres-backup` | Postgres backups | `PostgresBackupContainer` beside the database | `pg_dump` on a cron to `<BACKUP_PREFIX>/<db>/<UTC>.dump`; retention is the bucket's lifecycle rule |
| `infra-kit/app-host` | App container | `AppContainer`: build on the engine, start, restart, loopback-only ports, healthcheck | none |
| `infra-kit/tailnet` | Tailnet join | `JoinTailnet` action, `installTailscale` cloud-init lines | none |
| `infra-kit/llm` | LLM calls | none | `Llm.layerOpenRouter("<PREFIX>")` with typed errors |
| `infra-kit/alerts` | Alerts | none | `Alerts.layerNtfy("<KEY>")` |

## Credentials

- Mint every credential with `infra-token-factory` (skill of the same name) into Infisical EU, project `92b6f336-b5cb-495b-bc03-845b2d2c81b6`, path `/repos/<owner>/<repo>`.
- R2 for one bucket: `mint cloudflare --r2-bucket <b> --bucket-permission "Workers R2 Storage Bucket Item Write" --r2-s3-secret-prefix <PREFIX>`; also set `<PREFIX>_ENDPOINT` and `<PREFIX>_BUCKET`.
- LLM budget: `mint openrouter --account personal --limit-usd <n> --reset daily` into `<PREFIX>_API_KEY`. A spent limit surfaces as `BudgetExhausted`.
- Tailnet: `mint tailscale --tag tag:agent --with ephemeral --with preauthorized`. `tag:agent` has no access rules yet, so peers do not see the node.
- Hetzner deploys run under `infra-token-factory exec hetzner --project <env> -- infisical run … -- alchemy deploy`.

## Alchemy rules (beta.83, verified)

- Alchemy writes props, `Redacted` included, to state in plain text. Pass secrets to containers through `envFile`, never props.
- Docker `--env-file` keeps quotes. Write it from `infisical export --format json | jq -r '.[] | "\(.key)=\(.value)"'`, mode 600, at a stable path: a new path replaces the container. Delete it after deploy.
- A Docker `Container` starts only with `start: true` (`AppContainer` sets it).
- A healthcheck array loses its quoting; `AppContainer` takes one shell string.
- The shared VPS context is `Docker.Context` named `infra-kit-vps` (`host=ssh://vps`). Two stacks that declare it adopt it, and destroying one deletes it for both.
- Run the project-local `node_modules/.bin/alchemy`. `alchemy dev` and deploys need `@effect/platform-bun` and `@effect/platform-node` at the same effect version.

## Proofs

- A new piece ships with an `examples/<piece>` stack and an `e2e/<piece>` proof that a separate agent writes from a spec, run against real infrastructure.
- Name proof resources `infra-kit-proof-*`; on the shared VPS touch no other container.
