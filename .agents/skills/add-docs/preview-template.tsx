'use client';

import ComponentName from '@/components/component-name/ComponentName';
import { useState } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

// Basic interactive preview — shows default state + one interaction
export function ComponentNamePreview() {
  const [value, setValue] = useState(false);

  return (
    <ComponentPreview>
      <ComponentName value={value} onChange={setValue} />
    </ComponentPreview>
  );
}

// Optional: add a second export for a distinct variant or state group
// export function ComponentNameVariantPreview() {
//   return (
//     <ComponentPreview>
//       <ComponentName disabled />
//     </ComponentPreview>
//   );
// }
