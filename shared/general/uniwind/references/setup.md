# Setup — Installation, Metro, global.css, TypeScript, Monorepo

> Uniwind 1.6.0+ / Tailwind CSS v4 / React Native 0.81+ / Expo SDK 54+

## Installation

```bash
# or other package manager
bun install uniwind tailwindcss
```

Requires **Tailwind CSS v4+**.

## global.css

Create a CSS entry file:

```css
@import 'tailwindcss';
@import 'uniwind';
```

Import in your **App component** (e.g., `App.tsx` or `app/_layout.tsx`), **NOT** in `index.ts`/`index.js` — importing there breaks hot reload:

```tsx
// app/_layout.tsx or App.tsx
import './global.css';
```

The directory containing `global.css` is the app root — Tailwind scans for classNames starting from this directory.

## Metro Configuration

```js
const { getDefaultConfig } = require('expo/metro-config');
// Bare RN: const { getDefaultConfig } = require('@react-native/metro-config');
const { withUniwindConfig } = require('uniwind/metro');

const config = getDefaultConfig(__dirname);

// withUniwindConfig MUST be the OUTERMOST wrapper
module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',           // Required — relative path from project root
  polyfills: { rem: 16 },                // Optional — base rem value (default 16)
  extraThemes: ['ocean', 'sunset'],       // Optional — custom themes beyond light/dark
  dtsFile: './uniwind-types.d.ts',        // Optional — TypeScript types output path
  debug: true,                            // Optional — log unsupported CSS in dev
  isTV: false,                            // Optional — enable TV platform support
});
```

For most flows, keep defaults, only provide `cssEntryFile`.

Wrapper order — Uniwind must wrap everything else:

```js
// CORRECT
module.exports = withUniwindConfig(withOtherConfig(config, opts), { cssEntryFile: './global.css' });

// WRONG — Uniwind is NOT outermost
module.exports = withOtherConfig(withUniwindConfig(config, { cssEntryFile: './global.css' }), opts);
```

### Vite Configuration (v1.2.0+)

If user has storybook setup, add extra vite config:

```ts
import tailwindcss from '@tailwindcss/vite';
import { uniwind } from 'uniwind/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    uniwind({
      cssEntryFile: './src/global.css',
      dtsFile: './src/uniwind-types.d.ts',
    }),
  ],
});
```

## TypeScript

Uniwind auto-generates a `.d.ts` file (default: `./uniwind-types.d.ts`) after running Metro. Place it in `src/` or `app/` for auto-inclusion, or add to `tsconfig.json`:

```json
{ "include": ["./uniwind-types.d.ts"] }
```

If user has some typescript errors related to classNames, just run metro server to build the d.ts file.

## Expo Router Placement

```text
project/
├── app/_layout.tsx    ← import '../global.css' here
├── components/
├── global.css         ← project root (best location)
└── metro.config.js    ← cssEntryFile: './global.css'
```

If `global.css` is in `app/` dir, add `@source` for sibling directories:

```css
@import 'tailwindcss';
@import 'uniwind';
@source '../components';
```

## Tailwind IntelliSense (VS Code / Cursor / Windsurf)

```json
{
  "tailwindCSS.classAttributes": [
    "class", "className", "headerClassName",
    "contentContainerClassName", "columnWrapperClassName",
    "endFillColorClassName", "imageClassName", "tintColorClassName",
    "ios_backgroundColorClassName", "thumbColorClassName",
    "trackColorOnClassName", "trackColorOffClassName",
    "selectionColorClassName", "cursorColorClassName",
    "underlineColorAndroidClassName", "placeholderTextColorClassName",
    "selectionHandleColorClassName", "colorsClassName",
    "progressBackgroundColorClassName", "titleColorClassName",
    "underlayColorClassName", "colorClassName",
    "backdropColorClassName", "backgroundColorClassName",
    "statusBarBackgroundColorClassName", "drawerBackgroundColorClassName",
    "ListFooterComponentClassName", "ListHeaderComponentClassName"
  ],
  "tailwindCSS.classFunctions": ["useResolveClassNames"]
}
```

## Monorepo Support

Add `@source` directives in `global.css` for packages outside the CSS entry file's directory:

```css
@import 'tailwindcss';
@import 'uniwind';
@source "../../packages/ui/src";
@source "../../packages/shared/src";
```

Also needed for `node_modules` packages that contain Uniwind classes (e.g., shared UI libraries).

## Critical Setup Rules

1. **Tailwind v4 only** — Use `@import 'tailwindcss'` not `@tailwind base`. Tailwind v3 is not supported.
2. **No `tailwind.config.js`** — All config goes in `global.css` via `@theme` and `@layer theme`.
3. **`withUniwindConfig` must be the outermost** Metro config wrapper.
4. **`cssEntryFile` must be a relative path string** — Use `'./global.css'` not `path.resolve(__dirname, 'global.css')`.
5. **rem default is 16px** — NativeWind used 14px. Set `polyfills: { rem: 14 }` in metro config if migrating.
