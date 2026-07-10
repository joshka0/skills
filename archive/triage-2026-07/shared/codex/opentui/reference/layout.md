# Layout

## Layout Regions

Most good TUIs have a simple shell:

```text
┌ Header / title / context ───────────────────────────┐
│ Main content                                        │
│                                                     │
├ Optional secondary/status region ───────────────────┤
│ Footer: keys, mode, status, errors                  │
└─────────────────────────────────────────────────────┘
```

Common layouts:

| Layout | Good For |
| --- | --- |
| Single column | Forms, wizards, focused workflows |
| Sidebar + detail | File browsers, model pickers, settings |
| Top tabs + content | Sectioned workflows |
| Split main + inspector | Code, diffs, logs, previews |
| Scrollbox + fixed footer | Chat, logs, command output |
| Command palette overlay | Global navigation and commands |

Avoid more than three major regions unless the terminal is wide enough.

## Responsive Terminal Sizing

Terminals are resized constantly. Treat layout as fluid.

| Width | Layout Guidance |
| ---: | --- |
| `< 60 cols` | Single-column fallback; hide descriptions; shorten labels |
| `60–89 cols` | Compact two-region layout only if necessary |
| `90–119 cols` | Sidebar + main works well |
| `120+ cols` | Sidebar + main + inspector can work |
| `< 20 rows` | Hide nonessential panels; keep footer minimal |

```tsx
import { useTerminalDimensions } from "@opentui/react"

function App() {
  const { width, height } = useTerminalDimensions()
  const compact = width < 80 || height < 24

  return (
    <box style={{ width: "100%", height: "100%", flexDirection: compact ? "column" : "row", gap: 1 }}>
      {!compact && <Sidebar />}
      <Main compact={compact} />
    </box>
  )
}
```

Never let a layout become unreadable just because it technically fits.

## Borders as Structure

Borders consume visual attention and one cell on every side.

Use borders for:

- Primary panels, modal overlays, focused regions
- Grouped forms, code/diff viewers, high-stakes confirmation dialogs

Avoid borders for:

- Every row, every small button, nested panels inside nested panels
- Purely decorative emphasis, content that whitespace can separate

Border style guidance:

| Style | Use |
| --- | --- |
| `single` | Neutral panels, utility areas, dense apps |
| `rounded` | Primary cards, modals, friendly tools |
| `double` | Rare; high-emphasis modal or app frame |
| `heavy` | Very rare; active/focused emphasis or alert |

If the screen feels noisy, remove borders before removing content.

## Whitespace Over Boxes

Good spacing often beats visual chrome.

Use `padding: 1` for readable panels, `gap: 1` between stacked controls, aligned labels, consistent left edges, stable footer position, and fixed-width metadata columns.

Bad:

```text
┌────┐ ┌────┐ ┌────┐
│ A  │ │ B  │ │ C  │
└────┘ └────┘ └────┘
```

Better:

```text
  A    B    C
────  ────  ────
```

## Absolute Positioning

Use absolute positioning only for: status bars, overlays, modals, floating command palette, fixed footer, cursor-like indicators.

Avoid it for normal layout. Prefer flexbox so the UI responds to terminal resize.

## Tables

- Prefer key-value lists on narrow screens.
- Truncate middle of long paths when needed.
- Right-align numbers; keep units visible.
- Use dim text for secondary columns.
- Let users open a row for details instead of showing every field inline.

Good:

```text
NAME              STATUS     LATENCY   UPDATED
api               healthy       42ms   2m ago
worker           warning      180ms   8m ago
billing-sync     failed          —     12m ago
```

Bad:

```text
| name | status | latency | updated | region | version | pid | hash | ... |
```
