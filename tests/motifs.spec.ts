import { test, expect, type Page } from '@playwright/test';

async function scrollThrough(page: Page) {
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 400) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.waitForTimeout(40);
    }
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForLoadState('networkidle');
}

test('Motif images are hidden from assistive technology', async ({ page }) => {
    await page.goto('./', { waitUntil: 'networkidle' });
    await scrollThrough(page);
    // Decorative images (empty alt) must sit inside an aria-hidden wrapper, and none may be named.
    const exposed = await page.evaluate(
        () => [...document.images].filter((img) => img.getAttribute('alt') === '' && !img.closest('[aria-hidden="true"]')).length,
    );
    expect(exposed).toBe(0);
    const motifs = await page.locator('main [aria-hidden="true"] img').count();
    expect(motifs).toBeGreaterThanOrEqual(1);
    for (const alt of await page.locator('main [aria-hidden="true"] img').evaluateAll((els) => els.map((e) => e.getAttribute('alt')))) {
        expect(alt).toBe('');
    }
});

test('after a full scroll every image has loaded and no request failed', async ({ page }) => {
    const failed: string[] = [];
    page.on('requestfailed', (req) => failed.push(req.url()));
    page.on('response', (res) => {
        if (res.status() >= 400) failed.push(`${res.status()} ${res.url()}`);
    });
    await page.goto('./', { waitUntil: 'networkidle' });
    await scrollThrough(page);
    await page.waitForTimeout(300);
    const broken = await page.evaluate(() =>
        [...document.images].filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.currentSrc),
    );
    expect(broken).toEqual([]);
    expect(failed).toEqual([]);
});

test('the phone page has no horizontal overflow after a full scroll', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('./', { waitUntil: 'networkidle' });
    await scrollThrough(page);
    const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
});

test('the paper cools slightly down the page and stays light', async ({ page }) => {
    await page.goto('./', { waitUntil: 'networkidle' });
    const shot = async (y: number) => {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.waitForTimeout(150);
        const buf = await page.screenshot({ clip: { x: 0, y: 2, width: 1, height: 1 } });
        return buf;
    };
    // Decode a 1x1 PNG by drawing it into a canvas in the page.
    const rgb = async (buf: Buffer) =>
        page.evaluate(async (b64) => {
            const img = new Image();
            img.src = `data:image/png;base64,${b64}`;
            await img.decode();
            const c = document.createElement('canvas');
            c.width = c.height = 1;
            const ctx = c.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            return Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3));
        }, buf.toString('base64'));

    const top = await rgb(await shot(0));
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    const bottom = await rgb(await shot(total));
    expect(bottom).not.toEqual(top);
    for (let i = 0; i < 3; i++) expect(Math.abs(bottom[i] - top[i])).toBeLessThan(16);
    for (const channel of bottom) expect(channel).toBeGreaterThan(220);
});
