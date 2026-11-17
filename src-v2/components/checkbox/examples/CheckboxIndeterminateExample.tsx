'use client';

import { Checkbox } from '@/components/checkbox/Checkbox';
import { Field, FieldLabel } from '@/components/field/Field';
import { useState } from 'react';

const items = [
  { id: 'email', label: 'Email' },
  { id: 'sms', label: 'SMS' },
  { id: 'push', label: 'Push notifications' },
];

export function CheckboxIndeterminateExample() {
  const [selected, setSelected] = useState<string[]>(['email']);
  const allChecked = selected.length === items.length;
  const someChecked = selected.length > 0 && !allChecked;

  return (
    <div className="flex flex-col gap-3">
      <Field orientation="horizontal" className="w-auto">
        <Checkbox
          id="checkbox-select-all"
          checked={allChecked}
          indeterminate={someChecked}
          onCheckedChange={(checked) =>
            setSelected(checked ? items.map((item) => item.id) : [])
          }
        />
        <FieldLabel htmlFor="checkbox-select-all">
          Select all
        </FieldLabel>
      </Field>
      {items.map((item) => (
        <Field
          key={item.id}
          orientation="horizontal"
          className="w-auto pl-6"
        >
          <Checkbox
            id={`checkbox-${item.id}`}
            checked={selected.includes(item.id)}
            onCheckedChange={(checked) =>
              setSelected((current) =>
                checked
                  ? [...current, item.id]
                  : current.filter((id) => id !== item.id),
              )
            }
          />
          <FieldLabel htmlFor={`checkbox-${item.id}`}>
            {item.label}
          </FieldLabel>
        </Field>
      ))}
    </div>
  );
}
