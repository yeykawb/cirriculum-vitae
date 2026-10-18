import { test, expect, type Page } from '@playwright/test';

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

test('the hero offers the PDF resume and the link resolves under the base path', async ({
    page,
    request,
}) => {
    const link = page.getByRole('banner').getByRole('link', { name: 'Download PDF resume' });
    await expect(link).toBeVisible();

    const href = (await link.getAttribute('href')) ?? '';
    expect(href).toContain('/cirriculum-vitae/');

    const response = await request.get(new URL(href, page.url()).toString());
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('pdf');
});

test('the hero artwork loads', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    const images = await page.locator('img').evaluateAll((imgs) =>
        (imgs as HTMLImageElement[]).map((img) => ({ src: img.src, loaded: img.naturalWidth > 0 })),
    );
    expect(images.length).toBeGreaterThan(0);
    expect(images.filter((img) => !img.loaded)).toEqual([]);
});

test('the decorative art is hidden from assistive tech', async ({ page }) => {
    // The Ensō, Ridges, sun, birds and Hanko are decoration: a screen-reader
    // user hears the CV, not the pictures.
    const hero = page.getByRole('banner');
    await expect(hero.getByRole('img')).toHaveCount(0);

    const tree = await hero.ariaSnapshot();
    expect(tree).not.toMatch(/\bimg\b/);
    expect(tree).toContain('heading "Jakob Agelin" [level=1]');
});

test.describe('on a phone', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('the page does not scroll sideways', async ({ page }) => {
        await page.goto('./', { waitUntil: 'networkidle' });
        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
        }));
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });

    test('the name, summary and contact line stay inside the screen', async ({ page }) => {
        await page.goto('./', { waitUntil: 'networkidle' });
        const hero = page.getByRole('banner');
        const targets = [
            hero.getByRole('heading', { level: 1 }),
            hero.getByText(/eight years of consulting/),
            hero.getByRole('link', { name: 'linkedin.com/in/jakobagelin' }),
            hero.getByRole('link', { name: 'github.com/yeykawb' }),
            hero.getByRole('link', { name: 'Download PDF resume' }),
        ];
        for (const target of targets) {
            const box = await target.boundingBox();
            expect(box).not.toBeNull();
            expect(box!.x).toBeGreaterThanOrEqual(0);
            expect(box!.x + box!.width).toBeLessThanOrEqual(390);
        }
    });
});

// Scroll choreography. Progress 0 is the top of the page; 1 is the end of the pin.
type Box = { x: number; y: number; width: number; height: number };

async function pinRange(page: Page) {
    return page.evaluate(() => {
        const hero = document.querySelector('header')!;
        return hero.getBoundingClientRect().height - window.innerHeight;
    });
}

// Two frames: the scroll event, then the script's animation frame.
async function settle(page: Page) {
    await page.evaluate(
        () => new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done))),
    );
}

async function scrollToProgress(page: Page, progress: number) {
    const range = await pinRange(page);
    await page.evaluate((y) => window.scrollTo(0, y), range * progress);
    await settle(page);
}

async function boxOf(page: Page, selector: string): Promise<Box> {
    return page.locator(selector).evaluate((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height };
    });
}

const layerBox = (page: Page, layer: string) => boxOf(page, `[data-hero-layer="${layer}"]`);
const sunBox = (page: Page) => boxOf(page, '[data-hero-layer="sun"] circle');

