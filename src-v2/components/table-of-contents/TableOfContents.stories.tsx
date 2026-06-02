import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  TableOfContents,
  type TableOfContentsItem,
} from './TableOfContents';

const items: TableOfContentsItem[] = [
  { id: 's1', label: '標題', level: 1 },
  { id: 's1-1', label: '副標題', level: 2 },
  { id: 's1-1-a', label: '內文', level: 3 },
  { id: 's1-1-b', label: '內文', level: 3 },
  { id: 's1-1-c', label: '內文', level: 3 },
  { id: 's1-1-d', label: '內文', level: 3 },
  { id: 's1-1-e', label: '內文', level: 3 },
  { id: 's1-1-f', label: '內文', level: 3 },
  { id: 's1-1-g', label: '內文', level: 3 },
  { id: 's2', label: '標題', level: 1 },
  { id: 's2-1', label: '副標題', level: 2 },
  { id: 's2-1-a', label: '內文', level: 3 },
  { id: 's2-1-b', label: '內文', level: 3 },
  { id: 's2-1-c', label: '內文', level: 3 },
  { id: 's2-1-d', label: '內文', level: 3 },
];

type StoryArgs = {
  side: 'left' | 'right';
  expanded?: boolean;
};

type Story = StoryObj<StoryArgs>;

const meta: Meta<StoryArgs> = {
  title: 'Components/TableOfContents',
  args: {
    side: 'right',
    expanded: undefined,
  },
  argTypes: {
    side: {
      control: { type: 'inline-radio' },
      options: ['left', 'right'],
    },
    expanded: {
      control: { type: 'boolean' },
      description: '留空則由 hover / focus 控制',
    },
  },
};

export default meta;

/**
 * Default behavior: the rail rests as ticks and expands into the label panel
 * on hover / keyboard focus. Leave `expanded` unset to keep this hover-driven —
 * move the cursor onto the indicator on the right to see it open.
 */
export const Default: Story = {
  name: 'Default (hover to expand)',
  render: ({ side, expanded }) => (
    <div className="flex min-h-[480px] items-start justify-between gap-8 p-8">
      <div className="max-w-sm space-y-2 text-sm leading-5 text-grayscale-opacity-600">
        <p className="font-medium text-grayscale-opacity-800">
          將游標移到右側的指示器 →
        </p>
        <p>
          預設行為即為 hover / focus
          展開：滑入指示器會展開成完整目錄，
          滑開後自動收合，不需要傳入 <code>expanded</code>。
        </p>
        <p>
          <code>expanded</code> 只用於強制常開／常閉（見 Expanded
          story）。
        </p>
      </div>
      <TableOfContents
        items={items}
        defaultValue="s1-1-a"
        side={side}
        expanded={expanded}
      />
    </div>
  ),
};

export const Left: Story = {
  args: { side: 'left' },
  render: ({ side, expanded }) => (
    <div className="flex min-h-[400px] p-4">
      <TableOfContents
        items={items}
        defaultValue="s1-1-a"
        side={side}
        expanded={expanded}
      />
    </div>
  ),
};

export const Expanded: Story = {
  args: { expanded: true },
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex min-h-[400px] justify-end p-4">
      <TableOfContents items={items} defaultValue="s1-1-a" expanded />
    </div>
  ),
};

export const Controlled: Story = {
  parameters: { controls: { disable: true } },
  render: function ControlledStory() {
    const [active, setActive] = useState('s1');
    return (
      <div className="flex min-h-[400px] items-start justify-end gap-8 p-4">
        <ul className="space-y-2 text-sm text-grayscale-opacity-700">
          {items
            .filter((item) => item.level !== 3)
            .map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setActive(item.id)}
                  className={
                    item.id === active
                      ? 'text-primary-500'
                      : undefined
                  }
                >
                  跳到「{item.label}」({item.id})
                </button>
              </li>
            ))}
        </ul>
        <TableOfContents
          items={items}
          value={active}
          onValueChange={setActive}
        />
      </div>
    );
  },
};
