// @ts-check
import { defineConfig } from 'astro/config';

// Published at https://yeykawb.github.io/cirriculum-vitae/ — the base path
// keeps existing links working.
export default defineConfig({
    site: 'https://yeykawb.github.io',
    base: '/cirriculum-vitae',
    devToolbar: { enabled: false },
});
