# Local topology

Read this only when a task needs a Portless route, a worktree-scoped route, a development proxy, or a local reachability path.

1. Inspect the installed route/proxy tool, repository conventions, existing registrations, and live status before changing topology.
2. Use the URL emitted by the running tool or its status command; never guess a hostname, port, service name, or trusted endpoint. Give concurrent worktrees distinct task-derived route names and inspect an existing registration before replacing it.
3. Use an isolated worktree for concurrent mutation and inspect its status before entering, running commands, or cleaning it up. Verify cleanup targets and command effects; preserve unique work and branches, and prefer Trash when practical.
4. Scope a proxy to the requested service and verify reachability with a non-sensitive request. Do not publish an internal service, alter trust settings, or store access values without explicit authorization.
5. When the requested surface is reachability from other devices on a tailnet rather than from this machine, read `tailnet-publishing.md` before changing any proxy configuration.
6. When a browser bridge is the requested surface, hand browser interaction to `local-http-browser-use`; this mode owns only the local connectivity decision.

Stop before replacing a shared route or proxy when ownership is unclear or a cleanup command would exceed the authorized scope. Return the discovered configuration/status source, route or reachability result, and any unresolved owner or safety boundary.
