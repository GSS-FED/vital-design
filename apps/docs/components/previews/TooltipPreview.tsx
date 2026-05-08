'use client';

import { Button } from '@/components/button/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/tooltip/Tooltip';
import { FlagIcon } from '@/icons/FlagIcon';
import { ComponentPreview } from '~/components/preview/ComponentPreview';

const SIDES = ['top', 'right', 'bottom', 'left'] as const;
const ALIGNS = ['start', 'center', 'end'] as const;

export function TooltipPreview() {
  return (
    <ComponentPreview>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button>Hover me</Button>} />
          <TooltipContent>提示文字</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ComponentPreview>
  );
}

export function TooltipWithIconPreview() {
  return (
    <ComponentPreview>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button>說明</Button>} />
          <TooltipContent>
            <FlagIcon className="size-5 shrink-0 text-warning-500" />
            <span>請先儲存後再離開頁面</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ComponentPreview>
  );
}

export function TooltipSidePreview() {
  return (
    <ComponentPreview>
      <TooltipProvider>
        <div className="flex flex-wrap items-center gap-3">
          {SIDES.map((side) => (
            <Tooltip key={side}>
              <TooltipTrigger
                render={<Button size="md">{side}</Button>}
              />
              <TooltipContent side={side}>
                從 {side} 顯示提示
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </ComponentPreview>
  );
}

export function TooltipAlignPreview() {
  return (
    <ComponentPreview>
      <TooltipProvider>
        <div className="flex flex-wrap items-center gap-3">
          {ALIGNS.map((align) => (
            <Tooltip key={align}>
              <TooltipTrigger
                render={<Button size="md">{align}</Button>}
              />
              <TooltipContent align={align}>
                align: {align}
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </ComponentPreview>
  );
}

export function TooltipLongContentPreview() {
  return (
    <ComponentPreview>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button>長文字</Button>} />
          <TooltipContent>
            提示文字最寬會限制在
            400px，多出的內容會自動換行，避免占滿整個螢幕。
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ComponentPreview>
  );
}

export function TooltipWithoutArrowPreview() {
  return (
    <ComponentPreview>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger render={<Button>無箭頭</Button>} />
          <TooltipContent arrow={false}>提示文字</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </ComponentPreview>
  );
}