test.describe('scrolling through the hero', () => {
    test('the Ridges rise at different rates, the front one fastest', async ({ page }) => {
        const names = ['ridge-1', 'ridge-2', 'ridge-3', 'ridge-4'];
        const before: Record<string, Box> = {};
        for (const name of names) before[name] = await layerBox(page, name);

        await scrollToProgress(page, 0.5);
        const rise: Record<string, number> = {};
        for (const name of names) rise[name] = before[name].y - (await layerBox(page, name)).y;

        for (const name of names) expect(rise[name]).toBeGreaterThan(20);
        expect(rise['ridge-1']).toBeLessThan(rise['ridge-2']);
        expect(rise['ridge-2']).toBeLessThan(rise['ridge-3']);
        expect(rise['ridge-3']).toBeLessThan(rise['ridge-4']);
    });

    test('the sun sinks behind the Ridges', async ({ page }) => {
        const ridgeAtTop = await layerBox(page, 'ridge-2');
        const sunAtTop = await sunBox(page);
        await scrollToProgress(page, 0.5);
        const ridge = await layerBox(page, 'ridge-2');
        const sun = await sunBox(page);
        // Measured against the Ridge in front of it, the sun has gone down.
        const sunk = sun.y - ridge.y - (sunAtTop.y - ridgeAtTop.y);
        expect(sunk).toBeGreaterThan(25);
    });

    test('the front Ridge washes over the intro, which softens', async ({ page }) => {
        const intro = page.getByRole('heading', { level: 1 }).locator('..');
        await expect(intro).toHaveCSS('opacity', '1');
        await scrollToProgress(page, 0.6);
        const opacity = Number(await intro.evaluate((el) => getComputedStyle(el).opacity));
        expect(opacity).toBeLessThan(0.9);
        expect(opacity).toBeGreaterThan(0.3);

        // By the end the top of the screen is plain paper: no Ensō, ridge or text left.
        await scrollToProgress(page, 1);
        const { width, height } = page.viewportSize()!;
        const top = await page.screenshot({ clip: { x: 0, y: 0, width, height: height * 0.4 } });
        expect(top.length).toBeLessThan(5_000); // a flat colour compresses to almost nothing
    });

    test('the birds flap and fly out of the screen', async ({ page }) => {
        const heights = new Set<number>();
        for (const progress of [0, 0.08, 0.15, 0.23, 0.3]) {
            await scrollToProgress(page, progress);
            heights.add(Math.round((await boxOf(page, '[data-bird="bird-1"]')).height));
        }
        // Rest, wings up and wings down are different shapes.
        expect(heights.size).toBeGreaterThanOrEqual(3);

        await scrollToProgress(page, 1);
        const viewport = page.viewportSize()!;
        for (const id of ['bird-1', 'bird-2', 'bird-3']) {
            const b = await boxOf(page, `[data-bird="${id}"]`);
            const gone =
                b.y + b.height < 0 || b.y > viewport.height || b.x + b.width < 0 || b.x > viewport.width;
            expect(gone, `${id} is out of the viewport`).toBe(true);
        }
    });

    test('scrolling back up puts everything back', async ({ page }) => {
        const layers = ['ridge-2', 'ridge-4', 'birds'];
        const start: Record<string, Box> = {};
        for (const name of layers) start[name] = await layerBox(page, name);
        const sunStart = await sunBox(page);

        await scrollToProgress(page, 0.7);
        expect((await layerBox(page, 'ridge-4')).y).toBeLessThan(start['ridge-4'].y - 100);

        await scrollToProgress(page, 0);
        for (const name of layers) {
            const box = await layerBox(page, name);
            expect(box.x).toBeCloseTo(start[name].x, 0);
            expect(box.y).toBeCloseTo(start[name].y, 0);
        }
        expect((await sunBox(page)).y).toBeCloseTo(sunStart.y, 0);
    });

    test('About follows directly on the paper the front Ridge leaves behind', async ({ page }) => {
        const viewport = page.viewportSize()!;
        await scrollToProgress(page, 1);
        const about = page.getByRole('heading', { level: 2, name: 'About' });
        const atEnd = await about.boundingBox();
        expect(atEnd).not.toBeNull();
        // Already on screen, in the upper part of the screen, not after a blank page.
        expect(atEnd!.y).toBeGreaterThan(viewport.height * 0.2);
        expect(atEnd!.y).toBeLessThan(viewport.height * 0.4);

        await page.evaluate((h) => window.scrollBy(0, h * 0.1), viewport.height);
        await expect(about).toBeInViewport();
    });

    test('the front Ridge puts the name away by the end of the pin', async ({ page }) => {
        const name = page.getByRole('heading', { level: 1 });
        const look = async () => {
            const box = (await name.boundingBox())!;
            return (await page.screenshot({ clip: box })).length;
        };
        const atTop = await look();
        await scrollToProgress(page, 1);
        // Where the name stood is plain paper: a flat colour compresses to almost nothing.
        expect(await look()).toBeLessThan(atTop / 2);
        expect(await look()).toBeLessThan(1_500);
    });

    test('the name stays put while the hero is scrolled through', async ({ page }) => {
        const name = page.getByRole('heading', { level: 1 });
        const atTop = await name.boundingBox();
        await scrollToProgress(page, 0.5);
        const midPin = await name.boundingBox();
        expect(midPin!.y).toBeCloseTo(atTop!.y, 0);
    });

    test.describe('with reduced motion', () => {
        test.use({ reducedMotion: 'reduce' });

        test('the hero is one still screen that scrolls away', async ({ page }) => {
            const viewport = page.viewportSize()!;
            const hero = page.getByRole('banner');
            expect((await hero.boundingBox())!.height).toBeCloseTo(viewport.height, 0);

            const names = ['ridge-2', 'ridge-4', 'birds'];
            const before: Record<string, Box> = {};
            for (const name of names) before[name] = await layerBox(page, name);
            const sunBefore = await sunBox(page);

            await page.evaluate(() => window.scrollTo(0, 300));
            await settle(page);

            // Nothing moved except with the page itself.
            for (const name of names) {
                const box = await layerBox(page, name);
                expect(box.y).toBeCloseTo(before[name].y - 300, 0);
                expect(box.x).toBeCloseTo(before[name].x, 0);
            }
            expect((await sunBox(page)).y).toBeCloseTo(sunBefore.y - 300, 0);
            expect((await hero.boundingBox())!.y).toBeCloseTo(-300, 0);
            await expect(page.getByRole('heading', { level: 1 }).locator('..')).toHaveCSS('opacity', '1');
        });
    });
});

test.describe('on a phone, scrolling through the hero', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('the pin is shorter than on a desktop', async ({ page }) => {
        const hero = await page.getByRole('banner').boundingBox();
        // About one screen of pin, against about one and a half on a desktop.
        expect(hero!.height).toBeGreaterThan(844 * 1.9);
        expect(hero!.height).toBeLessThan(844 * 2.1);
    });

    test('the Ridges still rise and the birds still leave', async ({ page }) => {
        const before = await layerBox(page, 'ridge-4');
        await scrollToProgress(page, 0.5);
        expect((await layerBox(page, 'ridge-4')).y).toBeLessThan(before.y - 50);

        await scrollToProgress(page, 1);
        const b = await boxOf(page, '[data-bird="bird-1"]');
        expect(b.y + b.height < 0 || b.x > 390).toBe(true);
    });

    test('the page does not scroll sideways mid-pin', async ({ page }) => {
        await scrollToProgress(page, 0.5);
        const { scrollWidth, clientWidth } = await page.evaluate(() => ({
            scrollWidth: document.documentElement.scrollWidth,
            clientWidth: document.documentElement.clientWidth,
        }));
        expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });
});
