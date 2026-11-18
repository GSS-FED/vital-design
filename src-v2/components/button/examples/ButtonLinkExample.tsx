'use client';

import { LinkButton } from '@/components/button/Button';
import { AngleRightIcon } from '@/icons/AngleRightIcon';

export function ButtonLinkExample() {
  return (
    <div className="flex flex-wrap gap-5">
      <LinkButton href="#login" size="lg">
        Log in
      </LinkButton>
      <LinkButton href="#docs" theme="default">
        Docs
      </LinkButton>
      <LinkButton href="#more" variant="text" theme="primary">
        Learn more
        <AngleRightIcon data-icon="inline-end" />
      </LinkButton>
    </div>
  );
}
