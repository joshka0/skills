# Theming — CSS Variables, Custom Themes, ScopedTheme, Runtime Updates

## Quick Setup (dark: prefix)

Works immediately — no configuration needed:

```tsx
<View className="bg-white dark:bg-gray-900">
  <Text className="text-black dark:text-white">Themed</Text>
</View>
```

Best for small apps and prototyping. Does not scale to custom themes.

## Scalable Setup (CSS Variables)

Define in `global.css`, use everywhere without `dark:` prefix:

```css
@layer theme {
  :root {
    @variant light {
      --color-background: #ffffff;
      --color-foreground: #111827;
      --color-foreground-secondary: #6b7280;
      --color-card: #ffffff;
      --color-border: #e5e7eb;
      --color-muted: #9ca3af;
      --color-primary: #3b82f6;
      --color-danger: #ef4444;
      --color-success: #10b981;
    }
    @variant dark {
      --color-background: #000000;
      --color-foreground: #ffffff;
      --color-foreground-secondary: #9ca3af;
      --color-card: #1f2937;
      --color-border: #374151;
      --color-muted: #6b7280;
      --color-primary: #3b82f6;
      --color-danger: #ef4444;
      --color-success: #10b981;
    }
  }
}
```

```tsx
// Auto-adapts to current theme — no dark: prefix needed
<View className="bg-card border border-border p-4 rounded-lg">
  <Text className="text-foreground text-lg font-bold">Title</Text>
  <Text className="text-muted mt-2">Subtitle</Text>
</View>
```

Variable naming: `--color-background` → `bg-background`, `text-background`.

**Prefer CSS variables over explicit `dark:` variants** — they're cleaner, maintain easier, and work with custom themes automatically.

### Critical Theme Rule

All theme variants must define the **same set of CSS variables**. If `light` defines `--color-primary`, then `dark` and every custom theme must too. Mismatched variables cause runtime errors.

## Custom Themes

**Step 1** — Define in `global.css`:

```css
@layer theme {
  :root {
    @variant light { /* ... */ }
    @variant dark { /* ... */ }
    @variant ocean {
      --color-background: #0c4a6e;
      --color-foreground: #e0f2fe;
      --color-primary: #06b6d4;
      --color-card: #0e7490;
      --color-border: #155e75;
      /* Must define ALL the same variables as light/dark */
    }
  }
}
```

