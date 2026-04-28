import {
  Button,
  type FilledButtonProps,
  type TextButtonProps,
} from '@/components/button/Button';
import { Spinner } from '@/components/spinner/Spinner';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClearIcon,
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
    border ? '1px solid var(--grayscale-300)' : 'none'};
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
    variant: 'filled',
    size: 'large',
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
      <Button size="medium" theme="primary">
        Medium
      </Button>
      <Button size="large" theme="primary">
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
      <Button size="icon-medium" theme="default" aria-label="Clear">
        <ClearIcon data-icon="inline-start" />
      </Button>
      <Button size="icon-medium" theme="primary" aria-label="Search">
        <SearchIcon data-icon="inline-start" />
      </Button>
      <Button size="icon-large" theme="primary" aria-label="Expand">
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
        Filled (Tab to me)
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

export const FilledButton: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const filledTheme: FilledButtonProps['theme'][] = [
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
        {filledTheme.map((theme, index) => (
          <React.Fragment key={`fragment-${index}`}>
            <Button variant="filled" theme={theme} size="large">
              按鈕
            </Button>
            <Button variant="filled" theme={theme} size="medium">
              按鈕
            </Button>
            <Button
              variant="filled"
              theme={theme}
              size="large"
              disabled
            >
              按鈕
            </Button>
            <Button
              variant="filled"
              theme={theme}
              size="medium"
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
            <Button variant="text" theme={theme} size="large">
              按鈕
            </Button>
            <Button variant="text" theme={theme} size="medium">
              按鈕
            </Button>
            <Button
              variant="text"
              theme={theme}
              size="large"
              disabled
            >
              按鈕
            </Button>
            <Button
              variant="text"
              theme={theme}
              size="medium"
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
