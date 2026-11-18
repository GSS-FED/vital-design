'use client';

import { Calendar } from '@/components/calendar/Calendar';
import { useState } from 'react';

export function CalendarDropdownCaptionExample() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 0)}
      selected={date}
      onSelect={setDate}
      captionLayout="dropdown"
      startMonth={new Date(2000, 0)}
      endMonth={new Date(2030, 11)}
    />
  );
}
