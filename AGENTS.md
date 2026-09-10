# AGENTS.md

**pnpm workspace monorepo**，包含兩個 package：

- **`@fed/vital-design`**（根目錄）- 使用 TypeScript 和 Tailwind CSS 建構的 React 元件庫
- **`@fed/vital-docs`**（`apps/docs/`）- 使用 Fumadocs 建構的元件文件站

## Commands

```bash
# 元件庫
pnpm install               # 安裝依賴
pnpm run dev               # Storybook (port 6006)
pnpm run build             # 建置元件庫
pnpm run test              # 執行測試
pnpm run test:coverage     # 計算測試覆蓋率
pnpm run test:watch        # 監測檔案變更時重新執行測試
pnpm run lint              # ESLint 檢查
pnpm run format            # Prettier 格式化
pnpm run storybook:build   # 把 Storybook 打包成靜態網頁
pnpm run tokens:build      # 重建所有 token 平台（generated.css + vital-theme-vars.ts）
pnpm run tokens:build:css  # 僅重建 CSS tokens
pnpm run registry:generate # 從 registry/*.ts 產生 registry.json
pnpm run registry:build    # 產生 registry.json + 建置 public/r/
pnpm run registry:validate # 驗證 registry 完整性（CI 用）

# 文件站（apps/docs/）
pnpm docs:dev              # Fumadocs dev server (port 3000)
pnpm docs:lint             # 檢查 docs app 的 ESLint 與 Next.js 規則
pnpm docs:build            # 建置文件站靜態頁面（含 registry JSON → /r）
pnpm docs:start            # 啟動生產環境文件站
```

## AI Commands

| Command          | 對應 Skill      | 說明                         |
| ---------------- | --------------- | ---------------------------- |
| `/new-component` | `new-component` | 建立新原子 UI 元件           |
| `/add-registry`  | `add-registry`  | 將元件或 block 加入 registry |
| `/add-docs`      | `add-docs`      | 為元件或 block 建立文件頁面  |
| `/create-block`  | `create-block`  | 建立複合 UI 區塊             |
| `/check-quality` | `check-quality` | 執行程式碼與文件一致性檢查   |

## AI Skills

| Skill           | 說明                                             |
| --------------- | ------------------------------------------------ |
| `new-component` | 建立新的原子 UI 元件                             |
| `add-registry`  | 維護 `registry/*.ts` 並產生 shadcn registry 項目 |
| `add-docs`      | 補齊 Fumadocs 頁面、preview 與導覽               |
| `create-block`  | 使用既有 VD 元件組合出 block                     |
| `check-quality` | 檢查型別、lint、測試、registry 與文件同步狀態    |

## Tech Stack

### 元件庫（根目錄）

- **React 18** + **TypeScript 5** - 核心框架
- **Tailwind CSS 4** - 樣式框架
- **Vite 5** - 建置工具
- **Vitest** + **Testing Library** - 測試
- **Storybook 8** - 元件文件
- **Base UI** - `src-v2/` 預設的無障礙 primitive library

### 文件站（apps/docs/）

- **Next.js 15** - 文件站框架
- **Fumadocs 15**（fumadocs-core + fumadocs-ui）- 文件 UI 與路由
- **rehype-pretty-code** + **Shiki** - 程式碼區塊語法高亮
- **Orama** - 全文搜尋（built-in via fumadocs-core）

## Project Structure

### 元件庫（根目錄）

- `src-v2/components/` - UI 元件
- `src-v2/blocks/` - 複合區塊
- `src-v2/hooks/` - React Hooks
- `src-v2/icons/` - SVG 圖示
- `src-v2/utils/` - 工具函數（`cn.ts` 等）
- `src-v2/styles/` - 全域 CSS（`globals.css`）
- 路徑別名：`@/` → `src-v2/`
- `tokens/` - Design token 定義（Style Dictionary v5，三層結構）
  - `tokens/primitive/` - raw values（colors, typography, radius）
  - `tokens/semantic/` - intent-based（shadows, gradients, color aliases）
  - `tokens/component/` - component-specific（avatar, tag）
  - 建置輸出：`src-v2/styles/tokens/generated.css`（CSS）、`registry/vital-theme-vars.ts`（TypeScript）

### 文件站（apps/docs/）

