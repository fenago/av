# LearningScience.ai Brand Identity Guide

## Color Palette

### Primary Colors
```css
/* Primary Blue - Trust, Intelligence, Education */
--brand-blue: #3B82F6;
/* rgb(59, 130, 246) */

/* Secondary Purple - Creativity, Innovation */
--brand-purple: #8B5CF6;
/* rgb(139, 92, 246) */

/* Accent Green - Growth, Success */
--brand-green: #10B981;
/* rgb(16, 185, 129) */
```

### Neutral Colors
```css
/* Dark - Primary Text */
--text-primary: #1F2937;
/* rgb(31, 41, 55) */

/* Medium - Secondary Text */
--text-secondary: #6B7280;
/* rgb(107, 114, 128) */

/* Light - Backgrounds */
--bg-light: #F3F4F6;
/* rgb(243, 244, 246) */

/* White - Contrast and Clean Spaces */
--bg-white: #FFFFFF;
```

## Typography System

### Font Family
- **Primary Font:** 'Inter', sans-serif
- **Fallback:** system fonts

### Heading Styles

#### H1 - Main Headlines
```css
font-size: 3.5rem (56px)
line-height: 1.1
font-weight: 700 (bold)
```
**Usage:** Page headlines, hero titles
**Tailwind Classes:** `text-h1` or `heading-primary`

#### H2 - Section Headlines
```css
font-size: 2.5rem (40px)
line-height: 1.2
font-weight: 700 (bold)
```
**Usage:** Section titles, major headings
**Tailwind Classes:** `text-h2` or `heading-secondary`

#### H3 - Subsection Headlines
```css
font-size: 1.875rem (30px)
line-height: 1.3
font-weight: 600 (semibold)
```
**Usage:** Subsection titles, card headings
**Tailwind Classes:** `text-h3` or `heading-tertiary`

#### H4 - Minor Headlines
```css
font-size: 1.5rem (24px)
line-height: 1.4
font-weight: 600 (semibold)
```
**Usage:** Card titles, feature headings
**Tailwind Classes:** `text-h4` or `heading-quaternary`

### Body Text Styles

#### Large Body Text (Main Content)
```css
font-size: 1.125rem (18px)
line-height: 1.6
font-weight: 400 (regular)
```
**Usage:** Main content, descriptions
**Tailwind Classes:** `text-body-lg` or `body-large`

#### Medium Body Text (Secondary Content)
```css
font-size: 1rem (16px)
line-height: 1.6
font-weight: 400 (regular)
```
**Usage:** Secondary content, captions
**Tailwind Classes:** `text-body-md` or `body-medium`

#### Emphasis Variants
- **Large Emphasis:** `text-body-lg-medium` or `body-large-emphasis` (18px, medium weight)
- **Medium Emphasis:** `text-body-md-medium` or `body-medium-emphasis` (16px, medium weight)

## Usage Examples

### Component Styling
```jsx
// Hero Section Headline
<h1 className="text-h1 text-brand-blue font-bold">
  Your Complete Platform for Higher Education
</h1>

// Alternative using utility class
<h1 className="heading-primary text-brand-blue">
  Your Complete Platform for Higher Education
</h1>

// Section Description
<p className="text-body-lg text-text-secondary">
  LearningScience.ai gives educators their time back with a 24/7 teaching assistant.
</p>

// CTA Button
<button className="bg-brand-gradient text-white px-8 py-4 rounded-lg font-medium">
  Transform Your Teaching
</button>
```

### Color Applications
```jsx
// Primary brand colors
<div className="text-brand-blue">Trust & Intelligence</div>
<div className="text-brand-purple">Creativity & Innovation</div>
<div className="text-brand-green">Growth & Success</div>

// Text colors
<h2 className="text-text-primary">Primary Heading</h2>
<p className="text-text-secondary">Secondary description</p>

// Backgrounds
<section className="bg-bg-light">Light background section</section>
<section className="bg-brand-gradient">Gradient background</section>
```

## Semantic Color Aliases

For easier usage, these semantic aliases are available:

```javascript
// In Tailwind config
colors: {
  'brand-blue': '#3B82F6',    // Use for trust, intelligence
  'brand-purple': '#8B5CF6',  // Use for creativity, innovation
  'brand-green': '#10B981',   // Use for growth, success
  'text-primary': '#1F2937',  // Main text color
  'text-secondary': '#6B7280', // Secondary text color
  'bg-light': '#F3F4F6',      // Light backgrounds
  'bg-white': '#FFFFFF',      // White backgrounds
}
```

## Brand Implementation Status

✅ **Completed:**
- Updated Tailwind configuration with exact color specifications
- Added Inter font import and base typography
- Created semantic color aliases
- Implemented utility classes for consistent usage
- Added gradient backgrounds for brand application

🔄 **Ready for Implementation:**
- All 12 landing page sections can now use consistent brand identity
- Components have access to the complete color palette
- Typography system ensures consistent hierarchy
- Brand gradients available for CTAs and highlights

This brand identity system provides a solid foundation for implementing the updated landing page specification while maintaining visual consistency throughout the platform.
