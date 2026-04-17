# @portfolio/curio

The unified UI foundation for the Portfolio ecosystem. Combines atomic presentational components, design tokens, shared React hooks, and common TypeScript utilities, and developer tooling.

## Overview

Curio is the unified foundational layer for the Portfolio ecosystem. It consolidates visual presentation, interactive logic, and core utilities into a single, high-performance package. It includes:

- **Components:** Production-ready atomic UI primitives (Button, Card, Input) and complex viewers (SpecificationViewer).
- **Hooks:** Shared React logic for data fetching (useAsync), lifecycle management (useIsHydrated), and feature-specific workflows (useFloatingElement).
- **Utilities:** Performance-optimized helpers for string manipulation, object handling, and conditional styling (CssUtils).
- **Theme System:** Responsive Tailwind CSS v4 design tokens with built-in dark/light mode persistence.
- **Playground:** A dedicated internal meta-tooling environment for live component documentation and testing.

## Installation

```bash
# In a workspace package or app
pnpm add @portfolio/curio
```

## Usage

### Basic Components

```tsx
import { Button, Card, Input, Badge } from "@portfolio/curio";

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
import { ThemeProvider, useTheme, ThemeToggle } from "@portfolio/curio";

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
import "@portfolio/curio/base";
```

Then use Tailwind classes with automatic dark mode support:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
  Content adapts to theme automatically
</div>
```

### Custom Theme Tokens

Extend the design system tokens in your app"s CSS:

```css
/* app/globals.css */
@import "tailwindcss";
@import "@portfolio/curio/base";

@theme {
  /* Override or extend design system tokens */
  --color-brand: light-dark(#10b981, #34d399);
  --font-display: "Poppins", sans-serif;
}
```

## Playground (Developer Tooling)

The design system includes interactive component documentation tools for developer use.

### Using the Playground

```tsx
// In apps/playground or documentation sites
import { Playground, PropControls, LivePreview } from "@portfolio/curio/playground";
import { Button } from "@portfolio/curio";

export default function ButtonDocs() {
  return (
    <Playground
      component={Button}
      componentName="Button"
      description="A versatile button component with multiple variants."
      defaultProps={{
        children: "Click me",
        variant: "primary",
        size: "md",
        disabled: false,
      }}
      propDefinitions={[
        {
          name: "variant",
          type: "select",
          defaultValue: "primary",
          options: ["primary", "secondary", "ghost", "danger"],
          description: "Visual style variant",
        },
        {
          name: "size",
          type: "select",
          defaultValue: "md",
          options: ["sm", "md", "lg"],
        },
        {
          name: "disabled",
          type: "boolean",
          defaultValue: false,
        },
      ]}
      examples={[
        {
          name: "Primary",
          props: { children: "Primary", variant: "primary" },
        },
        {
          name: "Disabled",
          props: { children: "Disabled", variant: "primary", disabled: true },
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
│   ├── Card/
│   ├── Input/
│   ├── SpecificationViewer/
│   │   ├── SpecificationViewer.tsx
│   │   └── index.ts
│   └── index.ts
│
├── hooks/
│   ├── useAsync.ts
│   ├── useIsHydrated.ts
│   └── index.ts
│
├── utils/
│   ├── StringUtils.ts
│   ├── CssUtils.ts
│   └── index.ts
│
├── theme/
│   ├── ThemeProvider.tsx
│   ├── useTheme.ts
│   └── index.ts
│
├── playground/
│   └── index.ts
│
├── base.css             # Tailwind v4 base + custom tokens
└── index.ts             # Main entry point (exports everything)
```

## Theme System API

### ThemeProvider Props

```typescript
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: "light" | "dark";
  storageKey?: string;
}
```

### useTheme Hook

```typescript
interface ThemeContextType {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
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
// The ThemeProvider adds/removes the "dark" class
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
} from "@portfolio/curio";

// Styles
import "@portfolio/curio/base";
```

### Playground Exports (Development Only)

```typescript
import {
  Playground,
  PropControls
} from "@portfolio/curio/playground";
```

## Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)

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
