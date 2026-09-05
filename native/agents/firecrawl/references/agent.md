# Structured extraction jobs

Use plain scrape for straightforward single-page data. `firecrawl agent` is
useful when extraction requires finding and navigating several pages.
Provide starting URLs and a schema when the task has a known output contract.

```bash
firecrawl agent "Extract the listed products" --urls "https://example.com/products" --schema-file schema.json --max-credits 20 --wait -o .firecrawl/products.json
```

The example budget is illustrative, not spending authorization. Set
`--max-credits` within the task's authorized budget; inspect current help and
credit usage before costly work. Validate the returned fields and source
coverage, including unavailable values, before using the extraction as evidence.

`--wait` waits for results; without it the command returns a job ID. Retain the
ID, use current help to inspect or cancel the job, and do not duplicate a job
merely because it is still running.

`--model` selects a Firecrawl service model. The imported source names
`spark-1-mini` and `spark-1-pro`; verify current availability in help. Spark is
not a Codex model or an instruction to dispatch a coding subagent. Preserve an
explicitly selected service model; report unavailability instead of silently
switching it.
