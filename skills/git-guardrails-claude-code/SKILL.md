---
name: git-guardrails-claude-code
description: "Install a Claude Code PreToolUse hook that blocks named destructive Git commands. Use when the user asks for Git guardrails, blocked push, or reset/clean protection."
---

# Claude Git guardrails

1. Ask for the scope: project (`.claude/hooks/`) or user (`${CLAUDE_CONFIG_DIR:-$HOME/.claude}`).
2. Copy `scripts/block-dangerous-git.sh` there and `chmod +x` it. Requires `jq`.
3. Merge one Bash `PreToolUse` entry into the existing `hooks.PreToolUse` array. Never replace other hooks or settings.
4. Smoke test: a JSON event with a blocked Git command must exit `2` and print a generic notice. It must not echo the command, which can carry secrets. An ordinary command must exit `0`.

It blocks only the named patterns. Do not call it an authorization system.
