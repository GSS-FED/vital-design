# 字體

> Vittal Design 使用的字型家族、字級、字重與文字樣式。

## 字型家族

Vittal Design 透過 `--font-sans` 提供一組無襯線字型，並註冊成 Tailwind 的 `font-sans` token。

```css
--font-sans:
  Roboto,
  'Noto Sans TC',
  'PingFang TC',
  'Microsoft JhengHei',
  sans-serif;
```

這組字型的順序是：

1. **Roboto** — 拉丁字母與介面文字
2. **Noto Sans TC** / **PingFang TC** / **Microsoft JhengHei** — 繁體中文的後備字型

```html
<p class="font-sans">Vittal Design 元件庫</p>
```

Vittal Design 元件庫 — Roboto, 你好, 1234567890

## 字級

Vittal Design 使用 Tailwind 的預設字級，沒有專案自己的 font-size token。內文排版用這些 utility。

### 標題 1 — `text-4xl`

更快做出清楚的介面。

```html
<h1 class="text-4xl font-semibold tracking-tight">…</h1>
```

### 標題 2 — `text-3xl`

可組合的無障礙 primitive。

```html
<h2 class="text-3xl font-semibold tracking-tight">…</h2>
```

### 標題 3 — `text-2xl`

章節標題

```html
<h3 class="text-2xl font-semibold">…</h3>
```

### 標題 4 — `text-xl`

小節標題

```html
<h4 class="text-xl font-semibold">…</h4>
```

### 導言 — `text-lg`

用來帶出一個段落，或摘要這一頁。

```html
<p class="text-lg text-grayscale-opacity-700">…</p>
```

### 內文 — `text-base`

內文的預設尺寸。長文用這個大小。

```html
<p class="text-base text-grayscale-opacity-800">…</p>
```

### 小字 — `text-sm`

表單標籤、表格儲存格、按鈕文字等介面文字用這個尺寸。

```html
<p class="text-sm text-grayscale-opacity-700">…</p>
```

### 圖說 — `text-xs`

輔助說明、圖說、後設資料與小標籤。

```html
<p class="text-xs text-grayscale-opacity-600">…</p>
```

> 完整範圍（`text-xs` 到 `text-9xl`）見 [Tailwind 字級文件](https://tailwindcss.com/docs/font-size)。

## 字重

font-normal
The quick brown fox jumps over the lazy dog.

font-medium
The quick brown fox jumps over the lazy dog.

font-semibold
The quick brown fox jumps over the lazy dog.

font-bold
The quick brown fox jumps over the lazy dog.

```html
<p class="font-normal">Body text</p>
<p class="font-medium">Form labels and emphasised UI text</p>
<p class="font-semibold">Headings and high-weight UI text</p>
<p class="font-bold">Reserved for marketing and display text</p>
```

## 文字顏色

Vittal Design 的灰階用漸進透明度，同一組文字 token 在淺色與帶色背景上都讀得一致。依用途使用語意 `--text-*` token；需要精確控制對比時，直接選灰階。

| 用途      | 語意                            | 灰階                           |
| ------- | ----------------------------- | ---------------------------- |
| 主要內容    | `text-(--foreground)`         | `text-grayscale-opacity-900` |
| 內文      | —                             | `text-grayscale-opacity-800` |
| 次要文字    | `text-(--muted-foreground)`   | `text-grayscale-opacity-700` |
| 淡文字     | `text-(--text-tertiary)`      | `text-grayscale-opacity-600` |
| 佔位文字    | `text-(--text-disabled)`      | `text-grayscale-opacity-400` |
| 強調背景上的字 | `text-(--primary-foreground)` | —                            |

主要內容 — grayscale-opacity-900
內文 — grayscale-opacity-800
次要文字 — grayscale-opacity-700
淡文字 — grayscale-opacity-600
佔位文字 — grayscale-opacity-400

## 行內元素

### 程式碼

在 CSS 裡使用

var(--primary-500)

，或在標記裡使用對應的 Tailwind utility。

### 連結

開始新專案前，先看

Tailwind 設定說明

。
