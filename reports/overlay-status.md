# Provider Overlay Status

Superseded on 2026-05-07: repo-internal symlink overlays were replaced with
real copied skill directories/files. Only agent home roots should be symlinks
to this repo's `providers/*` directories.

This file records the central overlay structure created under `/Users/joshka/repos/skills`.

## Created Structure

- `shared/general/` contains canonical non-foxctl skills that can be shared across providers.
- `shared/codex/` contains Codex-specific skills and Codex compatibility aliases.
- `shared/claude/` contains Claude-specific skills.
- `shared/variants/zellij/` preserves Zellij-specific variants of skills whose canonical version is now tmux-oriented.
- `shared/variants/legacy/` preserves non-canonical legacy wording variants.
- `mirrors/foxctl/pack` contains a copied import from the local foxctl skills pack.
- `mirrors/foxctl/external` contains a copied import from the local foxctl external skills set.
- `providers-current/` is a by-hash mirror of the pre-migration provider roots from the latest inventory.
- `providers/` is the live condensed copied overlay.
- `bin/sync-provider-roots.sh` repoints supported provider roots to `providers/*`.

Active provider roots are now symlinks to `providers/*`, except OpenCode.

## Provider Overlay Counts

| Provider overlay | Entries | Notes |
|---|---:|---|
| `providers/codex` | 53 | Copied active Codex overlay. |
| `providers/agents` | 53 | Copied active Agents overlay. |
| `providers/factory` | 50 | Copied active Factory overlay. |
| `providers/claude` | 52 | Copied active Claude overlay with merged `peon-ping`. |
| `providers/gemini` | 50 | Copied active Gemini overlay. |
| `providers/gemini-antigravity` | 52 | Copied active Gemini Antigravity overlay. |
| `providers/droid` | 30 | Copied active Droid overlay. |
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
- `go-lang`: active default router for Go work; detailed language guidance is split into routed child skills for design, concurrency, errors, testing, packages/API, and performance.
- `effect-framework`: active default router for Effect TypeScript work; detailed framework guidance is split into routed child skills for architecture, services/layers, runtime/resources, errors, concurrency/streams, testing, and migration.
- `elixir-lang`: active default router for Elixir/OTP work; detailed language guidance is split into routed child skills for OTP design, supervision/processes, concurrency/pipelines, fault/observability, testing, and performance/interop.

## Known Follow-Ups

1. Normalize OpenCode roots before migration. Current candidates include `~/.config/opencode/skill`, `~/.config/opencode/agent`, and `~/.opencode/skills`.
2. Clean old OpenCode `agentctl-*` entries after the authoritative OpenCode root is chosen.
3. Decide whether `~/.agents/skills/*.md` loose files should become real skill directories or remain prompt/template artifacts.
4. If desired, update the central inventory after provider overlays become canonical.
