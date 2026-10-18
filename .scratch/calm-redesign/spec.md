Status: ready-for-agent

# Calm redesign: the CV site as a scrollable sumi-e scroll

## Problem Statement

Jakob's CV site has become "too much": a Three.js particle network, a typed-text hero, a dark/light toggle, tag pills, a radar of technologies, hand-drawn architecture diagrams, a scroll-progress bar, a back-to-top button and a contact form that doesn't send anything. It no longer reflects how he wants to come across. Meanwhile his new PDF resume has a calm Japanese-minimalist look: an ink ensō circle framing his name, misty mountain ridges, three birds and a vermilion sun on washi paper. The website and the resume now feel like they belong to two different people, and the site's content has drifted from the resume (title, summary, wording, which certifications and roles are shown).

## Solution

Rebuild the site from scratch so it reads like the PDF resume unrolled into a vertical scroll. Calmness is the guiding principle: washi off-white, ink black and greys, watercolour tones, and vermilion used only for the sun and a small hanko.

The hero opens on the PDF's composition. As the visitor scrolls, the hero stays pinned while the ridges rise at different speeds, the frontmost ridge washes over the intro, the sun sinks behind the mountains and the birds flap and fly away. The front ridge's base fades into plain washi, which becomes the next section's background.

Further down, faded fragments of real public-domain Japanese ink paintings appear as quiet motifs. The paper tint cools very slightly down the page, and the page ends under a moonlit landscape, so a single day passes from top to bottom (the day arc).

The site is rebuilt in Astro and published to the same GitHub Pages URL through a GitHub Actions workflow (ADR-0001). All CV facts live in one typed data source that the page renders from.

## User Stories

### First impression and hero

1. As a recruiter opening the link, I want the first screen to look like Jakob's PDF resume, so that the site and the resume feel like one coherent identity.
2. As a visitor, I want to see Jakob's name inside a brush-stroke ensō, so that I immediately get the calm, deliberate tone.
3. As a recruiter, I want the title *Data Platform Engineer* directly under the name, so that I know his role without scrolling.
4. As a recruiter, I want a short summary paragraph (eight years of consulting across Scandinavia, owning Azure and Databricks platforms end to end) in the hero, so that I get his positioning in one read.
5. As a recruiter, I want email, phone, LinkedIn and GitHub in a quiet line under the summary, so that I can reach him without hunting.
6. As a recruiter, I want a "Download PDF resume" link in the hero, so that I can save the print version for my records or ATS.
7. As a visitor, I want misty ink ridges, three birds and a vermilion sun at the bottom of the hero, mirroring the PDF, so that the art feels intentional rather than decorative noise.
8. As a visitor scrolling down, I want the hero to stay pinned briefly while the ridges rise at different speeds, so that the transition feels like mountains drifting up through mist.
9. As a visitor scrolling down, I want the frontmost ridge to rise past and gently cover the intro text, so that the intro is put away rather than cut off.
10. As a visitor scrolling down, I want the sun to sink behind the ridges, so that the hero quietly reads as dusk.
11. As a visitor scrolling down, I want the birds to flap their wings and fly off up and to the right, so that the scene feels alive in a restrained way.
12. As a visitor, I want the ensō and hero text to fade slightly as the ridges cover them, so that the hand-off feels soft.
13. As a visitor, I want the front ridge's base to dissolve into plain paper that becomes the About section's background, so that there is no hard edge between hero and content.
14. As a visitor scrolling back up, I want the choreography to reverse smoothly, so that the effect is tied to my scroll position rather than a one-off animation.
15. As a visitor, I want nothing to move while I'm not scrolling, apart from at most a very slow mist drift, so that the page stays calm when I'm reading.

### Day arc and motifs

