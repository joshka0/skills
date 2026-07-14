# joshka0 Skills Pack

This repository is the governed source for a portable local skills pack. The
current composition model is:

```text
shared/             canonical locally owned packages
mirrors/            preserved upstream sources and import evidence
catalog/pack.json   archetypes, aliases, core membership, native exceptions, consumers
native/<provider>/  provider-owned exception sources
providers/          generated live provider views for the current distribution
history/            retired inputs and dated preservation evidence
home/               versioned $HOME agent config, installed by symlink
bin/pack             the only active pack entrypoint
```

`home/` holds agent instruction files that live outside the pack catalog:
`home/claude/CLAUDE.md` -> `~/.claude/CLAUDE.md`, `home/claude/agents/` ->
`~/.claude/agents`, and `home/codex/AGENTS.md` -> `~/.codex/AGENTS.md`.

`providers/` is the current generated real-file delivery layer, not an authored
source. Phase 6 was killed because direct links would erase the render/apply
promotion boundary and the proposed seven-consumer topology was not real.
Registry distribution, if revisited, is a separate export-only experiment.

## Work with the pack

Edit locally owned skill content in `shared/`, intentional upstream patches in
`mirrors/`, composition data in `catalog/pack.json`, and provider-owned inputs
in `native/`. Never edit a generated provider copy as semantic source.

Use one command surface:

```sh
bin/pack check
bin/pack render --all --full
bin/pack apply --all --full
bin/pack install
bin/pack install --apply
```

`render` is a pure preview retained in a temporary directory. `apply` builds a
complete candidate and atomically exchanges the whole provider tree. `install`
previews by default; its apply mode reconciles home-root links but never edits a
home configuration file.

## Catalog install mappings

| Installed view | Install root | Generated source | Executable consumers |
| --- | --- | --- | --- |
| Shared Agents root | `$HOME/.agents/skills` | `providers/agents` | Codex, Gemini CLI |
| Claude Code | `$HOME/.claude/skills` | `providers/claude` | Claude Code |
| Codex-specific | `${CODEX_HOME:-$HOME/.codex}/skills` (fallback `$HOME/.codex/skills`) | `providers/codex` | Codex |
| Droid | `$HOME/.factory/skills` | `providers/factory` | Droid |
| Gemini-specific | `$HOME/.gemini/skills` | `providers/gemini` | Gemini CLI |
| Google Antigravity IDE | `$HOME/.gemini/config/skills` | `providers/gemini-antigravity` | Antigravity IDE |

The catalog models five executable consumers separately from seven generated
provider views. Codex co-loads the Agents and Codex roots with 20 required
byte-identical overlaps. Gemini loads the Gemini root and then the higher-
precedence Agents root with the same 20 overlaps; that also exposes both Agent
Vault packages, pending an owner decision. `providers/droid` remains a legacy
generated compatibility view, not a supported executable-consumer mapping.

## Governance

The catalog currently retains 26 canonical packages, 115 owner-bound aliases,
six external records, and five provider-native exceptions. Canonical skill
design is governed by the four references below
`shared/general/skill-authoring/references/`. Current composition evidence is in
`reports/catalog/CATALOG-CONFORMS-2026-07-13.md`; older reports are historical.

See `PACK.md` for exact provider counts, `AGENTS.md` for maintenance rules, and
`packs/joshka0/SOURCE_NOTES.md` for catalog-derived source decisions.
