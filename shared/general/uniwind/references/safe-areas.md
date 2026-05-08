# Safe Area Utilities

## Padding

| Class | Description |
|-------|-------------|
| `p-safe` | All sides |
| `pt-safe` / `pb-safe` / `pl-safe` / `pr-safe` | Individual sides |
| `px-safe` / `py-safe` | Horizontal / vertical |

## Margin

| Class | Description |
|-------|-------------|
| `m-safe` | All sides |
| `mt-safe` / `mb-safe` / `ml-safe` / `mr-safe` | Individual sides |
| `mx-safe` / `my-safe` | Horizontal / vertical |

## Positioning

| Class | Description |
|-------|-------------|
| `inset-safe` | All sides |
| `top-safe` / `bottom-safe` / `left-safe` / `right-safe` | Individual sides |
| `x-safe` / `y-safe` | Horizontal / vertical inset |

## Compound Variants

| Pattern | Behavior | Example |
|---------|----------|---------|
| `{prop}-safe-or-{value}` | `Math.max(inset, value)` — ensures minimum spacing | `pt-safe-or-4` |
| `{prop}-safe-offset-{value}` | `inset + value` — adds extra spacing on top of inset | `pb-safe-offset-4` |

## Setup

### Uniwind Free (default)

Requires `react-native-safe-area-context`. Wrap your App component in `SafeAreaProvider` and `SafeAreaListener` and call `Uniwind.updateInsets(insets)` in the `onChange` callback:

```tsx
import { SafeAreaProvider, SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaListener
        onChange={({ insets }) => {
          Uniwind.updateInsets(insets);
        }}
      >
        <View className="pt-safe px-safe">{/* content */}</View>
      </SafeAreaListener>
    </SafeAreaProvider>
  );
}
```

### Uniwind Pro

Automatic, no setup needed. Insets injected from native layer.

```tsx
// With Pro — just use safe area classes directly
<View className="pt-safe pb-safe">{/* content */}</View>
```

**Note**: `Uniwind.updateInsets` is a no-op in Pro. Remove `SafeAreaListener` setup when using Pro.
