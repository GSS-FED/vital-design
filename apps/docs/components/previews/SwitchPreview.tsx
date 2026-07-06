'use client';

import { Switch } from '@/components/switch/Switch';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function SwitchPreview() {
  const [checked, setChecked] = useState(false);
  return (
    <ComponentPreview name="SwitchPreview">
      <Switch checked={checked} onCheckedChange={setChecked} />
    </ComponentPreview>
  );
}

export function SwitchDisabledPreview() {
  return (
    <ComponentPreview name="SwitchDisabledPreview">
      <Switch checked={false} disabled />
      <Switch checked={true} disabled />
    </ComponentPreview>
  );
}

export function SwitchInvalidPreview() {
  return (
    <ComponentPreview name="SwitchInvalidPreview">
      <Switch aria-invalid checked={false} />
      <Switch aria-invalid checked={true} />
    </ComponentPreview>
  );
}
