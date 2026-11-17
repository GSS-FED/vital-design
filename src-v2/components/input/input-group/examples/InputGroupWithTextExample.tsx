'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/input/input-group/InputGroup';
import { useState } from 'react';

export function InputGroupWithTextExample() {
  const [domain, setDomain] = useState('vital.example.com');

  return (
    <InputGroup className="w-112.5">
      <InputGroupAddon>
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Website"
        value={domain}
        onValueChange={setDomain}
      />
    </InputGroup>
  );
}
