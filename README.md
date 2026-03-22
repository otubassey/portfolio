# Portfolio Monorepo

This monorepo serves as the foundation for my digital portfolio, housing a collection of nested monorepos, each dedicated to a specific theme or project.

The [monorepo starter guide](https://monorepo.guide/getting-started) was followed to set this up.

## Nested Monorepo Structure

Each nested monorepo represents a distinct theme or project within my portfolio. These monorepos are organized to promote modularity, resuability, and efficient development.

## Portfolio Monorepo Structure

Below are the locations for the various packages and nested monorepos:

packages/
├── design-system/           # UI + Theme (combined)
│   ├── src/
│   │   ├── components/      # Button, Card, Input, etc.
│   │   ├── theme/           # ThemeProvider, useTheme, ThemeToggle
│   │   ├── base.css
│   │   └── index.ts
│   └── package.json
├── portfolio-domain/
│   ├── profile/
│   ├── professional/
│   ├── showroom/
│   └── contact/
└── portfolio-layouts/
