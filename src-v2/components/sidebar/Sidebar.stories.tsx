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
import { CalendarIcon } from '@/icons/CalendarIcon';
import { CheckIcon } from '@/icons/CheckIcon';
import { ClockIcon } from '@/icons/ClockIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { FlagIcon } from '@/icons/FlagIcon';
import { PanelLeftIcon } from '@/icons/PanelLeftIcon';
import { SearchIcon } from '@/icons/SearchIcon';
import { UserIcon } from '@/icons/UserIcon';
import { type Meta, type StoryObj } from '@storybook/react';
import { type ReactNode } from 'react';
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
} from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

const rayAvatar = '/images/ray.jpg';
const logoHorizontal = '/images/vital-logo-text-h.svg';
const logoMark = '/images/vital-logo.svg';

const DEMO_FRAME =
  'relative h-[640px] w-full overflow-hidden ' +
  '[&_[data-slot=sidebar-container]]:!absolute ' +
  '[&_[data-slot=sidebar-container]]:!inset-y-0 ' +
  '[&_[data-slot=sidebar-container]]:!h-full ' +
  '[&_[data-slot=sidebar-container]]:!max-h-full';

function DemoFrame({ children }: { children: ReactNode }) {
  return <div className={DEMO_FRAME}>{children}</div>;
}

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
                  className="data-[popup-open]:bg-grayscale-200"
                />
              }
            >
              {collapsed ? (
                <img
                  src={logoMark}
                  alt="Vital"
                  className="size-8 object-contain"
                />
              ) : (
                <img
                  src={logoHorizontal}
                  alt="Vital"
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
                  className="data-[popup-open]:bg-grayscale-200"
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

export const Default: Story = {
  render: function Render() {
    return (
      <DemoFrame>
        <SidebarProvider defaultOpen className="h-full min-h-0">
          <Sidebar side="left" variant="sidebar" collapsible="icon">
            <SidebarBrandHeader />
            <SidebarContent>
              {DEMO_NAV.map((group) => (
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
            <SidebarUserFooter />
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
      </DemoFrame>
    );
  },
};

export const CollapsibleOffcanvas: Story = {
  render: function Render() {
    return (
      <DemoFrame>
        <SidebarProvider defaultOpen className="h-full min-h-0">
          <Sidebar
            side="left"
            variant="sidebar"
            collapsible="offcanvas"
          >
            <SidebarBrandHeader />
            <SidebarContent>
              {DEMO_NAV.map((group) => (
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
            <SidebarUserFooter />
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
      </DemoFrame>
    );
  },
};

export const Floating: Story = {
  render: function Render() {
    return (
      <DemoFrame>
        <SidebarProvider defaultOpen className="h-full min-h-0">
          <Sidebar side="left" variant="floating" collapsible="icon">
            <SidebarBrandHeader />
            <SidebarContent>
              {DEMO_NAV.map((group) => (
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
            <SidebarUserFooter />
            <SidebarRail />
          </Sidebar>
          <SidebarInset>
            <header className="flex h-12 items-center gap-2 px-4">
              <SidebarTrigger />
            </header>
            <div className="flex flex-1 flex-col" />
          </SidebarInset>
        </SidebarProvider>
      </DemoFrame>
    );
  },
};

export const Inset: Story = {
  render: function Render() {
    return (
      <DemoFrame>
        <SidebarProvider defaultOpen className="h-full min-h-0">
          <Sidebar side="left" variant="inset" collapsible="icon">
            <SidebarBrandHeader />
            <SidebarContent>
              {DEMO_NAV.map((group) => (
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
            <SidebarUserFooter />
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
      </DemoFrame>
    );
  },
};

export const RightSide: Story = {
  render: function Render() {
    return (
      <DemoFrame>
        <SidebarProvider defaultOpen className="h-full min-h-0">
          <Sidebar side="right" variant="sidebar" collapsible="icon">
            <SidebarBrandHeader />
            <SidebarContent>
              {DEMO_NAV.map((group) => (
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
            <SidebarUserFooter />
            <SidebarRail />
          </Sidebar>
          <SidebarInset>
            <header className="flex h-12 items-center gap-2 border-b border-sidebar-border px-4">
              <span className="text-sm text-sidebar-foreground">
                Dashboard
              </span>
              <SidebarTrigger className="ml-auto" />
            </header>
            <div className="flex flex-1 flex-col" />
          </SidebarInset>
        </SidebarProvider>
      </DemoFrame>
    );
  },
};
