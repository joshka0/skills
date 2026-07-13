# Phase 2 retired composition inputs

These trees were retired intact on 2026-07-13 when `catalog/pack.json` became
the composition source:

- `retired-bundles/` — copied per-provider profile bodies;
- `retired-provider-snapshot/` — the former `providers-current/` parity tree;
- `retired-manifests/` — `skills.jsonl`, `aliases.json`, the overlay manifest,
  and their excluded-root note.

The skill rows, aliases, archetypes, provider membership, native exceptions,
and consumer roots now live in `catalog/pack.json`. Current parity is computed
by rendering from canonical and native sources and comparing that output with
`providers/`; this history tree is never read by `bin/pack`.
