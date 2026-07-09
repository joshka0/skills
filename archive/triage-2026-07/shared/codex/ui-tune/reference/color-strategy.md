# Color Strategy

## Semantic color

**State indicators:**
- Success: Green tones (emerald, forest, mint)
- Error: Red/pink tones (rose, crimson, coral)
- Warning: Orange/amber tones
- Info: Blue tones (sky, ocean, indigo)
- Neutral: Gray/slate for inactive states

**Status badges**: Colored backgrounds or borders for states (active, pending, completed).
**Progress indicators**: Colored bars, rings, or charts showing completion or health.

## Accent color application

- **Primary actions**: Color the most important buttons/CTAs
- **Links**: Add color to clickable text (maintain accessibility)
- **Icons**: Colorize key icons for recognition and personality
- **Headers/titles**: Add color to section headers or key labels
- **Hover states**: Introduce color on interaction

## Backgrounds & surfaces

- **Tinted backgrounds**: Replace pure gray (`#f5f5f5`) with warm neutrals (`oklch(97% 0.01 60)`) or cool tints (`oklch(97% 0.01 250)`)
- **Colored sections**: Use subtle background colors to separate areas
- **Gradient backgrounds**: Subtle, intentional gradients — not generic purple-blue
- **Cards & surfaces**: Tint cards or surfaces slightly for warmth

Use OKLCH for color — it's perceptually uniform, so equal steps in lightness look equal. Great for harmonious scales.

## Data visualization

- **Charts & graphs**: Color to encode categories or values
- **Heatmaps**: Color intensity shows density or importance
- **Comparison**: Color coding for different datasets or timeframes

## Borders & accents

- **Accent borders**: Colored left/top borders on cards or sections
- **Underlines**: Color underlines for emphasis or active states
- **Dividers**: Subtle colored dividers instead of gray lines
- **Focus rings**: Colored focus indicators matching brand

## Typography color

- **Colored headings**: Brand colors for section headings (maintain contrast)
- **Highlight text**: Color for emphasis or categories
- **Labels & tags**: Small colored labels for metadata or categories

## Balance rules

### 60/30/10 distribution
- **Dominant color** (60%): Primary brand color or most used accent
- **Secondary color** (30%): Supporting color for variety
- **Accent color** (10%): High contrast for key moments
- **Neutrals** (remaining): Gray/black/white for structure

### Accessibility
- **Contrast ratios**: WCAG compliance (4.5:1 for text, 3:1 for UI components)
- **Don't rely on color alone**: Use icons, labels, or patterns alongside color
- **Test for color blindness**: Verify red/green combinations work for all users

### Cohesion
- **Consistent palette**: 2–4 colors beyond neutrals, not arbitrary choices
- **Systematic application**: Same color meanings throughout (green always = success)
- **Temperature consistency**: Warm palette stays warm, cool stays cool

## What not to do

- Use every color in the rainbow — choose 2–4 beyond neutrals
- Apply color randomly without semantic meaning
- Put gray text on colored backgrounds — use a darker shade of the background color or transparency
- Use pure gray for neutrals — add subtle color tint for sophistication
- Use pure black (`#000`) or pure white (`#fff`) for large areas
- Violate WCAG contrast requirements
- Use color as the only indicator (accessibility issue)
- Default to purple-blue gradients (AI slop aesthetic)
