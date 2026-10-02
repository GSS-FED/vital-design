import { Button } from '@/components/button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/dropdown-menu/DropdownMenu';
import { SearchBar } from '@/components/search-bar/SearchBar';
import { Toolbar, ToolbarSpacer } from '@/components/toolbar/Toolbar';
import { ChevronDownIcon } from '@/icons/ChevronDownIcon';
import { EllipsisIcon } from '@/icons/EllipsisIcon';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function ActionBar({
  searchPlaceholder,
  left,
  right,
  raised = false,
  minWidthClassName,
}: {
  searchPlaceholder: string;
  left?: ReactNode;
  right?: ReactNode;
  raised?: boolean;
  minWidthClassName?: string;
}) {
  return (
    <Toolbar
      size="sm"
      className={cn(
        'h-12 flex-nowrap gap-6 overflow-x-auto overflow-y-hidden rounded bg-white px-3 py-2',
        '[&_[data-slot=toolbar-group]]:shrink-0',
        raised && 'shadow-emphasis',
        minWidthClassName,
      )}
    >
      <SearchBar
        placeholder={searchPlaceholder}
        width="200px"
        className="h-8 shrink-0 rounded border-none"
      />
      {left}
      <ToolbarSpacer />
      {right}
    </Toolbar>
  );
}

export function FilterButton({ children }: { children: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            theme="default"
            className="h-8 rounded-full px-3 font-normal"
          >
            {children}
            <ChevronDownIcon data-icon="inline-end" />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuItem>全部</DropdownMenuItem>
        <DropdownMenuItem>已指派</DropdownMenuItem>
        <DropdownMenuItem>未指派</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MoreButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            aria-label="更多操作"
            variant="text"
            size="icon-md"
            theme="default"
          >
            <EllipsisIcon />
          </Button>
        }
      />
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem>編輯</DropdownMenuItem>
          <DropdownMenuItem>複制</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>刪除</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
