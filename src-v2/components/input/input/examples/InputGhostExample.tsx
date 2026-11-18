'use client';

import { Input } from '@/components/input/input/Input';
import { useState } from 'react';

export function InputGhostExample() {
  const [value, setValue] = useState('');

  return (
    <Input
      appearance="ghost"
      className="w-112.5"
      placeholder="Borderless until hover or focus"
      value={value}
      onValueChange={setValue}
    />
  );
}
