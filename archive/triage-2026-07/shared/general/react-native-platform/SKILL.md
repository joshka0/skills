---
name: react-native-platform
description: React Native and Expo best practices for performant mobile apps — rendering, list performance, animation, Reanimated, navigation, state management, native UI, design systems, monorepos, and React Compiler.
---

# React Native Platform

Best practices for building performant React Native and Expo apps. Covers
rendering, list performance, animation, Reanimated, navigation, state
management, native UI, design systems, monorepos, and the React Compiler.

Read only the reference file that matches the task. Each reference groups related
rules with examples.

## Reference Routing

| Topic | Reference | When to Read |
| --- | --- | --- |
| Rendering | `references/rendering.md` | Conditional rendering, JSX crashes, text wrapping |
| List Performance | `references/list-performance.md` | Virtualized lists, renderItem optimization, memoization |
| Animation & Reanimated | `references/animation-and-reanimated.md` | GPU animations, derived values, gesture-based press |
| Scroll & Safe Area | `references/scroll-and-safe-area.md` | Scroll position, safe area insets, content inset, measurement |
| Navigation | `references/navigation.md` | Native navigators, tabs, stack, headers |
| State Management | `references/state-management.md` | Derived state, dispatch updaters, fallbacks, ground truth |
| Native UI | `references/native-ui.md` | expo-image, galleries, menus, modals, Pressable, styling |
| Design System | `references/design-system.md` | Compound components, import structure |
| Monorepo | `references/monorepo.md` | Native deps, single dependency versions |
| Compiler | `references/compiler.md` | React Compiler: destructuring, shared value access |
| Runtime Costs | `references/runtime-costs.md` | Intl formatters, font loading |

## Hard Rules

1. **Virtualized lists for dynamic data.** Use a virtualized list (LegendList,
   FlashList) for unbounded, dynamic, image-heavy, or frequently updated lists.
   A simple map is acceptable for tiny static sets where it is clearer and
   measurably harmless.
2. **Animate only transform and opacity.** These run on the GPU. Animating
   width, height, margin, or padding triggers layout recalculation every frame.
3. **Use Pressable over TouchableOpacity.** Pressable is the modern API.
   TouchableOpacity is legacy.
4. **Use expo-image for all images.** Memory-efficient caching, blurhash
   placeholders, progressive loading. Not React Native's built-in Image.
5. **Native dependencies live in the app package.** In monorepos, autolinking
   only scans the app's node_modules. Every native dep must appear in the app
   package.json.
6. **Text must be wrapped in Text components.** Strings as direct children of
   View crash React Native.

## Output Format

For each recommendation, provide:
- **Target**: which component, file, or pattern
- **Diagnosis**: what is wrong or suboptimal
- **Recommended rule or pattern**: the specific rule to apply
- **Code example**: a before/after snippet
- **Verification**: how to confirm the fix (e.g., "no crash on count=0",
  "smooth 60fps scroll")

## Source Rules

Individual rule files in `source-rules/` exist for maintenance. Agents should
prefer the grouped `references/` files above.
