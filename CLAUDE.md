# CV Website — Jakob Agelin

Personal CV site for Jakob Agelin, Data Platform Engineer based in Mölnlycke, Sweden. Published as a static site at https://yeykawb.github.io/cirriculum-vitae/.

The redesign is specified in `.scratch/calm-redesign/spec.md`. Architecture decisions are in `docs/adr/`. Vocabulary is in `GLOSSARY.md`.

## Stack

- Astro 7, static output. TypeScript with Astro's strict tsconfig. npm.
- Node 24, pinned in `.nvmrc`. nvm is not loaded by the shell profile, so run `source ~/.nvm/nvm.sh` first in every new shell.
- Base path `/cirriculum-vitae` (set in `astro.config.mjs`).
- Playwright (Chromium) for end-to-end tests.

## Commands

- `npm run dev`: dev server.
- `npm run build`: static build to `dist/`.
- `npm run preview`: serve `dist/`.
- `npm run check`: `astro check` (types).
- `npm test`: builds, then runs Playwright against the production build, served on `PW_PORT` (default 4322). Use a different `PW_PORT` per worktree when running suites in parallel.

Astro 7 backgrounds `astro dev` and `astro preview` when it detects an AI agent. For a foreground server, pass `--ignore-lock`. To stop a background server, run `npx astro dev stop` or `npx astro preview stop`.

## Layout

- `src/data/cv.ts`: typed CV data. The single source of truth for every CV fact. Exports `cv` (typed as `CV`) and the helpers `contactLinks()`, `resumeLink()` and `hasAssignments()`.
- `src/layouts/Base.astro`: HTML shell, head and Google Fonts. Also owns the meta description, canonical, Open Graph and Twitter tags and the favicon, with absolute URLs built from `site` and the base path.
- `src/components/`: one component per section, plus shared pieces:
    - `Section.astro`: the section wrapper. Takes `id` and `label` and renders the h2.
    - `Entry.astro`: the entry layout with dates in a left margin on desktop. Used by Experience, Education and Outside work.
    - `HeroArt.astro`: the hero's SVG Ridges, sun and birds. Each layer is addressable via `data-hero-layer`.
    - `Hero.astro` also holds the scroll choreography. An inline vanilla script writes scroll progress to `--hero-progress` and adds `html.hero-motion`. Without JS, or with `prefers-reduced-motion`, the hero is static and unpinned.
    - `SectionIndex.astro`: the margin section index. A fixed right-margin `<nav aria-label="Sections">`, desktop only (≥64rem). It appears once the first section (About) is reached, which is after the hero pin, and needs JS. The current section is marked with `aria-current="location"`.
    - `Motif.astro`: one ink-wash Motif by `name`: `pine`, `bamboo`, `geese` or `moon`. Mounted in Experience, Skills, Outside work and Closing. Its styles take `--moon-width`, which `Closing.astro` sets.
- `src/pages/index.astro`: the single page.
- `src/styles/global.css`: palette and font custom properties. Also holds the Day arc: a body `linear-gradient` from `--washi` to `--washi-cool` over the page.
- `src/assets/`: images, processed by Astro's image pipeline. `src/assets/motifs/` holds the Motif images; their provenance is in the README under `## Artwork`.
- `public/`: files served as-is, including the PDF resume, `og.png` (the link-preview image) and `favicon.svg` (the Hanko).
- `tests/`: Playwright specs.
- `.github/workflows/deploy.yml`: test and deploy pipeline.

Sections, in order: Hero, About, Experience, Skills, Certifications, Education, Outside work, Closing. The Closing section is labelled "Contact", id `contact`, component `Closing.astro`.

## Conventions

- 4-space indentation. CSS classes in kebab-case.
- Components render CV facts from `src/data/cv.ts`. Never hard-code CV text in a component.
- Use the glossary terms (Employer, Assignment, Ensō, Ridge, Motif, Day arc, Hanko, Washi) in code and docs.
- Vermilion is used only for the sun and the Hanko.
- Light washi only. No dark mode, no theme toggle, no `prefers-color-scheme`.
- Vanilla JS only. No JS or UI frameworks, no CSS frameworks, no animation or smooth-scroll libraries.
- Google Fonts (Noto Serif JP, Inter) is the only third-party resource. No analytics, no cookies.
- Don't add new files unless clearly necessary.
- Calmness is the acceptance criterion. When in doubt, remove rather than add.

## Tone & Content

- First person, direct, honest — not corporate
- Technical depth is valued over buzzwords
- Content reflects genuine interests and experience, not a polished marketing pitch

## Testing

- Playwright runs against the production build only, in Chromium.
- Tests assert only what a visitor sees or does. Never assert on class names, internals or the data module's shape.
- `tests/sections.spec.ts` holds the section order list (`sectionsAfterHero`). New sections must be added there.
- There are no unit tests. `npm run check` covers types.

## Deployment

- `.github/workflows/deploy.yml` runs on pushes to `main`, on pull requests and on manual dispatch. The `test` job runs `npm ci`, `npm run check` and `npm test`. On pushes to `main`, the `build` job (withastro/action) and the `deploy` job (actions/deploy-pages) publish to GitHub Pages.
- The Pages source must be switched to "GitHub Actions" at merge. This is not yet done. Until then, work stays on the `redesign` branch and `main` stays live.

## Agent skills

### Issue tracker

Issues and specs live as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Default vocabulary (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`), recorded as a `Status:` line in each issue file. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
