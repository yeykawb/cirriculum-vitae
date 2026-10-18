# 07: Margin section index

**What to build:** On desktop, a tiny fixed list of section names in the right margin — grey, with the current section in ink — that jumps to a section on click. Hidden entirely on mobile. No top nav, progress bar or back-to-top button.

**Blocked by:** 04, 05, 06

**Status:** resolved

- [x] Index lists About, Experience, Skills, Certifications, Education, Outside work, Closing (labels may be shortened)
- [x] Current section highlighted as the visitor scrolls
- [x] Keyboard reachable with visible focus
- [x] Playwright: visible on desktop, hidden at phone width; clicking an entry scrolls that section into view and highlights it

## Answer

Built `src/components/SectionIndex.astro`, mounted once in `src/pages/index.astro`, with `tests/section-index.spec.ts` (7 tests). A `<nav aria-label="Sections">` is fixed in the right margin, vertically centred, `right: 2.5rem`, small letter-spaced uppercase sans, grey with the current entry in ink. It is `display: none` below 64rem (phones get nothing, nothing in the tab order). Over the hero it is `visibility: hidden` and opacity 0, so links are not focusable, and it fades in once About is reached.

- Labels are a small list in the component matching the section ids; a test checks each link targets an existing section whose h2 equals the label. Deriving it from the sections was not clean.
- One IntersectionObserver (root = top half of the viewport) marks a section reached once it enters that half or has scrolled past; the current section is the last one reached (`aria-current="location"`), and the index shows when any is reached. A second observer treats the last section (Contact, short) as reached once fully visible, since it can never reach the top half at the end of the page. No scroll listeners.
- No-JS: the index stays hidden (calm; it would otherwise sit over the static hero art). Plain anchors, no smooth scroll.
- Reduced motion: no transitions.
- Screenshots: `/tmp/cv-shots/w4-07-*.png`.
