# Motion

## Entrance animations

- **Page load choreography**: Stagger element reveals (100–150ms delays), fade + slide combinations
- **Hero section**: Dramatic entrance for primary content (scale, parallax, or creative effects)
- **Content reveals**: Scroll-triggered animations using intersection observer
- **Modal/drawer entry**: Smooth slide + fade, backdrop fade, focus management

## Micro-interactions

- **Hover**: Subtle scale (1.02–1.05), color shift, shadow increase
- **Click**: Quick scale down then up (0.95 → 1), ripple effect
- **Loading**: Spinner or pulse state
- **Input focus**: Border color transition, slight scale or glow
- **Validation**: Shake on error, check mark on success, smooth color transitions
- **Toggle switches**: Smooth slide + color transition (200–300ms)
- **Like/favorite**: Scale + rotation, color transition

## State transitions

- **Show/hide**: Fade + slide (not instant), 200–300ms
- **Expand/collapse**: Height transition with overflow handling, icon rotation
- **Loading states**: Skeleton screen fades, spinner animations, progress bars
- **Success/error**: Color transitions, icon animations, gentle scale pulse
- **Enable/disable**: Opacity transitions, cursor changes

## Navigation & flow

- **Page transitions**: Crossfade between routes, shared element transitions
- **Tab switching**: Slide indicator, content fade/slide
- **Carousel/slider**: Smooth transforms, snap points, momentum
- **Scroll effects**: Parallax layers, sticky headers with state changes, scroll progress indicators

## Feedback & guidance

- **Hover hints**: Tooltip fade-ins, cursor changes, element highlights
- **Drag & drop**: Lift effect (shadow + scale), drop zone highlights, smooth repositioning
- **Copy/paste**: Brief highlight flash on paste, "copied" confirmation
- **Focus flow**: Highlight path through form or workflow

## Timing & easing

### Durations by purpose

| Purpose | Duration |
| --- | --- |
| Instant feedback (button press, toggle) | 100–150ms |
| State changes (hover, menu open) | 200–300ms |
| Layout changes (accordion, modal) | 300–500ms |
| Entrance animations (page load) | 500–800ms |

Exit animations are faster than entrances — use ~75% of enter duration.

### Recommended easing curves

```css
/* Natural deceleration — use these */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);    /* Smooth, refined */
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);   /* Slightly snappier */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);     /* Confident, decisive */
```

### Avoid these easing curves

```css
/* AVOID — feel dated and tacky */
/* bounce: cubic-bezier(0.34, 1.56, 0.64, 1); */
/* elastic: cubic-bezier(0.68, -0.6, 0.32, 1.6); */
```

## Technical implementation

**CSS animations** — prefer for simple, declarative animations:
- Transitions for state changes
- `@keyframes` for complex sequences
- `transform` + `opacity` only (GPU-accelerated)

**JavaScript animation** — use for complex, interactive animations:
- Web Animations API for programmatic control
- Framer Motion for React
- GSAP for complex sequences

### Performance

- **GPU acceleration**: Use `transform` and `opacity`, avoid layout properties
- **will-change**: Add sparingly for known expensive animations
- **Reduce paint**: Minimize repaints, use `contain` where appropriate
- **Monitor FPS**: Ensure 60fps on target devices

## Accessibility

```css
@media (prefers-reduced-motion: reduce) {
  .parallax,
  .marquee,
  .decorative-motion {
    animation: none !important;
    transition: none !important;
  }
}
```

Keep essential feedback (focus indicators, progress states, loading cues) functional, but remove large spatial motion.

## What not to do

- Use bounce or elastic easing curves — dated and draw attention to the animation itself
- Animate layout properties (width, height, top, left) — use transform instead
- Use durations over 500ms for feedback — feels laggy
- Animate without purpose — every animation needs a reason
- Ignore `prefers-reduced-motion` — this is an accessibility violation
- Animate everything — animation fatigue makes interfaces feel exhausting
- Block interaction during animations unless intentional
