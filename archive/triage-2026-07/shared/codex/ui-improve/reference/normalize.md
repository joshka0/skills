# Normalize

Bring a feature back into alignment with the design system and established patterns.

## Discover the Design System

Search for design system documentation, UI guidelines, component libraries, or style guides. Study until you understand:

- Core design principles and aesthetic direction
- Target audience and personas
- Component patterns and conventions
- Design tokens (colors, typography, spacing)

If something isn't clear, ask. Don't guess at design system principles.

## Analyze Deviations

Assess the current feature:

- Where does it deviate from design system patterns?
- Which inconsistencies are cosmetic vs. functional?
- What's the root cause — missing tokens, one-off implementations, or conceptual misalignment?

## Normalize Across Dimensions

- **Typography**: Use design system fonts, sizes, weights, line heights. Replace hard-coded values with typographic tokens or classes.
- **Color**: Apply design system color tokens. Remove one-off color choices that break the palette.
- **Spacing**: Use spacing tokens (margins, padding, gaps). Align with grid systems and layout patterns.
- **Components**: Replace custom implementations with design system components. Ensure props and variants match established patterns.
- **Motion**: Match animation timing, easing, and interaction patterns to other features.
- **Responsive**: Ensure breakpoints and responsive patterns align with design system standards.
- **Accessibility**: Verify contrast ratios, focus states, ARIA labels match design system requirements.
- **Progressive Disclosure**: Match information hierarchy and complexity management to established patterns.

Great design is effective design. Prioritize UX consistency and usability over visual polish alone. Think through the best experience for the use case and personas first.

## Clean Up

After normalization:

- **Consolidate**: Move new shared components to the design system or shared UI path.
- **Remove orphans**: Delete unused implementations, styles, or files made obsolete by normalization.
- **Verify**: Lint, type-check, and test. Ensure normalization didn't introduce regressions.
- **DRY**: Look for duplication introduced during refactoring and consolidate.
