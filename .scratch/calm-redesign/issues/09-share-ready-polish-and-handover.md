# 09: Share-ready polish and handover

**What to build:** The site is ready to share and hand over: proper title/description and an Open Graph/Twitter preview image of the hero composition, the JA Hanko as favicon, an accessibility and no-JS pass, a rewritten README, and a merge checklist for Jakob.

**Blocked by:** 03, 07, 08

**Status:** resolved

- [x] Title, meta description, OG/Twitter card with static hero image (absolute URLs under the base path)
- [x] Hanko favicon
- [x] Logical heading order; contrast meets guidelines; all interactive elements keyboard-reachable with visible focus
- [x] With JavaScript disabled, all CV content readable in final resting layout
- [x] No analytics, cookies or third-party scripts beyond Google Fonts
- [x] README: local dev, test and deploy instructions — done by the `docs-writer` agent after the code lands, not by the implementer
- [x] Playwright: meta tags present; full content visible with JS disabled; heading structure valid; zero console errors over a full scroll
- [x] Merge checklist delivered to Jakob: switch Pages source to "GitHub Actions", then merge `redesign` into `main`

## Answer

Built: head meta in `Base.astro` (canonical, og:*, twitter:*, absolute URLs from `Astro.site` plus `BASE_URL`), `public/og.png` (1200x630, the hero at rest: rendered once at 1440x900 at 2x with Playwright from the production build, then fitted onto plain Washi; the live hero is untouched), `public/favicon.svg` (a copy of `src/assets/hanko.svg`, linked as an SVG icon), `tests/share.spec.ts`, and `tests/health.spec.ts` now scrolls a viewport at a time.

Accessibility: heading order was already valid. Contrast measured: `--grey` #66625b on Washi #f1ece3 is 5.15:1 and on the cooled Washi #eeebe5 is 5.10:1, so it passes AA for small text (incl. the 0.66rem index labels) and nothing was changed. Links already have a 1px ink focus outline from the global style; the new Tab-through test confirms it.

Deviations: no PNG favicon or apple-touch-icon fallback (not trivial enough). The OG image shows the hero's contact lines, as the hero does at rest; the throwaway render scripts are not committed. README and the merge checklist are left for the docs agent and the orchestrator (checkboxes unticked).

For a human eye: the OG image crop (`public/og.png`), the OG image alt text, and whether contact details belong in a share image.
