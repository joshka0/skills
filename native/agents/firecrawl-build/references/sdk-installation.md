# SDK and REST selection

Check installed dependencies and types first. Reuse the project's HTTP client
or existing SDK. The imported package names are `@mendable/firecrawl-js` for
JavaScript/TypeScript and `firecrawl-py` for Python; verify current support and
use the project's package manager if a dependency is needed.

Read the current source-of-truth page for the selected language when implementing
request/response schemas, endpoint paths, or SDK methods:

- [Node / TypeScript](https://docs.firecrawl.dev/agent-source-of-truth/node)
- [Python](https://docs.firecrawl.dev/agent-source-of-truth/python)
- [Rust](https://docs.firecrawl.dev/agent-source-of-truth/rust)
- [Java](https://docs.firecrawl.dev/agent-source-of-truth/java)
- [Elixir](https://docs.firecrawl.dev/agent-source-of-truth/elixir)
- [REST](https://docs.firecrawl.dev/agent-source-of-truth/curl)

These are documentation targets, not a promise that every language has the same
SDK surface. The CLI is unnecessary for an application that uses SDK or REST.
Do not run `firecrawl init --all` to add an app dependency; that command also
changes editor tooling and may launch authentication.
