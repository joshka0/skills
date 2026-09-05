# Bulk capture and parsing

## Crawl or download

`crawl` follows links and returns a job ID unless `--wait` is used. Preserve that
ID and inspect it with `firecrawl crawl <job-id>`; an accepted job is not a
completed collection. Use current help for cancellation before abandoning a
running paid job. Check returned page errors and coverage before claiming success.

```bash
firecrawl crawl "https://example.com/docs" --include-paths /docs --limit 50 --wait -o .firecrawl/docs.json
```

Set path, depth, page, and concurrency bounds to the requested scope. Costs grow
with pages; check available credits before a large collection. A timeout is not
a reason to start a duplicate job.

`download` combines map and scrape and saves pages in local directories, unlike
crawl's combined output. The imported command is experimental; inspect
`firecrawl download --help` before using it. Multi-format downloads create
separate files for each page. Use `-y` only after the scope and spending are
already authorized; it skips the CLI prompt, not the user's authority boundary.
Do not assume map's subdomain flag and download's subdomain flag are identical.

## Local files

`parse` uploads a document to the service. Apply the
[upload boundary](../rules/security.md) before using it; use local extraction
when cloud upload is outside the task's authority.

```bash
firecrawl parse "./paper.pdf" -o .firecrawl/paper.md
```

Save large output to disk. Check current help for supported file types, size
limits, timeout options, and per-page costs before batch processing. Summary
and query options invoke additional AI processing. `/parse` is uncached and
ignores `maxAge`; reuse a suitable local result instead of uploading again.
