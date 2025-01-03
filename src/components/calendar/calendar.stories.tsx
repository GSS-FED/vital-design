import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import Calendar, { CalendarProps } from './calendar';

type Story = StoryObj<typeof Calendar>;

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  argTypes: {
    value: {
      control: 'date',
    },
    isROCYear: {
      defaultValue: {
        summary: false,
      },
    },
    showFixedNumberOfWeeks: {
      defaultValue: {
        summary: true,
      },
    },
    calendarType: {
      defaultValue: {
        summary: 'gregory',
      },
    },
    disabledMonth: {
      defaultValue: {
        summary: false,
      },
    },
    disabledYear: {
      defaultValue: {
        summary: false,
      },
    },
    showQuickOption: {
      defaultValue: {
        summary: false,
      },
    },
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<CalendarProps>();
    const onChange = (
      updatedValue: Date | null | [Date | null, Date | null],
    ) => {
      updateArgs({ value: updatedValue });
    };
    return <Calendar {...args} onChange={onChange} value={value} />;
  },
};

export const ROCYear: Story = {
  name: 'ROC (Taiwan) Year Format',
  args: { isROCYear: true },
};

export const QuickOption: Story = {
  name: 'Allow Quick Option',
  args: { showQuickOption: true },
};
