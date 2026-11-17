'use client';

import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@/components/slider/Slider';

export function SliderMinMaxExample() {
  return (
    <div className="w-[225px]">
      <Slider defaultValue={20} min={-40} max={40} step={20}>
        <SliderControl>
          <SliderTrack>
            <SliderIndicator />
          </SliderTrack>
          <SliderThumb />
        </SliderControl>
        <div className="mt-2 flex justify-between font-sans text-sm text-grayscale-opacity-600">
          <span>-40</span>
          <span>40</span>
        </div>
      </Slider>
    </div>
  );
}
