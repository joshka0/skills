# Local development workflow

Read this when launching, building, or debugging a Uniwind RN app on a local
device or simulator. Premise: the bundle pipeline is load-bearing — the
Uniwind Metro wrapper, the worklets Babel plugin, and the CSS transform must
all shape the served bundle. Most local-dev failures are lane failures, not
app bugs.

## Lane rules

- Launch only through the app's own Uniwind lane: the repo's make target or
  script that wraps `expo start` / `expo run` with the Uniwind Metro config.
  Never launch a Uniwind app with bare `expo start` or a plain Metro. A
  bundle produced outside the lane can crash the native runtime at startup;
  the observed signature is a SIGABRT in
  `worklets::JSIWorkletsModuleProxy::toOptimizedObject`.
- Before debugging any startup crash, verify the installed compatibility set
  from the working tree — uniwind/uniwind-pro, React Native, Expo SDK,
  `react-native-nitro-modules`, `react-native-reanimated`, and
  `react-native-worklets` — against the installed packages' peer pins and the
  Uniwind MCP or documentation compatibility page. Do not trust memory for
  the matrix; it is volatile.
- If the dev-client lane still crashes after the version set and lane are
  verified clean, stop native debugging and check the uniwind-pro changelog
  for the crash signature. Switch to the embedded-bundle lane below to keep
  working; record the blocked lane in the repo's own run notes.

## The reliable fallback: embedded-bundle native build

A Release (or bundled-Debug) native build embeds the JS bundle and removes
Metro and the dev client from the runtime entirely.

- Export the app's env into the **same shell** as the native build command.
  `EXPO_PUBLIC_*` values inline during the xcodebuild/gradle "bundle React
  Native" phase, not during prebuild; env exported only for prebuild
  produces a working-looking build with no backend URLs in it.
- Verify the artifact, not the exit code: grep the built jsbundle for the
  expected backend URL before installing it anywhere.

## Environment traps

- Metro on Node 24 or newer binds IPv6 `[::1]` only. A dev client must load
  from `localhost:<port>`, never `127.0.0.1:<port>`.
- Tooling that syncs generated dotenv files by appending accumulates
  duplicate keys, and the **last** occurrence wins at bundle time. A stale
  host block at the bottom silently overrides the intended values; grep the
  env file for old hosts before any build.
- uniwind-pro installs are authenticated and use an allowlisted postinstall;
  the first uncredentialed install fails by design. Authenticate, do not
  fight the package manager.

## Capture

Each Uniwind app repo should carry its own run skill or doc with the exact
lane commands, simulator identifiers, and backend topology. When this
workflow uncovers a new lane fact, record it in that repo, not in chat or
memory.
