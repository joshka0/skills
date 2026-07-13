---
name: git-guardrails-claude-code
description: "Install a Claude Code PreToolUse guard that blocks named destructive Git commands before execution. Use when the user requests Claude Git guardrails, blocked push, or protection from reset/clean."
---

# Claude Git Guardrails

Install the packaged blocker only at a user-approved project or user scope, preserving existing Claude settings.

## Workflow

1. Ask whether the target is project-local or the user's Claude configuration.
2. Inspect the target settings and hook directory; stop if the intended scope is ambiguous.
3. Copy `scripts/block-dangerous-git.sh`, make the target copy executable, and merge one `PreToolUse` Bash hook without overwriting existing hooks.
4. Read `references/hook-shape.md` only when selecting the target path or merge shape.
5. Send a harmless sample command to the copied script and verify the blocked exit status before reporting completion.

## Hard rules

- The hook blocks only the named Git patterns; do not claim it is a complete authorization system.
- Do not replace settings, alter a project's policy, or add patterns without explicit scope approval.
- Do not echo the intercepted command in hook output; it can contain secret-bearing arguments.
- A missing `jq`, settings file ambiguity, or failed smoke test stops installation.

## Output

Report scope, hook path, preserved-settings result, blocked-pattern test status, and any user-selected customization.
