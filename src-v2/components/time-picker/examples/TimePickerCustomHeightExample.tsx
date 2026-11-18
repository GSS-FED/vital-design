'use client';

import { TimePicker } from '@/components/time-picker/TimePicker';
import { useState } from 'react';

export function TimePickerCustomHeightExample() {
  const [value, setValue] = useState(new Date(2026, 0, 1, 9, 30));

  return (
    <TimePicker
      value={value}
      onValueChange={setValue}
      className="h-60"
    />
  );
}
