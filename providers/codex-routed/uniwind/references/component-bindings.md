# Component Bindings — className Props Per Component

All core React Native components support `className` out of the box. Some have additional className props for sub-styles (like `contentContainerClassName`) and non-style color props (requiring `accent-` prefix).

**Legend**: Props marked with ⚡ require the `accent-` prefix. Props in parentheses are platform-specific.

## View

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |

## Text

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `selectionColorClassName` | `selectionColor` | ⚡ `accent-` |

## Pressable

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |

Supports `active:`, `disabled:`, `focus:` state selectors.

## Image

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `tintColorClassName` | `tintColor` | ⚡ `accent-` |

## TextInput

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `cursorColorClassName` | `cursorColor` | ⚡ `accent-` |
| `selectionColorClassName` | `selectionColor` | ⚡ `accent-` |
| `placeholderTextColorClassName` | `placeholderTextColor` | ⚡ `accent-` |
| `selectionHandleColorClassName` | `selectionHandleColor` | ⚡ `accent-` |
| `underlineColorAndroidClassName` | `underlineColorAndroid` (Android) | ⚡ `accent-` |

Supports `focus:`, `active:`, `disabled:` state selectors.

## ScrollView

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `contentContainerClassName` | `contentContainerStyle` | — |
| `endFillColorClassName` | `endFillColor` | ⚡ `accent-` |

## FlatList

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `contentContainerClassName` | `contentContainerStyle` | — |
| `columnWrapperClassName` | `columnWrapperStyle` | — |
| `ListHeaderComponentClassName` | `ListHeaderComponentStyle` | — |
| `ListFooterComponentClassName` | `ListFooterComponentStyle` | — |
| `endFillColorClassName` | `endFillColor` | ⚡ `accent-` |

## SectionList

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `contentContainerClassName` | `contentContainerStyle` | — |
| `ListHeaderComponentClassName` | `ListHeaderComponentStyle` | — |
| `ListFooterComponentClassName` | `ListFooterComponentStyle` | — |
| `endFillColorClassName` | `endFillColor` | ⚡ `accent-` |

## VirtualizedList

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `contentContainerClassName` | `contentContainerStyle` | — |
| `ListHeaderComponentClassName` | `ListHeaderComponentStyle` | — |
| `ListFooterComponentClassName` | `ListFooterComponentStyle` | — |
| `endFillColorClassName` | `endFillColor` | ⚡ `accent-` |

## Switch

| Prop | Maps to | Prefix |
|------|---------|--------|
| `thumbColorClassName` | `thumbColor` | ⚡ `accent-` |
| `trackColorOnClassName` | `trackColor.true` (on) | ⚡ `accent-` |
| `trackColorOffClassName` | `trackColor.false` (off) | ⚡ `accent-` |
| `ios_backgroundColorClassName` | `ios_backgroundColor` (iOS) | ⚡ `accent-` |

Note: Switch does NOT support `className` (`className?: never` in types). Use only the color-specific className props above. Supports `disabled:` state selector.

## ActivityIndicator

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `colorClassName` | `color` | ⚡ `accent-` |

## Button

| Prop | Maps to | Prefix |
|------|---------|--------|
| `colorClassName` | `color` | ⚡ `accent-` |

Note: Button does not support `className` (no `style` prop on RN Button).

## Modal

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `backdropColorClassName` | `backdropColor` | ⚡ `accent-` |

## RefreshControl

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `colorsClassName` | `colors` (Android) | ⚡ `accent-` |
| `tintColorClassName` | `tintColor` (iOS) | ⚡ `accent-` |
| `titleColorClassName` | `titleColor` (iOS) | ⚡ `accent-` |
| `progressBackgroundColorClassName` | `progressBackgroundColor` (Android) | ⚡ `accent-` |

## ImageBackground

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `imageClassName` | `imageStyle` | — |
| `tintColorClassName` | `tintColor` | ⚡ `accent-` |

## SafeAreaView

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |

## KeyboardAvoidingView

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `contentContainerClassName` | `contentContainerStyle` | — |

## InputAccessoryView

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `backgroundColorClassName` | `backgroundColor` | ⚡ `accent-` |

## TouchableHighlight

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |
| `underlayColorClassName` | `underlayColor` | ⚡ `accent-` |

Supports `active:`, `disabled:` state selectors.

## TouchableOpacity

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |

Supports `active:`, `disabled:` state selectors.

## TouchableNativeFeedback

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |

Supports `active:`, `disabled:` state selectors.

## TouchableWithoutFeedback

| Prop | Maps to | Prefix |
|------|---------|--------|
| `className` | `style` | — |

Supports `active:`, `disabled:` state selectors.

## Supported vs Unsupported Classes

React Native uses the Yoga layout engine. Key differences from web CSS:
- **No CSS cascade/inheritance** — styles don't inherit from parents
- **Flexbox by default** — all views use flexbox with `flexDirection: 'column'`
- **Limited CSS properties** — no floats, grid, pseudo-elements

### Supported (all standard Tailwind)

Layout, spacing, sizing, typography, colors, borders, effects, flexbox, positioning, transforms, interactive states.

### Unsupported (web-specific, silently ignored)

- `hover:` `visited:` — use Pressable `active:` instead
- `before:` `after:` `placeholder:` — pseudo-elements
- `float-*` `clear-*` `columns-*`
- `print:` `screen:`
- `break-before-*` `break-after-*` `break-inside-*`

### Built-in Extra Utilities

| Class | Effect |
|-------|--------|
| `border-continuous` | Sets `borderCurve: 'continuous'` — smooth, superellipse corners (iOS) |
| `border-circular` | Sets `borderCurve: 'circular'` — standard circular corners (iOS default) |

```tsx
// Smooth iOS-style rounded corners (like SwiftUI's .continuous)
<View className="rounded-2xl border-continuous bg-card p-4">
  <Text className="text-foreground">Smooth corners</Text>
</View>
```
