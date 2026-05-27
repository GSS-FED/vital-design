import { cn } from '@/lib/utils';
import { Slider as BaseSlider } from '@base-ui/react/slider';
import type {
  SliderControl as BaseSliderControl,
  SliderIndicator as BaseSliderIndicator,
  SliderLabel as BaseSliderLabel,
  SliderRoot as BaseSliderRoot,
  SliderThumb as BaseSliderThumb,
  SliderTrack as BaseSliderTrack,
  SliderValue as BaseSliderValue,
} from '@base-ui/react/slider';
import {
  createContext,
  forwardRef,
  useContext,
  useState,
} from 'react';
import type { ForwardedRef, ReactElement, Ref } from 'react';

export type SliderRootValue = number | readonly number[];

type SliderStepContextValue = {
  draggingThumbIndex: number | null;
  setDraggingThumbIndex: (index: number | null) => void;
  showStepDots: boolean;
};

const SliderStepContext = createContext<SliderStepContextValue>({
  draggingThumbIndex: null,
  setDraggingThumbIndex: () => undefined,
  showStepDots: false,
});

type ClassNameProp<State> =
  | string
  | ((state: State) => string | undefined);

function mergeClassName<State>(
  baseClassName: string,
  className?: ClassNameProp<State>,
) {
  if (typeof className === 'function') {
    return (state: State) => cn(baseClassName, className(state));
  }

  return cn(baseClassName, className);
}

const sliderRootClasses = 'w-full';

const sliderControlClasses =
  'relative flex h-4 w-full touch-none select-none items-center data-[orientation=vertical]:h-40 data-[orientation=vertical]:w-5 data-[orientation=vertical]:justify-center';

const sliderTrackClasses =
  'relative h-1 w-full rounded-[var(--radius-full)] bg-grayscale-opacity-200 data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5';

const sliderStepDotClasses =
  'pointer-events-none absolute z-[1] size-1 rounded-[var(--radius-full)] data-[orientation=horizontal]:top-1/2 data-[orientation=horizontal]:-translate-x-1/2 data-[orientation=horizontal]:-translate-y-1/2 data-[orientation=vertical]:left-1/2 data-[orientation=vertical]:-translate-x-1/2 data-[orientation=vertical]:translate-y-1/2';

const sliderIndicatorClasses =
  'rounded-[var(--radius-full)] bg-primary-500 data-[disabled]:bg-grayscale-opacity-400';

const sliderThumbClasses =
  'size-4 rounded-[var(--radius-full)] border-[5px] border-primary-500 bg-white shadow-base outline-none transition-[box-shadow] not-data-[disabled]:hover:ring-[3px] not-data-[disabled]:hover:ring-primary-200 data-[disabled]:hover:ring-[3px] data-[disabled]:hover:ring-grayscale-opacity-300 has-[:focus-visible]:shadow-focus-primary data-[disabled]:border-grayscale-opacity-400 data-[disabled]:shadow-none';

const sliderValueClasses =
  'font-sans text-sm text-grayscale-opacity-700';

const sliderLabelClasses =
  'font-sans text-sm text-grayscale-opacity-600';

export type SliderRootProps<
  Value extends SliderRootValue = SliderRootValue,
> = BaseSliderRoot.Props<Value>;

export type SliderProps<
  Value extends SliderRootValue = SliderRootValue,
> = SliderRootProps<Value>;

type SliderRootComponent = <
  Value extends SliderRootValue = SliderRootValue,
>(
  props: SliderRootProps<Value> & { ref?: Ref<HTMLDivElement> },
) => ReactElement | null;

const Slider = forwardRef(function Slider<
  Value extends SliderRootValue = SliderRootValue,
>(props: SliderRootProps<Value>, ref: ForwardedRef<HTMLDivElement>) {
  const [draggingThumbIndex, setDraggingThumbIndex] = useState<
    number | null
  >(null);
  const {
    className,
    max = 100,
    min = 0,
    orientation = 'horizontal',
    step = 1,
    ...rootProps
  } = props;

  return (
    <SliderStepContext.Provider
      value={{
        draggingThumbIndex,
        setDraggingThumbIndex,
        showStepDots: props.step !== undefined,
      }}
    >
      <BaseSlider.Root
        ref={ref}
        className={mergeClassName<BaseSliderRoot.State>(
          sliderRootClasses,
          className,
        )}
        max={max}
        min={min}
        orientation={orientation}
        step={step}
        {...rootProps}
      />
    </SliderStepContext.Provider>
  );
}) as SliderRootComponent;

export type SliderControlProps = BaseSliderControl.Props;

const SliderControl = forwardRef<HTMLDivElement, SliderControlProps>(
  function SliderControl({ className, ...props }, ref) {
    return (
      <BaseSlider.Control
        ref={ref}
        className={mergeClassName<BaseSliderControl.State>(
          sliderControlClasses,
          className,
        )}
        {...props}
      />
    );
  },
);

export type SliderTrackProps = BaseSliderTrack.Props;

