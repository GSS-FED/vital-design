import { type DocsLocale, ZH_TW_PREFIX } from '~/lib/i18n';

function stripTrailingSlash(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function switchLocalePath(
  pathname: string,
  next: DocsLocale,
): string {
  const normalized = stripTrailingSlash(pathname);
  const bare =
    normalized === ZH_TW_PREFIX
      ? '/'
      : normalized.startsWith(`${ZH_TW_PREFIX}/`)
        ? normalized.slice(ZH_TW_PREFIX.length)
        : normalized;

  if (next === 'en') return bare || '/';
  if (bare === '/') return ZH_TW_PREFIX;
  return `${ZH_TW_PREFIX}${bare}`;
}
