import { cn } from '@/lib/utils';
import { Progress as BaseProgress } from '@base-ui/react/progress';
import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef, ElementRef } from 'react';

export type ProgressRootProps = BaseProgress.Root.Props;

function ProgressRoot({ className, ...props }: ProgressRootProps) {
  return (
    <BaseProgress.Root
      data-slot="progress"
      className={cn(
        'grid w-full gap-1.5 font-sans text-sm leading-5 text-grayscale-800',
        className,
      )}
      {...props}
    />
  );
}

export type ProgressProps = ProgressRootProps;

function Progress({
  children,
  className,
  value,
  ...props
}: ProgressProps) {
  return (
    <ProgressRoot value={value} className={className} {...props}>
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressRoot>
  );
}

export type ProgressTrackProps = BaseProgress.Track.Props;

function ProgressTrack({ className, ...props }: ProgressTrackProps) {
  return (
    <BaseProgress.Track
      data-slot="progress-track"
      className={cn(
        'relative flex h-1.5 w-full items-center overflow-hidden rounded-(--radius-full) bg-grayscale-200',
        className,
      )}
      {...props}
    />
  );
}

export type ProgressIndicatorProps = BaseProgress.Indicator.Props;

function ProgressIndicator({
  className,
  ...props
}: ProgressIndicatorProps) {
  return (
    <BaseProgress.Indicator
      data-slot="progress-indicator"
      className={cn(
        'h-full rounded-(--radius-full) bg-primary-500 transition-all',
        className,
      )}
      {...props}
    />
  );
}

export type ProgressLabelProps = BaseProgress.Label.Props;

function ProgressLabel({ className, ...props }: ProgressLabelProps) {
  return (
    <BaseProgress.Label
      data-slot="progress-label"
      className={cn(
        'font-sans text-sm leading-5 font-medium text-grayscale-800',
        className,
      )}
      {...props}
    />
  );
}

export type ProgressValueProps = BaseProgress.Value.Props;

function ProgressValue({ className, ...props }: ProgressValueProps) {
  return (
    <BaseProgress.Value
      data-slot="progress-value"
      className={cn(
        'ml-auto font-sans text-sm leading-5 text-grayscale-600 tabular-nums',
        className,
      )}
      {...props}
    />
  );
}

export type ProgressSegmentsProps = Omit<
  ComponentPropsWithoutRef<'div'>,
  'role'
> & {
  joint?: 'separate' | 'connected';
};

const progressSegmentsClasses =
  'flex items-center [&>[data-slot=progress-segment]]:h-1.5 [&>[data-slot=progress-segment]]:rounded-(--radius-full) [&>[data-slot=progress-segment][data-state=inactive]]:h-0.5 [&>[data-slot=progress-segment][data-state=inactive]]:bg-grayscale-300 data-[joint=connected]:[&>[data-slot=progress-segment]:not(:first-child)]:rounded-l-none data-[joint=connected]:[&>[data-slot=progress-segment]:not(:last-child)]:rounded-r-none';

const ProgressSegments = forwardRef<
  HTMLDivElement,
  ProgressSegmentsProps
>(function ProgressSegments(
  { className, joint = 'separate', ...props },
  ref,
) {
  const ariaLabel = props['aria-label'];
  const ariaLabelledBy = props['aria-labelledby'];
  const hasAccessibleName =
    ariaLabel !== undefined || ariaLabelledBy !== undefined;

  return (
    <div
      ref={ref}
      data-joint={joint}
      data-slot="progress-segments"
      role={hasAccessibleName ? 'img' : undefined}
      aria-hidden={hasAccessibleName ? undefined : true}
      className={cn(progressSegmentsClasses, className)}
      {...props}
    />
  );
});

export type ProgressSegmentProps = ComponentPropsWithoutRef<'span'>;

const ProgressSegment = forwardRef<
  ElementRef<'span'>,
  ProgressSegmentProps
>(function ProgressSegment({ className, ...props }, ref) {
  return (
    <span
      ref={ref}
      data-slot="progress-segment"
      className={cn('block shrink-0', className)}
      {...props}
    />
  );
});

export {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressRoot,
  ProgressSegment,
  ProgressSegments,
  ProgressTrack,
  ProgressValue,
};
