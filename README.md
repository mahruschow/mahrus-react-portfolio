# Mahrus Chowdhury — React Portfolio

A responsive personal portfolio built with React and Vite. The design uses a dark theme, a subtle dotted background, and content from my portfolio and resume.

## Run locally

Use Node.js 22 or newer, then:

```sh
npm install
cp .env.example .env      # then set ADMIN_TOKEN
npm run dev:full          # Vite on :5173 + API on :3001
```

Open the local address printed in the terminal. Vite proxies `/api/*` to the Express server, so no extra CORS setup is needed in development. Run `npm run dev` or `npm run server` on their own if you only want one half.

## Build and deploy

```sh
npm start
```

This builds the React app into `dist/` and starts the Express server, which serves both the site and the API from one process (set `PORT` as needed). Any Node host works (Render, Railway, Fly.io, ...). Set `ADMIN_TOKEN` in the host's environment, and note that the default JSON-file storage needs a persistent disk (or set `DATA_FILE` to a mounted path).

If you host the frontend elsewhere (Vercel, Netlify, GitHub Pages), deploy `server/` separately and set `CORS_ORIGINS` to the site's URL; the form would also need its `fetch` URL pointed at the API's origin.

## Backend

The API lives in `server/` (Express 5, no database to set up):

| Method | Route | Description |
| ------ | ----- | ----------- |
| `GET` | `/api/health` | Liveness check |
| `POST` | `/api/contact` | Submit the contact form (`name`, `email`, `message`, optional `subject`) |
| `GET` | `/api/messages` | List saved messages, newest first (admin) |
| `DELETE` | `/api/messages/:id` | Delete a message (admin) |

Admin routes need `Authorization: Bearer <ADMIN_TOKEN>`, and return 503 until a token is configured.

```sh
curl -H "Authorization: Bearer $ADMIN_TOKEN" http://localhost:3001/api/messages
```

How it's protected:

- Server-side validation and length limits (the browser never gets to decide what's valid)
- Rate limit of 5 submissions per IP per 15 minutes
- A hidden honeypot field that quietly drops most bots
- `helmet` security headers, a 10 KB body limit, and restricted CORS origins
- Constant-time admin token comparison

Messages are stored in `server/data/messages.json` (git-ignored). Run the unit tests with `npm test`.

## Features

- Contact form backed by the Express API
- Responsive desktop and mobile layouts
- Project filters for robotics and software
- Accessible project detail dialogs with Escape dismissal and focus restoration
- About, skills, and experience sections
- Email, LinkedIn, and GitHub links
- Copy-email button with feedback
- Reduced-motion support and keyboard focus styles

## Edit the content

- `server/`: Express API (`index.js` routes, `validate.js` input rules, `store.js` JSON storage)
- `src/App.jsx`: reusable page components, project content, contact links, and the contact form
- `src/App.css`: component styles and responsive layouts
- `src/index.css`: global typography, colors, and background
- `public/images/`: supplied portrait and project images
- `index.html`: title, description, and metadata

The SurgiSim project uses a labeled system illustration; the other project images came from the supplied portfolio deck. DM Sans loads from Google Fonts, with system font fallbacks.
