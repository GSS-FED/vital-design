# Vital Design 開發規範

本文件定義 @fed/vital-design 專案的開發規範，供 AI 助手遵循。

## 元件檔案結構

每個新元件必須遵循以下結構：

```
src-v2/components/component-name/
├── ComponentName.tsx         # 主要元件實作（Props 類型 inline export 於此）
├── ComponentName.test.tsx    # Vitest 測試
└── ComponentName.stories.tsx # Storybook stories
```

> 元件 Props 類型一律放在主要 `.tsx` 檔頂部並 export。避免新增 component-level `types.ts`，因為 registry 安裝時會變成 shared lib 檔案；跨檔案需要共用型別時，從元件檔本身 import type。

## 程式碼風格

### Tailwind CSS

- 使用 `cn()` 工具函數合併類名
- 優先使用設計系統定義的顏色（primary, grayscale, success 等）
- 避免硬編碼顏色值
- **新元件禁止使用 `styled-components`**（`ActionInfiniteList` 因歷史因素使用，屬例外；新增元件一律 Tailwind + CSS variables）

```typescript
// 正確
className={cn('bg-primary-500', 'text-white', className)}

// 錯誤
className="bg-blue-500 text-white"
```

### Import 順序

由 `@trivago/prettier-plugin-sort-imports` 自動排序（`pnpm run format` 套用）：

1. **`@/` 別名 + 外部套件**（同一群組，整體按字母排序；`@` 排在字母前，所以 `@/` 通常在最前）
2. **相對路徑**（`./`, `../`）以空行與上方分隔

```typescript
// 實際排序範例（Prettier 自動產生）
import { CheckIcon } from '@/icons/CheckIcon';
import { cn } from '@/utils/cn';
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import type { CSSProperties, ReactNode } from 'react';
```

> 不要手動調整 import 順序，執行 `pnpm run format` 讓 Prettier 自動排序。

### 類型導入

使用 `import type` 語法導入純類型：

```typescript
import type { ComponentProps } from 'react';
```

### Icon 導入

元件源碼禁止 barrel import，必須指定完整路徑。原因：shadcn CLI 分發元件時只複製 `files` 陣列明確列出的檔案，無法解析 barrel（`index.tsx`）背後實際 re-export 了哪些圖示，完整路徑讓 CLI 能精確追蹤依賴。registry 安裝時 icons 會落在 `src/components/icons/*`；元件 registryDependencies 應列精確的 `@vital-design/icon-*`，不要用整包 `@vital-design/vital-icons`。stories / test 檔案不走 registry 分發，不受此限。

```typescript
// 正確（元件源碼）
import { CheckIcon } from '@/icons/CheckIcon';

// 錯誤（元件源碼）
import { CheckIcon } from '@/icons';

// 允許（stories / tests）
import { CheckIcon, CloseIcon } from '@/icons';
```

## 主題（Theme）

元件**不使用** React-level `theme` prop。主題透過 `vital-theme` registry 的 CSS variables 統一處理（如 `var(--primary-500)`、`var(--grayscale-900)`），在 HTML root 或容器套用 class 即可切換，元件本身無需額外 prop。

## Primitive Library

- `src-v2/` 新增或重構元件若需要 headless primitive，預設使用 `@base-ui/react`
- `src/` 是 legacy npm 分發面，僅供既有專案相容維護；新元件不得新增到 `src/`
- 目前 package build 入口仍是 `src/index.tsx`，docs 與 registry 的新增元件說明以 `src-v2/` 為準
- `@base-ui/react` 僅供 `src-v2/`、docs、registry 開發流程使用，根目錄 `package.json` 應維持在 `devDependencies`，避免 legacy npm package 對外帶出額外 runtime dependency
- `src-v2/styles/` 是 registry / docs 內部使用的 theme 資產，不是 npm package 公開 API；不要在 `package.json` exports 中暴露它
- 自訂輸入組合優先使用 `InputGroup` parts；按鈕群組優先使用 `ButtonGroup`。preset wrapper（如 `TextInput`、`PasswordInput`、`SearchBar`、`SplitButton`）需維持既有 props。

## Registry 規範

### 依賴宣告

- `registryDependencies` 必須使用 `@vital-design/` 前綴
- 使用 `cn()` 的元件必須列出 `clsx` 和 `tailwind-merge` 為 dependencies

### 元件類型

| 類型                 | 用途                                        | 檔案位置                              |
| -------------------- | ------------------------------------------- | ------------------------------------- |
| `registry:ui`        | UI 元件與 icon 元件                         | `src-v2/components/`、`src-v2/icons/` |
| `registry:lib`       | 工具庫與常數                                | `src-v2/utils/`、`src-v2/constants/`  |
| `registry:hook`      | React Hooks                                 | `src-v2/hooks/`                       |
| `registry:theme`     | CSS variables 主題（`vital-theme`）         | `registry/base.ts`                    |
| `registry:block`     | 複合區塊                                    | `src-v2/blocks/`                      |
| `registry:component` | block 組成檔案（block 的 files 陣列使用）   | —                                     |
| `registry:base`      | 一鍵安裝的 meta 套件（`vital-design-base`） | `registry/base.ts`（唯一，勿新增）    |

## 測試規範

### 測試檔案命名

`ComponentName.test.tsx`

### 測試結構

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import ComponentName from './ComponentName';

it('renders correctly', () => {
  render(<ComponentName />);
  // assertions
});

it('handles user interaction', async () => {
  const user = userEvent.setup();
  // interaction tests
});
```

> `describe` 為可選：簡單元件直接用頂層 `it()` 即可；有多個 variant 或場景需要分組時（如 Button、Avatar），才用 `describe` 組織。

### 樣式測試

使用 className 斷言：

```typescript
expect(element).toHaveClass('bg-primary-500');
```
