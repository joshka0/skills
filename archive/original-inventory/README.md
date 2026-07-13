# Original Inventory Archive

Historical status: this first-pass generated export is retained only as audit
evidence. See `history/rebuild-2026-07/INDEX.md` for the dated estate index.

This directory preserves the generated artifacts from the first skills
consolidation pass.

These files are useful for historical audits, but they are not active source
roots:

- `skills/` is the original deduped export of discovered skill directories.
- `inventory.json` maps discovered source roots to that generated export.

For current work, use:

- `shared/` for local curated skill bodies
- `mirrors/` only for intentional imported-source evidence
- `catalog/pack.json` for composition and consumed-root declarations
- `native/` for declared provider-owned exception sources
- `providers/` only as the current generated live view, never as semantic source
