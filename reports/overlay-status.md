# Provider Overlay Status

This file records the central overlay structure created under `/Users/joshka/repos/skills`.

## Created Structure

- `shared/general/` contains canonical non-foxctl skills that can be shared across providers.
- `shared/codex/` contains Codex-specific skills and Codex compatibility aliases.
- `shared/claude/` contains Claude-specific skills.
- `shared/variants/zellij/` preserves Zellij-specific variants of skills whose canonical version is now tmux-oriented.
- `shared/variants/legacy/` preserves non-canonical legacy wording variants.
- `mirrors/foxctl/pack` symlinks to `/Users/joshka/repos/personal/foxctl/configs/skills-pack`.
- `mirrors/foxctl/external` symlinks to `/Users/joshka/repos/personal/foxctl/configs/skills-external`.
- `providers-current/` is a by-hash mirror of the pre-migration provider roots from the latest inventory.
- `providers/` is the live condensed symlink-only overlay.
- `bin/sync-provider-roots.sh` repoints supported provider roots to `providers/*`.

Active provider roots are now symlinks to `providers/*`, except OpenCode.

## Provider Overlay Counts

| Provider overlay | Entries | Notes |
|---|---:|---|
| `providers/codex` | 93 | Hash parity with active Codex root. |
| `providers/agents` | 66 | One intentional skill-content change: `delegate-codex` moves to the shared Claude-derived canonical version. Loose `.md` files are not included as active skills. |
| `providers/factory` | 48 | Hash parity with active Factory root. |
| `providers/claude` | 76 | Matches intended Claude structure. `peon-ping-*` hash comparison differs because active skills use file symlinks into Homebrew while the central snapshot is dereferenced. |
| `providers/gemini` | 45 | Hash parity with active `~/.gemini/skills`. |
| `providers/gemini-antigravity` | 32 | Hash parity with active `~/.gemini/antigravity/skills`. |
| `providers/opencode` | 1 | Placeholder only. OpenCode root paths are inconsistent and still need cleanup. |

Machine-readable details are in `overlay-manifest.json` and `reports/parity-report.json`.

## Live Roots

These roots should point at the central overlays:

- `~/.codex/skills` -> `/Users/joshka/repos/skills/providers/codex`
- `~/.agents/skills` -> `/Users/joshka/repos/skills/providers/agents`
- `~/.factory/skills` -> `/Users/joshka/repos/skills/providers/factory`
- `~/.claude/skills` -> `/Users/joshka/repos/skills/providers/claude`
- `~/.gemini/skills` -> `/Users/joshka/repos/skills/providers/gemini`
- `~/.gemini/antigravity/skills` -> `/Users/joshka/repos/skills/providers/gemini-antigravity`

Timestamped backups were left beside each original root during the initial cutover.

## Decisions Applied

- `delegate-codex`: collapsed to `shared/general/delegate-codex` using the Claude step-by-step version.
- `codex-swarm`: `shared/general/codex-swarm` is the tmux canonical version; `shared/variants/zellij/codex-swarm` preserves the Agents/Zellij variant.
- `plan-build`: `shared/general/plan-build` is the tmux canonical version; `shared/variants/zellij/plan-build` preserves the Agents/Zellij variant.
- Codex `external-*` aliases are preserved in `shared/codex/` because their `name:` frontmatter differs from the shared foxctl-external skill names.
- Foxctl-owned skills are not copied into `shared/`; overlays point through `mirrors/foxctl/*`.

## Known Follow-Ups

1. Normalize OpenCode roots before migration. Current candidates include `~/.config/opencode/skill`, `~/.config/opencode/agent`, and `~/.opencode/skills`.
2. Clean old OpenCode `agentctl-*` entries after the authoritative OpenCode root is chosen.
3. Decide whether `~/.agents/skills/*.md` loose files should become real skill directories or remain prompt/template artifacts.
4. If desired, update the central inventory after provider overlays become canonical.
