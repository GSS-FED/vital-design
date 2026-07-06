import { Button } from '@/components/button/Button';
import { type Meta, type StoryObj } from '@storybook/react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarSpacer,
} from './Toolbar';

type Story = StoryObj<typeof Toolbar>;

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
  args: {
    variant: 'default',
    size: 'default',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'bar', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'none'],
    },
  },
};

export default meta;

export const Default: Story = {
  render: (args) => (
    <Toolbar {...args}>
      <ToolbarGroup>
        <Button size="md" theme="default" variant="text">
          File
        </Button>
        <Button size="md" theme="default" variant="text">
          Edit
        </Button>
      </ToolbarGroup>
      <ToolbarSpacer />
      <ToolbarGroup>
        <Button size="md" theme="primary" variant="text">
          Save
        </Button>
      </ToolbarGroup>
    </Toolbar>
  ),
};

export const WithSeparator: Story = {
  render: (args) => (
    <Toolbar {...args} variant="outline">
      <ToolbarGroup>
        <Button size="md" theme="default" variant="text">
          Cut
        </Button>
        <Button size="md" theme="default" variant="text">
          Copy
        </Button>
        <Button size="md" theme="default" variant="text">
          Paste
        </Button>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <Button size="md" theme="default" variant="text">
          Undo
        </Button>
        <Button size="md" theme="default" variant="text">
          Redo
        </Button>
      </ToolbarGroup>
    </Toolbar>
  ),
};
