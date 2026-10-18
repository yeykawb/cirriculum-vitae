# 08: Motifs and day arc

**What to build:** The four CC0 Cleveland Museum of Art works appear as faded Motifs: *Aged Pine* (1985.267) reaching into Experience, a spray of *Bamboo and Rocks in Clearing Skies* (1958.337) in Skills/Certifications, the geese from *Wild Geese Descending on a Sandbar* (1980.188.4) in Outside work, and *Moonlit Landscape* (2015.482.2) behind Closing. The washi tint cools by a few percent down the page (Day arc). No on-page credits.

**Blocked by:** 04, 05, 06

**Status:** resolved

- [x] Source images fetched from Cleveland open access, cropped once (mounts, borders, stray seals removed) and committed; accession numbers recorded in repo docs
- [x] Delivered through Astro's image pipeline at web sizes, lazy-loaded
- [x] Paper tone blended/knocked out so Motifs sit on the washi; never under body text
- [x] Shrunk or dropped on mobile where there's no margin room
- [x] Day arc tint shift visible top-to-bottom but background stays off-white
- [x] Playwright: Motif images hidden from accessibility tree; no broken images or failed requests after a full scroll; no horizontal overflow at phone width
- [x] Fallbacks if a crop doesn't work: 2015.482.1, Met 829401, Cleveland 1970.75

## Answer

Built a shared `Motif.astro` (four named Motifs, all placement in its styles) mounted inside Experience (Aged Pine), Skills (Bamboo, running down into Certifications), OutsideWork (geese) and Closing (Moonlit Landscape, with bottom room added to the Closing section). Art was cropped once with sharp: flat-field paper correction, edge feather, then exported as one ink tone with alpha = darkness (WebP, <= 1600px), so no blend mode is needed. Day arc: `--washi` held to 300svh, then a gradient to `--washi-cool` (#e9ebea) on the body; hero veil pixel-checked at 241,236,227 mid- and end-pin.

Deviations and notes:
- `mix-blend-mode: multiply` did not work: `<main>` is a stacking context (z-index 1, from the hero) and isolates the blend. Hence the alpha-ink assets.
- Pine shows only at >=80rem (left of the Entry dates), Bamboo only at >=64rem (left margin), both dropped below. Geese: left margin >=64rem, small top-right corner above the label on phones. Moon at every width.
- The left margin is used by all side Motifs; the right margin is too narrow next to the section index.
- `main { overflow-x: clip }` added to global.css.
- `tests/hero.spec.ts` "hero artwork loads" scoped to the hero (banner), since lazy Motifs below are not loaded at top.
- Moon seams (panel joins) were interpolated away; faint residue remains at low opacity.
- Needs a human eye: opacities (0.38-0.55 of ink alpha), Pine crop reads as needles and brush rather than a recognisable tree.
