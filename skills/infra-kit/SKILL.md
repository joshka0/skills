---
name: infra-kit
description: "Compose app infrastructure from proven Alchemy v2 Layers: R2, Postgres databases and backups, VPS containers, public ingress, tailnet joins, LLM calls, app auth. Use when an app needs any of these."
---

# Infra kit

`~/repos/personal/infra-kit` is a bun package of Alchemy v2 Layers (alchemy `2.0.0-beta.83`, effect `4.0.5`). Each piece is an Effect service or resource constructor that owns its infrastructure. Use it as a dependency (`"infra-kit": "file:../infra-kit"` until it has a remote); never copy its code. Proof stacks are in `examples/`, proofs in `e2e/`.

| Import | Piece | Deploy side | Runtime side |
| --- | --- | --- | --- |
| `infra-kit/object-store` | R2 storage | `ObjectStoreBucket` (CORS from origins, per-prefix expiry, multipart abort) | `ObjectStore.layerS3("<PREFIX>")`: put, get, delete, presignPut, presignGet |
| `infra-kit/postgres-backup` | Postgres backups | `PostgresBackupContainer` beside the database server | `pg_dump` of each database in `PGDATABASES` (comma list) on a cron to `<BACKUP_PREFIX>/<db>/<UTC>.dump`; one failure alerts and the rest still run; retention is the bucket's lifecycle rule |
| `infra-kit/database` | App database on shared Postgres | `AppDatabase({ context, database, role?, passwordVar, onDestroy? })`: login role and database on `shared-pg`, no `CONNECT` for `PUBLIC`; the server gets only a SCRAM verifier and state holds no secret; adopts an existing pair when the role owns the database and is not a superuser; destroy keeps the data and sets `NOLOGIN` unless `onDestroy: "drop"`; add `providers()` beside `Docker.providers()` (ADR 0001) | `Database.layerPg("<PREFIX>")`: `@effect/sql-pg` client from `<PREFIX>_HOST`, `_PORT` (5432), `_NAME`, `_USER`, `_PASSWORD` |
| `infra-kit/app-host` | App container | `VpsContext("<name>")`: the shared VPS Docker engine (logical ID `Vps`); `AppContainer`: build on the engine, start, restart, loopback-only ports, healthcheck, `volumes` (named volume or host path; Alchemy beta.83 has no memory limit) | none |
| `infra-kit/ingress` | Public HTTPS through a Cloudflare Tunnel | `PublicApp({ context, name, network, hostname, zoneId, service: { host, port } })`: tunnel (token never in state), one ingress rule then `http_status:404`, proxied CNAME, hardened `cloudflared` on the app network; add `providers()` beside `Cloudflare.providers()` and `Docker.providers()`. Deploy token: account `Cloudflare Tunnel Write`; on one zone, `DNS Write` and `Zone Read` | none |
| `infra-kit/tailnet` | Tailnet join | `JoinTailnet` action, `installTailscale` cloud-init lines | none |
| `infra-kit/llm` | LLM calls | none | `Llm.layerOpenRouter("<PREFIX>")` with typed errors |
| `infra-kit/alerts` | Alerts | none | `Alerts.layerNtfy("<KEY>")` |
| `infra-kit/telemetry` | Telemetry to Maple Local | `Telemetry.containerEnv({ serviceName, namespace, endpoint })`: `OTEL_*` for a stock-SDK container's `environment` | `Telemetry.layerMaple({ serviceName, namespace })`: spans, logs and metrics as OTLP protobuf to `MAPLE_OTLP_URL`, 200 per batch; each sending host needs a Tailscale ACL grant to `tcp:4318` |
| `infra-kit/auth` | Better Auth on a Worker | `AuthD1(db)`: D1, schema migrates on each deploy. `AuthPostgres(AuthHyperdrive(...), { migrateUrlVar? })`: Postgres through Hyperdrive with caching off; the origin password comes from `passwordVar` at deploy and never reaches state; tables only with `migrateUrlVar`; add `providers()` beside `Cloudflare.providers()`. Signing secret made once | `AppAuth({ appScheme, webOrigins, baseURL, ... })` at `/api/auth`; rules in the `app-auth` skill |

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
- Declare the shared VPS engine with `VpsContext("<name>")` (`host=ssh://vps`). The kit examples use `infra-kit-vps`. Two stacks with one name share the context, and destroying one deletes it for both. A new name replaces the context and every container on it. A new logical ID makes Alchemy remove the old context by name, which is the same context.
- Run the project-local `node_modules/.bin/alchemy`. `alchemy dev` and deploys need `@effect/platform-bun` and `@effect/platform-node` at the same effect version.

## Proofs

- A new piece ships with an `examples/<piece>` stack and an `e2e/<piece>` proof that a separate agent writes from a spec, run against real infrastructure.
- Name proof resources `infra-kit-proof-*`; on the shared VPS touch no other container.
- A POC database on the VPS uses the shared Postgres `shared-pg`, not a new Postgres container: see `local-dev`, "POC apps on the VPS".
