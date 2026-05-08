# Adaptation

Adapt designs across screens, devices, and contexts. Adaptation is not just scaling — it's rethinking the experience for each context.

## Assess

Understand both contexts:

- **Source**: What was it designed for? What assumptions were made (large screen? mouse? fast connection)? What works well now?
- **Target**: Device type, input method, screen constraints, connection speed, usage context (on-the-go vs desk), user expectations for platform
- **Gaps**: What won't fit, won't work, or is inappropriate in the new context?

## Mobile (Desktop → Mobile)

**Layout**: Single column, vertical stacking, full-width components, bottom navigation instead of top/side.

**Interaction**: Touch targets 44×44px minimum. Bottom sheets instead of dropdowns. Thumbs-first design (controls within thumb reach). Larger tap areas with more spacing. Swipe gestures where appropriate.

**Content**: Progressive disclosure. Prioritize primary content. Shorter, more concise text. 16px minimum font size.

**Navigation**: Hamburger menu or bottom nav. Reduce complexity. Sticky headers for context.

## Tablet (Hybrid)

**Layout**: Two-column layouts. Side panels for secondary content. Master-detail views. Adapt on orientation change.

**Interaction**: Support both touch and pointer. Side navigation drawers. Multi-column forms where appropriate.

## Desktop (Mobile → Desktop)

**Layout**: Multi-column layouts. Side navigation always visible. Multiple info panels simultaneously. Fixed widths with max-width constraints (don't stretch to 4K).

**Interaction**: Hover states for additional information. Keyboard shortcuts. Right-click context menus. Drag and drop. Multi-select with Shift/Cmd.

**Content**: Show more upfront (less progressive disclosure). Data tables with many columns. Richer visualizations.

## Print

- Page breaks at logical points. Remove navigation and interactive elements.
- Black and white or limited color. Expand shortened content (full URLs).
- Page numbers, headers, footers, print date.

## Email

- 600px max width. Single column. Inline CSS. Table-based layouts.
- Large obvious CTA buttons. No hover states. Deep links to web app for complex interactions.

## Techniques

**Responsive breakpoints**: Mobile 320–767px, Tablet 768–1023px, Desktop 1024px+. Or content-driven breakpoints (where the design breaks).

**Layout**: CSS Grid/Flexbox for automatic reflow. Container queries for component-level adaptation. `clamp()` for fluid sizing.

**Touch adaptation**: Increase touch targets. More spacing between interactive elements. Remove hover-dependent interactions. Add touch feedback. Consider thumb zones.

**Content adaptation**: Progressive enhancement (core content first, enhancements on larger screens). Lazy loading for off-screen content. Responsive images (`srcset`, `picture`).

**Navigation adaptation**: Complex nav → hamburger/drawer on mobile. Bottom nav bar for mobile apps. Persistent side nav on desktop. Breadcrumbs for context on smaller screens.

## Rules

- Don't hide core functionality on mobile — if it matters, make it work.
- Don't assume desktop = powerful device (accessibility, older machines).
- Same information architecture across contexts.
- Respect platform conventions (mobile users expect mobile patterns).
- Test landscape on mobile/tablet.
- Use content-driven breakpoints, not generic defaults.
- Test on real devices, not just browser DevTools.
