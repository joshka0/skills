# AGENTS.md - joshka0 Skills Pack

This repo is the canonical source for the `joshka0` skills pack: curated local
skills, imported skill mirrors, and provider-specific overlays for local coding
agents.

The repo is designed to be portable. Do not hardcode a user-specific absolute
path in pack docs or scripts. Use paths relative to the repo root, `$HOME`, or
tool-specific home variables.

## Pack Model

Use this mental model when the directory names feel repetitive:

```text
shared/ and mirrors/        = source skill bodies
providers/<provider>        = active installed views
bundles/<provider>/<bundle> = compose inputs for active views
providers-current/          = snapshot for parity checks
archive/original-inventory/ = historical/generated inventory artifacts
archive/full-overlays/      = historical full overlay snapshots
```

Do not treat every directory containing skill-looking folders as a source of
truth. The active source of truth is `shared/`, `mirrors/`, and the active
provider overlays in `providers/<provider>`.

The pack has three layers:

1. Canonical skill bodies:
   - `shared/general`
   - `shared/codex`
   - `shared/claude`
   - selected imported sources under `mirrors`
2. Provider overlays:
   - `providers/<provider>`
   - symlink-heavy directories that expose the correct skill set to each agent
3. Installed agent roots:
   - agent-specific skill directories in `$HOME` that symlink to
     `providers/<provider>`

Provider overlays should normally be symlinks to canonical skill bodies. Do not
copy skill bodies into provider overlays unless the provider requires native
files that cannot be represented as a shared symlink.

Known provider-native exceptions:

- `providers/codex/.system`
- `providers/agents/agent-vault-cli`
- `providers/agents/agent-vault-http`
- `providers/agents/maestri`
- `providers/agents/maestri-portal`
- provider-specific marketplace or generated skills such as Gemini Antigravity
  HeroUI entries

## Repository Layout

| Path | Role |
| --- | --- |
| `shared/general` | Cross-agent shared skills and progressive router skills. |
| `shared/codex` | Codex-oriented design, infra, quality, and platform skills. |
| `shared/claude` | Claude-specific skills preserved for optional promotion. |
| `shared/variants` | Intentional variants of shared workflows. |
| `mirrors/foxctl/pack` | Imported foxctl workflow skills. |
| `mirrors/foxctl/external` | Imported release, Uniwind, and OpenTUI skills. |
| `mirrors/mattpocock/skills` | Mirror of Matt Pocock's public skills repo. |
| `mirrors/repoprompt/agents` | Archived RepoPrompt `rp-*` skills, inactive by default. |
| `providers` | Active provider overlays consumed by local agents. |
| `bundles/<provider>/<bundle>` | Bundle inputs used to compose provider overlays; not install roots. |
| `providers-current` | Snapshot of the current active overlays. |
| `archive/original-inventory` | Historical/generated export and source inventory from the first consolidation pass; do not edit as source. |
| `archive/full-overlays` | Historical full provider overlay snapshots; rebuild broad current views from `bundles/`. |
| `loose` | Historical loose non-`SKILL.md` files from the first consolidation pass. |
| `packs/joshka0` | Human-readable pack notes and source/import audit. |
| `reports` | Audit, pruning, parity, and centralization notes. |
| `bin` | Overlay compose and root sync helpers. |

## Provider Symlinks

Install provider overlays by symlinking the agent's skill root to this repo's
matching `providers/<provider>` directory.

Use this shape from the repo root:

```sh
repo_root="$(pwd)"
ln -sfn "$repo_root/providers/codex" "$HOME/.codex/skills"
ln -sfn "$repo_root/providers/agents" "$HOME/.agents/skills"
ln -sfn "$repo_root/providers/factory" "$HOME/.factory/skills"
ln -sfn "$repo_root/providers/claude" "$HOME/.claude/skills"
ln -sfn "$repo_root/providers/gemini" "$HOME/.gemini/skills"
ln -sfn "$repo_root/providers/gemini-antigravity" "$HOME/.gemini/antigravity/skills"
ln -sfn "$repo_root/providers/droid" "$HOME/.droid/skills"
```

If a tool supports a dedicated home variable, prefer that over hardcoding
`$HOME/.toolname`. For example:

```sh
ln -sfn "$repo_root/providers/codex" "${CODEX_HOME:-$HOME/.codex}/skills"
```

