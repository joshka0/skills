# Design Domain Reference

## Step 1: Exploration Cues

Scan the project to discover what you can:

- **README and docs**: Project purpose, target audience, stated goals
- **Package.json / config files**: Tech stack, dependencies, design libraries
- **Existing components**: Current design patterns, spacing, typography
- **Brand assets**: Logos, favicons, defined color values
- **Design tokens / CSS variables**: Color palettes, font stacks, spacing scales
- **Style guides or brand documentation**

## Step 2: Question Sets

### Users & Purpose
- Who uses this? What is their context when using it?
- What job are they trying to get done?
- What emotions should the interface evoke?

### Brand & Personality
- Brand personality in 3 words?
- Reference sites or apps that capture the right feel?
- What should this explicitly NOT look like? Anti-references?

### Aesthetic Preferences
- Visual direction preferences? (minimal, bold, elegant, playful, technical)
- Light mode, dark mode, or both?
- Colors that must be used or avoided?

### Accessibility & Inclusion
- Specific accessibility requirements? (WCAG level, known user needs)
- Considerations for reduced motion, color blindness, or other accommodations?

## Step 3: Section Template

Write a `## Design Context` section with these subsections:

```markdown
## Design Context

### Users
[Who they are, their context, the job to be done]

### Brand Personality
[Voice, tone, 3-word personality, emotional goals]

### Aesthetic Direction
[Visual tone, references, anti-references, theme]

### Design Principles
[3-5 principles derived from the conversation]
```
