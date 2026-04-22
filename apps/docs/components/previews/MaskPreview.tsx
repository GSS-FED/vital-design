'use client';

import Mask from '@/components/mask/Mask';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const ITEMS = Array.from({ length: 12 }, (_, i) => `Item ${i + 1}`);

export function MaskPreview() {
  return (
    <ComponentPreview centered={false}>
      <div className="shadow-emphasis rounded w-52">
        <Mask height="200px" className="py-2">
          <ul className="m-0 p-0 list-none">
            {ITEMS.map((label) => (
              <li
                key={label}
                className="px-5 py-1.5 text-sm text-grayscale-800"
              >
                {label}
              </li>
            ))}
          </ul>
        </Mask>
      </div>
    </ComponentPreview>
  );
}

export function MaskNoOverflowPreview() {
  const items = ['Apple', 'Banana', 'Cherry'];

  return (
    <ComponentPreview centered={false}>
      <div className="shadow-emphasis rounded w-52">
        <Mask height="200px" className="py-2">
          <ul className="m-0 p-0 list-none">
            {items.map((label) => (
              <li
                key={label}
                className="px-5 py-1.5 text-sm text-grayscale-800"
              >
                {label}
              </li>
            ))}
          </ul>
        </Mask>
      </div>
    </ComponentPreview>
  );
}
