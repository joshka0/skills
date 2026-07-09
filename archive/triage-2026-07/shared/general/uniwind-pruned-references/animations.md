# Animations — Transitions, Entering/Exiting, Layout (Pro + Reanimated)

## Reanimated Animations (Requires Reanimated v4.0.0+)

```tsx
<View className="size-32 bg-primary rounded animate-spin" />
<View className="size-32 bg-primary rounded animate-bounce" />
<View className="size-32 bg-primary rounded animate-pulse" />
<View className="size-32 bg-primary rounded animate-ping" />

// Loading spinner
<View className="size-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
```

### Custom Keyframe Animations

| Class | Description |
|-------|-------------|
| `animate-wiggle` | Rotational wiggle |
| `animate-shake` | Horizontal shake |
| `animate-flash` | Opacity flash on/off |
| `animate-rubber-band` | Elastic scale stretch |
| `animate-swing` | Pendulum swing |
| `animate-tada` | Scale + rotate attention seeker |
| `animate-heartbeat` | Double-pulse heartbeat |
| `animate-jello` | Rotational jello wobble |
| `animate-float` | Gentle vertical float |
| `animate-breathe` | Subtle breathing scale |
| `animate-tilt` | Alternating tilt rotation |
| `animate-glitch` | Rapid horizontal jitter |

### Auto Component Swap

Components auto-swap to Animated versions when animation classes detected:

| Component | Animated Version |
|-----------|------------------|
| `View` | `Animated.View` |
| `Text` | `Animated.Text` |
| `Image` | `Animated.Image` |
| `ImageBackground` | `Animated.ImageBackground` |
| `ScrollView` | `Animated.ScrollView` |
| `FlatList` | `Animated.FlatList` |
| `TextInput` | `Animated.TextInput` |
| `Pressable` | `Animated.Pressable` |

## Entering & Exiting Animations

Drive Reanimated's entering/exiting animations via className — no Reanimated imports needed. Components auto-upgrade when `uw-*` classes are detected.

```tsx
// Bounce in, bounce out
{visible && <View className="size-20 bg-primary rounded-xl uw-entering-bounce-in uw-exiting-bounce-out" />}

// Fade in slowly (1000ms)
{visible && <View className="size-20 bg-primary rounded-xl uw-entering-fade-in uw-entering-duration-1000 uw-exiting-fade-out" />}
```

### Entering Presets

`uw-entering-fade-in` `uw-entering-fade-in-right` `uw-entering-fade-in-left` `uw-entering-fade-in-up` `uw-entering-fade-in-down` `uw-entering-slide-in-right` `uw-entering-slide-in-left` `uw-entering-slide-in-up` `uw-entering-slide-in-down` `uw-entering-zoom-in` `uw-entering-zoom-in-rotate` `uw-entering-zoom-in-left` `uw-entering-zoom-in-right` `uw-entering-zoom-in-up` `uw-entering-zoom-in-down` `uw-entering-zoom-in-easy-up` `uw-entering-zoom-in-easy-down` `uw-entering-bounce-in` `uw-entering-bounce-in-down` `uw-entering-bounce-in-up` `uw-entering-bounce-in-left` `uw-entering-bounce-in-right` `uw-entering-flip-in-x-up` `uw-entering-flip-in-x-down` `uw-entering-flip-in-y-left` `uw-entering-flip-in-y-right` `uw-entering-flip-in-easy-x` `uw-entering-flip-in-easy-y` `uw-entering-stretch-in-x` `uw-entering-stretch-in-y` `uw-entering-rotate-in-down-left` `uw-entering-rotate-in-down-right` `uw-entering-rotate-in-up-left` `uw-entering-rotate-in-up-right` `uw-entering-roll-in-left` `uw-entering-roll-in-right` `uw-entering-pinwheel-in` `uw-entering-light-speed-in-right` `uw-entering-light-speed-in-left`

### Exiting Presets

