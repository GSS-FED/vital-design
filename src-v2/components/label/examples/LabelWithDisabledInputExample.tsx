'use client';

import { Input } from '@/components/input/input/Input';
import { Label } from '@/components/label/Label';

export function LabelWithDisabledInputExample() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="disabled-email">Email</Label>
      <Input
        id="disabled-email"
        placeholder="name@example.com"
        disabled
      />
    </div>
  );
}
