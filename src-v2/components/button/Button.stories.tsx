import {
  Button,
  type DefaultButtonProps,
  type GhostButtonProps,
  type TextButtonProps,
} from '@/components/button/Button';
import { Spinner } from '@/components/spinner/Spinner';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CloseIcon,
  FlagIcon,
  SearchIcon,
} from '@/icons';
import { type Meta, type StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';

type Story = StoryObj<typeof Button>;

const Grid = styled.div<{ column: number }>`
  display: inline-grid;
  grid-auto-flow: column;
  grid-template: repeat(${({ column }) => column}, 1fr) / auto;
  gap: 20px;
  justify-items: center;
`;

const Row = styled.div<{ border?: boolean }>`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 20px;
  border: ${({ border }) =>
    border ? '1px solid var(--grayscale-opacity-300)' : 'none'};
`;
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    theme: {
      description:
        'storybook 的 arg 無法根據其它 arg 動態更新，因此 theme 在某些 variant 下不存在，選了 storybook 會 Error，所以不開放 Control。詳細 theme 可查看下方 Story',
      control: false,
    },
  },
  args: {
    children: 'Button',
    variant: 'default',
    size: 'lg',
    disabled: false,
    theme: 'primary',
  },
};

export default meta;

export const Default: Story = {};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Button size="md" theme="primary">
        Medium
      </Button>
      <Button size="lg" theme="primary">
        Large
      </Button>
    </Row>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Button theme="primary">Normal</Button>
      <Button theme="primary" disabled>
        Disabled
      </Button>
    </Row>
  ),
};

export const WithIcons: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Button theme="primary">
        <FlagIcon data-icon="inline-start" />
        New Branch
      </Button>
      <Button theme="default">
        Download
        <ChevronDownIcon data-icon="inline-end" />
      </Button>
      <Button variant="text" theme="primary">
        Search
        <SearchIcon data-icon="inline-end" />
      </Button>
    </Row>
  ),
};

export const IconOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Button size="icon-md" theme="default" aria-label="Close">
        <CloseIcon data-icon="inline-start" />
      </Button>
      <Button size="icon-md" theme="primary" aria-label="Search">
        <SearchIcon data-icon="inline-start" />
      </Button>
      <Button size="icon-lg" theme="primary" aria-label="Expand">
        <ChevronUpIcon data-icon="inline-start" />
      </Button>
    </Row>
  ),
};

export const LoadingWithSpinner: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Button theme="primary" disabled>
        <Spinner data-icon="inline-start" />
        Saving
      </Button>
      <Button theme="default" disabled>
        Loading
        <Spinner data-icon="inline-end" />
      </Button>
    </Row>
  ),
};

export const FocusableWhenDisabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      <Button theme="primary" disabled focusableWhenDisabled>
        Default (Tab to me)
      </Button>
      <Button
        variant="text"
        theme="primary"
        disabled
        focusableWhenDisabled
      >
        Text (Tab to me)
      </Button>
    </Row>
  ),
};

export const DefaultButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const defaultTheme: DefaultButtonProps['theme'][] = [
      'primary',
      'default',
      'success',
      'info',
      'warning',
      'alarm',
      'dangerous',
    ];
    return (
      <Grid column={4}>
        {defaultTheme.map((theme, index) => (
          <React.Fragment key={`fragment-${index}`}>
            <Button variant="default" theme={theme} size="lg">
              按鈕
            </Button>
            <Button variant="default" theme={theme} size="md">
              按鈕
            </Button>
            <Button
              variant="default"
              theme={theme}
              size="lg"
              disabled
            >
              按鈕
            </Button>
            <Button
              variant="default"
              theme={theme}
              size="md"
              disabled
            >
              按鈕
            </Button>
          </React.Fragment>
        ))}
      </Grid>
    );
  },
};

export const TextButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const textTheme: TextButtonProps['theme'][] = [
      'primary',
      'default',
      'success',
      'info',
      'warning',
      'alarm',
    ];
    return (
      <Grid column={4}>
        {textTheme.map((theme, index) => (
          <React.Fragment key={`fragment-${index}`}>
            <Button variant="text" theme={theme} size="lg">
              按鈕
            </Button>
            <Button variant="text" theme={theme} size="md">
              按鈕
            </Button>
            <Button variant="text" theme={theme} size="lg" disabled>
              按鈕
            </Button>
            <Button variant="text" theme={theme} size="md" disabled>
              按鈕
            </Button>
          </React.Fragment>
        ))}
      </Grid>
    );
  },
};

export const GhostButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const ghostTheme: GhostButtonProps['theme'][] = [
      'primary',
      'default',
      'success',
      'info',
      'warning',
      'alarm',
    ];
    return (
      <Grid column={4}>
        {ghostTheme.map((theme, index) => (
          <React.Fragment key={`fragment-${index}`}>
            <Button variant="ghost" theme={theme} size="lg">
              按鈕
            </Button>
            <Button variant="ghost" theme={theme} size="md">
              按鈕
            </Button>
            <Button variant="ghost" theme={theme} size="lg" disabled>
              按鈕
            </Button>
            <Button variant="ghost" theme={theme} size="md" disabled>
              按鈕
            </Button>
          </React.Fragment>
        ))}
      </Grid>
    );
  },
};
