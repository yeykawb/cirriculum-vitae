import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('./');
});

test('the hero names Jakob and his Title', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Jakob Agelin');
    await expect(page.getByText('Data Platform Engineer', { exact: true })).toBeVisible();
});

test('the hero summary carries the PDF positioning', async ({ page }) => {
    const summary = page.getByText(/eight years of consulting across Scandinavia/);
    await expect(summary).toBeVisible();
    await expect(summary).toContainText('Azure and Databricks platforms end to end');
});

test('the hero contact line links to email, phone, LinkedIn and GitHub', async ({ page }) => {
    const hero = page.getByRole('banner');
    await expect(hero.getByRole('link', { name: 'yeykawb@proton.me' })).toHaveAttribute(
        'href',
        'mailto:yeykawb@proton.me',
    );
    await expect(hero.getByRole('link', { name: '+46 73 232 73 73' })).toHaveAttribute(
        'href',
        'tel:+46732327373',
    );
    await expect(hero.getByRole('link', { name: 'linkedin.com/in/jakobagelin' })).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/jakobagelin/',
    );
    await expect(hero.getByRole('link', { name: 'github.com/yeykawb' })).toHaveAttribute(
        'href',
        'https://github.com/yeykawb',
    );
});

test('the hero offers the PDF resume and the link resolves under the base path', async ({
    page,
    request,
}) => {
    const link = page.getByRole('banner').getByRole('link', { name: 'Download PDF resume' });
    await expect(link).toBeVisible();

    const href = (await link.getAttribute('href')) ?? '';
    expect(href).toContain('/cirriculum-vitae/');

    const response = await request.get(new URL(href, page.url()).toString());
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('pdf');
});

test('the hero artwork loads', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    const images = await page.locator('img').evaluateAll((imgs) =>
        (imgs as HTMLImageElement[]).map((img) => ({ src: img.src, loaded: img.naturalWidth > 0 })),
    );
    expect(images.length).toBeGreaterThan(0);
    expect(images.filter((img) => !img.loaded)).toEqual([]);
});

test('the decorative art is hidden from assistive tech', async ({ page }) => {
    // The Ensō, Ridges, sun, birds and Hanko are decoration: a screen-reader
    // user hears the CV, not the pictures.
    await expect(page.getByRole('img')).toHaveCount(0);

    const tree = await page.locator('body').ariaSnapshot();
    expect(tree).not.toMatch(/\bimg\b/);
    expect(tree).toContain('heading "Jakob Agelin" [level=1]');
});

test.describe('on a phone', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('the page does not scroll sideways', async ({ page }) => {
        await page.goto('./', { waitUntil: 'networkidle' });
        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
        }));
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });

    test('the name, summary and contact line stay inside the screen', async ({ page }) => {
        await page.goto('./', { waitUntil: 'networkidle' });
        const hero = page.getByRole('banner');
        const targets = [
            hero.getByRole('heading', { level: 1 }),
            hero.getByText(/eight years of consulting/),
            hero.getByRole('link', { name: 'linkedin.com/in/jakobagelin' }),
            hero.getByRole('link', { name: 'github.com/yeykawb' }),
            hero.getByRole('link', { name: 'Download PDF resume' }),
        ];
        for (const target of targets) {
            const box = await target.boundingBox();
            expect(box).not.toBeNull();
            expect(box!.x).toBeGreaterThanOrEqual(0);
            expect(box!.x + box!.width).toBeLessThanOrEqual(390);
        }
    });
});
