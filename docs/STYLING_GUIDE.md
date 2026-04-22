# Vital Design 樣式架構指南

> 此文件協助新開發人員快速了解專案的樣式系統

---

## 概述

本專案是 React 元件庫，使用 **Tailwind CSS v4** 作為主要樣式方案，搭配 **CVA (class-variance-authority)** 管理元件變體。

```
技術棧：
├── Tailwind CSS v4    → 原子化 CSS 工具類
├── CVA                → 型別安全的元件變體
├── cn() utility       → 類別合併 (clsx + tailwind-merge)
└── CSS Variables      → 設計 tokens
```

---

## 1. 設計 Tokens 架構

**檔案位置：** `src/styles/globals.css`

### 三層式設計

```
:root (原始 CSS 變數)
    ↓
@theme inline (Tailwind 映射)
    ↓
Utility Classes (可使用的類別)
```

### 顏色系統

| 類別 | 範圍 | 範例 |
|------|------|------|
| Primary | 900-50 | `text-primary-500`, `bg-primary-100` |
| Grayscale | 900-100 | `text-grayscale-800`, `bg-grayscale-200` |
| Success | 900-100 | `text-success-500`, `bg-success-100` |
| Info | 900-100 | `text-info-500` |
| Warning | 900-100 | `text-warning-500` |
| Alarm | 900-100 | `text-alarm-500` |
| Tag | 12色 × solid/tint | `bg-tag-teal-solid`, `bg-tag-teal-tint` |
| Avatar | 12色 × color/border/bg | `text-avatar-tiffany-color` |

### 陰影系統

```css
/* 基礎陰影 */
shadow-accent      /* 強調 */
shadow-base        /* 基本 */
shadow-emphasis    /* 浮層 */
shadow-top-level   /* 最上層 */

/* Focus 陰影 (按主題) */
shadow-focus-primary
shadow-focus-success
shadow-focus-alarm
...

/* 按鈕陰影 */
shadow-button-primary
shadow-button-primary-active
```

### 自訂圓角

```css
rounded-lg    /* 15px - medium button */
rounded-xl    /* 16px - large button */
```

---

## 2. 核心工具：cn()

**檔案位置：** `src/utils/cn.ts`

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

**功能：**
- `clsx`: 處理條件式類別合併
- `twMerge`: 解決 Tailwind 類別衝突 (如 `w-full w-80` → `w-80`)

**使用範例：**
```tsx
<div className={cn(
  'base-class',
  isActive && 'active-class',
  disabled ? 'opacity-50' : 'opacity-100',
  className  // 外部傳入的 className 最後合併
)} />
```

---

## 3. CVA 元件變體模式

**檔案位置：** 各元件檔案內 (如 `Button.tsx`, `Avatar.tsx`)

### 基本結構

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  // 基礎類別 (所有變體共用)
  ['relative w-fit font-sans box-border', 'transition-all duration-150'],
  {
    variants: {
      size: {
        medium: 'h-7 text-sm rounded-lg',
        large: 'h-8 text-base rounded-xl',
      },
      theme: {
        primary: 'text-white bg-primary-500',
        default: 'text-grayscale-800 bg-white border',
      },
    },
    defaultVariants: {
      size: 'medium',
      theme: 'primary',
    },
  }
);

// 取得變體的 TypeScript 類型
export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

### 複合變體 (Compound Variants)

當需要根據多個變體組合決定樣式時：

```typescript
compoundVariants: [
  {
    color: 'teal',
    colorVariant: 'solid',
    class: 'text-white bg-tag-teal-solid',
  },
  {
    color: 'teal',
    colorVariant: 'tint',
    class: 'text-tag-teal-solid bg-tag-teal-tint',
  },
]
```

### 元件中使用

```tsx
function Button({ size, theme, className, ...props }) {
  return (
    <button
      className={cn(
        buttonVariants({ size, theme }),  // CVA 變體
        'additional-classes',              // 額外固定類別
        isLoading && 'opacity-60',         // 條件類別
        className                          // 外部傳入
      )}
      {...props}
    />
  );
}
```

---

