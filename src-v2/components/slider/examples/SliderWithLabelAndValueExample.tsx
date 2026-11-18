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

export function SliderWithLabelAndValueExample() {
  const [value, setValue] = useState(60);

  return (
    <div className="w-[225px]">
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
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
          </SliderTrack>
          <SliderThumb />
        </SliderControl>
      </Slider>
    </div>
  );
}
