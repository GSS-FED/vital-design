'use client';

import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@/components/slider/Slider';

export function SliderStepExample() {
  return (
    <div className="w-[225px]">
      <Slider defaultValue={40} step={10}>
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
