---
name: go-lang
description: "Apply a compact Go decision policy for public contracts, goroutine lifetimes, and verification evidence. Use when an exported Go API, error boundary, goroutine, race, benchmark, or module change needs a deliberate decision."
---

# Go Language

Choose one mode for a Go package or change. This suite keeps only the pack's durable Go decision policy; resolve version-sensitive behavior from repository state, live Go tools, then primary documentation.

## Route

| Mode | Select when | Read |
| --- | --- | --- |
| `public-contract` | An exported type, function, package boundary, error behavior, or module compatibility changes | `references/public-contract.md` |
| `goroutine-lifetime` | A goroutine, channel, cancellation path, worker limit, or concurrent failure path changes | `references/goroutine-lifetime.md` |
| `verification-evidence` | A Go test, race risk, benchmark, profile, allocation claim, or performance regression needs proof | `references/verification-evidence.md` |

Select exactly one mode. Start with `public-contract` when the request has no more specific route; combine modes only for a user-requested pass sequence.

## Workflow

1. Inspect `go.mod`, the affected package, its callers and tests, and repository-defined verification commands.
2. Select one mode and read only its reference. For version-sensitive behavior, check live `go version`, installed `go help` or `go doc`, then primary Go documentation if needed.
3. State the contract, lifetime, or evidence boundary before changing code; choose the smallest shape that preserves it.
4. Run the focused repository check that exercises the selected boundary and report what it proves.

## Hard rules

- Export only a deliberately supported contract; do not add exported APIs or producer-side interfaces solely for tests.
- Give every goroutine an owner, a stop condition, cancellation propagation, and an observable failure path when it can fail.
- Treat error inspectability and dependency leakage as public API commitments, not incidental implementation details.
- Do not make a performance change without comparable evidence from the intended workload.
- Mark version behavior or compatibility as unconfirmed instead of guessing.

## Stop conditions

- Ask for direction when an internal change versus a supported compatibility commitment would materially change the result.
- If source state or the applicable Go toolchain cannot be inspected, report the blocked verification rather than inventing version-level guidance.

## Output

Return the selected mode, local facts inspected, the resulting Go decision or changed boundary, focused verification, and residual risk.
