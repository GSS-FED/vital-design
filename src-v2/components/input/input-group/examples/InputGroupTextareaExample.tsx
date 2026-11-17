'use client';

import {
  InputGroup,
  InputGroupTextarea,
} from '@/components/input/input-group/InputGroup';
import { useState } from 'react';

export function InputGroupTextareaExample() {
  const [message, setMessage] = useState('Multiline content');

  return (
    <InputGroup className="w-112.5">
      <InputGroupTextarea
        aria-label="Message"
        className="h-30"
        placeholder="Enter your message"
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
      />
    </InputGroup>
  );
}
