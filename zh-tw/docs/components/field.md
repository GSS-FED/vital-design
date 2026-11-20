# Field

> 可組合的表單欄位版面，包含標籤、說明、錯誤與群組。

## 預覽

```tsx
import {
  Field,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';

export function FieldExample() {
  return (
    <Field className="w-80">
      <FieldLabel htmlFor="field-email">Email</FieldLabel>
      <Input id="field-email" placeholder="name@example.com" />
      <FieldDescription>
        Used for notifications and account recovery.
      </FieldDescription>
    </Field>
  );
}
```

## 用法

`Field` 是版面 primitive，用來排列標籤、控制項、說明與錯誤訊息。把 `FieldLabel` 的 `htmlFor` 對到控制項的 `id`，焦點與點擊才有無障礙行為。

## 方向

`Field` 支援 `vertical`（預設）、`horizontal` 與 `responsive`。`responsive` 會在父層 `FieldGroup` 定義的 `@md` container breakpoint，從垂直切成水平。

```tsx
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';

export function FieldHorizontalExample() {
  return (
    <Field orientation="horizontal" className="w-80">
      <FieldLabel
        htmlFor="field-horizontal-email"
        className="w-[100px]"
      >
        Email
      </FieldLabel>
      <FieldContent>
        <Input
          id="field-horizontal-email"
          placeholder="name@example.com"
        />
        <FieldDescription>Used for account alerts.</FieldDescription>
      </FieldContent>
    </Field>
  );
}
```

## 搭配 Checkbox

欄位包住本身已帶標籤語意的控制項（checkbox、radio）時，使用 `FieldContent` 搭配 `FieldTitle` 與 `FieldDescription`，標題才會和該控制項一起被讀出。

```tsx
import { Checkbox } from '@/components/ui/Checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from '@/components/ui/Field';

export function FieldWithContentExample() {
  return (
    <Field orientation="horizontal" className="w-80">
      <Checkbox id="field-notifications" />
      <FieldContent>
        <FieldLabel htmlFor="field-notifications">
          Notifications
        </FieldLabel>
        <FieldDescription>
          Email, SMS, and push delivery options.
        </FieldDescription>
      </FieldContent>
    </Field>
  );
}
```

## 必填

把 `required` 傳給 `FieldLabel`，會在標籤文字前顯示 Vittal Design 的必填圓點。控制項本身也要帶 `required`，表單驗證才會正確。

```tsx
import { Field, FieldLabel } from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';

export function FieldRequiredExample() {
  return (
    <Field className="w-80">
      <FieldLabel htmlFor="field-required-email" required>
        Email
      </FieldLabel>
      <Input
        id="field-required-email"
        placeholder="name@example.com"
        required
      />
    </Field>
  );
}
```

圓點是位在 `-left-2` 的 `::before` 偽元素。`Field`（或其父層）左側要留夠 padding，圓點才看得到。

## 無效

在 `Field` 上設定 `data-invalid="true"`，並在 input 上設定 `aria-invalid`，把欄位標成無效。用 `FieldError` 顯示一則或多則驗證訊息。

```tsx
import {
  Field,
  FieldError,
  FieldLabel,
} from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';

export function FieldInvalidExample() {
  return (
    <Field className="w-80" data-invalid="true">
      <FieldLabel htmlFor="field-invalid-email" required>
        Email
      </FieldLabel>
      <Input
        id="field-invalid-email"
        placeholder="name@example.com"
        required
        aria-invalid
      />
      <FieldError errors={[{ message: 'Enter a valid email.' }]} />
    </Field>
  );
}
```

## 群組欄位

用 `FieldSet` + `FieldLegend` 包一組表單區塊，用 `FieldGroup` 控制欄位之間的垂直間距，用 `FieldSeparator` 做區段中的分隔。

```tsx
import { Checkbox } from '@/components/ui/Checkbox';
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from '@/components/ui/Field';
import { Input } from '@/components/ui/Input';

export function FieldGroupedExample() {
  return (
    <FieldSet className="w-80">
      <FieldLegend>Profile</FieldLegend>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="field-name">Name</FieldLabel>
          <Input id="field-name" placeholder="Ada Lovelace" />
        </Field>
        <Field>
          <FieldLabel htmlFor="field-role">Role</FieldLabel>
          <Input id="field-role" placeholder="Researcher" />
        </Field>
        <FieldSeparator>Optional</FieldSeparator>
        <Field orientation="horizontal">
          <Checkbox id="field-public" />
          <FieldContent>
            <FieldTitle>Public profile</FieldTitle>
            <FieldDescription>
              Show this profile in team directories.
            </FieldDescription>
          </FieldContent>
        </Field>
      </FieldGroup>
    </FieldSet>
  );
}
```

## 部件

| 部件                 | 說明                               |
| ------------------ | -------------------------------- |
| `Field`            | 單一欄位的版面容器；支援 orientation variant |
| `FieldLabel`       | 包住 `Label`；以 `htmlFor` 對應控制項     |
| `FieldTitle`       | 放在 `FieldContent` 裡的非互動標籤        |
| `FieldDescription` | 顯示在控制項下方或旁邊的輔助文字                 |
| `FieldError`       | 驗證訊息；接受 `errors` 陣列或 children    |
| `FieldContent`     | 在 checkbox／radio 旁邊堆疊標籤與說明       |
| `FieldGroup`       | 相關欄位的垂直堆疊                        |
| `FieldSet`         | 群組區塊的 `<fieldset>` 外包            |
| `FieldLegend`      | `FieldSet` 的 `<legend>` 標題       |
| `FieldSeparator`   | 可選置中標籤的行內分隔線                     |

## Field 屬性

| Prop            | Type                                         | Default      | 說明                 |
| --------------- | -------------------------------------------- | ------------ | ------------------ |
| `orientation`   | `'vertical' \| 'horizontal' \| 'responsive'` | `'vertical'` | 控制版面方向             |
| `data-invalid`  | `boolean`                                    | —            | 標成無效，供樣式使用         |
| `data-disabled` | `boolean`                                    | —            | 標成停用，供樣式使用         |
| `className`     | `string`                                     | —            | 額外的 CSS class      |
| `...props`      | `ComponentProps<'div'>`                      | —            | 原生 `div` props 與事件 |

## FieldLegend 屬性

| Prop        | Type                       | Default    | 說明                         |
| ----------- | -------------------------- | ---------- | -------------------------- |
| `variant`   | `'legend' \| 'label'`      | `'legend'` | `legend` 較大；`label` 是 `sm` |
| `className` | `string`                   | —          | 額外的 CSS class              |
| `...props`  | `ComponentProps<'legend'>` | —          | 原生 `legend` props          |

## FieldError 屬性

| Prop        | Type                                       | Default | 說明                     |
| ----------- | ------------------------------------------ | ------- | ---------------------- |
| `errors`    | `Array<{ message?: string } \| undefined>` | —       | 顯示去除重複後的訊息；多則時變成項目符號清單 |
| `children`  | `ReactNode`                                | —       | 用自訂內容覆寫訊息              |
| `className` | `string`                                   | —       | 額外的 CSS class          |
