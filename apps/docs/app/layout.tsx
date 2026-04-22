import { RootProvider } from 'fumadocs-ui/provider';
import { Roboto } from 'next/font/google';
import type { ReactNode } from 'react';
import './global.css';

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
      <body className={roboto.variable}>
        <RootProvider
          theme={{
            defaultTheme: 'light',
            forcedTheme: 'light',
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
