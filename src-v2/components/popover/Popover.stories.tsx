import { type Meta, type StoryObj } from '@storybook/react';
import { Button } from '../button/Button';
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverTitle,
  PopoverTrigger,
} from './Popover';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button>Open</Button>} />
      <PopoverContent className="w-72">
        <PopoverTitle>Popover title</PopoverTitle>
        <PopoverDescription className="mt-1">
          Popovers are floating panels that appear when triggered. Use
          them for short bits of information, action menus, or rich
          content overlays.
        </PopoverDescription>
      </PopoverContent>
    </Popover>
  ),
};

export const SidePlacement: Story = {
  render: () => (
    <div className="flex gap-4 p-12">
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger
            render={<Button size="md">{side}</Button>}
          />
          <PopoverContent side={side} className="w-48">
            Anchored on the {side} side.
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

export const RichContent: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger render={<Button>View profile</Button>} />
      <PopoverContent className="w-72">
        <PopoverTitle>Yuki Tanaka</PopoverTitle>
        <PopoverDescription className="mt-1">
          Senior Engineer · Tokyo
        </PopoverDescription>
        <p className="mt-3 text-sm text-grayscale-opacity-600">
          Joined the platform team in 2021. Owns the registry pipeline
          and the storybook deployment.
        </p>
      </PopoverContent>
    </Popover>
  ),
};

type SharedPayload =
  | {
      kind: 'assignee';
      label: string;
      description: string;
    }
  | {
      kind: 'status';
      label: string;
      description: string;
    }
  | {
      kind: 'date';
      label: string;
      description: string;
    };

const sharedTriggerPayloads = {
  assignee: {
    kind: 'assignee',
    label: '林○方',
    description: 'Assigned owner for this editable cell.',
  },
  status: {
    kind: 'status',
    label: '審核中',
    description: 'Shared content updates from the active trigger.',
  },
  date: {
    kind: 'date',
    label: '2026/05/29',
    description: 'One popover root can serve many triggers.',
  },
} satisfies Record<string, SharedPayload>;

function SharedContent({
  payload,
}: {
  payload: SharedPayload | undefined;
}) {
  if (!payload) {
    return null;
  }

  return (
    <div className="space-y-1">
      <PopoverTitle>{payload.label}</PopoverTitle>
      <PopoverDescription>{payload.description}</PopoverDescription>
    </div>
  );
}

export const MultipleTriggers: Story = {
  render: () => (
    <Popover<SharedPayload>>
      {({ payload }) => (
        <div className="flex flex-wrap gap-2 p-10">
          <PopoverTrigger
            payload={sharedTriggerPayloads.assignee}
            render={<Button variant="ghost">Assignee</Button>}
          />
          <PopoverTrigger
            payload={sharedTriggerPayloads.status}
            render={<Button variant="ghost">Status</Button>}
          />
          <PopoverTrigger
            payload={sharedTriggerPayloads.date}
            render={<Button variant="ghost">Date</Button>}
          />
          <PopoverContent className="w-72">
            <SharedContent payload={payload} />
          </PopoverContent>
        </div>
      )}
    </Popover>
  ),
};
