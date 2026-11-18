'use client';

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from '@/components/input/input-group/InputGroup';
import { PlusIcon } from '@/icons/PlusIcon';

const states = [
  { label: 'Default', props: {} },
  { label: 'Disabled', props: { disabled: true } },
  { label: 'Invalid', props: { 'aria-invalid': true } },
];

export function InputGroupStatesExample() {
  return (
    <div className="grid w-fit grid-cols-[auto_18rem] items-center gap-x-6 gap-y-3 text-sm text-grayscale-opacity-700">
      {states.map(({ label, props }) => (
        <div key={label} className="contents">
          <span>{label}</span>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>$</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput
              aria-label={`${label} amount`}
              defaultValue="2000"
              {...props}
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Increase"
                size="icon-xs"
                disabled={props.disabled}
              >
                <PlusIcon className="size-3.5" />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>
      ))}
    </div>
  );
}
