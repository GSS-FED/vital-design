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
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from '@/components/sidebar/Sidebar';
import { CalendarIcon } from '@/icons/CalendarIcon';
import { CheckIcon } from '@/icons/CheckIcon';
import { ClockIcon } from '@/icons/ClockIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { FlagIcon } from '@/icons/FlagIcon';
import { PanelLeftIcon } from '@/icons/PanelLeftIcon';
import { SearchIcon } from '@/icons/SearchIcon';
import { UserIcon } from '@/icons/UserIcon';
import rayAvatarImage from '@/public/images/ray.jpg';
import logoHorizontalImage from '@/public/images/vital-logo-text-h.svg';
import logoMarkImage from '@/public/images/vital-logo.svg';
import Image from 'next/image';
import { type ReactNode } from 'react';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

type ImportedImage = string | { src: string };

function getImageSrc(image: ImportedImage) {
  return typeof image === 'string' ? image : image.src;
}

const rayAvatar = getImageSrc(rayAvatarImage as ImportedImage);

const DEMO_FRAME =
  'relative h-[420px] w-full overflow-hidden rounded-lg border border-sidebar-border ' +
  '[&_[data-slot=sidebar-container]]:!absolute ' +
  '[&_[data-slot=sidebar-container]]:!inset-y-0 ' +
  '[&_[data-slot=sidebar-container]]:!h-full ' +
  '[&_[data-slot=sidebar-container]]:!max-h-full';

function SidebarBrandHeader() {
  const { state, isMobile } = useSidebar();
  const collapsed = !isMobile && state === 'collapsed';

  return (
    <SidebarHeader className="py-2">
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  size="lg"
                  tooltip="Workspace"
                  className="data-popup-open:bg-grayscale-200"
                />
              }
            >
              {collapsed ? (
                <Image
                  src={logoMarkImage}
                  alt="Vital"
                  width={32}
                  height={32}
                  unoptimized
                  className="size-8 object-contain"
                />
              ) : (
                <Image
                  src={logoHorizontalImage}
                  alt="Vital"
                  width={124}
                  height={28}
                  unoptimized
                  className="h-7 max-h-7 w-auto object-contain object-left"
                />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="start"
              sideOffset={8}
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
                <DropdownMenuItem>Vital Design</DropdownMenuItem>
                <DropdownMenuItem>Vital Finance</DropdownMenuItem>
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

function SidebarUserFooter() {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  size="lg"
                  tooltip="Ray"
                  className="data-popup-open:bg-grayscale-200"
                />
              }
            >
              <Avatar
                name="Ray"
                src={rayAvatar}
                size="sm"
                className="size-8 shrink-0"
              />
              <span>Ray</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="right"
              align="end"
              sideOffset={8}
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

type DemoNavItem = {
  label: string;
  icon: ReactNode;
  isActive?: boolean;
  items?: { label: string; isActive?: boolean }[];
};

const DEMO_NAV: { label: string; items: DemoNavItem[] }[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', icon: <PanelLeftIcon />, isActive: true },
      { label: 'Inbox', icon: <SearchIcon /> },
      { label: 'Calendar', icon: <CalendarIcon /> },
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
      { label: 'Analytics', icon: <SearchIcon /> },
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

function Shell({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'icon',
  defaultOpen = true,
}: {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
  defaultOpen?: boolean;
}) {
  return (
    <div className={DEMO_FRAME}>
      <SidebarProvider
        defaultOpen={defaultOpen}
        enableKeyboardShortcut={false}
        className="h-full min-h-0"
      >
        <Sidebar
          side={side}
          variant={variant}
          collapsible={collapsible}
        >
          <SidebarBrandHeader />
          <SidebarContent>
            {DEMO_NAV.map((group, groupIndex) => (
              <div key={group.label}>
                {groupIndex > 0 ? <SidebarSeparator /> : null}
                <SidebarGroup>
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
              </div>
            ))}
          </SidebarContent>
          <SidebarUserFooter />
          {collapsible !== 'none' ? <SidebarRail /> : null}
        </Sidebar>
        <SidebarInset>
          <header
            className={
              variant === 'floating'
                ? 'flex h-12 items-center gap-2 px-4'
                : 'flex h-12 items-center gap-2 border-b border-sidebar-border px-4'
            }
          >
            <SidebarTrigger />
            {variant === 'floating' ? null : (
              <span className="text-sm text-sidebar-foreground">
                Dashboard
              </span>
            )}
          </header>
          <div className="flex flex-1 flex-col" />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}

export function SidebarPreview() {
  return (
    <ComponentPreview name="SidebarPreview">
      <Shell />
    </ComponentPreview>
  );
}

export function SidebarInsetPreview() {
  return (
    <ComponentPreview name="SidebarInsetPreview">
      <Shell variant="inset" collapsible="icon" />
    </ComponentPreview>
  );
}

export function SidebarFloatingPreview() {
  return (
    <ComponentPreview name="SidebarFloatingPreview">
      <Shell variant="floating" collapsible="icon" />
    </ComponentPreview>
  );
}
