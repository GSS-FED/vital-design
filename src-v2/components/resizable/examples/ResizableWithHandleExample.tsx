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

export function ResizableWithHandleExample() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[200px] max-w-md rounded-md border border-grayscale-opacity-300"
    >
      <ResizablePanel defaultSize="30%" minSize="20%">
        <PanelContent>Sidebar</PanelContent>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="70%">
        <PanelContent>Content</PanelContent>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
