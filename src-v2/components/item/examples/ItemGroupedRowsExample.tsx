'use client';

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from '@/components/item/Item';
import { Fragment } from 'react';

const people = [
  {
    name: 'Alex Lin',
    initials: 'AL',
    email: 'alex.lin@vikosmos.com',
  },
  {
    name: 'Jamie Chen',
    initials: 'JC',
    email: 'jamie.chen@vikosmos.com',
  },
  {
    name: 'Morgan Wu',
    initials: 'MW',
    email: 'morgan.wu@vikosmos.com',
  },
];

export function ItemGroupedRowsExample() {
  return (
    <ItemGroup className="w-96 max-w-full rounded border border-grayscale-opacity-300">
      {people.map(({ name, initials, email }, index) => (
        <Fragment key={name}>
          <Item size="list">
            <ItemMedia variant="image">
              <span className="grid size-full place-content-center rounded-full bg-grayscale-opacity-100 text-xs text-grayscale-opacity-700">
                {initials}
              </span>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{name}</ItemTitle>
              <ItemDescription>{email}</ItemDescription>
            </ItemContent>
          </Item>
          {index < people.length - 1 && <ItemSeparator />}
        </Fragment>
      ))}
    </ItemGroup>
  );
}
