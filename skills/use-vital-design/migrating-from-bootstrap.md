# Migrating from Bootstrap

Branch of the `use-vital-design` workflow for apps currently styled with Bootstrap.

## Forms

Formik `<Field type="checkbox">` binds to a native input. Vital controls do not. Wire each one from its own callback:

- `Input` forwards the DOM change event and accepts `name`, so `value={values.email}` with `onChange={handleChange}` works.
- `PasswordInput` and `SearchBar` call `onChange` with a `string` and have no `name`. `handleChange` then reads `event.target` on that string and the field stays empty. Write the value back yourself:

  ```tsx
  <PasswordInput
    value={values.password}
    onChange={(value) => setFieldValue('password', value)}
  />
  ```

- `Checkbox` uses `checked` (`boolean`) and `onCheckedChange`. Mixed state is `indeterminate`, not `checked="'indeterminate'"`. See the Checkbox example in `SKILL.md`.

## Test contracts

Tests written against Bootstrap markup move to Vital's ARIA contracts:

| Old contract (Bootstrap)                                               | New contract (Vital)                                                        |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `input.checked` (HTMLInputElement)                                     | `checkbox.getAttribute('aria-checked')`                                     |
| CSS class `text-decoration-line-through`                               | CSS class `line-through` (Tailwind)                                         |
| `role="menu"` + Bootstrap `show` class                                 | your own `aria-expanded` / conditional render                               |
| `getByRole('button', …)` for dropdown items                            | `getByRole('menuitem', …)`                                                  |
| `fireEvent.change(select, { target: { value } })` on native `<select>` | click `getByRole('combobox', …)`, then `getByRole('option', { name })`      |
| Toast with `role="status"`                                             | Vital `Toast` renders `role="dialog"`, like `Dialog`; query dialogs by name |

**Done when**: every Bootstrap class, `bootstrap-icons` glyph, and Bootstrap JS behaviour in the app has a Vital or Tailwind replacement, and no test asserts on Bootstrap markup.
