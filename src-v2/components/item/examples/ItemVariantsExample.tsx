'use client';

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/item/Item';

export function ItemVariantsExample() {
  return (
    <div className="flex w-96 max-w-full flex-col gap-3">
      <Item>
        <ItemContent>
          <ItemTitle>Default</ItemTitle>
          <ItemDescription>Transparent background.</ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent>
          <ItemTitle>Outline</ItemTitle>
          <ItemDescription>
            Bordered row for clear grouping.
          </ItemDescription>
        </ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent>
          <ItemTitle>Muted</ItemTitle>
          <ItemDescription>
            Soft background for secondary content.
          </ItemDescription>
        </ItemContent>
      </Item>
    </div>
  );
}
