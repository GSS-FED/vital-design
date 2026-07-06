import { render, screen, within } from '@testing-library/react';
import { expect, it } from 'vitest';
import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressRoot,
  ProgressSegment,
  ProgressSegments,
  ProgressTrack,
  ProgressValue,
} from './Progress';

it('renders the Base UI progress parts with Vital slots', () => {
  render(
    <ProgressRoot value={40} data-testid="progress">
      <div>
        <ProgressLabel>Export data</ProgressLabel>
        <ProgressValue />
      </div>
      <ProgressTrack data-testid="track">
        <ProgressIndicator data-testid="indicator" />
      </ProgressTrack>
    </ProgressRoot>,
  );

  expect(screen.getByRole('progressbar')).toHaveAttribute(
    'data-slot',
    'progress',
  );
  expect(screen.getByText('Export data')).toHaveAttribute(
    'data-slot',
    'progress-label',
  );
  expect(screen.getByText('40%')).toHaveAttribute(
    'data-slot',
    'progress-value',
  );
  expect(screen.getByTestId('track')).toHaveAttribute(
    'data-slot',
    'progress-track',
  );
  expect(screen.getByTestId('indicator')).toHaveAttribute(
    'data-slot',
    'progress-indicator',
  );
});

it('renders the shorthand progress with track and indicator', () => {
  render(<Progress value={75} aria-label="Upload" />);

  expect(screen.getByRole('progressbar')).toHaveAccessibleName(
    'Upload',
  );
  expect(screen.getByRole('progressbar')).toHaveClass(
    'text-grayscale-opacity-800',
  );
  expect(screen.getByRole('progressbar')).toContainHTML(
    'data-slot="progress-track"',
  );
  expect(screen.getByRole('progressbar')).toContainHTML(
    'data-slot="progress-indicator"',
  );
});

it('renders status segments with caller-owned fixed sizing', () => {
  render(
    <ProgressSegments
      aria-label="Monthly progress"
      className="gap-0.5"
    >
      <ProgressSegment
        aria-label="Complete"
        className="w-2 bg-success-500"
      />
      <ProgressSegment
        aria-label="Review"
        className="w-2 bg-warning-500"
      />
      <ProgressSegment
        aria-label="Waiting"
        className="w-2 bg-grayscale-opacity-600"
      />
      <ProgressSegment
        aria-label="Error"
        className="w-2 bg-destructive-500"
      />
      <ProgressSegment
        aria-label="Not started"
        className="w-2"
        data-state="inactive"
      />
    </ProgressSegments>,
  );

  const progress = screen.getByRole('img', {
    name: 'Monthly progress',
  });
  const complete = within(progress).getByLabelText('Complete');
  const error = within(progress).getByLabelText('Error');
  const inactive = within(progress).getByLabelText('Not started');

  expect(progress).toHaveClass('gap-0.5');
  expect(complete).toHaveClass('bg-success-500');
  expect(error).toHaveClass('bg-destructive-500');
  expect(inactive).toHaveAttribute('data-state', 'inactive');
});

it('renders status segments with caller-owned fluid sizing', () => {
  render(
    <ProgressSegments
      aria-label="Quarterly progress"
      className="w-full gap-[3px]"
    >
      <ProgressSegment
        aria-label="Complete"
        className="flex-1 bg-success-500"
      />
      <ProgressSegment
        aria-label="Review"
        className="flex-1 bg-warning-500"
      />
      <ProgressSegment
        aria-label="Waiting"
        className="flex-1 bg-grayscale-opacity-600"
      />
      <ProgressSegment
        aria-label="Not started"
        className="flex-1"
        data-state="inactive"
      />
    </ProgressSegments>,
  );

  const quarterly = screen.getByRole('img', {
    name: 'Quarterly progress',
  });

  expect(within(quarterly).getByLabelText('Complete')).toHaveClass(
    'flex-1',
    'bg-success-500',
  );
  expect(quarterly).toHaveClass('w-full', 'gap-[3px]');
});

it('supports connected segment joins for gapless bars', () => {
  render(
    <ProgressSegments
      aria-label="Connected progress"
      className="gap-0"
      joint="connected"
    >
      <ProgressSegment aria-label="Left" className="flex-1" />
      <ProgressSegment aria-label="Right" className="flex-1" />
    </ProgressSegments>,
  );

  const connected = screen.getByRole('img', {
    name: 'Connected progress',
  });

  expect(connected).toHaveAttribute('data-joint', 'connected');
  expect(connected).toHaveClass(
    'data-[joint=connected]:[&>[data-slot=progress-segment]:not(:first-child)]:rounded-l-none',
    'data-[joint=connected]:[&>[data-slot=progress-segment]:not(:last-child)]:rounded-r-none',
  );
});