**Step 2** — Register in `metro.config.js` (exclude `light`/`dark` — they're automatic):

```js
module.exports = withUniwindConfig(config, {
  cssEntryFile: './global.css',
  extraThemes: ['ocean'],
});
```

Restart Metro after adding themes.

**Step 3** — Use:

```tsx
Uniwind.setTheme('ocean');
```

## Theme API

```tsx
import { Uniwind, useUniwind } from 'uniwind';

// Imperative (no re-render)
Uniwind.setTheme('dark');          // Force dark
Uniwind.setTheme('light');         // Force light
Uniwind.setTheme('system');        // Follow device (re-enables adaptive themes)
Uniwind.setTheme('ocean');         // Custom theme (must be in extraThemes)
Uniwind.currentTheme;              // Current theme name
Uniwind.hasAdaptiveThemes;         // true if following system

// Reactive hook (re-renders on change)
const { theme, hasAdaptiveThemes } = useUniwind();
```

`Uniwind.setTheme('light')` / `setTheme('dark')` also calls `Appearance.setColorScheme` to sync native components (Alert, Modal, system dialogs).

By default Uniwind uses "system" theme - follows device color scheme. If user wants to override it, just call Uniwind.setTheme with desired theme. It can be done above the React component to avoid theme switching at runtime.

## Theme Switcher Example

```tsx
import { View, Pressable, Text, ScrollView } from 'react-native';
import { Uniwind, useUniwind } from 'uniwind';

export const ThemeSwitcher = () => {
  const { theme, hasAdaptiveThemes } = useUniwind();
  const activeTheme = hasAdaptiveThemes ? 'system' : theme;

  const themes = [
    { name: 'light', label: 'Light' },
    { name: 'dark', label: 'Dark' },
    { name: 'system', label: 'System' },
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-2 p-4">
        {themes.map((t) => (
          <Pressable
            key={t.name}
            onPress={() => Uniwind.setTheme(t.name)}
            className={`px-4 py-3 rounded-lg items-center ${
              activeTheme === t.name ? 'bg-primary' : 'bg-card border border-border'
            }`}
          >
            <Text className={`text-sm ${
              activeTheme === t.name ? 'text-white' : 'text-foreground'
            }`}>
              {t.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
};
```

## ScopedTheme

Apply a different theme to a subtree without changing the global theme:

```tsx
import { ScopedTheme } from 'uniwind';

<View className="gap-3">
  <PreviewCard />

  <ScopedTheme theme="dark">
    <PreviewCard />  {/* Renders with dark theme */}
  </ScopedTheme>

  <ScopedTheme theme="ocean">
    <PreviewCard />  {/* Renders with ocean theme */}
  </ScopedTheme>
</View>
```

- Nearest `ScopedTheme` wins (nested scopes supported)
- Hooks (`useUniwind`, `useResolveClassNames`, `useCSSVariable`) resolve against the nearest scoped theme
- `withUniwind`-wrapped components inside the scope also resolve scoped theme values
- Custom themes require registration in `extraThemes`

## useCSSVariable

Access CSS variable values in JavaScript:

```tsx
import { useCSSVariable } from 'uniwind';

const primaryColor = useCSSVariable('--color-primary');
const spacing = useCSSVariable('--spacing-4');

// Multiple variables at once
const [bg, fg] = useCSSVariable(['--color-background', '--color-foreground']) as [string, string]
```

Use for: animations, chart libraries, third-party component configs, calculations with design tokens.

It's required to cast the result of `useCSSVariable` as it can return: string | number | undefined.

## Runtime CSS Variable Updates

Update theme variables at runtime (e.g., user-selected brand colors or API-driven themes):

```tsx
Uniwind.updateCSSVariables('light', {
  '--color-primary': '#ff6600',
  '--color-background': '#fafafa',
});
```

Updates are theme-specific and take effect immediately.

## @theme static

For JS-only values not used in classNames:

```css
@theme static {
  --chart-line-width: 2;
  --chart-dot-radius: 4;
  --animation-duration: 300;
}
```

Access via `useCSSVariable('--chart-line-width')`. Use for: chart configs, animation durations, native module values.

## @theme Directive

Customize Tailwind design tokens in `global.css`:

```css
@theme {
  /* Colors */
  --color-primary: #3b82f6;
  --color-brand-500: #3b82f6;
  --color-brand-900: #1e3a8a;

  /* Typography */
  --font-sans: 'Roboto-Regular';
  --font-sans-medium: 'Roboto-Medium';
  --font-sans-bold: 'Roboto-Bold';
  --font-mono: 'FiraCode-Regular';

  /* Spacing & sizing */
  --text-base: 15px;
  --spacing-4: 16px;
  --radius-lg: 12px;

  /* Breakpoints */
  --breakpoint-tablet: 820px;
}
```

Usage: `bg-brand-500`, `text-brand-900`, `font-sans`, `font-mono`, `rounded-lg`.

## Fonts

React Native requires a **single font** per family — no fallbacks:

```css
@theme {
  --font-sans: 'Roboto-Regular';
  --font-sans-bold: 'Roboto-Bold';
  --font-mono: 'FiraCode-Regular';
}
```

Font name must **exactly match** the font file name (without extension).

**Expo**: Configure fonts in `app.json` with the `expo-font` plugin, then reference in CSS.

**Bare RN**: Use `react-native-asset` to link fonts, same CSS config.

**Platform-specific fonts** (use `@variant`, not `@media`):

```css
@layer theme {
  :root {
    @variant ios { --font-sans: 'SF Pro Text'; }
    @variant android { --font-sans: 'Roboto-Regular'; }
    @variant web { --font-sans: 'system-ui'; }
  }
}
```

## OKLCH Colors

Perceptually uniform color format — wider gamut, consistent lightness:

```css
@layer theme {
  :root {
    @variant light {
      --color-primary: oklch(0.5 0.2 240);
      --color-background: oklch(1 0 0);
    }
    @variant dark {
      --color-primary: oklch(0.6 0.2 240);
      --color-background: oklch(0.13 0.004 17.69);
    }
  }
}
```

## Display P3 Colors

Wide-gamut color format for devices that support the P3 color space:

```css
@layer theme {
  :root {
    @variant light {
      --color-primary: color(display-p3 0.2 0.4 1);
      --color-accent: color(display-p3 1 0.3 0.3);
    }
    @variant dark {
      --color-primary: color(display-p3 0.3 0.5 1);
      --color-accent: color(display-p3 1 0.4 0.4);
    }
  }
}
```

## Platform Selectors

Apply platform-specific styles directly in className:

```tsx
// Individual platforms
<View className="ios:bg-red-500 android:bg-blue-500 web:bg-green-500" />

// native: shorthand (iOS + Android)
<View className="native:bg-blue-500 web:bg-gray-500" />

// TV platforms
<View className="tv:p-8 android-tv:bg-black apple-tv:bg-gray-900" />

// Combine with other utilities
<View className="p-4 ios:pt-12 android:pt-6 web:pt-4" />
```

Platform variants in `@layer theme` for global values (use `@variant`, not `@media`):

```css
@layer theme {
  :root {
    @variant ios { --font-sans: 'SF Pro Text'; }
    @variant android { --font-sans: 'Roboto-Regular'; }
    @variant web { --font-sans: 'Inter'; }
  }
}
```

**Prefer platform selectors over `Platform.select()`** — cleaner syntax, no imports needed.

## Responsive Breakpoints

Mobile-first — unprefixed styles apply to all sizes, prefixed styles apply at that breakpoint and above:

| Prefix | Min Width | Typical Device |
|--------|-----------|----------------|
| (none) | 0px | All (mobile) |
| `sm:` | 640px | Large phones |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Landscape tablets |
| `xl:` | 1280px | Desktops |
| `2xl:` | 1536px | Large desktops |

```tsx
// Responsive padding and typography
<View className="p-4 sm:p-6 lg:p-8">
  <Text className="text-base sm:text-lg lg:text-xl font-bold">Responsive</Text>
</View>
```

Custom breakpoints:

```css
@theme {
  --breakpoint-xs: 480px;
  --breakpoint-tablet: 820px;
  --breakpoint-3xl: 1920px;
}
```

**Design mobile-first** — start with base styles (no prefix), enhance with breakpoints.

## Data Selectors

Style based on prop values using `data-[prop=value]:utility`:

```tsx
// Boolean props
<Pressable
  data-selected={isSelected}
  className="border rounded px-3 py-2 data-[selected=true]:ring-2 data-[selected=true]:ring-primary"
/>

// String props
<View
  data-state={isOpen ? 'open' : 'closed'}
  className="p-4 data-[state=open]:bg-muted/50 data-[state=closed]:bg-transparent"
/>

// Toggle pattern
<Pressable
  data-checked={enabled}
  className="h-6 w-10 rounded-full bg-muted data-[checked=true]:bg-primary"
>
  <View className="h-5 w-5 rounded-full bg-background translate-x-0 data-[checked=true]:translate-x-4" />
</Pressable>
```

**Rules**: Only equality selectors supported. No presence-only selectors (`data-[prop]`). No `has-data-*` parent selectors. Booleans match both boolean and string forms.

## Interactive States

```tsx
// active: — when pressed
<Pressable className="bg-primary active:bg-primary/80 active:opacity-90 active:scale-95">
  <Text className="text-white">Press me</Text>
</Pressable>

// disabled: — when disabled prop is true
<Pressable
  disabled={isLoading}
  className="bg-primary disabled:bg-gray-300 disabled:opacity-50"
>
  <Text className="text-white disabled:text-gray-500">Submit</Text>
</Pressable>

// focus: — keyboard/accessibility focus
<TextInput
  className="border border-border rounded-lg px-4 py-2 focus:border-primary focus:ring-2 focus:ring-primary/20"
/>
```

Components with state support:
- **Pressable**: `active:`, `disabled:`, `focus:`
- **TextInput**: `active:`, `disabled:`, `focus:`
- **Switch**: `disabled:`
- **Text**: `active:`, `disabled:`
- **TouchableOpacity / TouchableHighlight / TouchableNativeFeedback / TouchableWithoutFeedback**: `active:`, `disabled:`
