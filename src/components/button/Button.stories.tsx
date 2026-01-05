import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import Button from 'src/components/button/Button';
import {
  FilledButtonProps,
  TextButtonProps,
} from 'src/components/button/types';
import { colors } from 'src/constants';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClearIcon,
  FlagIcon,
  SearchIcon,
  UserIcon,
} from 'src/icons';

type Story = StoryObj<typeof Button>;

const iconOptions = {
  null: null,
  search: <SearchIcon />,
  user: <UserIcon />,
  flag: <FlagIcon />,
  clear: <ClearIcon />,
  arrowDown: <ChevronDownIcon />,
  arrowUp: <ChevronUpIcon />,
};

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
    border ? `1px solid ${colors.grayscale300}` : 'none'};
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
    icon: {
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      control: { type: 'select' },
    },
  },
  args: {
    children: 'Button',
    variant: 'filled',
    size: 'large',
    disabled: false,
    isLoading: false,
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
      <Button theme="primary" isLoading>
        Loading
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
      <Grid column={6}>
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
            <Button
              variant="filled"
              theme={theme}
              size="large"
              isLoading
            >
              按鈕
            </Button>
            <Button
              variant="filled"
              theme={theme}
              size="medium"
              isLoading
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
      <Grid column={6}>
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
            <Button
              variant="text"
              theme={theme}
              size="large"
              isLoading
            >
              按鈕
            </Button>
            <Button
              variant="text"
              theme={theme}
              size="medium"
              isLoading
            >
              按鈕
            </Button>
          </React.Fragment>
        ))}
      </Grid>
    );
  },
};
