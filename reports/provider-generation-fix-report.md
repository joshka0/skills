# Provider Generation Fix Report

## Scripts Inspected

- `bin/compose-codex-skills.sh`
- `bin/compose-provider-skills.sh`
- `bin/sync-provider-roots.sh`

## Problems Found

- `compose-codex-skills.sh` and `compose-provider-skills.sh` preserved
  provider `.routed` symlinks even though repo doctrine says internal symlinks
  should not exist.
- Generated bundle/provider entries contained nested same-name skill copies such
  as `code-quality/code-quality/SKILL.md`.
- `sync-provider-roots.sh` only manages home-root symlinks and did not need a
  code change.

## Changes Made

- Removed `.routed` symlink preservation from both compose scripts.
- Made compose apply mode remove `.routed` entries when rewriting provider
  outputs.
- Added `remove_nested_same_name_copy` to both compose scripts so temporary
  generated outputs strip `skill-name/skill-name` copies before moving.
- Removed the seven current provider `.routed` symlinks.
- Removed ten current nested generated duplicate directories from
  `bundles/codex/core` and `providers/codex`.

## Commands Run

- `find . -type l -print`
- `find bundles providers providers-current -type d ...`
- `bash -n bin/compose-codex-skills.sh bin/compose-provider-skills.sh bin/sync-provider-roots.sh`
- `./bin/compose-codex-skills.sh --bundles core`
- `./bin/compose-provider-skills.sh --provider claude --bundles core`
- `node scripts/validate-skills.mjs`

## Remaining Risks

- `providers/codex-routed` remains a generated directory and is excluded from
  active source routing.
- The scripts now prevent nested copies in provider compose output, but any
  separate future bundle-generation path should also avoid writing nested
  same-name directories.
- Provider snapshots in `providers-current` were not regenerated in this pass.
