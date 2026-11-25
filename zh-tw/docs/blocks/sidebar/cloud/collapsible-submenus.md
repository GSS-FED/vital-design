# Collapsible Submenus

> 可收合行內子選單的側邊欄。毛玻璃外觀與帳號頁尾同 Inline Submenus；有子項目的父層用 Collapsible 摺起。

## 預覽

```tsx
import { CloudSidebar } from '@/blocks/sidebar-cloud-06/app-sidebar';
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

export function SidebarCloud06Example() {
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

## 安裝

```bash
npx shadcn@latest add @vital-design/sidebar-cloud-06
```

會安裝 **`app-sidebar.tsx`** 與 `src/public/images/cloud.jpg`（由元件引入）。它依賴 `@vital-design/sidebar`、`@vital-design/collapsible`，再加上 avatar、dropdown-menu，以及範例樹裡用到的 icon。在應用裡自己組 `SidebarProvider` 與 `SidebarInset`。

> **素材：** 毛玻璃照片會被引入並一起安裝。範例 logo / avatar 用公開路徑（`/images/vital-logo-text-h.svg`、`/images/vital-logo.svg`、`/images/ray.jpg`），只有文件範例有這些檔；registry 不會安裝。

## 何時使用

- 外殼與 [Inline Submenus](/zh-tw/docs/blocks/sidebar/cloud/inline-submenus) 相同，但有子項目的父層用 `Collapsible`（`defaultOpen`）**摺起**
- 父層上的 chevron 在面板打開時旋轉；收成 icon 時隱藏
- **毛玻璃**疊在**雲朵照片**上的產品面板，加上帳號頁尾與圓點收合
- 用 `variant="sidebar"` 或 `floating`。不要用 `inset` — 毛玻璃照片塞不進 inset 的內距，也不適合沒有圓角的角落。

## 浮動

傳入 `variant="floating"`，面板會變成四周留空的圓角面板。

```tsx
import { CloudSidebar } from '@/blocks/sidebar-cloud-06/app-sidebar';
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

export function SidebarCloud06FloatingExample() {
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

## 組合

`CloudSidebar` 是套了外觀的 `Sidebar`（`ComponentProps<typeof Sidebar>`）。範例頁首、導覽與頁尾都組在那個檔案**裡面**，所以 `<CloudSidebar />` 會跟這個預覽一樣。

```tsx
import { CloudSidebar } from '@/blocks/sidebar-cloud-06/app-sidebar';
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
      <SidebarInset className="bg-white">
        <header className="flex h-12 items-center gap-2 border-b px-3 md:hidden">
          <SidebarTrigger />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
```

- provider 上建議的寬度：**`--sidebar-width: 180px`**、**`--sidebar-width-icon: 56px`**
- **行動版：** 桌面的圓點會隱藏。把 `SidebarTrigger` 放進 `SidebarInset`（`md:hidden` 的頁首）
- 安裝後改 `data` 物件（標籤、logo、avatar）。換掉僅供預覽的 `/images/…` 路徑，或在應用裡提供對應的公開檔。

不要產品外觀、只要空白外殼時，自己組 [Sidebar](/zh-tw/docs/components/sidebar)。
