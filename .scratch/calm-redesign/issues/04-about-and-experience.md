# 04: About and Experience

**What to build:** The About section (2–3 short first-person sentences plus the soft-edged black-and-white portrait blended into the paper) and the Experience section: Employers in reverse chronological order with their Assignments (or a role, for Visiba Care), PDF wording enriched with one or two details from the old site, and one quiet grey tech line per Assignment. This ticket establishes the entry layout (dates in the left margin on desktop, inline on mobile) that 05 and 06 reuse.

**Blocked by:** 01

**Status:** resolved

- [x] CV data module extended with About and Employers → Assignments
- [x] Employers: Consid 2023–present (Ambea, Bostadsförmedlingen i Stockholm), Capgemini 2022–2023 (Hedin Bil), Visiba Care 2021–2022 (Data Platform Owner role), Capgemini 2018–2021 (Volvo Cars — Configure Your Volvo only)
- [x] Dates in left margin on desktop, inline on mobile; no cards, shadows or pills
- [x] Portrait shown small and soft-edged, with meaningful alt text
- [x] Playwright: sections present in order after the hero; every Employer and Assignment listed newest first; "New Global Function" absent; no horizontal overflow at phone width

## Answer

**Built.** About (three first-person sentences plus a small, grayscale, radially masked portrait via `astro:assets`, zoomed to the face) and Experience (four Employers, newest first; Assignments under the three consulting ones; Visiba Care as a single role). Experience text is the PDF wording plus one or two details per Assignment from the legacy site (Ambea: SQL Server metadata database; Bostadsförmedlingen: Inmon/Kimball, Power BI Report Server; Hedin Bil: DevOps alongside; Visiba: T-SQL/Tabular Editor, workshops; Volvo: legacy backend, sparse documentation).

**Reusable pieces for tickets 05/06/07:**
- `src/components/Section.astro`: `id` + `label`, renders `<section id aria-labelledby>` with an h2 letter-spaced uppercase label in one narrow column.
- `src/components/Entry.astro`: `dates?`, `title` (h3), `meta?` (grey line) and a slot. Dates hang in the left margin from 60rem up, inline above the entry below that. Education, Certifications and Outside work can use it directly.
- `src/data/cv.ts`: `about`, `employers` (`ConsultingEmployer | InHouseEmployer`, so an Employer has Assignments or a single role, never both) and `hasAssignments()`.
- `tests/sections.spec.ts`: append new section labels to `sectionsAfterHero`. The anchor id is the lowercased, hyphenated label, so "Outside work" must use id `outside-work`.

**Deviations / judgement calls**
- An Assignment's tech line is optional in the data module; Volvo Cars has none (no technologies worth listing).
- Hero is still a `<header>` with no id; I wrapped the new sections in `<main>` in `index.astro` (small merge surface with ticket 02). The margin index (07) will need an anchor for the hero.
- The branch was created from the legacy commit, so I fast-forwarded it to `redesign` before starting.
- Tests ran on PW_PORT=4351 because another worktree was already listening on 4341.

**Needs a human eye**
- Portrait: multiplied into the washi with lifted blacks and a tight elliptical mask, so it reads as a pale ink wash; judge whether the face is too faint.
- Date alignment against the serif Employer title in the left margin.
- The gap between the 100svh hero and About is just the hero's own height; tickets 02/03 will change it.
