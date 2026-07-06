import { type Meta, type StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { Badge } from './Badge';

type Story = StoryObj<typeof Badge>;

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: {
    variant: 'primary',
    size: 'lg',
    type: 'number',
    children: '9',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [
        'primary',
        'success',
        'warning',
        'destructive',
        'info',
      ],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: 'inline-radio',
      options: ['number', 'text'],
    },
  },
};
export default meta;

export const Default: Story = {};

export const Warning: Story = {
  args: { variant: 'warning' },
};

export const Number: Story = {
  args: { type: 'number', children: '9' },
};

export const Text: Story = {
  args: { type: 'text', children: '文字' },
};

export const Dot: Story = {
  args: { size: 'sm', children: undefined },
};

const VARIANTS = [
  'primary',
  'success',
  'warning',
  'destructive',
  'info',
] as const;

export const AllVariants: Story = {
  render: function Render() {
    return (
      <Grid>
        {VARIANTS.map((variant) => (
          <Column key={variant}>
            <Label>{variant}</Label>
            <Badge size="lg" type="number" variant={variant}>
              9
            </Badge>
            <Badge size="lg" type="text" variant={variant}>
              文字
            </Badge>
            <Badge size="md" type="number" variant={variant}>
              9
            </Badge>
            <Badge size="md" type="text" variant={variant}>
              文字
            </Badge>
            <Badge size="sm" variant={variant} />
          </Column>
        ))}
      </Grid>
    );
  },
};

const Grid = styled.div`
  display: flex;
  gap: 40px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const Label = styled.span`
  font-size: 12px;
  color: #666;
`;
