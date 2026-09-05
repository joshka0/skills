---
name: firecrawl-research-index
description: Retrieve and verify literature with Firecrawl Research's paper index, related-paper expansion, and in-body passages.
---

# Firecrawl research index

Use the dedicated paper corpus for literature retrieval. Let the requested
scope determine whether the answer needs one paper or a broader set; a named
paper lookup does not require a literature review.

- Search abstracts with `firecrawl_research_search_papers(query, k?)`.
- Expand useful seeds with
  `firecrawl_research_related_papers(seed_ids, intent, mode?, k?)`.
- Resolve citation metadata with `firecrawl_research_inspect_paper(id)`.
- Verify a body claim with `firecrawl_research_read_paper(id, question)`.

Discover the installed MCP names rather than guessing namespace prefixes. The
[retrieval reference](references/retrieval.md) gives equivalent CLI commands
and the differences between abstract search, citation expansion, and body evidence.
Check live help or [official documentation](https://docs.firecrawl.dev) for
current limits and access requirements.

Verify the constraints that determine inclusion: method, reported score, date,
author, or affiliation. Separate verified matches from plausible leads. Keep
canonical titles, dates, and source URLs for citations, and distinguish papers
from vendor reports or research blogs. Do not impose a fixed paper count or
expand beyond the user's scope merely because neighboring papers exist.

Use [firecrawl](../firecrawl/SKILL.md) for reports outside the corpus and current
leaderboards. For a supplied local PDF, its
[upload boundary](../firecrawl/rules/security.md) still applies.

Adapted from [Firecrawl CLI](https://github.com/firecrawl/cli) and
[Firecrawl workflows](https://github.com/firecrawl/firecrawl-workflows)
(research-paper contributions: ISC, author: Firecrawl).
