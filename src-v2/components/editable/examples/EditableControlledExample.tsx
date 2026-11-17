'use client';

import {
  Editable,
  EditableDisplay,
  EditableInput,
} from '@/components/editable/Editable';
import { useState } from 'react';

export function EditableControlledExample() {
  const [value, setValue] = useState('Alice');

  return (
    <div className="flex w-80 flex-col gap-2">
      <Editable
        value={value}
        onCommit={setValue}
        placeholder="Enter a name"
      >
        <EditableDisplay />
        <EditableInput />
      </Editable>
      <p className="font-sans text-xs text-grayscale-opacity-500">
        Current value: {value || '(empty)'}
      </p>
    </div>
  );
}
