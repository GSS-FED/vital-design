'use client';

import {
  ActionListCommandDemo,
  BasicCommandDemo,
  InfiniteScrollCommandDemo,
} from '@/components/command/CommandListDemos';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

export function CommandPreview() {
  return (
    <ComponentPreview>
      <BasicCommandDemo />
    </ComponentPreview>
  );
}

export function CommandActionListPreview() {
  return (
    <ComponentPreview>
      <ActionListCommandDemo />
    </ComponentPreview>
  );
}

export function CommandInfinitePreview() {
  return (
    <ComponentPreview>
      <InfiniteScrollCommandDemo />
    </ComponentPreview>
  );
}
