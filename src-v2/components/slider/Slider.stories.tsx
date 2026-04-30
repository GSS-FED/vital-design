import { type Meta, type StoryObj } from '@storybook/react';
import { type ReactNode, useState } from 'react';
import Slider from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
};

export default meta;

type Story = StoryObj<typeof Slider>;

function SliderParts({ range = false }: { range?: boolean }) {
  return (
    <Slider.Control>
      <Slider.Track>
        <Slider.Indicator />
      </Slider.Track>
      {range ? (
        <>
          <Slider.Thumb index={0} />
          <Slider.Thumb index={1} />
        </>
      ) : (
        <Slider.Thumb />
      )}
    </Slider.Control>
  );
}

function HorizontalSliderFrame({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="w-[225px]">{children}</div>;
}

export const Default: Story = {
  args: {
    defaultValue: 50,
  },
  render: (args) => (
    <HorizontalSliderFrame>
      <Slider {...args}>
        <SliderParts />
      </Slider>
    </HorizontalSliderFrame>
  ),
};

export const Range: Story = {
  render: function RangeRender(args) {
    const [value, setValue] = useState<readonly number[]>([25, 75]);

    return (
      <HorizontalSliderFrame>
        <Slider
          {...args}
          value={value}
          onValueChange={(nextValue) => {
            if (Array.isArray(nextValue)) {
              setValue(nextValue);
            }
          }}
        >
          <SliderParts range />
        </Slider>
      </HorizontalSliderFrame>
    );
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: 50,
    disabled: true,
  },
  render: (args) => (
    <HorizontalSliderFrame>
      <Slider {...args}>
        <SliderParts />
        <div className="mt-2 flex justify-between font-sans text-sm text-grayscale-600">
          <span>{args.min}</span>
          <span>{args.max}</span>
        </div>
      </Slider>
    </HorizontalSliderFrame>
  ),
};

export const Step: Story = {
  args: {
    defaultValue: 40,
    step: 10,
  },
  render: (args) => (
    <HorizontalSliderFrame>
      <Slider {...args}>
        <SliderParts />
      </Slider>
    </HorizontalSliderFrame>
  ),
};

export const MinMax: Story = {
  args: {
    defaultValue: 20,
    max: 40,
    min: -40,
    step: 20,
  },
  render: (args) => (
    <HorizontalSliderFrame>
      <Slider {...args}>
        <SliderParts />
      </Slider>
    </HorizontalSliderFrame>
  ),
};

export const WithLabelAndValue: Story = {
  args: {
    defaultValue: 60,
  },
  render: (args) => (
    <HorizontalSliderFrame>
      <Slider {...args}>
        <div className="mb-2 flex items-center justify-between">
          <Slider.Label>Volume</Slider.Label>
          <Slider.Value />
        </div>
        <SliderParts />
      </Slider>
    </HorizontalSliderFrame>
  ),
};

export const Vertical: Story = {
  args: {
    defaultValue: 60,
    orientation: 'vertical',
  },
  render: (args) => (
    <div className="flex h-48 items-center justify-center">
      <Slider {...args}>
        <SliderParts />
      </Slider>
    </div>
  ),
};
