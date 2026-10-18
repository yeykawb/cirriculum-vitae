# 02: Hero at rest

**What to build:** The hero looks like the PDF resume's top half, without motion: the Ensō framing the name, the hand-built Ridges, vermilion sun and three birds at the bottom, the JA Hanko near the name, and a "Download PDF resume" link in the contact line. This static composition is also exactly what reduced-motion visitors see.

**Blocked by:** 01

**Status:** resolved

- [x] Ensō extracted from the PDF's embedded raster layers and rendered around the name
- [x] 3–4 Ridges, sun and three birds as separate SVG layers (so ticket 03 can move each independently); 2–3 Ridges on mobile
- [x] Vermilion used only for sun and Hanko; Hanko reads "JA" in Latin initials
- [x] "Download PDF resume" link in the hero resolves to the PDF under the base path
- [x] All decorative art hidden from assistive tech
- [x] Playwright: PDF link resolves; decorative layers not in the accessibility tree; no horizontal overflow at phone width

## Answer

**Built**
- Ensō: extracted from the PDF (object 10 with its /SMask 11, 2006×2006, FlateDecode) with a throwaway Python script and encoded with sharp from /tmp. Committed as `src/assets/enso.png` (RGBA ink, 354 kB, transparent where the PDF was paper) and rendered through `astro:assets` as webp at 640–1600 px widths. The PDF holds only one 2006×2006 image (the Ensō), not two. The PDF's ridges, sun and birds are full-page raster layers (objects 6 and 8); I used them only as a visual reference and drew the SVG by hand.
- `src/components/HeroArt.astro`: one `<svg>` per layer, all in the Ensō image's 1000×1000 coordinate space: `data-hero-layer="ridge-1"` to `"ridge-4"`, `"sun"`, `"birds"`. Stacking by z-index (ridge-1, sun, ridge-2, ridge-3, ridge-4, birds), so the sun sits partly behind ridge-2. Ridges are misty grey gradient washes (back fainter), soft-topped (small blur) and faded at the ends by a mask. Four Ridges on desktop; ridge-1 is hidden on phones, leaving three. Each bird is a `<g data-bird>` holding `<path data-pose="rest">`; later tickets add `up`/`down` pose paths beside it. Nothing moves.
- Hanko: `src/assets/hanko.svg`, a self-contained 32×32 SVG (vermilion square, "JA" drawn as stroked paths, so no font dependency). Ticket 09 can use it as the favicon file directly. Shown as an `<img alt="">` beside the name.
- "Download PDF resume" is a third line in the contact block. Label and file name live in `cv.resume`; `resumeLink(cv.resume, import.meta.env.BASE_URL)` in `cv.ts` builds the href (ticket 06 can reuse it for the closing section).
- Hero text is sized in container units (`cqi`) of the Ensō stage, so the composition keeps the PDF's proportions.
- Tests added to `tests/hero.spec.ts`: PDF link resolves (200, PDF) under the base path; all images load; no `img` role in the accessibility tree; phone width has no horizontal overflow and hero text stays on screen.

**Deviations**
- On phones the Ensō stays square but the stage is 140vw wide, centred, so the left and right strokes bleed off-screen and the hero clips them (no horizontal overflow). The inner circle is then large enough for the summary and contact lines. Phone-only tweaks: slightly smaller summary, tighter spacing, text block raised, art layer box nudged down 1.5%. Checked at 390x844 and 360x740. An earlier 4:5 stretched Ensō was dropped because it turned the brush into an oval.
- The hero is exactly `100svh` tall (not `min-height`), with the stage clipped by `overflow: clip`. Ticket 03 owns pinning.

**For other tickets**
- Ticket 03: ridge-4 is the frontmost layer but is very pale and low. The "front Ridge washes over the intro" effect will probably need it scaled or extended (or a stronger fill) as it rises; the soft-edge mask is per layer in `HeroArt.astro`.
- Ticket 09: the Hanko is `src/assets/hanko.svg`; its colours are literal (`#d9643f`, `#f1ece3`) so it works standalone.

**Needs a human eye**
- Sun and Ridges are my own paths matched to the PDF's layout, not traced; compare the Ridge silhouettes and the sun's size to the PDF.
- How much of the left and right strokes bleed off-screen on phones.
- Hanko size (about 24 px on desktop, 18 px on phone) and the "JA" letter drawing.
- Screenshots: `/tmp/hero-desktop-final.png` (1440×900), `/tmp/hero-phone-final.png` (390×844).
