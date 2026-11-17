'use client';

import {
  Item,
  ItemContent,
  ItemGroup,
  ItemTitle,
} from '@/components/item/Item';

export function ItemTextRowsExample() {
  return (
    <ItemGroup className="w-96 max-w-full">
      <Item size="list">
        <ItemContent>
          <ItemTitle>Normal</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="list" data-highlighted>
        <ItemContent>
          <ItemTitle>Hover</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="list" data-active>
        <ItemContent>
          <ItemTitle>Active</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="list" data-current>
        <ItemContent>
          <ItemTitle>Current</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="list" data-disabled>
        <ItemContent>
          <ItemTitle>Disabled</ItemTitle>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}
