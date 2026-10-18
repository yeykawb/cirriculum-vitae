import { test, expect } from '@playwright/test';

test('the page loads with no console errors or failed requests', async ({ page }) => {
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
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForLoadState('networkidle');

    expect(problems).toEqual([]);
});
