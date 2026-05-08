# Uniwind Pro — Pro-Only Features

Paid upgrade with 100% API compatibility. Built on a 2nd-generation C++ engine for apps that demand the best performance.

## Pricing & Licensing

- **Graduated per-seat pricing** (billed annually, VAT excluded unless applicable): $99 for seats 1-3, $49 for 4-6, $29 for 7-15, $1 for 16+
- **Individual License**: Personal Pro license per engineer
- **Team License**: Single key management — add or remove members instantly
- **CI/CD License**: Full support for automated and headless build environments
- **Enterprise**: Custom plans available (contact support@uniwind.dev)
- **Priority Support**: Critical issues resolved with priority response times
- Pricing and licensing: [https://uniwind.dev/pricing](https://uniwind.dev/pricing)

## Overview

- **C++ style engine**: Injects styles directly into the ShadowTree without triggering React re-renders
- **Performance**: Benchmarked at ~55ms (vs StyleSheet 49ms, traditional Uniwind 81ms, NativeWind 197ms)
- **40+ className props** update without re-renders
- **Reanimated animations**: `animate-*` and `transition-*` via className (Reanimated v4)
- **Native insets & runtime values**: Automatic safe area injection, device rotation, and font size updates
- **Theme transitions**: Native animated transitions when switching themes

## Installation

1. Set dependency alias in `package.json`:
   ```json
   { "dependencies": { "uniwind": "npm:uniwind-pro@latest" } }
   ```

2. Install peer dependencies:
   ```bash
   npm install react-native-nitro-modules react-native-reanimated react-native-worklets
   ```

3. Authenticate: `npx uniwind-pro` (interactive — select "Login with GitHub")

4. Add Babel plugin:
   ```js
   // babel.config.js
   module.exports = {
     presets: ['module:metro-react-native-babel-preset'],
     plugins: ['react-native-worklets/plugin'],
   };
   ```

5. Whitelist postinstall if needed:
   - **bun**: Add `"trustedDependencies": ["uniwind"]` to `package.json`
   - **yarn v2+**: Configure in `.yarnrc.yml`
   - **pnpm**: `pnpm config set enable-pre-post-scripts true`

6. Rebuild native app:
   ```bash
   npx expo prebuild --clean && npx expo run:ios
   ```

Pro does **NOT** work with Expo Go. Requires native rebuild.

**Verify installation**: Check for native modules (`.cpp`, `.mm` files) in `node_modules/uniwind`.

## Shadow Tree Updates (Pro)

No code changes needed — props connect directly to C++ engine, eliminating re-renders automatically.

## Suspense Support (Pro)

Components inside React `Suspense` boundaries are handled correctly. While a subtree is suspended, Uniwind keeps the C++ shadow entries alive so theme updates and runtime changes (dark mode, orientation, etc.) still reach suspended nodes. When the tree unsuspends, styles are already up to date — no flash of stale theme.

## Native Insets (Pro)

Remove `SafeAreaListener` setup — insets injected from native layer:

```tsx
// With Pro — just use safe area classes directly
<View className="pt-safe pb-safe">{/* content */}</View>
```

## Theme Transitions (Pro)

Native animated transitions when switching themes. Supported on iOS, Android, and Web.

```tsx
import { Uniwind, ThemeTransitionPreset } from 'uniwind';

// Fade transition
Uniwind.setTheme('dark', { preset: ThemeTransitionPreset.Fade });

// Slide transitions
Uniwind.setTheme('dark', { preset: ThemeTransitionPreset.SlideRightToLeft });
Uniwind.setTheme('light', { preset: ThemeTransitionPreset.SlideLeftToRight });

// Circle mask transitions (expand from a corner or center)
Uniwind.setTheme('ocean', { preset: ThemeTransitionPreset.CircleCenter });

// Blur transitions
Uniwind.setTheme('dark', { preset: ThemeTransitionPreset.Blur });
Uniwind.setTheme('dark', { preset: ThemeTransitionPreset.BlurRightToLeft });

// No animation
Uniwind.setTheme('light');
```

Available presets:

| Preset | Effect |
|--------|--------|
| `ThemeTransitionPreset.None` | Instant switch, no animation |
| `ThemeTransitionPreset.Fade` | Crossfade between themes |
| `ThemeTransitionPreset.SlideRightToLeft` | Slide new theme in from right |
| `ThemeTransitionPreset.SlideLeftToRight` | Slide new theme in from left |
| `ThemeTransitionPreset.CircleTopRight` | Circle mask expanding from top-right |
| `ThemeTransitionPreset.CircleTopLeft` | Circle mask expanding from top-left |
| `ThemeTransitionPreset.CircleBottomRight` | Circle mask expanding from bottom-right |
| `ThemeTransitionPreset.CircleBottomLeft` | Circle mask expanding from bottom-left |
| `ThemeTransitionPreset.CircleCenter` | Circle mask expanding from center |
| `ThemeTransitionPreset.Blur` | Blur out animation |
| `ThemeTransitionPreset.BlurRightToLeft` | Directional blur from right to left |
| `ThemeTransitionPreset.BlurLeftToRight` | Directional blur from left to right |
