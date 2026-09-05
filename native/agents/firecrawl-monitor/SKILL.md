---
name: firecrawl-monitor
description: Create and manage authorized recurring Firecrawl page or web-search monitors, including alerts, state, and cancellation.
allowed-tools:
  - Bash(firecrawl *)
  - Bash(npx firecrawl *)
---

# Firecrawl monitors

Use this for an ongoing job the user has authorized. Repeated one-off lookups
or a competitive research request do not authorize recurring charges or alerts.
Use [firecrawl](../firecrawl/SKILL.md) for a current snapshot.

Before creation, establish the targets, change goal, schedule/timezone,
recurring scope and cost, and any notification destinations from the request.
Ask only for consequential missing choices. Inspect existing monitors to avoid
duplicates. Check current `firecrawl monitor --help`, account limits, and credit
usage; do not copy a historical minimum interval or assume a per-run budget cap
exists. Monitoring retains snapshots and is unavailable for zero-data-retention teams.

Read [targets and result semantics](references/targets.md) for page, crawl,
web-search, or competitor monitoring. Read
[structured diffs](references/structured-diffs.md) when specific fields matter.

Retain the monitor ID. Inspect `get` for state, normalized schedule, and
`nextRunAt`; inspect a completed check for useful coverage and errors. A created
ID proves neither successful collection nor notification delivery. A manual
`run` starts a paid check and may send alerts. Respect existing authorization.

Use `update <id> --state paused` to suspend future checks. For permanent
cancellation, inspect current delete behavior and the user's retention intent
before deleting stored history. Verify the final state; do not assume pausing
stops a check already in progress. Report the ID, active/paused state, schedule,
and any unverified delivery or ongoing work.

Adapted from [Firecrawl CLI](https://github.com/firecrawl/cli) and
[Firecrawl workflows](https://github.com/firecrawl/firecrawl-workflows)
(competitive-intelligence contributions: ISC, author: Firecrawl).
