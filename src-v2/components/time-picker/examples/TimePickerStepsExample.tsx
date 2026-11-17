'use client';

import { TimePicker } from '@/components/time-picker/TimePicker';
import { useState } from 'react';

export function TimePickerStepsExample() {
  const [value, setValue] = useState(new Date(2026, 0, 1, 9, 0));

  return (
    <TimePicker
      value={value}
      onValueChange={setValue}
      minuteStep={15}
      showSeconds={false}
    />
  );
}
