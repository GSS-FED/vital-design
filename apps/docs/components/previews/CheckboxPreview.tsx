'use client';

import Checkbox from '@/components/checkbox/Checkbox';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function CheckboxPreview() {
  const [checked, setChecked] = useState(false);
  return (
    <ComponentPreview>
      <Checkbox checked={checked} onChange={setChecked}>
        Accept terms and conditions
      </Checkbox>
    </ComponentPreview>
  );
}

export function CheckboxStatesPreview() {
  return (
    <ComponentPreview>
      <Checkbox checked={false}>Unchecked</Checkbox>
      <Checkbox checked={true}>Checked</Checkbox>
      <Checkbox checked="indeterminate">Indeterminate</Checkbox>
      <Checkbox checked={false} disabled>
        Disabled
      </Checkbox>
    </ComponentPreview>
  );
}
