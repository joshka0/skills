---
name: jsm
description: "Find and use an inactive Jeffrey's (jsm) skill from the offline archive. Use when the user names a jsm skill or asks for one that is not installed."
---

# jsm skills

- Active jsm skills are installed and load on their own: `beads-br`, `beads-bv`, `beads-workflow`, `fixing-beads-problems`, `bend2-mega-skill`, `porting-to-bend2`.
- Every other jsm skill is in `~/repos/jsm-skills-archive`. Find it in `INDEX.md` (name, when to use, active mark). Then read `skills/<name>/SKILL.md` and follow it. Load its `references/` files only when that SKILL.md points to them.
- If the user wants a skill active for every session, run `jsm install <name>` and add it to the `jsm` group in `~/repos/skills/manifest.json`. Uninstall with `jsm uninstall <name>` and remove it from the group.
- The archive is proprietary. Never push it or copy it into `skills/` or `native/`.
- Never run `jsm install-all`: it re-activates all 142 skills.
