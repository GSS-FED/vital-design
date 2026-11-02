import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { ReactNode } from 'react';
import { baseOptions } from '~/app/layout.config';
import { DocsProviders } from '~/components/docs/DocsProviders';
import { withExternalLlmsLink } from '~/lib/llms';
import { source } from '~/lib/source';

export default function Layout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DocsProviders locale="en">
      <DocsLayout
        tree={withExternalLlmsLink(source.getPageTree('en'))}
        {...baseOptions('en')}
      >
        {children}
      </DocsLayout>
    </DocsProviders>
  );
}
