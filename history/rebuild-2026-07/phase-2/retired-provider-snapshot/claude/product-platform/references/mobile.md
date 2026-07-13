# Mobile Platform

Read this only for the `mobile` target.

1. Start with the installed Expo/React Native project and device target; use a custom native build only when an actual native dependency or configuration requires it.
2. Keep native dependencies declared in the application package that owns autolinking; do not infer monorepo behavior from a workspace root.
3. Prefer native navigation, headers, input, and accessibility behavior over web-shaped substitutes; keep web elements inside an explicit web/DOM boundary.
4. Let the navigation or scroll container own safe-area treatment rather than adding compensating page padding; make keyboard and dynamic-type behavior testable on device.
5. Use virtualized lists for unbounded or frequently changing data, but profile the actual screen before adding memoization or list complexity.
6. Keep every rendered native string inside the platform text primitive and move expensive work out of long-lived UI callbacks.

Verify the changed screen on the intended device/runtime, including an empty state, loading/error state, and the relevant accessibility or input path.
