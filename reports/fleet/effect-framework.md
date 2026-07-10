# Fleet acceptance — effect-framework

## Verdict

**PACKAGE-CONFORMS.** The eight Effect sources now have one six-mode suite. Package-level acceptance passes; composition-dependent items remain deferred because this wave does not touch bundles or providers.

## Result

- Canonical home: `shared/general/effect-framework`
- Archetype: mode suite with `system-shape`, `runtime-lifecycle`, `failure-boundary`, `concurrency-flow`, `test-proof`, and `migration`.
- Final package: 115 text lines / 8,146 bytes.
- Replaced source total: 537 text lines across eight source packages; net shrink: 422 lines.
- Canonical pre-rewrite owner and all seven absorbed source packages are preserved under `archive/triage-2026-07/shared/general/`.

## Collision matrix

| Claimed phrase or legacy invocation | First owner | Nearest competitor | Discriminator / precedence |
| --- | --- | --- | --- |
| `effect-framework-architecture`, `Context.Service`, Layer, service boundary | `effect-framework` → `system-shape` | `code-quality` | Effect requirement visibility, Layer composition, or adapter isolation is the deciding artifact. |
| `effect-framework-runtime-resources`, Scope, runtime, resource shutdown | `effect-framework` → `runtime-lifecycle` | `code-quality` | Effect runtime ownership, finalizers, or scoped lifecycle wins over generic TypeScript diagnosis. |
| `effect-framework-errors`, typed error, Exit, Cause | `effect-framework` → `failure-boundary` | `code-quality` | Typed Effect failure vocabulary and boundary inspection are the decision surface. |
| `effect-framework-concurrency-streams`, Fiber, Queue, Stream, Schedule | `effect-framework` → `concurrency-flow` | `code-quality` | Fiber ownership, cancellation, backpressure, or schedule policy is Effect-specific. |
| `effect-framework-testing`, `@effect/vitest`, test layer | `effect-framework` → `test-proof` | `code-quality` | Effect requirements, scoped cleanup, or deterministic Effect time need the language suite. |
| `effect-framework-migration`, v3-to-v4, stale Effect example | `effect-framework` → `migration` | `code-quality` | Installed Effect package/API compatibility is the artifact; generic source refactoring stays with `code-quality`. |
| TypeScript bug or source diagnosis without an Effect artifact | `code-quality` | `effect-framework` | `code-quality` wins unless an Effect service, runtime, error, fiber, test layer, or migration boundary is concrete. |
| Desired-versus-live infrastructure failure | `infra-bundles` | `effect-framework` | Cluster/IaC state is not an Effect framework decision. |

## A34 preservation ledger

| Replaced source | Qualifying non-default delta | Disposition |
| --- | --- | --- |
| old `effect-framework` router | Surface selection, installed-version-first posture, and Effect-specific risk/verification output | Kept in `SKILL.md` route, workflow, precedence, and output; routed-child catalog dropped. |
| `effect-framework-architecture` | Visible Effect requirements until composition; one application layer; adapter/domain isolation; execution only at edges | Kept in `SKILL.md` hard rules and `references/skill-map.md`. |
| `effect-framework-services-layers` | Capability-shaped contracts, explicit Live/Test layers, resourceful layer lifecycle, legible graph | Kept in `references/skill-map.md`; static constructor/API examples dropped as volatile manual material. |
| `effect-framework-runtime-resources` | Explicit runtime owner, acquire/release pairing, finalizer reachability, framework runtime disposal | Kept in `references/runtime-lifecycle.md`. |
| `effect-framework-errors` | Typed expected failures, stable dependency translation, aggregate failure inspection only at boundaries, visible retry policy | Kept in `references/failure-boundary.md`; the sample error class dropped as framework API example. |
| `effect-framework-concurrency-streams` | Parent-owned default, explicit detached ownership, bounded pressure semantics, observed cancellation/failure | Kept in `references/concurrency-flow.md`; primitive catalog dropped as a volatile external manual. |
| `effect-framework-testing` | Explicit test layers, deterministic time, owned test dependencies, scoped runtime cleanup | Kept in `references/test-proof.md`; runner-specific sample syntax dropped. |
| `effect-framework-migration` | Installed-version evidence, local migration classification, no stale examples, unstable/compatibility imports behind adapters | Kept in `references/migration.md`; version-specific rename matrix dropped under the volatility policy. |

## A35 archive inventory

