# Renderer Lifecycle

## Screen Modes

Do not pick a renderer mode casually.

| Mode | Use For | Avoid When |
| --- | --- | --- |
| `alternate-screen` | Full-screen TUI apps, dashboards, editors, file pickers | User needs previous scrollback visible |
| `split-footer` | Assistants, prompts, inline controls, progress panels | UI needs the full terminal |
| `main-screen` | Short-lived tools, demos, tests, simple inline interactions | You need scrollback-native rendering |

Default to `alternate-screen` for full applications. Use `split-footer` when the TUI is attached to ongoing CLI output and must not overwrite logs.

```ts
const renderer = await createCliRenderer({
  screenMode: "alternate-screen",
  exitOnCtrlC: true,
  targetFps: 30,
})
```

For assistant-like tools:

```ts
const renderer = await createCliRenderer({
  screenMode: "split-footer",
  footerHeight: 14,
  externalOutputMode: "capture-stdout",
  exitOnCtrlC: true,
})
```

## Terminal Restoration

Always call `renderer.destroy()` on clean exit, errors, and controlled shutdown paths.

```ts
const renderer = await createCliRenderer({ exitOnCtrlC: true })

process.on("uncaughtException", (error) => {
  console.error(error)
  renderer.destroy()
  process.exit(1)
})

process.on("unhandledRejection", (reason) => {
  console.error(reason)
  renderer.destroy()
  process.exit(1)
})
```

- Do not rely on `process.exit()` alone.
- Do not leave raw mode, mouse tracking, alternate screen, or cursor state dirty.
- If handling Ctrl+C manually, still destroy the renderer.
- Make `Esc`, `q`, or `Ctrl+C` behavior clear in the footer/help text.

## Stdout Collision

Never let normal `stdout.write` overlap the TUI accidentally. In split-footer mode, prefer captured stdout unless passthrough is explicitly intended.

## Implementation Styles

| Approach | Use When |
| --- | --- |
| `@opentui/react` | App-like interfaces, stateful flows, familiar component structure |
| Core constructs | Small to medium apps, declarative composition without React |
| Imperative renderables | Low-level custom components, lifecycle-sensitive code |
| Mixed | High-level declarative shell with low-level custom pieces |

React is usually best for product-like TUIs. Core renderables are best for fine lifecycle control.

## Basic React App Shell

```tsx
import { createCliRenderer } from "@opentui/core"
import { createRoot, useKeyboard, useTerminalDimensions } from "@opentui/react"
import { useState } from "react"

const theme = {
  bg: "transparent",
  panel: "#1f2335",
  border: "#414868",
  text: "#c0caf5",
  muted: "#7f849c",
  focus: "#7aa2f7",
  danger: "#f7768e",
}

function App() {
  const { width, height } = useTerminalDimensions()
  const compact = width < 80
  const [helpOpen, setHelpOpen] = useState(false)

  useKeyboard((key) => {
    if (key.name === "?") setHelpOpen((v) => !v)
    if (key.name === "escape" && helpOpen) setHelpOpen(false)
  })

  return (
    <box style={{ width: "100%", height: "100%", flexDirection: "column", backgroundColor: theme.bg }}>
      <box style={{ flexGrow: 1, flexDirection: compact ? "column" : "row", gap: 1, padding: 1 }}>
        {!compact && <Sidebar />}
        <Main />
      </box>
      <Footer />
      {helpOpen && <HelpOverlay />}
    </box>
  )
}

const renderer = await createCliRenderer({ screenMode: "alternate-screen", exitOnCtrlC: true, targetFps: 30 })
createRoot(renderer).render(<App />)
```
