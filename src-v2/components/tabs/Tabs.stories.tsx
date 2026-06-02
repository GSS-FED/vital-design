import { Button } from '@/components/button/Button';
import { FlagIcon } from '@/icons/FlagIcon';
import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from './Tabs';

type Story = StoryObj<typeof Tabs>;

const tabs = Array.from({ length: 4 }, (_, index) => ({
  label: `頁籤${index + 1}`,
  value: `tab-${index + 1}`,
}));

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  args: {
    defaultValue: 'tab-1',
    orientation: 'horizontal',
    variant: 'underline',
  },
  argTypes: {
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: { type: 'select' },
      options: ['underline', 'pill'],
    },
  },
};

export default meta;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} className="w-[480px]">
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.label} content
        </TabsContent>
      ))}
    </Tabs>
  ),
};

export const Bordered: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabs defaultValue="tab-1" className="w-[800px]">
      <TabsList bordered>
        {Array.from({ length: 10 }, (_, index) => (
          <TabsTrigger key={index} value={`tab-${index + 1}`}>
            頁籤{index + 1}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  ),
};

export const VerticalBordered: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabs
      defaultValue="tab-1"
      orientation="vertical"
      className="min-h-[360px] w-[560px]"
    >
      <TabsList bordered>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.label} content
        </TabsContent>
      ))}
    </Tabs>
  ),
};

export const WithBadges: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabs defaultValue="all" className="w-[560px]">
      <TabsList bordered>
        <TabsTrigger value="all">頁籤</TabsTrigger>
        <TabsTrigger value="messages">
          頁籤
          <span className="inline-flex h-4 items-center rounded-[10px] bg-primary-500 px-1.5 text-xs leading-4 text-white">
            4
          </span>
        </TabsTrigger>
        <TabsTrigger value="error">
          頁籤
          <span className="size-1.5 rounded-full bg-alarm-500" />
        </TabsTrigger>
        <TabsTrigger value="more">更多</TabsTrigger>
      </TabsList>
    </Tabs>
  ),
};

export const SlidingIndicator: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Tabs defaultValue="tab-1" className="w-[800px]">
      <TabsList bordered>
        {Array.from({ length: 10 }, (_, index) => (
          <TabsTrigger key={index} value={`tab-${index + 1}`}>
            頁籤{index + 1}
          </TabsTrigger>
        ))}
        {/* Opt-in: rendering <TabsIndicator /> swaps the per-tab grow highlight
            for a single bar that slides between tabs. */}
        <TabsIndicator />
      </TabsList>
    </Tabs>
  ),
};

export const Pill: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    const [value, setValue] = useState('tab-1');

    return (
      <Tabs variant="pill" value={value} onValueChange={setValue}>
        <TabsList>
          <TabsTrigger value="tab-1">頁籤</TabsTrigger>
          <TabsTrigger value="tab-2">
            頁籤
            <span className="inline-flex h-4 items-center rounded-[10px] bg-primary-500 px-1.5 text-xs leading-4 text-white">
              4
            </span>
          </TabsTrigger>
          <TabsTrigger value="tab-3">頁籤</TabsTrigger>
          <TabsTrigger value="tab-4">
            <FlagIcon className="size-4" data-icon="inline-start" />
            頁籤
          </TabsTrigger>
          <Button
            variant="text"
            theme="default"
            size="icon-md"
            aria-label="Add tab"
          >
            +
          </Button>
        </TabsList>
      </Tabs>
    );
  },
};
