'use client';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from '@/components/item/Item';
import { AngleRightIcon } from '@/icons/AngleRightIcon';

export function ItemLinkExample() {
  return (
    <Item
      render={<a href="/docs" />}
      variant="outline"
      className="w-96 max-w-full"
    >
      <ItemContent>
        <ItemTitle>Documentation</ItemTitle>
        <ItemDescription>
          Learn how to install registry items.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <AngleRightIcon className="size-[11px]" />
      </ItemActions>
    </Item>
  );
}