Create parent directories before linking when needed:

```sh
mkdir -p "$HOME/.codex" "$HOME/.agents" "$HOME/.factory" "$HOME/.claude" \
  "$HOME/.gemini/antigravity" "$HOME/.droid"
```

The helper script can do the same operation for supported local roots:

```sh
./bin/sync-provider-roots.sh
./bin/sync-provider-roots.sh --apply
```

The script backs up existing roots as `skills.backup-<timestamp>` before
replacing them with symlinks.

## Progressive Disclosure

Default overlays should expose compact router skills instead of every detailed
checklist or stack guide:

- `product-platform`
- `design-family`
- `release-bundles`
- `infra-bundles`

Router descriptions must list the child skill names they cover, because skill
selection sees metadata before loading skill bodies. Detailed routing maps live
in each router's `references/skill-map.md`.

Use this pattern:

```text
User asks for release work
  -> load `release-bundles`
  -> read only the matching Apple or Android section
  -> load only the specific checklist needed for the task
```

Do not put every routed child skill into every default provider overlay unless
the user explicitly asks for a full/broad bundle.

## Active Overlay Composition

The live default overlays are the lean day-to-day sets:

- `providers/codex`
- `providers/agents`
- `providers/claude`
- `providers/factory`
- `providers/gemini`
- `providers/gemini-antigravity`
- `providers/droid`

Compose Codex from bundle definitions:

```sh
./bin/compose-codex-skills.sh --bundles core
./bin/compose-codex-skills.sh --bundles core --apply
./bin/compose-codex-skills.sh --full --apply
```

Compose another supported provider:

```sh
./bin/compose-provider-skills.sh --provider claude --bundles core
./bin/compose-provider-skills.sh --provider claude --bundles core --apply
./bin/compose-provider-skills.sh --provider gemini --full --apply
```

Keep `providers-current/*` aligned with the active `providers/*` overlays after
major pruning or promotion passes.

## Source And Import Notes

Record durable import decisions in:

- `PACK.md`
- `packs/joshka0/SOURCE_NOTES.md`
- `overlay-manifest.json`
- the current report under `reports/`

Current import stance:

- Matt Pocock non-deprecated, non-in-progress, non-personal skills are active
  imports through `shared/general`.
- Matt Pocock deprecated, in-progress, and personal skills remain mirrored but
  inactive.
- Foxctl focused workflow skills are active where useful.
- Foxctl broad aliases such as umbrella or compatibility skills are inactive by
  default.
- Foxctl external release and UI platform skills are routed through
  `release-bundles` and `product-platform`.
- RepoPrompt `rp-*` skills are archived under `mirrors/repoprompt/agents`; use
  `repoprompt-pro-review` as the default active workflow.

## Editing Rules

1. Edit canonical skill bodies in `shared/*` or the relevant `mirrors/*` source.
2. Update provider overlays by adding or removing symlinks.
3. Do not duplicate a skill body into multiple providers.
4. Keep router descriptions discoverable but compact.
5. Move large family-specific guidance into `references/`.
6. Preserve inactive imported sources unless a cleanup task explicitly removes
   them.
7. Update pack/source notes when promoting or demoting skills.

After changing symlinks, verify from the repo root:

```sh
find -L providers providers-current shared mirrors -type l -print
```

No output means there are no broken symlinks.

## Variants

Intentional variants are preserved when the same workflow has provider- or
mux-specific differences:

- `shared/general/codex-swarm` is the tmux canonical version.
- `shared/variants/zellij/codex-swarm` preserves the Zellij variant.
- `shared/general/plan-build` is the tmux canonical version.
- `shared/variants/zellij/plan-build` preserves the Zellij variant.
- `shared/general/delegate-codex` is the canonical step-by-step version.
- `shared/variants/legacy/delegate-codex-zellij-wording` preserves the older
  wording variant.

Do not collapse variants without a semantic merge pass.

## Cautions

- Do not raw-symlink Codex `external-*` aliases to non-`external-*` names when
  their `name:` frontmatter differs.
- Keep Apple/Android release checklists out of default overlays unless release
  work is active; route through `release-bundles`.
- Keep Kubernetes and Terraform detailed skills out of default overlays unless
  infra work is active; route through `infra-bundles`.
- Restart or reload agent CLIs after changing root skill symlinks; many agents
  cache skill metadata at startup.
