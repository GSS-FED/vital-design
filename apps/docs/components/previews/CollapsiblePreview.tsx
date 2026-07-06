'use client';

import { Button } from '@/components/button/Button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/collapsible/Collapsible';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function CollapsiblePreview() {
  return (
    <ComponentPreview name="CollapsiblePreview">
      <Collapsible className="w-80 space-y-2">
        <CollapsibleTrigger
          render={
            <Button
              variant="text"
              theme="default"
              className="w-full [&[data-panel-open]_[data-icon]]:rotate-180"
            >
              <span className="flex-1 text-left">
                Can I use this in my project?
              </span>
              <ChevronDownIcon
                data-icon="inline-end"
                className="transition-transform duration-150"
              />
            </Button>
          }
        />
        <CollapsibleContent className="rounded-(--radius-sm) bg-grayscale-50 p-4 text-grayscale-opacity-700">
          Yes. Free to use for personal and commercial projects. No
          attribution required.
        </CollapsibleContent>
      </Collapsible>
    </ComponentPreview>
  );
}

export function CollapsibleProductDetailsPreview() {
  return (
    <ComponentPreview name="CollapsibleProductDetailsPreview">
      <div className="w-96 space-y-4 rounded-(--radius-sm) border border-grayscale-opacity-200 p-4">
        <div>
          <div className="font-medium text-grayscale-opacity-900">
            Vital Design Hoodie
          </div>
          <div className="text-sm text-grayscale-opacity-600">
            $48
          </div>
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
                <ChevronDownIcon data-icon="inline-end" />
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
    </ComponentPreview>
  );
}
