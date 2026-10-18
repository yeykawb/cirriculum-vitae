import { test, expect, type Page } from '@playwright/test';

const site = 'https://yeykawb.github.io/cirriculum-vitae/';

const meta = (page: Page, attr: 'name' | 'property', key: string) =>
    page.locator(`head meta[${attr}="${key}"]`).getAttribute('content');

test.describe('link previews', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('./');
    });

    test('the page has a title and description that previews repeat', async ({ page }) => {
        const title = await page.title();
        expect(title).toContain('Jakob Agelin');
        const description = await meta(page, 'name', 'description');
        expect(description).toBeTruthy();
        expect(await meta(page, 'property', 'og:title')).toBe(title);
        expect(await meta(page, 'property', 'og:description')).toBe(description);
        expect(await meta(page, 'property', 'og:type')).toBe('website');
        expect(await meta(page, 'name', 'twitter:card')).toBe('summary_large_image');
        expect(await meta(page, 'name', 'twitter:title')).toBe(title);
        expect(await meta(page, 'name', 'twitter:description')).toBe(description);
    });

    test('the canonical, og:url and image URLs are absolute under the published base path', async ({
        page,
    }) => {
        expect(await page.locator('head link[rel="canonical"]').getAttribute('href')).toBe(site);
        expect(await meta(page, 'property', 'og:url')).toBe(site);
        for (const [attr, key] of [
            ['property', 'og:image'],
            ['name', 'twitter:image'],
        ] as const) {
            const image = await meta(page, attr, key);
            expect(image!.startsWith(site)).toBe(true);
            expect(image).toMatch(/\.png$/);
        }
        expect(await meta(page, 'property', 'og:image:width')).toBe('1200');
        expect(await meta(page, 'property', 'og:image:height')).toBe('630');
        expect(await meta(page, 'property', 'og:image:alt')).toBeTruthy();
    });

    test('the preview image is served as a 1200 by 630 PNG', async ({ page, request }) => {
        const image = (await meta(page, 'property', 'og:image'))!;
        // The published host is not served here; the same path is served by the preview.
        const res = await request.get(image.slice(site.length), { failOnStatusCode: false });
        expect(res.status()).toBe(200);
        expect(res.headers()['content-type']).toBe('image/png');
        const body = await res.body();
        expect(body.readUInt32BE(16)).toBe(1200);
        expect(body.readUInt32BE(20)).toBe(630);
    });

    test('the Hanko favicon is linked and loads', async ({ page, request }) => {
        const href = await page.locator('head link[rel="icon"]').getAttribute('href');
        expect(href).toBeTruthy();
        const res = await request.get(new URL(href!, page.url()).href);
        expect(res.status()).toBe(200);
        expect(res.headers()['content-type']).toContain('image/svg+xml');
    });
});

test('headings run h1, then an h2 per section, with no level skipped', async ({ page }) => {
    await page.goto('./');
    await expect(page.locator('h1')).toHaveCount(1);
    const levels = await page
        .locator('h1, h2, h3, h4, h5, h6')
        .evaluateAll((els) => els.map((el) => Number(el.tagName[1])));
    expect(levels[0]).toBe(1);
    levels.slice(1).forEach((level, i) => {
        expect(level, `heading ${i + 1}`).toBeLessThanOrEqual(levels[i] + 1);
    });
    const sections = await page.locator('main > section').count();
    await expect(page.locator('h2')).toHaveCount(sections);
});

test('every link can be reached by keyboard and shows a focus outline', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('./');
    // Reach About so the margin index is shown (and focusable) too.
    await page.locator('#about').scrollIntoViewIfNeeded();
    await expect(page.getByRole('navigation', { name: 'Sections' })).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 0));

    const total = await page.locator('a[href]').count();
    const seen = new Set<string>();
    for (let i = 0; i < total + 5; i++) {
        await page.keyboard.press('Tab');
        const focus = await page.evaluate(() => {
            const el = document.activeElement as HTMLElement;
            if (!el || el === document.body) return null;
            const style = getComputedStyle(el);
            return {
                tag: el.tagName,
                href: el.getAttribute('href') ?? '',
                outlined: style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0,
                shadowed: style.boxShadow !== 'none',
            };
        });
        if (!focus) continue;
        expect(focus.tag).toBe('A');
        expect(focus.outlined || focus.shadowed, `focus ring on ${focus.href}`).toBe(true);
        seen.add(focus.href);
    }
    // The hero's links, the section index, Contact and the project links are all reached.
    expect(seen.size).toBeGreaterThan(10);
    expect([...seen]).toContain('#about');
    expect([...seen]).toContain('#contact');
    expect(await page.locator('#contact a[href]').count()).toBeGreaterThan(0);
});

test.describe('without JavaScript', () => {
    test('every heading, certification and contact link is readable', async ({
        browser,
        baseURL,
    }) => {
        // What the page shows with scripts on.
        const withScripts = await browser.newPage();
        await withScripts.goto(baseURL!);
        const headings = await withScripts
            .locator('h1, h2, h3, h4')
            .evaluateAll((els) => els.map((el) => el.textContent!.trim()));
        const certs = await withScripts
            .locator('#certifications')
            .getByRole('listitem')
            .allInnerTexts();
        const links = await withScripts
            .locator('#contact address a')
            .evaluateAll((els) => els.map((el) => el.textContent!.trim()));
        const withScriptsText = await withScripts.getByRole('main').innerText();
        await withScripts.close();
        expect(headings.length).toBeGreaterThan(10);
        expect(certs.length).toBeGreaterThan(0);
        expect(links.length).toBeGreaterThan(3);

        const context = await browser.newContext({ javaScriptEnabled: false });
        const page = await context.newPage();
        await page.goto(baseURL!);
        for (const text of headings) {
            await expect(
                page.getByRole('heading', { name: text, exact: true }).first(),
            ).toBeVisible();
        }
        // Every paragraph and list item in every section, not just the headings.
        const main = page.getByRole('main');
        await expect(main).toHaveText(withScriptsText, { useInnerText: true });
        for (const block of await main.locator('p, li').all()) {
            await expect(block).toBeVisible();
        }
        const certItems = page.locator('#certifications').getByRole('listitem');
        await expect(certItems).toHaveText(certs, { useInnerText: true });
        for (const item of await certItems.all()) {
            await expect(item).toBeVisible();
        }
        for (const text of links) {
            await expect(
                page.locator('#contact').getByRole('link', { name: text, exact: true }),
            ).toBeVisible();
        }
        await context.close();
    });
});
