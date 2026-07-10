# ClassNames — withUniwind, useResolveClassNames, Third-Party Components

## withUniwind (Recommended)

Wrap once at module level, use with `className` everywhere:

```tsx
import { withUniwind } from 'uniwind';
import { Image as ExpoImage } from 'expo-image';
import { BlurView as RNBlurView } from 'expo-blur';
import { LinearGradient as RNLinearGradient } from 'expo-linear-gradient';

// Module-level wrapping (NEVER inside render functions)
export const Image = withUniwind(ExpoImage);
export const BlurView = withUniwind(RNBlurView);
export const LinearGradient = withUniwind(RNLinearGradient);
```

`withUniwind` automatically maps:
- `style` → `className`
- `{name}Style` → `{name}ClassName`
- `{name}Color` → `{name}ColorClassName` (with accent- prefix)

For custom prop mappings:

```tsx
const StyledProgressBar = withUniwind(ProgressBar, {
  width: {
    fromClassName: 'widthClassName',
    styleProperty: 'width',
  },
});
```

### Usage patterns

- **Used in one file only** — define the wrapped component in that same file
- **Used across multiple files** — wrap once in a shared module (e.g., `components/styled.ts`) and re-export

```tsx
// components/styled.ts
import { withUniwind } from 'uniwind';
import { Image as ExpoImage } from 'expo-image';
export const Image = withUniwind(ExpoImage);

// Then import everywhere:
import { Image } from '@/components/styled';
```

**NEVER** call `withUniwind` on the same component in multiple files.

### CRITICAL: Do NOT wrap core RN components

Do NOT use `withUniwind` on components from `react-native` or `react-native-reanimated`. These already have built-in `className` support:

```tsx
// WRONG — View already supports className natively
const StyledView = withUniwind(View);        // DO NOT DO THIS
const StyledText = withUniwind(Text);        // DO NOT DO THIS
const StyledAnimatedView = withUniwind(Animated.View); // DO NOT DO THIS

// CORRECT — only wrap third-party components
const StyledExpoImage = withUniwind(ExpoImage);     // expo-image
const StyledBlurView = withUniwind(BlurView);        // expo-blur
const StyledMotiView = withUniwind(MotiView);        // moti
```

## useResolveClassNames

Converts Tailwind class strings to React Native style objects. Use for one-off cases or components that only accept `style`:

```tsx
import { useResolveClassNames } from 'uniwind';

const headerStyle = useResolveClassNames('bg-primary p-4');
const cardStyle = useResolveClassNames('bg-card dark:bg-card rounded-lg shadow-sm');

// React Navigation screen options
<Stack.Navigator screenOptions={{ headerStyle, cardStyle }} />
```

### Comparison

| Feature | withUniwind | useResolveClassNames |
|---------|-------------|----------------------|
| Setup | Once per component | Per usage |
| Performance | Optimized | Slightly slower |
| Best for | Reusable components | One-off, navigation config |
| Syntax | `className="..."` | `style={...}` |

## Style Specificity

Inline `style` always overrides `className`. Use `className` for static styles, inline only for truly dynamic values. Use `cn()` from tailwind-merge for component libraries where classNames may conflict.
