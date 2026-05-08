# Async, Errors, and Status

## Error Recovery

A good TUI error explains:

1. What failed
2. Whether data is safe
3. What the user can do next
4. Which key retries or dismisses

Bad:

```text
Error: failed
```

Good:

```text
Connection failed. Your changes were not sent.
[r] Retry   [e] Edit config   [Esc] Back
```

Use red for danger, but pair it with text and action.

## Async States

Loading should not cause the whole screen to jump.

Good async states:

- Reserve the output area
- Show a spinner only for short waits
- Show progress/logs for long waits
- Allow cancellation when appropriate
- Keep the user's current context visible
- Show completion clearly

Avoid:

- Blank screens
- Fake progress bars
- Constantly changing spinners in multiple regions
- Hiding errors behind overlays

## Status Bars

The status bar is not decoration. It is ambient state.

Good status bar includes:

- Current mode
- Current scope/path/context
- Running operation
- Error/success summary
- Essential shortcuts

```ts
const statusBar = Box(
  {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 1,
    backgroundColor: theme.panel,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 1,
    paddingRight: 1,
  },
  Text({ content: ` ${mode} `, fg: theme.focus, selectable: false }),
  Text({ content: `? help  Esc back  Ctrl+C quit`, fg: theme.muted, selectable: false }),
)
```

Keep status text short. If it wraps, it has failed.

## Confirmation Dialogs

For destructive or high-stakes actions, use a confirmation dialog:

```tsx
function ConfirmDelete({ name, onConfirm, onCancel }: {
  name: string
  onConfirm: () => void
  onCancel: () => void
}) {
  useKeyboard((key) => {
    if (key.name === "escape") onCancel()
    if (key.name === "return") onConfirm()
  })

  return (
    <box
      style={{
        position: "absolute",
        width: 52,
        height: 9,
        left: "50%",
        top: "50%",
        border: true,
        borderStyle: "rounded",
        borderColor: theme.danger,
        backgroundColor: theme.panel,
        padding: 1,
        gap: 1,
      }}
    >
      <text fg={theme.danger}>Delete {name}?</text>
      <text fg={theme.text}>This action cannot be undone.</text>
      <text fg={theme.muted}>Enter confirm   Esc cancel</text>
    </box>
  )
}
```

## Renderer Cleanup on Errors

Always call `renderer.destroy()` in error handlers:

```ts
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

Do not rely on `process.exit()` alone. Restore raw mode, alternate screen, and cursor state in every exit path.
