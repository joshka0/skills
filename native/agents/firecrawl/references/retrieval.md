# Search, scrape, and map

Use current command help for filters, formats, and pricing. These examples show
the operation shape; choose the result limit and destination for the task.

```bash
firecrawl search "query" --limit 3 --json -o .firecrawl/search.json
firecrawl search "query" --scrape --json -o .firecrawl/search-content.json
firecrawl scrape "https://example.com/page" -o .firecrawl/page.md
firecrawl map "https://example.com" --search "authentication" --json -o .firecrawl/urls.json
```

Search discovers sources; scrape reads a known URL, including JS-rendered pages.
Map discovers site URLs without downloading their content. Use map plus selective
scrapes when only a section or specific page matters. A bounded map is not proof
that the site has no other pages.

Search results live under `.data.web`; `--scrape` adds content when retrieval
succeeds. Inspect missing or failed content before deciding to fetch again.
`--categories developer` adds a `.data.developer` group whose `description` is
a matched passage and whose `category` is `developer`. Full developer passages
and coverage semantics are in the [developer index](../../firecrawl-developer-index/SKILL.md).

Request the output the task needs. A single scrape format returns raw content;
multiple formats, such as `--format markdown,links`, return JSON.
`--only-main-content` removes navigation and chrome, so avoid it when those are
the evidence. Add rendering waits only for an observed need.
`--query` performs additional AI work with an extra credit cost; plain content
is enough when the local agent can answer from it.

For time-sensitive reads, inspect cache and HTTP metadata instead of assuming
a successful request is fresh or that the underlying item is still active.
See [freshness and liveness](../../firecrawl-build/references/freshness-and-liveness.md).
When content requires actions, use [browser sessions](browser.md).
