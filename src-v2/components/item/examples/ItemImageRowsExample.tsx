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

const rows = [
  { label: 'Normal', description: true, action: true },
  {
    label: 'Hover',
    state: { 'data-highlighted': true },
    action: true,
  },
  { label: 'Active', state: { 'data-active': true }, action: true },
  {
    label: 'Current',
    state: { 'data-current': true },
    description: true,
  },
  { label: 'Disabled', state: { 'data-disabled': true } },
];

export function ItemImageRowsExample() {
  return (
    <ItemGroup className="w-96 max-w-full">
      {rows.map(({ label, state, description, action }) => (
        <Item key={label} size="list" {...state}>
          <ItemMedia variant="image">
            <span className="grid size-full place-content-center rounded-full border border-primary-200 bg-primary-50 text-sm text-primary-500">
              VD
            </span>
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{label}</ItemTitle>
            {description && (
              <ItemDescription>Description text</ItemDescription>
            )}
          </ItemContent>
          {action && (
            <ItemActions>
              <AngleRightIcon className="size-[11px]" />
            </ItemActions>
          )}
        </Item>
      ))}
    </ItemGroup>
  );
}
