# Inline Submenus

> A sidebar with submenus. Cloud product sidebar panel with frosted glass, inline nested nav, primary text states, active edge rail, and a bullet collapse control.

## Preview

```tsx
import { CloudSidebar } from '@/blocks/sidebar-cloud-02/app-sidebar';
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

export function SidebarCloud02Example() {
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
npx shadcn@latest add @vital-design/sidebar-cloud-02
```

Installs **`app-sidebar.tsx`** and `src/public/images/cloud.jpg` (imported by the component). It depends on `@vital-design/sidebar` plus avatar, dropdown-menu, and the icons used in the sample tree. Compose `SidebarProvider` and `SidebarInset` in the app.

> **Assets:** The frost photo is imported and shipped. Sample logos / avatar use public paths (`/images/vital-logo-text-h.svg`, `/images/vital-logo.svg`, `/images/ray.jpg`) that only the docs examples provide; they are not installed by the registry.

## When to use

- **A sidebar with submenus** — nested items render as inline `SidebarMenuSub`
- Product panel with **frosted glass** (`white/80` + `blur(12px)`) over a **cloud photo**
- Menu hover/active as **text-only primary** (no fill), with **100ms ease-in** transitions
- **Active edge rail** (4×20px, primary) on the current item (mirrors for `side="right"`)
- Built-in **bullet collapse** control (30×30, grayscale-600) docked to the footer
- Sample account footer (avatar + dropdown) lives in the same file — edit after install
- Use `variant="sidebar"` or `floating`. Skip `inset` — the frost photo does not fit inset padding and unrounded corners.

## Floating

Pass `variant="floating"` for a rounded panel with a gap around it.

```tsx
import { CloudSidebar } from '@/blocks/sidebar-cloud-02/app-sidebar';
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

export function SidebarCloud02FloatingExample() {
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

`CloudSidebar` is a skinned `Sidebar` (`ComponentProps<typeof Sidebar>`). Sample header, nav, and footer are composed **inside** that file, so `<CloudSidebar />` matches this preview.

```tsx
import { CloudSidebar } from '@/blocks/sidebar-cloud-02/app-sidebar';
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
- After install, edit the `data` object (labels, logos, avatar). Replace the preview-only `/images/…` paths or provide matching public files in your app.

Header / Content / Footer / menu parts stay in the same file if you want to restyle after install.

For a blank shell without the product skin, compose [Sidebar](/docs/components/sidebar) yourself.
