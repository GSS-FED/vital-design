'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function HtmlLang() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang =
      pathname === '/zh-tw' || pathname.startsWith('/zh-tw/')
        ? 'zh-TW'
        : 'en';
  }, [pathname]);

  return null;
}
