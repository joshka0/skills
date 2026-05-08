---
name: uniwind
description: Tailwind CSS v4 styling for React Native with Uniwind. Use when configuring Uniwind, writing className styles, debugging Uniwind, theming RN components, or handling Uniwind Pro APIs.
---

Use this skill for Uniwind API and configuration work.

## First

Identify the task type and read only the relevant reference:

- `references/setup.md` for install, Metro, global.css, TypeScript, monorepos.
- `references/classnames.md` for withUniwind, useResolveClassNames, third-party components.
- `references/component-bindings.md` for supported className props per component.
- `references/accent-color-props.md` for non-style color props.
- `references/dynamic-classnames.md` for className construction rules and cn() utility.
- `references/theming.md` for CSS variables, custom themes, ScopedTheme, runtime updates, selectors.
- `references/css-utilities.md` for custom CSS, @utility, CSS functions, gradients.
- `references/safe-areas.md` for safe area utilities.
- `references/pro.md` for Pro-only behavior (animations, transitions, shadow tree, native insets).
- `references/animations.md` for transition, entering/exiting, and layout classes.
- `references/integrations.md` for React Navigation, UI kits, FAQ, MCP server, related skills.
- `references/troubleshooting.md` for broken styles, Metro, cache, and build failures.

## Hard rules

- Tailwind v4 only.
- withUniwindConfig must be the outermost Metro wrapper.
- cssEntryFile must be relative.
- Do not dynamically construct class strings.
- Do not use NativeWind APIs such as cssInterop.
- Do not wrap core React Native components with withUniwind.
- Use accent-* classes for non-style color props.
- Prefer semantic theme tokens over raw colors.

## Output

- Diagnosis
- Minimal config or code change
- Files likely touched
- Verification command
