'use client';

import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@/components/slider/Slider';

export function SliderVerticalExample() {
  return (
    <div className="flex h-48 items-center justify-center">
      <Slider defaultValue={60} orientation="vertical">
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
