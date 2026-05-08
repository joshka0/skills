# Forms and Selectors

## Form Flow

Terminal forms become frustrating when focus and submission are unclear.

Rules:

- Show focused field clearly.
- `Tab` and `Shift+Tab` move between fields.
- `Enter` submits only when that is obvious.
- `Esc` cancels or exits edit mode.
- Validation errors appear near the relevant field.
- Required fields are marked textually, not only with color.
- Preserve typed values when validation fails.
- Do not log secrets.

### Labeled Input Pattern

```ts
function LabeledInput(props: {
  id: string
  label: string
  placeholder: string
  width?: number
}) {
  return delegate(
    { focus: `${props.id}-input`, value: `${props.id}-input` },
    Box(
      { flexDirection: "row", gap: 1 },
      Text({
        content: props.label.padEnd(14),
        fg: theme.muted,
        selectable: false,
      }),
      Input({
        id: `${props.id}-input`,
        width: props.width ?? 30,
        placeholder: props.placeholder,
        backgroundColor: theme.panel,
        focusedBackgroundColor: theme.panelAlt,
        textColor: theme.text,
        cursorColor: theme.focus,
      }),
    ),
  )
}
```

## Input Semantics

Distinguish live input from committed changes:

| Event | Meaning |
| --- | --- |
| input / `onInput` | Every keystroke; filtering, live preview |
| change | Committed value after blur or Enter |
| enter / submit | User intentionally submitted |

Do not run expensive work on every keystroke unless it is debounced or cheap.

Good: live filter list on `onInput`, validate or submit on Enter, save committed config on blur/change.

Bad: network request on every character, destructive command triggered by accidental Enter, hidden validation with no field-level message.

## Select Lists

A good selector includes: title or prompt, current selection, optional descriptions, scroll indicator if clipped, filter/search for long lists, preview pane for complex choices, clear empty state.

Use `Select` for vertical choices. It supports common navigation: Up/Down, `j/k`, fast scroll, Enter selection.

Good option text:

```ts
{
  name: "Deploy production",
  description: "Build, upload, and promote the latest release"
}
```

Bad option text:

```ts
{ name: "prod", description: "" }
```

### Select With Preview

```tsx
function Picker() {
  const [selected, setSelected] = useState(0)

  const options = [
    { name: "Local", description: "Run task on this machine" },
    { name: "Staging", description: "Deploy to staging environment" },
    { name: "Production", description: "Deploy to production" },
  ]

  return (
    <box style={{ flexDirection: "row", gap: 1, width: "100%", height: "100%" }}>
      <box title="Target" style={{ width: 34, border: true, borderStyle: "rounded" }}>
        <select
          width={32}
          height={10}
          options={options}
          selectedIndex={selected}
          showDescription
          showScrollIndicator
          onSelectionChanged={(index) => setSelected(index)}
        />
      </box>
      <box title="Preview" style={{ flexGrow: 1, border: true, borderStyle: "rounded", borderColor: theme.border, padding: 1 }}>
        <text fg={theme.text}>{options[selected]?.name}</text>
        <text fg={theme.muted}>{options[selected]?.description}</text>
      </box>
    </box>
  )
}
```

## Empty States

Empty states should be calm, useful, and action-oriented.

Good:

```text
No deployments yet.

Run your first deployment:
  deploy production

[Enter] Create deploy   [?] Help   [Esc] Back
```

Bad:

```text
[]
```

## Progressive Disclosure

Do not put every option on the first screen. Prefer: overview first, details on selection, advanced settings behind `a` or a separate panel, command palette for infrequent actions, help overlay for shortcuts.
