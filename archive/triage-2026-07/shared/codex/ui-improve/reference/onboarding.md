# Onboarding

Design or improve onboarding, empty states, and first-run flows. Get users to their "aha moment" as fast as possible.

## Principles

- **Show, don't tell**: Demonstrate with working examples. Provide real functionality, not a separate tutorial mode. Teach one thing at a time.
- **Make it optional**: Let experienced users skip. Don't block access to the product. Provide "Skip" or "I'll explore on my own."
- **Time to value**: Get users to their "aha moment" ASAP. Front-load the 20% that delivers 80% of value. Save advanced features for contextual discovery.
- **Context over ceremony**: Teach features when users need them, not upfront. Empty states are onboarding opportunities. Tooltips at point of use.
- **Respect intelligence**: Don't patronize or over-explain. Be concise. Assume users can figure out standard patterns.

## Types

### Product Onboarding
- Clear value proposition (what is this product?)
- Minimal account setup (collect more later, explain why you're asking)
- Introduce 1–3 core concepts with simple examples
- Guide to first real success with pre-populated examples or templates
- Celebrate completion, clear next steps

### Feature Discovery
- Contextual tooltips at relevant moment (first time user sees feature), dismissable with "Don't show again"
- Feature announcements for new releases — what's new, why it matters, try immediately
- Badges or indicators on new/unused features
- Unlock complexity gradually

### Guided Tours
- For complex interfaces or significant product changes
- Spotlight UI elements (dim rest of page), 3–7 steps max
- Allow free navigation, include "Skip tour", make replayable from help menu
- Interactive > passive — let users click real buttons
- Focus on workflow, not features ("Create a project" not "This is the project button")
- Provide sample data so actions work

### Interactive Tutorials
- For hands-on practice with complex/unfamiliar concepts
- Sandbox with sample data, clear objectives, step-by-step guidance, validation, graduation moment

### Help & Documentation
- Contextual help links throughout interface, keyboard shortcut reference, searchable help center
- `?` icon near complex features, "Learn more" in tooltips, keyboard shortcut hints (⌘K on search)

## Empty State Design

Every empty state needs four elements:

1. **What will be here** — "Your recent projects will appear here"
2. **Why it matters** — "Projects help you organize your work and collaborate"
3. **How to get started** — `[Create project]` or `[Import from template]`
4. **Visual interest** — Illustration or icon, not just text on blank page

Optional: contextual help link ("Watch 2-min tutorial")

**Empty state types**:
- **First use**: Never used feature → emphasize value, provide template
- **User cleared**: Intentionally deleted everything → light touch, easy to recreate
- **No results**: Search/filter returned nothing → suggest different query, clear filters
- **No permissions**: Can't access → explain why, how to get access
- **Error**: Failed to load → explain what happened, retry option

## Implementation

- Tooltip libraries: Tippy.js, Popper.js
- Tour libraries: Intro.js, Shepherd.js, React Joyride
- Modal patterns: Focus trap, backdrop, ESC to close
- Track completion in localStorage, respect dismissals
- Never show same onboarding twice — track "seen" states

```javascript
localStorage.setItem('onboarding-completed', 'true');
localStorage.setItem('feature-tooltip-seen-reports', 'true');
```

## Rules

- Don't force long onboarding before product access
- Don't show same tooltip repeatedly — respect dismissals
- Don't block all UI during tour — let users explore
- Don't create disconnected tutorial mode
- Don't overwhelm upfront — progressive disclosure
- Don't hide "Skip" or make it hard to find
- Don't show initial onboarding to returning users
