import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import { FlagIcon } from '../../icons';
import Chip from './chip';

type Story = StoryObj<typeof Chip>;

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  excludeStories: ['FlagIcon'],
};
export default meta;

export const Unselected: Story = {
  render() {
    function App() {
      const [isFirstChipSelected, setIsFirstChipSelected] =
        useState(false);
      const [isSecondChipSelected, setIsSecondChipSelected] =
        useState(false);
      return (
        <StyledContainer>
          <Chip
            selected={isFirstChipSelected}
            onChange={setIsFirstChipSelected}
          >
            急件
          </Chip>
          <Chip
            icon={<FlagIcon width={14} height={14} />}
            selected={isSecondChipSelected}
            onChange={setIsSecondChipSelected}
          >
            特急件
          </Chip>
        </StyledContainer>
      );
    }
    return <App />;
  },
};

export const Selected: Story = {
  render() {
    function App() {
      const [isFirstChipSelected, setIsFirstChipSelected] =
        useState(true);
      const [isSecondChipSelected, setIsSecondChipSelected] =
        useState(true);
      return (
        <StyledContainer>
          <Chip
            selected={isFirstChipSelected}
            onChange={setIsFirstChipSelected}
          >
            急件
          </Chip>
          <Chip
            icon={<FlagIcon width={14} height={14} />}
            selected={isSecondChipSelected}
            onChange={setIsSecondChipSelected}
          >
            特急件
          </Chip>
        </StyledContainer>
      );
    }
    return <App />;
  },
};

const StyledContainer = styled.div`
  display: flex;
  gap: 8px;
`;
