import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { DocsLocale } from '~/lib/i18n';

const navTitle = (
  <span className="font-semibold tracking-tight">Vittal Design</span>
);

export function baseOptions(locale: DocsLocale): BaseLayoutProps {
  return {
    i18n: true,
    nav: {
      title: navTitle,
      url:
        locale === 'zh-tw'
          ? '/zh-tw/docs/getting-started'
          : '/docs/getting-started',
    },
    githubUrl: 'https://github.com/GSS-FED/vital-design',
  };
}
