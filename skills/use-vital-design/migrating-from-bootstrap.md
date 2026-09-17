# Migrating from Bootstrap

Branch of the `use-vital-design` workflow for apps currently styled with Bootstrap.

## Forms

Formik `<Field type="checkbox">` binds to a native input. Drive every Vital input from Formik render props (`values` / `handleChange` / `setFieldValue`), as in the Checkbox example in `SKILL.md`.

## Test contracts

Tests written against Bootstrap markup move to Vital's ARIA contracts:

| Old contract (Bootstrap)                    | New contract (Vital)                            |
| ------------------------------------------- | ----------------------------------------------- |
| `input.checked` (HTMLInputElement)          | `checkbox.getAttribute('aria-checked')`         |
| CSS class `text-decoration-line-through`    | CSS class `line-through` (Tailwind)             |
| `role="menu"` + Bootstrap `show` class      | your own `aria-expanded` / conditional render   |
| `getByRole('button', …)` for dropdown items | `getByRole('menuitem', …)`                      |

**Done when**: every Bootstrap class, `bootstrap-icons` glyph, and Bootstrap JS behaviour in the app has a Vital or Tailwind replacement, and no test asserts on Bootstrap markup.
