# 06: Outside work and Closing

**What to build:** The Outside work section — ice cream science and sourdough baking in one sentence each, then the Ice Cream Analytics and dbt + PostgreSQL portfolio projects with a sentence each and their links — and the Closing section with plain links to email, phone, LinkedIn, GitHub and a second "Download PDF resume" link. No contact form.

**Blocked by:** 04

**Status:** resolved

- [x] CV data module extended with interests and portfolio projects (links taken from the legacy site at commit dbdc7b3)
- [x] Closing has mailto, tel, LinkedIn, GitHub and PDF links; no form
- [x] Playwright: both interests and both projects shown; all project links and Closing links have the expected targets; PDF link resolves

## Answer

Built `OutsideWork.astro` (two interests as one-sentence paragraphs, then the two portfolio projects as Entries with description, quiet tech line and links) and `Closing.astro` (heading "Contact", id `contact`; one modest first-person line, then the hero's three-line contact block via `contactLinks()` and `resumeLink()`). Data appended at the end of `cv.ts` (`outsideWork`, `closing`). Tests in `tests/outside-work.spec.ts`; `sections.spec.ts` now lists 'Outside work' and 'Contact'.

**Deviations / judgement calls**
- The Closing label is "Contact" (id `contact`), not "Closing".
- Interest wording is distilled from the legacy bullet lists; "I make ice cream at home" and "I bake sourdough" are inferred from the legacy headings and portfolio.
- Project links have an aria-label ("<project> on GitHub") so they are distinguishable; links open in the same tab, as on the hero.
- Contact has 10rem bottom padding as breathing room for the future landscape Motif.

**Needs a human eye**
- The Closing line ("If something here sounds like what you're looking for, I'd be glad to talk.") is new wording; keep, change or drop.
- Interests are a plain paragraph pair, projects are Entries; check the hierarchy feels right.
