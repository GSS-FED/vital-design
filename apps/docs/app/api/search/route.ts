import { createTokenizer } from '@orama/tokenizers/mandarin';
import { createFromSource } from 'fumadocs-core/search/server';
import { source } from '~/lib/source';

export const revalidate = false;

const tokenizer = createTokenizer();

export const { staticGET: GET } = createFromSource(source, {
  localeMap: {
    en: 'english',
    'zh-tw': {
      tokenizer,
    },
  },
});
