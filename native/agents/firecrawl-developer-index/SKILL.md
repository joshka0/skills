---
name: firecrawl-developer-index
description: Query Firecrawl's developer-source index for issue, pull-request, README, and documentation passages.
---

# Firecrawl developer index

Use this for source discovery through the dedicated Firecrawl Developer index.
It does not replace local code inspection or every programming answer.

The dedicated surface returns matched passages:

- CLI: `firecrawl developer <query> [--limit <n>] [--skills-only]`
- MCP: `firecrawl_developer_search(query, k?, skills?)`
- HTTP: `GET|POST https://api.firecrawl.dev/v2/search/developer`

Discover the actual exposed MCP tool name; do not infer a namespace prefix.
Use installed help or [official documentation](https://docs.firecrawl.dev) for
current schemas and limits. The imported endpoint allows keyless queries;
`FIRECRAWL_API_KEY` provides higher limits when available through safe injection.

Start with the question's useful terms: a stable error string for a bug, the
API symbol for a contract, or a natural-language behavior question. Read
[filters and coverage](references/query-contract.md) when narrowing or interpreting
missing evidence.

Use returned passages and source URLs to support the answer. For version-specific
behavior, inspect the issue's resolution and linked merged PR, then verify which
release contains the change. A merge does not prove the user's installed version
includes it. Scrape the source URL if the passage omits necessary context.
For unindexed sources or web-only questions, use [firecrawl](../firecrawl/SKILL.md).

Source: [Firecrawl CLI](https://github.com/firecrawl/cli).
