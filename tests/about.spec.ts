import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('./');
});

test('About is a few first-person sentences', async ({ page }) => {
    const text = (await page.locator('#about p').innerText()).trim();
    expect(text).toMatch(/^I /);
    // Two or three short sentences, not a wall of text.
    const sentences = text.split(/(?<=[.!?])\s+/);
    expect(sentences.length).toBeGreaterThanOrEqual(2);
    expect(sentences.length).toBeLessThanOrEqual(3);
});

test('About says he learns in conversation, cares about understood work and follows DuckDB', async ({
    page,
}) => {
    const about = page.locator('#about');
    await expect(about).toContainText('conversation');
    await expect(about).toContainText('understood');
    await expect(about).toContainText('DuckDB');
});

test('About is text only, with no photograph', async ({ page }) => {
    await expect(page.locator('#about').getByRole('img')).toHaveCount(0);
});
