# 03: Hero scroll choreography

**What to build:** Scrolling through the hero tells the dusk scene. The hero pins for ~1.5 viewport heights (~1 on mobile); the Ridges rise at different rates with the front Ridge washing over the intro; the Ensō and text soften; the sun sinks behind the Ridges; the birds flap (2–3 wing poses by scroll position) and fly off up-right; the front Ridge's base dissolves into the washi that becomes About's background. Everything is tied to scroll position and reverses on scroll-up. No animation or smooth-scroll library.

**Blocked by:** 02

**Status:** ready-for-agent

- [ ] Scroll progress through the pinned hero drives all layer movement; nothing moves while idle (except optional very slow mist drift)
- [ ] Back Ridges move slower than front; front Ridge covers the intro by the end of the pin
- [ ] Sun sinks behind the Ridges; birds flap and leave the viewport
- [ ] Seamless hand-off into About with no hard edge
- [ ] Shorter pin on mobile
- [ ] `prefers-reduced-motion`: no pinning, no movement, static hero from 02
- [ ] Playwright: mid-pin, Ridge/sun/bird layers measurably differ from top-of-page; they return when scrolled back; with reduced motion emulated, nothing changes on scroll
