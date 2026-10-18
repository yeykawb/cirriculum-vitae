import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('./');
});

const experience = (page: import('@playwright/test').Page) => page.locator('#experience');

test('Employers are listed newest first, with Capgemini twice', async ({ page }) => {
    const employers = await experience(page).getByRole('heading', { level: 3 }).allTextContents();
    expect(employers).toEqual(['Consid', 'Capgemini', 'Visiba Care', 'Capgemini']);
});

test('each Employer shows its period', async ({ page }) => {
    const dates = ['2023 – present', '2022 – 2023', '2021 – 2022', '2018 – 2021'];
    const found = await experience(page)
        .getByText(/^\d{4} – (\d{4}|present)$/)
        .allTextContents();
    expect(found).toEqual(dates);
});

test('Assignments are listed newest first under their Employer', async ({ page }) => {
    const assignments = await experience(page).getByRole('heading', { level: 4 }).allTextContents();
    expect(assignments).toEqual([
        'Ambea',
        'Bostadsförmedlingen i Stockholm',
        'Hedin Bil',
        'Volvo Cars',
    ]);
});

test('Visiba Care is a role, not an Assignment', async ({ page }) => {
    const visiba = experience(page).locator('article', {
        has: page.getByRole('heading', { name: 'Visiba Care' }),
    });
    await expect(visiba.getByText('Data Platform Owner')).toBeVisible();
    await expect(visiba.getByRole('heading', { level: 4 })).toHaveCount(0);
    await expect(visiba).toContainText('One-person data team');
});

test('Assignments carry the PDF wording plus a concrete detail from the old site', async ({
    page,
}) => {
    const text = experience(page);
    await expect(text.getByText(/Unity Catalog.*SQL Server metadata database/)).toBeVisible();
    await expect(text.getByText(/Inmon and Kimball.*DAX/)).toBeVisible();
});

test('Capgemini 2018–2021 shows only Configure Your Volvo', async ({ page }) => {
    await expect(experience(page)).toContainText('Configure Your Volvo');
    await expect(page.getByText('New Global Function')).toHaveCount(0);
});

test('the technologies are one quiet line under an Assignment', async ({ page }) => {
    await expect(
        experience(page).getByText('Azure Databricks · Unity Catalog · dbt Cloud'),
    ).toBeVisible();
});

test('on desktop the dates sit in the left margin, beside the entry', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const dates = experience(page).getByText('2023 – present');
    const title = experience(page).getByRole('heading', { name: 'Consid' });
    await title.scrollIntoViewIfNeeded();
    const d = (await dates.boundingBox())!;
    const t = (await title.boundingBox())!;
    expect(d.x + d.width).toBeLessThanOrEqual(t.x);
    expect(Math.abs(d.y - t.y)).toBeLessThan(t.height);
});

test('on a phone the dates sit inline above the entry', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const dates = experience(page).getByText('2023 – present');
    const title = experience(page).getByRole('heading', { name: 'Consid' });
    await title.scrollIntoViewIfNeeded();
    const d = (await dates.boundingBox())!;
    const t = (await title.boundingBox())!;
    expect(d.y + d.height).toBeLessThanOrEqual(t.y);
    expect(d.x).toBeCloseTo(t.x, 0);
});
