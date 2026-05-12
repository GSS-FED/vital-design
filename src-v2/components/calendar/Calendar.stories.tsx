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
import { ChevronDoubleLeftIcon } from '@/icons/ChevronDoubleLeftIcon';
import { ChevronDoubleRightIcon } from '@/icons/ChevronDoubleRightIcon';
import { ChevronLeftIcon } from '@/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '@/icons/ChevronRightIcon';
import { cn } from '@/lib/utils';
import { type Meta, type StoryObj } from '@storybook/react';
import { addDays, addYears, format } from 'date-fns';
import { useState } from 'react';
import {
  type DateRange,
  type NavProps,
  useDayPicker,
} from 'react-day-picker';
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
 * Vital preset: CJK weekday labels + `YYYY  M月` title via `formatters` only.
 */
export const CJKLocale: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const weekLabels = ['日', '一', '二', '三', '四', '五', '六'];
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        formatters={{
          formatWeekdayName: (d) => weekLabels[d.getDay()] ?? '',
          formatCaption: (d) =>
            `${d.getFullYear()}  ${d.getMonth() + 1}月`,
        }}
      />
    );
  },
};

/**
 * Vital preset: replace the default Nav with one that includes year-jump («»).
 * Done via the `components.Nav` slot exposed by react-day-picker, not by
 * adding props to our primitive.
 */
export const YearJumpNav: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const weekLabels = ['日', '一', '二', '三', '四', '五', '六'];
    return (
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        formatters={{
          formatWeekdayName: (d) => weekLabels[d.getDay()] ?? '',
          formatCaption: (d) =>
            `${d.getFullYear()}  ${d.getMonth() + 1}月`,
        }}
        components={{ Nav: YearJumpNavComponent }}
      />
    );
  },
};

function YearJumpNavComponent({ className }: NavProps) {
  const { months, previousMonth, nextMonth, goToMonth } =
    useDayPicker();
  const visibleMonth = months[0]?.date;

  const navButton = cn(
    'inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded text-grayscale-700 transition-colors duration-200 outline-none',
    'hover:bg-grayscale-100',
    'disabled:pointer-events-none disabled:text-grayscale-300',
  );

  return (
    <nav
      className={cn(
        'absolute inset-x-0 top-0 flex h-(--cell-size) w-full items-center justify-between px-1',
        className,
      )}
    >
      <div className="flex">
        <button
          type="button"
          aria-label="Previous year"
          disabled={!visibleMonth}
          onClick={() =>
            visibleMonth && goToMonth(addYears(visibleMonth, -1))
          }
          className={navButton}
        >
          <ChevronDoubleLeftIcon className="size-[11px]" />
        </button>
        <button
          type="button"
          aria-label="Previous month"
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          className={navButton}
        >
          <ChevronLeftIcon className="size-[11px]" />
        </button>
      </div>
      <div className="flex">
        <button
          type="button"
          aria-label="Next month"
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          className={navButton}
        >
          <ChevronRightIcon className="size-[11px]" />
        </button>
        <button
          type="button"
          aria-label="Next year"
          disabled={!visibleMonth}
          onClick={() =>
            visibleMonth && goToMonth(addYears(visibleMonth, 1))
          }
          className={navButton}
        >
          <ChevronDoubleRightIcon className="size-[11px]" />
        </button>
      </div>
    </nav>
  );
}

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
                  <CalendarIcon className="size-4 text-grayscale-500" />
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
