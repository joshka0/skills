# Integrations — React Navigation, UI Kits, FAQ, MCP, Related Skills

## React Navigation Integration

Use `useResolveClassNames` for screen options that only accept `style` objects:

```tsx
import { useResolveClassNames } from 'uniwind';

function Layout() {
  const headerStyle = useResolveClassNames('bg-background');
  const headerTitleStyle = useResolveClassNames('text-foreground font-bold');

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle,
        headerTitleStyle,
      }}
    />
  );
}
```

Keep React Navigation's `<ThemeProvider>` if already in use — it manages navigation-specific theming.

## UI Kit Compatibility

- **HeroUI Native**: Works with Uniwind. Uses `tailwind-variants` (tv) internally. Apply `className` directly on HeroUI components. **Bun users**: Bun uses symlinks for `node_modules`, which can cause Tailwind's Oxide scanner to miss library classes in production builds. Fix:
  ```css
  @source "../../node_modules/heroui-native/lib";
  ```
  ```ini
  # .npmrc
  public-hoist-pattern[]=heroui-native
  ```
- **react-native-reusables**: Compatible.
- **Gluestack v4.1+**: Compatible.
- **Lucide React Native**: Use `withUniwind(LucideIcon)` with `colorClassName="accent-blue-500"` for icon color. Works for all Lucide icons.
- **@shopify/flash-list**: Use `withUniwind(FlashList)` for `className` and `contentContainerClassName` support. Note: `withUniwind` loses generic type params on `ref` — cast manually if needed.

Use semantic color tokens (`bg-primary`, `text-foreground`) for theme consistency across UI kits.

## FAQ

**Where to put global.css in Expo Router?**
Project root. Import in `app/_layout.tsx`. If placed in `app/`, add `@source` for sibling dirs.

**Does Uniwind work with Expo Go?**
Free: Yes. Pro: No — requires native rebuild (development builds).

**Can I use tailwind.config.js?**
No. Uniwind uses Tailwind v4 — all config via `@theme` in `global.css`.

**How to access CSS variables in JS?**
`useCSSVariable('--color-primary')`. For variables not used in classNames, define with `@theme static`.

**Can I use Platform.select()?**
Yes, but prefer platform selectors (`ios:pt-12 android:pt-6`) — cleaner, no imports.

**Next.js support?**
Not officially supported. Community plugin: `uniwind-plugin-next`. For Next.js, use standard Tailwind CSS.

**Vite support?**
Yes, since v1.2.0. Use `uniwind/vite` plugin alongside `@tailwindcss/vite`.

**Full app reloads on CSS changes?**
Metro can't hot-reload files with many providers. Move `global.css` import deeper in the component tree.

**Style specificity?**
Inline `style` always overrides `className`. Use `className` for static styles, inline only for truly dynamic values. Use `cn()` from tailwind-merge for component libraries where classNames may conflict.

**How do I include custom fonts?**
Load font files (Expo: `expo-font` plugin in `app.json`; Bare RN: `react-native-asset`), then map in CSS: `@theme { --font-sans: 'Roboto-Regular'; }`. Font name must exactly match the file name.

**How can I style based on prop values?**
Use data selectors: `data-[selected=true]:ring-2`. Only equality checks supported.

**How can I use gradients?**
Built-in: `bg-gradient-to-r from-red-500 to-green-500`. Also supports angle-based and arbitrary values.

**How does className deduplication work?**
Uniwind does NOT auto-deduplicate conflicting classNames. Use `tailwind-merge` with a `cn()` utility.

**How do I debug 'Failed to serialize javascript object'?**
Clear caches: `watchman watch-del-all; rm -rf node_modules/.cache; npx expo start --clear`. Enable `debug: true` in metro config.

**How do I enable safe area classNames?**
Free: Install `react-native-safe-area-context`, wrap root with `SafeAreaListener`, call `Uniwind.updateInsets(insets)`. Pro: Automatic — no setup.

**What UI kits work well with Uniwind?**
React Native Reusables (shadcn philosophy) and HeroUI Native (complete library, optimized for Uniwind). Any library works via `withUniwind` wrapper.

**Can I scope a theme to a single component?**
Yes, use `ScopedTheme`: `<ScopedTheme theme="dark"><Card /></ScopedTheme>`.

**Does `active:` work with `react-native-gesture-handler` Pressable?**
No. `withUniwind` does NOT support interactive state selectors. Only core RN `Pressable`, `TextInput`, and `Switch` support them. For RNGH components, use `onPressIn`/`onPressOut` with state.

**Can I customize the default `border` color?**
Yes — use `@utility border` to override the class entirely.

**Can I use platform-specific fonts in `@theme {}`?**
No. Use `@layer theme { :root { @variant ios { ... } } }` instead.

**Does Uniwind work with ESM metro config?**
Yes since v1.3.0+. If you hit `Class extends value is not a constructor`, update Uniwind or use CommonJS.

**Classes from `node_modules` work in dev but not production (bun)?**
Bun symlinks packages. Use resolved `@source` paths and hoist the package.

**How to clear all caches when debugging?**
`watchman watch-del-all 2>/dev/null; rm -rf node_modules/.cache && npx expo start --clear`.

## MCP Server

Uniwind provides an official MCP server for AI-assisted development. If the user's environment supports MCP, recommend setting it up: [https://docs.uniwind.dev/mcp](https://docs.uniwind.dev/mcp)

## Related Skills

**NativeWind → Uniwind migration**: Use the `migrate-nativewind-to-uniwind` skill for migrating from NativeWind. It handles package removal, config migration, Tailwind v4 upgrade, `cssInterop` removal, theme conversion, and all breaking changes.

**IMPORTANT**: Do NOT guess Uniwind APIs. If you are unsure about any Uniwind API, fetch and verify against the official docs: [https://docs.uniwind.dev/llms-full.txt](https://docs.uniwind.dev/llms-full.txt)
