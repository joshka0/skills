# Fleet acceptance — elixir-lang

## Verdict

**PACKAGE-CONFORMS.** The seven Elixir/OTP sources now have one six-mode suite. Package-level acceptance passes; composition-dependent items remain deferred because this wave does not touch bundles or providers.

## Result

- Canonical home: `shared/general/elixir-lang`
- Archetype: mode suite with `otp-shape`, `process-topology`, `concurrent-flow`, `failure-signals`, `test-boundaries`, and `runtime-evidence`.
- Final package: 117 text lines / 8,793 bytes.
- Replaced source total: 457 text lines across seven source packages; net shrink: 340 lines.
- Canonical pre-rewrite owner and all six absorbed source packages are preserved under `archive/triage-2026-07/shared/general/`.

## Collision matrix

| Claimed phrase or legacy invocation | First owner | Nearest competitor | Discriminator / precedence |
| --- | --- | --- | --- |
| `elixir-lang-otp-design`, plain module versus process, application topology, CQRS | `elixir-lang` → `otp-shape` | `code-quality` | A BEAM process/failure/ownership topology is the decision artifact. |
| `elixir-lang-supervision-processes`, GenServer, Supervisor, Registry, DynamicSupervisor | `elixir-lang` → `process-topology` | `code-quality` | OTP lifecycle, restart relationship, mailbox, or named entity behavior wins. |
| `elixir-lang-concurrency-pipelines`, Task, Broadway, PubSub, backpressure | `elixir-lang` → `concurrent-flow` | `code-quality` | BEAM delivery, pacing, acknowledgement, or task ownership is the surface. |
| `elixir-lang-fault-observability`, let-it-crash, `:telemetry`, trace propagation | `elixir-lang` → `failure-signals` | `code-quality` | Crash/restart policy and BEAM signal contracts are language-specific. |
| `elixir-lang-testing`, ExUnit, `start_supervised!`, Mox, StreamData | `elixir-lang` → `test-boundaries` | `code-quality` | OTP ownership/cleanup, behavioural seams, or generated Elixir laws need this suite. |
| `elixir-lang-performance-interop`, ETS, mailbox, NIF, port, macro cost | `elixir-lang` → `runtime-evidence` | `code-quality` | BEAM runtime ownership or native-VM risk is the decision surface. |
| Source-code diagnosis without a BEAM/OTP artifact | `code-quality` | `elixir-lang` | `code-quality` wins unless a process, supervisor, pipeline, failure signal, or runtime boundary is concrete. |
| Desired-versus-live infrastructure failure | `infra-bundles` | `elixir-lang` | Cluster/IaC state is not an Elixir language decision. |

## A34 preservation ledger

| Replaced source | Qualifying non-default delta | Disposition |
| --- | --- | --- |
| old `elixir-lang` router | BEAM-surface selection, process-first defaults, installed-version posture, and runtime-risk output | Kept in `SKILL.md` route, workflow, precedence, and output; routed-child catalog dropped. |
| `elixir-lang-otp-design` | Process only for a runtime property; application tree as ownership map; event history/CQRS/umbrella only for real lifecycle or replay need | Kept in `references/skill-map.md`; decision catalog dropped as generic manual material. |
| `elixir-lang-supervision-processes` | Public protocol before callbacks; restart relationship; local naming; mailbox/idle lifecycle; no slow work in a mailbox owner | Kept in `references/process-topology.md`. |
| `elixir-lang-concurrency-pipelines` | Bounded supervised finite work; demand only when central; durable-ingestion distinction; PubSub non-durability; explicit pacing and shutdown | Kept in `references/concurrent-flow.md`; primitive catalog dropped. |
| `elixir-lang-fault-observability` | Expected outcome versus crash boundary; reconstructable supervisor recovery; bounded dependency protection; portable low-cardinality telemetry and explicit context propagation | Kept in `references/failure-signals.md`. |
| `elixir-lang-testing` | Test-owned OTP cleanup, safe async boundary, behaviours/fakes instead of arbitrary internals, explainable properties, and contract proof | Kept in `references/test-boundaries.md`; test-library tutorial/catalog dropped. |
| `elixir-lang-performance-interop` | Workload-first BEAM evidence; ETS ownership/recovery; mailbox and binary pressure; port-over-NIF isolation; hibernation/macro constraints | Kept in `references/runtime-evidence.md`; static runtime-option and native API manuals dropped under volatility policy. |

## A35 archive inventory

