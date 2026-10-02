import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/sidebar/Sidebar';
import { Skeleton } from '@/components/skeleton/Skeleton';
import {
  type Decorator,
  type Meta,
  type StoryObj,
} from '@storybook/react';
import type { CSSProperties } from 'react';
import { CloudSidebar } from './components/app-sidebar';

const DEMO_FRAME =
  'relative h-160 overflow-hidden [&_[data-slot=sidebar-container]]:!absolute [&_[data-slot=sidebar-container]]:!h-full';

const withDemoFrame: Decorator = (Story) => (
  <div className={DEMO_FRAME}>
    <Story />
  </div>
);

const meta: Meta<typeof CloudSidebar> = {
  title: 'Blocks/Sidebar/Cloud/05 - Header Actions',
  component: CloudSidebar,
  decorators: [withDemoFrame],
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<typeof CloudSidebar>;

const providerStyle = {
  '--sidebar-width': '180px',
  '--sidebar-width-icon': '56px',
} as CSSProperties;

function DemoInset() {
  return (
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
  );
}

export const Default: Story = {
  render: function Render() {
    return (
      <SidebarProvider
        defaultOpen
        className="h-full min-h-0"
        style={providerStyle}
      >
        <CloudSidebar collapsible="icon" />
        <DemoInset />
      </SidebarProvider>
    );
  },
};

export const Floating: Story = {
  render: function Render() {
    return (
      <SidebarProvider
        defaultOpen
        className="h-full min-h-0"
        style={providerStyle}
      >
        <CloudSidebar variant="floating" collapsible="icon" />
        <DemoInset />
      </SidebarProvider>
    );
  },
};
