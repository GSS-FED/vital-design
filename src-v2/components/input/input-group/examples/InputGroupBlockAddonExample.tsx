'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from '@/components/input/input-group/InputGroup';
import { useState } from 'react';

export function InputGroupBlockAddonExample() {
  const [comment, setComment] = useState('Multiline content');

  return (
    <InputGroup className="w-112.5">
      <InputGroupAddon align="block-start" className="border-b">
        <InputGroupText>Comment</InputGroupText>
      </InputGroupAddon>
      <InputGroupTextarea
        aria-label="Comment"
        placeholder="Enter your message"
        value={comment}
        onChange={(event) => setComment(event.currentTarget.value)}
      />
    </InputGroup>
  );
}
