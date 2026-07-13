# Expo Platform

Read this only for the `expo-platform` target.

1. Inspect the installed SDK, app configuration, lockfile, generated native projects, and existing delivery workflow before an upgrade or platform change.
2. Keep SDK upgrades as a compatibility pass: update project-owned configuration together, run the repository diagnostics, and resolve package/version facts from installed evidence and current Expo documentation.
3. Use a development client or prebuild only when a required native capability cannot run in the current supported runtime; do not create native project churn as a default.
4. Keep DOM components as small, serializable islands and leave navigation chrome and native interaction at the native boundary.
5. Treat API routes, EAS workflow syntax, store delivery, and hosting behavior as current platform contracts; verify them live rather than copying static recipes.

Verify the target runtime, build/deploy configuration, and the smallest affected device or web path. Record any unavailable credentialed service as blocked, not inferred.
