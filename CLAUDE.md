# CLAUDE.md

This file provides guidance to Claude (and other AI coding assistants) when working with this repository.

## Project Overview

Personal portfolio / homepage for Jack Ruan, deployed as a GitHub Pages static site at **[jackruan.com](https://jackruan.com)** (custom domain via `CNAME`).

The site is a **pure static HTML/CSS project** — no build step, no bundler, no framework. Pages are served directly by GitHub Pages from the repository root.

---

## Commands

```bash
# Start local dev server (required — do NOT open index.html via file://)
python3 -m http.server 8080
# Then open: http://localhost:8080
```

---

## Repository Structure

```
jackruan.github.io/
├── index.html              # Root entry point (homepage) — served at jackruan.com/
├── CNAME                   # Custom domain: jackruan.com
├── public/
│   └── resume.pdf          # Downloadable resume
├── src/
│   ├── about.html          # About page
│   ├── contact.html        # Contact page
│   ├── experience.html     # Professional experience page
│   ├── css/
│   │   └── style.css       # Global stylesheet (single CSS file)
│   ├── js/                 # JavaScript directory (currently empty)
│   ├── components/
│   │   ├── navbar.html     # Shared navigation bar (fetched via JS)
│   │   └── footer.html     # Shared footer (fetched via JS)
│   └── assets/             # Images and other static assets
└── docs/                   # Empty — reserved for documentation
```

---

## Architecture & Conventions

### No Build Step
There is no `package.json`, bundler, or build pipeline. Do **not** add one unless explicitly requested. Do **not** install npm packages or run build commands.

### Component Loading Pattern
Shared UI pieces (navbar, footer) are injected via vanilla `fetch()` calls in each HTML page:

```html
<div id="navbar-placeholder"></div>
<script>
  fetch('src/components/navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;
    });
</script>
```

- The `navbar.html` and `footer.html` components live in `src/components/`.
- All pages (including the root `index.html`) reference components using paths relative to the root (e.g., `src/components/navbar.html`).
- **Note:** Component-relative links inside `navbar.html` (e.g., `href="index.html"`) are relative to the page loading them, not the component file itself.

### CSS
- Single global stylesheet: `src/css/style.css`.
- Loaded via `<link rel="stylesheet" href="src/css/style.css" />` from all pages.
- No CSS preprocessor (no Sass/Less). Use plain CSS only.

### Fonts & Icons
- **Pirata One** (Google Fonts) — used for headings, navbar title, footer.
- **Gill Sans** (system font) — used for body text, nav links, buttons.
- **Bootstrap Icons** (CDN: `bootstrap-icons@1.10.5`) — used for social icons.

### Design Language
- Dark theme: black background (`#000`), white text (`#fff`).
- Sharp-cornered white-border buttons (`.white-border-button`) with invert-on-hover effect.
- Fixed top navbar, max-width `1000px` centered container.
- Sections have generous vertical spacing (`margin: 6rem 0`).

---

## Page Paths & URL Routing

| URL | File |
|-----|------|
| `jackruan.com/` | `index.html` (root) |
| `jackruan.com/src/about.html` | `src/about.html` |
| `jackruan.com/src/contact.html` | `src/contact.html` |
| `jackruan.com/src/experience.html` | `src/experience.html` |
| `jackruan.com/public/resume.pdf` | `public/resume.pdf` |

> **Important:** Pages under `src/` are currently accessed at their full path (e.g., `/src/about.html`). Links between pages must account for the actual served path.

---

## Development & Local Preview

Since there's no build step, use any static file server to preview locally. Example:

```bash
# Python (built-in)
python3 -m http.server 8080

# Node (if npx is available)
npx -y serve .
```

Then open `http://localhost:8080` in the browser.

> **Do not use `file://` protocol directly** — the `fetch()` calls for component injection will fail due to CORS restrictions.

---

## Deployment

- Deployed automatically via **GitHub Pages** on push to `main`.
- Custom domain `jackruan.com` is configured via the `CNAME` file at the repo root.
- No CI/CD pipeline beyond GitHub's built-in Pages deployment.

---

## Key Constraints

- **No build tools** — keep it plain HTML/CSS/JS.
- **No npm installs** — do not touch `node_modules/` or create a `package.json` unless asked.
- **Maintain the single CSS file** — do not split into multiple stylesheets unless asked.
- **Keep component injection pattern** — do not inline navbar/footer into each page unless explicitly requested.
