import { test, expect } from '@playwright/test';

test('the page loads and scrolls to the end with no console errors or failed requests', async ({ page }) => {
    const problems: string[] = [];
    page.on('console', (msg) => {
        if (msg.type() === 'error') problems.push(`console: ${msg.text()}`);
    });
    page.on('pageerror', (err) => problems.push(`pageerror: ${err.message}`));
    page.on('requestfailed', (req) => problems.push(`failed: ${req.url()}`));
    page.on('response', (res) => {
        if (res.status() >= 400) problems.push(`${res.status()}: ${res.url()}`);
    });

    await page.goto('./', { waitUntil: 'networkidle' });
    // Scroll down a viewport at a time, so the hero choreography and the observers all run.
    const { height, total } = await page.evaluate(() => ({
        height: window.innerHeight,
        total: document.documentElement.scrollHeight,
    }));
    for (let y = height; y < total + height; y += height) {
        await page.evaluate((top) => window.scrollTo(0, top), y);
        await page.waitForTimeout(60);
    }
    await page.waitForLoadState('networkidle');

    expect(problems).toEqual([]);
});
