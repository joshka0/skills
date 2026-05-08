# Dynamic ClassNames — Rules and Patterns

## NEVER Do This (Tailwind scans at build time)

```tsx
// BROKEN — template literal with variable
<View className={`bg-${color}-500`} />
<Text className={`text-${size}`} />
```

## Correct Patterns

```tsx
// Ternary with complete class names
<View className={isActive ? 'bg-primary' : 'bg-muted'} />

// Mapping object
const colorMap = {
  primary: 'bg-blue-500 text-white',
  danger: 'bg-red-500 text-white',
  ghost: 'bg-transparent text-foreground',
};
<Pressable className={colorMap[variant]} />

// Array join for multiple conditions
<View className={[
  'p-4 rounded-lg',
  isActive && 'bg-primary',
  isDisabled && 'opacity-50',
].filter(Boolean).join(' ')} />
```

## tailwind-variants (tv)

For complex component styling with variants and compound variants:

```tsx
import { tv } from 'tailwind-variants';

const button = tv({
  base: 'font-semibold rounded-lg px-4 py-2 items-center justify-center',
  variants: {
    color: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-500 text-white',
      danger: 'bg-red-500 text-white',
      ghost: 'bg-transparent text-foreground border border-border',
    },
    size: {
      sm: 'text-sm px-3 py-1.5',
      md: 'text-base px-4 py-2',
      lg: 'text-lg px-6 py-3',
    },
    disabled: {
      true: 'opacity-50',
    },
  },
  compoundVariants: [
    { color: 'primary', size: 'lg', class: 'bg-blue-600' },
  ],
  defaultVariants: { color: 'primary', size: 'md' },
});

<Pressable className={button({ color: 'primary', size: 'lg' })}>
  <Text className="text-white font-semibold">Click</Text>
</Pressable>
```

## cn Utility — Class Deduplication

Uniwind does **NOT** auto-deduplicate conflicting classNames. If the same property appears in multiple classes, **both will be applied and the result is unpredictable**. This is especially critical when mixing custom CSS classes with Tailwind utilities.

### Setup

```bash
npm install tailwind-merge clsx
```

```ts
// lib/cn.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### When cn Is Required

1. **Merging className props** — component accepts external className that may conflict:

```tsx
import { cn } from '@/lib/cn';

<View className={cn('p-4 bg-white', props.className)} />
<Text className={cn('text-base', isActive && 'text-primary', disabled && 'opacity-50')} />
```

2. **CRITICAL: Mixing custom CSS classes with Tailwind utilities** — if your custom CSS class sets a property that a Tailwind utility also sets, you MUST use `cn()` to deduplicate:

```css
/* global.css */
.card {
  background-color: white;
  border-radius: 12px;
  padding: 16px;
}
```

```tsx
// WRONG — both .card (padding: 16px) and p-6 (padding: 24px) apply, result is unpredictable
<View className="card p-6" />

// CORRECT — cn deduplicates, p-6 wins over .card's padding
<View className={cn('card', 'p-6')} />
```

3. **tv() output combined with extra classes** — tv already handles its own variants, but if you add more classes on top:

```tsx
<Pressable className={cn(button({ color: 'primary' }), props.className)} />
```

### When cn Is NOT Needed

- Static className with no conflicts: `<View className="flex-1 p-4 bg-white" />`
- Single custom CSS class with no overlapping Tailwind: `<View className="card-shadow mt-4" />` (if card-shadow only sets box-shadow which no Tailwind class also sets)
