---
name: peon-ping
description: "Control the installed Claude Code peon-ping notification hook without exposing its full configuration. Use when the user names peon-ping, sound mute/resume, volume, sound pack, rotation, or notification category."
---

# peon-ping

Operate the installed notification hook through its live command surface and change only the requested configuration field.

## Hook topology

- Configuration: `${CLAUDE_CONFIG_DIR:-$HOME/.claude}/hooks/peon-ping/config.json`
- Entrypoint: `${CLAUDE_CONFIG_DIR:-$HOME/.claude}/hooks/peon-ping/peon.sh`

## Workflow

1. Resolve the configuration directory, then confirm both the named config and `peon.sh` entrypoint exist.
2. Toggle sounds with `bash "${CLAUDE_CONFIG_DIR:-$HOME/.claude}/hooks/peon-ping/peon.sh" toggle` when the user asks to pause or resume.
3. List current packs with `bash "${CLAUDE_CONFIG_DIR:-$HOME/.claude}/hooks/peon-ping/peon.sh" packs list`; use live help for any other command shape.
4. For a requested setting, read only the relevant config field, validate the value against current options, and update that field without replacing unrelated settings.
5. Re-read safe status or rerun the requested entrypoint to verify the result.

## Hard rules

- Do not dump the full configuration or report unrelated settings.
- Do not guess packs, categories, commands, or config schema; installed hook help is authoritative.
- Report setting names and status, never unrelated configuration values.
- Stop if the hook/config is absent or the requested value is not supported by current live output.

## Output

Report the requested operation, changed setting name or toggle result, and live verification.
