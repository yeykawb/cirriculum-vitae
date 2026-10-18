# 09: Share-ready polish and handover

**What to build:** The site is ready to share and hand over: proper title/description and an Open Graph/Twitter preview image of the hero composition, the JA Hanko as favicon, an accessibility and no-JS pass, a rewritten README, and a merge checklist for Jakob.

**Blocked by:** 03, 07, 08

**Status:** ready-for-agent

- [ ] Title, meta description, OG/Twitter card with static hero image (absolute URLs under the base path)
- [ ] Hanko favicon
- [ ] Logical heading order; contrast meets guidelines; all interactive elements keyboard-reachable with visible focus
- [ ] With JavaScript disabled, all CV content readable in final resting layout
- [ ] No analytics, cookies or third-party scripts beyond Google Fonts
- [ ] README: local dev, test and deploy instructions — done by the `docs-writer` agent after the code lands, not by the implementer
- [ ] Playwright: meta tags present; full content visible with JS disabled; heading structure valid; zero console errors over a full scroll
- [ ] Merge checklist delivered to Jakob: switch Pages source to "GitHub Actions", then merge `redesign` into `main`
