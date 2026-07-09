# accent- Prefix — Non-Style Color Props

React Native components have props like `color`, `tintColor`, `thumbColor` that are NOT part of the `style` object. To set these via Tailwind classes, use the `accent-` prefix with the corresponding `{propName}ClassName` prop.

## The Pattern

```tsx
// color prop → colorClassName with accent- prefix
<ActivityIndicator colorClassName="accent-blue-500 dark:accent-blue-400" />
<Button colorClassName="accent-primary" title="Submit" />

// tintColor prop → tintColorClassName
<Image className="w-6 h-6" tintColorClassName="accent-red-500" source={icon} />

// thumbColor → thumbColorClassName
<Switch thumbColorClassName="accent-white" trackColorOnClassName="accent-primary" />

// placeholderTextColor → placeholderTextColorClassName
<TextInput placeholderTextColorClassName="accent-gray-400 dark:accent-gray-600" />
```

## CRITICAL Rule

`className` maps to the `style` prop — it handles layout, typography, backgrounds, borders, etc. But React Native has many color props that live OUTSIDE of `style` (like `color`, `tintColor`, `thumbColor`, `placeholderTextColor`). These require a separate `{propName}ClassName` prop with the `accent-` prefix. Without `accent-`, the class resolves to a style object — but these props expect a plain color string.

```tsx
// WRONG — className sets style, but ActivityIndicator's color is NOT a style prop
<ActivityIndicator className="text-blue-500" />  // color will NOT be set

// CORRECT — use the dedicated colorClassName prop with accent- prefix
<ActivityIndicator colorClassName="accent-blue-500" />  // color IS set to #3b82f6

// WRONG — tintColor is not a style prop on Image
<Image className="tint-blue-500" source={icon} />  // won't work

// CORRECT
<Image tintColorClassName="accent-blue-500" source={icon} />
```

## Complete Prop Reference by Component

### ActivityIndicator
- `colorClassName` → `color` (⚡ `accent-`)

### Button
- `colorClassName` → `color` (⚡ `accent-`)

### Image
- `tintColorClassName` → `tintColor` (⚡ `accent-`)

### TextInput
- `cursorColorClassName` → `cursorColor` (⚡ `accent-`)
- `selectionColorClassName` → `selectionColor` (⚡ `accent-`)
- `placeholderTextColorClassName` → `placeholderTextColor` (⚡ `accent-`)
- `selectionHandleColorClassName` → `selectionHandleColor` (⚡ `accent-`)
- `underlineColorAndroidClassName` → `underlineColorAndroid` (Android, ⚡ `accent-`)

### Text
- `selectionColorClassName` → `selectionColor` (⚡ `accent-`)

### Switch
- `thumbColorClassName` → `thumbColor` (⚡ `accent-`)
- `trackColorOnClassName` → `trackColor.true` (⚡ `accent-`)
- `trackColorOffClassName` → `trackColor.false` (⚡ `accent-`)
- `ios_backgroundColorClassName` → `ios_backgroundColor` (iOS, ⚡ `accent-`)

### ScrollView
- `endFillColorClassName` → `endFillColor` (⚡ `accent-`)

### FlatList / SectionList / VirtualizedList
- `endFillColorClassName` → `endFillColor` (⚡ `accent-`)

### Modal
- `backdropColorClassName` → `backdropColor` (⚡ `accent-`)

### RefreshControl
- `colorsClassName` → `colors` (Android, ⚡ `accent-`)
- `tintColorClassName` → `tintColor` (iOS, ⚡ `accent-`)
- `titleColorClassName` → `titleColor` (iOS, ⚡ `accent-`)
- `progressBackgroundColorClassName` → `progressBackgroundColor` (Android, ⚡ `accent-`)

### ImageBackground
- `tintColorClassName` → `tintColor` (⚡ `accent-`)

### InputAccessoryView
- `backgroundColorClassName` → `backgroundColor` (⚡ `accent-`)

### TouchableHighlight
- `underlayColorClassName` → `underlayColor` (⚡ `accent-`)

## Usage Examples

```tsx
import { View, Text, Pressable, TextInput, ScrollView, FlatList, Switch, Image, ActivityIndicator, Modal, RefreshControl, Button } from 'react-native';

// TextInput — with focus state and accent- color props
<TextInput
  className="border border-border rounded-lg px-4 py-2 text-base text-foreground focus:border-primary"
  placeholderTextColorClassName="accent-muted"
  selectionColorClassName="accent-primary"
  cursorColorClassName="accent-primary"
  selectionHandleColorClassName="accent-primary"
  underlineColorAndroidClassName="accent-transparent"
  placeholder="Enter text..."
/>

// ScrollView — with content container
<ScrollView className="flex-1" contentContainerClassName="p-4 gap-4">
  {/* content */}
</ScrollView>

// FlatList — with all sub-style props
<FlatList
  className="flex-1"
  contentContainerClassName="p-4 gap-3"
  columnWrapperClassName="gap-3"
  ListHeaderComponentClassName="pb-4"
  ListFooterComponentClassName="pt-4"
  endFillColorClassName="accent-gray-100"
  numColumns={2}
  data={items}
  renderItem={({ item }) => <ItemCard item={item} />}
/>

// Switch — no className support, use color-specific props only
<Switch
  thumbColorClassName="accent-white"
  trackColorOnClassName="accent-primary"
  trackColorOffClassName="accent-gray-300 dark:accent-gray-700"
  ios_backgroundColorClassName="accent-gray-200"
/>

// Image — tint color
<Image className="w-6 h-6" tintColorClassName="accent-primary" source={icon} />

// ActivityIndicator
<ActivityIndicator className="m-4" colorClassName="accent-primary" size="large" />

// Button — only colorClassName (no className)
<Button colorClassName="accent-primary" title="Submit" onPress={handleSubmit} />

// Modal — backdrop color
<Modal className="flex-1" backdropColorClassName="accent-black/50">
  {/* content */}
</Modal>

// RefreshControl — platform-specific color props
<RefreshControl
  className="p-4"
  tintColorClassName="accent-primary"
  titleColorClassName="accent-gray-500"
  colorsClassName="accent-primary"
  progressBackgroundColorClassName="accent-white dark:accent-gray-800"
/>
```
