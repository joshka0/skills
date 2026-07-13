# Isolation

Read this only when a task needs an isolated local execution environment.

First inspect the installed sandbox tool and repository constraints. Choose disposable execution for a command that should leave no state; choose a persistent sandbox only when the task requires retained files or installed dependencies. Verify isolation, mounted paths, and lifecycle from live tool status.

Do not inject host secrets, copy credential files, or expose broad host state. For requested cleanup, use the tool only when live help proves it moves the sandbox to Trash; otherwise stop and report the unsupported safe cleanup. Approval does not authorize permanent deletion or destructive Git. If the required isolation tool or machine profile is unavailable, stop and report the missing prerequisite.
