---
name: app-auth
description: "House sign-in for web and Expo apps: Better Auth on a Cloudflare Worker (D1, or Postgres via Hyperdrive) through infra-kit's AppAuth. Use when an app needs sign-in, sessions, or billing on its auth."
---

# App auth

Each app owns its own auth and its own users; apps never share accounts. New apps use `infra-kit/auth` (see `infra-kit` for the kit itself). The proven example is `~/repos/personal/infra-kit/examples/auth`.

## Use it

```ts
const AuthDb = Cloudflare.D1.Database("AuthDb");

export default class Api extends Cloudflare.Worker<Api>()(
  "Api",
  { main: import.meta.url },
  Effect.gen(function* () {
    const auth = yield* AppAuth({
      appScheme: "myapp://",
      webOrigins: ["https://myapp.com"],
      baseURL: "https://api.myapp.com",
      emailAndPassword: { enabled: true },
    });
    return { fetch: auth.fetch };
  }).pipe(Effect.provide(AuthD1(AuthDb))),
) {}
```

- `AppAuth` owns `basePath` (`/api/auth`) and `trustedOrigins`. It trusts only `appScheme` and `webOrigins`. `appScheme` also adds the Expo plugin.
- Other options pass through to Alchemy's `BetterAuth`. Add sign-in providers from the Alchemy Better Auth guides.
- `baseURL` is required: the public origin of the auth Worker.
- An app that keeps its stack uses `Cloudflare.state()`. `Alchemy.localState()` writes secrets to disk in plain text.

## Deploy and prove

- Deploy token: `infra-token-factory mint cloudflare --account-permission "Workers Scripts Write" --account-permission "D1 Write"` into the app's Infisical path. Deploy with `CLOUDFLARE_API_TOKEN` set from it.
- Proof: `AUTH_ORIGIN=<worker origin> AUTH_SCHEME=<appScheme> bash ~/repos/personal/infra-kit/e2e/auth.e2e.sh`. It checks sign-up, sessions, sign-in, sign-out, the Expo scheme, and rejection of untrusted origins. It writes `e2e/auth.report.md`. `AUTH_SCHEME` defaults to `apprecipe://`.
- For less than a minute after the first deploy, workers.dev answers some requests with edge errors 1042 and 1104. Wait for that to pass before you run the proof.

## Postgres through Hyperdrive

Use this when the users live in an existing Postgres (praze on PlanetScale). The proven example is `~/repos/personal/infra-kit/examples/auth-postgres` (`e2e/auth-postgres.report.md`, 10/10).

```ts
const AuthHd = AuthHyperdrive("AuthHd", {
  name: "myapp-auth",
  origin: { host: "<host>", database: "<db>", user: "<role>" },
  passwordVar: "MYAPP_AUTH_PG_PASSWORD",
});
// inside the Worker:
AppAuth({ ... }).pipe(Effect.provide(AuthPostgres(AuthHd, { migrateUrlVar: "MYAPP_AUTH_PG_MIGRATE_URL" })))
```

- Write the origin host, database and user as literals. Alchemy binds every `Config` read in a Worker's init onto the Worker as a secret.
- The deploy reads the origin password from the env var named by `passwordVar`. State holds only a fingerprint. A changed password updates the same Hyperdrive config.
- Omit `migrateUrlVar` when another system owns the schema: the deploy then creates no table. With it, the deploy migrates through that direct URL and keeps only a digest.
- Hyperdrive caching is off, so sign-out takes effect at once.
- Deploy token: `--account-permission "Workers Scripts Write" --account-permission "Hyperdrive Write"`.
- A wrong origin password fails the deploy with `Invalid database credentials` and leaves no config.

## Limits

- D1 has no interactive transactions. Plugins that need them (SCIM) fail.
- Deploy migrations only add schema. You move data by hand.

## Stripe billing

`@better-auth/stripe` 1.7.7 works on this stack (local spike, 2026-10-14). The plugin owns subscriptions and the one webhook at `<baseURL>/api/auth/stripe/webhook`.

- `stripe` must stay within the plugin's peer range `^18`–`^22`. `23.0.0` is out of range.
- If you declare `Stripe.WebhookEndpoint` in Alchemy, use `bindWebhookSecret`. Never also use `consumeEvents`.
- `onSubscriptionUpdated` swallows errors and returns 200, so Stripe does not retry. Make that handler unable to fail.
- Never put Stripe keys in Alchemy props or state until the operator approves it. Alchemy stores bound secret values in state.

## Existing apps

praze and turtlr run Better Auth 1.6 on Postgres. The move plan is in `~/vaults/fleet-memory/summaries/2026/10/2026-10-14-1557-skills-app-auth-d1-migration-plan.md`.

- praze: only auth moves to a Worker, on `AuthPostgres` over its PlanetScale database. Phoenix keeps verifying JWTs through JWKS. Keep `BETTER_AUTH_SECRET` and the JWKS keys when you copy data, so sessions stay valid.
- turtlr: auth and API share one process and database. Move it only as a whole app.
