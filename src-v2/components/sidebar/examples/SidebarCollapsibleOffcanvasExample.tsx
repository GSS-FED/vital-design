'use client';

import { Avatar } from '@/components/avatar/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from '@/components/sidebar/Sidebar';
import { CalendarDaysIcon } from '@/icons/CalendarDaysIcon';
import { CheckIcon } from '@/icons/CheckIcon';
import { ClockIcon } from '@/icons/ClockIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { FlagIcon } from '@/icons/FlagIcon';
import { MagnifyingGlassIcon } from '@/icons/MagnifyingGlassIcon';
import { PanelLeftIcon } from '@/icons/PanelLeftIcon';
import { UserIcon } from '@/icons/UserIcon';
import { type ReactNode } from 'react';

// Keeps the fixed sidebar inside this demo box. In an app, drop the frame:
// the sidebar is fixed to the viewport.
const DEMO_FRAME =
  'relative h-[640px] w-full overflow-hidden ' +
  '[&_[data-slot=sidebar-container]]:!absolute ' +
  '[&_[data-slot=sidebar-container]]:!inset-y-0 ' +
  '[&_[data-slot=sidebar-container]]:!h-full ' +
  '[&_[data-slot=sidebar-container]]:!max-h-full';

type NavItem = {
  label: string;
  icon: ReactNode;
  isActive?: boolean;
  items?: { label: string; isActive?: boolean }[];
};

const nav: { label: string; items: NavItem[] }[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', icon: <PanelLeftIcon />, isActive: true },
      { label: 'Inbox', icon: <MagnifyingGlassIcon /> },
      { label: 'Calendar', icon: <CalendarDaysIcon /> },
      { label: 'Approvals', icon: <CheckIcon /> },
    ],
  },
  {
    label: 'Workspace',
    items: [
      {
        label: 'Projects',
        icon: <FlagIcon />,
        items: [
          { label: 'In progress' },
          { label: 'Completed' },
          { label: 'Archived' },
        ],
      },
      { label: 'Clients', icon: <UserIcon /> },
      { label: 'Invoices', icon: <ClockIcon /> },
      { label: 'Reports', icon: <EllipsisIcon /> },
      { label: 'Documents', icon: <FlagIcon /> },
      { label: 'Analytics', icon: <MagnifyingGlassIcon /> },
    ],
  },
  {
    label: 'Organization',
    items: [
      { label: 'Members', icon: <UserIcon /> },
      { label: 'Roles & access', icon: <CheckIcon /> },
      { label: 'Billing', icon: <ClockIcon /> },
      { label: 'Integrations', icon: <PanelLeftIcon /> },
      { label: 'Audit log', icon: <EllipsisIcon /> },
    ],
  },
];

function BrandHeader() {
  const { state, isMobile } = useSidebar();
  const collapsed = !isMobile && state === 'collapsed';

  return (
    <SidebarHeader className="py-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton size="lg" tooltip="Workspace" />
              }
            >
              {collapsed ? (
                <img
                  src="/images/vital-logo.svg"
                  alt="Vittal"
                  className="size-8 object-contain"
                />
              ) : (
                <img
                  src="/images/vital-logo-text-h.svg"
                  alt="Vittal"
                  className="h-7 max-h-7 w-auto object-contain object-left"
                />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="start"
              sideOffset={16}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                <DropdownMenuItem>Vittal Design</DropdownMenuItem>
                <DropdownMenuItem>Vittal Finance</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Create workspace</DropdownMenuItem>
              <DropdownMenuItem>Workspace settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}

function NavMain() {
  return (
    <SidebarContent>
      {nav.map((group) => (
        <SidebarGroup key={group.label}>
          <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {group.items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    isActive={item.isActive && !item.items}
                    tooltip={item.label}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                  {item.items ? (
                    <SidebarMenuSub>
                      {item.items.map((sub) => (
                        <SidebarMenuSubItem key={sub.label}>
                          <SidebarMenuSubButton
                            isActive={sub.isActive}
                          >
                            <span>{sub.label}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  );
}

function UserFooter() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<SidebarMenuButton size="lg" tooltip="Ray" />}
            >
              <Avatar
                name="Ray"
                src="/images/ray.jpg"
                size="sm"
                className="size-8 shrink-0"
              />
              <span>Ray</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="end"
              sideOffset={16}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>Ray</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Account settings</DropdownMenuItem>
                <DropdownMenuItem>Preferences</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}

export function SidebarCollapsibleOffcanvasExample() {
  return (
    <div className={DEMO_FRAME}>
      <SidebarProvider
        defaultOpen
        enableKeyboardShortcut={false}
        className="h-full min-h-0"
      >
        <Sidebar
          side="left"
          variant="sidebar"
          collapsible="offcanvas"
        >
          <BrandHeader />
          <NavMain />
          <UserFooter />
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 border-b border-sidebar-border px-4">
            <SidebarTrigger />
            <span className="text-sm text-sidebar-foreground">
              Dashboard
            </span>
          </header>
          <div className="flex flex-1 flex-col" />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
