import { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],

  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },

  //Configures how Storybook handles TypeScript files
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },

  async viteFinal(config) {
    const { plugins, ...rest } = config;
    const mergedConfig = mergeConfig(
      { ...rest },
      {
        plugins: plugins?.filter((plugin) => {
          const unwantedPluginNames = ['vite:dts'];
          return !unwantedPluginNames.includes(plugin?.['name']);
        }),
      },
    );
    return mergedConfig;
  },
};

export default config;
