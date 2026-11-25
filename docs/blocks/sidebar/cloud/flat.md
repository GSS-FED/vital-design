# Flat

> Base cloud sidebar. Frosted glass skin, flat nav with no submenus, no account footer.

## Preview

```tsx
import { CloudSidebar } from '@/blocks/sidebar-cloud-01/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/Sidebar';
import { Skeleton } from '@/components/ui/Skeleton';
import { type CSSProperties } from 'react';

// Keeps the fixed sidebar inside this demo box. In an app, drop the frame:
// the sidebar is fixed to the viewport.
const DEMO_FRAME =
  'relative h-160 w-full overflow-hidden ' +
  '[&_[data-slot=sidebar-container]]:!absolute ' +
  '[&_[data-slot=sidebar-container]]:!h-full';

const providerStyle = {
  '--sidebar-width': '180px',
  '--sidebar-width-icon': '56px',
} as CSSProperties;

export function SidebarCloud01Example() {
  return (
    <div className={DEMO_FRAME}>
      <SidebarProvider
        defaultOpen
        enableKeyboardShortcut={false}
        className="h-full min-h-0"
        style={providerStyle}
      >
        <CloudSidebar collapsible="icon" />
        <SidebarInset>
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
  );
}
```

## Installation

```bash
npx shadcn@latest add @vital-design/sidebar-cloud-01
```

Installs **`app-sidebar.tsx`** and `src/public/images/cloud.jpg` (imported by the component). It depends on `@vital-design/sidebar` and the icons used in the sample tree. Compose `SidebarProvider` and `SidebarInset` in the app.

> **Assets:** The frost photo is imported and shipped. Sample logos use public paths (`/images/vital-logo-text-h.svg`, `/images/vital-logo.svg`) that only the docs examples provide; they are not installed by the registry.

## When to use

- **Base Cloud sidebar** — frosted glass over a cloud photo; start here, then see [Inline Submenus](/docs/blocks/sidebar/cloud/inline-submenus) and [Dropdown Submenus](/docs/blocks/sidebar/cloud/dropdown-submenus) for nested nav
- **No submenus** — flat nav only (Projects is a single item, not a parent)
- No account / user footer — only the bullet collapse control stays docked
- Use `variant="sidebar"` or `floating`. Skip `inset` — the frost photo does not fit inset padding and unrounded corners.

## Floating

Pass `variant="floating"` for a rounded panel with a gap around it.

```tsx
import { CloudSidebar } from '@/blocks/sidebar-cloud-01/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/Sidebar';
import { Skeleton } from '@/components/ui/Skeleton';
import { type CSSProperties } from 'react';

// Keeps the fixed sidebar inside this demo box. In an app, drop the frame:
// the sidebar is fixed to the viewport.
const DEMO_FRAME =
  'relative h-160 w-full overflow-hidden ' +
  '[&_[data-slot=sidebar-container]]:!absolute ' +
  '[&_[data-slot=sidebar-container]]:!h-full';

const providerStyle = {
  '--sidebar-width': '180px',
  '--sidebar-width-icon': '56px',
} as CSSProperties;

export function SidebarCloud01FloatingExample() {
  return (
    <div className={DEMO_FRAME}>
      <SidebarProvider
        defaultOpen
        enableKeyboardShortcut={false}
        className="h-full min-h-0"
        style={providerStyle}
      >
        <CloudSidebar variant="floating" collapsible="icon" />
        <SidebarInset>
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
  );
}
```

## Composition

`CloudSidebar` is a skinned `Sidebar` (`ComponentProps<typeof Sidebar>`). Sample header, nav, and empty footer dock are composed **inside** that file, so `<CloudSidebar />` matches this preview.

```tsx
import { CloudSidebar } from '@/blocks/sidebar-cloud-01/app-sidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/Sidebar';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      defaultOpen
      style={
        {
          '--sidebar-width': '180px',
          '--sidebar-width-icon': '56px',
        } as React.CSSProperties
      }
    >
      <CloudSidebar collapsible="icon" />
      <SidebarInset className="bg-background">
        <header className="flex h-12 items-center gap-2 border-b px-3 md:hidden">
          <SidebarTrigger />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
```

- Recommended widths on the provider: **`--sidebar-width: 180px`**, **`--sidebar-width-icon: 56px`**
- **Mobile:** the desktop bullet is hidden. Place a `SidebarTrigger` in `SidebarInset` (`md:hidden` header)
- After install, edit the `data` / `workspaces` objects. Replace the preview-only `/images/…` paths or provide matching public files in your app.

For a blank shell without the product skin, compose [Sidebar](/docs/components/sidebar) yourself.
