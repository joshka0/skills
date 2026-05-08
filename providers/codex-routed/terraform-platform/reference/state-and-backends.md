# State and Backends

## State Safety

- Remote state with locking is the default for shared environments
- Treat `import`, `state mv`, `state rm`, and backend migration as high-risk operations
- Know who owns applies and where state lives before changing anything

## Working Rules

- Prefer source refactors that converge state naturally
- Use state subcommands only when the safer config-first path is inadequate
- Confirm lock behavior, credentials, and migration path before backend changes

## Common Risks

- Drift between state and cloud reality
- Imports without matching config cleanup
- Resource address changes during module refactors
- Partial migrations leaving teams split across backends
