# Polish

Final quality pass — alignment, states, transitions, and details. The difference between shipped and polished.

## Pre-Polish Check

Polish is the last step, not the first. Confirm:

- Feature is functionally complete
- Known issues are marked with TODOs
- Quality bar is understood (MVP vs flagship)
- Ship timeline is known (triage effort accordingly)

## Systematic Checklist

### Visual Alignment & Spacing

- Pixel-perfect alignment to grid
- All gaps use spacing scale (no random 13px gaps)
- Optical alignment for visual weight (icons may need offset)
- Responsive consistency at all breakpoints
- Elements snap to baseline grid

### Typography

- Hierarchy consistency — same elements use same sizes/weights throughout
- Line length: 45–75 characters for body text
- Line height appropriate for font size and context
- No widows or orphans (single words on last line)
- No FOUT/FOIT flashes

### Color & Contrast

- All text meets WCAG standards
- No hard-coded colors — all use design tokens
- Works in all theme variants
- Same colors mean same things throughout
- Focus indicators visible with sufficient contrast
- No pure gray on colored backgrounds — use a shade of that color or transparency
- Add subtle color tint to neutrals (0.01 chroma), avoid pure black

### Interaction States

Every interactive element needs all eight states:

1. **Default** — resting state
2. **Hover** — subtle feedback (color, scale, shadow)
3. **Focus** — keyboard focus indicator (never remove without replacement)
4. **Active** — click/tap feedback
5. **Disabled** — clearly non-interactive
6. **Loading** — async action feedback
7. **Error** — validation or error state
8. **Success** — successful completion

Missing states create confusion and broken experiences.

### Micro-interactions & Transitions

- All state changes animated appropriately (150–300ms)
- Consistent easing: use ease-out-quart/quint/expo for natural deceleration. Never bounce or elastic — they feel dated.
- 60fps animations, only animate `transform` and `opacity`
- Motion serves purpose, not decoration
- Respects `prefers-reduced-motion`

### Content & Copy

- Consistent terminology throughout
- Consistent capitalization (Title Case vs Sentence case)
- No typos
- Punctuation consistency (periods on sentences, not on labels)

### Icons & Images

- All icons from same family or matching style
- Icons sized consistently for context
- Proper optical alignment with adjacent text
- All images have descriptive alt text
- No layout shift from images (proper aspect ratios)

### Edge Cases & Error States

- All async actions have loading feedback
- Helpful empty states, not blank space
- Clear error messages with recovery paths
- Handles very long names, descriptions
- Handles missing data gracefully

### Responsiveness

- Test mobile, tablet, desktop
- Touch targets 44×44px minimum on touch devices
- No text smaller than 14px on mobile
- No horizontal scroll
- Content adapts logically

### Code Quality

- Remove console logs and commented code
- Remove unused imports
- Consistent naming conventions
- No TypeScript `any` or ignored errors
- Proper ARIA labels and semantic HTML

## Verification

- Use it yourself — actually interact with the feature
- Test on real devices, not just browser DevTools
- Compare to intended design
- Check all states, not just happy path
