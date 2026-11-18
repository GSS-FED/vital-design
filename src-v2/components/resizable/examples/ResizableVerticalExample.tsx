'use client';

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/resizable/Resizable';

function PanelContent({ children }: { children: string }) {
  return (
    <div className="flex h-full items-center justify-center p-6 font-sans text-sm font-medium text-grayscale-opacity-800">
      {children}
    </div>
  );
}

export function ResizableVerticalExample() {
  return (
    <ResizablePanelGroup
      orientation="vertical"
      className="min-h-[240px] max-w-md rounded-md border border-grayscale-opacity-300"
    >
      <ResizablePanel defaultSize="30%">
        <PanelContent>Header</PanelContent>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="70%">
        <PanelContent>Content</PanelContent>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
