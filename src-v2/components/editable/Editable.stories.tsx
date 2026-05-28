import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Editable,
  EditableDisplay,
  EditableInput,
  EditableTextarea,
} from './Editable';

const meta: Meta<typeof Editable> = {
  title: 'Components/Editable',
  component: Editable,
};
export default meta;

type Story = StoryObj<typeof Editable>;

export const Default: Story = {
  render: () => (
    <div className="w-80">
      <Editable defaultValue="點擊以編輯" placeholder="未填寫">
        <EditableDisplay />
        <EditableInput />
      </Editable>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div className="w-80">
      <Editable defaultValue="" placeholder="點擊以新增備註">
        <EditableDisplay />
        <EditableInput />
      </Editable>
    </div>
  ),
};

export const Controlled: Story = {
  render: function ControlledStory() {
    const [value, setValue] = useState('Alice');
    return (
      <div className="flex w-80 flex-col gap-2">
        <Editable
          value={value}
          onCommit={setValue}
          placeholder="輸入姓名"
        >
          <EditableDisplay />
          <EditableInput />
        </Editable>
        <p className="font-sans text-xs text-grayscale-opacity-500">
          目前值：{value || '(空)'}
        </p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-80">
      <Editable defaultValue="無法編輯" disabled>
        <EditableDisplay />
        <EditableInput />
      </Editable>
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div className="w-80">
      <Editable defaultValue="唯讀內容" readOnly>
        <EditableDisplay />
        <EditableInput />
      </Editable>
    </div>
  ),
};

export const TextareaVariant: Story = {
  render: () => (
    <div className="w-80">
      <Editable
        defaultValue="這是一段較長的備註，點擊以編輯。"
        placeholder="點擊以新增備註"
      >
        <EditableDisplay />
        <EditableTextarea rows={3} />
      </Editable>
    </div>
  ),
};
