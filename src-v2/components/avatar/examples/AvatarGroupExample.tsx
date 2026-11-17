'use client';

import {
  Avatar,
  AvatarGroup,
  AvatarGroupCount,
} from '@/components/avatar/Avatar';

export function AvatarGroupExample() {
  return (
    <AvatarGroup>
      <Avatar color="green" name="Arthur Lu" />
      <Avatar color="blue" name="Dover Shen" />
      <Avatar color="ice" name="Luka Jung" />
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  );
}
