# Border Radius

> Corner radius tokens shared by inputs, buttons, cards, and dialogs.

## Tokens

Vittal Design exposes six radius steps via CSS custom properties.
They are mapped to Tailwind's `rounded-*` utilities, so you can use
either form.

| Name            | Value    | Utility        |
| --------------- | -------- | -------------- |
| `--radius-none` | `0px`    | `rounded-none` |
| `--radius-sm`   | `4px`    | `rounded-sm`   |
| `--radius-md`   | `8px`    | `rounded-md`   |
| `--radius-lg`   | `15px`   | `rounded-lg`   |
| `--radius-xl`   | `16px`   | `rounded-xl`   |
| `--radius-full` | `9999px` | `rounded-full` |

## Usage Guidance

| Token           | Recommended usage                                             |
| --------------- | ------------------------------------------------------------- |
| `--radius-none` | Square corners — utility surfaces, inline edge-to-edge groups |
| `--radius-sm`   | Small inputs, compact buttons, tags                           |
| `--radius-md`   | Default form controls, table cells, cards                     |
| `--radius-lg`   | Medium buttons, alert containers                              |
| `--radius-xl`   | Cards, dialogs, large buttons                                 |
| `--radius-full` | Pill / circular shapes — chips, avatars, status dots          |

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

## Combining With Sizes

Pair radius tokens with size utilities to get consistent component
shapes. Vittal's button, input, and chip components all key off the
same scale internally.

rounded-sm

rounded-md

rounded-lg

rounded-xl

rounded-full
