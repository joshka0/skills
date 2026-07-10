---
name: heroui-react-pro
description: "HeroUI Pro React component library. Use when building UIs with @heroui-pro/react — charts, forms, navigation, overlays, data display. Teaches compound component patterns, MCP tool usage, v3 conventions, and the CSS styling system. Keywords: HeroUI Pro, @heroui-pro/react, Pro components, Pro MCP."
metadata:
  author: heroui
  version: "1.0.0"
---

# HeroUI Pro React Development Guide

`@heroui-pro/react` is a premium component library built on **Tailwind CSS v4** and **React Aria Components**. It extends `@heroui/react` (the base library) with charts, advanced forms, navigation, overlays, and data display components.

## Skills Teach, MCP Does

This skill teaches your agent **how** to write `@heroui-pro/react` code correctly. For **live data** (component docs, CSS files, theme variables), use the **HeroUI Pro MCP server** (`heroui-pro` at `mcp.heroui.pro`).

| Tool                 | When to use                                                             |
| -------------------- | ----------------------------------------------------------------------- |
| `list_components`    | Discover available `@heroui-pro/react` components                       |
| `get_component_docs` | Get compound API, anatomy, props, examples before implementing          |
| `get_css`            | Understand BEM classes, design tokens, theme variants for customization |
| `get_docs`           | Read installation, theming, styling, composition guides                 |

**Always call `list_components` first to get the up-to-date component list, then `get_component_docs` before implementing.** The component categories listed in this skill are a reference snapshot — new components are added regularly. The MCP `list_components` tool always returns the current list. If a component name is not in the MCP response, it does not exist yet. Never guess or hallucinate component names.

---

## Two Packages

| Package             | What it contains                                                       | MCP server     |
| ------------------- | ---------------------------------------------------------------------- | -------------- |
| `@heroui/react`     | Base components: Button, Card, Modal, TextField, Tabs, Accordion, etc. | `heroui-react` |
| `@heroui-pro/react` | Pro components: charts, forms, navigation, overlays, data display      | `heroui-pro`   |

Import from the correct package:

```tsx
import {Button, Card, Modal} from "@heroui/react";
import {Sidebar, Command, Sheet, KPI} from "@heroui-pro/react";
```

---

## Critical v3 Rules

- **Tailwind CSS v4 required** — v3 is NOT supported
- **No Provider needed** — components work directly without `<HeroUIProvider>`
- **Compound components** — use dot notation (`Sheet.Trigger`, `Sheet.Content`, `Card.Header`)
- **`onPress` not `onClick`** — for accessibility
- **Import order matters** — Tailwind CSS before HeroUI styles in CSS

```css
@import "tailwindcss";
@import "@heroui/styles";
```

---

## Component Categories

> This list is a snapshot for reference. Always call `list_components` via the MCP to get the current list — new components and blocks are added regularly.

### Charts

AreaChart, BarChart, LineChart, PieChart, RadarChart, RadialChart, ComposedChart, ChartTooltip

### Data Display

KPI, KPIGroup, TrendChip, NumberValue, Rating, EmptyState

### Forms

CellSelect, CellSwitch, CellSlider, CellColorPicker, InlineSelect, NativeSelect, NumberStepper, CheckboxButtonGroup, RadioButtonGroup

### Navigation

Sidebar, FloatingToc, Stepper, Segment

### Overlays

Command, ContextMenu, HoverCard, Sheet

### Feedback

PressableFeedback, DropZone, EmojiPicker, EmojiReactionButton

### Layout

FileTree, Kanban, ItemCard, ItemCardGroup

---

## Key Rules

- Import from `"@heroui/react"` for base components, `"@heroui-pro/react"` for Pro
- Subcomponents via **dot notation**: `Card.Header`, `Sheet.Content`, `Sidebar.Header`
- Use `onPress` not `onClick` for Button
- `Divider` does NOT exist — use `Separator`
- `CardHeader`/`CardContent`/`CardFooter` as direct imports do NOT exist — use `Card.Header` etc.
- Icons: `import { Icon } from "@iconify/react"` with the gravity-ui icon set

### Semantic Variants

- Button: `variant="primary"` (default), `"secondary"`, `"tertiary"`, `"outline"`, `"ghost"`, `"danger"`, `"danger-soft"`
- Sizes: `size="sm"`, `"md"` (default), `"lg"`
- States: `isDisabled`, `isPending`, `isIconOnly`, `fullWidth`

### Switch Component (v3 anatomy)

Always use the dot notation anatomy:

```tsx
import { Switch, Label } from "@heroui/react";

<Switch defaultSelected aria-label="Auto-Lock Doors">
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
</Switch>

<Switch>
  <Switch.Control>
    <Switch.Thumb />
  </Switch.Control>
  <Switch.Content>
    <Label className="text-sm">Enable notifications</Label>
  </Switch.Content>
</Switch>
```

---

## Design Tokens

- Backgrounds: `bg-background`, `bg-surface`, `bg-surface-secondary`, `bg-overlay`
- Text: `text-foreground`, `text-muted`
- Brand: `bg-accent`, `text-accent-foreground`
- Status: `text-success`, `text-warning`, `text-danger` (each with `-foreground`)
- Borders: `border-border`, `border-separator`
- Shadows: `shadow-surface`, `shadow-overlay`
- All colors use oklch color space via CSS variables
- No numbered tokens (`default-100`, `primary-500`) — these are v2 and do NOT exist

---

## CSS System

The `get_css` MCP tool exposes the full shipped CSS from `@heroui-pro/react`:

- **Base variables** — design tokens for colors, spacing, radius, shadows
- **Component styles** — BEM classes with state selectors and modifiers
- **Theme variants** (e.g. brutalism) — variables, fonts, and component overrides

```
get_css()                                    → overview of tokens + available styles/themes
get_css({ components: ["sheet", "sidebar"] }) → BEM CSS for those components
get_css({ theme: "brutalism" })               → full theme variant CSS
```

---

## Components That DONT EXIST — NEVER Use

Divider (use Separator), SelectItem, Progress (use ProgressBar), CardHeader/CardContent/CardFooter as direct imports — use dot notation `Card.Header`/`Card.Content`/`Card.Footer`

## Past Corrections (ALWAYS follow these)

- Switch must use dot notation anatomy (`Switch.Control > Switch.Thumb`); never the old `<Switch>Label</Switch>`
- Never apply `shadow-overlay` to Card — Card already includes `shadow-surface` by default
- Wrap Dropdown triggers in a ghost-variant Button (`variant='ghost'`)
- Use `variant='outline'` (not `'outlined'`) for outlined button styles
- Use `variant='danger-soft'` as a single prop for destructive buttons (not `color='danger' variant='soft'`)
- Use HeroUI's built-in components (ColorSwatchPicker, DatePicker, Calendar, CircularProgress) over custom implementations
- Use `ScrollShadow` with `overflow-y-auto` and `max-h` for scrollable lists
- Apply `rounded-2xl` to match HeroUI's default border-radius convention
- Use `no-underline` class on breadcrumb links
