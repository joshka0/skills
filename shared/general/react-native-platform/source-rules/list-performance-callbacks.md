---
title: Hoist callbacks to the root of lists
impact: MEDIUM
impactDescription: Fewer re-renders and faster lists
tags: tag1, tag2
---

## List performance callbacks

**Impact: HIGH (Fewer re-renders and faster lists)**

When passing callback functions to list items, create a single instance of the
callback at the root of the list. Items should then call it with a unique
identifier.

**Incorrect (creates a new callback on each render):**

```typescript
return (
  <LegendList
    renderItem={({ item }) => {
      // bad: creates a new callback on each render
      const onPress = () => handlePress(item.id)
      return <Item key={item.id} item={item} onPress={onPress} />
    }}
  />
)
```

**Correct (a single function instance passed to each item):**

```typescript
const onPressItem = useCallback((id: string) => {
  handlePress(id)
}, [handlePress])

const renderItem = useCallback(
  ({ item }) => <Item item={item} onPressItem={onPressItem} />,
  [onPressItem]
)

return (
  <LegendList
    renderItem={renderItem}
  />
)
```

Inside `Item`, bind the item-specific identifier at the leaf:

```typescript
function Item({ item, onPressItem }) {
  const onPress = useCallback(() => {
    onPressItem(item.id)
  }, [onPressItem, item.id])

  return <Pressable onPress={onPress}>{/* ... */}</Pressable>
}
```
