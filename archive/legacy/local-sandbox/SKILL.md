---
name: local-sandbox
description: Isolated local development with smolvm microVMs, portless URLs, and sandbox safety. Use when needing stronger isolation than worktrees, disposable execution, or persistent VM state.
---

# local-sandbox

Use this skill when you need isolated local development environments that are
separated from the host machine.

## Reference Routing

| Topic | File |
| ----- | ---- |
| smolvm commands, lifecycle, ephemeral vs persistent, snapshots | `references/smolvm.md` |
| Portless localhost URLs, service naming | `references/portless.md` |
| Network isolation, secret handling, cleanup rules | `references/safety.md` |

## Hard Rules

- **VM vs worktree:** use VMs when isolation matters, worktrees when speed
  matters.
- **Ephemeral for one-off tasks, persistent for stateful work.**
- **Network/secret safety:** do not expose host secrets to VMs without explicit
  approval.
- **Do not delete or prune VMs without user confirmation.**
- Report what isolation was used and how to reproduce.

## Output

Report: isolation choice (ephemeral/persistent/packed artifact), setup steps
taken, verification result, and any host-facing URLs.
