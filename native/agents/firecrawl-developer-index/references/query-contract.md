# Developer query contract

Dedicated results include `id`, `type`, `url`, `title`, and markdown `passages`.
Types are `doc`, `issue`, `pull_request`, and `readme`. A documentation hit may
lack a title; use its URL as the label. The CLI JSON form exposes
`.results[].passages[].text`.

A general `firecrawl search <query> --categories developer` or
`firecrawl_search(query, categories: ["developer"])` adds developer hits beside
web hits. In that surface, `description` is the matched passage and
`category: "developer"` identifies the group; web hits have no category.
Use the dedicated endpoint for full passages and HTTP-only filters.

The imported HTTP surface supports these distinctions. On GET, use comma-separated
or repeated array parameters; on POST, use arrays. Check current docs for ranges.

- `types` selects source kinds. Error reports often benefit from `issue` and
  `pull_request`; API definitions from `doc` and `readme`.
- `repos` scopes repository sources; `sources` scopes documentation source IDs.
  Passing both unions the halves, not intersects them. Responses echo each scope
  with `indexed: true|false`. A false value means changing query wording cannot
  find evidence in that scope; widen or fetch the source directly.
- A scope incompatible with all requested types is HTTP 400: `repos` needs a
  repository type; `sources` needs `doc`.
- `passages` is the maximum passages per result, not a guaranteed count. Increase
  it when the correct page matched but the relevant section is missing.
- Repository filters (`language`, `topic`, `license`, `min_stars`, `max_stars`,
  `archived`, `fork`) can remove documentation coverage. Without an explicit
  `sources` scope they yield repository evidence only and mark `doc` unavailable.
  Drop those filters or add a documentation scope when docs are required.
- `skills="only"` / CLI `--skills-only` restricts results to agent-skill files.

Read per-type `coverage` before diagnosing an empty result: `skipped` means the
request did not select that type; `degraded` or `unavailable` can result from the
index or the supplied filters. An `ok` type with no hits is a query miss.
Do not retry an incompatible filter or report absent coverage as proof that a
source or behavior does not exist.
