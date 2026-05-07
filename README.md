# joshka0 Skills Pack

This repo is the canonical skills pack for Joshka's local agents.

The important rule is:

```text
Edit skill bodies in shared/ or mirrors/.
Expose skill sets through providers/.
Treat archive/original-inventory/ and reports/ as generated or historical artifacts.
```

## Mental Model

There are four active concepts:

| Concept | Path | Use it for |
| --- | --- | --- |
| Canonical local skills | `shared/` | Skills authored or curated in this pack. Edit here first. |
| Imported sources | `mirrors/` | Upstream or repo-local imported skills. Edit only when intentionally patching an import. |
| Provider overlays | `providers/<provider>` | Active skill sets installed into Codex, Claude, Factory, Gemini, Droid, and Agents. Mostly symlinks. |
| Bundle inputs | `bundles/<provider>/<bundle>` | Compose inputs for rebuilding an active provider overlay. Not installed directly. |

Everything else is secondary:

| Path | Meaning |
| --- | --- |
| `providers-current/` | Snapshot of the latest active overlays. Useful for parity checks, not an install root. |
| `archive/original-inventory/` | Historical/generated deduped export and inventory from the original consolidation pass. Do not edit it as source. |
| `archive/full-overlays/` | Historical full provider overlay snapshots. Rebuild current broad views from `bundles/`. |
| `bundles/` | Provider overlay bundle inputs. Used by compose scripts, not installed directly. |
| `loose/` | Historical loose non-`SKILL.md` files found during the original consolidation pass. |
| `reports/` | Audit notes, overlap reports, and pruning decisions. |
| `packs/joshka0/` | Human-readable pack notes and source/import audit. |
| `bin/` | Scripts for composing overlays and syncing local provider roots. |

## Active Install Roots

Local agent skill roots should point at active provider overlays:

```text
~/.codex/skills              -> <repo>/providers/codex
~/.agents/skills             -> <repo>/providers/agents
~/.factory/skills            -> <repo>/providers/factory
~/.claude/skills             -> <repo>/providers/claude
~/.gemini/skills             -> <repo>/providers/gemini
~/.gemini/antigravity/skills -> <repo>/providers/gemini-antigravity
~/.droid/skills              -> <repo>/providers/droid
```

Use:

```sh
./bin/sync-provider-roots.sh
./bin/sync-provider-roots.sh --apply
```

## Editing Workflow

1. Edit canonical skill bodies under `shared/` or the relevant source under `mirrors/`.
2. Update provider overlays by adding or removing symlinks under `providers/<provider>`.
3. If rebuilding an overlay from bundles, use:

```sh
./bin/compose-provider-skills.sh --provider claude --bundles core --apply
./bin/compose-codex-skills.sh --bundles core --apply
```

4. Verify symlinks:

```sh
find -L providers providers-current shared mirrors -type l -print
```

No output means there are no broken symlinks.

## Progressive Disclosure

Default overlays should expose router skills instead of every detailed checklist:

- `product-platform`
- `design-family`
- `release-bundles`
- `infra-bundles`

Each router description names the child skills it covers. Detailed maps live in
the router's `references/skill-map.md`.

## Current Source Notes

See:

- `AGENTS.md` for agent-facing maintenance rules
- `PACK.md` for pack summary
- `packs/joshka0/SOURCE_NOTES.md` for import decisions
- `reports/skills-final-set-audit-2026-05-07.md` for the current pruning audit