`uw-exiting-fade-out` `uw-exiting-fade-out-right` `uw-exiting-fade-out-left` `uw-exiting-fade-out-up` `uw-exiting-fade-out-down` `uw-exiting-slide-out-right` `uw-exiting-slide-out-left` `uw-exiting-slide-out-up` `uw-exiting-slide-out-down` `uw-exiting-zoom-out` `uw-exiting-zoom-out-rotate` `uw-exiting-zoom-out-left` `uw-exiting-zoom-out-right` `uw-exiting-zoom-out-up` `uw-exiting-zoom-out-down` `uw-exiting-zoom-out-easy-up` `uw-exiting-zoom-out-easy-down` `uw-exiting-bounce-out` `uw-exiting-bounce-out-down` `uw-exiting-bounce-out-up` `uw-exiting-bounce-out-left` `uw-exiting-bounce-out-right` `uw-exiting-flip-out-x-up` `uw-exiting-flip-out-x-down` `uw-exiting-flip-out-y-left` `uw-exiting-flip-out-y-right` `uw-exiting-flip-out-easy-x` `uw-exiting-flip-out-easy-y` `uw-exiting-stretch-out-x` `uw-exiting-stretch-out-y` `uw-exiting-rotate-out-down-left` `uw-exiting-rotate-out-down-right` `uw-exiting-rotate-out-up-left` `uw-exiting-rotate-out-up-right` `uw-exiting-roll-out-left` `uw-exiting-roll-out-right` `uw-exiting-pinwheel-out` `uw-exiting-light-speed-out-right` `uw-exiting-light-speed-out-left`

### Animation Modifiers

Pattern: `uw-{entering|exiting|layout}-{modifier}`

- Duration: `uw-{type}-duration-75` `uw-{type}-duration-100` ... `uw-{type}-duration-1000` or arbitrary `uw-{type}-duration-{ms}`
- Delay: `uw-{type}-delay-75` ... `uw-{type}-delay-1000` or arbitrary `uw-{type}-delay-{ms}`
- Easing: `uw-{type}-ease-linear` `uw-{type}-ease-in` `uw-{type}-ease-out` `uw-{type}-ease-in-out` `uw-{type}-ease-bounce`
- Spring: `uw-{type}-springify` `uw-{type}-damping-{value}` `uw-{type}-stiffness-{value}` `uw-{type}-mass-{value}`

## Layout Transitions

Animate position/size changes when siblings are added or removed:

```tsx
<View className="w-full gap-2">
  {items.map(item => (
    <View key={item.id} className={`h-14 ${item.color} rounded-xl uw-entering-fade-in uw-exiting-fade-out uw-layout-linear-transition`} />
  ))}
</View>
```

| Class | Description |
|-------|-------------|
| `uw-layout-linear-transition` | Smooth linear repositioning |
| `uw-layout-fading-transition` | Fade during repositioning |
| `uw-layout-jumping-transition` | Bouncy jump to new position |
| `uw-layout-curved-transition` | Curved path repositioning |
| `uw-layout-sequenced-transition` | Sequenced repositioning |
| `uw-layout-entry-exit-transition` | Combined entry/exit during layout |

## Transitions

Smooth property changes when className or state changes:

```tsx
// Color transition on press
<Pressable className="bg-primary active:bg-red-500 transition-colors duration-300" />

// Opacity transition
<View className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`} />

// Transform transition
<Pressable className="active:scale-95 transition-transform duration-150" />

// All properties
<Pressable className="bg-primary px-6 py-3 rounded-lg active:scale-95 active:bg-primary/80 transition-all duration-150">
  <Text className="text-white font-semibold">Animated Button</Text>
</Pressable>
```

| Class | Properties |
|-------|------------|
| `transition-none` | No transition |
| `transition-all` | All properties |
| `transition-colors` | Background, border, text colors |
| `transition-opacity` | Opacity |
| `transition-shadow` | Box shadow |
| `transition-transform` | Scale, rotate, translate |

Duration: `duration-75` `duration-100` `duration-150` `duration-200` `duration-300` `duration-500` `duration-700` `duration-1000`

Easing: `ease-linear` `ease-in` `ease-out` `ease-in-out`

Delay: `delay-75` `delay-100` `delay-150` `delay-200` `delay-300` `delay-500` `delay-700` `delay-1000`

## Using Reanimated Directly

Still works with Uniwind classes:

```tsx
import Animated, { FadeIn, FlipInXUp, LinearTransition } from 'react-native-reanimated';

<Animated.Text entering={FadeIn.delay(500)} className="text-foreground text-lg">
  Fading in
</Animated.Text>

<Animated.FlatList
  data={data}
  className="flex-none"
  contentContainerClassName="px-2"
  layout={LinearTransition}
  renderItem={({ item }) => (
    <Animated.Text entering={FlipInXUp} className="text-foreground py-2">
      {item}
    </Animated.Text>
  )}
/>
```
