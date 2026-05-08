# Keyboard and Focus

## Keyboard-First Design

Every important action must be reachable by keyboard. Mouse support is an enhancement. Keyboard is the contract.

### Default Key Conventions

| Key | Expected Meaning |
| --- | --- |
| `Tab` / `Shift+Tab` | Move focus between regions or fields |
| `Up/Down` | Move within vertical lists |
| `Left/Right` | Move across tabs, segmented controls, or horizontal choices |
| `j/k` | Optional Vim-style vertical movement in lists |
| `Enter` | Confirm, submit, open, select |
| `Space` | Toggle, mark, multi-select |
| `Esc` | Close overlay, cancel edit, go back one layer |
| `?` | Show help |
| `/` | Search or filter |
| `Ctrl+C` | Exit or interrupt current operation |
| `Ctrl+L` | Clear or refresh |
| `Ctrl+R` | Refresh/reload |

Do not invent surprising shortcuts for common actions. If a shortcut is destructive, require confirmation unless easily reversible.

## Focus Indicators

At every moment the user must know:

1. Which region is active
2. Which item or field is selected
3. What pressing Enter will do
4. How to leave the current state

Good focus treatments:

- Selected row background
- Active panel border color
- Cursor visible in focused input
- Title or footer changes for active mode
- Dimmed inactive regions
- Explicit focus marker: `›`, `●`, or `▸`

Bad focus treatments:

- Only changing text color slightly
- Using color with no shape/text fallback
- Showing multiple "selected" states that compete
- Hiding focus inside nested panels

```ts
Box(
  {
    border: true,
    borderStyle: "rounded",
    borderColor: isFocused ? theme.focus : theme.border,
    title: isFocused ? " Files — active " : " Files ",
    padding: 1,
  },
  // ...
)
```

## Help Overlays

A `?` help panel is one of the highest-value TUI features.

Good help overlay:

- Grouped by current mode
- Short labels
- Visible exit instruction
- Includes global shortcuts
- Does not obscure critical state permanently

```text
┌ Help ───────────────────────────────┐
│ Navigation                          │
│  ↑/↓, j/k     Move selection         │
│  Enter        Open selected item     │
│  Esc          Back / close panel     │
│                                      │
│ Actions                             │
│  /            Filter list            │
│  r            Refresh                │
│  d            Delete selected item   │
│                                      │
│ Global                              │
│  ?            Toggle help            │
│  Ctrl+C       Quit                   │
└──────────────────────────────────────┘
```

## Labels, Hints, and Footers

Every screen should answer: Where am I? What is selected? What can I do now? What keys matter? How do I go back?

Footer pattern:

```text
↑↓ move   Enter select   / search   ? help   Esc back   Ctrl+C quit
```

Do not show twenty shortcuts at once. Show the three to six that matter in the current state.

## Command Palette

A command palette is often the fastest path through a TUI.

- Opens with a predictable shortcut (often `Ctrl+P` or `:`)
- Filters as the user types
- Supports Up/Down and Enter
- Shows descriptions or shortcuts
- Closes with Esc
- Does not destroy previous context
