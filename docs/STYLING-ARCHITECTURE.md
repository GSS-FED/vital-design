# 樣式架構文件

本文件說明 vital-design 元件庫的 Tailwind CSS + CVA 樣式架構與使用流程。

> ⚠️ **僅適用於 v1（`src/`）**：本文件描述 legacy 元件庫的樣式架構與舊版 token 命名（`--alarm-*`、`--text-primary`、`--surface-default` 等）。v2（`src-v2/`）已改採 shadcn 對齊的命名（`--destructive-*`、`--foreground`、`--background`），詳見 [`apps/docs/content/docs/design-tokens/colors.mdx`](../apps/docs/content/docs/design-tokens/colors.mdx)。

---

## 1. 架構總覽

### 技術棧

| 技術 | 用途 |
|------|------|
| Tailwind CSS v4 | 原子化 CSS 框架 |
| CVA (class-variance-authority) | 元件變體管理 |
| tailwind-merge | 類別衝突處理 |
| clsx | 條件式類別組合 |

### 遷移背景

本專案從 styled-components 遷移到 Tailwind CSS，主要優勢：

- **更好的效能**：無執行時期 CSS-in-JS 開銷
- **更小的打包體積**：Tailwind 自動 tree-shaking 未使用的樣式
- **更好的開發體驗**：VS Code 智慧提示、即時預覽
- **與設計系統整合**：CSS 變數可直接對應 Tailwind 主題

---

## 2. 設計系統 (Design Tokens)

### CSS 變數定義位置

所有設計 tokens 定義於 `src/styles/globals.css`。

### 色彩系統

#### Primary 色階

```css
--primary-900: #002040;
--primary-800: #003A73;
--primary-700: #0153A5;
--primary-600: #016DD8;
--primary-500: #0E86FE;  /* 主色 */
--primary-400: #419FFE;
--primary-300: #73B9FE;
--primary-200: #A6D2FF;
--primary-100: #D9ECFF;
--primary-50: #EBF5FF;
```

#### Grayscale 色階

```css
--grayscale-opacity-900: #232332;
--grayscale-opacity-800: rgba(35, 35, 50, 0.85);
--grayscale-opacity-700: rgba(35, 35, 50, 0.70);
--grayscale-opacity-600: rgba(35, 35, 50, 0.55);
--grayscale-opacity-500: rgba(35, 35, 50, 0.40);
--grayscale-opacity-400: rgba(35, 35, 50, 0.25);
--grayscale-opacity-300: rgba(35, 35, 50, 0.15);
--grayscale-opacity-200: rgba(35, 35, 50, 0.08);
--grayscale-opacity-150: rgba(35, 35, 50, 0.05);
--grayscale-opacity-100: rgba(35, 35, 50, 0.03);
```

#### Semantic 語意色彩

| 類別 | 用途 | 主色 (500) |
|------|------|------------|
| Success | 成功狀態 | `#2BCD86` |
| Info | 資訊提示 | `#00C3FF` |
| Warning | 警告訊息 | `#FFA700` |
| Alarm | 錯誤/警報 | `#EB5000` |

每個語意色彩包含 100-900 的完整色階。

### 特殊色彩

#### Tag Colors

12 種標籤顏色，每種包含 solid 與 tint 兩種變體：

```css
--tag-teal-solid: #057C7F;
--tag-teal-tint: #EBFAF9;
/* olive, brown, rose, indigo, blue, green, gold, red, purple, navy */
```

#### Avatar Colors

11 種頭像顏色，每種包含 color、border、bg 三種變體：

```css
--avatar-tiffany-color: #00B9AF;
--avatar-tiffany-border: #8DE0DB;
--avatar-tiffany-bg: #EBFAF9;
/* green, orange, pink, blue, sky, purple, light-gold, salmon, ice, lavender */
```

### 陰影系統

#### 基礎陰影

```css
--shadow-accent: 0 2px 8px 0 rgba(35, 35, 50, 0.15);
--shadow-base: 0 6px 10px 0 rgba(35, 35, 50, 0.08);
--shadow-emphasis: 0 6px 20px -2px rgba(35, 35, 50, 0.25);
--shadow-top-level: 0 6px 32px -4px rgba(35, 35, 50, 0.25);
```

