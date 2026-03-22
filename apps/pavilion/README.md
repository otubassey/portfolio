# Portfolio Orchestrator

A micro-frontend orchestrator that dynamically loads different portfolio implementations. Each implementation showcases a different architectural approach. The orchestrator handles routing, version switching, and seamless transitions between these completely independent applications.

## Architecture

This app uses a micro-frontend architecture pattern where:
- Each portfolio version is an independent Next.js application
- The orchestrator handles routing and version switching
- Implements dynamic module loading for optimal performance

## Features

- 🔄 Dynamic version switching
- 🎨 Centralized theme management
- 🚀 Lazy loading of portfolio apps
- 📱 Responsive design
- 🌓 Dark mode support

## Development
```bash
npm run dev
```

Runs on `http://localhost:3000`

## Key Components

- `VersionSwitcher`: UI for selecting projects and versions
- `AppLoader`: Dynamic loader for portfolio implementations
- `ThemeToggle`: Global theme management

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Lucide Icons
