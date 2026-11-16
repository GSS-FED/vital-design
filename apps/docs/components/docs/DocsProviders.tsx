'use client';

import { RootProvider } from 'fumadocs-ui/provider';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode } from 'react';
import { DocsSearchDialog } from '~/components/docs/SearchDialog';
import { type DocsLocale } from '~/lib/i18n';
import { i18nUi } from '~/lib/i18n-ui';
import { switchLocalePath } from '~/lib/locale-path';

export function DocsProviders({
  locale,
  children,
}: {
  locale: DocsLocale;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const i18n = i18nUi.provider(locale);

  return (
    <RootProvider
      i18n={{
        ...i18n,
        onLocaleChange: (next) => {
          router.push(switchLocalePath(pathname, next as DocsLocale));
        },
      }}
      search={{
        options: {
          type: 'static',
        },
        SearchDialog: DocsSearchDialog,
      }}
      theme={{
        defaultTheme: 'light',
        enableSystem: false,
      }}
    >
      {children}
    </RootProvider>
  );
}
