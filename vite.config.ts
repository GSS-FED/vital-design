import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      src: '/src',
      '@': resolve(__dirname, 'src-v2'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'styled-components'],
    },
  },
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-styled-components'],
      },
    }),
    dts({
      include: ['src'],
      exclude: [
        'src/**/*.mdx',
        'src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
        'src/**/*.test.@(js|jsx|mjs|ts|tsx)',
      ],
      staticImport: true,
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  test: {
    coverage: {
      provider: 'v8',
    },
    projects: [
      {
        extends: true,
        test: {
          name: 'unit',
          globals: true,
          environment: 'jsdom',
          setupFiles: 'src/vitest-setup.ts',
          exclude: [
            ...configDefaults.exclude,
            // pages-preview.test.mjs uses node:test, not Vitest.
            '.gitlab/**',
            'visual/**',
            '**/*.vrt.test.*',
          ],
        },
      },
      {
        // Visual regression in a real browser: visual/fixtures.test.tsx
        // screenshots every src-v2 story and docs example; components can
        // add <Name>.vrt.test.tsx for interaction states (open menus etc.).
        extends: true,
        plugins: [tailwindcss()],
        // Storybook serves these at /images; stories and examples use them.
        publicDir: 'src-v2/public',
        test: {
          name: 'visual',
          include: [
            'visual/**/*.test.{ts,tsx}',
            'src-v2/**/*.vrt.test.tsx',
          ],
          setupFiles: 'visual/setup.ts',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [
              {
                browser: 'chromium',
                viewport: { width: 1280, height: 720 },
              },
            ],
            commands: {
              async blockExternalRequests({ context }) {
                await context.route(
                  (url) =>
                    !['localhost', '127.0.0.1'].includes(
                      url.hostname,
                    ),
                  (route) => route.abort(),
                );
              },
            },
            expect: {
              toMatchScreenshot: {
                // Baselines are a CI artifact, not committed (see
                // .gitlab/.gitlab-ci.yml visual-baseline).
                resolveScreenshotPath: ({
                  root,
                  testFileName,
                  arg,
                  ext,
                }) =>
                  resolve(
                    root,
                    'visual/__baseline__',
                    testFileName,
                    `${arg}${ext}`,
                  ),
              },
            },
          },
        },
      },
    ],
  },
});
