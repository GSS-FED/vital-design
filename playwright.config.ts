import { defineConfig, devices } from '@playwright/test';

// Visual regression for Storybook stories (see visual/storybook.visual.ts).
// Baselines are not committed: CI stores them as an artifact of the
// `visual-baseline` job and downloads them in `visual-diff`.
export default defineConfig({
  testDir: './visual',
  testMatch: '*.visual.ts',
  snapshotPathTemplate: '{testDir}/__baseline__/{arg}{ext}',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: process.env.CI
    ? [['list'], ['html', { open: 'never' }]]
    : [['html', { open: 'never' }]],
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:6007',
  },
  expect: {
    toHaveScreenshot: { animations: 'disabled', caret: 'hide' },
  },
  webServer: {
    command:
      'pnpm exec vite preview --outDir storybook-static --host 127.0.0.1 --port 6007 --strictPort',
    url: 'http://127.0.0.1:6007',
    reuseExistingServer: !process.env.CI,
  },
});
