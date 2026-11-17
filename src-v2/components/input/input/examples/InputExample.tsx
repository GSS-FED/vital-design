'use client';

import { Input } from '@/components/input/input/Input';
import { useState } from 'react';

export function InputExample() {
  const [value, setValue] = useState('');

  return (
    <Input
      className="w-112.5"
      placeholder="Enter text..."
      value={value}
      onValueChange={setValue}
    />
  );
}
