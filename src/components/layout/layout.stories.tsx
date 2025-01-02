import { Meta, StoryObj } from '@storybook/react';
import Layout from './layout';

type Story = StoryObj<typeof Layout>;

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
};
export default meta;

export const Default: Story = {
  argTypes: {},
  args: {
    header: <div>My header</div>,
    sidebar: (
      <div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
      </div>
    ),
    children: <div>some production</div>,
  },
};
