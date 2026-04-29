import { type Meta, type StoryObj } from '@storybook/react';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from './Resizable';

type Story = StoryObj<typeof ResizablePanelGroup>;

const meta: Meta<typeof ResizablePanelGroup> = {
  title: 'Components/Resizable',
  component: ResizablePanelGroup,
  args: {
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
    },
  },
};

function PanelContent({ children }: { children: string }) {
  return (
    <div className="flex h-full items-center justify-center p-6 font-sans text-sm font-medium text-grayscale-800">
      {children}
    </div>
  );
}

export default meta;

export const Default: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-[200px] max-w-md rounded-md border border-grayscale-300"
      >
        <ResizablePanel defaultSize="50%">
          <PanelContent>One</PanelContent>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="50%">
          <ResizablePanelGroup orientation="vertical">
            <ResizablePanel defaultSize="35%">
              <PanelContent>Two</PanelContent>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize="65%">
              <PanelContent>Three</PanelContent>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  },
};

export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <ResizablePanelGroup
        orientation="vertical"
        className="min-h-[240px] max-w-md rounded-md border border-grayscale-300"
      >
        <ResizablePanel defaultSize="30%">
          <PanelContent>Header</PanelContent>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize="70%">
          <PanelContent>Content</PanelContent>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  },
};

export const WithHandle: Story = {
  parameters: { controls: { disable: true } },
  render: function Render() {
    return (
      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-[200px] max-w-md rounded-md border border-grayscale-300"
      >
        <ResizablePanel defaultSize="30%" minSize="20%">
          <PanelContent>Sidebar</PanelContent>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize="70%">
          <PanelContent>Content</PanelContent>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  },
};
