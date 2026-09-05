# Authentication and secret ownership

Hosted requests use `FIRECRAWL_API_KEY`. Set `FIRECRAWL_API_URL` only for a selected
self-hosted deployment; inspect the project's client and deployment contract
before changing either. Keep credentials on the server side, out of source,
client bundles, arguments, screenshots, logs, and reports.

Follow the existing local-dev secret policy. In this environment, inspect
`.infisical.json`, required key names, and the exact repo secret path first.
Provider-wide credentials belong once under `/shared/vendors/firecrawl`, imported
into the consumer's exact `/repos/...` folder with imports enabled. A direct repo
key shadows an import. Do not use recursive injection as inheritance or copy
credentials into each repo. Keep long-lived local issuer credentials in macOS
Keychain; a provider-specific owner performs minting when one exists.

Use the runtime secret store. Dotenv files are not a required setup step;
existing secret-bearing dotenv files are migration inputs. Verify key presence
and the real consumer without displaying values. Do not create, rotate, overwrite,
or remove credentials beyond the task's existing authority.

If human browser authorization is needed, prefer the supported CLI login or
current official onboarding flow. CLI login success does not prove the app's
runtime can read its key. Do not export a CLI credential to plaintext to bridge
that gap.

For a client that must implement the authorization exchange, the imported
protocol uses a random session ID and PKCE verifier/SHA-256 challenge. The human
opens `https://www.firecrawl.dev/cli-auth` with `code_challenge` and
`source=coding-agent`, and the fragment contains `session_id`. A POST to
`https://www.firecrawl.dev/api/auth/cli/status` sends `session_id` and
`code_verifier`; responses include `pending` or `complete` with `apiKey` and
`teamName`. Verify this volatile contract in the
[official onboarding guide](https://www.firecrawl.dev/agent-onboarding/SKILL.md)
before implementing it. Keep the verifier and returned key secret, bound polling
to the active authorization attempt, stop on cancellation or expiry, and send
the result directly to the authorized secret store.
