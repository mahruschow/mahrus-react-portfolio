# Mahrus Chowdhury — React Portfolio

A responsive personal portfolio built with React and Vite. The design uses a dark theme, a subtle dotted background, and content from my portfolio and resume.

## Run locally

Use a current Node.js LTS release, then:

```sh
npm install
npm run dev
```

Open the local address printed in the terminal.

## Build

```sh
npm run build
npm run preview
```

The production files are generated in `dist/`. The app is a static frontend and needs no API keys or backend service.

## Features

- Responsive desktop and mobile layouts
- Project filters for robotics and software
- Accessible project detail dialogs with Escape dismissal and focus restoration
- About, skills, and experience sections
- Email, LinkedIn, and GitHub links
- Copy-email button with feedback
- Reduced-motion support and keyboard focus styles

## Edit the content

- `src/App.jsx`: reusable page components, project content, and contact links
- `src/App.css`: component styles and responsive layouts
- `src/index.css`: global typography, colors, and background
- `public/images/`: supplied portrait and project images
- `index.html`: title, description, and metadata

The SurgiSim project uses a labeled system illustration; the other project images came from the supplied portfolio deck. DM Sans loads from Google Fonts, with system font fallbacks.
