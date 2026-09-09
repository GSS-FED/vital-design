import { createMDX } from 'fumadocs-mdx/next';
import type { NextConfig } from 'next';
import path from 'path';

const withMDX = createMDX();

const isGithubPages = process.env.GITHUB_PAGES === 'true';

const config: NextConfig = {
  output: 'export',
  ...(isGithubPages ? { trailingSlash: true } : {}),
  images: { unoptimized: true },
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

    // Demo SVGs from src-v2/public/images as URL strings (Storybook/Vite parity)
    webpackConfig.module.rules.push({
      test: /\.svg$/i,
      include: path.resolve(__dirname, '../../src-v2/public/images'),
      type: 'asset/resource',
    });

    return webpackConfig;
  },
};

export default withMDX(config);