type StepDotPositionInput = Pick<
  BaseSliderTrack.State,
  'max' | 'min' | 'step'
> &
  Pick<SliderStepContextValue, 'showStepDots'>;

function getStepDotPositions({
  max,
  min,
  showStepDots,
  step,
}: StepDotPositionInput) {
  const range = max - min;

  if (!showStepDots || range <= 0 || step <= 0) {
    return [];
  }

  const stepCount = Math.floor(range / step);

  return Array.from({ length: stepCount }, (_, index) => {
    const value = min + (index + 1) * step;

    return {
      position: ((value - min) * 100) / range,
      value,
    };
  }).filter(({ value }) => value < max);
}

function isStepDotActive(
  value: number,
  values: BaseSliderTrack.State['values'],
) {
  if (values.length === 0) {
    return false;
  }

  if (values.length === 1) {
    const [onlyValue = 0] = values;
    return value <= onlyValue;
  }

  const [firstValue = 0, secondValue = 0] = values;
  const lowerValue = Math.min(firstValue, secondValue);
  const upperValue = Math.max(firstValue, secondValue);

  return value >= lowerValue && value <= upperValue;
}

function SliderStepDots({ state }: { state: BaseSliderTrack.State }) {
  const { showStepDots } = useContext(SliderStepContext);
  const dots = getStepDotPositions({ ...state, showStepDots });

  if (dots.length === 0) {
    return null;
  }

  return (
    <>
      {dots.map(({ position, value }) => (
        <span
          key={value}
          aria-hidden="true"
          className={cn(
            sliderStepDotClasses,
            isStepDotActive(value, state.values)
              ? 'bg-white/50'
              : 'bg-grayscale-opacity-300',
          )}
          data-orientation={state.orientation}
          data-slot="slider-step-dot"
          data-testid="slider-step-dot"
          style={
            state.orientation === 'horizontal'
              ? { left: `${position}%` }
              : { bottom: `${position}%` }
          }
        />
      ))}
    </>
  );
}

const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(
  function SliderTrack({ children, className, ...props }, ref) {
    return (
      <BaseSlider.Track
        ref={ref}
        className={mergeClassName<BaseSliderTrack.State>(
          sliderTrackClasses,
          className,
        )}
        {...props}
        render={(trackProps, state) => (
          <div {...trackProps}>
            {children}
            <SliderStepDots state={state} />
          </div>
        )}
      />
    );
  },
);

export type SliderIndicatorProps = BaseSliderIndicator.Props;

const SliderIndicator = forwardRef<
  HTMLDivElement,
  SliderIndicatorProps
>(function SliderIndicator({ className, ...props }, ref) {
  return (
    <BaseSlider.Indicator
      ref={ref}
      className={mergeClassName<BaseSliderIndicator.State>(
        sliderIndicatorClasses,
        className,
      )}
      {...props}
    />
  );
});

export type SliderThumbProps = BaseSliderThumb.Props;

const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>(
  function SliderThumb(
    {
      className,
      index,
      onPointerCancel,
      onPointerDown,
      onPointerUp,
      ...props
    },
    ref,
  ) {
    const { draggingThumbIndex, setDraggingThumbIndex } =
      useContext(SliderStepContext);
    const thumbIndex = index ?? 0;

    return (
      <BaseSlider.Thumb
        ref={ref}
        className={(state) =>
          cn(
            sliderThumbClasses,
            state.dragging &&
              (draggingThumbIndex === thumbIndex ||
                (draggingThumbIndex === null &&
                  state.activeThumbIndex === thumbIndex)) &&
              'ring-[3px] ring-primary-200',
            typeof className === 'function'
              ? className(state)
              : className,
          )
        }
        index={index}
        onPointerCancel={(event) => {
          setDraggingThumbIndex(null);
          onPointerCancel?.(event);
        }}
        onPointerDown={(event) => {
          setDraggingThumbIndex(thumbIndex);
          onPointerDown?.(event);
        }}
        onPointerUp={(event) => {
          setDraggingThumbIndex(null);
          onPointerUp?.(event);
        }}
        {...props}
      />
    );
  },
);

export type SliderValueProps = BaseSliderValue.Props;

const SliderValue = forwardRef<HTMLOutputElement, SliderValueProps>(
  function SliderValue({ className, ...props }, ref) {
    return (
      <BaseSlider.Value
        ref={ref}
        className={mergeClassName<BaseSliderValue.State>(
          sliderValueClasses,
          className,
        )}
        {...props}
      />
    );
  },
);

export type SliderLabelProps = BaseSliderLabel.Props;

const SliderLabel = forwardRef<HTMLDivElement, SliderLabelProps>(
  function SliderLabel({ className, ...props }, ref) {
    return (
      <BaseSlider.Label
        ref={ref}
        className={mergeClassName<BaseSliderLabel.State>(
          sliderLabelClasses,
          className,
        )}
        {...props}
      />
    );
  },
);

export {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
};
