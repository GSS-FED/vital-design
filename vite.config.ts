/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
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
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/vitest-setup.ts',
    coverage: {
      provider: 'v8',
    },
  },
});