16. As a visitor, I want the paper tone to cool by only a few percent down the page, so that a day passing is felt rather than noticed.
17. As a visitor reaching Experience, I want the upper branches of Nakayama Kōyō's *Aged Pine* reaching in faintly from the margin, so that the long career section has a quiet anchor.
18. As a visitor reaching Skills and Certifications, I want a faint spray of Ike Taiga's *Bamboo and Rocks in Clearing Skies* in a corner, so that the section feels grounded and growing.
19. As a visitor reaching Outside work, I want the line of geese from Tani Bunchō's *Wild Geese Descending on a Sandbar*, so that the birds that left in the hero seem to return.
20. As a visitor reaching the closing section, I want the *Moonlit Landscape* screen behind it, so that the page ends at night and the day arc closes.
21. As a visitor, I want the motifs faded and blended into the washi (their own paper tone dropped out), so that they read as part of the page rather than pasted-on images.
22. As a visitor, I want the motifs to never overlap or compete with text, so that readability always wins over decoration.

### About

23. As a recruiter, I want an About section of 2–3 short first-person sentences, so that I get who Jakob is in seconds.
24. As a hiring manager, I want About to convey that he learns in conversation, cares about work being understood and is curious about where the field is going (e.g. DuckDB and single-machine compute), so that I get a sense of him as a colleague.
25. ~~As a recruiter, I want Jakob's black-and-white portrait shown small and soft-edged, blended into the paper, so that I can put a face to the name without a hard framed photo breaking the mood.~~ Dropped 2026-10-18: Jakob found the portrait didn't fit the page.

### Experience

26. As a recruiter, I want experience grouped by Employer and period (Consid 2023–present, Capgemini 2022–2023, Visiba Care 2021–2022, Capgemini 2018–2021), newest first, so that I can follow his career.
27. As a recruiter, I want each Employer's Assignments (Ambea, Bostadsförmedlingen i Stockholm, Hedin Bil, Volvo Cars) listed under it, so that I see which clients he delivered for.
28. As a recruiter, I want Visiba Care shown as a role (Data Platform Owner, one-person data team) rather than an Assignment, so that it's clear this was an in-house job.
29. As a hiring manager, I want each Assignment described in the PDF's tight wording, plus one or two concrete details from the old site (e.g. Ambea's SQL Server metadata database for data quality; Inmon/Kimball and DAX at Bostadsförmedlingen), so that I get technical depth without wading through paragraphs.
30. As a hiring manager, I want one quiet grey line of technologies under each Assignment instead of pill tags, so that I can scan the stack without visual clutter.
31. As a recruiter on desktop, I want dates in a small grey left margin beside each entry, so that the timeline is scannable like a scroll.
32. As a recruiter on mobile, I want dates inline above each entry, so that the layout still works in a narrow column.
33. As a recruiter, I want only the "Configure Your Volvo" tech-lead work under Capgemini 2018–2021, so that the history stays focused.

### Skills, Certifications, Education

34. As a hiring manager, I want skills in the PDF's four groups (Platform, Delivery, Data, Practice), so that I see breadth organised by how he works.
35. As a recruiter, I want all seven certifications listed, so that nothing earned is hidden.
36. As a recruiter, I want certifications in two groups, Data & Engineering (dbt Developer, Databricks Data Engineer Associate, Spark 3.0 Associate Developer, Azure Data Engineer Associate) first and Process & Methodology (SAFe 5 Agilist, CPRE Foundation Level, Professional Scrum Master I) second, each with issuer and date, so that the most relevant come first.
37. As a recruiter, I want Education to show Göteborgs Universitet, BSc Systems Science (IT, Human and Organisation), 2015–2018, so that his academic background is clear.

### Outside work

38. As a hiring manager, I want a single Outside work section combining interests and portfolio projects, so that the human side and side projects read as one story.
39. As a visitor, I want ice cream science and sourdough baking described in one sentence each, so that the interests feel genuine without becoming lists.
40. As a hiring manager, I want the Ice Cream Analytics project (DuckDB, dbt, medallion architecture applied to home cooking) with GitHub and Explore links, so that I can see him apply his craft to a hobby.
41. As a hiring manager, I want the dbt + PostgreSQL data platform project with its GitHub link, so that I can review a containerised end-to-end example.

### Closing and contact

