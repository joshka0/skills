# Catalog conformance — 2026-07-13

## Verdict

**CATALOG-CONFORMS.** The catalog retains 26 retained canonical slots, 115
owner-bound aliases, six external records, and five provider-native exceptions.
All seven live provider views are exact content-and-mode matches for a fresh
full catalog render. This report supersedes `CATALOG-CONFORMS.md`.

The verdict covers the current generated real-file distribution. Phase 6 may
trial per-skill symlink distribution, but no result is assumed here; archetype,
alias, membership, consumer-union, validation, and rubric governance remain the
same under either delivery model.

## Catalog composition

- `catalog/pack.json` is the sole active composition declaration.
- Locally owned bodies come from `shared/`; provider-owned exceptions come from
  `native/`; imported material under `mirrors/` is not implicitly composed.
- `bin/pack render --all --full` is the parity authority. No provider snapshot
  or copied bundle body participates in composition.
- Codex consumes the Agents and Codex views together. Exactly 20 named
  canonical overlaps are allowed, and only while both copies remain identical
  to the same canonical source. Other consumers reject duplicates.
- The Chrome extension delta is a routed reference under `product-platform`;
  `chrome-extension-builder` is an alias, not a retained package.
- The local credential-handoff delta is the `local-dev` secrets mode;
  `local-secrets` is an alias, not a retained package.

## Provider results

| Provider | Canonical | Native | Entries | Result |
| --- | ---: | ---: | ---: | --- |
| `agents` | 20 | 2 | 22 | PASS |
| `claude` | 26 | 0 | 26 | PASS |
| `codex` | 20 | 1 | 21 | PASS |
| `droid` | 20 | 0 | 20 | PASS |
| `factory` | 20 | 0 | 20 | PASS |
| `gemini` | 20 | 0 | 20 | PASS |
| `gemini-antigravity` | 20 | 2 | 22 | PASS |

The five declared native surfaces are Agents `agent-vault-cli` and
`agent-vault-http`, Codex `.system`, and Gemini Antigravity
`heroui-pro-design-taste` and `heroui-react-pro`. No canonical package is
classified as native.

## Catalog-only checklist results

The table records the composition result for every retained package. `N/A` is
correct for A19 when the package is not a router.

| Package | Exposed by | A15 | A19 | A30 | A31 |
| --- | --- | --- | --- | --- | --- |
| `agent-orchestration` | all seven | PASS | N/A | PASS | PASS |
| `caveman` | Claude | PASS | N/A | PASS | PASS |
| `code-quality` | all seven | PASS | N/A | PASS | PASS |
| `crew` | Claude | PASS | N/A | PASS | PASS |
| `design-family` | all seven | PASS | N/A | PASS | PASS |
| `effect-framework` | all seven | PASS | N/A | PASS | PASS |
| `elixir-lang` | all seven | PASS | N/A | PASS | PASS |
| `git-guardrails-claude-code` | Claude | PASS | N/A | PASS | PASS |
| `go-lang` | all seven | PASS | N/A | PASS | PASS |
| `goal-protocol` | all seven | PASS | N/A | PASS | PASS |
| `grill-me` | Claude | PASS | N/A | PASS | PASS |
| `gtr` | all seven | PASS | N/A | PASS | PASS |
| `herdr` | all seven | PASS | N/A | PASS | PASS |
| `infra-bundles` | all seven | PASS | PASS | PASS | PASS |
| `local-dev` | all seven | PASS | N/A | PASS | PASS |
| `local-http-browser-use` | all seven | PASS | N/A | PASS | PASS |
| `maestri` | all seven | PASS | N/A | PASS | PASS |
| `peon-ping` | Claude | PASS | N/A | PASS | PASS |
| `planning-workflow` | all seven | PASS | N/A | PASS | PASS |
| `product-platform` | all seven | PASS | PASS | PASS | PASS |
| `prototype` | all seven | PASS | N/A | PASS | PASS |
| `release-bundles` | all seven | PASS | N/A | PASS | PASS |
| `repoprompt-pro-review` | all seven | PASS | N/A | PASS | PASS |
| `riff-partner` | Claude | PASS | N/A | PASS | PASS |
| `skill-authoring` | all seven | PASS | N/A | PASS | PASS |
| `uniwind` | all seven | PASS | N/A | PASS | PASS |

### A15 — no duplicate or orphan instruction surface

