# @delvui/tokens

Design tokens for the DelvUI design system - colors, typography, spacing, and more.

## Installation

```bash
npm install @delvui/tokens
```

## Usage

```typescript
import { colors, spacing, typography } from '@delvui/tokens';

// Use design tokens
const primaryColor = colors.primary[500];
const baseSpacing = spacing.md;
```

### CSS Variables

Import CSS custom properties:

```css
@import '@delvui/tokens/css';

.my-component {
  color: var(--color-primary-500);
  padding: var(--space-md);
}
```

## Documentation

Visit [https://delvui.dev](https://delvui.dev) for complete documentation.

## License

MIT