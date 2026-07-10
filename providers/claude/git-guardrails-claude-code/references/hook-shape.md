# Hook shape

Read this only after the user chooses project or user scope.

Use the target's existing Claude configuration convention. The hook command invokes the copied `block-dangerous-git.sh` for Bash `PreToolUse` events. Merge into the existing `hooks.PreToolUse` array; never replace unrelated hooks or settings.

For project scope, place the copy under that project's `.claude/hooks/`. For user scope, place it under the Claude configuration directory selected by the user or its documented environment variable. Use the installed Claude documentation or existing settings syntax when versions differ.

Smoke test the copied script with a JSON event containing a known blocked Git command. It must exit `2` and write a generic blocked notice without reproducing command text. A non-blocked ordinary command must exit `0`.
