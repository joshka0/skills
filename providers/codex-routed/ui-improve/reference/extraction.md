# Design-System Extraction

Identify reusable components, patterns, and design tokens, then consolidate them into the design system.

## Discover

1. **Find the design system**: Locate your design system, component library, or shared UI directory. Understand its structure — component organization, naming conventions, token structure, documentation patterns, import/export conventions.

   If no design system exists, ask before creating one. Understand the preferred location and structure first.

2. **Identify patterns**:
   - **Repeated components**: Similar UI patterns used multiple times
   - **Hard-coded values**: Colors, spacing, typography, shadows that should be tokens
   - **Inconsistent variations**: Multiple implementations of the same concept
   - **Reusable patterns**: Layout patterns, composition patterns, interaction patterns

3. **Assess value**: Extract when used 3+ times or likely to be reused, when systematizing improves consistency, and when it's a general pattern (not context-specific). Weigh maintenance cost vs. benefit.

## Plan Extraction

Create a systematic plan:

- **Components to extract**: Which UI elements become reusable components?
- **Tokens to create**: Which hard-coded values become design tokens?
- **Variants to support**: What variations does each component need?
- **Naming conventions**: Names that match existing design system patterns
- **Migration path**: How to refactor existing uses to consume the shared versions

Design systems grow incrementally. Extract what's clearly reusable now, not everything that might someday be reusable.

## Extract & Enrich

Build improved, reusable versions:

- **Components**: Clear props API with sensible defaults. Proper variants. Accessibility built in (ARIA, keyboard navigation, focus management). Documentation and usage examples.
- **Design tokens**: Clear naming (primitive vs semantic). Proper hierarchy and organization. Documentation of when to use each token.
- **Patterns**: When to use. Code examples. Variations and combinations.

## Migrate

1. Search for all instances of the patterns you've extracted
2. Replace each with the shared version
3. Verify visual and functional parity
4. Delete dead code (old implementations)

## Document

- Add new components to the component library
- Document token usage and values
- Add examples and guidelines
- Update Storybook or component catalog

## Rules

- Don't extract one-off, context-specific implementations without generalization
- Don't create components so generic they're useless
- Don't extract without considering existing design system conventions
- Don't skip proper TypeScript types or prop documentation
- Don't create tokens for every single value — tokens should have semantic meaning
