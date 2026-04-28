import { type Meta, type StoryObj } from '@storybook/react';
import { type ReactNode } from 'react';
import { Avatar } from './Avatar';

function Container({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap gap-5">{children}</div>;
}

function Section({ children }: { children: ReactNode }) {
  return (
    <div className="font-sans box-border inline-flex flex-col items-center p-5 border border-grayscale-200">
      {children}
    </div>
  );
}

function Title({ children }: { children: ReactNode }) {
  return <div className="font-sans">{children}</div>;
}

function Col({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-4 p-5 flex-wrap items-center">
      {children}
    </div>
  );
}

type Story = StoryObj<typeof Avatar>;

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  argTypes: {
    size: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    alt: {
      control: { type: 'text' },
    },
    src: {
      control: { type: 'text' },
    },
    name: {
      control: { type: 'text' },
    },
    color: {
      control: { type: 'color' },
    },
    bordered: {
      control: { type: 'boolean' },
    },
  },
  args: {
    size: 'md',
    disabled: false,
    alt: 'Avatar',
  },
};

export default meta;

export const Default: Story = {
  render: (args) => {
    return <Avatar {...args} />;
  },
};

export const AllSizes: Story = {
  render: () => (
    <Col>
      <Avatar size="xs" alt="Extra Small" />
      <Avatar size="sm" alt="Small" />
      <Avatar size="md" alt="Medium" />
      <Avatar size="lg" alt="Large" />
      <Avatar size="xl" alt="Extra Large" />
    </Col>
  ),
};

export const Border: Story = {
  render: () => (
    <Col>
      <Avatar bordered={false} />
      <Avatar />
    </Col>
  ),
};

export const Colors: Story = {
  render: () => (
    <Col>
      <Avatar color="default" />
      <Avatar color="tiffany" />
      <Avatar color="green" />
      <Avatar color="orange" />
      <Avatar color="pink" />
      <Avatar color="blue" />
      <Avatar color="sky" />
      <Avatar color="purple" />
      <Avatar color="light-gold" />
      <Avatar color="salmon" />
      <Avatar color="ice" />
      <Avatar color="lavender" />
    </Col>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Container>
      <Section>
        <Title>Show default fallback</Title>
        <Col>
          <Avatar />
        </Col>
      </Section>
      <Section>
        <Title>Fallback</Title>
        <Col>
          <Avatar name="Vittal Design" fallback={'BZ'} />
        </Col>
      </Section>
      <Section>
        <Title>Only given name prop</Title>
        <Col>
          <Avatar name="Vittal Design" />
        </Col>
      </Section>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '沒有傳遞 `fallback` 及 `name` 時，顯示預設人像圖。<br>有傳遞 `fallback` 時顯示 `fallback`。<br>只有傳遞 `name` 時，會根據 `name` 的開頭字顯示',
      },
    },
  },
};

export const OnLoadingStatusChange: Story = {
  name: 'onLoadingStatusChange / onClick',
  render: () => (
    <Container>
      <Section>
        <Title>Get status change</Title>
        <Col>
          <Avatar
            onLoadingStatusChange={(status) => console.log(status)}
          />
        </Col>
      </Section>
      <Section>
        <Title>onClick</Title>
        <Col>
          <Avatar onClick={(e) => console.log(e)} />
        </Col>
      </Section>
    </Container>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '支援：<br>`onLoadingStatusChange`：圖片載入狀態。<br>`onClick` Event',
      },
    },
  },
};

export const Disabled: Story = {
  render: () => (
    <Col>
      <Avatar size="xs" disabled alt="Disabled Avatar" />
      <Avatar size="sm" disabled alt="Disabled Avatar" />
      <Avatar size="md" disabled alt="Disabled Avatar" />
      <Avatar size="lg" disabled alt="Disabled Avatar" />
      <Avatar size="xl" disabled alt="Disabled Avatar" />
    </Col>
  ),
};
