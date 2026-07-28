# AGENTS.md — joshka0 Skills

Keep paths portable: repository-relative, `$HOME`, or a tool home variable such
as `${CODEX_HOME:-$HOME/.codex}`; never a literal personal absolute path.

## Safety rules

- Never permanently delete repository content: retire via git commit (history
  and the `attic` branch are the archive) or `/usr/bin/trash`.
- Never use destructive Git operations that discard work.
- Treat unrelated working-tree changes as user-owned and preserve them.
- Never write a credential value, secret-bearing URL, or private key anywhere
  in this repository.
- Do not create, move, or retarget `$HOME` symlinks or config without the
  user's explicit request.

## Model and editing rules

See `README.md` for the layout. The rules:

1. `skills/` and `native/` are the only content layers; edit them directly.
2. `providers/` is a gitignored symlink farm owned by `bin/link` — never edit
   it by hand, and never touch manifest-`preserve`d entries (codex `.system`
   is live state mutated by codex itself).
3. Exposure changes go in `manifest.json`, then `bin/link`.
4. Skill content follows the `skills/skill-authoring/` contract; validate with
   `bin/validate-skill.sh <dir> <archetype>` and commit the pre-edit state
   first so every rewrite has a git ref.
5. `home/` files are live `$HOME` config reached through symlinks — edits take
   effect immediately; commit them like any other change.
