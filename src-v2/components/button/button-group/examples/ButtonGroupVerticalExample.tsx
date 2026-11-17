'use client';

import { Button } from '@/components/button/Button';
import { ButtonGroup } from '@/components/button/button-group/ButtonGroup';

export function ButtonGroupVerticalExample() {
  return (
    <ButtonGroup orientation="vertical" className="w-40">
      <Button theme="default">Action A</Button>
      <Button theme="default">Action B</Button>
    </ButtonGroup>
  );
}
