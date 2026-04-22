import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import { type PluginOption, mergeConfig } from 'vite';

type SharedStorybookConfig = Pick<
  StorybookConfig,
  'addons' | 'docs' | 'typescript' | 'viteFinal'
>;

function hasPluginName(
  plugin: PluginOption,
): plugin is PluginOption & { name: string } {
  return (
    typeof plugin === 'object' &&
    plugin !== null &&
    !Array.isArray(plugin) &&
    'name' in plugin
  );
}

export const sharedConfig: SharedStorybookConfig = {
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  docs: {
    autodocs: 'tag',
    defaultName: 'Documentation',
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  viteFinal(config) {
    const { plugins, ...rest } = config;

    return mergeConfig(
      { ...rest },
      {
        plugins: [
          ...(plugins?.filter(
            (plugin) =>
              !hasPluginName(plugin) || plugin.name !== 'vite:dts',
          ) ?? []),
          tailwindcss(),
        ],
      },
    );
  },
};
