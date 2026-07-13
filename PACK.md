# joshka0 Skills Pack

Catalog snapshot: 2026-07-13. `catalog/pack.json` is the composition source of
truth for 26 canonical packages, 115 owner-bound aliases, six external records,
five provider-native exceptions, one selectable `core` profile across seven
provider views, and five executable-consumer models.

## Layer model

| Path | Catalog role |
| --- | --- |
| `shared/general` | Canonical cross-provider packages. |
| `shared/claude` | Canonical Claude-specific package source. |
| `mirrors/` | Imported upstream evidence; never an implicit live source. |
| `catalog/pack.json` | Package metadata, aliases, profiles, exceptions, executable consumers, ordered roots, and evidence. |
| `native/agents` | Agents-owned exception sources. |
| `native/codex` | Codex-owned system source. |
| `native/gemini-antigravity` | Gemini Antigravity marketplace sources. |
| `providers/` | Current generated live views; rebuilt only by atomic apply. |
| `history/rebuild-2026-07` | Dated retired inputs and preservation ledgers. |
| `bin/pack` | Sole active check/render/apply/install entrypoint. |

Phase 6 was killed: direct per-skill links would remove the validated promotion
boundary, and provider views are not one-to-one with executable consumers. A
future registry proposal is a separate export-only experiment.

## Provider results

All counts are derived from current `core` membership plus catalog-declared
native exceptions.

| Provider | Entries | Canonical | Native |
| --- | ---: | ---: | ---: |
| `agents` | 22 | 20 | 2 |
| `claude` | 26 | 26 | 0 |
| `codex` | 21 | 20 | 1 |
| `droid` | 20 | 20 | 0 |
| `factory` | 20 | 20 | 0 |
| `gemini` | 20 | 20 | 0 |
| `gemini-antigravity` | 22 | 20 | 2 |

Current generated sources are `providers/agents`, `providers/claude`,
`providers/codex`, `providers/droid`, `providers/factory`, `providers/gemini`,
and `providers/gemini-antigravity`.

## Executable consumers and install roots

| Executable consumer / view | Ordered install root | Generated source |
| --- | --- | --- |
| Shared root for Codex and Gemini CLI | `$HOME/.agents/skills` | `providers/agents` |
| Claude Code | `$HOME/.claude/skills` | `providers/claude` |
| Codex-specific | `${CODEX_HOME:-$HOME/.codex}/skills` (fallback `$HOME/.codex/skills`) | `providers/codex` |
| Droid | `$HOME/.factory/skills` | `providers/factory` |
| Gemini-specific | `$HOME/.gemini/skills` | `providers/gemini` |
| Google Antigravity IDE | `$HOME/.gemini/config/skills` | `providers/gemini-antigravity` |

Codex co-loads its two roots and requires its 20 overlaps to remain identical.
Gemini loads the Gemini root then the higher-precedence Agents root, also with
20 identical overlaps. The latter union exposes both Agent Vault packages;
whether to retain that exposure is an open owner decision. `providers/droid`
is retained as a legacy generated compatibility view while the one supported
Droid loader maps to the Factory root.

## Canonical catalog

| Archetype | Packages |
| --- | --- |
| Suite | `agent-orchestration`, `code-quality`, `design-family`, `effect-framework`, `elixir-lang`, `go-lang`, `goal-protocol`, `local-dev`, `maestri`, `planning-workflow`, `prototype`, `release-bundles`, `skill-authoring` |
| Router | `infra-bundles`, `product-platform` |
| Leaf | `crew`, `uniwind` |
| Private leaf | `git-guardrails-claude-code`, `gtr`, `herdr`, `local-http-browser-use`, `peon-ping`, `repoprompt-pro-review` |
| Explicit interaction | `caveman`, `grill-me`, `riff-partner` |

Twenty packages are common to every provider. Claude additionally receives
`caveman`, `crew`, `git-guardrails-claude-code`, `grill-me`, `peon-ping`, and
`riff-partner`. `chrome-extension-builder` is an alias routed to the
`product-platform` browser-extension reference; `local-secrets` is an alias for
the `local-dev` secrets mode.

Language suites (`effect-framework`, `elixir-lang`, and `go-lang`) remain in
every default profile. Any future removal proposal must use the catalog's
blinded paired-task method, not usage counts alone.

## Provider-native exceptions

| Generated surface | Canonical native source | Reason |
| --- | --- | --- |
| `providers/agents/agent-vault-cli` | `native/agents/agent-vault-cli` | Agents credential broker. |
| `providers/agents/agent-vault-http` | `native/agents/agent-vault-http` | Agents credential proxy. |
| `providers/codex/.system` | `native/codex/.system` | Codex-owned system packages. |
| `providers/gemini-antigravity/heroui-pro-design-taste` | `native/gemini-antigravity/heroui-pro-design-taste` | Provider marketplace package. |
| `providers/gemini-antigravity/heroui-react-pro` | `native/gemini-antigravity/heroui-react-pro` | Provider marketplace package. |

No canonical package is provider-native.

## Operations and acceptance

```sh
bin/pack check
bin/pack render --all --full
bin/pack apply --all --full
bin/pack install
bin/pack install --apply
```

Render before apply and inspect the exact content/mode delta. Apply exchanges a
complete provider tree atomically and moves the displaced tree to Trash. The
current catalog verdict is recorded in
`reports/catalog/CATALOG-CONFORMS-2026-07-13.md`.
