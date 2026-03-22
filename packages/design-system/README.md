# @portfolio/design-system

A comprehensive design system for the portfolio monorepo, providing UI primitives, theming infrastructure, and developer tooling.

## Overview

The design system is the foundational presentation layer that powers all applications in the portfolio. It includes:

- **Components** - Production-ready UI primitives (Button, Card, Input, etc.)
- **Theme System** - Dark mode support with theme persistence
- **Base Styles** - Tailwind CSS v4 configuration with design tokens
- **Playground** - Interactive component documentation tooling

## Installation

```bash
# In a workspace package or app
pnpm add @portfolio/design-system
```

## Usage

### Basic Components

```tsx
import { Button, Card, Input, Badge } from '@portfolio/design-system';

function MyComponent() {
  return (
    <Card className="p-6">
      <h2>Welcome</h2>
      <Input placeholder="Enter your name" />
      <Button variant="primary" size="md">
        Submit
      </Button>
      <Badge variant="success">Active</Badge>
    </Card>
  );
}
```

### Theme System

```tsx
import { ThemeProvider, useTheme, ThemeToggle } from '@portfolio/design-system';

// Wrap your app
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="my-app-theme">
      <YourApp />
    </ThemeProvider>
  );
}

// Use theme in components
function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {/* Or use the built-in toggle */}
      <ThemeToggle className="p-2 rounded-lg" />
    </div>
  );
}
```

### Styling with Tailwind v4

Import the base CSS in your app:

```tsx
// app/layout.tsx or app/globals.css
import '@portfolio/design-system/base';
```

Then use Tailwind classes with automatic dark mode support:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content adapts to theme automatically
</div>
```

### Custom Theme Tokens

Extend the design system tokens in your app's CSS:

```css
/* app/globals.css */
@import "tailwindcss";
@import "@portfolio/design-system/base";

