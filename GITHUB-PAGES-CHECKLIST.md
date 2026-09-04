# GitHub Pages launch checklist

This build is ready to place at the root of a GitHub repository.

## 1. Repository contents

Keep these files/folders at the repository root:

```text
.nojekyll
404.html
index.html
style.css
script.js
pages/
styles/
scripts/
data/
assets/
```

The Chromium release download is already expected at:

```text
assets/downloads/Furina-Clank-Chat-Atelier-1.3.1.zip
```

## 2. Enable GitHub Pages

In the GitHub repository:

1. Open **Settings**.
2. Open **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the branch containing the site (normally `main`).
5. Select `/ (root)`.
6. Save and wait for GitHub Pages to publish.

All site navigation uses relative links, so it works as either a project site such as
`username.github.io/repository-name/` or a site served from a custom domain.

## 3. Test after deployment

Before sharing the URL publicly, check:

- Home page loads.
- **Getting Started** opens from the header.
- **Guides** opens and search/filtering works.
- The Furina 1.3.1 download button downloads the ZIP.
- One interactive demo from Director, Continuity, Story and Immersion works.
- Mobile navigation works at a narrow browser width.
- A deliberately invalid URL shows the Furina 404 page.

## 4. Optional media — not required

The website is intentionally complete without real screenshots or video.

If you want to add media before the Reddit launch, the highest-value additions are:

```text
assets/media/visual-novel-demo.mp4
assets/media/phantom-chat-demo.mp4
assets/media/profile-atelier-demo.webp
assets/images/social-preview.png
```

The first three are optional documentation enhancements. `social-preview.png` would be useful for a future Open Graph / social-card pass once the final public URL is known.

Do **not** delay the GitHub deployment just to collect these assets. The current pages use styled mockups/placeholders and remain fully readable without them.

## 5. Final pre-Reddit pass

Once the GitHub Pages URL exists, the next useful pass is deployment-specific:

- check the live URL on desktop and mobile;
- add canonical/Open Graph metadata using the final URL;
- optionally add a social preview image;
- verify the direct download from GitHub Pages;
- make any last copy/layout tweaks based on the live deployment;
- then prepare the Reddit announcement.

Firefox is intentionally excluded from this first public website flow and can be added later as its own maintained download/install path.