42. As a recruiter who's decided to reach out, I want a calm closing section with plain links to email, phone, LinkedIn and GitHub, so that contacting him is one click.
43. As a recruiter, I want the "Download PDF resume" link repeated in the closing section, so that I don't have to scroll back up for it.
44. As a visitor, I want no contact form, so that I'm never misled into submitting something that goes nowhere.

### Navigation

45. As a desktop visitor, I want a tiny fixed list of section names in the right margin, with the current section in ink and others in grey, so that I can orient myself and jump to a section.
46. As a mobile visitor, I want no navigation chrome at all, so that the narrow screen is entirely content.
47. As a visitor, I want no top nav bar, scroll-progress bar or back-to-top button, so that nothing competes with the scroll.
48. As a visitor, I want the small vermilion JA hanko near the name, so that the page carries a personal signature mark.

### Mobile

49. As a mobile visitor, I want the same hero choreography with a shorter pinned stretch (about one screen height instead of about one and a half) and fewer ridges, so that it stays smooth and doesn't feel like scroll-jacking.
50. As a mobile visitor, I want motifs shrunk or dropped where there's no margin room, so that text never sits on top of artwork.
51. As a mobile visitor, I want no horizontal overflow anywhere, so that the page never wobbles sideways.

### Accessibility and robustness

52. As a visitor with `prefers-reduced-motion`, I want a fully static page (hero composition visible, no pinning, no movement), so that I'm not made uncomfortable.
53. As a screen-reader user, I want decorative art (ensō, ridges, birds, sun, motifs, hanko) hidden from assistive tech, and the content in a logical heading order, so that I hear the CV, not the decoration.
54. As a keyboard user, I want all links and the margin index reachable and visibly focused, so that I can navigate without a mouse.
55. As a visitor on a slow connection, I want artwork images resized and compressed and loaded lazily below the hero, so that the first screen appears quickly.
56. As a visitor, I want text to meet contrast guidelines despite the soft palette, so that it stays readable.
57. As a visitor with JavaScript disabled, I want the full CV content readable in its final resting layout, so that the CV doesn't depend on the animation.

### Sharing and identity

58. As someone sharing the link on LinkedIn or Slack, I want a preview image showing the hero composition, plus a proper title and description, so that the link looks as considered as the site.
59. As a visitor with many tabs open, I want the JA hanko as the favicon, so that I can find the tab.

### Owner and maintainer

60. As Jakob, I want every CV fact (title, summary, Employers, Assignments, skills, certifications, education, Outside work, contact) in one typed data source, so that updating the CV means editing data, not markup.
61. As Jakob, I want the site to deploy automatically when I push to `main`, so that publishing stays as easy as before.
62. As Jakob, I want the site to keep its current URL, so that existing links on LinkedIn and in applications keep working.
63. As Jakob, I want the redesign built on a separate branch with the live site untouched until I merge, so that there's no broken interim state online.
64. As Jakob, I want no analytics or cookies, so that the site stays simple and needs no consent banner.
65. As Jakob, I want no on-page artwork credits, so that the page stays uncluttered (the works are CC0).
66. As Jakob, I want project docs (`CLAUDE.md`, `README.md`) rewritten to describe the new stack and conventions, so that future sessions don't follow the old no-build rules.
67. As an agent or contributor, I want the visual vocabulary (Ensō, Ridge, Motif, Day arc, Hanko, Washi, Employer, Assignment) used consistently in code and docs, so that discussions map directly onto the codebase.

## Implementation Decisions

