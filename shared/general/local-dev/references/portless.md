# Portless URLs, Worktrees, and GitLab CI/CD

## Portless

`portless` gives dev servers stable named URLs such as `https://app.localhost`
instead of requiring humans or agents to track changing port numbers.

Default privileged proxy mode usually serves port-free HTTPS URLs:

```sh
portless proxy start
# https://web.localhost
```

Use these commands as the normal local flow:

```sh
portless proxy start
portless trust
portless run pnpm dev
```

For no-sudo local proxy usage, use a high port:

```sh
portless proxy start -p 1355
# https://web.localhost:1355
```

In high-port mode, the URL includes the proxy port. Do not assume
`https://name.localhost` is enough. Use the URL emitted by `portless`,
`PORTLESS_URL`, or `portless get <name>` as the source of truth.

If `portless trust` appears to hang in a non-interactive shell, assume it is
waiting on macOS authentication. Ask the user to run it manually in a terminal
when trusted HTTPS certificates are needed.

For named services, prefer an explicit service name:

```sh
portless web pnpm dev
portless api pnpm start
portless api.myapp pnpm start
```

In shared agent workspaces, service names are global for the local proxy. Do not
reuse generic names like `web` across multiple agents or worktrees. Include the
repo, worktree, branch, ticket, or agent name:

```sh
portless deeptutor-web pnpm dev
portless web-local-dev pnpm dev
portless codex-web pnpm dev
portless feature-123-web pnpm dev
```

If `portless` reports a name is already registered by a running PID, do not
immediately use `--force`. First identify the owner:

```sh
portless list
ps -p <pid> -o pid,ppid,command
```

Only use `--force` when the owner is confirmed stale or the user explicitly
wants to replace that route. Otherwise pick a unique service name.

Resolve generated URLs through `portless` instead of guessing:

```sh
portless list
portless get web
portless get api.myapp
```

For package scripts, prefer:

```json
{
  "scripts": {
    "dev": "portless run next dev",
    "dev:web": "portless web next dev",
    "dev:api": "portless api pnpm start"
  }
}
```

For JavaScript repos, bootstrap `portless.json` with the helper:

```sh
cd /path/to/repo
portless-init-repo --dry-run
portless-init-repo
portless
```

For monorepos, `portless-init-repo` detects `pnpm-workspace.yaml` or
`package.json` workspaces and creates `apps` entries for packages with `dev`
scripts.

For already-running services, containers, or tools that insist on fixed ports,
register an alias:

```sh
portless alias db-admin 8080
portless alias --remove db-admin
```

For mobile devices or real-device testing on the local network, use LAN mode:

```sh
portless proxy start --lan
portless myapp pnpm dev
```

If Safari or system tools do not resolve `.localhost` names correctly:

```sh
portless hosts sync
```

Do not stop the shared proxy, remove aliases, run `portless clean`, or run
`portless hosts clean` unless the user asked for cleanup.

## Worktrees

Do parallel work in isolated worktrees so agents and humans do not mutate the
same checkout.

Preferred flow with `gtr`:

```sh
git gtr new feature/local-dev
git gtr list
```

Fallback with plain Git:

```sh
git worktree add ../worktrees/my-repo-feature-local-dev -b feature/local-dev
git worktree list
```

Worktree rules:

- Put feature, review, or agent work in a dedicated worktree.
- Use worktree-specific `portless` service names so agents do not register the
  same route.
- Do not remove a worktree without confirmation.
- Do not run broad cleanup commands that can delete another agent's workspace.
- Copy only the environment files needed for the task, and do not commit local
  secrets.
- When documenting local URLs, include the `portless` service name and URL, not
  just a port.

## GitLab CI/CD

For new repos and repo migrations:

- Create GitLab projects as private by default.
- Add `.gitlab-ci.yml` unless the repo already has a deliberate alternative.
- Use merge requests as the default review and integration path.
- Store secrets in GitLab CI/CD variables, not in the repo.
- Keep branch protections, required pipeline checks, and protected variables
  aligned with the repo's release risk.
- Do not assume GitHub Actions for CI unless the repository already uses it or
  the user asks for it.

Baseline `.gitlab-ci.yml` expectations:

- Install dependencies from the repo's lockfile.
- Run formatting, linting, type checks, tests, and build checks that match
  local scripts.
- Cache package manager and build artifacts only where the repo's ecosystem
  benefits from it.
- Keep deployment jobs explicit, environment-scoped, and protected for
  production.

## Local Environment Checklist

1. Identify the package manager, lockfile, runtime version files, and existing
   dev scripts.
2. Confirm whether `portless` is available with `command -v portless`.
3. For JS repos, preview and write `portless.json` with `portless-init-repo`.
4. Start or verify the proxy with `portless proxy start`.
5. Before installing dependencies or running setup scripts, decide whether
   `smolvm-local-dev` should contain the work.
6. Use `portless run`, a named wrapper, or `portless` with `portless.json` for
   dev servers.
7. Use a worktree for isolated implementation or agent work.
8. Check local scripts against `.gitlab-ci.yml` and note missing parity.
9. Keep repo creation private by default and GitLab-first unless existing
   project policy says otherwise.

## Troubleshooting

```sh
portless list
portless get <name>
portless proxy start
portless hosts sync
PORTLESS=0 <dev command>
```

Only use cleanup commands after confirming the impact:

```sh
portless alias --remove <name>
portless proxy stop
portless clean
portless hosts clean
```
