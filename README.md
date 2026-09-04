# Furina Site

Dedicated website and documentation for **Furina: Clank Chat Atelier**.

## Local preview

The site is intentionally static and works without a build step.

1. Open this folder in VS Code.
2. Open `index.html` in a browser, or use a lightweight local server if you prefer.
3. All internal links use relative paths so the site can also be hosted as a GitHub Pages project site.

## GitHub Pages deployment

The simplest layout is to keep `index.html` at the repository root, push the repository, then enable GitHub Pages from the branch/root you want to publish.

The current download button expects this file to exist:

```text
assets/downloads/Furina-Clank-Chat-Atelier-1.3.1.zip
```

That ZIP is included in this finished site package. If you rename the release ZIP later, update the matching links in `index.html`, `pages/getting-started.html`, `pages/guides.html`, and `pages/releases.html`.

## GitHub-ready status

This package is prepared for a first GitHub Pages deployment. Put the contents of this folder at the repository root and follow `GITHUB-PAGES-CHECKLIST.md`.

The site has no build step, no framework dependency and no required external media. All current page-to-page links are relative so the same files can work locally and under a GitHub Pages project path.

## Main pages

- `index.html` — product landing page
- `pages/guides.html` — searchable documentation library
- `pages/getting-started.html` — Chromium installation + first steps
- `pages/customization.html` — themes, backgrounds, live wallpaper, chat styling, immersion, language, entrance animations and Custom CSS
- `pages/director.html` — Director Notes, next reply, Guard Rails, cues and knowledge boundaries
- `pages/continuity.html` — Continuity Vault, selective memories, budgets and capture workflows
- `pages/story.html` — Scene State, recaps, timeline, snapshots, bookmarks, chapters and Story Bible
- `pages/interfaces.html` — Visual Novel Mode and Phantom Chat
- `pages/response-styles.html` — searchable list of Furina's 32 response styles
- `pages/profile-atelier.html` — Miyabi / Profile Atelier
- `pages/sharing.html` — Theme, Full Setup, Story Bible and profile portability
- `pages/troubleshooting.html` — support, diagnostics and technical boundaries
- `pages/releases.html` — current download and release-family history

## Optional media

The site is designed to remain useful with **zero screenshots or videos**. Optional placeholders are already present on the Interfaces and Profile Atelier pages.

If you later want real media, see `assets/media/README.md`.

## Firefox

Firefox download/setup is intentionally not part of this first website release. Add it later as a separately maintained installation path when desired.

## Editing notes

- Shared landing-page styles live in `style.css`.
- Shared documentation styles live in `styles/docs.css`.
- Shared documentation interactions live in `scripts/docs.js`.
- Searchable guide/style metadata lives in `data/site-data.js` so it works locally through `file://` without fetching JSON.
