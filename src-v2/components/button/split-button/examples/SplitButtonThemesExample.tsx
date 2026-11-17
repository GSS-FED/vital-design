'use client';

import { SplitButton } from '@/components/button/split-button/SplitButton';

export function SplitButtonThemesExample() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <SplitButton theme="primary">Primary</SplitButton>
      <SplitButton theme="default">Default</SplitButton>
      <SplitButton theme="success">Success</SplitButton>
      <SplitButton theme="info">Info</SplitButton>
      <SplitButton theme="warning">Warning</SplitButton>
      <SplitButton theme="alarm">Alarm</SplitButton>
      <SplitButton theme="dangerous">Dangerous</SplitButton>
    </div>
  );
}
