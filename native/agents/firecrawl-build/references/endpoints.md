# Endpoint behavior

A known URL uses `/scrape`; a query uses `/search`. Use `/interact` when the
product must continue a scrape's browser context through clicks, forms, or
pagination. Read [current language docs](sdk-installation.md) for actual calls;
do not construct SDK method names from CLI syntax.

For scrape, request markdown unless the consumer needs another format. Use
`onlyMainContent` for article extraction, but preserve page chrome when it is
the target data. Rendering waits need an observed page requirement. See
[freshness and liveness](freshness-and-liveness.md) before using a scrape as a
current-status check.

For search, make the consumer's contract explicit: URLs, snippets, or full page
content. Selective follow-up scrapes avoid hydrating every hit. If search already
returned useful full content, reuse it. Preserve source URLs through the
application's output so downstream claims retain their evidence.

For interact, carry the correct scrape/session identity through the workflow.
Keep actions within the feature's authorized scope and close sessions on success,
failure, and cancellation using the current API lifecycle. Persistent profiles
store account state; use them only when cross-session authentication is required.
Do not confuse a read-only profile reconnect with read-only actions on a site.

A successful response can still contain a loading screen, login page, or missing
fields. Verify the extraction contract at the consumer boundary. Do not silently
replace a selected service model or provider to make a failing call pass.
