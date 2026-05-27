import { ChevronRightIcon } from '@/icons/ChevronRightIcon';
import { UserIcon } from '@/icons/UserIcon';
import { type Meta, type StoryObj } from '@storybook/react';
import { Fragment } from 'react';
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from './Item';

type Story = StoryObj<typeof Item>;

const meta: Meta<typeof Item> = {
  title: 'Components/Item',
  component: Item,
  args: {
    size: 'list',
    variant: 'default',
  },
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'xs', 'list'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'muted'],
    },
  },
};

export default meta;

export const TextRows: Story = {
  render: (args) => (
    <ItemGroup className="w-96">
      <Item {...args}>
        <ItemContent>
          <ItemTitle>Normal</ItemTitle>
        </ItemContent>
      </Item>
      <Item {...args} data-highlighted>
        <ItemContent>
          <ItemTitle>Hover</ItemTitle>
        </ItemContent>
      </Item>
      <Item {...args} data-active>
        <ItemContent>
          <ItemTitle>Active</ItemTitle>
        </ItemContent>
      </Item>
      <Item {...args} data-current>
        <ItemContent>
          <ItemTitle>Current</ItemTitle>
        </ItemContent>
      </Item>
      <Item {...args} data-disabled>
        <ItemContent>
          <ItemTitle>Disabled</ItemTitle>
        </ItemContent>
      </Item>
      <Item {...args}>
        <ItemContent>
          <ItemTitle>Selected</ItemTitle>
        </ItemContent>
      </Item>
    </ItemGroup>
  ),
};

export const DescriptionRows: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ItemGroup className="w-96">
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
  ),
};

export const IconRows: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ItemGroup className="w-96">
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
          <ChevronRightIcon className="size-[11px]" />
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
          <ChevronRightIcon className="size-[11px]" />
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
          <ChevronRightIcon className="size-[11px]" />
        </ItemActions>
      </Item>
    </ItemGroup>
  ),
};

export const ImageRows: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ItemGroup className="w-96">
      {['Normal', 'Hover', 'Active', 'Current', 'Disabled'].map(
        (label, index) => (
          <Item
            key={label}
            size="list"
            data-highlighted={index === 1 || undefined}
            data-active={index === 2 || undefined}
            data-current={index === 3 || undefined}
            data-disabled={index === 4 || undefined}
          >
            <ItemMedia variant="image">
              <span className="grid size-full place-content-center rounded-full border border-primary-200 bg-primary-50 text-sm text-primary-500">
                VD
              </span>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{label}</ItemTitle>
              {index === 0 || index === 3 ? (
                <ItemDescription>Description text</ItemDescription>
              ) : null}
            </ItemContent>
            {index < 3 ? (
              <ItemActions>
                <ChevronRightIcon className="size-[11px]" />
              </ItemActions>
            ) : null}
          </Item>
        ),
      )}
    </ItemGroup>
  ),
};

export const GroupedRows: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <ItemGroup className="w-96 rounded border border-grayscale-opacity-300">
      {['Alex Lin', 'Jamie Chen', 'Morgan Wu'].map((name, index) => (
        <Fragment key={name}>
          <Item size="list">
            <ItemMedia variant="image">
              <span className="grid size-full place-content-center rounded-full bg-grayscale-opacity-100 text-xs text-grayscale-opacity-700">
                {name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
              </span>
            </ItemMedia>
            <ItemContent>
              <ItemTitle>{name}</ItemTitle>
              <ItemDescription>
                {name.toLowerCase().replace(' ', '.')}@vikosmos.com
              </ItemDescription>
            </ItemContent>
          </Item>
          {index < 2 ? <ItemSeparator /> : null}
        </Fragment>
      ))}
    </ItemGroup>
  ),
};
