import { type Meta, type StoryObj } from '@storybook/react';
import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from './ScrollArea';

const ITEMS = Array.from({ length: 24 }, (_, index) => ({
  label: `Activity ${index + 1}`,
  description:
    index % 3 === 0
      ? 'Needs review before publish'
      : 'Synced with the workspace',
}));

type Story = StoryObj<typeof ScrollArea>;

const meta: Meta<typeof ScrollArea> = {
  title: 'Components/ScrollArea',
  component: ScrollArea,
};

export default meta;

export const FadeEdges: Story = {
  render: () => (
    <ScrollArea
      className="h-64 w-80 rounded border border-grayscale-opacity-200 bg-white"
      overflowEdgeThreshold={1}
    >
      <ScrollAreaViewport className="h-full" fadeEdges>
        <div className="flex flex-col py-2">
          {ITEMS.map((item) => (
            <div key={item.label} className="px-4 py-2">
              <div className="text-sm leading-5 font-medium text-grayscale-opacity-800">
                {item.label}
              </div>
              <div className="text-xs leading-4 text-grayscale-opacity-500">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </ScrollAreaViewport>
    </ScrollArea>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ScrollArea className="h-64 w-80 rounded border border-grayscale-opacity-200 bg-white">
      <ScrollAreaViewport className="h-full">
        <div className="flex flex-col py-2">
          {ITEMS.map((item) => (
            <div key={item.label} className="px-4 py-2">
              <div className="text-sm leading-5 font-medium text-grayscale-opacity-800">
                {item.label}
              </div>
              <div className="text-xs leading-4 text-grayscale-opacity-500">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  ),
};
