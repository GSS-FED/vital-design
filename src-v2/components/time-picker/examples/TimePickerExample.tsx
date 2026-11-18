'use client';

import { TimePicker } from '@/components/time-picker/TimePicker';
import { format } from 'date-fns';
import { useState } from 'react';

export function TimePickerExample() {
  const [value, setValue] = useState(new Date(2026, 0, 1, 9, 30));

  return (
    <div className="flex flex-col items-center gap-4">
      <TimePicker value={value} onValueChange={setValue} />
      <code className="text-sm text-grayscale-opacity-600">
        {format(value, 'HH:mm:ss')}
      </code>
    </div>
  );
}
