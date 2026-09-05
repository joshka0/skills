# Freshness and liveness

`maxAge` is the maximum age in milliseconds of an indexed copy that `/scrape`
may reuse. Omit it to use the service's window, set it for a real staleness bound,
or use `maxAge: 0` to take the live path. Live scraping adds latency and exposes
site failures that reuse may hide. `/parse` is uncached and ignores `maxAge`.

Inspect scrape metadata:

- `cacheState` is `hit` or `miss` when index reuse was eligible. The imported
  contract omits it with `maxAge: 0`; confirm against current docs when relying
  on that detail.
- `cachedAt` is the reused copy's timestamp on a hit.
- `sourceURL` is the requested URL; `url` is the response URL. Different values
  show a redirect. Equal values do not prove there was no redirect because
  `url` can fall back to the requested URL.
- `statusCode` is the page response's HTTP status.

Fresh content does not prove that a listed item is active. A removed job or
product can still have a full HTTP 200 page. Interpret the source's status
signals or use its API/identifier where available. Keep inconclusive state
unknown before an action whose correctness depends on the item being active.
