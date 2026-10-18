# 01: Bare Astro site with build, tests and deploy pipeline

**What to build:** A minimal but real version of the new site, end to end. On a `redesign` branch, the legacy vanilla site is replaced by an Astro project that renders a plain hero (name, Title, summary, contact line) on washi in a single narrow column, using the two Google Fonts. All CV facts come from one typed CV data module (seeded now with Title, summary and contact; later tickets extend it). A Playwright harness runs against the production build, and a GitHub Actions workflow builds, tests and deploys to GitHub Pages at the unchanged URL. See spec: `.scratch/calm-redesign/spec.md` and ADR-0001.

**Blocked by:** None (can start immediately)

**Status:** claimed

- [x] `redesign` branch created from `main`; `main` untouched
- [x] nvm installed and Node 24 LTS active (machine currently has Node 12)
- [x] Legacy site files (old HTML, CSS, all old JS) removed; portrait and PDF resume carried into the Astro project
- [x] Astro static build with base path `/cirriculum-vitae`; dev server and production build both work
- [x] Typed CV data module exists and is the only source of hero text and contact details
- [x] Hero shows name, *Data Platform Engineer*, the PDF summary, and email/phone/LinkedIn/GitHub links on washi with serif + sans fonts
- [x] Playwright runs against the built site; tests cover Title text, contact link targets, and zero console errors
- [x] GitHub Actions workflow: install → type-check → build → Playwright → deploy to Pages via the official Astro action (only takes effect once Pages source is switched at merge)
- [ ] `CLAUDE.md` rewritten for the new stack and conventions — done by the `docs-writer` agent after the code lands, not by the implementer

## Answer

Built by the orchestrator (Opus) in-session on `redesign`.

- **Node:** nvm 0.40.3 + Node 24.22.0 (`.nvmrc` = 24). nvm was installed with `PROFILE=/dev/null` because editing `~/.zshrc` was blocked by the permission classifier, so `~/.zshrc` is untouched. Every shell needs `source ~/.nvm/nvm.sh` (or Jakob can add the two nvm lines to `~/.zshrc` himself).
- **Stack:** Astro 7.4, TypeScript 6 (`@astrojs/check` doesn't support TS 7 yet), strict tsconfig, `@playwright/test` 1.64, `@types/node` 24. Scripts: `dev`, `build`, `preview`, `check`, `test`.
- **Layout:** `src/data/cv.ts` (typed CV data module: `name`, `title`, `summary`, `contact`, plus `contactLinks()`), `src/layouts/Base.astro`, `src/components/Hero.astro`, `src/pages/index.astro`, `src/styles/global.css` (palette and font custom properties). Portrait is `src/assets/portrait.jpg` (for Astro's image pipeline); the PDF is `public/Jakob_Agelin_Resume.pdf`, so it's served at `/cirriculum-vitae/Jakob_Agelin_Resume.pdf`.
- **Fonts:** the PDF embeds Noto Serif JP Light and Inter (Light/Regular/Medium). Both are loaded from Google Fonts.
- **Palette:** `--washi #f1ece3`, `--ink #1f1d1a`, `--ink-soft #3d3a35` (body text, 9.6:1), `--grey #66625b` (secondary text, 5.2:1, AA), `--vermilion #d9643f` (reserved for the sun and the Hanko).
- **Tests:** `npm test` builds, then serves `dist/` with `astro preview --ignore-lock` on `PW_PORT` (default 4322) and runs Playwright with Chromium. Use a different `PW_PORT` per worktree when running suites in parallel. `--ignore-lock` matters: Astro 7 auto-backgrounds `preview`/`dev` when it detects an AI agent, which orphaned the server and broke the next run.
- **CI:** `.github/workflows/deploy.yml` runs `test` (npm ci → `astro check` → Playwright install → `npm test`) on push to `main`, on PRs and on manual dispatch. Then `build` (withastro/action@v6) and `deploy` (actions/deploy-pages@v5) run, except on PRs.
- **Removed:** `index.html`, `assets/` (CSS, all JS, `export/cv-link.txt`).
- Dev toolbar is disabled in `astro.config.mjs` to keep screenshots clean.

