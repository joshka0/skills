---
title: Use a List Virtualizer for Any List
impact: HIGH
impactDescription: reduced memory, faster mounts
tags: lists, performance, virtualization, scrollview
---

## Use a List Virtualizer for Any List

Default to a list virtualizer like LegendList or FlashList for unbounded,
dynamic, image-heavy, or frequently updated lists. Virtualizers only render
visible items, reducing memory usage and mount time. ScrollView renders all
children upfront, which gets expensive quickly. For a tiny static set of rows, a
simple map can be acceptable if it is clearer and measurably harmless.

**Incorrect (ScrollView renders all items at once):**

```tsx
function Feed({ items }: { items: Item[] }) {
  return (
    <ScrollView>
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </ScrollView>
  )
}
// 50 items = 50 components mounted, even if only 10 visible
```

**Correct (virtualizer renders only visible items):**

```tsx
import { LegendList } from '@legendapp/list'

function Feed({ items }: { items: Item[] }) {
  return (
    <LegendList
      data={items}
      // if you aren't using React Compiler, wrap these with useCallback
      renderItem={({ item }) => <ItemCard item={item} />}
      keyExtractor={(item) => item.id}
      estimatedItemSize={80}
    />
  )
}
// Only ~10-15 visible items mounted at a time
```

**Alternative (FlashList):**

```tsx
import { FlashList } from '@shopify/flash-list'

function Feed({ items }: { items: Item[] }) {
  return (
    <FlashList
      data={items}
      // if you aren't using React Compiler, wrap these with useCallback
      renderItem={({ item }) => <ItemCard item={item} />}
      keyExtractor={(item) => item.id}
    />
  )
}
```

Benefits apply most to feeds, search results, profiles with dynamic sections,
settings with many rows, and any list that can grow. Default to virtualization
unless the list is small, static, and intentionally simple.
