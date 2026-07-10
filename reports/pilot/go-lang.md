# Pilot acceptance — go-lang (revision)

## Verdict

**PACKAGE-CONFORMS.** The user explicitly decided to keep one merged Go entry, with the door open to cut it if the narrow owner proves unnecessary. Catalog checks remain deferred because bundle/provider composition is outside this task.

## Result

- Canonical home: `shared/general/go-lang`
- Archetype: mode suite with `public-contract`, `goroutine-lifetime`, and `verification-evidence`.
- Final package: 103 text lines / 6,886 bytes; seven replaced packages: 476 text lines.
- Net shrink: 373 lines.
- Validator: `PASS: shared/general/go-lang (suite)`

## Collision matrix

| Claimed phrase or artifact | First owner | Nearest competitor | Discriminator / precedence |
| --- | --- | --- | --- |
| exported Go API or error boundary | `go-lang` → `public-contract` | `code-quality` architecture/refactor | Go caller-facing support and error-inspection contract. |
| goroutine, channel, cancellation, race | `go-lang` → `goroutine-lifetime` | `code-quality` diagnose | Go lifetime/ownership/concurrency decision, not generic diagnosis. |
| benchmark or Go performance regression | `go-lang` → `verification-evidence` | `code-quality` diagnose | Go artifact wins; non-Go diagnosis goes to `code-quality`. |
| Kubernetes/IaC desired-live failure | `infra-bundles` | `go-lang` / `code-quality` | Infrastructure operating evidence, not language verification. |

The description carries the Go-specific performance precedence before load; `code-quality` carries the complementary non-Go rule.

## A34 preservation ledger

| Replaced source | Qualifying non-default delta | Disposition |
| --- | --- | --- |
| old `go-lang` router | Surface selection and repository/live-doc volatility order | Kept in `SKILL.md` route and workflow; old routed-child catalog dropped. |
| `go-lang-design` | Consumer-side interfaces, concrete defaults, deliberate exported embedding/constructors | Kept in `references/public-contract.md`; pattern catalog dropped as generic. |
| `go-lang-errors` | Intentional error inspection and dependency-boundary translation | Kept in `references/public-contract.md`. |
| `go-lang-packages-api` | Export/support commitment, package caller role, additive compatibility posture | Kept in `references/public-contract.md`. |
| `go-lang-concurrency` | Goroutine owner, stop path, cancellation, bounded work, channel-close and ordering ownership | Kept in `references/goroutine-lifetime.md`. |
| `go-lang-performance` | Baseline-first measurement and comparable verification before complexity | Kept in `references/verification-evidence.md`; static tool-command catalog dropped under volatility policy. |
| `go-lang-testing` | Observable behavior, deterministic concurrency evidence, race and benchmark proof | Kept in `references/verification-evidence.md`; framework/tool catalog dropped as generic/volatile. |

## A35 archive-in-place originals

The pre-rewrite originals exist at `archive/triage-2026-07/shared/general/go-lang/`, `.../go-lang-concurrency/`, `.../go-lang-design/`, `.../go-lang-errors/`, `.../go-lang-packages-api/`, `.../go-lang-performance/`, and `.../go-lang-testing/`.

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The narrow delta is a pack decision policy for Go public contracts, lifetime ownership, and proof boundaries—not a Go tutorial. |
| A02 | PASS | User explicitly decided KEEP: one merged Go owner remains despite zero observed use, with a later CUT decision left open. |
| A03 | PASS | Collision matrix separates Go artifact work from code-quality and infrastructure owners. |
| A04 | PASS | Exactly one mode suite. |
| A05 | PASS | Canonical directory/name match; validator confirms uniqueness. |
| A06 | PASS | Minimal frontmatter. |
| A07 | PASS | One-line, two-sentence suite description within 320 characters. |
| A08 | PASS | Description states Go decision policy and concrete Go-artifact signals plus non-Go handoff. |
| A09 | PASS | Collision matrix establishes Go performance precedence and neighboring handoffs. |
| A10 | PASS | No greedy catch-all Go claim or implicit interaction behavior. |
| A11 | PASS | Validator passed suite budget. |
| A12 | PASS | Active file contains route, common workflow, durable rules, stops, output, and precedence only. |
| A13 | PASS | Three exact selected references resolve. |
| A14 | PASS | 103-line package and each reference are within hard budgets. |
| A15 | DEFERRED | Canonical package is non-duplicated; bundle/provider copies remain outside scope. |
| A16 | PASS | Three modes share Go package decision lifecycle. |
| A17 | PASS | Distinct kebab-case routes select one reference by default. |
| A18 | N/A | Not a router. |
| A19 | N/A | Not a router. |
| A20 | PASS | Repository state, live Go tools, then primary docs govern volatile details. |
| A21 | PASS | Generic language tutorial and static command catalog were removed. |
| A22 | N/A | No pinned volatile pack constraint. |
| A23 | PASS | No secret-bearing content. |
| A24 | PASS | Verification output uses evidence rather than secret discovery. |
| A25 | PASS | No literal user home path. |
| A26 | PASS | Missing source/toolchain evidence blocks version-level claims. |
| A27 | PASS | No scripts. |
| A28 | PASS | No assets or provider metadata. |
| A29 | PASS | Rules preserve public contract, concurrency, error, and measurement invariants without filler. |
| A30 | DEFERRED | Canonical/bundle/provider parity awaits permitted composition. |
| A31 | DEFERRED | Compose dry run and installed-view checks await that pass; validator covers local links and symlinks. |
| A32 | PASS | Revised against both converged reviews, the code-quality golden suite, and the updated rubric. |
| A33 | PASS | 103 < 476 and under the package cap. |
| A34 | PASS | Preservation ledger above accounts for all seven merged Go sources. |
| A35 | PASS | Archive-in-place originals are listed above. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/go-lang suite
PASS: shared/general/go-lang (suite)
```
