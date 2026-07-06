import { render, screen } from '@testing-library/react';
import { createRef } from 'react';
import { expect, it } from 'vitest';
import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from './Slider';
import type { SliderProps } from './Slider';

function renderSlider(rootProps: Partial<SliderProps> = {}) {
  return render(
    <Slider defaultValue={50} {...rootProps}>
      <SliderControl data-testid="control">
        <SliderTrack data-testid="track">
          <SliderIndicator data-testid="indicator" />
        </SliderTrack>
        <SliderThumb data-testid="thumb" />
      </SliderControl>
    </Slider>,
  );
}

it('renders the Base UI slider input with the default value', () => {
  renderSlider({ defaultValue: 30 });

  expect(screen.getByRole('slider')).toHaveAttribute(
    'aria-valuenow',
    '30',
  );
});

it('passes Base UI root props through to the range input', () => {
  renderSlider({ min: 10, max: 90, step: 5 });

  const input = screen.getByRole('slider');
  expect(input).toHaveAttribute('min', '10');
  expect(input).toHaveAttribute('max', '90');
  expect(input).toHaveAttribute('step', '5');
});

it('applies disabled state through Base UI', () => {
  renderSlider({ disabled: true });

  expect(screen.getByRole('slider')).toBeDisabled();
});

it('renders two Base UI inputs for a range slider', () => {
  render(
    <Slider defaultValue={[20, 80]}>
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
        </SliderTrack>
        <SliderThumb index={0} />
        <SliderThumb index={1} />
      </SliderControl>
    </Slider>,
  );

  const inputs = screen.getAllByRole('slider');
  expect(inputs).toHaveLength(2);
  expect(inputs[0]).toHaveAttribute('aria-valuenow', '20');
  expect(inputs[1]).toHaveAttribute('aria-valuenow', '80');
});

it('forwards refs from Base UI sub-components', () => {
  const ref = createRef<HTMLDivElement>();

  render(
    <Slider defaultValue={50}>
      <SliderControl ref={ref} data-testid="control">
        <SliderTrack>
          <SliderIndicator />
        </SliderTrack>
        <SliderThumb />
      </SliderControl>
    </Slider>,
  );

  expect(ref.current).toBe(screen.getByTestId('control'));
});

it('renders step dots when step is provided', () => {
  renderSlider({ defaultValue: 50, step: 25 });

  expect(screen.getAllByTestId('slider-step-dot')).toHaveLength(3);
});

it('does not render step dots when step is omitted', () => {
  renderSlider();

  expect(screen.queryAllByTestId('slider-step-dot')).toHaveLength(0);
});

it('renders Base UI label and value parts', () => {
  render(
    <Slider defaultValue={75}>
      <SliderLabel>Volume</SliderLabel>
      <SliderValue />
      <SliderControl>
        <SliderTrack>
          <SliderIndicator />
        </SliderTrack>
        <SliderThumb />
      </SliderControl>
    </Slider>,
  );

  expect(screen.getByText('Volume')).toBeInTheDocument();
  expect(screen.getByText('75')).toBeInTheDocument();
});

it('exposes named slider parts', () => {
  expect(SliderControl).toBeDefined();
  expect(SliderTrack).toBeDefined();
  expect(SliderIndicator).toBeDefined();
  expect(SliderThumb).toBeDefined();
});
