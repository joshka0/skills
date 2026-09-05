# Optional service feedback

Feedback sends additional information to Firecrawl. Submit it only when the
user or existing project policy authorizes that telemetry; using search does
not itself require a feedback call. Do not upload raw page/document content,
private URLs, secrets, or task details as feedback.

If authorized, inspect `firecrawl search-feedback --help` or
`firecrawl feedback --help` for current payload rules, eligibility windows,
and refunds. Do not treat a historical refund as guaranteed pricing.

Search feedback uses the response's search `id`. A `good` rating requires
valuable sources; `partial` requires valuable sources or missing content;
`bad` requires missing content or query suggestions. Missing content can be an
array of `{topic, description?}` objects. Submit once per search ID; repeat
submissions do not earn extra refunds. Stop refund-driven submission when
`dailyCapReached` is true.

Respect `FIRECRAWL_NO_SEARCH_FEEDBACK=1`,
`FIRECRAWL_DISABLE_SEARCH_FEEDBACK=1`, and server-side `TEAM_OPTED_OUT`.
Endpoint feedback uses `firecrawl feedback <endpoint> <jobId>` with compact
issue codes, tags, notes, and permitted metadata. Respect
`FIRECRAWL_NO_ENDPOINT_FEEDBACK=1`.

`--silent` can return exit 0 even when submission fails or is skipped. Do not
report feedback accepted from that exit code alone, or launch a background
submission merely to hide its result.
