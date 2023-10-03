import { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../src/**/*.mdx',
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
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
