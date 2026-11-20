# Alert

> 可組合的訊息表面，用來放確認、警告與情境提示。

## 預覽

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';

export function AlertExample() {
  return (
    <Alert className="w-105 max-w-full">
      <AlertTitle>Request submitted</AlertTitle>
      <AlertDescription>
        The approval flow has started. You can keep editing the draft
        until the reviewer opens it.
      </AlertDescription>
      <AlertAction>
        <Button size="md" variant="text" theme="primary">
          View request
        </Button>
      </AlertAction>
    </Alert>
  );
}
```

## 用法

在 `Alert` 裡組合 `AlertTitle`、`AlertDescription`，需要時再加 `AlertAction`。Alert 會撐滿容器寬度；寬度設在父層或用 `className` 設定。

## 加上圖示

訊息需要更強的視覺脈絡時，把圖示放在第一個子元素。

```tsx
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/Alert';
import { ClearIcon } from '@/components/icons/ClearIcon';

export function AlertWithIconExample() {
  return (
    <Alert role="status" className="w-105 max-w-full">
      <ClearIcon className="text-destructive-500" />
      <AlertTitle>Payment method expired</AlertTitle>
      <AlertDescription>
        Update the billing card before the next renewal date to avoid
        service interruption.
      </AlertDescription>
    </Alert>
  );
}
```

## 多個動作

`AlertAction` 會把按鈕靠右對齊。取消類動作放前面，主要動作放最後。

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';

export function AlertWithActionExample() {
  return (
    <Alert className="w-105 max-w-full">
      <AlertTitle>Delete this draft?</AlertTitle>
      <AlertDescription>
        The draft and its attachments will be removed.
      </AlertDescription>
      <AlertAction>
        <Button size="md" variant="text" theme="default">
          Cancel
        </Button>
        <Button size="md" variant="text" theme="primary">
          Delete
        </Button>
      </AlertAction>
    </Alert>
  );
}
```

## 自訂內容

提示需要一個小的後續決定時，`AlertDescription` 可以放額外控制項。

```tsx
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Field, FieldLabel } from '@/components/ui/Field';
import { useState } from 'react';

export function AlertWithCustomExample() {
  const [hiddenToday, setHiddenToday] = useState(false);

  return (
    <Alert className="w-105 max-w-full">
      <AlertTitle>Unsaved changes</AlertTitle>
      <AlertDescription>
        Leaving this page will discard the edits in the current form.
        <Field orientation="horizontal" className="mt-4 w-auto">
          <Checkbox
            id="alert-hide-today"
            checked={hiddenToday}
            onCheckedChange={setHiddenToday}
          />
          <FieldLabel htmlFor="alert-hide-today">
            Do not remind me again today
          </FieldLabel>
        </Field>
      </AlertDescription>
      <AlertAction>
        <Button size="md" variant="text" theme="default">
          Cancel
        </Button>
        <Button size="md" variant="text" theme="primary">
          Leave page
        </Button>
      </AlertAction>
    </Alert>
  );
}
```

## 結構

```tsx
<Alert>
  <AlertTitle />
  <AlertDescription />
  <AlertAction />
</Alert>
```

## 屬性

### Alert

`Alert` 接受原生 `div` props，預設渲染 `role="alert"`。

| Prop        | Type            | Default   | 說明                      |
| ----------- | --------------- | --------- | ----------------------- |
| `role`      | `string`        | `'alert'` | 訊息的 ARIA live region 角色 |
| `children`  | `ReactNode`     | -         | Alert 內容與組成的子部分         |
| `className` | `string`        | -         | 根元素上的額外 CSS class       |
| `style`     | `CSSProperties` | -         | 根元素上的行內樣式               |

### AlertTitle

| Prop        | Type        | Default | 說明            |
| ----------- | ----------- | ------- | ------------- |
| `children`  | `ReactNode` | -       | 標題內容          |
| `className` | `string`    | -       | 額外的 CSS class |

### AlertDescription

| Prop        | Type        | Default | 說明            |
| ----------- | ----------- | ------- | ------------- |
| `children`  | `ReactNode` | -       | 內文或輔助內容       |
| `className` | `string`    | -       | 額外的 CSS class |

### AlertAction

| Prop        | Type        | Default | 說明            |
| ----------- | ----------- | ------- | ------------- |
| `children`  | `ReactNode` | -       | 動作按鈕、連結或控制項   |
| `className` | `string`    | -       | 額外的 CSS class |

## 無障礙

緊急、要立刻朗讀的訊息，維持預設 `role="alert"`。優先度較低、不該打斷目前工作的確認，改用 `role="status"`。
