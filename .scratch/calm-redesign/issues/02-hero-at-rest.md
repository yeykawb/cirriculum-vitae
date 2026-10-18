# 02: Hero at rest

**What to build:** The hero looks like the PDF resume's top half, without motion: the Ensō framing the name, the hand-built Ridges, vermilion sun and three birds at the bottom, the JA Hanko near the name, and a "Download PDF resume" link in the contact line. This static composition is also exactly what reduced-motion visitors see.

**Blocked by:** 01

**Status:** claimed

- [ ] Ensō extracted from the PDF's embedded raster layers and rendered around the name
- [ ] 3–4 Ridges, sun and three birds as separate SVG layers (so ticket 03 can move each independently); 2–3 Ridges on mobile
- [ ] Vermilion used only for sun and Hanko; Hanko reads "JA" in Latin initials
- [ ] "Download PDF resume" link in the hero resolves to the PDF under the base path
- [ ] All decorative art hidden from assistive tech
- [ ] Playwright: PDF link resolves; decorative layers not in the accessibility tree; no horizontal overflow at phone width
