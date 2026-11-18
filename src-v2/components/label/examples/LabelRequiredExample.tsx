'use client';

import { Input } from '@/components/input/input/Input';
import { Label } from '@/components/label/Label';

export function LabelRequiredExample() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="required-email" required>
        Email
      </Label>
      <Input
        id="required-email"
        placeholder="name@example.com"
        required
      />
    </div>
  );
}
