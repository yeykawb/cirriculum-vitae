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
