'use client';

import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from '@/components/slider/Slider';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

function SliderParts({ range = false }: { range?: boolean }) {
  return (
    <SliderControl>
      <SliderTrack>
        <SliderIndicator />
      </SliderTrack>
      {range ? (
        <>
          <SliderThumb index={0} />
          <SliderThumb index={1} />
        </>
      ) : (
        <SliderThumb />
      )}
    </SliderControl>
  );
}

function HorizontalFrame({ children }: { children: ReactNode }) {
  return <div className="w-[225px]">{children}</div>;
}

export function SliderPreview() {
  const [value, setValue] = useState(50);

  return (
    <ComponentPreview>
      <HorizontalFrame>
        <Slider
          value={value}
          onValueChange={(nextValue) => {
            if (typeof nextValue === 'number') {
              setValue(nextValue);
            }
          }}
        >
          <div className="mb-2 flex items-center justify-between">
            <SliderLabel>Volume</SliderLabel>
            <SliderValue />
          </div>
          <SliderParts />
        </Slider>
      </HorizontalFrame>
    </ComponentPreview>
  );
}

export function SliderRangePreview() {
  const [value, setValue] = useState<readonly number[]>([20, 80]);

  return (
    <ComponentPreview>
      <HorizontalFrame>
        <Slider
          value={value}
          onValueChange={(nextValue) => {
            if (Array.isArray(nextValue)) {
              setValue(nextValue);
            }
          }}
        >
          <SliderParts range />
        </Slider>
      </HorizontalFrame>
    </ComponentPreview>
  );
}

export function SliderDisabledPreview() {
  return (
    <ComponentPreview>
      <HorizontalFrame>
        <Slider defaultValue={40} disabled>
          <SliderParts />
        </Slider>
      </HorizontalFrame>
    </ComponentPreview>
  );
}

export function SliderStepPreview() {
  return (
    <ComponentPreview>
      <HorizontalFrame>
        <Slider defaultValue={40} step={10}>
          <SliderParts />
        </Slider>
      </HorizontalFrame>
    </ComponentPreview>
  );
}

export function SliderMinMaxPreview() {
  return (
    <ComponentPreview>
      <HorizontalFrame>
        <Slider defaultValue={20} max={40} min={-40} step={20}>
          <SliderParts />
          <div className="mt-2 flex justify-between font-sans text-sm text-grayscale-opacity-600">
            <span>-40</span>
            <span>40</span>
          </div>
        </Slider>
      </HorizontalFrame>
    </ComponentPreview>
  );
}

export function SliderVerticalPreview() {
  return (
    <ComponentPreview>
      <div className="flex h-48 items-center justify-center">
        <Slider defaultValue={60} orientation="vertical">
          <SliderParts />
        </Slider>
      </div>
    </ComponentPreview>
  );
}
