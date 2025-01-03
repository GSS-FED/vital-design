import { useArgs } from '@storybook/preview-api';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import DatePicker, { DatePickerProps } from './datePicker';

type Story = StoryObj<typeof DatePicker>;

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  argTypes: {
    value: {
      control: 'date',
    },
    dateFormat: {
      defaultValue: {
        summary: 'YYYY/MM/DD',
      },
    },
    calendarType: {
      defaultValue: {
        summary: 'gregory',
      },
      table: {
        category: 'Calendar',
      },
    },
    isROCYear: {
      defaultValue: {
        summary: false,
      },
      table: {
        category: 'Calendar',
      },
    },
    showFixedNumberOfWeeks: {
      defaultValue: {
        summary: true,
      },
      table: {
        category: 'Calendar',
      },
    },
    formatShortWeekday: {
      table: {
        category: 'Calendar',
      },
    },
    showQuickOption: {
      defaultValue: {
        summary: false,
      },
      table: {
        category: 'Calendar',
      },
    },
    disabled: {
      defaultValue: {
        summary: false,
      },
      table: {
        category: 'Disable',
      },
    },
    disabledTimePicker: {
      defaultValue: {
        summary: false,
      },
      table: {
        category: 'Disable',
      },
    },
    disabledSeconds: {
      defaultValue: {
        summary: false,
      },
      table: {
        category: 'Disable',
      },
    },
    disabledMonth: {
      defaultValue: {
        summary: false,
      },
      table: {
        category: 'Disable',
      },
    },
    disabledYear: {
      defaultValue: {
        summary: false,
      },
      table: {
        category: 'Disable',
      },
    },
  },
  args: {
    datePlaceholder: 'YYYY/MM/DD HH:mm:ss',
    timePlaceholder: 'HH:mm:ss',
    onChange: fn(),
  },
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs<DatePickerProps>();
    const onChange = (updatedValue: Date | null) => {
      updateArgs({ value: updatedValue });
    };
    return <DatePicker {...args} onChange={onChange} value={value} />;
  },
};

export const DateOnly: Story = {
  name: 'DatePicker Only',
  args: { disabledTimePicker: true, datePlaceholder: '請選擇日期' },
};

export const HideSecondsOption: Story = {
  name: 'Date & TimePicker Without Seconds',
  args: {
    disabledSeconds: true,
    datePlaceholder: 'YYY/MM/DD HH:mm',
    timePlaceholder: 'HH:mm',
  },
};

export const ROCYear: Story = {
  name: 'ROC (Taiwan) Year Calendar',
  args: { isROCYear: true, datePlaceholder: 'YYY/MM/DD HH:mm:ss' },
};

export const QuickOption: Story = {
  name: 'Allow Quick Option',
  args: { showQuickOption: true },
};
