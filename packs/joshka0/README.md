# joshka0 Skills Pack

This directory is the publishable human-readable view of the current pack. The
composition authority is `catalog/pack.json`: 26 canonical packages, 115
owner-bound aliases, six external records, five provider-native exceptions,
one selectable `core` profile, seven provider views, and five executable-consumer models.

## Current model

```text
shared/             canonical locally owned packages
mirrors/            imported evidence, never implicit composition input
catalog/pack.json   archetypes, aliases, core membership, native exceptions, consumers
native/<provider>/  provider-owned exception sources
providers/          current generated live provider views
history/            retired inputs and dated preservation evidence
bin/pack             sole check/render/apply/install entrypoint
```

`providers/` is generated output rather than semantic source. Phase 6 was
killed; a future registry proposal must be an export-only experiment that does
not replace the current render/apply boundary.

## Canonical families and aliases

| Surface | Current owner |
| --- | --- |
| Product and platform | `product-platform` routes mobile, Expo, Uniwind migration, terminal UI, and browser-extension work. |
| Interface design | `design-family` owns build, review, improve, motion, Apple-physicality, and Impeccable-depth modes. |
| Mobile-store release | `release-bundles` owns build, quality, metadata, safety, commerce, access, and submission evidence. |
| Kubernetes and IaC | `infra-bundles` routes desired/live operations and platform decisions. |
| Code quality | `code-quality` owns diagnosis, tests, refactoring, architecture, and merge-readiness modes. |
| Local operation | `local-dev`, `gtr`, `herdr`, `maestri`, and other precise leaves own their named tools or topology. |

Aliases preserve useful legacy selection signals without creating extra
packages. Notably, `chrome-extension-builder` selects Product Platform's
browser-extension reference, `local-secrets` selects Local Dev's secrets mode,
and `maestri-portal` selects Maestri's portal mode.

## Provider membership

Counts are derived from catalog `core` membership plus declared native
exceptions and are checked against the live generated views.

| Provider | Entries | Canonical | Native |
| --- | ---: | ---: | ---: |
| `agents` | 22 | 20 | 2 |
| `claude` | 26 | 26 | 0 |
| `codex` | 21 | 20 | 1 |
| `droid` | 20 | 20 | 0 |
| `factory` | 20 | 20 | 0 |
| `gemini` | 20 | 20 | 0 |
| `gemini-antigravity` | 22 | 20 | 2 |

The five native exceptions are Agents `agent-vault-cli` and
`agent-vault-http`, Codex `.system`, and Gemini Antigravity
`heroui-pro-design-taste` and `heroui-react-pro`. Everything else in a supported
provider view resolves to one canonical catalog package.

## Catalog install mappings

| Installed view | Install root | Generated source | Executable consumers |
| --- | --- | --- | --- |
| Shared Agents root | `$HOME/.agents/skills` | `providers/agents` | Codex, Gemini CLI |
| Claude Code | `$HOME/.claude/skills` | `providers/claude` | Claude Code |
| Codex-specific | `${CODEX_HOME:-$HOME/.codex}/skills` (fallback `$HOME/.codex/skills`) | `providers/codex` | Codex |
| Droid | `$HOME/.factory/skills` | `providers/factory` | Droid |
| Gemini-specific | `$HOME/.gemini/skills` | `providers/gemini` | Gemini CLI |
| Google Antigravity IDE | `$HOME/.gemini/config/skills` | `providers/gemini-antigravity` | Antigravity IDE |

Codex co-loads Agents and Codex with 20 byte-identical overlaps. Gemini loads
Gemini then the higher-precedence Agents root with the same 20 overlaps and the
two Agent Vault packages; the latter exposure is an open owner decision. The
legacy `providers/droid` view is not a supported install mapping.

## Pack commands

```sh
bin/pack check
bin/pack render --all --profiles core
bin/pack render --all --full
bin/pack apply --all --full
bin/pack install
```

`core` is the only selectable profile. `--full` currently selects the same
membership. An additional profile must have declared members before it can be
added to the catalog or exposed by the CLI.

See `packs/joshka0/SOURCE_NOTES.md` for import decisions,
`reports/catalog/CATALOG-CONFORMS-2026-07-13.md` for current acceptance, and
`history/rebuild-2026-07/INDEX.md` for historical estate classification.
