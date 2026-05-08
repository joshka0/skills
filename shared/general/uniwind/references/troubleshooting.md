# Troubleshooting — Common Issues, Debugging, Cache Clearing

## Setup Diagnostics

When styles aren't working, check in this order:

### 1. package.json
- `"uniwind"` (or `"uniwind-pro"`) in dependencies
- `"tailwindcss"` at v4+ (`^4.0.0`)
- For Pro: `react-native-nitro-modules`, `react-native-reanimated`, `react-native-worklets`

### 2. metro.config.js
- `withUniwindConfig` imported from `'uniwind/metro'`
- `withUniwindConfig` is the **outermost** wrapper
- `cssEntryFile` is a **relative path string** (e.g., `'./global.css'`)
- No `path.resolve()` or absolute paths

### 3. global.css
- Contains `@import 'tailwindcss';` AND `@import 'uniwind';`
- Imported in `App.tsx` or root layout, **NOT** in `index.ts`/`index.js`
- Location determines app root for Tailwind scanning

### 4. babel.config.js (Pro only)
- `'react-native-worklets/plugin'` in plugins array

### 5. TypeScript
- `uniwind-types.d.ts` exists (generated after running Metro)
- Included in `tsconfig.json` or placed in `src/`/`app/` dir

### 6. Build
- Metro server restarted after config changes
- Metro cache cleared (`npx expo start --clear` or `npx react-native start --reset-cache`)
- Native rebuild done (if Pro or after dependency changes)

## Troubleshooting Table

| Symptom | Cause | Fix |
|---------|-------|-----|
| Styles not applying | Missing imports in global.css | Add `@import 'tailwindcss'; @import 'uniwind';` |
| Styles not applying | global.css imported in index.js | Move import to App.tsx or `_layout.tsx` |
| Classes not detected | global.css in nested dir, components elsewhere | Add `@source '../components'` in global.css |
| TypeScript errors on className | Missing types file | Run Metro to generate `uniwind-types.d.ts` |
| `withUniwindConfig is not a function` | Wrong import | Use `require('uniwind/metro')` not `require('uniwind')` |
| Hot reload full-reloads | global.css imported in wrong file | Move to App.tsx or root layout |
| `cssEntryFile` error / Metro crash | Absolute path used | Use relative: `'./global.css'` |
| `withUniwindConfig` not outermost | Another wrapper wraps Uniwind | Swap order so Uniwind is outermost |
| Dark theme not working | Missing `@variant dark` | Define dark variant in `@layer theme` |
| Custom theme not appearing | Not registered in metro config | Add to `extraThemes` array, restart Metro |
| Fonts not loading | Font name mismatch | CSS font name must match file name exactly (no extension) |
| `rem` values too large/small | Wrong base rem | Set `polyfills: { rem: 14 }` for NativeWind compat |
| Unsupported CSS warning | Web-specific CSS used | Enable `debug: true` to identify; remove unsupported properties |
| `Failed to serialize javascript object` | Complex CSS, circular refs, or stale cache | Clear caches: `watchman watch-del-all; rm -rf node_modules/.cache; npx expo start --clear` |
| `Failed to serialize javascript object` from llms-full.txt or docs | Docs/markdown files with CSS classes in project dir get scanned by Tailwind | Move `.md` files with CSS examples outside the project root, or add to `.gitignore` |
| `unstable_enablePackageExports` conflict | App disables package exports | Use selective resolver for Uniwind and culori |
| Classes from monorepo package missing | Not included in Tailwind scan | Add `@source '../../packages/ui'` in global.css |
| Classes from `node_modules` library missing in production (bun) | Bun uses symlinks; Tailwind's Oxide scanner can't follow them | Use resolved path: `@source "../../node_modules/heroui-native/lib"` and add `public-hoist-pattern[]=heroui-native` to `.npmrc` |
| `active:` not working with `withUniwind` | `withUniwind` does NOT support interactive state selectors | Only core RN `Pressable`/`TextInput`/`Switch` support `active:`/`focus:`/`disabled:`. Third-party pressables wrapped with `withUniwind` won't get states |
| `withUniwind` custom mapping overrides `className`+`style` merging | When manual mapping is provided, `style` prop is not merged | Use auto mapping (no second arg) for `className`+`style` merge. For manual mapping + `className`, double-wrap: `withUniwind(withUniwind(Comp), { mapping })` |
| `withUniwind` loses generic types on `ref` (e.g., `FlashList<T>`) | TypeScript limitation with HOCs | Cast the ref manually: `ref={scrollRef as any}` |
| Platform-specific fonts: `@theme` block error | `@media ios/android` inside `@theme {}` | Use `@layer theme { :root { @variant ios { ... } } }` instead |
| `Uniwind.setTheme('system')` crash on Android (RN 0.82+) | RN 0.82 changed Appearance API | Update to latest Uniwind (fixed). Avoid `setTheme('system')` on older Uniwind + RN 0.82+ |
| Styles flash/disappear on initial load (Android) | `SafeAreaListener` fires before component listeners mount | Fixed in recent versions. If persists, ensure Uniwind is latest |
| `useTVEventHandler` is undefined | Uniwind module replacement interferes with tvOS exports | Fixed in v1.2.1+. Update Uniwind |
| `@layer theme` variables not rendering on web | Bug with RNW + Expo SDK 55 | Fixed in v1.4.1+. Update Uniwind |
| `updateCSSVariables` wrong theme at app start | Calling for multiple themes back-to-back; last call wins on first render | Call `updateCSSVariables` for the current theme last |
| Pro: animations not working | Missing Babel plugin | Add `react-native-worklets/plugin` to babel.config.js |
| Pro: module not found | No native rebuild | Run `npx expo prebuild --clean` then `npx expo run:ios` |
| Pro: postinstall failed | Package manager blocks scripts | Add to `trustedDependencies` (bun) or configure yarn/pnpm |
| Pro: auth expired | Login session expired (180-day lifetime) | Run `npx uniwind-pro`, re-login |
| Pro: download limit reached | Monthly download limit hit | Check Pro dashboard, limits reset monthly |
| Pro: `Uniwind.updateInsets` called unnecessarily | Pro injects insets natively | `Uniwind.updateInsets` is a no-op in Pro. Remove `SafeAreaListener` setup when using Pro |
| Pro: theme transition crash | Missing `ThemeTransitionPreset` import or calling before app is ready | Import from `'uniwind'`. Ensure the app has fully mounted before calling `setTheme` with a transition |

## Cache Clearing

Full cache clear command:

```bash
watchman watch-del-all 2>/dev/null; rm -rf node_modules/.cache && npx expo start --clear
```

This clears Watchman, Babel/bundler caches, and Expo internal cache.

## unstable_enablePackageExports Selective Resolver

If your app disables `unstable_enablePackageExports` (common in crypto apps), use a selective resolver:

```js
config.resolver.unstable_enablePackageExports = false;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (['uniwind', 'culori'].some((prefix) => moduleName.startsWith(prefix))) {
    return context.resolveRequest(
      { ...context, unstable_enablePackageExports: true },
      moduleName,
      platform
    );
  }
  return context.resolveRequest(context, moduleName, platform);
};
```