| Original | Archive path | Archived text lines |
| --- | --- | ---: |
| `effect-framework` | `archive/triage-2026-07/shared/general/effect-framework` | 107 |
| `effect-framework-architecture` | `archive/triage-2026-07/shared/general/effect-framework-architecture` | 66 |
| `effect-framework-concurrency-streams` | `archive/triage-2026-07/shared/general/effect-framework-concurrency-streams` | 59 |
| `effect-framework-errors` | `archive/triage-2026-07/shared/general/effect-framework-errors` | 67 |
| `effect-framework-migration` | `archive/triage-2026-07/shared/general/effect-framework-migration` | 51 |
| `effect-framework-runtime-resources` | `archive/triage-2026-07/shared/general/effect-framework-runtime-resources` | 61 |
| `effect-framework-services-layers` | `archive/triage-2026-07/shared/general/effect-framework-services-layers` | 66 |
| `effect-framework-testing` | `archive/triage-2026-07/shared/general/effect-framework-testing` | 60 |
| **Total** |  | **537** |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The delta is an Effect-specific ownership policy for requirements, runtimes, typed failures, fibers, and proof—not generic TypeScript advice. |
| A02 | PASS | The approved language-pack consolidation retains one repeatable Effect decision owner rather than seven competing entries. |
| A03 | PASS | The collision matrix assigns Effect artifacts to this suite and generic source diagnosis to `code-quality`. |
| A04 | PASS | Exactly one mode suite. |
| A05 | PASS | Canonical directory and unique `name: effect-framework` match; validator confirms uniqueness. |
| A06 | PASS | Frontmatter contains only name and one-line description. |
| A07 | PASS | The two-sentence description is one physical line and 251 bytes, below the 320-character suite cap. |
| A08 | PASS | The description names differentiated Effect surfaces and ends with six concrete selection signals. |
| A09 | PASS | The collision matrix includes every absorbed legacy surface and neighboring-owner precedence. |
| A10 | PASS | No greedy trigger or implicit interaction mode remains. |
| A11 | PASS | `SKILL.md` is 49 lines and validator passes the suite limits. |
| A12 | PASS | Active instructions contain only routing, shared workflow, non-default rules, stops, precedence, and output. |
| A13 | PASS | Six route rows each select one exact, existing reference and require only that selected reference. |
| A14 | PASS | Each reference is 11 lines; the 115-line / 8,146-byte package is below all hard limits. |
| A15 | DEFERRED | Bundle/provider duplication and exposure are outside the permitted scope; canonical consolidation is not claimed as catalog proof. |
| A16 | PASS | Six modes share the Effect service/runtime/failure lifecycle and stay below the eight-mode limit. |
| A17 | PASS | Distinct kebab-case mode names route to exact files and select one by default. |
| A18 | N/A | This package is a suite, not a router. |
| A19 | N/A | This package is a suite, not a router. |
| A20 | PASS | Workflow requires installed packages/lockfile/types, then live help, then primary Effect documentation. |
| A21 | PASS | API samples, rename matrices, primitive catalogs, and static external manuals were removed. |
| A22 | N/A | No volatile value is pinned as a pack constraint. |
| A23 | PASS | No credential-shaped content exists. |
| A24 | PASS | No secret discovery or reporting workflow exists. |
| A25 | PASS | No literal user-home path appears; validator portability check passes. |
| A26 | PASS | Missing version evidence blocks a migration/API claim instead of permitting a guess. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets or provider metadata. |
| A29 | PASS | Rules preserve concrete ownership, lifecycle, error, and pressure invariants without tutorial filler. |
| A30 | DEFERRED | Canonical/bundle/provider parity awaits the explicitly deferred composition phase. |
| A31 | DEFERRED | Local route files and no-internal-symlink checks pass; compose and installed-view checks await the composition phase. |
| A32 | PASS | Rechecked against accepted pilot artifacts `reports/pilot/code-quality.md` (suite mode-table/selected-reference shape) and `reports/pilot/herdr.md` (compact non-inferable safety boundary); this suite keeps only Effect ownership deltas. |
| A33 | PASS | 115 is strictly smaller than 537 and below the 1,200-line consolidated-owner cap. |
| A34 | PASS | The preservation ledger accounts for every qualifying delta of all eight sources. |
| A35 | PASS | The archive inventory proves exact pre-rewrite originals, including the retained owner, are in the required archive tree. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/effect-framework suite
PASS: shared/general/effect-framework (suite)
```