| Original | Archive path | Archived text lines |
| --- | --- | ---: |
| `elixir-lang` | `archive/triage-2026-07/shared/general/elixir-lang` | 98 |
| `elixir-lang-concurrency-pipelines` | `archive/triage-2026-07/shared/general/elixir-lang-concurrency-pipelines` | 64 |
| `elixir-lang-fault-observability` | `archive/triage-2026-07/shared/general/elixir-lang-fault-observability` | 59 |
| `elixir-lang-otp-design` | `archive/triage-2026-07/shared/general/elixir-lang-otp-design` | 56 |
| `elixir-lang-performance-interop` | `archive/triage-2026-07/shared/general/elixir-lang-performance-interop` | 59 |
| `elixir-lang-supervision-processes` | `archive/triage-2026-07/shared/general/elixir-lang-supervision-processes` | 63 |
| `elixir-lang-testing` | `archive/triage-2026-07/shared/general/elixir-lang-testing` | 58 |
| **Total** |  | **457** |

## Acceptance checklist

| Item | Result | Evidence |
| --- | --- | --- |
| A01 | PASS | The delta is a BEAM-specific policy for runtime ownership, supervision, delivery, failure signals, and measurable VM/native risk—not generic Elixir style. |
| A02 | PASS | The approved language-pack consolidation retains one repeatable Elixir/OTP decision owner rather than seven competing entries. |
| A03 | PASS | The collision matrix assigns BEAM artifacts to this suite and generic source diagnosis to `code-quality`. |
| A04 | PASS | Exactly one mode suite. |
| A05 | PASS | Canonical directory and unique `name: elixir-lang` match; validator confirms uniqueness. |
| A06 | PASS | Frontmatter contains only name and one-line description. |
| A07 | PASS | The two-sentence description is one physical line and 273 bytes, below the 320-character suite cap. |
| A08 | PASS | The description names differentiated OTP surfaces and ends with six concrete selection signals. |
| A09 | PASS | The collision matrix includes every absorbed legacy surface and neighboring-owner precedence. |
| A10 | PASS | No greedy trigger or implicit interaction mode remains. |
| A11 | PASS | `SKILL.md` is 50 lines and validator passes the suite limits. |
| A12 | PASS | Active instructions contain only routing, shared workflow, non-default rules, stops, precedence, and output. |
| A13 | PASS | Six route rows each select one exact, existing reference and require only that selected reference. |
| A14 | PASS | References are 11–12 lines; the 117-line / 8,793-byte package is below all hard limits. |
| A15 | DEFERRED | Bundle/provider duplication and exposure are outside the permitted scope; canonical consolidation is not claimed as catalog proof. |
| A16 | PASS | Six modes share the BEAM ownership/failure lifecycle and stay below the eight-mode limit. |
| A17 | PASS | Distinct kebab-case mode names route to exact files and select one by default. |
| A18 | N/A | This package is a suite, not a router. |
| A19 | N/A | This package is a suite, not a router. |
| A20 | PASS | Workflow requires `mix.exs`/lockfile, then live help, then primary Elixir/Erlang documentation for volatile facts. |
| A21 | PASS | Primitive catalogs, static runtime-option matrices, NIF/API manuals, and test-library tutorials were removed. |
| A22 | N/A | No volatile value is pinned as a pack constraint. |
| A23 | PASS | No credential-shaped content exists. |
| A24 | PASS | No secret discovery or reporting workflow exists. |
| A25 | PASS | No literal user-home path appears; validator portability check passes. |
| A26 | PASS | Missing installed/runtime evidence blocks a version or behavior claim instead of permitting a guess. |
| A27 | N/A | No scripts. |
| A28 | N/A | No assets or provider metadata. |
| A29 | PASS | Rules preserve concrete topology, lifecycle, delivery, telemetry, and runtime-evidence invariants without tutorial filler. |
| A30 | DEFERRED | Canonical/bundle/provider parity awaits the explicitly deferred composition phase. |
| A31 | DEFERRED | Local route files and no-internal-symlink checks pass; compose and installed-view checks await the composition phase. |
| A32 | PASS | Rewritten against the full rubric, `go-lang` suite golden package/report, and the `infra-bundles` pilot report; rubric took precedence. |
| A33 | PASS | 117 is strictly smaller than 457 and below the 1,200-line consolidated-owner cap. |
| A34 | PASS | The preservation ledger accounts for every qualifying delta of all seven sources. |
| A35 | PASS | The archive inventory proves exact pre-rewrite originals, including the retained owner, are in the required archive tree. |

## Validation evidence

```text
$ bin/validate-skill.sh shared/general/elixir-lang suite
PASS: shared/general/elixir-lang (suite)
```
