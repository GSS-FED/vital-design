'use client';

import { Button } from '@/components/button/Button';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
} from '@/components/item/Item';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
} from '@/components/popover/Popover';
import { Fragment, useState } from 'react';

type Person = {
  name: string;
  email: string;
};

const people: Person[] = [
  { name: 'Alex Lin', email: 'alex.lin@vikosmos.com' },
  { name: 'Jamie Chen', email: 'jamie.chen@vikosmos.com' },
  { name: 'Morgan Wu', email: 'morgan.wu@vikosmos.com' },
];

export function PopoverAnchorExample() {
  const [active, setActive] = useState<Person | null>(null);
  const [anchor, setAnchor] = useState<Element | null>(null);

  return (
    <>
      <ItemGroup className="w-80 max-w-full rounded border border-grayscale-opacity-300">
        {people.map((person, index) => (
          <Fragment key={person.name}>
            <Item size="list">
              <ItemContent>
                <ItemTitle>{person.name}</ItemTitle>
              </ItemContent>
              <ItemActions>
                <Button
                  variant="ghost"
                  size="md"
                  onClick={(event) => {
                    setAnchor(
                      event.currentTarget.closest(
                        '[data-slot="item"]',
                      ),
                    );
                    setActive(person);
                  }}
                >
                  Details
                </Button>
              </ItemActions>
            </Item>
            {index < people.length - 1 && <ItemSeparator />}
          </Fragment>
        ))}
      </ItemGroup>
      <Popover
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      >
        <PopoverContent anchor={anchor} side="right" className="w-64">
          {active && (
            <div className="space-y-1">
              <PopoverTitle>{active.name}</PopoverTitle>
              <PopoverDescription>{active.email}</PopoverDescription>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </>
  );
}
