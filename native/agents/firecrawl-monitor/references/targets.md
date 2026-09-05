# Targets and result semantics

Use `firecrawl monitor create --help` and subcommand help for current flags,
limits, schedule syntax, retention, and notifications.

- `--page <url>` watches one page; `--scrape-urls <list>` watches known URLs.
- `--crawl-url <url>` discovers and checks a site repeatedly. Bound its crawl
  through the supported configuration; cost and coverage can grow with the site.
- `--queries <list>` plus required `--goal` watches for new web-search results.
  Queries retrieve candidates; the goal judges whether they match. Use domain
  filters for source restrictions instead of embedding `site:` in these queries.
  Set recency with `--search-window` and results per query with `--max-results`.
  Do not assume additional queries share one global result or cost limit.

Use concise goals that preserve the user's trigger and scope. Do not invent
thresholds, entities, or exclusions. If the user asks for any change, preserve
that intent. The service's judge suppresses common formatting and page noise;
it is not proof that every visible change will generate an alert.

Page/crawl checks label pages `same`, `new`, `changed`, `removed`, or `error`.
Web-search results are `new` or `same`, not `changed`/`removed`; a result alerts
on first discovery rather than each edit. Narrow queries when many candidates
are ignored; investigate recency and retrieval scope when known matches are absent.

```bash
firecrawl monitor list --limit 20
firecrawl monitor get <monitorId>
firecrawl monitor checks <monitorId>
firecrawl monitor check <monitorId> <checkId> --page-status changed
firecrawl monitor update <monitorId> --state paused
```

`--state` changes active/paused state; `--page-status` filters check pages.
`--status` is reserved for global CLI status. Monitor scrapes default to
`maxAge: 0` unless explicitly configured in target `scrapeOptions`.

For competitor prices, preserve billing period, plan, limits, and currency in
snapshots. Annual/monthly toggles or gated dashboards may require an authorized
[browser capture](../../firecrawl/references/browser.md) before selecting a
monitor target. Do not assume a scheduled monitor inherits that browser profile
or reproduces its actions. Verify supported target configuration and actual
captured fields. Keep contact-sales or hidden fields unknown.

Webhook events include `monitor.page` and `monitor.check.completed`. Configure
only authorized destinations; redact secret-bearing webhook URLs in artifacts.
External email recipients must confirm the service's opt-in message before
alerts arrive. Team-owned addresses are auto-confirmed; unsubscribed recipients
need the owner to re-add them. Recipient configuration alone does not prove delivery.
