'use client';

import { Switch } from '@/components/switch/Switch';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function SwitchPreview() {
  const [checked, setChecked] = useState(false);
  return (
    <ComponentPreview>
      <Switch checked={checked} onChange={setChecked} />
    </ComponentPreview>
  );
}

export function SwitchDisabledPreview() {
  return (
    <ComponentPreview>
      <Switch checked={false} disabled />
      <Switch checked={true} disabled />
    </ComponentPreview>
  );
}
