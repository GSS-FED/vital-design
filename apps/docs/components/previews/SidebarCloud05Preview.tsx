'use client';

import { CloudSidebar } from '@/blocks/sidebar-cloud-05/components/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/sidebar/Sidebar';
import { Skeleton } from '@/components/skeleton/Skeleton';
import type { CSSProperties } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const DEMO_FRAME =
  'relative h-[420px] w-full overflow-hidden rounded-lg border border-sidebar-border ' +
  '[&_[data-slot=sidebar-wrapper]]:h-full ' +
  '[&_[data-slot=sidebar-wrapper]]:min-h-0 ' +
  '[&_[data-slot=sidebar-container]]:!absolute ' +
  '[&_[data-slot=sidebar-container]]:!inset-y-0 ' +
  '[&_[data-slot=sidebar-container]]:!h-full ' +
  '[&_[data-slot=sidebar-container]]:!max-h-full';

const providerStyle = {
  '--sidebar-width': '180px',
  '--sidebar-width-icon': '56px',
} as CSSProperties;

export function SidebarCloud05Preview() {
  return (
    <ComponentPreview name="SidebarCloud05Preview">
      <div className={DEMO_FRAME}>
        <SidebarProvider
          defaultOpen
          enableKeyboardShortcut={false}
          className="h-full min-h-0 w-full"
          style={providerStyle}
        >
          <CloudSidebar collapsible="icon" />
          <SidebarInset className="bg-white">
            <header className="flex h-12 shrink-0 items-center gap-2 border-b border-sidebar-border px-3 md:hidden">
              <SidebarTrigger />
            </header>
            <div className="flex flex-col gap-4 p-6">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-36 w-full rounded-lg" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ComponentPreview>
  );
}