## 4. 常見樣式模式

### 4.1 偽元素覆蓋效果

```typescript
const OVERLAY_CLASSES = [
  'before:content-[""] before:absolute before:inset-0',
  'before:pointer-events-none before:opacity-0',
  'hover:not-disabled:before:bg-grayscale-100 hover:not-disabled:before:opacity-100',
  'active:not-disabled:before:bg-grayscale-200',
];
```

### 4.2 自訂 Variant: not-disabled

```css
/* globals.css */
@custom-variant not-disabled (&:not(:disabled));
```

```tsx
// 使用
'hover:not-disabled:text-primary-400'
'active:not-disabled:translate-y-px'
```

### 4.3 條件式類別映射

```typescript
const THEME_CLASSES: Record<Theme, string> = {
  primary: 'text-white bg-primary-500',
  default: 'text-grayscale-800 bg-white',
};

// 使用
<div className={cn(THEME_CLASSES[theme])} />
```

### 4.4 SVG 圖示顏色繼承

圖示預設使用 `currentColor`，會繼承父層文字顏色：

```tsx
// 設定容器文字顏色
<div className="text-grayscale-500">
  <ChevronDownIcon width={14} />  {/* 自動繼承顏色 */}
</div>
```

---

## 5. 元件結構範例

### 標準元件目錄結構

```
src/components/button/
├── Button.tsx           # 主元件 + CVA variants
├── types.ts             # TypeScript 介面
├── Button.test.tsx      # 測試
└── Button.stories.tsx   # Storybook stories
```

### 完整元件範例

```tsx
// Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'src/utils/cn';

export const buttonVariants = cva(
  ['relative w-fit font-sans', 'transition-all duration-150'],
  {
    variants: {
      size: {
        medium: 'h-7 text-sm rounded-lg',
        large: 'h-8 text-base rounded-xl',
      },
      theme: {
        primary: 'text-white bg-primary-500',
        default: 'text-grayscale-800 bg-white border border-grayscale-300',
      },
    },
    defaultVariants: { size: 'medium', theme: 'primary' },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps extends ButtonVariants {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export default function Button({
  children,
  size,
  theme,
  disabled,
  className,
}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={cn(
        buttonVariants({ size, theme }),
        disabled && 'opacity-60 cursor-not-allowed',
        !disabled && 'cursor-pointer',
        className,
      )}
    >
      {children}
    </button>
  );
}
```

---

## 6. 開發流程

### 新增元件樣式

1. **定義 CVA variants** - 在元件檔案頂部
2. **使用 cn()** - 合併 variants + 條件類別 + 外部 className
3. **優先使用設計 tokens** - 如 `text-primary-500` 而非 `text-[#0E86FE]`
4. **圖示用 currentColor** - 讓顏色可透過父層控制

### 修改設計 tokens

1. 在 `globals.css` 的 `:root` 新增 CSS 變數
2. 在 `@theme inline` 區塊映射到 Tailwind
3. 即可在元件中使用對應的 utility class

### 常用指令

```bash
pnpm run dev        # 啟動 Storybook (port 6006)
pnpm run lint       # ESLint 檢查
pnpm run test       # 執行測試
pnpm run build      # 建置元件庫
```

---

## 7. 重要檔案一覽

| 檔案 | 用途 |
|------|------|
| `src/styles/globals.css` | 設計 tokens、CSS 變數、Tailwind 主題 |
| `src/utils/cn.ts` | 類別合併工具函式 |
| `src/components/*/` | 各元件目錄 |
| `postcss.config.js` | PostCSS 設定 (Tailwind 處理) |
| `.eslintrc.json` | ESLint 設定 (包含 CVA exports) |

---

## 8. 注意事項

1. **不使用 styled-components** - 專案已遷移至 Tailwind，新元件請用 Tailwind + CVA
2. **Tailwind v4** - 無需 `tailwind.config.ts`，設定在 globals.css 的 `@theme inline`
3. **Prettier 換行** - printWidth 設為 70，長類別字串會自動換行
4. **型別安全** - CVA 提供 `VariantProps` 型別，確保 props 正確
