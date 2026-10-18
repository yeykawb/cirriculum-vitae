import { defineConfig, devices } from '@playwright/test';

// Tests run against the production build, served by `astro preview`.
// Set PW_PORT to run several worktrees' suites side by side. `--ignore-lock`
// keeps preview in the foreground (Astro backgrounds it when it detects an
// AI agent, which would orphan the server after the run).
const port = Number(process.env.PW_PORT ?? 4322);

export default defineConfig({
    testDir: 'tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL: `http://localhost:${port}/cirriculum-vitae/`,
        trace: 'retain-on-failure',
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    webServer: {
        command: `npm run build && npm run preview -- --port ${port} --ignore-lock`,
        url: `http://localhost:${port}/cirriculum-vitae/`,
        reuseExistingServer: false,
        timeout: 120_000,
    },
});
