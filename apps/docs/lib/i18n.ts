import { defineI18n } from 'fumadocs-core/i18n';

export const i18n = defineI18n({
  defaultLanguage: 'en',
  languages: ['en', 'zh-tw'],
  // English stays at /docs. Traditional Chinese is /zh-tw/docs.
  // Static export cannot run the middleware that would rewrite /en away,
  // so the English route is mounted without a locale segment.
  hideLocale: 'default-locale',
  parser: 'dot',
  fallbackLanguage: 'en',
});

export type DocsLocale = (typeof i18n.languages)[number];

export const ZH_TW_PREFIX = '/zh-tw';
