# Typography

> Font family, type scale, weights, and text style conventions used across Vittal Design.

## Font Family

Vittal Design ships a single sans-serif stack via the `--font-sans`
CSS variable, registered as the Tailwind `font-sans` token.

```css
--font-sans:
  Roboto,
  'Noto Sans TC',
  'PingFang TC',
  'Microsoft JhengHei',
  sans-serif;
```

The stack prioritises:

1. **Roboto** — Latin / UI text
2. **Noto Sans TC** / **PingFang TC** / **Microsoft JhengHei** —
   Traditional Chinese fallbacks

```html
<p class="font-sans">Vittal Design 元件庫</p>
```

Vittal Design 元件庫 — Roboto, 你好, 1234567890

## Type Scale

Vittal Design relies on Tailwind's default type scale — there are no
project-specific font-size tokens. Reach for these utilities for
content typography.

### Heading 1 — `text-4xl`

Build elegant interfaces faster.

```html
<h1 class="text-4xl font-semibold tracking-tight">…</h1>
```

### Heading 2 — `text-3xl`

Composable, accessible primitives.

```html
<h2 class="text-3xl font-semibold tracking-tight">…</h2>
```

### Heading 3 — `text-2xl`

Section heading

```html
<h3 class="text-2xl font-semibold">…</h3>
```

### Heading 4 — `text-xl`

Subsection heading

```html
<h4 class="text-xl font-semibold">…</h4>
```

### Lead — `text-lg`

A larger paragraph used to introduce a section or summarize the
page.

```html
<p class="text-lg text-grayscale-opacity-700">…</p>
```

### Paragraph — `text-base`

The default body size. Use this for paragraph copy in
long-form content.

```html
<p class="text-base text-grayscale-opacity-800">…</p>
```

### Small — `text-sm`

Form labels, table cells, button text, and other UI copy default
to this size.

```html
<p class="text-sm text-grayscale-opacity-700">…</p>
```

### Caption — `text-xs`

Helper text, captions, metadata, and small labels.

```html
<p class="text-xs text-grayscale-opacity-600">…</p>
```

> See the [Tailwind type scale docs](https://tailwindcss.com/docs/font-size)
> for the full range (`text-xs` through `text-9xl`).

## Weights

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

## Text Color

Vittal Design's grayscale palette uses progressive transparency, so
the same text token reads consistently on light and tinted
backgrounds. Use the semantic `--text-*` tokens for intent, or pick
a grayscale step directly when you need exact contrast control.

| Usage            | Semantic                      | Grayscale step               |
| ---------------- | ----------------------------- | ---------------------------- |
| Primary content  | `text-(--foreground)`         | `text-grayscale-opacity-900` |
| Body / paragraph | —                             | `text-grayscale-opacity-800` |
| Secondary text   | `text-(--muted-foreground)`   | `text-grayscale-opacity-700` |
| Muted text       | `text-(--text-tertiary)`      | `text-grayscale-opacity-600` |
| Placeholder      | `text-(--text-disabled)`      | `text-grayscale-opacity-400` |
| On accent bg     | `text-(--primary-foreground)` | —                            |

Primary — grayscale-opacity-900
Body — grayscale-opacity-800
Secondary — grayscale-opacity-700
Muted — grayscale-opacity-600
Placeholder — grayscale-opacity-400

## Inline Elements

### Code

Use

var(--primary-500)

inside CSS or the matching Tailwind utility in markup.

### Link

Read the

tailwind setup guide

before scaffolding a new app.
