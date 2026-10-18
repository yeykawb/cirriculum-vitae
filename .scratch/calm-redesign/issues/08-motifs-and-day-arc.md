# 08: Motifs and day arc

**What to build:** The four CC0 Cleveland Museum of Art works appear as faded Motifs: *Aged Pine* (1985.267) reaching into Experience, a spray of *Bamboo and Rocks in Clearing Skies* (1958.337) in Skills/Certifications, the geese from *Wild Geese Descending on a Sandbar* (1980.188.4) in Outside work, and *Moonlit Landscape* (2015.482.2) behind Closing. The washi tint cools by a few percent down the page (Day arc). No on-page credits.

**Blocked by:** 04, 05, 06

**Status:** claimed

- [ ] Source images fetched from Cleveland open access, cropped once (mounts, borders, stray seals removed) and committed; accession numbers recorded in repo docs
- [ ] Delivered through Astro's image pipeline at web sizes, lazy-loaded
- [ ] Paper tone blended/knocked out so Motifs sit on the washi; never under body text
- [ ] Shrunk or dropped on mobile where there's no margin room
- [ ] Day arc tint shift visible top-to-bottom but background stays off-white
- [ ] Playwright: Motif images hidden from accessibility tree; no broken images or failed requests after a full scroll; no horizontal overflow at phone width
- [ ] Fallbacks if a crop doesn't work: 2015.482.1, Met 829401, Cleveland 1970.75
