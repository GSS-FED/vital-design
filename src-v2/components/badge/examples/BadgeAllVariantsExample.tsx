'use client';

import { Badge } from '@/components/badge/Badge';

const variants = [
  'primary',
  'success',
  'warning',
  'destructive',
  'info',
] as const;

export function BadgeAllVariantsExample() {
  return (
    <div className="flex flex-wrap gap-10">
      {variants.map((variant) => (
        <div
          key={variant}
          className="flex flex-col items-start gap-3"
        >
          <span className="text-xs text-grayscale-opacity-600">
            {variant}
          </span>
          <Badge size="lg" type="number" variant={variant}>
            9
          </Badge>
          <Badge size="lg" type="text" variant={variant}>
            New
          </Badge>
          <Badge size="md" type="number" variant={variant}>
            9
          </Badge>
          <Badge size="md" type="text" variant={variant}>
            New
          </Badge>
          <Badge size="sm" variant={variant} />
        </div>
      ))}
    </div>
  );
}
