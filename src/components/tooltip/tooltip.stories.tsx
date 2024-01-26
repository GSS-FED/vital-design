import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { colors, styles } from '../../constants';
import { ExclamationIcon } from '../../icons';
import Tooltip from './tooltip';

type Story = StoryObj<typeof Tooltip>;

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
};
export default meta;

export const Text: Story = {
  render() {
    function App() {
      return (
        <StyledContainer>
          <TooltipGroup>
            {[...new Array<unknown>(8)].map((_, index) => (
              <Tooltip key={`tooltip-${index}`} content="提示文字">
                <Button>目標元件</Button>
              </Tooltip>
            ))}
          </TooltipGroup>
        </StyledContainer>
      );
    }
    return <App />;
  },
};
export const TextWithIcon: Story = {
  name: 'Text with Icon',
  render() {
    function App() {
      return (
        <StyledContainer>
          <TooltipGroup>
            {[...new Array<unknown>(8)].map((_, index) => (
              <Tooltip
                key={`tooltip-${index}`}
                content={
                  <TooltipContent>
                    <ExclamationIcon width={16} height={13} />
                    <div>提示文字</div>
                  </TooltipContent>
                }
              >
                <Button>目標元件</Button>
              </Tooltip>
            ))}
          </TooltipGroup>
        </StyledContainer>
      );
    }
    return <App />;
  },
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const TooltipGroup = styled.div`
  ${styles.boxSizing}
  ${styles.typography}

  display: grid;
  grid-template-areas:
    'top-left    top    top-right'
    'left        .      right'
    'bottom-left bottom bottom-right';
  gap: 16px 24px;
  place-items: center;
  width: 508px;
  height: 228px;
  padding: 16px;

  > div {
    &:nth-child(1) {
      grid-area: top-left;
    }
    &:nth-child(2) {
      grid-area: top;
    }
    &:nth-child(3) {
      grid-area: top-right;
    }
    &:nth-child(4) {
      grid-area: left;
    }
    &:nth-child(5) {
      grid-area: right;
    }
    &:nth-child(6) {
      grid-area: bottom-left;
    }
    &:nth-child(7) {
      grid-area: bottom;
    }
    &:nth-child(8) {
      grid-area: bottom-right;
    }
  }
`;
const RawButton = styled.button.attrs({ type: 'button' })`
  all: unset; // 移除按鈕預設樣式
`;
const Button = styled(RawButton)`
  padding: 4px 6px;
  border: 1px solid ${colors.grayscale100};
  border-radius: 4px;
  box-shadow: 0 2px 8px 0 ${colors.grayscale300};
  background-color: ${colors.white};
  color: ${colors.grayscale800};
  cursor: pointer;
`;
const TooltipContent = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  > svg {
    transform: translateY(-1px);
    color: #ffa700;
  }
`;
