---
name: product-platform
description: "Route product platform work to mobile, expo-platform, uniwind-migration, terminal-ui, or chrome-extension-builder. Use when an Expo/RN platform, Expo SDK, NativeWind migration, OpenTUI interface, or browser extension needs an owner."
---

# Product Platform

Route one product surface at a time; this router carries only cross-surface selection and safety rules.

## Route

| Target | Select when | Read or hand off |
| --- | --- | --- |
| `mobile` | An Expo or React Native screen, native dependency, navigation, safe-area, list, or device-feel decision changes | `references/mobile.md` |
| `expo-platform` | An Expo SDK upgrade, dev client, DOM island, API route, EAS workflow, or deployment needs platform evidence | `references/expo-platform.md` |
| `uniwind-migration` | A project replaces NativeWind or removes its compatibility/configuration layer | `references/uniwind-migration.md` |
| `terminal-ui` | An OpenTUI renderer, keyboard flow, terminal layout, output, or terminal recovery rule changes | `references/terminal-ui.md` |
| `browser-extension` | A browser extension surface, MV3 worker, content UI, permission, storage, or message contract changes | `chrome-extension-builder` |

Select exactly one target and read only its reference or hand off to the named child. Combine targets only for an explicit pass sequence.

## Precedence

`uniwind` owns installed Uniwind setup and styling decisions; this router owns NativeWind-to-Uniwind migration. `design-family` owns interface-design intent, `code-quality` owns generic source diagnosis, and `local-dev` owns local runtime setup.

## Workflow

1. Inspect the repository's installed platform packages, native/configuration files, target surfaces, and verification commands.
2. Select one target. For version-sensitive platform facts, inspect local configuration first, then live tool status/help, then primary documentation.
3. Preserve the target platform's ownership, lifecycle, permission, or device boundary before changing implementation.
4. Run the narrow platform check that proves the selected surface and report residual risk.

## Hard rules

- Do not turn a product route into a broad framework tutorial or auto-load a second router.
- Do not introduce a native build, platform upgrade, permission, deployment, or remote API behavior without installed-project evidence.
- Keep platform-specific UI, state, and security decisions at their actual adapter boundary; hand generic concerns to their first owner.
- Mark unavailable platform/version evidence as unconfirmed rather than guessing.

## Stop conditions

- Ask for direction when a product decision materially changes supported platforms, data exposure, store delivery, or native-build ownership.
- Report blocked verification when the relevant device, native toolchain, or platform configuration cannot be inspected.

## Output

Return the selected target, local facts inspected, resulting platform decision, focused verification, and residual risk.
