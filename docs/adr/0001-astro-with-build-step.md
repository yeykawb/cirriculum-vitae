# Rebuild the site with Astro, accepting a build step

The original site was deliberately plain HTML/CSS/JS with no build step, no `package.json` and no bundler. For the 2026 calm, sumi-e style redesign we chose Astro (static output, deployed to GitHub Pages by a GitHub Actions workflow) instead of rewriting in vanilla HTML.

The scroll choreography does not need a framework; a vanilla rewrite would have worked. Astro won because the redesign leans on real artwork images (Astro's image pipeline resizes and compresses them) and structured CV content (experience, certifications) that is easier to maintain as data than as hand-written markup.

## Consequences

- The "no build steps / no package.json" rule in `CLAUDE.md` no longer holds and must be rewritten.
- Deploys need GitHub Actions; pushing raw files to `main` is no longer enough on its own.
- Local development needs a current Node LTS.
