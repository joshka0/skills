# Performance

## Render Loop

- Let automatic rendering handle static UI.
- Use continuous rendering only when necessary.
- For animations, request live rendering only for the duration of the animation, then release it.
- Keep `targetFps` modest, usually around `30`.

```ts
const renderer = await createCliRenderer({
  screenMode: "alternate-screen",
  exitOnCtrlC: true,
  targetFps: 30,
})
```

## Animation

Terminals are not great animation canvases. A small amount of motion can help, but constant animation feels cheap or distracting.

Use animation for:

- Progress bars
- Short reveal of a panel
- Active status pulse
- Smooth width/number changes
- Temporary emphasis after an action

Avoid animation for:

- Normal navigation
- Every focus move
- Looping decorative effects
- Large full-screen transitions
- Anything that reduces readability

## Timeline API

When animating numeric properties, prefer OpenTUI's timeline hooks over scattered `setInterval`.

```tsx
import { useTimeline } from "@opentui/react"
import { useEffect, useState } from "react"

function ProgressBar({ target }: { target: number }) {
  const [width, setWidth] = useState(0)
  const timeline = useTimeline({ duration: 250, loop: false })

  useEffect(() => {
    timeline.add(
      { width },
      {
        width: target,
        duration: 250,
        ease: "linear",
        onUpdate: (animation) => {
          setWidth(animation.targets[0].width)
        },
      },
    )
  }, [target])

  return <box style={{ width, height: 1, backgroundColor: "#7aa2f7" }} />
}
```

Do not animate if a static update would be clearer.

## Large Lists and Scroll

- Use viewport culling for large scrollable content.
- Large lists should be culled or paginated.
- Expensive updates should be throttled or debounced.
- Logs should not trigger unnecessary full-screen churn.

## Renderer Efficiency

- Renderer should not be left in continuous mode unnecessarily.
- Console/debug output should be separated from user-facing UI.
- External output should not corrupt the TUI region.
