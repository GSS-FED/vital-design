'use client';

import {
  Editable,
  EditableDisplay,
  EditableTextarea,
} from '@/components/editable/Editable';

export function EditableTextareaVariantExample() {
  return (
    <div className="w-80">
      <Editable
        defaultValue="A longer note. Click to edit."
        placeholder="Click to add a note"
      >
        <EditableDisplay />
        <EditableTextarea rows={3} />
      </Editable>
    </div>
  );
}
