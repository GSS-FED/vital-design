'use client';

import { Button } from '@/components/button/Button';
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from '@/components/button/button-group/ButtonGroup';

export function ButtonGroupWithSeparatorExample() {
  return (
    <ButtonGroup>
      <Button theme="default">Archive</Button>
      <ButtonGroupSeparator />
      <Button theme="default">Snooze</Button>
    </ButtonGroup>
  );
}
