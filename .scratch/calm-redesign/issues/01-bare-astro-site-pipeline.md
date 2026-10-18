# 01: Bare Astro site with build, tests and deploy pipeline

**What to build:** A minimal but real version of the new site, end to end. On a `redesign` branch, the legacy vanilla site is replaced by an Astro project that renders a plain hero (name, Title, summary, contact line) on washi in a single narrow column, using the two Google Fonts. All CV facts come from one typed CV data module (seeded now with Title, summary and contact; later tickets extend it). A Playwright harness runs against the production build, and a GitHub Actions workflow builds, tests and deploys to GitHub Pages at the unchanged URL. See spec: `.scratch/calm-redesign/spec.md` and ADR-0001.

**Blocked by:** None (can start immediately)

**Status:** claimed

- [ ] `redesign` branch created from `main`; `main` untouched
- [ ] nvm installed and Node 24 LTS active (machine currently has Node 12)
- [ ] Legacy site files (old HTML, CSS, all old JS) removed; portrait and PDF resume carried into the Astro project
- [ ] Astro static build with base path `/cirriculum-vitae`; dev server and production build both work
- [ ] Typed CV data module exists and is the only source of hero text and contact details
- [ ] Hero shows name, *Data Platform Engineer*, the PDF summary, and email/phone/LinkedIn/GitHub links on washi with serif + sans fonts
- [ ] Playwright runs against the built site; tests cover Title text, contact link targets, and zero console errors
- [ ] GitHub Actions workflow: install → type-check → build → Playwright → deploy to Pages via the official Astro action (only takes effect once Pages source is switched at merge)
- [ ] `CLAUDE.md` rewritten for the new stack and conventions — done by the `docs-writer` agent after the code lands, not by the implementer
