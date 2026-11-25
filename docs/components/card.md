# Card

> Composable card surface with header, title, description, action, content, and footer slots.

## Preview

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

## With Action

`CardAction` is automatically placed in the header's trailing slot.

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

## With Footer

Add a separator class (`border-t`) on the footer or content to surface dividers.

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

## Header Only

A card can hold only `CardHeader`, for example as a compact group summary.

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

## Compound Parts

| Part              | Description                                                                                        |
| ----------------- | -------------------------------------------------------------------------------------------------- |
| `Card`            | Root surface — rounded white background with emphasis shadow                                       |
| `CardHeader`      | Grid header that auto-lays out title, description, and action                                      |
| `CardTitle`       | Primary heading slot (`text-base`, `font-medium`)                                                  |
| `CardDescription` | Secondary text slot (`text-sm`, grayscale-opacity-600)                                             |
| `CardAction`      | Trailing slot in the header (e.g., menu button); only shown when present, header switches to 2-col |
| `CardContent`     | Body region with default padding                                                                   |
| `CardFooter`      | Footer region with flex layout                                                                     |

All parts accept native `div` props (`className`, `style`, `...rest`) and forward `ref`.
