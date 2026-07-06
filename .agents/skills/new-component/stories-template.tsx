// Storybook Stories 模板
// 替換所有 ComponentName 為實際元件名稱
import { type Meta, type StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ComponentName from './ComponentName';

type Story = StoryObj<typeof ComponentName>;

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  args: {
    // 預設 props（callbacks 用 fn()）
    // onChange: fn(),
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    return <ComponentName {...args} />;
  },
};

// 如有多個 variant，新增對應 Story
// export const Disabled: Story = {
//   args: { disabled: true },
//   render: function Render(args) {
//     return <ComponentName {...args} />;
//   },
// };
