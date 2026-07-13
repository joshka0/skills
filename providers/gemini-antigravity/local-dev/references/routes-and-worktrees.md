# Routes and worktrees

Read this only for Portless or worktree operations.

Check tool availability and existing configuration before action. Use the URL emitted by the running route tool or its status command; do not guess a host, port, or service name. Give concurrent worktrees distinct task-derived route names and inspect an existing registration before replacing it.

Use an isolated worktree for concurrent mutation. Inspect its status before entering, running a command, or cleaning it up. For requested filesystem cleanup, move the exact target to Trash; never use destructive Git or a tool action that permanently deletes it. Stop before changing a shared proxy or route when ownership is unclear.

For a new repository, follow its existing CI and visibility policy; if none exists, make it private by default and record the selected policy. Compare local validation with the repository's existing CI configuration rather than inventing a CI stack.
