'use client';

import { Textarea } from '@/components/textarea/Textarea';
import { useState } from 'react';

export function TextareaExample() {
  const [text, setText] = useState('');

  return (
    <Textarea
      aria-label="Feedback"
      className="w-112.5"
      placeholder="Tell us what you think..."
      value={text}
      onChange={(event) => setText(event.currentTarget.value)}
    />
  );
}
