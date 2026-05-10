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
import { ClockIcon } from '@/icons/ClockIcon';
import { type Meta, type StoryObj } from '@storybook/react';
import { format } from 'date-fns';
import { useState } from 'react';
import { TimePicker } from './TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
  parameters: { layout: 'centered' },
};

export default meta;

type Story = StoryObj<typeof TimePicker>;

const at = (h: number, m: number, s = 0) => {
  const d = new Date();
  d.setHours(h, m, s, 0);
  return d;
};

export const Default: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date>(at(9, 30));
    return (
      <div className="flex flex-col items-center gap-4">
        <TimePicker value={value} onValueChange={setValue} />
        <code className="text-sm text-grayscale-600">
          {format(value, 'HH:mm:ss')}
        </code>
      </div>
    );
  },
};

export const HoursMinutesOnly: Story = {
  render: function Render() {
    const [value, setValue] = useState<Date>(at(14, 0));
    return (
      <TimePicker
        value={value}
        onValueChange={setValue}
        showSeconds={false}
      />
    );
  },
};

export const InsideTimePicker: Story = {
  parameters: { layout: 'padded' },
  render: function Render() {
    const [value, setValue] = useState<Date | undefined>();
    const [open, setOpen] = useState(false);

    return (
      <div className="w-96">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            render={
              <InputGroup className="cursor-pointer">
                <InputGroupInput
                  readOnly
                  value={value ? format(value, 'HH:mm:ss') : ''}
                  placeholder="Pick a time"
                  className="cursor-pointer"
                />
                <InputGroupAddon align="inline-end">
                  <ClockIcon
                    width={16}
                    height={16}
                    className="text-grayscale-500"
                  />
                </InputGroupAddon>
              </InputGroup>
            }
          />
          <PopoverContent className="p-0" sideOffset={8}>
            <TimePicker
              value={value}
              onValueChange={setValue}
              className="shadow-emphasis"
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  },
};
