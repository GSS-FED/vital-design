'use client';

import { Button } from '@/components/button/Button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from '@/components/item/Item';
import { ShieldCheckIcon } from '@/icons/ShieldCheckIcon';

export function ItemExample() {
  return (
    <Item variant="outline" className="w-96 max-w-full">
      <ItemMedia variant="icon">
        <ShieldCheckIcon className="size-5" />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Profile verified</ItemTitle>
        <ItemDescription>
          Your profile has been verified.
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button size="md" theme="default">
          Review
        </Button>
      </ItemActions>
    </Item>
  );
}