Every generated non-native package resolves to one catalog row and one
canonical source. The catalog has 26 unique canonical names. Compatibility
names are alias records rather than copied packages; the Chrome and local
secrets deltas resolve to their retained owners. The five non-canonical
surfaces are exhaustively declared native exceptions.

### A19 — router exposure

`infra-bundles` and `product-platform` route one hop to selected references,
not separately exposed child packages. The former Chrome child package is
absent from every provider. No default view co-exposes a router and a routed
child.

### A30 — canonical/catalog/render/provider parity

The pre-apply full render differed from live providers at exactly 130 paths.
Every path belonged to the accepted Phase 3 allowlist:
`agent-orchestration`, `crew`, `chrome-extension-builder`, `gtr`, `herdr`,
`local-dev`, `product-platform`, `release-bundles`, or `skill-authoring`.
Unexpected drift was zero. The complete provider tree was then atomically
exchanged; a fresh render has zero content-or-mode differences from live.

### A31 — applied and consumed views

The reviewed render and applied tree have the same seven entry counts shown
above. The atomic path built a complete sibling candidate, exchanged the whole
provider root, moved the displaced tree to Trash, and left no stage directory.
The consumed-root validator passes the Codex Agents-plus-Codex union and all
single-root consumers. Provider names and frontmatter names remain unique per
physical view.

## Collision matrix

| Request or artifact | First owner | Nearest competitor | Discriminator or handoff |
| --- | --- | --- | --- |
| Browser extension runtime, MV3 worker, content script, permissions | `product-platform` browser-extension target | `design-family` | Runtime/security architecture selects Product Platform; visual intent selects Design Family. |
| Legacy Chrome skill name | `product-platform` alias | none | Alias selects the routed reference; no standalone exposure exists. |
| Local secret handoff | `local-dev` secrets mode | Agents native credential tools | Exact Agent Vault operation selects the native tool; generic local handoff selects Local Dev. |
| Store credential evidence | `release-bundles` | `local-dev` secrets mode | Release owns readiness evidence; Local Dev owns value-free injection only. |
| Crew campaign | `crew` | `agent-orchestration` | Explicit Crew/sustained convergence selects Crew; bounded dispatch selects Agent Orchestration. |
| Skill or catalog acceptance | `skill-authoring` | `code-quality` | Skill package/archetype/catalog artifact selects Skill Authoring. |

## A01–A35 acceptance

- **A01–A04 PASS:** every slot retains a recurring non-default delta and exactly
  one archetype. The two merges that failed standalone need remain selectable
  as owner-bound aliases.
- **A05–A10 PASS:** all names, homes, frontmatter, description budgets, trigger
  ownership, and explicit interaction boundaries pass the catalog validator and
  the collision matrix above.
- **A11–A14 PASS:** all 26 package validators pass; 101 local package links
  resolve; package and reference budgets pass.
- **A15 PASS:** catalog ownership and generated exposure are complete and
  non-overlapping as recorded above.
- **A16–A19 PASS/N/A:** suites and routers have valid mode/target counts,
  selected references, one-hop routing, and no router-child co-exposure.
- **A20–A29 PASS:** the accepted packages retain live-source order, portable
  paths, value-free secret handling, reachable support files, concrete safety
  rules, and no copied volatile manual surface. Secret scan findings are zero.
- **A30–A31 PASS:** catalog, render, provider, native, and consumed-root parity
  pass after the atomic apply.
- **A32 PASS:** the package set validates against the normative skill-authoring
  contract and its accepted pilot shapes.
- **A33 PASS/N/A:** the Phase 3 Chrome consolidation strictly shrank its combined
  owner; no Phase 4 skill body was rewritten.
- **A34 PASS:** Phase 3 records the semantic preservation ledgers. Phase 4
  preserved all four pre-regeneration governing documents under
  `history/rebuild-2026-07/phase-4/pre-regeneration/` and retained the prior
  catalog report as explicitly superseded history.
- **A35 PASS/N/A:** Phase 3 archives all rewritten skill originals. Phase 4
  touched no canonical skill content.

## Validation evidence

```text
PASS package validators: 26/26
PASS catalog validator
PASS local package links inspected: 101
PASS no repo-internal symlinks
PASS secret scan: 0 findings across 206 blobs
PASS declarative catalog: 26 skills, 121 aliases/external records
PASS provider-native exceptions: 5
PASS consumed-root unions validated, including declared Codex Agents+Codex overlap
PASS render-and-compare parity: 7 live providers
```

The validator retains one non-blocking warning for Caveman routing clarity. The
final Phase 4 check result is recorded in the Phase 4 campaign report.
