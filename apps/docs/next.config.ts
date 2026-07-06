import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';
import path from 'path';

const withMDX = createMDX();

const config: NextConfig = {
  output: 'export',
  transpilePackages: ['@fed/vital-design'],
  reactStrictMode: true,
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  // Map @/ to src-v2/ so transpiled component library files resolve their internal @/ imports correctly
  webpack: (webpackConfig) => {
    // @/ → src-v2/ (for component library internal imports)
    webpackConfig.resolve.alias['@'] = path.resolve(
      __dirname,
      '../../src-v2',
    );
    // ~/ → apps/docs/ (for docs app internal imports)
    webpackConfig.resolve.alias['~'] = path.resolve(__dirname, '.');
    return webpackConfig;
  },
};

export default withMDX(config);
