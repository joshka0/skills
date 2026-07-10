# Isolation

Read this only when a task needs an isolated local execution environment.

First inspect the installed sandbox tool and repository constraints. Choose disposable execution for a command that should leave no state; choose a persistent sandbox only when the task requires retained files or installed dependencies. Verify isolation, mounted paths, and lifecycle from live tool status.

Do not inject host secrets, copy credential files, expose broad host state, or delete/prune a sandbox without explicit approval. If the required isolation tool or machine profile is unavailable, stop and report the missing prerequisite.
