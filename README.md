# joshka0 Skills

Personal agent skills, authored once in `skills/`, exposed to every local agent
harness through symlinks.

```text
skills/          canonical skill packages (the only content layer)
native/          provider-specific packages (agent-vault, heroui)
providers/       GENERATED symlink farms, one per consumer — gitignored, rebuilt by bin/link
home/            versioned $HOME agent config, installed by symlink
manifest.json    per-provider exposure: exclusion groups, native grafts, preserved live entries
bin/link         rebuilds providers/ from manifest.json
bin/validate-skill.sh   mechanical gate for skill authoring
reports/pilot/   golden-example artifacts cited by the skill-authoring contract
```

## How it works

Each consumer home root is a symlink into this repo (`~/.claude/skills ->
providers/claude`, `~/.codex/skills -> providers/codex`, and so on), and each
`providers/<name>` entry is a symlink to `skills/<name>` or `native/...`.
Content therefore exists exactly once; there is no render, copy, parity check,
or drift. Roots that co-load (`~/.agents/skills` alongside a specific root)
stay byte-identical by construction — the duplicates are the same inode.

`manifest.json` is the whole composition model: named exclusion groups
(`claude_only`, `dormant`), per-provider native grafts, and `preserve` entries
for live state owned by the consumer itself (codex `.system`, which codex's
skill-installer mutates in place — never regenerate or version it here).

An earlier design generated real-file provider copies via a catalog and
render/apply pipeline, and explicitly rejected symlinks to keep a promotion
boundary. That decision was reversed 2026-07-28: every rendered copy was
byte-identical to source, so the boundary guarded nothing. The old pack,
catalog, mirrors, archives, and reports live on the `attic` branch.

## Workflows

- **Edit a skill**: edit `skills/<name>/` directly; consumers see it live.
  Follow `skills/skill-authoring/` for authoring rules and run
  `bin/validate-skill.sh skills/<name> <archetype>`.
- **Add a skill**: create `skills/<name>/SKILL.md`, run `bin/link`.
- **Retire a skill**: move it to the `dormant` group in `manifest.json` (or
  delete the directory after committing), run `bin/link`.
- **Change exposure**: edit `manifest.json`, run `bin/link`.

## Consumer roots

| Root | Farm | Consumers |
| --- | --- | --- |
| `$HOME/.claude/skills` | `providers/claude` | Claude Code |
| `${CODEX_HOME:-$HOME/.codex}/skills` | `providers/codex` | Codex |
| `$HOME/.agents/skills` | `providers/agents` | Codex, Gemini CLI (co-load) |
| `$HOME/.gemini/skills` | `providers/gemini` | Gemini CLI |
| `$HOME/.gemini/antigravity/skills` | `providers/gemini-antigravity` | Antigravity IDE |
| `$HOME/.factory/skills` | `providers/factory` | Droid |
| `$HOME/.droid/skills` | `providers/droid` | Droid (legacy root) |
