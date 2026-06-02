import { type Meta, type StoryObj } from '@storybook/react';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './Breadcrumb';

type BreadcrumbStoryArgs = { size: 'sm' | 'lg' };

type Story = StoryObj<BreadcrumbStoryArgs>;

const meta: Meta<BreadcrumbStoryArgs> = {
  title: 'Components/Breadcrumb',
  args: {
    size: 'sm',
  },
  argTypes: {
    size: {
      control: { type: 'inline-radio' },
      options: ['sm', 'lg'],
    },
  },
};

export default meta;

export const Default: Story = {
  render: ({ size }) => (
    <Breadcrumb>
      <BreadcrumbList size={size}>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">頁面</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Layer 2</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Layer 3</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
  render: Default.render,
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6">
      {(['lg', 'sm'] as const).map((size) => (
        <Breadcrumb key={size}>
          <BreadcrumbList size={size}>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">頁面</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Layer 2</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Layer 3</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ))}
    </div>
  ),
};

export const Layers: Story = {
  parameters: { controls: { disable: true } },
  render: ({ size }) => (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList size={size}>
          <BreadcrumbItem>
            <BreadcrumbPage>Layer 1</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbList size={size}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">頁面</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Layer 2</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbList size={size}>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">頁面</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Layer 2</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Layer 3</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  ),
};

export const Collapsed: Story = {
  render: ({ size }) => (
    <Breadcrumb>
      <BreadcrumbList size={size}>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">頁面</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbEllipsis />
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Layer 3</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Layer 4</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};
