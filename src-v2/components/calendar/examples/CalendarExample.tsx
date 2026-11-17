'use client';

import { Calendar } from '@/components/calendar/Calendar';
import { useState } from 'react';

export function CalendarExample() {
  const [date, setDate] = useState<Date | undefined>(
    new Date(2026, 0, 1),
  );

  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 0)}
      selected={date}
      onSelect={setDate}
    />
  );
}
