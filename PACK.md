# joshka0 Skills Pack

This repository is the local source of truth for the `joshka0` skills pack.

The pack contains:

- locally authored and curated skills under `shared/`
- imported upstream mirrors under `mirrors/`
- active provider overlays under `providers/`
- the current exported provider snapshot under `providers-current/`
- reports and audit notes under `reports/`

The pack is intentionally symlink-heavy. Provider overlays should point back to
canonical shared or mirrored skill bodies, so one source edit updates every
agent that consumes that skill.

## Pack Layout

| Path | Role |
| --- | --- |
| `shared/general` | Canonical shared skills and progressive router skills. Some entries are symlinks to imported upstream mirrors. |
| `shared/codex` | Codex-oriented UI, design, Kubernetes, Terraform, and quality skills. |
| `shared/claude` | Preserved Claude-specific workflows that are not active defaults. |
| `mirrors/foxctl/pack` | Skills imported from the local `foxctl` skills pack. |
| `mirrors/foxctl/external` | Release, Uniwind, and OpenTUI skills imported from the local `foxctl` external skills set. |
| `mirrors/mattpocock/skills` | Mirror of Matt Pocock's public skills repository. |
| `mirrors/repoprompt/agents` | Archived RepoPrompt `rp-*` agent skills, kept inactive by default. |
| `providers` | Active symlink overlays used by local agents. |
| `providers-current` | Snapshot of the active overlays after the latest pruning pass. |
| `packs/joshka0` | Human-readable pack notes for publication or extraction into a standalone repo. |

## Active Provider Overlays

Current active overlay counts:

| Provider | Entries | Notes |
| --- | ---: | --- |
| `codex` | 53 | Includes `.system` plus active shared skills. |
| `agents` | 53 | Includes provider-native Agent Vault and Maestri skills. |
| `claude` | 51 | Active Claude overlay. |
| `factory` | 50 | Active Factory overlay. |
| `gemini` | 50 | Active Gemini overlay. |
| `gemini-antigravity` | 52 | Includes provider-native HeroUI skills. |
| `droid` | 30 | Smaller mobile/terminal-oriented overlay. |

Home skill roots should point at these active overlays. Treat `<skills-repo>` as
the checked-out repo root, not a machine-specific absolute path:

```text
~/.codex/skills              -> <skills-repo>/providers/codex
~/.agents/skills             -> <skills-repo>/providers/agents
~/.factory/skills            -> <skills-repo>/providers/factory
~/.claude/skills             -> <skills-repo>/providers/claude
~/.gemini/skills             -> <skills-repo>/providers/gemini
~/.gemini/antigravity/skills -> <skills-repo>/providers/gemini-antigravity
~/.droid/skills              -> <skills-repo>/providers/droid
```

## Default Context Strategy

The active overlays keep default context small by exposing router skills instead
of every detailed checklist:

- `product-platform`
- `design-family`
- `release-bundles`
- `infra-bundles`

Each router description includes the child skill names it covers. The detailed
map lives in that router's `references/skill-map.md` file.

## Source Notes

See `packs/joshka0/SOURCE_NOTES.md` for imported, mirrored, inactive, and
provider-native skill notes.

## Maintenance Rules

- Edit canonical skill bodies in `shared/` or the relevant `mirrors/` source.
- Keep provider overlays as symlinks where possible.
- Do not promote imported or archived skills into active defaults without
  recording the decision in `overlay-manifest.json` and the current audit note.
- Re-check symlinks after changing overlays:

```sh
find -L providers providers-current shared mirrors -type l -print
```

No output means there are no broken symlinks.
