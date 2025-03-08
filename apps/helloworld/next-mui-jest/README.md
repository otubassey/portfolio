# Hello World Portfolio

Welcome to my personal portfolio, a modern, "Hello World"-inspired showcase of my skills, experiences, and projects as a Senior Software Developer. Built with Next.js for performance, Material-UI for a sleek UI, and Jest for robust testing, this applicatiob is a testament to clean code and thoughtful design. The "Hello World" theme runs through the app, starting with an animated terminal GIF on the home page, symbolizing my journey from the first line of code to complex, real-world solutions.

## Table of Contents
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Getting Started](#getting-started)
* [Testing](#testing)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)

## Features

* **Home Section**: Greets visitors with an animated "Hello World" terminal GIF, paired with a welcoming caption.

* **Bio/Introduction Header**: Displays an animated heading with my name and title ("Senior Full-Stack Developer"), plus a bip summary.

* **Skills Section**: Showcases mastered technologies (e.g., React, Node.js) and skills in progress (e.g., Rust) with progress bars using Material-UI cards.

* **Experience Timeline**: An expandable timeline of my professional roles, including titles, dates, companies, locations, tech used, and links.

* **Projects Showcase**: A grid of project titles with hover overlays revealing descriptions, tech stacks, GitHub links, and optional live demos.

* **Responsive Design**: Fully optimized for desktop, tablet, and mobile using Material-UI's breakpoints.

* **Testing**: Unit tests with Jest to ensure component reliability and functionality.

## Tech Stack

* **Frontend**: [Next.js](https://nextjs.org) - React framework for server-side rendering and static site generation. To learn more about Next.js, take a look at the following resources:
    - [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
    - [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
    - [Next.js GitHub repository](https://github.com/vercel/next.js)
    - This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

* **UI Library**: [Material-UI](https://mui.com/material-ui/getting-started/) - Modern, customizable React components for a polished look. [Material UI GitHub repository](https://github.com/mui/material-ui) for reference.

* **State Management**: [Immutable.js](https://immutable-js.com/) - Provides immutable data structures for predictable state updates in complex components.

* **Utilities**: [uuid](https://www.npmjs.com/package/uuid) - Generates unique identifiers for dynamic project and experience entries.

* **Testing**: [Jest](https://jestjs.io/docs/getting-started) - JavaScript testing framework for unit tests.

* **Styling**: Emotion (via Material-UI) for CSS-in-JS.

* **Deployment**: Vercel-ready (or adaptable to other platforms).

## Getting Started

### Prerequites

* Node.js (v16.x or later)
* npm (v8.x or later) or Yarn

### Installation

1. **Clone the Respository**:
```bash
git clone https://github.com/otubassey/portfolio/tree/develop/apps/helloworld/next-mui-jest
cd next-mui-jest
```

2. **Install Dependencies**:
```bash
npm install
# or
yarn install
```

3. **Run the Development Server**:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the portfolio in action.

### Configuration

* **GIF Asset**: Ensure `public/hello-world-terminal.gif` exists.

* **Theme**: Adjust Material-UI theme for colors and typography.

## Testing

Tests are written with Jest to ensure component reliability.

### Running Tests

```bash
npm run test
# or
yarn test
```

### Writing Tests

* Add test files in the same directories as components, utilities, etc... under test.
* Use Jest's matchers to verify rendering, props, and interactions.

## Deployment

Deploy to vercel (Next.js's native platform) for simplicity:

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```
Follow prompts to link your GitHub repo and deploy.

Alternatively, build and host anywhere:
```bash
npm run build
# or
npm start
```

Check out the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js for more information on deployment.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

This is a personal portfolio, but feedback is welcome! Feel free to:
* Open an issue for suggestions or bugs.
* Fork the repo and submit a PR with improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](/LICENSE) file for details.

Copyright (c) 2025 Otu Bassey.
