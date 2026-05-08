# Scroll, Logs, and Output

## Scroll Regions

A scrollable area without scroll affordance feels broken. Use `ScrollBox` when content exceeds visible space.

Rules:

- Give scroll regions explicit height.
- Show a scrollbar or textual position when content is clipped.
- Use sticky scroll for logs and chat.
- Pause sticky behavior when the user scrolls away.
- Use viewport culling for large lists.
- Keep the footer outside the scroll region.

### Scrollable Logs Pattern

```tsx
function Logs({ lines }: { lines: string[] }) {
  return (
    <scrollbox
      style={{
        width: "100%",
        height: "100%",
        border: true,
        borderStyle: "rounded",
        borderColor: theme.border,
      }}
      stickyScroll
      stickyStart="bottom"
      viewportCulling
    >
      {lines.map((line, index) => (
        <text key={index} fg={theme.text} selectable>
          {line}
        </text>
      ))}
    </scrollbox>
  )
}
```

### Core Construct ScrollBox

```ts
ScrollBox(
  {
    id: "logs",
    width: "100%",
    height: "100%",
    stickyScroll: true,
    stickyStart: "bottom",
    viewportCulling: true,
    verticalScrollbarOptions: {
      trackOptions: { backgroundColor: theme.borderMuted },
    },
  },
  ...logLines.map((line) =>
    Text({
      content: line,
      fg: theme.text,
      selectable: true,
    }),
  ),
)
```

## Separating App UI from Logs

Do not let logging fight rendering.

- Use the OpenTUI console overlay for debugging.
- In split-footer mode, capture stdout when output needs to appear above the footer.
- Do not use `console.log` as a substitute for app UI.
- Do not print progress with ordinary stdout while OpenTUI owns the same terminal region.
- Route debug logs away from production UI unless the user opens a console/debug panel.

## External Output Handling

Never let normal `stdout.write` overlap the TUI accidentally.

In `split-footer` mode, use `externalOutputMode: "capture-stdout"` to prevent stdout from corrupting the TUI region:

```ts
const renderer = await createCliRenderer({
  screenMode: "split-footer",
  footerHeight: 14,
  externalOutputMode: "capture-stdout",
  exitOnCtrlC: true,
})
```

## Secrets in Output

Never leak secrets into visible text, logs, console overlays, stdout, snapshots, or crash traces.

- Mask secrets if collecting them.
- Do not store secret input in app-level debug logs.
- Do not print environment variables wholesale.
- Do not copy secrets into error messages.
- If masking is not supported by the component you are using, implement a safe masked input before collecting secrets.