#### Focus 陰影

```css
--shadow-focus-primary: 0 0 0 2px #A6D2FF;
--shadow-focus-success: 0 0 0 2px #A5ECCD;
--shadow-focus-info: 0 0 0 2px #99E7FF;
--shadow-focus-warning: 0 0 0 2px #FFDC99;
--shadow-focus-alarm: 0 0 0 2px #FFAE85;
```

#### Button 陰影

```css
--shadow-button-primary: 0 6px 10px rgba(14, 134, 254, 0.3);
--shadow-button-primary-active: 0 2px 4px rgba(14, 134, 254, 0.4);
/* success, info, warning, alarm 各有對應的陰影 */
```

### 字體與圓角

```css
/* 字體 */
--font-sans: 'Roboto', 'Noto Sans TC', 'PingFang TC', 'Microsoft JhengHei', sans-serif;

/* 圓角 */
--radius-none: 0px;
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 15px;
--radius-xl: 16px;
--radius-full: 9999px;
```

---

## 3. Tailwind 配置

### PostCSS 配置

檔案位置：`postcss.config.js`

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};
```

Tailwind CSS v4 使用 PostCSS 外掛取代傳統的 `tailwind.config.js`。

### @theme inline 主題定義

Tailwind v4 使用 `@theme inline` 區塊將 CSS 變數對應到 Tailwind 類別：

```css
@theme inline {
  /* 色彩對應 */
  --color-primary-500: var(--primary-500);
  --color-grayscale-opacity-800: var(--grayscale-opacity-800);

  /* 陰影對應 */
  --shadow-focus-primary: 0 0 0 2px #A6D2FF;
  --shadow-button-primary: 0 6px 10px rgba(14, 134, 254, 0.3);

  /* 圓角對應 */
  --radius-lg: 15px;
  --radius-xl: 16px;
}
```

對應後即可使用 Tailwind 類別：

```tsx
<div className="bg-primary-500 text-grayscale-opacity-800 rounded-lg shadow-focus-primary">
```

### 自訂 Variant

檔案位置：`src/styles/globals.css`

```css
@custom-variant not-disabled (&:not(:disabled));
```

使用方式：

```tsx
<button className="hover:not-disabled:bg-primary-400 active:not-disabled:bg-primary-600">
```

這個 variant 讓 hover/active 效果只在非 disabled 狀態下生效。

---

## 4. CVA 使用模式

### 基本結構

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

export const componentVariants = cva(
  // 基礎類別 (所有變體共用)
  ['base-class-1', 'base-class-2'],
  {
    variants: {
      // 變體定義
      size: {
        small: 'text-sm h-6',
        medium: 'text-base h-8',
        large: 'text-lg h-10',
      },
      theme: {
        primary: 'bg-primary-500 text-white',
        default: 'bg-white text-grayscale-opacity-800',
      },
    },
    defaultVariants: {
      size: 'medium',
      theme: 'primary',
    },
  }
);
```

### variants vs compoundVariants

- **variants**：獨立的變體，各自定義樣式
- **compoundVariants**：當多個變體組合時的特殊樣式

```typescript
export const buttonVariants = cva(
  ['base-classes'],
  {
    variants: {
      size: {
        medium: 'h-7',
        large: 'h-8',
      },
      theme: {
        primary: 'bg-primary-500',
        success: 'bg-success-500',
      },
      isLoading: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // 只有 large + primary + 非 loading 時才有陰影和 hover 效果
      {
        size: 'large',
        theme: 'primary',
        isLoading: false,
        class: 'shadow-button-primary hover:not-disabled:-translate-y-px',
      },
    ],
  }
);
```

### 匯出 VariantProps 型別

```typescript
export type ComponentVariants = VariantProps<typeof componentVariants>;
```

這讓使用者可以取得變體的型別定義：

```typescript
type Props = {
  children: ReactNode;
} & ComponentVariants;
```

### 元件範例對照表

