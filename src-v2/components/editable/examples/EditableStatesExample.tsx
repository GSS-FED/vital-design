'use client';

import {
  Editable,
  EditableDisplay,
  EditableInput,
} from '@/components/editable/Editable';

const states = [
  { label: 'Empty', props: { defaultValue: '' } },
  {
    label: 'Disabled',
    props: { defaultValue: 'Cannot edit', disabled: true },
  },
  {
    label: 'Read-only',
    props: { defaultValue: 'Read-only content', readOnly: true },
  },
];

export function EditableStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_20rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <Editable placeholder="Click to add a note" {...props}>
            <EditableDisplay />
            <EditableInput />
          </Editable>
        </div>
      ))}
    </div>
  );
}
