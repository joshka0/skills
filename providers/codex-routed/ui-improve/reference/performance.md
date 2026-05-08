# Performance

Speed and smoothness — load time, rendering, animation, and Core Web Vitals.

## Measure First

Measure before and after. Premature optimization wastes time. Identify:

- What's slow? (Initial load? Interactions? Animations?)
- What's causing it? (Large images? Expensive JS? Layout thrashing?)
- How bad is it? (Perceivable? Annoying? Blocking?)
- Who's affected? (All users? Mobile only? Slow connections?)

## Loading Performance

**Images**:

```html
<img
  src="hero.webp"
  srcset="hero-400.webp 400w, hero-800.webp 800w, hero-1200.webp 1200w"
  sizes="(max-width: 400px) 400px, (max-width: 800px) 800px, 1200px"
  loading="lazy"
  alt="Hero image"
/>
```

- Use modern formats (WebP, AVIF)
- Proper sizing (don't load 3000px image for 300px display)
- Lazy load below-fold images
- Compress to 80–85% quality (usually imperceptible)

**JavaScript bundle**:

```javascript
// Lazy load heavy components
const HeavyChart = lazy(() => import('./HeavyChart'));
```

- Code splitting (route-based, component-based)
- Tree shaking, remove unused dependencies
- Dynamic imports for large components

**CSS**: Remove unused CSS. Critical CSS inline, rest async. CSS containment for independent regions.

**Fonts**:

```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+0020-007F; /* Basic Latin only */
}
```

- Subset fonts, preload critical fonts, limit font weights

**Loading strategy**: Critical resources first. Preload key assets. Prefetch likely next pages. Service worker for caching.

## Rendering Performance

**Avoid layout thrashing**:

```javascript
// Bad: alternating reads and writes
elements.forEach(el => {
  const height = el.offsetHeight; // Read (forces layout)
  el.style.height = height * 2;   // Write
});

// Good: batch reads, then batch writes
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] * 2;
});
```

- Minimize DOM depth (flatter is faster)
- `content-visibility: auto` for long lists
- Virtual scrolling for very long lists (react-window, react-virtualized)
- CSS `contain` property for independent regions

**Reduce paint**: Use `transform` and `opacity` for animations (GPU-accelerated). Avoid animating layout properties. `will-change` sparingly.

## Animation Performance

**GPU-accelerated (fast)**: `transform`, `opacity`
**CPU-bound (slow)**: `left`, `width`, `top`, `height`

- Target 16ms per frame (60fps)
- `requestAnimationFrame` for JS animations
- Debounce/throttle scroll handlers
- CSS animations when possible

```javascript
// Efficient viewport detection
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { /* lazy load or animate */ }
  });
});
```

## React/Framework Optimization

- `memo()` for expensive components
- `useMemo()` and `useCallback()` for expensive computations
- Virtualize long lists, code split routes
- Avoid inline function creation in render
- Minimize re-renders, memoize computed values

## Network Optimization

- Combine small files, SVG sprites for icons, inline small critical assets
- Pagination (don't load everything), GraphQL for needed fields only
- Response compression (gzip, brotli), HTTP caching headers, CDN
- Adaptive loading based on connection (`navigator.connection`)

## Core Web Vitals

### LCP < 2.5s
Optimize hero images, inline critical CSS, preload key resources, CDN, SSR.

### INP < 200ms
Break up long tasks, defer non-critical JS, web workers for heavy computation.

### CLS < 0.1
Set dimensions on images/videos. Don't inject content above existing content. Use `aspect-ratio`. Reserve space for dynamic content.

```css
.image-container {
  aspect-ratio: 16 / 9;
}
```

## Verify

Compare before/after Lighthouse scores. Test on low-end devices, not just flagship. Throttle to 3G. Ensure no regressions.
