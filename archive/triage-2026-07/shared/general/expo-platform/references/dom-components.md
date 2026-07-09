# DOM Components

DOM components allow web code to run verbatim in a WebView on native platforms
while rendering as-is on web. This enables using web-only libraries like
`recharts`, `react-syntax-highlighter`, or any React web library in your Expo
app without modification.

## When to Use DOM Components

- **Web-only libraries** — Charts (recharts, chart.js), syntax highlighters,
  rich text editors, or any library that depends on DOM APIs.
- **Migrating web code** — Bring existing React web components to native without
  rewriting.
- **Complex HTML/CSS layouts** — When CSS features aren't available in React
  Native.
- **iframes or embeds** — Embedding external content that requires a browser
  context.
- **Canvas or WebGL** — Web graphics APIs not available natively.

## When NOT to Use DOM Components

- **Native performance is critical** — WebViews add overhead.
- **Simple UI** — React Native components are more efficient for basic layouts.
- **Deep native integration** — Use local modules instead for native APIs.
- **Layout routes** — `_layout` files cannot be DOM components.

## Component Contract

Every DOM component file must:

1. Have the `'use dom';` directive at the top.
2. Export a single default React component.
3. Live in its own file — cannot be defined inline or combined with native
   components.
4. Accept only serializable props (strings, numbers, booleans, arrays, plain
   objects).
5. Include CSS in the component file — DOM components run in isolated context.
6. Accept a `dom: import("expo/dom").DOMProps` prop for WebView configuration.

### Basic Example

```tsx
// components/WebChart.tsx
"use dom";

export default function WebChart({
  data,
}: {
  data: number[];
  dom: import("expo/dom").DOMProps;
}) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Chart Data</h2>
      <ul>
        {data.map((value, i) => (
          <li key={i}>{value}</li>
        ))}
      </ul>
    </div>
  );
}
```

## The `dom` Prop

Common options:

```tsx
<DOMComponent dom={{ scrollEnabled: false }} />
<DOMComponent dom={{ contentInsetAdjustmentBehavior: "never" }} />
<DOMComponent dom={{ style: { width: 300, height: 400 } }} />
```

## Native Actions Bridge

Pass async functions as props to expose native functionality:

```tsx
// Native parent
<DOMComponent
  showAlert={async (message: string) => { Alert.alert("From Web", message); }}
  saveData={async (data: { name: string }) => { return { success: true }; }}
/>

// DOM component — receives and calls async functions
```

## Web Libraries in Native

DOM components can use any web library (recharts, react-syntax-highlighter,
etc.) without modification. Import and use them normally inside a `'use dom'`
file.

## Router Limitations

These hooks do **not** work directly in DOM components because they need
synchronous access to native routing state:

- `useLocalSearchParams()`
- `useGlobalSearchParams()`
- `usePathname()`
- `useSegments()`
- `useRootNavigation()`
- `useRootNavigationState()`

**Solution:** Read these values in the native parent and pass as props.

`<Link />` and `router.push()` / `router.replace()` do work in DOM components.

## Assets and CSS

- Prefer `require()` for assets instead of the public directory.
- CSS imports must be in the DOM component file since they run in isolated
  context.
- Inline styles and CSS-in-JS also work.

## Platform Behavior

| Platform | Behavior                            |
| -------- | ----------------------------------- |
| iOS      | Rendered in WKWebView               |
| Android  | Rendered in WebView                 |
| Web      | Rendered as-is (no WebView wrapper) |

On web, the `dom` prop is ignored since no WebView is needed.

## Performance Warnings

- DOM components hot reload during development.
- Keep DOM components focused — don't put entire screens in WebViews.
- Use native components for navigation chrome; DOM components for specialized
  content.
- Test on all platforms — web rendering may differ slightly from native WebViews.
- Large DOM components may impact performance — profile if needed.
- The WebView has its own JavaScript context — cannot directly share state with
  native.