- `apps/docs/app/` - Next.js App Router（含 `[[...slug]]/page.tsx`）
- `apps/docs/components/previews/` - 互動 preview 元件（`'use client'`，含 useState）
- `apps/docs/components/vital-components.ts` - `'use client'` barrel，MDX 頁面可直接 import 元件做靜態 preview（無需 state 時使用）
- `apps/docs/content/docs/` - MDX 文件內容（components/、blocks/、getting-started/、design-tokens/、registry/）
- `apps/docs/source.config.ts` - Fumadocs MDX 設定（rehype-pretty-code）
- `apps/docs/app/api/search/route.ts` - Orama 全文搜尋 API
- 路徑別名：`@/` → `src-v2/`（元件庫），`~/` → `apps/docs/`（文件站）

## Code Style

- 使用 `cn()` 合併 Tailwind 類名
- Import 順序：`@/` 別名與外部套件同組按字母排序（`@` 排在前），相對路徑最後；`pnpm run format` 自動套用
- 類型使用 `import type` 語法

## Git Workflow

- **Commit 規範**：Conventional Commits（Angular convention，commitlint 強制）
- **Pre-commit**：Husky + lint-staged
- **發布**：main 分支 semantic-release

### 分支策略

| 分支      | 說明           | 合併規則                                      |
| --------- | -------------- | --------------------------------------------- |
| `main`    | 發佈用，受保護 | 只接受來自 `develop` 的 MR，合併後不刪除      |
| `develop` | 整合用，受保護 | 接受來自支援分支的 MR，合併後不刪除           |
| 支援分支  | 功能/修復開發  | 從 `develop` 建立，MR 合併回 `develop` 後刪除 |

### 支援分支命名規則

以 issue 類別為前綴、issue 編號為名：

- `feat/655` — 新功能
- `fix/123` — Bug 修復
- `docs/456` — 文件
- `refactor/789` — 重構
- `chore/321` — 維護

## Boundaries

### 檔案限制

- `public/r/` - 自動產生，勿手動編輯
- `registry.json` - 自動產生，勿手動編輯（由 `registry/*.ts` 產生）
- `registry/` - TypeScript source，新增/修改元件的 registry 定義於此，修改後執行 `registry:build`

### AI 行為指引

- 不要自行新增設計 tokens
- 不要修改 Prettier/ESLint 設定
- 新元件必須遵循現有結構模式
- 任何結構性變動後（新增/刪除元件、修改 registry 結構、調整路徑或命名規範）須同步檢查並更新 `AGENTS.md`、`.agents/RULES.md`、`.agents/commands/`、`.agents/skills/` 中的相關說明
- `.agents/` 是 AI workflow 文件唯一來源；`.claude` 是指向 `.agents` 的 symlink，不要分開維護兩份

詳細開發規範見 `.agents/RULES.md`

本機額外規則（若存在）：`.agents/local/RULES.local.md`（gitignore，不進 repo）

## Known Gotchas

