# Visual System

## Semantic Color System

Do not scatter raw colors through the app. Define a small theme object.

```ts
const theme = {
  bg: "transparent",
  panel: "#1f2335",
  panelAlt: "#24283b",
  border: "#414868",
  borderMuted: "#303443",
  text: "#c0caf5",
  muted: "#7f849c",
  subtle: "#565f89",
  focus: "#7aa2f7",
  success: "#9ece6a",
  warning: "#e0af68",
  danger: "#f7768e",
  accent: "#bb9af7",
}
```

Rules:

- Color should reinforce hierarchy, not create rainbow noise.
- Never use color as the only signal. Pair with text or glyphs.
- Use dim text for secondary information.
- Use strong colors only for focus, status, errors, and primary action.
- Avoid pure red/green reliance; include text or glyphs.
- Avoid blinking text except for rare terminal-native warnings.

## Text Attributes

Use sparingly and meaningfully:

| Attribute | Good Use |
| --- | --- |
| Bold | Active title, primary label, important value |
| Dim | Metadata, inactive shortcut, placeholder |
| Underline | Link-like text only |
| Inverse | Selection/focus in very dense views |
| Strikethrough | Deleted item, diff removal, completed task |
| Italic | Rare; terminal support varies |
| Blink | Almost never |

Bad TUI text is visually busy. Good TUI text has hierarchy.

## Copy and Select Behavior

Decide what should be copyable.

Usually selectable: logs, code, diffs, output, generated text, file paths, error messages.

Usually not selectable: button labels, decorative titles, separators, repeated row chrome.

```ts
Text({
  content: "Submit",
  selectable: false,
})
```

## Unicode and Icons

Use cautiously: `›`, `▸`, `●`, `○`, `✓`, `✕`, `•`, `…`, simple box drawing.

Avoid: emoji in aligned tables, ambiguous-width glyphs in dense layouts, powerline glyphs unless targeting patched fonts, icons as the only label.

Good:

```text
✓ Build completed
! Warning: config missing optional field
✕ Deploy failed
```

Better when compatibility matters:

```text
[ok] Build completed
[!] Warning: config missing optional field
[x] Deploy failed
```

Always provide plain ASCII fallback if width/capability issues appear.

## Terminal Theme Support

OpenTUI can detect terminal theme mode only when the terminal supports it. Design with fallback.

- Always provide a default theme.
- Test dark and light terminals.
- Do not assume transparency looks good everywhere.
- Avoid low-contrast muted text.
- Keep semantic colors in a theme object.
- Let users override colors if the app is long-lived or professional.

## Code and Diff Views

- Keep code copyable.
- Preserve line numbers where helpful.
- Do not wrap code unless the mode clearly says so.
- Use horizontal scrolling for code panes when needed.
- For diffs, color is helpful but signs are required: `+`, `-`, `~`.

## Core Construct Card Example

```ts
import { Box, Text, t, bold, fg } from "@opentui/core"

function Card(props: { title: string; description: string; focused?: boolean }) {
  return Box(
    {
      border: true,
      borderStyle: "rounded",
      borderColor: props.focused ? theme.focus : theme.border,
      padding: 1,
      gap: 1,
      flexDirection: "column",
    },
    Text({
      content: t`${bold(fg(props.focused ? theme.focus : theme.text)(props.title))}`,
      selectable: false,
    }),
    Text({
      content: props.description,
      fg: theme.muted,
      selectable: true,
    }),
  )
}
```
