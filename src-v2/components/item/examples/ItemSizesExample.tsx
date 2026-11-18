'use client';

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/item/Item';

const sizes = [
  {
    size: 'default',
    title: 'Default',
    description: 'Standard spacing.',
  },
  { size: 'sm', title: 'Small', description: 'Compact spacing.' },
  {
    size: 'xs',
    title: 'Extra small',
    description: 'Dense row spacing.',
  },
  { size: 'list', title: 'List', description: 'Picker row spacing.' },
] as const;

export function ItemSizesExample() {
  return (
    <div className="flex w-96 max-w-full flex-col gap-3">
      {sizes.map(({ size, title, description }) => (
        <Item key={size} variant="outline" size={size}>
          <ItemContent>
            <ItemTitle>{title}</ItemTitle>
            <ItemDescription>{description}</ItemDescription>
          </ItemContent>
        </Item>
      ))}
    </div>
  );
}
