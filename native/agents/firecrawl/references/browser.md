# Browser sessions

Use this only when actions are needed and the remote browser surface is
permitted. Scrape can already render JavaScript. A failed scrape does not itself
justify switching away from the user's selected local browser.

`interact` continues a prior scrape's browser session. The CLI remembers the last
scrape ID, so pass `--scrape-id` explicitly when sessions can overlap.

```bash
firecrawl scrape "https://example.com" -o .firecrawl/page.md
firecrawl interact --scrape-id <id> --prompt "Expand the pricing table"
firecrawl interact --scrape-id <id> --code "agent-browser snapshot -i" --language bash
firecrawl interact stop
```

Choose `--prompt` or `--code`, not both. The imported code languages are bash,
Python, and Node; use installed help for the current timeout and session options.
Stop each session when finished, including failed flows. In concurrent work,
check the stop command's targeting options so cleanup closes the intended session.

`--profile <name>` on scrape persists cookies and localStorage across scrapes.
Use it only when persistent account state is required and authorized.
`--no-save-changes` reconnects without saving profile updates; it does not make
site actions read-only. Keep credentials and profile contents out of outputs.

Track visited pages and pagination position so partial extraction is visible.
For dashboards, verify the selected period and metric units. For QA or
walkthroughs, record the actual state and action needed to reproduce a finding.
Use test data within the authorized flow; purchases, messages, real submissions,
and cart actions require the user's authority. Stop before checkout unless it
is explicitly included. Read the [access boundary](../rules/security.md).
