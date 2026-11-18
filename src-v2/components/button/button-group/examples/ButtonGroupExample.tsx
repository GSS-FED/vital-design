'use client';

import { Button } from '@/components/button/Button';
import { ButtonGroup } from '@/components/button/button-group/ButtonGroup';

export function ButtonGroupExample() {
  return (
    <ButtonGroup>
      <Button theme="default">Save</Button>
      <Button theme="default">More</Button>
    </ButtonGroup>
  );
}
