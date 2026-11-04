import { Agentation } from 'agentation';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import type { ReactNode } from 'react';
import { HtmlLang } from '~/components/docs/HtmlLang';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vittal.design'),
};

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="describedby" href="/llms.txt" />
      </head>
      <body className={roboto.variable}>
        <HtmlLang />
        {children}
        {process.env.NODE_ENV === 'development' && <Agentation />}
      </body>
    </html>
  );
}
