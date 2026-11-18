'use client';

import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@/components/slider/Slider';

export function SliderDisabledExample() {
  return (
    <div className="w-[225px]">
      <Slider defaultValue={50} disabled>
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
