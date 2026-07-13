# joshka0 Skills Pack

This directory is the publishable human-readable view of the current pack. The
composition authority is `catalog/pack.json`: 26 canonical packages, 115
owner-bound aliases, six external records, five provider-native exceptions,
one selectable `core` profile, and seven consumed-root models.

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

`providers/` is generated output rather than semantic source. Phase 6 may test
per-skill symlink distribution, but that future experiment does not change the
current catalog, validation, or ownership model.

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

## Current install mappings

| Consumer | Install root | Generated source |
| --- | --- | --- |
| Codex | `${CODEX_HOME:-$HOME/.codex}/skills` (fallback `$HOME/.codex/skills`) | `providers/codex` |
| Agents | `$HOME/.agents/skills` | `providers/agents` |
| Factory | `$HOME/.factory/skills` | `providers/factory` |
| Claude | `$HOME/.claude/skills` | `providers/claude` |
| Gemini | `$HOME/.gemini/skills` | `providers/gemini` |
| Gemini Antigravity | `$HOME/.gemini/antigravity/skills` | `providers/gemini-antigravity` |
| Droid | `$HOME/.droid/skills` | `providers/droid` |

Codex consumes both the Agents and Codex roots; the catalog permits only its 20
declared byte-identical canonical overlaps. Other consumers reject duplicates.

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
