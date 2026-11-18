'use client';

import { Calendar } from '@/components/calendar/Calendar';
import { useState } from 'react';
import type { DateRange } from 'react-day-picker';

export function CalendarRangeExample() {
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(2026, 0, 1),
    to: new Date(2026, 0, 9),
  });

  return (
    <Calendar
      mode="range"
      defaultMonth={new Date(2026, 0)}
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
    />
  );
}
