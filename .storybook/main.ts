import type { StorybookConfig } from '@storybook/react-vite';
import { sharedConfig } from './shared';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  // v1 (src/) only. v2 components are documented by docs examples
  // (src-v2/**/examples) and screenshotted by `pnpm run test:visual`.
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  ...sharedConfig,
};

export default config;
