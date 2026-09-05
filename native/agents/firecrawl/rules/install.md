# Installation and authentication

Inspect the installed command before changing the environment. Use
`firecrawl --status` for authentication, concurrency, and credit status.
For current installation and login options, use the
[official CLI documentation](https://docs.firecrawl.dev/sdks/cli) and installed help.
The package is `firecrawl-cli`; the executable is `firecrawl`.

`firecrawl init` can install skills across editors as well as the CLI and
browser authentication. Do not run broad initialization or editor setup for a
request that only needs a missing executable or credential. Do not pin an old
version from this guide or install packages through an unchecked `npx` fallback.

Use an existing `FIRECRAWL_API_KEY` through the repository's runtime secret
injection. Never print it or place it in shell arguments. Follow
[credential ownership](../../firecrawl-build/references/auth-and-env.md) if setup
is required. `firecrawl login --browser` is the CLI's human authorization flow;
check current help and existing authority before starting it.

The imported CLI supports rate-limited keyless search, scrape, and interact.
Confirm current availability before requiring signup for a task that can use
that tier. Authentication may provide higher limits. Do not replace the user's
chosen browser surface or bypass its readiness rules to complete login.

A successful task request verifies runtime access. Status alone does not prove
that fetching works; report a missing credential or unavailable service directly.
