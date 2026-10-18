import { test, expect, type Page } from '@playwright/test';

const labels = [
    'About',
    'Experience',
    'Skills',
    'Certifications',
    'Education',
    'Outside work',
    'Contact',
];

test.use({ viewport: { width: 1440, height: 900 } });

test.beforeEach(async ({ page }) => {
    await page.goto('./');
});

const index = (page: Page) => page.getByRole('navigation', { name: 'Sections' });
const entry = (page: Page, label: string) =>
    index(page).getByRole('link', { name: label, exact: true });

async function reachAbout(page: Page) {
    await page.locator('#about').scrollIntoViewIfNeeded();
    await expect(index(page)).toBeVisible();
}

test('the index stays out of the hero and appears once About is reached', async ({ page }) => {
    await expect(index(page)).toBeHidden();
    await reachAbout(page);
    for (const label of labels) {
        await expect(entry(page, label)).toBeVisible();
    }
});

test('clicking an entry brings its section into view and marks it current', async ({ page }) => {
    await reachAbout(page);
    await entry(page, 'Skills').click();
    await expect(page.locator('#skills').getByRole('heading', { name: 'Skills' })).toBeInViewport();
    await expect(entry(page, 'Skills')).toHaveAttribute('aria-current', 'location');
    await expect(index(page).locator('[aria-current]')).toHaveCount(1);
});

test('the highlight follows the visitor to another section', async ({ page }) => {
    await reachAbout(page);
    await entry(page, 'Skills').click();
    await expect(entry(page, 'Skills')).toHaveAttribute('aria-current', 'location');
    await page.locator('#education').scrollIntoViewIfNeeded();
    await expect(entry(page, 'Education')).toHaveAttribute('aria-current', 'location');
    await expect(entry(page, 'Skills')).not.toHaveAttribute('aria-current', /.*/);
});

test('the highlight steps back when the visitor goes back up', async ({ page }) => {
    await reachAbout(page);
    await entry(page, 'Contact').click();
    await expect(entry(page, 'Contact')).toHaveAttribute('aria-current', 'location');
    await entry(page, 'Experience').click();
    await expect(entry(page, 'Experience')).toHaveAttribute('aria-current', 'location');
    await page.mouse.wheel(0, -700);
    await expect(entry(page, 'About')).toHaveAttribute('aria-current', 'location');
    await expect(index(page).locator('[aria-current]')).toHaveCount(1);
});

test('the last entry can be reached at the end of the page', async ({ page }) => {
    await reachAbout(page);
    await entry(page, 'Contact').click();
    await expect(entry(page, 'Contact')).toHaveAttribute('aria-current', 'location');
});

test('every entry points at a section on the page', async ({ page }) => {
    await reachAbout(page);
    await expect(index(page).getByRole('link')).toHaveCount(labels.length);
    for (const label of labels) {
        const href = await entry(page, label).getAttribute('href');
        const section = page.locator(href!);
        await expect(section).toHaveCount(1);
        await expect(section.getByRole('heading', { level: 2 })).toHaveText(label);
    }
});

test('the entries are reachable by keyboard with a visible focus', async ({ page }) => {
    await reachAbout(page);
    const first = entry(page, 'About');
    await first.focus();
    await expect(first).toBeFocused();
    await expect(first).toHaveCSS('outline-style', 'solid');
    await page.keyboard.press('Tab');
    await expect(entry(page, 'Experience')).toBeFocused();
});

test('there is no index at phone width', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.locator('#experience').scrollIntoViewIfNeeded();
    await expect(index(page)).toBeHidden();
    // Not in the accessibility tree and not in the tab order.
    await expect(index(page)).toHaveCount(0);
    await page.keyboard.press('Tab');
    await expect(page.locator('nav a:focus')).toHaveCount(0);
});
