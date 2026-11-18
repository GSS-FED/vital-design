'use client';

import { Button } from '@/components/button/Button';
import {
  ButtonGroup,
  ButtonGroupText,
} from '@/components/button/button-group/ButtonGroup';

export function ButtonGroupWithTextExample() {
  return (
    <ButtonGroup>
      <ButtonGroupText>Status</ButtonGroupText>
      <Button theme="default">Publish</Button>
    </ButtonGroup>
  );
}
