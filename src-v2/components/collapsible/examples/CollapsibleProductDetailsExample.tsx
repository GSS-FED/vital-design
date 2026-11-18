'use client';

import { Button } from '@/components/button/Button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/collapsible/Collapsible';
import { AngleDownIcon } from '@/icons/AngleDownIcon';

export function CollapsibleProductDetailsExample() {
  return (
    <div className="w-96 space-y-4 rounded-(--radius-sm) border border-grayscale-opacity-200 p-4">
      <div>
        <div className="font-medium text-grayscale-opacity-900">
          Vittal Design Hoodie
        </div>
        <div className="text-sm text-grayscale-opacity-600">$48</div>
      </div>
      <Collapsible className="space-y-2">
        <CollapsibleTrigger
          render={
            <Button
              variant="text"
              theme="default"
              size="md"
              className="w-full justify-between"
            >
              <span>Show details</span>
              <AngleDownIcon data-icon="inline-end" />
            </Button>
          }
        />
        <CollapsibleContent className="space-y-1 text-grayscale-opacity-700">
          <p>100% cotton, double-stitched seams.</p>
          <p>Ships within 2 business days.</p>
          <p>Free returns within 30 days.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
