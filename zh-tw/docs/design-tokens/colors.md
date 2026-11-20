# 色彩

> Vittal Design 的色彩系統：primitive 色階、語意別名，以及具名的元件 token。

## 概覽

Vittal Design 的語意層沿用 [shadcn/ui](https://ui.shadcn.com/docs/theming) 的命名。顏色定義在 `tokens/`（Style Dictionary），建置成 `src-v2/styles/tokens/generated.css` 裡 `:root` 上的 CSS custom properties，暗色值寫在 `.dark`，再經 `@theme inline`（`--color-*`）交給 Tailwind。

```ts
// 3 layers, generated from tokens/*.json by Style Dictionary
primitive  →  semantic  →  component
```

- **Primitive 色階**（`--primary-50…900`、`--grayscale-100…900`、`--grayscale-opacity-100…900`、`--success-100…900` 等）是內部基礎。圖表、插圖，或需要指定某一階色調時再用。Tailwind utility：`bg-primary-500`、`text-grayscale-700`。
- **語意 token**（`--background`、`--primary`、`--card`、`--destructive` 等）是公開 API。它們描述用途，並搭配 `-foreground`，讓表面上的內容看得清楚。Tailwind utility：`bg-primary text-primary-foreground`。
- **元件 token**（`--avatar-*-fg`、`--tag-*-solid`）是特定元件使用的封閉色盤。

## 暗色模式

在祖先元素加上 `class="dark"`，通常是 `<html>`。使用 [next-themes](https://github.com/pacocoursey/next-themes) 時設定 `attribute="class"`。theme 不會跟著 `prefers-color-scheme` 切換。重新安裝 `@vital-design/vital-theme`，`cssVars.dark` 才會寫進應用的樣式表。

這一頁每個色票都列出兩個值：**L** 是亮色值，**D** 是暗色值。每一格都畫在該模式的頁面底色上，半透明的顏色會和實際畫面一樣。

### `.dark` 底下會改變的

- **Primitive 色階**的暗色值來自 `tokens/dark/colors.json`。`text-grayscale-opacity-800`、`bg-primary-500` 這類色階 class 會自動切換。
- **引用色階的語意 token** 會用暗色色階重算：`primary` → `primary.500`、`foreground` → `grayscale-opacity.900`、`border` → `grayscale-opacity.200`。
- **少數語意 token 有自己的暗色值**，寫在 `tokens/dark/colors.json`：`background`、`card`、`popover`（`#232327`），以及 `input`（`#444447`）。
- **以下維持亮色值：** 寫死白色的 `*-foreground`、下方的 avatar 與 tag 色盤，以及[效果](/zh-tw/docs/design-tokens/effects)頁的陰影與漸層 token。

`.dark` 的祖先元素會套用 `background` 和 `foreground`，所以放在頁面上的文字會用暗色文字色。

### 讓元件在兩種模式都正確

- 紙面用 `bg-background`，不要用 `bg-white`。
- 底色在暗色會變淺時（例如 `bg-grayscale-700`、`bg-grayscale-opacity-700`），字用 `text-background`，讓字跟著變深。Tag、Tooltip、solid Toast 都這樣做。
- 子元素要淡化父層字色時，用 `text-current/90`，不要用 `text-white/90`。
- `bg-white` 和 `text-white` 維持白色。只用在必須保持白色的標記（例如開關、滑桿和單選的圓點），以及兩種模式都不變的飽和底色上的字。
- 某一階在某個模式對比不足時，用 `dark:` variant 換另一階。資料表格的選取工具列用的是 `text-info-400 dark:text-info-200`。
- 不要用 `bg-[#f8f8f9]` 這類任意值寫死顏色，改用最接近的色階。

## Primary

主要色是一組藍色，用在可互動的元素、按鈕、焦點狀態與主要操作。

| Name            | Utility          | Light     | Dark      |
| --------------- | ---------------- | --------- | --------- |
| `--primary-900` | `bg-primary-900` | `#002040` | `#D6F5FF` |
| `--primary-800` | `bg-primary-800` | `#003A73` | `#BEF0FF` |
| `--primary-700` | `bg-primary-700` | `#0153A5` | `#99E7FF` |
| `--primary-600` | `bg-primary-600` | `#016DD8` | `#66DBFF` |
| `--primary-500` | `bg-primary-500` | `#0E86FE` | `#33CFFF` |
| `--primary-400` | `bg-primary-400` | `#419FFE` | `#33B0D9` |
| `--primary-300` | `bg-primary-300` | `#73B9FE` | `#3491B3` |
| `--primary-200` | `bg-primary-200` | `#A6D2FF` | `#34738E` |
| `--primary-100` | `bg-primary-100` | `#D9ECFF` | `#355468` |
| `--primary-50`  | `bg-primary-50`  | `#EBF5FF` | `#354151` |

## Grayscale

預設灰階完全不透明。表面必須不透明時用它，例如 popover、tooltip、toast、實心 chip。

| Name              | Utility            | Light     | Dark      |
| ----------------- | ------------------ | --------- | --------- |
| `--grayscale-900` | `bg-grayscale-900` | `#232327` | `#FFFFFF` |
| `--grayscale-800` | `bg-grayscale-800` | `#43434B` | `#DEDEDF` |
| `--grayscale-700` | `bg-grayscale-700` | `#63636F` | `#BDBDBE` |
| `--grayscale-600` | `bg-grayscale-600` | `#848492` | `#9C9C9E` |
| `--grayscale-500` | `bg-grayscale-500` | `#A8A8B2` | `#7B7B7D` |
| `--grayscale-400` | `bg-grayscale-400` | `#C8C8D0` | `#5A5A5D` |
| `--grayscale-300` | `bg-grayscale-300` | `#DEDEE2` | `#444447` |
| `--grayscale-200` | `bg-grayscale-200` | `#F0F0F2` | `#353538` |
| `--grayscale-100` | `bg-grayscale-100` | `#F9F9FA` | `#2A2A2D` |

## Grayscale (Opacity)

這個變體使用 `rgba(35, 35, 50, α)`，疊在任何背景上都會跟著調。用在 hover 色調、分隔線、停用欄位，以及其他需要半透明的狀態。`--grayscale-opacity-900` 是唯一的實心 hex。

| Name                      | Utility                      | Light                    | Dark                        |
| ------------------------- | ---------------------------- | ------------------------ | --------------------------- |
| `--grayscale-opacity-900` | `text-grayscale-opacity-900` | `#232332`                | `#FFFFFF`                   |
| `--grayscale-opacity-800` | `text-grayscale-opacity-800` | `rgba(35, 35, 50, 0.85)` | `rgba(255, 255, 255, 0.85)` |
| `--grayscale-opacity-700` | `text-grayscale-opacity-700` | `rgba(35, 35, 50, 0.70)` | `rgba(255, 255, 255, 0.70)` |
| `--grayscale-opacity-600` | `text-grayscale-opacity-600` | `rgba(35, 35, 50, 0.55)` | `rgba(255, 255, 255, 0.55)` |
| `--grayscale-opacity-500` | `text-grayscale-opacity-500` | `rgba(35, 35, 50, 0.40)` | `rgba(255, 255, 255, 0.40)` |
| `--grayscale-opacity-400` | `text-grayscale-opacity-400` | `rgba(35, 35, 50, 0.25)` | `rgba(255, 255, 255, 0.25)` |
| `--grayscale-opacity-300` | `text-grayscale-opacity-300` | `rgba(35, 35, 50, 0.15)` | `rgba(255, 255, 255, 0.15)` |
| `--grayscale-opacity-200` | `text-grayscale-opacity-200` | `rgba(35, 35, 50, 0.08)` | `rgba(255, 255, 255, 0.08)` |
| `--grayscale-opacity-150` | `text-grayscale-opacity-150` | `rgba(35, 35, 50, 0.05)` | `rgba(255, 255, 255, 0.05)` |
| `--grayscale-opacity-100` | `text-grayscale-opacity-100` | `rgba(35, 35, 50, 0.03)` | `rgba(255, 255, 255, 0.03)` |

## Success

正向回饋、確認，以及「已儲存」狀態。

| Name            | Utility          | Light     | Dark      |
| --------------- | ---------------- | --------- | --------- |
| `--success-900` | `bg-success-900` | `#082518` | `#D5F5E7` |
| `--success-800` | `bg-success-800` | `#104F33` | `#BBEFD8` |
| `--success-700` | `bg-success-700` | `#19794F` | `#95E6C3` |
| `--success-600` | `bg-success-600` | `#22A36A` | `#60D9A4` |
| `--success-500` | `bg-success-500` | `#2BCD86` | `#2BCD86` |
| `--success-400` | `bg-success-400` | `#51DA9E` | `#2DAF78` |
| `--success-300` | `bg-success-300` | `#7BE3B5` | `#2F906B` |
| `--success-200` | `bg-success-200` | `#A5ECCD` | `#31725D` |
| `--success-100` | `bg-success-100` | `#CFF5E4` | `#335350` |

## Info

資訊訊息與中性狀態。

| Name         | Utility       | Light     | Dark      |
| ------------ | ------------- | --------- | --------- |
| `--info-900` | `bg-info-900` | `#002733` | `#CCF3FF` |
| `--info-800` | `bg-info-800` | `#004E66` | `#ADECFF` |
| `--info-700` | `bg-info-700` | `#007599` | `#80E1FF` |
| `--info-600` | `bg-info-600` | `#009CCC` | `#40D2FF` |
| `--info-500` | `bg-info-500` | `#00C3FF` | `#00C3FF` |
| `--info-400` | `bg-info-400` | `#33CFFF` | `#0BA7D9` |
| `--info-300` | `bg-info-300` | `#66DBFF` | `#158AB3` |
| `--info-200` | `bg-info-200` | `#99E7FF` | `#206E8E` |
| `--info-100` | `bg-info-100` | `#CCF3FF` | `#2A5168` |

## Warning

提醒。不阻擋操作的輕度警告。

| Name            | Utility          | Light     | Dark      |
| --------------- | ---------------- | --------- | --------- |
| `--warning-900` | `bg-warning-900` | `#332200` | `#FFEDCC` |
| `--warning-800` | `bg-warning-800` | `#664300` | `#FFE3AD` |
| `--warning-700` | `bg-warning-700` | `#996400` | `#FFD380` |
| `--warning-600` | `bg-warning-600` | `#CC8600` | `#FFBD40` |
| `--warning-500` | `bg-warning-500` | `#FFA700` | `#FFA700` |
| `--warning-400` | `bg-warning-400` | `#FFB933` | `#D7900D` |
| `--warning-300` | `bg-warning-300` | `#FFCA66` | `#AE791A` |
| `--warning-200` | `bg-warning-200` | `#FFDC99` | `#866328` |
| `--warning-100` | `bg-warning-100` | `#FFEDCC` | `#5D4C35` |

## Destructive

錯誤、破壞性動作，以及擋下流程的驗證失敗。

| Name                | Utility              | Light     | Dark      |
| ------------------- | -------------------- | --------- | --------- |
| `--destructive-900` | `bg-destructive-900` | `#1F0B00` | `#FBDCCC` |
| `--destructive-800` | `bg-destructive-800` | `#521C00` | `#F9C7AD` |
| `--destructive-700` | `bg-destructive-700` | `#852D00` | `#F5A780` |
| `--destructive-600` | `bg-destructive-600` | `#B83F00` | `#F07C40` |
| `--destructive-500` | `bg-destructive-500` | `#EB5000` | `#EB5000` |
| `--destructive-400` | `bg-destructive-400` | `#FF6B1F` | `#C74B0D` |
| `--destructive-300` | `bg-destructive-300` | `#FF8D52` | `#A2451A` |
| `--destructive-200` | `bg-destructive-200` | `#FFAE85` | `#7E4028` |
| `--destructive-100` | `bg-destructive-100` | `#FFD0B8` | `#593A35` |

## 語意 token

依用途命名的別名，指向 primitive 顏色。每個表面都有配對的 `-foreground` token。一起用，文字在主題被覆寫時仍然看得清楚。

```tsx
<button className="bg-primary text-primary-foreground">Save</button>
<div className="bg-card text-card-foreground border border-border">…</div>
```

### 表面

頁面外框、card、popover，以及 muted / accent 區域。`background` 是頁面；`card` 與 `popover` 是抬高的容器；`muted` 與 `accent` 是淡的背景色調（例如表格斑馬紋、hover）。

| Name                   | Utility                   | Light                    | Dark                        |
| ---------------------- | ------------------------- | ------------------------ | --------------------------- |
| `--background`         | `bg-background`           | `#FFFFFF`                | `#232327`                   |
| `--foreground`         | `text-foreground`         | `#232332`                | `#FFFFFF`                   |
| `--card`               | `bg-card`                 | `#FFFFFF`                | `#232327`                   |
| `--card-foreground`    | `text-card-foreground`    | `#232332`                | `#FFFFFF`                   |
| `--popover`            | `bg-popover`              | `#FFFFFF`                | `#232327`                   |
| `--popover-foreground` | `text-popover-foreground` | `#232332`                | `#FFFFFF`                   |
| `--muted`              | `bg-muted`                | `rgba(35, 35, 50, 0.03)` | `rgba(255, 255, 255, 0.03)` |
| `--muted-foreground`   | `text-muted-foreground`   | `rgba(35, 35, 50, 0.70)` | `rgba(255, 255, 255, 0.70)` |
| `--accent`             | `bg-accent`               | `rgba(35, 35, 50, 0.08)` | `rgba(255, 255, 255, 0.08)` |
| `--accent-foreground`  | `text-accent-foreground`  | `#232332`                | `#FFFFFF`                   |

### 動作

品牌動作表面。`primary` 是主要行動呼籲；`secondary` 是另一種按鈕表面。

| Name                     | Utility                     | Light                    | Dark                        |
| ------------------------ | --------------------------- | ------------------------ | --------------------------- |
| `--primary`              | `bg-primary`                | `#0E86FE`                | `#33CFFF`                   |
| `--primary-foreground`   | `text-primary-foreground`   | `#FFFFFF`                | `#FFFFFF`                   |
| `--secondary`            | `bg-secondary`              | `rgba(35, 35, 50, 0.03)` | `rgba(255, 255, 255, 0.03)` |
| `--secondary-foreground` | `text-secondary-foreground` | `#232332`                | `#FFFFFF`                   |

### 狀態

回饋色，並配上前景色，讓內容看得清楚。

| Name                       | Utility                       | Light     | Dark      |
| -------------------------- | ----------------------------- | --------- | --------- |
| `--success`                | `bg-success`                  | `#2BCD86` | `#2BCD86` |
| `--success-foreground`     | `text-success-foreground`     | `#FFFFFF` | `#FFFFFF` |
| `--info`                   | `bg-info`                     | `#00C3FF` | `#00C3FF` |
| `--info-foreground`        | `text-info-foreground`        | `#FFFFFF` | `#FFFFFF` |
| `--warning`                | `bg-warning`                  | `#FFA700` | `#FFA700` |
| `--warning-foreground`     | `text-warning-foreground`     | `#232332` | `#FFFFFF` |
| `--destructive`            | `bg-destructive`              | `#EB5000` | `#EB5000` |
| `--destructive-foreground` | `text-destructive-foreground` | `#FFFFFF` | `#FFFFFF` |

### 表單

框線、輸入框線條與焦點環。`border` 是 0.08 的細線，用於分隔線與單邊框，也是沒有指定顏色的 `border` class 的預設色。`border-overlap` 是實色，用於會相疊或交叉的邊線，例如群組中的 avatar 外框或樹狀軌道；半透明的線在那裡會變深。`input` 畫表單欄位的線條；`ring` 畫焦點外框。

| Name               | Utility                 | Light                    | Dark                        |
| ------------------ | ----------------------- | ------------------------ | --------------------------- |
| `--border`         | `border-border`         | `rgba(35, 35, 50, 0.08)` | `rgba(255, 255, 255, 0.08)` |
| `--border-overlap` | `border-border-overlap` | `#DEDEE2`                | `#444447`                   |
| `--input`          | `border-input`          | `#DEDEE2`                | `#444447`                   |
| `--ring`           | `ring-ring`             | `#0E86FE`                | `#33CFFF`                   |

### 圖表

資料視覺化的五階色盤。預設依 `primary → success → warning → info → destructive` 輪替，圖表系列會跟著品牌色，不受主題覆寫影響。

| Name        | Utility      | Light     | Dark      |
| ----------- | ------------ | --------- | --------- |
| `--chart-1` | `bg-chart-1` | `#0E86FE` | `#33CFFF` |
| `--chart-2` | `bg-chart-2` | `#2BCD86` | `#2BCD86` |
| `--chart-3` | `bg-chart-3` | `#FFA700` | `#FFA700` |
| `--chart-4` | `bg-chart-4` | `#00C3FF` | `#00C3FF` |
| `--chart-5` | `bg-chart-5` | `#EB5000` | `#EB5000` |

### Sidebar

應用側邊欄的外框 slot（相容 shadcn）。[Sidebar](/zh-tw/docs/components/sidebar) primitive 使用 `bg-sidebar`、`text-sidebar-foreground`、`border-sidebar-border`。產品 block 可以覆寫個別 slot（例如 cloud shell 上的 `[--sidebar:transparent]`）。

| Slot                           | 預設別名                    |
| ------------------------------ | ----------------------- |
| `--sidebar`                    | `grayscale.100`         |
| `--sidebar-foreground`         | `grayscale.900`         |
| `--sidebar-primary`            | `primary.500`           |
| `--sidebar-primary-foreground` | white                   |
| `--sidebar-accent`             | `primary.50`            |
| `--sidebar-accent-foreground`  | `primary.700`           |
| `--sidebar-border`             | `grayscale-opacity.200` |
| `--sidebar-ring`               | `primary.300`           |

| Name                           | Utility                           | Light                    | Dark                        |
| ------------------------------ | --------------------------------- | ------------------------ | --------------------------- |
| `--sidebar`                    | `bg-sidebar`                      | `#F9F9FA`                | `#2A2A2D`                   |
| `--sidebar-foreground`         | `text-sidebar-foreground`         | `#232327`                | `#FFFFFF`                   |
| `--sidebar-primary`            | `bg-sidebar-primary`              | `#0E86FE`                | `#33CFFF`                   |
| `--sidebar-primary-foreground` | `text-sidebar-primary-foreground` | `#FFFFFF`                | `#FFFFFF`                   |
| `--sidebar-accent`             | `bg-sidebar-accent`               | `#EBF5FF`                | `#354151`                   |
| `--sidebar-accent-foreground`  | `text-sidebar-accent-foreground`  | `#0153A5`                | `#99E7FF`                   |
| `--sidebar-border`             | `border-sidebar-border`           | `rgba(35, 35, 50, 0.08)` | `rgba(255, 255, 255, 0.08)` |
| `--sidebar-ring`               | `ring-sidebar-ring`               | `#73B9FE`                | `#3491B3`                   |

### Vittal 擴充

Vittal Design 獨有、shadcn 沒有對應的 token。為了和生態一致，不加前綴（與 Origin UI 的擴充方式相同）。

| Name                    | Light                    | Dark                        |
| ----------------------- | ------------------------ | --------------------------- |
| `--text-tertiary`       | `rgba(35, 35, 50, 0.55)` | `rgba(255, 255, 255, 0.55)` |
| `--text-disabled`       | `rgba(35, 35, 50, 0.25)` | `rgba(255, 255, 255, 0.25)` |
| `--interactive-hover`   | `#016DD8`                | `#66DBFF`                   |
| `--interactive-pressed` | `#0153A5`                | `#99E7FF`                   |
| `--interactive-subtle`  | `#EBF5FF`                | `#354151`                   |

## Avatar 色盤

每個具名 avatar 顏色有三個 token：`fg`（文字 / 縮寫）、`border`、`bg`。由 `AvatarRoot color="…"` 使用。這些 token 只有亮色值，所以在 `.dark` 底下 avatar 的顏色不變。

| Name         | Color                    | Border                       | Bg                       |
| ------------ | ------------------------ | ---------------------------- | ------------------------ |
| `tiffany`    | `--avatar-tiffany-fg`    | `--avatar-tiffany-border`    | `--avatar-tiffany-bg`    |
| `green`      | `--avatar-green-fg`      | `--avatar-green-border`      | `--avatar-green-bg`      |
| `orange`     | `--avatar-orange-fg`     | `--avatar-orange-border`     | `--avatar-orange-bg`     |
| `pink`       | `--avatar-pink-fg`       | `--avatar-pink-border`       | `--avatar-pink-bg`       |
| `blue`       | `--avatar-blue-fg`       | `--avatar-blue-border`       | `--avatar-blue-bg`       |
| `sky`        | `--avatar-sky-fg`        | `--avatar-sky-border`        | `--avatar-sky-bg`        |
| `purple`     | `--avatar-purple-fg`     | `--avatar-purple-border`     | `--avatar-purple-bg`     |
| `light-gold` | `--avatar-light-gold-fg` | `--avatar-light-gold-border` | `--avatar-light-gold-bg` |
| `salmon`     | `--avatar-salmon-fg`     | `--avatar-salmon-border`     | `--avatar-salmon-bg`     |
| `ice`        | `--avatar-ice-fg`        | `--avatar-ice-border`        | `--avatar-ice-bg`        |
| `lavender`   | `--avatar-lavender-fg`   | `--avatar-lavender-border`   | `--avatar-lavender-bg`   |

```css
background: var(--avatar-tiffany-bg);
border-color: var(--avatar-tiffany-border);
color: var(--avatar-tiffany-fg);
```

## Tag 色盤

每個具名 tag 顏色有 `solid`（文字 / 圖示）與 `tint`（背景）。由 `Tag color="…"` 使用。這些 token 只有亮色值，所以在 `.dark` 底下 tag 的顏色不變。

| Name     | Solid                | Tint                |
| -------- | -------------------- | ------------------- |
| `teal`   | `--tag-teal-solid`   | `--tag-teal-tint`   |
| `olive`  | `--tag-olive-solid`  | `--tag-olive-tint`  |
| `brown`  | `--tag-brown-solid`  | `--tag-brown-tint`  |
| `rose`   | `--tag-rose-solid`   | `--tag-rose-tint`   |
| `indigo` | `--tag-indigo-solid` | `--tag-indigo-tint` |
| `blue`   | `--tag-blue-solid`   | `--tag-blue-tint`   |
| `green`  | `--tag-green-solid`  | `--tag-green-tint`  |
| `gold`   | `--tag-gold-solid`   | `--tag-gold-tint`   |
| `red`    | `--tag-red-solid`    | `--tag-red-tint`    |
| `purple` | `--tag-purple-solid` | `--tag-purple-tint` |
| `navy`   | `--tag-navy-solid`   | `--tag-navy-tint`   |

```css
background: var(--tag-teal-tint);
color: var(--tag-teal-solid);
```