| 元件 | 複雜度 | 特點 |
|------|--------|------|
| `Chip.tsx` | 簡單 | 基本 variants，2 個變體 |
| `Tag.tsx` | 中等 | 多色彩 compoundVariants |
| `Button.tsx` | 複雜 | 多個 CVA 函式、複雜 compoundVariants |

---

## 5. cn() 工具函式

### 位置

`src/utils/cn.ts`

### 實作

```typescript
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 組合用途

- **clsx**：處理條件式類別、陣列、物件
- **tailwind-merge**：處理 Tailwind 類別衝突

### 使用範例

```typescript
import { cn } from 'src/utils/cn';

// 基本使用
cn('text-sm', 'font-bold')
// => 'text-sm font-bold'

// 條件式類別
cn('base-class', isActive && 'active-class')
// => 'base-class active-class' 或 'base-class'

// 物件語法
cn('base', {
  'text-red-500': hasError,
  'text-green-500': isSuccess,
})

// 與 CVA 結合
cn(buttonVariants({ size, theme }), className)

// 處理衝突
cn('px-4', 'px-6')
// => 'px-6' (tailwind-merge 會保留後者)
```

---

## 6. 元件開發流程

### Step 1: 定義 CVA 變體

```typescript
// ComponentName.tsx
import { cva, type VariantProps } from 'class-variance-authority';

export const componentVariants = cva(
  ['base-classes'],
  {
    variants: { /* ... */ },
    defaultVariants: { /* ... */ },
  }
);

export type ComponentVariants = VariantProps<typeof componentVariants>;
```

### Step 2: 建立元件

```typescript
import { cn } from 'src/utils/cn';

export default function ComponentName(props: ComponentProps) {
  const { variant, size, className, ...rest } = props;

  return (
    <div
      className={cn(
        componentVariants({ variant, size }),
        className
      )}
      {...rest}
    />
  );
}

ComponentName.displayName = 'ComponentName';
```

### Step 3: 匯出元件

在 `src/index.tsx` 中匯出：

```typescript
export { default as ComponentName } from './components/component-name/ComponentName';
```

### 命名規範

| 項目 | 規範 | 範例 |
|------|------|------|
| 資料夾 | kebab-case | `split-button/` |
| 元件檔案 | PascalCase | `SplitButton.tsx` |
| CVA 變數 | camelCase + `Variants` 後綴 | `splitButtonVariants` |
| 型別 | PascalCase + `Variants` 後綴 | `SplitButtonVariants` |

### ESLint allowExportNames 設定

當元件需要匯出 CVA 變體時，需在 `.eslintrc.json` 中加入：

```json
{
  "rules": {
    "react-refresh/only-export-components": [
      "warn",
      {
        "allowConstantExport": true,
        "allowExportNames": [
          "filledButtonVariants",
          "textButtonVariants",
          "chipVariants",
          "tagVariants"
          // 新增的 variants 名稱
        ]
      }
    ]
  }
}
```

---

## 7. 開發與驗證

### Storybook 視覺驗證

```bash
# 啟動 Storybook
pnpm run dev
```

在 Storybook 中檢查：

- 各變體的視覺呈現
- hover/active/focus 狀態
- disabled 狀態
- 響應式行為

### 測試命令

```bash
# 執行所有測試
pnpm run test

# 監聽模式
pnpm run test:watch

# 覆蓋率報告
pnpm run test:coverage
```

### Lint 檢查

```bash
pnpm run lint
```

---

## 參考檔案

| 檔案 | 用途 |
|------|------|
| `src/styles/globals.css` | 設計 tokens、@theme 定義 |
| `src/utils/cn.ts` | 類別合併工具 |
| `src/constants/colors.ts` | TypeScript 色彩常數 |
| `src/components/button/Button.tsx` | CVA 範例 (compound variants) |
| `src/components/chip/Chip.tsx` | CVA 範例 (簡單) |
| `src/components/tag/Tag.tsx` | CVA 範例 (多色彩) |
| `postcss.config.js` | PostCSS 配置 |
| `.eslintrc.json` | ESLint 設定 |
