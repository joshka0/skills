---
name: mobile-rn
description: Build or review polished Expo and React Native mobile UI with Uniwind Pro, including screens, components, navigation, themes, and native feel.
args:
  - name: target
    description: Feature, screen, or component to build or review.
    required: false
user-invokable: true
---

# Mobile RN — Expo + React Native + Uniwind Pro

Build or review mobile interfaces that feel native, calm, fast, and physically credible on iOS and Android.

## Context Gate

Infer audience, product purpose, platform target, and constraints from the thread and repo first. Ask only if missing context would materially change the approach.

## Reference Files

Read only the reference files relevant to the task:

- **`reference/uniwind-pro.md`** — Uniwind Pro API usage, critical rules, component patterns, and review checklist. Read this for any build or review task.
- **`reference/ios-native-feel.md`** — iOS-specific rules, anti-patterns, and review format. Read when targeting or reviewing iOS.
- **`reference/android-native-feel.md`** — Android-specific rules, anti-patterns, and review format. Read when targeting or reviewing Android.

## Shared Mobile Rules

These apply to both platforms. Details and code examples live in the reference files.

1. **Thumb-first design** — 44pt (iOS) / 48dp (Android) minimum touch targets. Use `hitSlop` for small visible controls. Never let adjacent hit areas overlap.
2. **Press feedback on every interactive element** — Immediate, modest feedback. `active:opacity-*` and subtle scale for buttons; background fill for rows.
3. **Edge-to-edge layouts with safe area handling** — Use Uniwind Pro safe area utilities (`pt-safe`, `pb-safe`, `pb-safe-offset-*`). Do not hard-code padding to compensate for system bars.
4. **Keyboard-aware forms** — Keep focused input visible, primary action reachable. Use `KeyboardAvoidingView`, `keyboardShouldPersistTaps="handled"`, proper `returnKeyType` and `textContentType`.
5. **Dynamic-type typography that scales** — Use type hierarchy, not just font size. Body 15–17, captions no smaller than 12. Use `leading-*` for breathing room.
6. **Purposeful motion with reduced motion support** — Animate to clarify state changes, not decorate. Prefer fades and small slides. Respect reduced motion preferences.
7. **Semantic color and state design** — Use theme tokens (`bg-background`, `bg-card`, `text-foreground`, `border-border`). Design loading, empty, error, success, and offline states as first-class UI.
8. **Platform selectors for iOS/Android differences** — Use Uniwind `ios:` / `android:` selectors for visual differences. Use `Platform.select()` only for behavior changes.
9. **Avoid web habits** — No div soup, no hover-only affordances, no px units, no dense toolbars, no shadows copied from web without tuning.

## Output Format

1. **Platform assumptions** — State which platform(s) the work targets.
2. **Diagnosis or plan** — What needs to change and why.
3. **Changes made or proposed** — Grouped by principle where practical.
4. **Platform-specific considerations** — iOS or Android details that affected decisions.
5. **Verification** — How to confirm the changes work correctly on device.
