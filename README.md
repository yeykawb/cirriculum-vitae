# Jakob Agelin

Personal CV site for Jakob Agelin, Data Platform Engineer based in Mölnlycke, Sweden. It is a static site built with Astro and published at https://yeykawb.github.io/cirriculum-vitae/.

## Local development

The site needs Node 24, pinned in `.nvmrc`. nvm is not loaded by the shell profile here, so load it first in every new shell:

```sh
source ~/.nvm/nvm.sh
nvm use
npm ci
```

Then:

- `npm run dev`: dev server.
- `npm run build`: static build to `dist/`.
- `npm run preview`: serve `dist/` (run `npm run build` first).
- `npm run check`: type-check with `astro check`.

## Tests

`npm test` builds the site and runs Playwright in Chromium against the production build, served on port 4322. To run several suites at once, for example from different worktrees, set a different port:

```sh
PW_PORT=4330 npm test
```

The first run may need the browser installed: `npx playwright install chromium`.

There are no unit tests. Type checking is covered by `npm run check`.

## Editing the content

- Every CV fact lives in `src/data/cv.ts`. Components render from it, so change the text there and nowhere else.
- The PDF resume is `public/Jakob_Agelin_Resume.pdf`.
- `public/og.png` is the static link-preview image (1200×630). It is a render of the hero at rest, made by hand from the production build and fitted onto plain Washi. Re-render it if the hero, the name, the title or the summary change.
- `public/favicon.svg` is the Hanko, a copy of `src/assets/hanko.svg`.

## Deployment

`.github/workflows/deploy.yml` runs `npm ci`, `npm run check` and `npm test` on pushes to `main`, on pull requests and on manual dispatch. On pushes to `main` only, it builds the site with `withastro/action` and deploys it to GitHub Pages with `actions/deploy-pages`.

The repository's Pages source must be set to "GitHub Actions" for this to publish.

## Artwork

The faded Motifs are fragments of public-domain Japanese paintings from the Cleveland Museum of Art Open Access collection (CC0). They are cropped once, with the paper tone knocked out into transparency, and committed in `src/assets/motifs/`. There are no on-page credits by design.

| File | Accession | Work | Artist |
| --- | --- | --- | --- |
| `aged-pine.webp` | 1985.267 | Aged Pine | Nakayama Kōyō (1717–1780) |
| `bamboo.webp` | 1958.337 | Bamboo and Rocks in Clearing Skies | Ike Taiga (1723–1776) |
| `geese.webp` | 1980.188.4 | Wild Geese Descending on a Sandbar, from Eight Views of Xiao-Xiang | Tani Bunchō (1763–1841) |
| `moonlit-landscape.webp` | 2015.482.2 | Moonlit Landscape (one of a pair) | Unknown |
