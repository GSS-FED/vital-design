'use client';

import {
  Editable,
  EditableDisplay,
  EditableInput,
} from '@/components/editable/Editable';

export function EditableExample() {
  return (
    <div className="w-80">
      <Editable defaultValue="Click to edit" placeholder="Not set">
        <EditableDisplay />
        <EditableInput />
      </Editable>
    </div>
  );
}
