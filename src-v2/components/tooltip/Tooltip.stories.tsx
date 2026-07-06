import { FlagIcon } from '@/icons/FlagIcon';
import { type Meta, type StoryObj } from '@storybook/react';
import { Button } from '../button/Button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './Tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  decorators: [
    (Story) => (
      <TooltipProvider>
        <div className="flex min-h-[160px] items-center justify-center p-12">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button>Hover me</Button>} />
      <TooltipContent>提示文字</TooltipContent>
    </Tooltip>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button>說明</Button>} />
      <TooltipContent>
        <FlagIcon className="size-5 shrink-0 text-warning-500" />
        <span>請先儲存後再離開頁面</span>
      </TooltipContent>
    </Tooltip>
  ),
};

const SIDES = ['top', 'right', 'bottom', 'left'] as const;
const ALIGNS = ['start', 'center', 'end'] as const;

export const SidePlacement: Story = {
  render: () => (
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
  ),
};

export const Alignments: Story = {
  render: () => (
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
  ),
};

export const LongContent: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button>長文字</Button>} />
      <TooltipContent>
        提示文字最寬會限制在
        400px，多出的內容會自動換行，避免占滿整個螢幕。
      </TooltipContent>
    </Tooltip>
  ),
};

export const WithoutArrow: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger render={<Button>無箭頭</Button>} />
      <TooltipContent arrow={false}>提示文字</TooltipContent>
    </Tooltip>
  ),
};

export const Controlled: Story = {
  render: () => (
    <Tooltip defaultOpen>
      <TooltipTrigger render={<Button>預設展開</Button>} />
      <TooltipContent>常駐顯示</TooltipContent>
    </Tooltip>
  ),
};
