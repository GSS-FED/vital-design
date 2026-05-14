import { type Meta, type StoryObj } from '@storybook/react';
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

type Story = StoryObj<typeof Progress>;

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
};

export default meta;

export const Default: Story = {
  render: () => <Progress aria-label="Upload progress" value={64} />,
};

export const WithLabel: Story = {
  render: () => (
    <ProgressRoot value={42} className="w-80">
      <div className="flex items-center gap-3">
        <ProgressLabel>Export data</ProgressLabel>
        <ProgressValue />
      </div>
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressRoot>
  ),
};

export const Segments: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <ProgressSegments
        aria-label="Monthly status"
        className="w-[118px] gap-0.5"
      >
        <ProgressSegment className="w-2 bg-success-500" />
        <ProgressSegment className="w-2 bg-warning-500" />
        <ProgressSegment className="w-2 bg-grayscale-600" />
        <ProgressSegment className="w-2 bg-destructive-500" />
        {Array.from({ length: 8 }).map((_, index) => (
          <ProgressSegment
            key={index}
            className="w-2"
            data-state="inactive"
          />
        ))}
      </ProgressSegments>
      <ProgressSegments
        aria-label="Quarterly status"
        className="w-[118px] gap-[3px]"
      >
        <ProgressSegment className="flex-1 bg-success-500" />
        <ProgressSegment className="flex-1 bg-warning-500" />
        <ProgressSegment className="flex-1 bg-grayscale-600" />
        <ProgressSegment className="flex-1" data-state="inactive" />
      </ProgressSegments>
      <ProgressSegments
        aria-label="Yearly status"
        className="w-[118px]"
      >
        <ProgressSegment className="flex-1 bg-success-500" />
      </ProgressSegments>
    </div>
  ),
};

export const CustomSegments: Story = {
  render: () => (
    <ProgressSegments
      aria-label="Review status"
      className="w-[118px] gap-0"
      joint="connected"
    >
      <ProgressSegment
        aria-label="Complete"
        className="flex-1 bg-success-500"
      />
      <ProgressSegment
        aria-label="Pending review"
        className="flex-1 bg-warning-500"
      />
      <ProgressSegment
        aria-label="Waiting"
        className="flex-1 bg-grayscale-600"
      />
      <ProgressSegment
        aria-label="Not started"
        className="flex-1"
        data-state="inactive"
      />
    </ProgressSegments>
  ),
};
