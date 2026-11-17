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

export function ResizableExample() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] max-w-md rounded-md border border-grayscale-opacity-300"
    >
      <ResizablePanel defaultSize="50%">
        <PanelContent>One</PanelContent>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize="50%">
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize="35%">
            <PanelContent>Two</PanelContent>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize="65%">
            <PanelContent>Three</PanelContent>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
