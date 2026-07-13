# Declarative pack catalog

`pack.json` is the composition source for the pack. It replaces the former
skill JSONL, alias map, overlay manifest, copied bundle bodies, and provider
snapshot. `bin/pack` renders canonical packages directly from `shared/` and
provider-owned exceptions from `native/`; `providers/` is the only generated
real-file layer.

## Records

- `skills` holds one record per canonical package: its source path, normative
  archetype, routing metadata, absorbed aliases, and provider/profile
  membership.
- `provider_native_exceptions` names every non-canonical composition source.
  Each source is confined to `native/<provider>/` and has explicit profile
  membership.
- `external_records` preserves alias-ledger entries that intentionally have no
  canonical skill, including vendor sources, archived cuts, and provider
  system surface.
- `consumed_roots` describes the roots each consumer loads. The Codex model
  includes both `$HOME/.agents/skills` and
  `${CODEX_HOME:-$HOME/.codex}/skills`; its existing canonical overlap is
  declared by name and accepted only while every duplicate remains identical
  to the same canonical source. Other consumer unions reject duplicates.

The fixed provider allowlist remains executable policy in `bin/pack`; changing
catalog data cannot authorize a new apply target. `core`, `infra`, `release`,
and `aliases` are profile names. Empty profiles are retained as stable CLI
selection tokens, not as copied directory bodies.

## Validation

`bin/pack check` verifies catalog schema and membership, aliases, canonical
archetypes and routing descriptions, provider-native sources, consumed-root
unions, package gates, secrets, links, and routes. It then performs a fresh
full render and byte/mode comparison against every live provider. There is no
checked-in provider snapshot.

## Next profile triage method

Language packs remain in default profiles by owner ruling. The next proposal
to remove Effect, Elixir, or Go from a default profile must use blinded paired
tasks: run representative tasks with and without the candidate skill, hide the
condition from evaluators, score correctness and decision quality against the
same rubric, and record both the task set and results before changing profile
membership. Usage counts alone are not a removal criterion.
