'use client';

import {
  NumberInput,
  NumberInputControl,
  NumberInputGroup,
  NumberInputSteppers,
} from '@/components/input/number-input/NumberInput';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

function Frame({ children }: { children: ReactNode }) {
  return <div className="w-[200px]">{children}</div>;
}

export function NumberInputPreview() {
  return (
    <ComponentPreview>
      <Frame>
        <NumberInput defaultValue={0}>
          <NumberInputGroup>
            <NumberInputControl placeholder="0" />
            <NumberInputSteppers />
          </NumberInputGroup>
        </NumberInput>
      </Frame>
    </ComponentPreview>
  );
}

export function NumberInputRangePreview() {
  return (
    <ComponentPreview>
      <Frame>
        <NumberInput defaultValue={5} min={0} max={10} step={1}>
          <NumberInputGroup>
            <NumberInputControl placeholder="0" />
            <NumberInputSteppers />
          </NumberInputGroup>
        </NumberInput>
      </Frame>
    </ComponentPreview>
  );
}

export function NumberInputDisabledPreview() {
  return (
    <ComponentPreview>
      <Frame>
        <NumberInput defaultValue={12} disabled>
          <NumberInputGroup>
            <NumberInputControl placeholder="0" />
            <NumberInputSteppers />
          </NumberInputGroup>
        </NumberInput>
      </Frame>
    </ComponentPreview>
  );
}

export function NumberInputErrorPreview() {
  return (
    <ComponentPreview>
      <Frame>
        <NumberInput defaultValue={99}>
          <NumberInputGroup>
            <NumberInputControl aria-invalid placeholder="0" />
            <NumberInputSteppers />
          </NumberInputGroup>
        </NumberInput>
      </Frame>
    </ComponentPreview>
  );
}

export function NumberInputDecimalsPreview() {
  return (
    <ComponentPreview>
      <Frame>
        <NumberInput
          defaultValue={1.5}
          step={0.1}
          smallStep={0.01}
          largeStep={1}
        >
          <NumberInputGroup>
            <NumberInputControl placeholder="0.0" />
            <NumberInputSteppers />
          </NumberInputGroup>
        </NumberInput>
      </Frame>
    </ComponentPreview>
  );
}

export function NumberInputCurrencyPreview() {
  return (
    <ComponentPreview>
      <Frame>
        <NumberInput
          defaultValue={1234}
          format={{
            style: 'currency',
            currency: 'TWD',
            maximumFractionDigits: 0,
          }}
        >
          <NumberInputGroup>
            <NumberInputControl placeholder="NT$0" />
            <NumberInputSteppers />
          </NumberInputGroup>
        </NumberInput>
      </Frame>
    </ComponentPreview>
  );
}

export function NumberInputControlledPreview() {
  const [value, setValue] = useState<number | null>(0);

  return (
    <ComponentPreview>
      <Frame>
        <div className="flex flex-col gap-2">
          <NumberInput
            value={value}
            onValueChange={(next) => setValue(next)}
            min={-50}
            max={50}
            step={5}
          >
            <NumberInputGroup>
              <NumberInputControl placeholder="0" />
              <NumberInputSteppers />
            </NumberInputGroup>
          </NumberInput>
          <span className="font-sans text-xs text-grayscale-opacity-600">
            目前值：{value ?? '空'}
          </span>
        </div>
      </Frame>
    </ComponentPreview>
  );
}
