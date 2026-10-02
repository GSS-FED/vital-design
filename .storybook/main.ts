import type { StorybookConfig } from '@storybook/react-vite';
import { sharedConfig } from './shared';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src-v2/**/*.mdx',
    {
      directory: '../src-v2',
      titlePrefix: 'V2',
      files: '**/*.stories.@(js|jsx|mjs|ts|tsx)',
    },
  ],
  staticDirs: [{ from: '../src-v2/public/images', to: '/images' }],
  ...sharedConfig,
};

export default config;
