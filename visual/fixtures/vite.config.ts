import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const repo = resolve(import.meta.dirname, '../..');

export default defineConfig({
  root: import.meta.dirname,
  // Storybook serves src-v2/public/images at /images.
  publicDir: resolve(repo, 'src-v2/public'),
  resolve: {
    alias: { '@': resolve(repo, 'src-v2') },
  },
  plugins: [
    react({ babel: { plugins: ['babel-plugin-styled-components'] } }),
    tailwindcss(),
  ],
  build: {
    outDir: resolve(repo, 'fixtures-static'),
    emptyOutDir: true,
    target: 'es2022',
  },
});
