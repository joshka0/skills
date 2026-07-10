# Expo SDK Upgrade Process

For SDK-version-specific facts, verify against official Expo docs before editing
code. Expo SDK facts age quickly; this reference is a workflow guide, not the
final authority for version facts.

## Step-by-Step Upgrade

1. **Choose target SDK** — Decide which SDK to upgrade to.
2. **Read official release notes** — https://expo.dev/changelog
3. **Upgrade Expo and dependencies**

```bash
npx expo install expo@latest
npx expo install --fix
```

4. **Run diagnostics** — `npx expo-doctor`

5. **Inspect deprecated packages** — See the deprecated packages table below.
   Update all code usage before removing the old package.

6. **Clear caches and reinstall**

```bash
npx expo export -p ios --clear
rm -rf node_modules .expo
watchman watch-del-all
```

7. **Prebuild only when native changes require it**

```bash
npx expo prebuild --clean
```

This regenerates the `ios` and `android` directories. Ensure the project is not
a bare workflow app before running this command.

8. **Test platform-sensitive features** — camera, audio, video, navigation,
   push notifications, background tasks.

## Breaking Changes Checklist

- Check for removed APIs in release notes
- Update import paths for moved modules
- Review native module changes requiring prebuild
- Test all camera, audio, and video features
- Verify navigation still works correctly

## Beta/Preview Releases

Beta versions use `.preview` suffix (e.g., `55.0.0-preview.2`), published under
`@next` tag.

Check if latest is beta: https://exp.host/--/api/v2/versions (look for
`-preview` in `expoVersion`)

```bash
npx expo install expo@next --fix  # install beta
```

## Deprecated Packages

| Old Package          | Replacement                                          |
| -------------------- | ---------------------------------------------------- |
| `expo-av`            | `expo-audio` and `expo-video`                        |
| `expo-permissions`   | Individual package permission APIs                   |
| `@expo/vector-icons` | `expo-symbols` (for SF Symbols)                      |
| `AsyncStorage`       | `expo-sqlite/localStorage/install`                   |
| `expo-app-loading`   | `expo-splash-screen`                                 |
| expo-linear-gradient | experimental_backgroundImage + CSS gradients in View |

For expo-av migration: convert `Audio.Sound` to `useAudioPlayer`,
`Audio.Recording` to `useAudioRecorder`, and `Video` to `VideoView` with
`useVideoPlayer`.

## Housekeeping

- If using SDK 54+, ensure `react-native-worklets` is installed (required for
  `react-native-reanimated`).
- Enable React Compiler in SDK 54+ by adding
  `"experiments": { "reactCompiler": true }` to `app.json`.
- Delete `sdkVersion` from `app.json` to let Expo manage it automatically.
- Remove implicit packages from `package.json`: `@babel/core`,
  `babel-preset-expo`, `expo-constants`.
- If `babel.config.js` only contains `babel-preset-expo`, delete the file.
- If `metro.config.js` only contains expo defaults, delete the file.
- Check `expo.install.exclude` in `package.json` — exclusions are often
  workarounds that may no longer be needed after upgrading.
- Check `patches/` directory for outdated patches and remove them if no longer
  needed.
- `autoprefixer` isn't needed in SDK +53. Remove from deps and postcss config.
- Use `postcss.config.mjs` in SDK +53.
- `resolver.unstable_enablePackageExports` is default in SDK +53.
- `experimentalImportSupport` is default in SDK +54.
- `EXPO_USE_FAST_RESOLVER=1` is removed in SDK +54.
- Expo webpack is deprecated; migrate to Expo Router and Metro web.

## New Architecture (SDK 53+)

The new architecture is enabled by default. `newArchEnabled: true` in app.json
is no longer needed. Expo Go only supports the new architecture as of SDK 53.

Common issues:
- Some older native modules may not support the new architecture.
- Reanimated requires `react-native-worklets` in SDK 54+.
- Some layout animations behave differently — test thoroughly.

## SDK-Specific Notes

### SDK 54: React 19

- `useContext` → `use` hook (can be called conditionally)
- `Context.Provider` → `Context` (no `.Provider` suffix)
- `forwardRef` removed — `ref` is now a regular prop
- React Compiler is stable and recommended

### SDK 55: Native Tabs

- `Icon`, `Label`, `Badge`, `VectorIcon` are now accessed as
  `NativeTabs.Trigger.*` instead of separate imports.
- New `NativeTabs.BottomAccessory` for content above tab bar.

## Clear Caches for Bare Workflow

- iOS: `cd ios && pod install --repo-update`
- Xcode: `npx expo run:ios --no-build-cache`
- Android: `cd android && ./gradlew clean`
