import { test, expect } from '@playwright/test';

// The sections after the hero, in page order. Later tickets append their section here:
// Skills, Certifications, Education, Outside work, Closing.
const sectionsAfterHero = ['About', 'Experience', 'Outside work', 'Contact'];

test.beforeEach(async ({ page }) => {
    await page.goto('./');
});

test('the sections follow the hero in order', async ({ page }) => {
    const headings = await page.locator('h1, h2').allTextContents();
    expect(headings).toEqual(['Jakob Agelin', ...sectionsAfterHero]);
});

test('each section can be jumped to by its anchor', async ({ page }) => {
    for (const label of sectionsAfterHero) {
        const id = label.toLowerCase().replace(/\s+/g, '-');
        const section = page.locator(`#${id}`);
        await expect(section).toHaveCount(1);
        await expect(section.getByRole('heading', { level: 2 })).toHaveText(label);
    }
});

test('no section overflows sideways at phone width', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(0);
});
