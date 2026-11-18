'use client';

import { Calendar } from '@/components/calendar/Calendar';
import { useState } from 'react';
import { zhTW } from 'react-day-picker/locale';

export function CalendarLocaleExample() {
  const [date, setDate] = useState<Date | undefined>(
    new Date(2026, 0, 1),
  );

  return (
    <Calendar
      mode="single"
      defaultMonth={new Date(2026, 0)}
      selected={date}
      onSelect={setDate}
      locale={zhTW}
      captionLayout="dropdown"
      startMonth={new Date(2000, 0)}
      endMonth={new Date(2030, 11)}
    />
  );
}
