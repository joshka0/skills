---
name: uniwind
description: "Apply Uniwind conventions for RN styling, themes, bindings, and the local dev-run/build workflow. Use when Uniwind Metro/CSS, className, a theme token, a style failure, or running a Uniwind app locally needs a decision."
---

# Uniwind

Keep React Native styling configuration and semantic tokens explicit while resolving API details from the installed package.

## Route

| Mode | Select when | Read |
| --- | --- | --- |
| `styling` | A class, token, theme, binding, or configuration decision is needed | [references/house-conventions.md](references/house-conventions.md) |
| `local-dev` | Launching, building, or debugging a Uniwind app on a local device/simulator, or a dev-client startup crash | [references/local-dev.md](references/local-dev.md) |

Select one mode; read only its reference.

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
- Never launch a Uniwind app with bare `expo start` or a plain Metro; use the app's own Uniwind lane or the embedded-bundle build in `local-dev`.

## Precedence

`product-platform` owns NativeWind-to-Uniwind migration. `code-quality` owns generic rendering or source diagnosis that is not a Uniwind configuration, class, token, binding, style-resolution, or local-run decision. A repo's own run skill outranks the generic `local-dev` lane facts.

## Stop conditions

- Report uncertainty rather than guessing when installed config and current Uniwind documentation disagree.
- Ask for direction when a configuration change would require a framework upgrade or alter a shared design-token contract.
- In `local-dev`, stop native debugging once the lane and version set are verified clean; check the uniwind-pro changelog and fall back to the embedded-bundle lane.

## Output

Return local configuration facts, the minimal styling or lane decision, affected files, native/theme verification, and residual risk.
