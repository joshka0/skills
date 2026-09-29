---
name: peon-ping
description: "Control the peon-ping Claude Code notification hook: mute/resume, volume, sound pack, rotation, categories. Use when the user names peon-ping or notification sounds."
---

# peon-ping

- Hook: `${CLAUDE_CONFIG_DIR:-$HOME/.claude}/hooks/peon-ping/peon.sh`. Config: `config.json` in the same directory.
- Pause/resume: `bash <hook>/peon.sh toggle`. Packs: `bash <hook>/peon.sh packs list`. Use its help for anything else.
- Setting changes: read only the one field, validate it against live options, and change only that field. Never dump the config.
