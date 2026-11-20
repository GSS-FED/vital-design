# Toolbar

> 帶 role="toolbar" 的 flex 版面 primitive。把動作、分隔線與間隔排在表格、編輯器或面板上方。

## 預覽

```tsx
import { Button } from '@/components/ui/Button';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSpacer,
} from '@/components/ui/Toolbar';

export function ToolbarExample() {
  return (
    <Toolbar>
      <ToolbarGroup>
        <Button size="md" theme="default" variant="text">
          File
        </Button>
        <Button size="md" theme="default" variant="text">
          Edit
        </Button>
      </ToolbarGroup>
      <ToolbarSpacer />
      <ToolbarGroup>
        <Button size="md" theme="primary" variant="text">
          Save
        </Button>
      </ToolbarGroup>
    </Toolbar>
  );
}
```

## 用法

相關的動作放進同一個 `ToolbarGroup`。`ToolbarSpacer` 會把它後面的群組推到尾端。

## 加上分隔線

用 `ToolbarSeparator` 分開不同組的動作。

```tsx
import { Button } from '@/components/ui/Button';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from '@/components/ui/Toolbar';

export function ToolbarWithSeparatorExample() {
  return (
    <Toolbar variant="outline">
      <ToolbarGroup>
        <Button size="md" theme="default" variant="text">
          Cut
        </Button>
        <Button size="md" theme="default" variant="text">
          Copy
        </Button>
        <Button size="md" theme="default" variant="text">
          Paste
        </Button>
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup>
        <Button size="md" theme="default" variant="text">
          Undo
        </Button>
        <Button size="md" theme="default" variant="text">
          Redo
        </Button>
      </ToolbarGroup>
    </Toolbar>
  );
}
```

## 變體

```tsx
import { Button } from '@/components/ui/Button';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSpacer,
} from '@/components/ui/Toolbar';

const variants = ['default', 'bar', 'outline'] as const;

export function ToolbarVariantsExample() {
  return (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-col gap-1">
          <span className="font-sans text-xs text-grayscale-opacity-600">
            variant=&quot;{variant}&quot;
          </span>
          <Toolbar variant={variant}>
            <ToolbarGroup>
              <Button size="md" theme="default" variant="text">
                File
              </Button>
              <Button size="md" theme="default" variant="text">
                Edit
              </Button>
            </ToolbarGroup>
            <ToolbarSpacer />
            <ToolbarGroup>
              <Button size="md" theme="primary" variant="text">
                Save
              </Button>
            </ToolbarGroup>
          </Toolbar>
        </div>
      ))}
    </div>
  );
}
```

| Variant   | 用途                            |
| --------- | ----------------------------- |
| `default` | 透明背景。放進既有表面。                  |
| `bar`     | 淡淡的 gray-50 背景。獨立的工具列，放在面板上方。 |
| `outline` | 白底加底框。放在表格上方。                 |

## 尺寸

| Size      | Padding     | 用途              |
| --------- | ----------- | --------------- |
| `default` | `px-4 py-3` | 頁面頂端的工具列。       |
| `sm`      | `px-3 py-2` | 資料表上方的精簡工具列。    |
| `none`    | `p-0`       | 包住已有自己版面的內容時使用。 |

## 部分

| Part               | 說明                                                   |
| ------------------ | ---------------------------------------------------- |
| `Toolbar`          | 預設 `role="toolbar"`、`aria-orientation="horizontal"`。 |
| `ToolbarGroup`     | `role="group"`。flex 加 gap，把動作排在一起。                   |
| `ToolbarSeparator` | 垂直分隔線（使用 `Separator` primitive）。                     |
| `ToolbarSpacer`    | 用 `flex-1` 把後面的項目推到尾端。                               |
