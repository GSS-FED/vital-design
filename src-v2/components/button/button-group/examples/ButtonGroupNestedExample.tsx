'use client';

import { Button } from '@/components/button/Button';
import { ButtonGroup } from '@/components/button/button-group/ButtonGroup';

export function ButtonGroupNestedExample() {
  return (
    <ButtonGroup>
      <ButtonGroup>
        <Button theme="default">Back</Button>
        <Button theme="default">Next</Button>
      </ButtonGroup>
      <Button>Submit</Button>
    </ButtonGroup>
  );
}
