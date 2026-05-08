---
name: opentui
description: Build, review, or polish OpenTUI terminal interfaces — dashboards, forms, selectors, panels, and keyboard-first CLI workflows.
args:
  - name: target
    description: Feature, screen, or component to build or review.
    required: false
user-invokable: true
---

# OpenTUI

Build terminal interfaces that feel fast, legible, trustworthy, keyboard-native, and respectful of the terminal.

A good TUI is not a web app squeezed into monospace. It is a command environment with visual memory, predictable focus, recoverable actions, excellent keyboard flow, and careful use of the terminal's limited space.

Choose references based on the task:

- `reference/renderer-lifecycle.md` for app shell, screen modes, cleanup, stdout collision
- `reference/keyboard-and-focus.md` for shortcuts, focus clarity, help overlays
- `reference/layout.md` for layout regions, breakpoints, borders, whitespace
- `reference/visual-system.md` for semantic colors, attributes, Unicode, themes
- `reference/forms-and-selectors.md` for inputs, select lists, form flow
- `reference/scroll-logs-and-output.md` for scroll regions, logs, external output
- `reference/async-errors-and-status.md` for errors, async states, status bars
- `reference/performance.md` for render loop, animations, target FPS

## Shared TUI Rules

- **Keyboard-first design**: every action reachable without mouse; mouse is an enhancement, not a contract.
- **Explicit focus indicators**: always visible which element is focused — use background, border color, or marker glyphs like `›`, `●`, `▸`.
- **Terminal restoration**: always `renderer.destroy()` on exit, errors, and signal handlers; never leave raw mode or alternate screen dirty.
- **Semantic color system**: define a small theme object; never hardcode ANSI codes or scatter raw colors.
- **Responsive terminal sizing**: handle resize below 80 columns and 24 rows; collapse to single-column compact layouts.
- **Borders for structure, not decoration**: borders are expensive in terminal space; prefer whitespace and alignment over box chrome.
- **Help overlays for complex interfaces**: bind `?` to a contextual help panel showing current-mode shortcuts.
- **Reduced motion support**: avoid constant animation; use brief, purposeful motion only for progress and emphasis.
- **Mouse support as enhancement**: click-to-focus is fine; never require hover-only or drag-only interactions.
- **Test in multiple terminal emulators**: Unicode width, color support, and theme detection vary across terminals.

## Output Format

When reviewing or improving an OpenTUI app, group concrete changes by principle using markdown tables with **Before**, **After**, and **Reason** columns. Do not list abstract advice if no concrete change was made.
