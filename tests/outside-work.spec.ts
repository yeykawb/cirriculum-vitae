import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('./');
});

test('both interests are shown', async ({ page }) => {
    const section = page.locator('#outside-work');
    await expect(section.getByText('Ice cream science.')).toBeVisible();
    await expect(section.getByText('Sourdough baking.')).toBeVisible();
});

test('both portfolio projects are shown with their links', async ({ page }) => {
    const section = page.locator('#outside-work');
    const titles = await section.getByRole('heading', { level: 3 }).allTextContents();
    expect(titles).toEqual(['Ice Cream Analytics', 'dbt + PostgreSQL data platform']);

    const link = (name: string) => section.getByRole('link', { name });
    await expect(link('Ice Cream Analytics on GitHub')).toHaveAttribute(
        'href',
        'https://github.com/yeykawb/ice-cream-analytics',
    );
    await expect(link('Ice Cream Analytics on Explore')).toHaveAttribute(
        'href',
        'https://yeykawb.github.io/ice-cream-analytics/',
    );
    await expect(link('dbt + PostgreSQL data platform on GitHub')).toHaveAttribute(
        'href',
        'https://github.com/yeykawb/consid_dbt',
    );
});

test('the Contact section links to email, phone, LinkedIn, GitHub and the PDF', async ({
    page,
    request,
}) => {
    const contact = page.locator('#contact');
    await expect(contact.getByRole('link', { name: 'yeykawb@proton.me' })).toHaveAttribute(
        'href',
        'mailto:yeykawb@proton.me',
    );
    await expect(contact.getByRole('link', { name: '+46 73 232 73 73' })).toHaveAttribute(
        'href',
        'tel:+46732327373',
    );
    await expect(contact.getByRole('link', { name: 'linkedin.com/in/jakobagelin' })).toHaveAttribute(
        'href',
        'https://www.linkedin.com/in/jakobagelin/',
    );
    await expect(contact.getByRole('link', { name: 'github.com/yeykawb' })).toHaveAttribute(
        'href',
        'https://github.com/yeykawb',
    );

    const pdf = contact.getByRole('link', { name: 'Download PDF resume' });
    await expect(pdf).toBeVisible();
    const href = await pdf.getAttribute('href');
    const response = await request.get(new URL(href!, page.url()).toString());
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
});

test('there is no form on the page', async ({ page }) => {
    await expect(page.locator('form, input, textarea')).toHaveCount(0);
});
