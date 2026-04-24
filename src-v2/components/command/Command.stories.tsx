import { type Meta, type StoryObj } from '@storybook/react';
import Command from './Command';
import {
  ActionListCommandDemo,
  BasicCommandDemo,
  InfiniteScrollCommandDemo,
  VirtualizedCommandDemo,
} from './CommandListDemos';
import {
  ApproverCommandDemo,
  WithTriggerCommandDemo,
} from './CommandNestedDemos';

type Story = StoryObj<typeof Command>;

const meta: Meta<typeof Command> = {
  title: 'Components/Command',
  component: Command,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const Basic: Story = {
  render: function Render() {
    return <BasicCommandDemo />;
  },
};

export const ActionListPreset: Story = {
  render: function Render() {
    return <ActionListCommandDemo />;
  },
};

export const NestedPages: Story = {
  render: function Render() {
    return <ApproverCommandDemo />;
  },
};

export const WithTrigger: Story = {
  render: function Render() {
    return <WithTriggerCommandDemo />;
  },
};

export const InfiniteScroll: Story = {
  render: function Render() {
    return <InfiniteScrollCommandDemo />;
  },
};

export const Virtualized: Story = {
  render: function Render() {
    return <VirtualizedCommandDemo />;
  },
};
