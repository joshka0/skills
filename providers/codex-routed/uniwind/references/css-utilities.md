# CSS Utilities — Custom CSS, @utility, CSS Functions, Gradients

## Custom CSS Classes

Uniwind supports custom CSS class names defined in `global.css`. They are compiled at build time — no runtime overhead. Use them when you need styles that are hard to express as Tailwind utilities.

```css
/* global.css */
.card-shadow {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.adaptive-surface {
  background-color: light-dark(#ffffff, #1f2937);
  color: light-dark(#111827, #f9fafb);
}

.container {
  flex: 1;
  width: 100%;
  max-width: 1200px;
}
```

Apply via `className` just like any Tailwind class:

```tsx
<View className="card-shadow" />
```

### Mixing Custom CSS with Tailwind

You can combine custom CSS classes with Tailwind utilities in a single `className`:

```tsx
<View className="card-shadow p-4 m-2">
  <Text className="adaptive-surface mb-2">{title}</Text>
  <View className="container flex-row">{children}</View>
</View>
```

**WARNING**: If a custom CSS class and a Tailwind utility set the **same property**, you **MUST** use `cn()` to deduplicate. Without `cn()`, both values apply and the result is unpredictable.

### Guidelines for Custom CSS

- Keep selectors flat — no deep nesting or child selectors
- Prefer Tailwind utilities for simple, single-property styles
- Use custom classes for complex or multi-property bundles
- Use `light-dark()` for theme-aware custom classes
- Custom classes are great for shared design tokens that don't fit Tailwind's naming (e.g., `.card`, `.chip`, `.badge-dot`)

## @utility Directive

Creates utility classes that work exactly like built-in Tailwind classes. Three main use cases:

### 1. Variable-driven utilities (runtime-injected values)

```css
@theme static {
  --header-height: 0px;
}

@utility p-safe-header {
  padding-top: var(--header-height);
}
```

Inject the real value at runtime:

```tsx
Uniwind.updateCSSVariables(Uniwind.currentTheme, {
  '--header-height': headerHeight,
})
```

### 2. Brand-new utilities (no Tailwind equivalent)

```css
@utility h-hairline { height: hairlineWidth(); }
@utility text-scaled { font-size: fontScale(); }
@utility card-shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
```

### 3. Overriding existing Tailwind utilities

```css
@utility border {
  border-width: 1px;
  border-style: solid;
  border-color: var(--color-primary);
}
```

This completely replaces the built-in `border` behavior, so re-declare any properties you still need. Alternatively, use `border border-gray-300` explicitly or define `--color-border` in `@theme` and use `border-border`.

## CSS Functions

Uniwind provides CSS functions for device-aware and theme-aware styling. These can be used everywhere (custom CSS classes, `@utility`, etc.) — but NOT inside `@theme {}` (which only accepts static values).

### hairlineWidth()

Returns the thinnest line width displayable on the device. Use for subtle borders and dividers.

```css
@utility h-hairline { height: hairlineWidth(); }
@utility border-hairline { border-width: hairlineWidth(); }
@utility w-hairline { width: calc(hairlineWidth() * 10); }
```

```tsx
<View className="h-hairline bg-gray-300" />
<View className="border-hairline border-gray-200 rounded-lg p-4" />
```

### fontScale(multiplier?)

Multiplies a base value by the device's font scale accessibility setting.

- **`fontScale()`** — uses multiplier 1 (device font scale × 1)
- **`fontScale(0.9)`** — smaller scale
- **`fontScale(1.2)`** — larger scale

```css
@utility text-sm-scaled { font-size: fontScale(0.9); }
@utility text-base-scaled { font-size: fontScale(); }
@utility text-lg-scaled { font-size: fontScale(1.2); }
```

```tsx
<Text className="text-sm-scaled text-gray-600">Small accessible text</Text>
<Text className="text-base-scaled">Regular accessible text</Text>
```

### pixelRatio(multiplier?)

Multiplies a value by the device's pixel ratio. Creates pixel-perfect designs that scale across screen densities.

- **`pixelRatio()`** — uses multiplier 1 (device pixel ratio × 1)
- **`pixelRatio(2)`** — double the pixel ratio

```css
@utility w-icon { width: pixelRatio(); }
@utility w-avatar { width: pixelRatio(2); }
```

```tsx
<Image source={{ uri: 'avatar.png' }} className="w-avatar rounded-full" />
```

### light-dark(lightValue, darkValue)

Returns different values based on the current theme mode. Automatically adapts when the theme changes.

```css
@utility bg-adaptive { background-color: light-dark(#ffffff, #1f2937); }
@utility text-adaptive { color: light-dark(#111827, #f9fafb); }
@utility border-adaptive { border-color: light-dark(#e5e7eb, #374151); }
```

Also works in custom CSS classes:

```css
.adaptive-card {
  background-color: light-dark(#ffffff, #1f2937);
  color: light-dark(#111827, #f9fafb);
}
```

## Gradients

Built-in support — no extra dependencies:

```tsx
<View className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 p-4 rounded-lg">
  <Text className="text-white font-bold">Gradient</Text>
</View>
```

Also supports angle-based (`bg-linear-90`) and arbitrary values (`bg-linear-[45deg,#f00_0%,#00f_100%]`).

### expo-linear-gradient with withUniwind

For `expo-linear-gradient`, wrap it with `withUniwind` for className-based layout and styling. The `colors` prop must be provided explicitly. Use `useCSSVariable` to get theme-aware colors:

```tsx
import { useCSSVariable } from 'uniwind';
import { withUniwind } from 'uniwind';
import { LinearGradient as RNLinearGradient } from 'expo-linear-gradient';

const LinearGradient = withUniwind(RNLinearGradient);

function GradientCard() {
  const primary = useCSSVariable('--color-primary');
  const secondary = useCSSVariable('--color-secondary');

  if (!primary || !secondary) return null;

  return (
    <LinearGradient
      className="flex-1 rounded-2xl p-6"
      colors={[primary as string, secondary as string]}
    >
      <Text className="text-white font-bold">Themed gradient</Text>
    </LinearGradient>
  );
}
```

Or export a wrapped component from a shared module for reuse:

```tsx
// components/styled.ts
import { withUniwind } from 'uniwind';
import { LinearGradient as RNLinearGradient } from 'expo-linear-gradient';
export const LinearGradient = withUniwind(RNLinearGradient);
```
