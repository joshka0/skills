---
name: peon-ping
description: "Control the installed Claude Code peon-ping notification hook without exposing its full configuration. Use when the user names peon-ping, sound mute/resume, volume, sound pack, rotation, or notification category."
---

# peon-ping

Operate the installed notification hook through its live command surface and change only the requested configuration field.

## Workflow

1. Resolve the Claude configuration directory from its environment variable or `$HOME` default and confirm the hook script exists.
2. Use the hook's live help or pack-list command for current actions and available pack names.
3. For a requested setting, read only the relevant configuration field, validate the requested value against current options, and update that field without replacing unrelated settings.
4. Re-read safe status or run the requested toggle action to verify the result.

## Hard rules

- Do not dump the full configuration or report unrelated settings.
- Do not guess packs, categories, commands, or config schema; installed hook help is authoritative.
- Report setting names and status, never unrelated configuration values.
- Stop if the hook/config is absent or the requested value is not supported by current live output.

## Output

Report the requested operation, changed setting name or toggle result, and live verification.
