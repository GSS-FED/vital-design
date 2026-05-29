import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/input/input-group/InputGroup';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/popover/Popover';
import { CalendarIcon } from '@/icons/CalendarIcon';
import { type Meta, type StoryObj } from '@storybook/react';
import { addDays, format } from 'date-fns';
import { useState } from 'react';
import { type DateRange, defaultDateLib } from 'react-day-picker';
import { enUS, ja, th, zhTW } from 'react-day-picker/locale';
import { Calendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar mode="single" selected={date} onSelect={setDate} />
    );
  },
};

export const Range: Story = {
  render: function Render() {
    const [range, setRange] = useState<DateRange | undefined>({
      from: new Date(),
      to: addDays(new Date(), 8),
    });
    return (
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
        numberOfMonths={2}
      />
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();
    const today = new Date();
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        disabled={[
          { before: addDays(today, -7) },
          { after: addDays(today, 7) },
        ]}
      />
    );
  },
};

export const DropdownCaption: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        captionLayout="dropdown"
        startMonth={new Date(2000, 0)}
        endMonth={new Date(2030, 11)}
      />
    );
  },
};

/**
 * Localize by passing a `react-day-picker/locale` import as `locale` — the
 * weekday header, caption, and dropdown labels all follow it. `Calendar` ships
 * no default formatters, so the locale is the single source of language.
 */
export const Locale: Story = {
  render: ({ locale }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={locale}
        captionLayout="dropdown"
        startMonth={new Date(2000, 0)}
        endMonth={new Date(2030, 11)}
      />
    );
  },

  argTypes: {
    locale: {
      control: 'select',
      options: ['zh-TW', 'en-US', 'ja', 'th'],
      mapping: { 'zh-TW': zhTW, 'en-US': enUS, ja: ja, th: th },
    },
  },
  args: {
    locale: zhTW,
  },
};

/**
 * `locale` and `formatters` are separate layers: the locale picks the language
 * and data, a formatter shapes how it renders. Here the month dropdown shows
 * the locale's short month (`1月`, `2月` …) via `dateLib.format(date, 'LLL')`
 * instead of the locale default full name (`一月`). The `dateLib` argument
 * carries the active locale, so formatting through it stays localized.
 */
export const LocaleWithFormatter: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        locale={zhTW}
        captionLayout="dropdown"
        startMonth={new Date(2000, 0)}
        endMonth={new Date(2030, 11)}
        formatters={{
          formatMonthDropdown: (month, dateLib) =>
            (dateLib ?? defaultDateLib).format(month, 'LLL'),
        }}
      />
    );
  },
};

export const InsideDatePicker: Story = {
  parameters: { layout: 'padded' },
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>();
    const [open, setOpen] = useState(false);

    return (
      <div className="w-96">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <InputGroup className="cursor-pointer">
                <InputGroupInput
                  readOnly
                  value={date ? format(date, 'yyyy/MM/dd') : ''}
                  placeholder="Pick a date"
                  className="cursor-pointer"
                />
                <InputGroupAddon align="inline-end">
                  <CalendarIcon className="size-4 text-grayscale-opacity-500" />
                </InputGroupAddon>
              </InputGroup>
            }
          />
          <PopoverContent className="p-0" sideOffset={8}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(next) => {
                setDate(next);
                if (next) setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
