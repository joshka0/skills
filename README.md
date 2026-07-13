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
bin/pack             the only active pack entrypoint
```

`providers/` is the current generated real-file delivery layer, not an authored
source. Phase 6 will separately test whether per-skill symlink distribution can
replace it across all seven consumers. Until that trial passes its gate,
`providers/` remains the live installed view; the catalog, validator, rubric,
and membership model are stable either way.

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

## Current install mappings

| Consumer | Install root | Current generated source |
| --- | --- | --- |
| Codex | `${CODEX_HOME:-$HOME/.codex}/skills` (fallback `$HOME/.codex/skills`) | `providers/codex` |
| Agents | `$HOME/.agents/skills` | `providers/agents` |
| Factory | `$HOME/.factory/skills` | `providers/factory` |
| Claude | `$HOME/.claude/skills` | `providers/claude` |
| Gemini | `$HOME/.gemini/skills` | `providers/gemini` |
| Gemini Antigravity | `$HOME/.gemini/antigravity/skills` | `providers/gemini-antigravity` |
| Droid | `$HOME/.droid/skills` | `providers/droid` |

Codex consumes both the Agents root and its Codex-specific root. The catalog
declares that union and permits only named, byte-identical canonical overlaps.

## Governance

The catalog currently retains 26 canonical packages, 115 owner-bound aliases,
six external records, and five provider-native exceptions. Canonical skill
design is governed by the four references below
`shared/general/skill-authoring/references/`. Current composition evidence is in
`reports/catalog/CATALOG-CONFORMS-2026-07-13.md`; older reports are historical.

See `PACK.md` for exact provider counts, `AGENTS.md` for maintenance rules, and
`packs/joshka0/SOURCE_NOTES.md` for catalog-derived source decisions.
