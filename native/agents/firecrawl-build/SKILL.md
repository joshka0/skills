---
name: firecrawl-build
description: Integrate Firecrawl into application code when the user or project has selected Firecrawl as its web-data provider.
license: ISC
metadata:
  author: firecrawl
  version: "0.1.0"
  homepage: https://www.firecrawl.dev
  source: https://github.com/firecrawl/skills
inputs:
  - name: FIRECRAWL_API_KEY
    description: Firecrawl API key for hosted usage, supplied by the project's runtime secret store.
    required: true
  - name: FIRECRAWL_API_URL
    description: Optional base URL for a selected self-hosted Firecrawl deployment.
    required: false
references:
  - references/sdk-installation.md
  - references/auth-and-env.md
  - references/endpoints.md
  - references/freshness-and-liveness.md
---

# Firecrawl application integration

Use the repository's existing client, package manager, runtime, and secret
conventions. Do not select Firecrawl merely because a feature needs web data.
Infer the required behavior from the task and code; ask only for a missing
choice that changes the implementation.

- For credentials or browser authorization, read
  [authentication and secret ownership](references/auth-and-env.md).
- For SDK or REST usage, select the current
  [language documentation](references/sdk-installation.md).
- For scrape, search, or post-scrape actions, read
  [endpoint behavior](references/endpoints.md).
- For stale content or item status, read
  [freshness and liveness](references/freshness-and-liveness.md).

Verify through the actual application path that credentials load, the chosen
endpoint returns useful data, and the consumer handles the result. Use a small
live request when the task authorizes it; compile or mocked success alone does
not prove the integration works. If live access is unavailable or outside scope,
report that verification limit without installing tooling or creating credentials
as a workaround.

For one-off terminal retrieval use [firecrawl](../firecrawl/SKILL.md).
For managed recurring jobs use [firecrawl-monitor](../firecrawl-monitor/SKILL.md).
