'use client';

import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from '@/components/item/Item';
import { AngleRightIcon } from '@/icons/AngleRightIcon';
import { UserIcon } from '@/icons/UserIcon';

export function ItemIconRowsExample() {
  return (
    <ItemGroup className="w-96 max-w-full">
      <Item size="list">
        <ItemMedia variant="icon">
          <UserIcon className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Left icon</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="list" data-highlighted>
        <ItemMedia variant="icon">
          <UserIcon className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Hover</ItemTitle>
        </ItemContent>
      </Item>
      <Item size="list" data-active>
        <ItemContent>
          <ItemTitle>Right icon</ItemTitle>
        </ItemContent>
        <ItemActions>
          <AngleRightIcon className="size-[11px]" />
        </ItemActions>
      </Item>
      <Item size="list" data-current>
        <ItemMedia variant="icon">
          <UserIcon className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Current</ItemTitle>
          <ItemDescription>Description text</ItemDescription>
        </ItemContent>
        <ItemActions>
          <AngleRightIcon className="size-[11px]" />
        </ItemActions>
      </Item>
      <Item size="list" data-disabled>
        <ItemMedia variant="icon">
          <UserIcon className="size-4" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Disabled</ItemTitle>
        </ItemContent>
        <ItemActions>
          <AngleRightIcon className="size-[11px]" />
        </ItemActions>
      </Item>
    </ItemGroup>
  );
}
