'use client';

import { Input } from '@/components/input/input/Input';
import { Label } from '@/components/label/Label';

export function LabelWithInputExample() {
  return (
    <div className="flex w-80 flex-col gap-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="name@example.com" />
    </div>
  );
}
