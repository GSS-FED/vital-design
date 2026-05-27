'use client';

import type { ReactNode } from 'react';

type ComponentPreviewProps = {
  children: ReactNode;
  className?: string;
  centered?: boolean;
};

export function ComponentPreview({
  children,
  className = '',
  centered = true,
}: ComponentPreviewProps) {
  return (
    <div
      className={`not-prose my-4 rounded-md border border-grayscale-opacity-200 bg-muted p-6 ${centered ? 'flex flex-wrap items-center gap-3' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
