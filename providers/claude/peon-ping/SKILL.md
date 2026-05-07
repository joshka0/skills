---
name: peon-ping
description: Toggle and configure peon-ping sound notifications for Claude Code. Use when the user wants to mute, unmute, pause, resume, change volume, set active sound pack, configure pack rotation, or toggle sound categories.
user_invocable: true
---

# peon-ping

Toggle and configure peon-ping sounds.

## Config location

`${CLAUDE_CONFIG_DIR:-$HOME/.claude}/hooks/peon-ping/config.json`

## Toggle sounds

Run:

```bash
bash "${CLAUDE_CONFIG_DIR:-$HOME/.claude}"/hooks/peon-ping/peon.sh toggle
```

Report the command output to the user. Expected outputs include:

- `peon-ping: sounds paused`
- `peon-ping: sounds resumed`

## List available packs

Run:

```bash
bash "${CLAUDE_CONFIG_DIR:-$HOME/.claude}"/hooks/peon-ping/peon.sh packs list
```

## Configure settings

Read and edit the config JSON directly. Available settings:

- `enabled`: master on/off switch.
- `volume`: sound volume, `0.0` to `1.0`.
- `active_pack`: current sound pack, such as `peon`, `sc_kerrigan`, or `glados`.
- `pack_rotation`: list of packs to rotate through per session. Empty list uses `active_pack`.
- `pack_rotation_mode`: `random` or `round-robin`.
- `categories`: individual sound-category toggles:
  - `session.start`
  - `task.acknowledge`
  - `task.complete`
  - `task.error`
  - `input.required`
  - `resource.limit`
  - `user.spam`
- `annoyed_threshold`: rapid prompt count that triggers `user.spam`.
- `annoyed_window_seconds`: rapid prompt time window.
- `silent_window_seconds`: suppress `task.complete` sounds for short tasks.

After editing, summarize the exact setting names changed without printing unrelated config.
