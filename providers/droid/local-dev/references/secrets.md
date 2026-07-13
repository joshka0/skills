# Secret-safe local handoff

Read this only for the `secrets` mode when a local development operation requires credential injection or a named secret without exposing its value.

1. Inspect repository configuration for the required environment-variable names, credential schema, and existing injector or vault integration. Discover names and status only; never dump an environment, dotenv file, keychain, or vault value.
2. Prefer the installed credential injector or transparent proxy already owned by the environment. If a provider-specific skill exists for that tool, use it for exact commands; this mode owns the safe handoff boundary.
3. Ask for authorization tied to the exact operation before retrieving or injecting a value. Pass variable names, key names, or vault paths between tools and agents, never the value itself.
4. Keep injected values out of command arguments, generated files, logs, reports, shell history, and agent messages. Redact errors and report only names, counts, paths, hashes, or status.
5. If no safe injector exists, stop and propose a portable placeholder schema such as `<token>` or `SERVICE_TOKEN`; do not create a plaintext secret store or guess a machine location.

Verify only that the authorized operation received the required named credential and that no value appeared in output or repository changes. Return the injector/tool selected, safe identifiers used, operation status, and any missing authorization or integration.
