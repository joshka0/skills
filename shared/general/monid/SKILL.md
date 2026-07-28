---
name: monid
description: "Discover and run external data endpoints through the monid CLI under a per-query cost bound. Use when a task needs scraping, enrichment, people/company data, or search results from an outside source, or names monid."
---

# Monid

Reach external data through the `monid` catalog instead of hand-written scrapers or direct vendor API calls. Runs are metered against a workspace balance, so input width is a cost decision, not a convenience default.

## Workflow

1. Preflight once per session: `monid --version` and `monid keys list`. If no key is active, add one from `$MONID_API_KEY` in the same shell invocation and never echo the value.
2. `monid discover -q "<short noun phrase>"` before writing any fetch code. Split a multi-source request into one discovery per source.
3. `monid inspect -p <provider> -e <endpoint>` before every first run of an endpoint. Its `input` field is the only source of truth for parameter placement.
4. Map inspect output to run flags: `body` → `-i`, `queryParams` → `--query`, `pathParams` → `--path`.
5. Fire without `--wait`, then poll `monid runs get -r <runId>` until a terminal status. Save with `-o <file>` and read the file, not the transcript.
6. Read any `Hints` block in command output and act on it before choosing the next command.

## Cost discipline

- Volume parameters (`maxItems`, `maxResults`, `resultsLimit`, `limit`) are commonly applied **per query, not per call**; three search terms at `maxItems: 10` can bill thirty results.
- Send one search term, URL, or handle per call unless the user explicitly asked for several.
- Start at 5–10 items on a first run against an unfamiliar endpoint, then widen.
- Identify the volume parameter from `monid inspect`, not from the parameter's name.
- Report `cost.value` and, when the user is budget-aware, `monid balance`.

## Hard rules

- Never guess an endpoint's input shape or flags; inspect the endpoint and read `monid <command> --help`. Do not carry endpoint names, schemas, or prices in pack content — the catalog changes continuously.
- Never pass a key value on a command line reconstructed from the transcript; read it from its environment variable in the same shell invocation and keep it out of output.
- Do not use `--wait` in interactive work. Reserve it, with an explicit timeout, for background or scripted runs where blocking up to the endpoint's stated maximum is acceptable.
- Only attempt `monid runs stop` when the run detail reports `stoppable: true`; a stop is asynchronous, so poll until the run reports stopped.
- `BLOCKED` is terminal. Stop polling, name the workspace control from the run's `controls` list, and tell the user to adjust it in the dashboard before a retry.
- Re-inspect and shrink the request on a failed run before retrying; do not retry an unchanged input that failed on parameters or scope.

## Do not use when

- The data is already reachable from the repository, an installed CLI, or an already-authenticated MCP server.
- The task is browsing or acting inside a logged-in web session — `local-http-browser-use` owns an authorized live browser.
- No key is configured and the user has not authorized adding one; report the gap rather than falling back to a hand-written scraper.

## Output

Report the endpoint used, the input width actually sent, terminal run status, the saved result path, and the run cost. On a blocked or failed run, report the controlling limit or the parameter that failed instead of a partial result.