- **Icon 系統**：icon 真實 source 是 `src-v2/icons/_source/*.svg`，分 `custom/` 與 `fontawesome/` 兩個 folder（FA 限 Free CC BY 4.0，附 `CREDITS.md`）。`.tsx` 由 `pnpm run icons:build`（SVGR）產生，**不要手改**——改 SVG 然後重跑。所有 icon API 統一為 `SVGProps<SVGSVGElement>`，預設 `width="1em" height="1em"` 與 `aria-hidden="true"`。filled source 生成 `fill="currentColor"`；root 同時有 `fill="none"` 與 `stroke` 的 stroke source 生成 `fill="none"`（呼叫端不必再傳 `fill-none`）。尺寸用 Tailwind `size-N`（或父層 `text-N` 經 `1em` 繼承），顏色用 `text-*` utility，**禁止 `color` / `opacity` / `fillOpacity` props**。需要動畫的 spinner 用 `<Spinner />` wrapper（含 `animate-spin` 與 `role="status"`），不要直接用 `SpinnerIcon`。每個 icon 各自一個檔案、各自一個 registry item（含 chevron 6 個方向），import 走精確路徑（例：`@/icons/ChevronDownIcon`），不使用 barrel。
- **Icon 導入**：元件源碼禁止 barrel import，需指定完整路徑（例：`@/icons/SearchIcon`）；registry 安裝時 icons 會落在 `src/components/icons/*`，元件 registryDependencies 應列精確的 `@vital-design/icon-*`，不要用整包 `@vital-design/vital-icons`；stories/test 不走 registry 分發，不受此限
- **Colors**：元件一律使用 CSS variables（`var(--primary-500)`）或 Tailwind utility class
- **Shadows**：同上，使用 `var(--shadow-emphasis)` 等 CSS variables
- **Registry 依賴**：`registryDependencies` 必須加 `@vital-design/` 前綴
- **Compound 基礎元件**：單行文字輸入使用 `Input` primitive；自訂輸入組合優先使用 `InputGroup` parts；按鈕群組優先使用 `ButtonGroup`。`PasswordInput`、`SearchBar`、`SplitButton` 保持 preset/compat wrapper。
- **src-v2 exports**：`src-v2` components use named exports only; do not add component default exports.
- **Button icons**：`Button` / `SplitButton` 不使用 `icon` / `iconPlacement` props；icon 或 spinner 作為 children 傳入，並在 icon 上標 `data-icon="inline-start"` 或 `data-icon="inline-end"`。Button label size 使用 `md` / `lg`；icon-only Button 使用 `icon-md` / `icon-lg`。
- **CVA helpers**：`src-v2` components may use `cva()` internally, but must not export raw variant helpers such as `buttonVariants`; component defaults live on the component API.
- **Select family**：v2 public selection components are split by interaction: `Select` = flat dropdown for single or multiple values, `Combobox` = searchable input picker, `Command` + `Popover` = hierarchical path picker recipe, `DropdownMenu` = action menu (no value binding). `Command` is also public — a primitive for command palettes, custom searchable popups, and paged hierarchical pickers.
- **Item**：display row primitive for media/title/description/actions. Use `size="list"` for select/list row density. Do not add search, loading, paging, or selection state to `Item`; use picker/menu/command primitives for those.
- **Separator**：shared divider primitive. Prefer it over hand-rolled `div role="separator"` in new `src-v2` components.
- **cn() 依賴**：registry 需列出 clsx + tailwind-merge
- **文件站 Preview 元件**：`apps/docs/components/previews/` 的元件必須有 `'use client'`，因為 MDX 頁面是 RSC，不能直接傳 inline function prop（如 `onChange={() => {}}`）
- **文件站 .next 快取**：修改 `apps/docs/source.config.ts` 後，須執行 `rm -rf apps/docs/.next` 再重建，否則 source config hash 不符導致新頁面 404
- **文件站路徑別名**：`@/` 指向 `src-v2/`（元件庫），`~/` 指向 `apps/docs/`（文件站），兩個 alias 並存於 `apps/docs/next.config.ts`
- **src/ vs src-v2/**：根目錄同時存在 `src/`（legacy npm 分發面，供既有專案相容維護）和 `src-v2/`（新元件與 registry 分發主路徑）；所有新元件開發均在 `src-v2/`，不得新增到 `src/`
- **Primitive 選型**：`src-v2/` 新增或重構元件若需要 headless primitive，預設使用 `@base-ui/react`；目前 package build 入口仍是 `src/index.tsx`，docs 與 registry 內容則以 `src-v2/` 為主
- **src-v2-only 套件位置**：僅供 `src-v2/`、docs、registry 或 stories 使用的套件，根目錄 `package.json` 請維持在 `devDependencies`，避免 legacy npm package 對外安裝額外 runtime dependency；registry 安裝所需套件則由 `registry/*.ts` 的 `dependencies` 個別宣告
- **src-v2/styles 邊界**：`src-v2/styles/` 是 registry / docs 內部使用的 theme 資產，不是 npm package 的公開匯出；不要在 `package.json` exports 中暴露它
- **data-slot**：三層合約 — (1) 會 render 可樣式化 DOM 的 exported part 必須有 slot；(2) Trigger 禁止 passthrough，須 wrapper（`DialogTrigger` 為範本）；(3) 僅 Provider / 純 state Root / bare Portal 可豁免。命名：root `button`、subpart `select-trigger`。詳見 `.agents/RULES.md` 與 docs Tailwind setup。

## Registry

- URL：`https://vittal.design/r`
- 構建：`pnpm run registry:build`
- 詳見：`/add-registry` skill
