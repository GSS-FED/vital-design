'use client';

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/item/Item';

export function ItemDescriptionRowsExample() {
  return (
    <ItemGroup className="w-96 max-w-full">
      <Item size="list">
        <ItemContent>
          <ItemTitle>Option</ItemTitle>
          <ItemDescription>Description text</ItemDescription>
        </ItemContent>
      </Item>
      <Item size="list" data-highlighted>
        <ItemContent>
          <ItemTitle>Hover</ItemTitle>
          <ItemDescription>Description text</ItemDescription>
        </ItemContent>
      </Item>
      <Item size="list" data-active>
        <ItemContent>
          <ItemTitle>Active</ItemTitle>
          <ItemDescription>Description text</ItemDescription>
        </ItemContent>
      </Item>
      <Item size="list" data-current>
        <ItemContent>
          <ItemTitle>Current</ItemTitle>
          <ItemDescription>Description text</ItemDescription>
        </ItemContent>
      </Item>
      <Item size="list" data-disabled>
        <ItemContent>
          <ItemTitle>Disabled</ItemTitle>
          <ItemDescription>Description text</ItemDescription>
        </ItemContent>
      </Item>
    </ItemGroup>
  );
}
