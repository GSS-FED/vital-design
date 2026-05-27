'use client';

import {
  ScrollArea,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '~/components/vital-components';

const items = Array.from({ length: 24 }, (_, index) => ({
  label: `Activity ${index + 1}`,
  description:
    index % 3 === 0
      ? 'Needs review before publish'
      : 'Synced with the workspace',
}));

function ScrollAreaItems() {
  return (
    <div className="flex flex-col py-2">
      {items.map((item) => (
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
  );
}

function ScrollAreaPreview() {
  return (
    <ScrollArea className="h-64 w-80 rounded border border-grayscale-opacity-200 bg-white">
      <ScrollAreaViewport className="h-full">
        <ScrollAreaItems />
      </ScrollAreaViewport>
      <ScrollAreaScrollbar>
        <ScrollAreaThumb />
      </ScrollAreaScrollbar>
    </ScrollArea>
  );
}

function ScrollAreaFadePreview() {
  return (
    <ScrollArea
      className="h-64 w-80 rounded border border-grayscale-opacity-200 bg-white"
      overflowEdgeThreshold={1}
    >
      <ScrollAreaViewport className="h-full" fadeEdges>
        <ScrollAreaItems />
      </ScrollAreaViewport>
    </ScrollArea>
  );
}

export { ScrollAreaFadePreview, ScrollAreaPreview };
