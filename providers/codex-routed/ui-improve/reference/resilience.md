# Resilience

Harden interfaces for real use — overflow, i18n, error states, edge cases, and production reality.

## Text Overflow & Wrapping

```css
/* Single line with ellipsis */
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Multi-line with clamp */
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Allow wrapping */
.wrap {
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
}
```

Flex/grid overflow prevention:

```css
.flex-item {
  min-width: 0;    /* Allow shrinking below content size */
  overflow: hidden;
}

.grid-item {
  min-width: 0;
  min-height: 0;
}
```

- Use `clamp()` for fluid typography
- Set minimum readable sizes (14px on mobile)
- Ensure containers expand with text

## Internationalization

**Text expansion**: Add 30–40% space budget for translations. Use flexbox/grid that adapts to content. Test with the longest language (usually German). Avoid fixed widths on text containers.

**RTL support** — use logical properties:

```css
margin-inline-start: 1rem;    /* Not margin-left */
padding-inline: 1rem;         /* Not padding-left/right */
border-inline-end: 1px solid; /* Not border-right */
```

**Date/Time/Number formatting**:

```javascript
new Intl.DateTimeFormat('en-US').format(date);  // 1/15/2024
new Intl.DateTimeFormat('de-DE').format(date);  // 15.1.2024

new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(1234.56);  // $1,234.56
```

**Pluralization** — use proper i18n library, not `${count} item${count !== 1 ? 's' : ''}`. Languages have complex plural rules.

**Character sets**: UTF-8 everywhere. Test CJK characters, emoji (2–4 bytes), different scripts.

## Error Handling

**Network errors**: Clear message, retry button, explain what happened. Handle timeouts.

**Form validation**: Inline errors near fields, specific messages, suggest corrections, preserve user input on error.

**API status codes**:
- 400 → show validation errors
- 401 → redirect to login
- 403 → show permission error
- 404 → show not found state
- 429 → show rate limit message
- 500 → generic error, offer support

**Graceful degradation**: Core functionality works without JavaScript. Images have alt text. Fallbacks for unsupported features.

## Edge Cases

- **Empty states**: No items, no results, no notifications — provide clear next action.
- **Loading states**: Show what's loading ("Loading your projects..."), time estimates for long ops.
- **Large datasets**: Pagination or virtual scrolling. Search/filter. Don't load 10,000 items at once.
- **Concurrent operations**: Prevent double-submission. Handle race conditions. Optimistic updates with rollback.
- **Permission states**: Read-only mode. Clear explanation of why access is limited.
- **Browser compatibility**: Feature detection (not browser detection). Polyfills. Test target browsers.

## Input Validation

- Required fields, format validation, length limits, pattern matching
- Server-side validation always (never trust client-side only)
- Validate and sanitize all inputs, protect against injection

## Accessibility Resilience

- All functionality accessible via keyboard, logical tab order, focus management in modals
- Proper ARIA labels, announce dynamic changes (live regions), descriptive alt text, semantic HTML

```css
@media (prefers-reduced-motion: reduce) {
  .parallax, .marquee, .decorative-motion {
    animation: none !important;
    transition: none !important;
  }
}
```

Keep essential feedback (focus indicators, progress states, loading cues) functional, but remove large spatial motion.

- Test in Windows high contrast mode
- Don't rely only on color — provide alternative visual cues

## Performance Resilience

- Progressive image loading, skeleton screens, optimistic UI updates
- Clean up event listeners, cancel subscriptions, clear timers, abort pending requests on unmount
- Debounce search input (~300ms), throttle scroll handlers (~100ms)

## Testing

Test with: 100+ character names, emoji in all fields, Arabic/Hebrew (RTL), CJK, no internet, 3G throttle, 1000+ items, rapid double-click, forced API errors, completely empty data.
