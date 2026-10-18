import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('./');
});

test('skills are shown in four groups', async ({ page }) => {
    const skills = page.locator('#skills');
    for (const name of ['Platform', 'Delivery', 'Data', 'Practice']) {
        await expect(skills.getByText(name, { exact: true })).toBeVisible();
    }
    await expect(skills).toContainText('Databricks (Unity Catalog, Lakeflow Jobs)');
    await expect(skills).toContainText('Medallion architecture');
});

test('all seven certifications sit under their group, data group first', async ({ page }) => {
    const section = page.locator('#certifications');
    await expect(section.getByRole('heading', { level: 3 })).toHaveText([
        'Data & Engineering',
        'Process & Methodology',
    ]);

    const data = [
        ['dbt Developer', 'dbt Labs', 'Nov 2025'],
        ['Data Engineer Associate', 'Databricks', 'Nov 2023'],
        ['Spark 3.0 Associate Developer', 'Databricks', 'Feb 2023'],
        ['Azure Data Engineer Associate', 'Microsoft', 'Nov 2022'],
    ];
    const process = [
        ['SAFe 5 Agilist', 'Scaled Agile', 'Dec 2020'],
        ['CPRE Foundation Level', 'IREB', 'Nov 2018'],
        ['Professional Scrum Master I', 'Scrum.org', 'Sep 2018'],
    ];
    for (const [list, expected] of [
        [section.getByRole('list').first(), data],
        [section.getByRole('list').last(), process],
    ] as const) {
        const items = list.getByRole('listitem');
        await expect(items).toHaveCount(expected.length);
        for (const [i, [name, issuer, date]] of expected.entries()) {
            await expect(items.nth(i)).toContainText(name);
            await expect(items.nth(i)).toContainText(issuer);
            await expect(items.nth(i)).toContainText(date);
        }
    }
});

test('education shows the university, degree and years', async ({ page }) => {
    const education = page.locator('#education');
    await expect(education).toContainText('Göteborgs Universitet');
    await expect(education).toContainText('BSc Systems Science');
    await expect(education).toContainText('Human and Organisation');
    await expect(education).toContainText('2015 – 2018');
});
