import { type Meta, type StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { CheckIcon } from '../../icons/CheckIcon';
import { SearchIcon } from '../../icons/SearchIcon';
import { Button } from '../button/Button';
import { SplitButton } from '../button/split-button/SplitButton';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './DropdownMenu';

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button>Actions</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem>New file</DropdownMenuItem>
        <DropdownMenuItem>Open file</DropdownMenuItem>
        <DropdownMenuItem disabled>Save (disabled)</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button>Quick actions</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem>
          <SearchIcon data-icon="inline-start" className="size-3.5" />
          <span>Search</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CheckIcon data-icon="inline-start" className="size-3.5" />
          <span>Mark complete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithCheckboxItems: Story = {
  render: () => {
    const ControlledCheckbox = () => {
      const [showStatusBar, setShowStatusBar] = useState(true);
      const [showActivityBar, setShowActivityBar] = useState(false);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button>View</Button>} />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Appearance</DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={showStatusBar}
                onCheckedChange={setShowStatusBar}
              >
                Status bar
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={showActivityBar}
                onCheckedChange={setShowActivityBar}
              >
                Activity bar
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };

    return <ControlledCheckbox />;
  },
};

export const WithRadioGroup: Story = {
  render: () => {
    const ControlledRadio = () => {
      const [position, setPosition] = useState('bottom');

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button>Panel position</Button>}
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>Position</DropdownMenuLabel>
              <DropdownMenuRadioGroup
                value={position}
                onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="top">
                  Top
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">
                  Right
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  Bottom
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="left">
                  Left
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };

    return <ControlledRadio />;
  },
};

export const WithSeparatorAndLabel: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button>Account</Button>} />
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>My account</DropdownMenuLabel>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Support</DropdownMenuLabel>
          <DropdownMenuItem>Documentation</DropdownMenuItem>
          <DropdownMenuItem>GitHub</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button>File</Button>} />
      <DropdownMenuContent>
        <DropdownMenuItem>New file</DropdownMenuItem>
        <DropdownMenuItem>Open…</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Open recent</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>project-a.tsx</DropdownMenuItem>
            <DropdownMenuItem>project-b.tsx</DropdownMenuItem>
            <DropdownMenuItem>notes.md</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

export const WithSplitButtonTrigger: Story = {
  render: () => {
    const ControlledSplit = () => {
      const [open, setOpen] = useState(false);
      const anchorRef = useRef<HTMLDivElement>(null);

      return (
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <div ref={anchorRef} className="inline-flex">
            <SplitButton
              open={open}
              onClick={() => alert('Save')}
              splitOnClick={() => setOpen((prev) => !prev)}
            >
              Save
            </SplitButton>
          </div>
          <DropdownMenuContent anchor={anchorRef}>
            <DropdownMenuItem>Save as draft</DropdownMenuItem>
            <DropdownMenuItem>Save and publish</DropdownMenuItem>
            <DropdownMenuItem>Save as template</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    };

    return <ControlledSplit />;
  },
};
