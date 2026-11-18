'use client';

import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@/components/slider/Slider';
import { useState } from 'react';

export function SliderRangeExample() {
  const [value, setValue] = useState<readonly number[]>([25, 75]);

  return (
    <div className="w-[225px]">
      <Slider
        value={value}
        onValueChange={(nextValue) => {
          if (Array.isArray(nextValue)) {
            setValue(nextValue);
          }
        }}
      >
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
          </SliderTrack>
          <SliderThumb index={0} />
          <SliderThumb index={1} />
        </SliderControl>
      </Slider>
    </div>
  );
}
