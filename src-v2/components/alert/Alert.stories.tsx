import Button from '@/components/button/Button';
import { Checkbox } from '@/components/checkbox/Checkbox';
import { ClearIcon } from '@/icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from './Alert';

type Story = StoryObj<typeof Alert>;

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    children: {
      control: false,
    },
  },
  decorators: [
    (Story) => (
      <div className="grid w-105 max-w-full gap-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const Default: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>提示訊息</AlertTitle>
      <AlertDescription>描述文字</AlertDescription>
      <AlertAction>
        <Button size="medium" variant="text" theme="primary">
          我知道了
        </Button>
      </AlertAction>
    </Alert>
  ),
};

export const WithIcon: Story = {
  render: function WithIconRender(args) {
    return (
      <Alert {...args}>
        <ClearIcon />
        <AlertTitle>提示訊息</AlertTitle>
        <AlertDescription>描述文字</AlertDescription>
      </Alert>
    );
  },
};

export const WithAction: Story = {
  render: (args) => (
    <Alert {...args}>
      <AlertTitle>提示訊息</AlertTitle>
      <AlertDescription>描述文字</AlertDescription>
      <AlertAction>
        <Button size="medium" variant="text" theme="default">
          取消
        </Button>
        <Button size="medium" variant="text" theme="primary">
          我知道了
        </Button>
      </AlertAction>
    </Alert>
  ),
};

export const WithCustom: Story = {
  render: function Render(args) {
    const [checked, setChecked] = useState(false);
    return (
      <Alert {...args}>
        <AlertTitle>提示訊息</AlertTitle>
        <AlertDescription>
          描述文字
          <div className="mt-4">
            <Checkbox
              checked={checked}
              onChange={() => setChecked(!checked)}
            >
              今日不再詢問
            </Checkbox>
          </div>
        </AlertDescription>
        <AlertAction>
          <Button size="medium" variant="text" theme="default">
            取消
          </Button>
          <Button size="medium" variant="text" theme="primary">
            我知道了
          </Button>
        </AlertAction>
      </Alert>
    );
  },
};
