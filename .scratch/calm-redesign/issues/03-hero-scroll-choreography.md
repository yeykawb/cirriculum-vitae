# 03: Hero scroll choreography

**What to build:** Scrolling through the hero tells the dusk scene. The hero pins for ~1.5 viewport heights (~1 on mobile); the Ridges rise at different rates with the front Ridge washing over the intro; the Ensō and text soften; the sun sinks behind the Ridges; the birds flap (2–3 wing poses by scroll position) and fly off up-right; the front Ridge's base dissolves into the washi that becomes About's background. Everything is tied to scroll position and reverses on scroll-up. No animation or smooth-scroll library.

**Blocked by:** 02

**Status:** resolved

- [x] Scroll progress through the pinned hero drives all layer movement; nothing moves while idle (except optional very slow mist drift)
- [x] Back Ridges move slower than front; front Ridge covers the intro by the end of the pin
- [x] Sun sinks behind the Ridges; birds flap and leave the viewport
- [x] Seamless hand-off into About with no hard edge
- [x] Shorter pin on mobile
- [x] `prefers-reduced-motion`: no pinning, no movement, static hero from 02
- [x] Playwright: mid-pin, Ridge/sun/bird layers measurably differ from top-of-page; they return when scrolled back; with reduced motion emulated, nothing changes on scroll

## Answer

**Built**
- `Hero.astro`: `header.hero` is now a tall wrapper (250svh desktop, 200svh phone) holding a `position: sticky` one-screen `.hero-pin` (pin of 1.5 / 1 viewport heights). A small inline script maps scroll through the wrapper to `--hero-progress` (0-1) on the hero, in `requestAnimationFrame`, on scroll and resize only. It also sets `data-flap` (0-3, step 0.07 of progress) for the wing poses. It adds `html.hero-motion`; all tall/pinned CSS hangs on that class, so no-JS and `prefers-reduced-motion: reduce` get the static ticket 02 hero (one 100svh screen, no script work).
- All movement is CSS `transform`/`opacity` via `calc()` on the progress. Travel as a share of the stage height: ridge-1 12%, ridge-2 30%, ridge-3 55%, ridge-4 110%, veil 210% (250% phone); tunable custom properties at the top of the choreography block.
- Front Ridge (ridge-4): drawn stronger (0.7) and wider, held pale at rest (layer opacity 0.4 at progress 0, to 1 by progress 0.3) so the rest composition still matches the PDF. A `.hero-veil` (plain `var(--washi)`, soft misty top edge, starts below the viewport) rises faster behind it and fills the screen by progress ~0.8-0.9. Its colour is the body background (pixel-checked: 241,236,227), so About sits on it with no edge.
- Hand-off: `main` after the hero gets `margin-top: -50svh` (-40svh phone) and `z-index: 1`, so About enters over the pin's last stretch instead of after an empty screen. It uses `.hero ~ main` (the inline script sits between them), so `index.astro` is untouched.
- Sun: now a `div[data-hero-layer=sun]` wrapper with a soft bottom mask that moves with ridge-2 (the horizon), and an inner svg disc that sinks 10% relative to it, so it goes behind the mountain instead of fading. At rest the mask softens a 1-2 unit sliver of the disc's bottom.
- Birds: `up` and `down` poses added beside `rest` (rest, up, rest, down by progress); the layer flies up and right and is out of the viewport by progress 1. The Ensō fades to 45% and the intro to 50% by the end.
- z-order: intro text moved from z-index 7 to 4 (above ridge-3, below ridge-4 and the veil) so the front Ridge covers it.
- Tests in `tests/hero.spec.ts`: ridge rise order, sun sinking, intro softening and the top of the screen going flat paper, birds flapping and leaving (desktop and phone), reverse on scroll back, About following directly, name pinned, reduced motion (one screen, nothing moves, scrolls away), phone pin shorter, no sideways overflow mid-pin.

**Deviations / notes**
- No mist drift (deliberate).
- With the script on, the contact links stay in the DOM and tab-focusable after the veil covers them. Harmless; could add `visibility: hidden` at the end of the pin.
- About keeps its own top padding, so some blank washi (about half a screen on desktop) sits above its label at the end of the pin. Tune `margin-top` on `.hero ~ main` to tighten.

**Needs a human eye**
- Ridge-4's blue-grey crest sliding across the summary text at about a third of the pin (the busiest moment).
- Veil speed and the length of blank paper before About.
- Screenshots: `/tmp/cv-shots/w3-03-{desktop,phone}-{0-top,1-third,1b-half,2-twothirds,3-end,4-after}.png`.

**Review follow-up**
- The `.hero-veil` is now the body of the front Ridge: it moves with ridge-4 (same travel) and turns from clear to opaque washi over about 9% of the stage under the crest, so the crest drags a sheet of paper up and puts away everything below it, bottom-up. It fades in over the first ~12% of progress so the rest composition is unchanged. ridge-4 now sits above the veil (z 6; birds 7) so the grey crest wash stays visible on the paper. Front Ridge travel is 100% of the stage on desktop and 125% on phones, enough to leave plain washi at the end of the pin.
- Hand-off: `.hero ~ main` margin-top is `-79svh` on both sizes. At the end of the pin the About label sits at about 29% of the viewport height (261 of 900; 249 of 844). About's top stays below the opaque part of the veil throughout.
- Tests: About label lands at 20-40% of the viewport; the name's area is flat paper at the end of the pin.
- Screenshots: `/tmp/cv-shots/w3-03b-{desktop,phone}-{p0,p33,p50,p66,p100,after}.png`.