- **Stack:** Astro with static output, no UI framework, TypeScript with Astro's default strict settings, npm as the package manager. The old "no build step" rule is superseded by ADR-0001. Local development needs Node 24 LTS; the machine currently has Node 12, so the first step is installing nvm and Node 24.
- **Legacy removal:** the old vanilla site (single HTML file, its stylesheet, `main.js`, `theme.js`, `hero3d.js`, `arch-renderer.js`), Three.js, Rough.js, the Virgil font and Font Awesome are all removed. Commit `dbdc7b3` is the last legacy version. The PDF resume moves into the Astro project.
- **Deploy:** a GitHub Actions workflow using the official Astro action publishes to GitHub Pages. The site base path stays `/cirriculum-vitae` so the URL `https://yeykawb.github.io/cirriculum-vitae/` is unchanged. Jakob switches the Pages source to "GitHub Actions" only at merge time; doing it earlier would take the live site down.
- **Branch:** all work happens on a `redesign` branch; `main` stays live and untouched until merge.
- **CV data module:** one typed module is the single source of truth for every CV fact. Rough shape: title; summary; contact (email `yeykawb@proton.me`, phone `+46 73 232 73 73`, LinkedIn, GitHub, location Mölnlycke); about (2–3 sentences); Employers in reverse chronological order, each with a name, period and either a list of Assignments (client, short description, one-line tech list) or a single role description; skill groups (Platform, Delivery, Data, Practice), each a list; certification groups (Data & Engineering, Process & Methodology), each certification with name, issuer and month/year; education; Outside work (interests with a sentence each, and portfolio projects with description and links). Components never hard-code CV text.
- **Content sources:** the PDF resume's wording is the base for title, summary, Experience and Skills. The old site supplies the extra certifications, dates, portfolio projects, interests and selected Assignment details. Dropped content: "On the Radar" (parked; see memory), architecture diagrams, Volvo "New Global Function", the contact form, typed-text roles, and the long four-paragraph About.
- **Page composition:** one page with these sections in order: Hero, About, Experience, Skills, Certifications, Education, Outside work, Closing. One narrow centred column with dates in the left margin on desktop and inline on mobile. No cards, shadows or pills.
- **Hero art:**
  - The ensō is extracted from the PDF's embedded raster layers; it was printed from Chromium and contains 300 dpi full-page layers plus two 2006×2006 images.
  - Ridges, the sun and the birds are hand-built SVG so each can move independently.
  - Birds have two or three wing poses selected by scroll position.
  - Desktop has 3–4 Ridges; mobile has 2–3.
- **Scroll choreography:**
  - A small vanilla script maps scroll position within the pinned hero to a progress value (0–1) exposed as a CSS custom property, updated in `requestAnimationFrame`. CSS turns that progress into per-layer transforms and opacity.
  - Approximate pinned length: about 1.5 viewport heights on desktop, about 1 on mobile.
  - No animation library, and no smooth-scroll or scroll-hijacking library.
  - Under `prefers-reduced-motion` the script does nothing and the hero renders statically with no pinning.
- **Day arc:** the washi background tint shifts by a few percent from warm at the top to slightly cooler at the bottom, driven by section position, not time. It stays off-white throughout.
- **Motifs:** four CC0 works from the Cleveland Museum of Art Open Access collection:
  - *Aged Pine*, Nakayama Kōyō, 1985.267, for Experience;
  - *Bamboo and Rocks in Clearing Skies*, Ike Taiga, 1958.337, shared by Skills and Certifications;
  - *Wild Geese Descending on a Sandbar*, Tani Bunchō, 1980.188.4, for Outside work;
  - *Moonlit Landscape*, 2015.482.2, for Closing.

  Each is cropped once at authoring time (mounts, borders and stray seals removed) and committed to the repo, then delivered through Astro's image pipeline at web sizes. Motifs are blended with a multiply-style blend or prepared with the paper tone knocked out so they sit on the washi. They are decorative (empty alt text, hidden from assistive tech) and lazy-loaded. They sit in margins and corners, never under body text, and are shrunk or dropped on mobile.
