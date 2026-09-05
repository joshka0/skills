# Literature retrieval and verification

Use `firecrawl research <command> --help` for current arguments and availability.
The imported CLI equivalents are:

```bash
firecrawl research search-papers "query" --k 10
firecrawl research related-papers <seedIds...> --intent "constraint or topic" --mode similar --k 10
firecrawl research inspect-paper <id>
firecrawl research read-paper <id> --question "Does the method use the specified technique?"
```

`search-papers` uses semantic (HyDE) search over abstracts. Different framing,
a benchmark name, or a neighboring method can recover papers whose abstracts
use other terminology. Abstract relevance alone does not prove a body claim.

`related-papers` ranks expansion results against `intent`. Its modes answer
different questions: `similar` finds semantic neighbors, `citers` finds work
that cites the seeds, and `references` finds what the seeds cite. For a method
family or requested enumeration, expand useful anchors and re-seed where new
relevant work appears. For papers that apply a property without naming it in
the abstract, follow the defining paper's citers or references, then check the
candidate's body. Stop when the requested coverage is supported; no fixed number
of searches or expansion rounds is required.

`inspect-paper` returns canonical title, abstract, authors, categories, source
IDs, and dates for one paper. It does not read the body. `read-paper` returns
in-body passages for a specific question; use it for method, score, comparison,
affiliation, or other decisive evidence. A topical hit alone does not satisfy an
author/organization filter. Mark unavailable body evidence instead of claiming
a constraint was verified.

For a paper's baselines or foundations, read its comparison passages and use
`references` expansion. For a current superlative, find the authoritative
leaderboard on the web and map its entries back to papers. Separate the live
ranking from a paper's reported result, including benchmark version and date.
Whitepapers or technical reports missing from the index can be read from their
source pages with [firecrawl](../../firecrawl/SKILL.md); an empty index result
is not proof that no such work exists.
