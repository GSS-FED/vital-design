import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import NumberInput, { NumberInputProps } from './numberInput';

type Story = StoryObj<typeof NumberInput>;

const meta: Meta<typeof NumberInput> = {
  title: 'Components/Input/NumberInput',
  component: NumberInput,
  argTypes: {
    labelDirection: {
      options: ['horizontal', 'vertical'],
      defaultValue: {
        summary: 'vertical',
      },
    },
    value: {
      control: {
        type: 'number',
      },
    },
    mustFillIcon: {
      defaultValue: {
        summary: false,
      },
    },
    mustFillText: {
      defaultValue: {
        summary: false,
      },
    },
    step: {
      defaultValue: {
        summary: 1,
      },
    },
  },
  args: {
    width: '450px',
    onChange: fn(),
    value: 0,
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<NumberInputProps>();
    const onChange = (updatedValue: number | null) => {
      updateArgs({ value: updatedValue });
    };
    return (
      <NumberInput {...args} onChange={onChange} value={value} />
    );
  },
};

export const MinValue: Story = {
  name: 'Input Min Value ',
  args: {
    min: 1,
    value: 1,
  },
};

export const MaxValue: Story = {
  name: 'Input Max Value',
  args: {
    max: 20,
    value: 20,
  },
};

export const HorizontalLabel: Story = {
  name: 'Horizontal Label Direction',
  args: {
    label: '參加人數',
    hint: '提示文字',
    labelDirection: 'horizontal',
  },
};

export const VerticalLabel: Story = {
  name: 'Vertical Label Direction & Must Fill',
  args: {
    label: '參加人數',
    hint: '提示文字',
    labelDirection: 'vertical',
    mustFillIcon: true,
  },
};