- **No credits:** no on-page artwork credit line, by explicit decision; the works are CC0. Provenance (museum accession numbers) is recorded in the repo docs, not on the page.
- **Palette and type:** washi off-white, ink black and greys, watercolour tones, with vermilion reserved for the sun and the hanko. One serif (for the name and headings) and one sans (for body), both from Google Fonts and close to the PDF's pairing. No dark mode, no toggle and no `prefers-color-scheme` variant.
- **Hanko:** a small vermilion square seal reading "JA" in Latin initials (no Japanese script), placed near the name. It is reused as the favicon.
- **Navigation:** on desktop, a fixed section index in the right margin with the current section highlighted (via IntersectionObserver). It is hidden on mobile. There is no top bar, progress bar or back-to-top button.
- **Metadata:** page title and description, plus an Open Graph and Twitter card using a static image of the hero composition.
- **Language:** English only, with no Japanese text on the page.
- **Privacy:** no analytics, no cookies, no third-party scripts other than Google Fonts.
- **Docs:**
  - `CLAUDE.md` is rewritten for the new stack and conventions; the "no build steps" and "Font Awesome / Three.js only" rules are replaced, and the Agent skills section is kept.
  - `README.md` gets local dev and deploy instructions.
  - `GLOSSARY.md` and ADR-0001 already exist; use their vocabulary.

## Testing Decisions

- **One seam: the built site in a real browser.** Playwright tests run against the production build served locally. They assert only what a visitor can see or do, never component internals, CSS class names or the shape of the CV data module. A good test here reads like a recruiter or visitor checking the page: "the title says Data Platform Engineer", "all seven certifications are listed under the right group", "after scrolling through the hero, the ridges have moved and the sun is lower".
- **What gets tested:**
  - All sections present and in order (Hero, About, Experience, Skills, Certifications, Education, Outside work, Closing).
  - Title and summary match the PDF positioning.
  - Every Employer and Assignment is present, in reverse chronological order. Volvo "New Global Function" is absent.
  - All seven certifications appear, split into Data & Engineering then Process & Methodology.
  - Outside work shows both interests and both portfolio projects with working links.
  - The PDF download link appears in hero and closing and resolves to the PDF. Mailto, phone, LinkedIn and GitHub links are correct.
  - Hero choreography: after scrolling partway through the pinned hero, the ridge, sun and bird layers have measurably changed position or opacity compared with the top. After scrolling back, they return.
  - With reduced motion emulated, scrolling through the hero changes nothing and there is no pinning.
  - On desktop the margin index is visible, its links scroll to the right sections and the current section is highlighted. At phone width the index is hidden.
  - At phone width there is no horizontal overflow.
  - No console errors, no failed network requests and no broken images on load and full scroll.
  - Decorative images are hidden from the accessibility tree, and the heading structure is logical.
  - With JavaScript disabled, all CV content is visible.
- **Not tested:** visual look (colours, exact positions, artwork crops) beyond the movement checks above; that is judged by eye. There are no unit tests. Type-checking with Astro's checker covers the CV data module's shape.
- **Prior art:** none; the repo has no tests today. This spec introduces Playwright as a dev dependency. Tests run locally and in the deploy workflow before publishing.

## Out of Scope

- The "On the Radar" technology list (parked for possible later return).
- Per-Assignment architecture diagrams.
- A working contact form or any backend.
- Dark mode or theme switching.
- Multiple languages (Swedish or Japanese).
- A blog, multiple pages or CMS.
- Analytics, cookies, consent banners.
- On-page artwork credits.
- Redesigning the PDF resume itself.
- A custom domain.

## Further Notes

- Artwork provenance (all Cleveland Museum of Art Open Access, CC0, verified via museum API and object pages): 1985.267, 1958.337, 1980.188.4, 2015.482.2. High-resolution source images exist at Cleveland's open-access CDN (`_print.jpg` at ~3400px, plus `_full.tif`). Fallback candidates if a crop doesn't work: the left *Moonlit Landscape* screen (2015.482.1), Soga Shōhaku's *Cranes* (Met 829401), *Plum Blossoms* (Cleveland 1970.75).
- The PDF is a Chromium print, so its typography and layout were originally HTML/CSS; matching its proportions closely on the web is realistic.
- Contact details on the site match the PDF (proton.me address and mobile number) and are already public on the current site.
- Merge checklist for Jakob: switch GitHub Pages source to "GitHub Actions", then merge `redesign` into `main`.
- Calmness is the acceptance criterion behind every judgement call: when in doubt, remove rather than add.
