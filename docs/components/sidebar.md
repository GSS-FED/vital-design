# Sidebar

> Application sidebar with structure, behavior, and a basic neutral default skin. Product-specific looks live on blocks.

## Preview

> **Boundary**
>
> - **Primitive:** structure + behavior (collapse, cookie, ⌘B, mobile sheet) and shadcn-aligned `data-slot` / `data-side` / `data-variant` / `data-state` on every panel branch, **plus a basic default skin** (grayscale text and hover/active fill — not shadcn `sidebar-accent`). No product-only decorations such as the rail left bar.
> - **Product styles / full shells:** [Cloud](/docs/blocks/sidebar/cloud/flat) — [Flat](/docs/blocks/sidebar/cloud/flat), [Inline Submenus](/docs/blocks/sidebar/cloud/inline-submenus), [Collapsible Submenus](/docs/blocks/sidebar/cloud/collapsible-submenus), [Dropdown Submenus](/docs/blocks/sidebar/cloud/dropdown-submenus), [Secondary Nav](/docs/blocks/sidebar/cloud/secondary-nav), [Header Actions](/docs/blocks/sidebar/cloud/header-actions).
> - **Colors:** semantic slots `--sidebar*` (from `tokens/semantic/color.json` → `generated.css`) color the chrome. Menu item default skin stays `grayscale-*`. See [Colors → Sidebar](/docs/design-tokens/colors#sidebar).
> - **`SidebarProvider`** wraps children in `TooltipProvider delay={0}` (same as shadcn), so tooltips under `SidebarInset` also open immediately.
>
> Header / Footer “sticky” is **flex pin**: siblings of `SidebarContent`, not inside it. Only `SidebarContent` scrolls.

```tsx
import { Avatar } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
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
} from '@/components/ui/Sidebar';
import { CalendarDaysIcon } from '@/components/icons/CalendarDaysIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { ClockIcon } from '@/components/icons/ClockIcon';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon';
import { PanelLeftIcon } from '@/components/icons/PanelLeftIcon';
import { UserIcon } from '@/components/icons/UserIcon';
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

export function SidebarExample() {
  return (
    <div className={DEMO_FRAME}>
      <SidebarProvider
        defaultOpen
        enableKeyboardShortcut={false}
        className="h-full min-h-0"
      >
        <Sidebar side="left" variant="sidebar" collapsible="icon">
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
```

## Installation

```bash
npx shadcn@latest add @vital-design/sidebar
```

## Usage

Wrap your layout with `SidebarProvider`, compose the shell with `Sidebar` + `SidebarInset`, and build navigation with the menu parts. Basic styles come free; use a **block** or `className` for product-specific skins.

```tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/Sidebar';

export function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader>Brand</SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive tooltip="Home">
                    Home
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header>
          <SidebarTrigger />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
```

## Structure

| Part                                                 | Role                                                                                                              |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `SidebarProvider`                                    | Collapsible state, cookie (`cookieName`), keyboard shortcut (`enableKeyboardShortcut`), mobile check (`isMobile`) |
| `Sidebar`                                            | Main panel (`side`, `variant`, `collapsible`, `render`)                                                           |
| `SidebarTrigger` / `SidebarRail`                     | Toggle controls                                                                                                   |
| `SidebarInset`                                       | Primary content region                                                                                            |
| `SidebarHeader` / `SidebarFooter` / `SidebarContent` | Sticky header/footer and scrollable body                                                                          |
| `SidebarGroup*`                                      | Labeled sections inside content                                                                                   |
| `SidebarMenu*`                                       | Navigation rows, actions, badges, skeletons, nested submenus                                                      |

## Collapsible modes

- `offcanvas` (default) — hides off-screen when collapsed
- `icon` — collapses to an icon rail; menu labels hide; `tooltip` shows on hover
- `none` — fixed width, not collapsible

With `offcanvas`, the trigger slides the whole panel out of view:

```tsx
import { Avatar } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
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
} from '@/components/ui/Sidebar';
import { CalendarDaysIcon } from '@/components/icons/CalendarDaysIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { ClockIcon } from '@/components/icons/ClockIcon';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon';
import { PanelLeftIcon } from '@/components/icons/PanelLeftIcon';
import { UserIcon } from '@/components/icons/UserIcon';
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
```

## Variants

### Inset

```tsx
import { Avatar } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
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
} from '@/components/ui/Sidebar';
import { CalendarDaysIcon } from '@/components/icons/CalendarDaysIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { ClockIcon } from '@/components/icons/ClockIcon';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon';
import { PanelLeftIcon } from '@/components/icons/PanelLeftIcon';
import { UserIcon } from '@/components/icons/UserIcon';
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

export function SidebarInsetExample() {
  return (
    <div className={DEMO_FRAME}>
      <SidebarProvider
        defaultOpen
        enableKeyboardShortcut={false}
        className="h-full min-h-0"
      >
        <Sidebar side="left" variant="inset" collapsible="icon">
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
```

### Floating

```tsx
import { Avatar } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
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
} from '@/components/ui/Sidebar';
import { CalendarDaysIcon } from '@/components/icons/CalendarDaysIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { ClockIcon } from '@/components/icons/ClockIcon';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon';
import { PanelLeftIcon } from '@/components/icons/PanelLeftIcon';
import { UserIcon } from '@/components/icons/UserIcon';
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

export function SidebarFloatingExample() {
  return (
    <div className={DEMO_FRAME}>
      <SidebarProvider
        defaultOpen
        enableKeyboardShortcut={false}
        className="h-full min-h-0"
      >
        <Sidebar side="left" variant="floating" collapsible="icon">
          <BrandHeader />
          <NavMain />
          <UserFooter />
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <header className="flex h-12 items-center gap-2 px-4">
            <SidebarTrigger />
          </header>
          <div className="flex flex-1 flex-col" />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
```

## Right side

Set `side="right"` to dock the sidebar on the right. Put the `SidebarTrigger` at the end of the header so it sits next to the panel.

```tsx
import { Avatar } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
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
} from '@/components/ui/Sidebar';
import { CalendarDaysIcon } from '@/components/icons/CalendarDaysIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { ClockIcon } from '@/components/icons/ClockIcon';
import { EllipsisIcon } from '@/components/icons/EllipsisIcon';
import { FlagIcon } from '@/components/icons/FlagIcon';
import { MagnifyingGlassIcon } from '@/components/icons/MagnifyingGlassIcon';
import { PanelLeftIcon } from '@/components/icons/PanelLeftIcon';
import { UserIcon } from '@/components/icons/UserIcon';
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

export function SidebarRightSideExample() {
  return (
    <div className={DEMO_FRAME}>
      <SidebarProvider
        defaultOpen
        enableKeyboardShortcut={false}
        className="h-full min-h-0"
      >
        <Sidebar side="right" variant="sidebar" collapsible="icon">
          <BrandHeader />
          <NavMain />
          <UserFooter />
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
    </div>
  );
}
```

## Controlled state

Use `open` + `onOpenChange` on `SidebarProvider` when the parent owns collapse state.

```tsx
const [open, setOpen] = useState(true);

<SidebarProvider open={open} onOpenChange={setOpen}>
  ...
</SidebarProvider>;
```

## Polymorphism (`render` vs shadcn `asChild`)

Vittal Design uses Base UI’s `render` prop instead of Radix `asChild`:

```tsx
// shadcn
<SidebarMenuButton asChild>
  <a href="/docs">Docs</a>
</SidebarMenuButton>

// Vittal Design
<SidebarMenuButton render={<a href="/docs" />}>
  Docs
</SidebarMenuButton>
```

Applies to: `Sidebar`, `SidebarTrigger`, `SidebarGroupLabel`, `SidebarGroupAction`, `SidebarMenuButton`, `SidebarMenuAction`, `SidebarMenuSubButton`.

### Trigger

`SidebarTrigger` shows a panel icon by default. Pass `children` to replace it, or `render` to use another element. A rendered element keeps its own look, so a VD `Button` is not restyled by the trigger:

```tsx
<SidebarTrigger
  aria-label="Quick links"
  render={<Button variant="ghost" size="icon-md" />}
>
  <PanelLeftIcon data-icon="inline-start" />
</SidebarTrigger>
```

Call `event.preventDefault()` in `onClick` to stop the trigger from toggling.

### Root element

`Sidebar` renders a `<div>`. Pass `render={<aside />}` or `render={<nav aria-label="…" />}` to give the panel a landmark. On mobile the panel is a Sheet dialog and `render` is ignored.

## Keyboard

`⌘B` / `Ctrl+B` toggles the sidebar (desktop open state or mobile sheet).

## Cookie / open state

`SidebarProvider` **writes** a `sidebar_state` cookie when open state changes (for optional cross-page sync). It does **not** read the cookie on mount — initial state comes from `defaultOpen` or a controlled `open` prop. This keeps SSR and first paint predictable; read the cookie yourself only if your app needs restore-on-load.

Set `cookieName` to write under another name, or `cookieName={null}` to write no cookie. To persist state some other way, use `onOpenChange`.

## Theme CSS variables

Sidebar colors use shadcn-compatible semantic slots. Defaults are defined in `tokens/semantic/color.json` and emitted to `src-v2/styles/tokens/generated.css` (imported via `globals.css`). See [Colors → Sidebar](/docs/design-tokens/colors#sidebar).

| Variable                       | Default                        |
| ------------------------------ | ------------------------------ |
| `--sidebar`                    | `var(--grayscale-100)`         |
| `--sidebar-foreground`         | `var(--grayscale-900)`         |
| `--sidebar-primary`            | `var(--primary-500)`           |
| `--sidebar-primary-foreground` | `#fff`                         |
| `--sidebar-accent`             | `var(--primary-50)`            |
| `--sidebar-accent-foreground`  | `var(--primary-700)`           |
| `--sidebar-border`             | `var(--grayscale-opacity-200)` |
| `--sidebar-ring`               | `var(--primary-300)`           |

Layout widths are set on the provider wrapper:

- `--sidebar-width`: `16rem`
- `--sidebar-width-icon`: `3rem`
- Mobile sheet width: `18rem`

## Mobile

Below `768px`, `Sidebar` renders as a `Sheet` controlled by `openMobile`. Place a `SidebarTrigger` outside the panel (typically in `SidebarInset` header chrome) — or call `useSidebar().toggleSidebar` — to open it. `SidebarTrigger` sets `aria-expanded` from mobile/desktop open state.

Pass `isMobile` to `SidebarProvider` to replace the built-in `768px` check, for example with your own breakpoint. `isMobile={false}` never switches to the Sheet: the trigger and `⌘B` always toggle the desktop panel. Use it when your layout handles small screens itself.

Menu actions default to **buttons**. Use the `render` prop for links (`render={<a href="…" />}`) on `SidebarMenuButton` / `SidebarMenuSubButton`.

## Embedding and multiple sidebars

When a sidebar lives inside another app's page, or two sidebars share a page (for example a shell's quick-links panel next to a product's sidebar):

- **Cookie:** give each `SidebarProvider` its own `cookieName`, or `null` when the page is not yours. A cookie written from an embedded sidebar lands on the host's domain.
- **Shortcut:** enable `⌘B` on at most one provider. Every enabled provider listens on `window`, so two would toggle together. Turn it off (`enableKeyboardShortcut={false}`) when the host page owns its shortcuts.
- **Layout:** the provider renders a `flex min-h-svh` wrapper. When your own layout positions the panel, pass `className="contents"` so the wrapper only holds state.
- **Popups:** menus inside the sidebar portal to `document.body`. If your theme tokens are scoped to a container, pass that container to the popup (for example `DropdownMenuContent`'s `portalContainer`).
- **Menu rows outside a provider:** `SidebarMenuButton` also renders without a `SidebarProvider`, as if expanded and without its tooltip, so a list component built from it can be rendered and tested on its own.