@theme {
  /* Override or extend design system tokens */
  --color-brand: light-dark(#10b981, #34d399);
  --font-display: 'Poppins', sans-serif;
}
```

## Playground (Developer Tooling)

The design system includes interactive component documentation tools for developer use.

### Using the Playground

```tsx
// In apps/playground or documentation sites
import { Playground, PropControls, LivePreview } from '@portfolio/design-system/playground';
import { Button } from '@portfolio/design-system';

export default function ButtonDocs() {
  return (
    <Playground
      component={Button}
      componentName="Button"
      description="A versatile button component with multiple variants."
      defaultProps={{
        children: 'Click me',
        variant: 'primary',
        size: 'md',
        disabled: false,
      }}
      propDefinitions={[
        {
          name: 'variant',
          type: 'select',
          defaultValue: 'primary',
          options: ['primary', 'secondary', 'ghost', 'danger'],
          description: 'Visual style variant',
        },
        {
          name: 'size',
          type: 'select',
          defaultValue: 'md',
          options: ['sm', 'md', 'lg'],
        },
        {
          name: 'disabled',
          type: 'boolean',
          defaultValue: false,
        },
      ]}
      examples={[
        {
          name: 'Primary',
          props: { children: 'Primary', variant: 'primary' },
        },
        {
          name: 'Disabled',
          props: { children: 'Disabled', variant: 'primary', disabled: true },
        },
      ]}
    />
  );
}
```

**Note:** Playground tools are for developer documentation only and should not be included in production apps.

## Package Structure

```
src/
├── components/          # Production UI components
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   ├── Card/
│   ├── Input/
│   ├── Badge/
│   └── index.ts
│
├── theme/               # Theme system
│   ├── ThemeProvider.tsx
│   ├── useTheme.ts
│   ├── ThemeToggle.tsx
│   └── index.ts
│
├── playground/          # Developer tooling (not for production)
│   ├── Playground/
│   ├── PropControls/
│   ├── LivePreview/
│   ├── CodePreview/
│   └── index.ts
│
├── base.css             # Tailwind v4 base + design tokens
└── index.ts             # Main exports
```

## Available Components

### Layout
- `Card` - Container with consistent styling
- `Container` - Responsive container wrapper

### Forms
- `Input` - Text input with variants
- `Button` - Interactive button with multiple styles
- `Select` - Dropdown selection
- `Checkbox` - Checkbox input
- `Radio` - Radio button input

### Typography
- `Heading` - Semantic headings (h1-h6)
- `Text` - Body text with variants
- `Label` - Form labels

### Feedback
- `Badge` - Status indicators
- `Alert` - Notification messages
- `Toast` - Temporary notifications
- `Spinner` - Loading indicators

### Data Display
- `Avatar` - User profile images
- `Tag` - Categorization labels
- `Tooltip` - Contextual information

## Theme System API

### ThemeProvider Props

```typescript
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: 'light' | 'dark';
  storageKey?: string;
}
```

### useTheme Hook

```typescript
interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  toggleTheme: () => void;
}
```

### ThemeToggle Props

```typescript
interface ThemeToggleProps {
  className?: string;
  lightIcon?: React.ReactNode;
  darkIcon?: React.ReactNode;
}
```

## Design Tokens

The design system provides a comprehensive set of design tokens:

```css
/* Colors */
--color-primary: light-dark(#3b82f6, #60a5fa);
--color-secondary: light-dark(#8b5cf6, #a78bfa);
--color-success: light-dark(#10b981, #34d399);
--color-danger: light-dark(#ef4444, #f87171);
--color-warning: light-dark(#f59e0b, #fbbf24);

/* Surface colors */
--color-surface: light-dark(#ffffff, #1f2937);
--color-surface-elevated: light-dark(#f9fafb, #111827);

/* Text colors */
--color-text-primary: light-dark(#111827, #f9fafb);
--color-text-secondary: light-dark(#6b7280, #d1d5db);

/* Borders */
--color-border: light-dark(#e5e7eb, #374151);
```

## Tailwind v4 Configuration

The design system uses Tailwind CSS v4 with CSS-first configuration:

```css
/* src/base.css */
@import "tailwindcss";

/* Dark mode variant */
@variant dark (&:is(.dark *));

/* Design tokens */
@theme {
  /* Tokens defined here */
}
```

**No `tailwind.config.js` needed!** Everything is configured in CSS.

## Dark Mode

Dark mode is enabled automatically when the `dark` class is applied to the `<html>` element. The `ThemeProvider` handles this automatically.

### Manual Dark Mode Control

```tsx
// The ThemeProvider adds/removes the 'dark' class
<html className="dark"> {/* Dark mode active */}
<html> {/* Light mode active */}
```

### Using Dark Mode Classes

```tsx
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">
    Heading
  </h1>
  <p className="text-gray-600 dark:text-gray-400">
    Body text
  </p>
</div>
```

## Development

### Building

```bash
# Build the package
pnpm build

# Watch mode for development
pnpm dev
```

### Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### Linting & Type Checking

```bash
# Lint code
pnpm lint

# Type check
pnpm type-check
```

## Exports

### Main Exports (Production)

```typescript
import {
  // Components
  Button,
  Card,
  Input,
  Badge,
  // ... other components

  // Theme
  ThemeProvider,
  useTheme,
  ThemeToggle,
} from '@portfolio/design-system';

// Styles
import '@portfolio/design-system/base';
```

### Playground Exports (Development Only)

```typescript
import {
  Playground,
  PropControls,
  LivePreview,
  CodePreview,
} from '@portfolio/design-system/playground';
```

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

## Dependencies

### Production Dependencies
- None (peer dependencies only)

### Peer Dependencies
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `tailwindcss`: ^4.0.0

## Best Practices

### Component Usage
1. **Always use semantic HTML** - Components are built on proper HTML elements
2. **Leverage Tailwind utilities** - Extend component styles with className prop
3. **Follow accessibility guidelines** - Components include ARIA attributes
4. **Use TypeScript** - Full type support for all components

### Theme Integration
1. **Wrap your app early** - Add ThemeProvider at the root layout
2. **Use consistent storageKey** - Same key across all apps for theme sync
3. **Respect system preferences** - ThemeProvider checks prefers-color-scheme
4. **Test both themes** - Always verify components in light and dark modes

### Performance
1. **Tree-shaking works** - Only import what you use
2. **CSS is optimized** - Tailwind purges unused styles
3. **Components are lightweight** - Minimal runtime overhead

## Migration Guide

### From v3 to v4 (Tailwind)

If migrating from Tailwind v3:

1. **Remove `tailwind.config.js`** - Not needed in v4
2. **Update CSS imports**:
   ```css
   /* Old (v3) */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   /* New (v4) */
   @import "tailwindcss";
   @variant dark (&:is(.dark *));
   ```
3. **Use @theme for customization** - Instead of theme.extend in config

## Contributing

### Adding a New Component

1. Create component directory in `src/components/`
2. Add component file with TypeScript types
3. Add tests
4. Export from `src/components/index.ts`
5. Update this README with component documentation
6. Create playground documentation page

### Modifying Theme System

1. Update theme files in `src/theme/`
2. Ensure backward compatibility
3. Update design tokens in `src/base.css`
4. Test across all apps

## Support

For issues, questions, or contributions:
- Internal documentation: [Link to your docs]
- Issue tracker: [Link to issues]
- Team chat: [Link to Slack/Discord]

## License

[Your License]

---

**Version:** 1.0.0
**Last Updated:** January 2026

