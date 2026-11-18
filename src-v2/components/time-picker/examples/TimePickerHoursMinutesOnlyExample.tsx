'use client';

import { TimePicker } from '@/components/time-picker/TimePicker';
import { useState } from 'react';

export function TimePickerHoursMinutesOnlyExample() {
  const [value, setValue] = useState(new Date(2026, 0, 1, 14, 0));

  return (
    <TimePicker
      value={value}
      onValueChange={setValue}
      showSeconds={false}
    />
  );
}
