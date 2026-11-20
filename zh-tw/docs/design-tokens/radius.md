# 圓角

> input、按鈕、card 與 dialog 共用的圓角 token。

## Token

Vittal Design 用 CSS custom properties 提供六階圓角。它們對應 Tailwind 的 `rounded-*` utility，兩種寫法都可以。

| Name            | Value    | Utility        |
| --------------- | -------- | -------------- |
| `--radius-none` | `0px`    | `rounded-none` |
| `--radius-sm`   | `4px`    | `rounded-sm`   |
| `--radius-md`   | `8px`    | `rounded-md`   |
| `--radius-lg`   | `15px`   | `rounded-lg`   |
| `--radius-xl`   | `16px`   | `rounded-xl`   |
| `--radius-full` | `9999px` | `rounded-full` |

## 用法

| Token           | 建議用法                  |
| --------------- | --------------------- |
| `--radius-none` | 直角。工具表面、貼齊邊緣的行內群組     |
| `--radius-sm`   | 小 input、緊湊按鈕、tag      |
| `--radius-md`   | 預設表單控制項、表格儲存格、card    |
| `--radius-lg`   | 中型按鈕、alert 容器         |
| `--radius-xl`   | card、dialog、大型按鈕      |
| `--radius-full` | 膠囊與圓形。chip、avatar、狀態點 |

```css
/* CSS */
.card {
  border-radius: var(--radius-md);
}
```

```html
<!-- Tailwind utility -->
<div class="rounded-md">…</div>
```

## 與尺寸搭配

圓角 token 配上尺寸 utility，元件外形才一致。Button、input、chip 內部都用同一組比例。

rounded-sm

rounded-md

rounded-lg

rounded-xl

rounded-full
