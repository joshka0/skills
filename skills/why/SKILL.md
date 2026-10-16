---
name: why
description: "Find why code has its shape from the evidence: Git and PRs, fleet memory, ADRs, issues, error tracking, each searched by its own agent. Use before you change code whose reason is unknown."
---

# Why

The current shape is usually many earlier decisions on top of each other.
The newest commit is not the authority. Trace back.

## Anchor the code

Before you start any investigator, collect the file paths and line ranges,
the key symbols, the commits, and the PR and issue IDs:

```sh
git blame -L <start>,<end> <file>
git log --follow -p -- <file>
gh pr view <number> --json title,body,author,mergedAt,closingIssuesReferences,comments,reviews
```

Give the anchor and the user's question to each investigator.

## One investigator per source

Start one read-only subagent per source, all at the same time. Each one owns
exactly one source.

| Source | Where | Best at |
| --- | --- | --- |
| Source control | `git`, `gh`, code comments, tests | The reason given at review time |
| Fleet memory | `mem find`, `mem topic`, `mem zoom` (`agent-memory`) | Operator decisions and what agents tried |
| Decision records | `docs/adr/`, the spec ledger digest | Contract and architecture choices |
| Issue tracker | `br` (`beads-br`), GitHub issues, a tracker MCP | The product reason |
| Error tracking | Sentry (`sentry-cli` skill), an observability MCP | The failure that a guard, retry, or timeout answers |
| Docs and chat | A docs or chat MCP, if one is connected | Design text and discussion that did not reach a PR |

- An empty search is a finding. Record it.
- Skip a source only for one of two reasons, and write the reason in the
  report: no tool reaches it here (a gap, not a choice), or it is provably
  irrelevant, such as error tracking for a build-time script.
- If the code is defensive (a null check, a retry, a timeout, a rate limit,
  a feature flag), tell each investigator to look for the incident behind it.

## Report

Keep these parts separate. Never raise the confidence of a finding when you
edit the text.

- **Found**: what the evidence states, each with its citation (commit, PR,
  memo ID, ADR, issue).
- **Inferred**: what follows from the evidence but that no source states.
- **Competing hypotheses**, when the evidence fits more than one.
- **Unknown**: what no source answers.
- **Sources consulted**: one line per source, including the empty and the
  skipped ones, with the reason.

If the question comes before a change to this code, end with the constraints
for that change: preserve, change, avoid, risk.

Adapted from pstack `why` (MIT, copyright 2026 Lauren Tan).
