# Card

> 可組合的卡片表面，包含標題列、標題、說明、動作、內容與頁尾這些 slot。

## 預覽

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

export function CardBasicExample() {
  return (
    <Card className="w-90 max-w-full">
      <CardHeader>
        <CardTitle>Project dashboard</CardTitle>
        <CardDescription>Last updated 2 days ago.</CardDescription>
      </CardHeader>
      <CardContent>
        Track progress, owners, and review status in one place.
      </CardContent>
    </Card>
  );
}
```

## 附動作

`CardAction` 會自動放在標題列尾端的 slot。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

export function CardWithActionExample() {
  return (
    <Card className="w-90 max-w-full">
      <CardHeader>
        <CardTitle>Quarterly review</CardTitle>
        <CardDescription>3 items to review</CardDescription>
        <CardAction>
          <Button variant="ghost">View</Button>
        </CardAction>
      </CardHeader>
      <CardContent>Owners must submit by Friday.</CardContent>
    </Card>
  );
}
```

## 附頁尾

在頁尾或內容加上分隔 class（`border-t`），分隔線才會出現。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

export function CardWithFooterExample() {
  return (
    <Card className="w-90 max-w-full">
      <CardHeader className="border-b border-grayscale-opacity-300">
        <CardTitle>Leave request</CardTitle>
      </CardHeader>
      <CardContent>Fill in the dates and a short reason.</CardContent>
      <CardFooter className="justify-end border-t border-grayscale-opacity-300">
        <Button variant="ghost">Cancel</Button>
        <Button>Submit</Button>
      </CardFooter>
    </Card>
  );
}
```

## 只有標題列

卡片可以只放 `CardHeader`，例如當作精簡的群組摘要。

```tsx
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

export function CardHeaderOnlyExample() {
  return (
    <Card className="w-90 max-w-full">
      <CardHeader>
        <CardTitle>Design review</CardTitle>
        <CardDescription>5 tasks</CardDescription>
      </CardHeader>
    </Card>
  );
}
```

## 複合部分

| 部分                | 說明                                         |
| ----------------- | ------------------------------------------ |
| `Card`            | 根表面 — 圓角白底，加上強調陰影                          |
| `CardHeader`      | 以 grid 自動排列標題、說明與動作的標題列                    |
| `CardTitle`       | 主要標題 slot（`text-base`、`font-medium`）       |
| `CardDescription` | 次要文字 slot（`text-sm`、grayscale-opacity-600） |
| `CardAction`      | 標題列尾端 slot（例如選單按鈕）；有這個部分才顯示，標題列會改成兩欄       |
| `CardContent`     | 內文區，預設有 padding                            |
| `CardFooter`      | 頁尾區，flex 排列                                |

所有部分都接受原生 `div` props（`className`、`style`、`...rest`），並轉送 `ref`。
