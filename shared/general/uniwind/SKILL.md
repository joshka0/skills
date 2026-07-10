---
name: uniwind
description: "Apply Uniwind conventions for RN styling, setup, static class names, themes, and bindings. Use when Uniwind Metro/CSS, className, a theme token, a color prop, or a style failure needs a decision."
---

# Uniwind

Keep React Native styling configuration and semantic tokens explicit while resolving API details from the installed package.

## Workflow

1. Inspect the installed Uniwind and Tailwind packages, Metro/Vite configuration, CSS entry, and existing theme or component conventions.
2. Check the installed package, the Uniwind MCP when available, or current primary documentation before using version-sensitive APIs or configuration.
3. Keep utility candidates statically discoverable; route genuinely dynamic visual values through the project's approved style/token boundary.
4. Apply the smallest configuration or component change, then verify it in the affected native runtime and theme.

## Hard rules

- Keep the Uniwind configuration wrapper and CSS entrypoint legible and project-relative; verify their installed-package contract before editing them.
- Do not build class strings dynamically or leave conflicting utility precedence accidental.
- Keep theme values semantic and complete across supported themes; prefer tokens over duplicated raw color branches.
- Bind third-party components deliberately; do not wrap core React Native primitives when the installed integration already supports their styling surface.
- Treat non-style color props as component contracts, not ordinary style properties, and verify the installed binding convention.

## Precedence

`product-platform` owns NativeWind-to-Uniwind migration. `code-quality` owns generic rendering or source diagnosis that is not a Uniwind configuration, class, token, binding, or style-resolution decision.

## Stop conditions

- Report uncertainty rather than guessing when installed config and current Uniwind documentation disagree.
- Ask for direction when a configuration change would require a framework upgrade or alter a shared design-token contract.

## Output

Return local configuration facts, the minimal styling decision, affected files, native/theme verification, and residual risk.
