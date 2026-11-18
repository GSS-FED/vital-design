'use client';

import { Calendar } from '@/components/calendar/Calendar';
import { useState } from 'react';

export function CalendarDisabledExample() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 0)}
      selected={date}
      onSelect={setDate}
      disabled={[
        { before: new Date(2025, 11, 25) },
        { after: new Date(2026, 0, 8) },
      ]}
    />
  );
}
