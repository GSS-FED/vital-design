import { loader } from 'fumadocs-core/source';
import { resolveFiles } from 'fumadocs-mdx';
import { i18n } from '~/lib/i18n';
import { docs } from '../.source';

export const source = loader({
  baseUrl: '/docs',
  i18n,
  source: { files: resolveFiles(docs) },
});
