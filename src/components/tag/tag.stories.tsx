import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import { FlagIcon } from '../../icons';
import Tag from './tag';

type Story = StoryObj<typeof Tag>;

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
};
export default meta;

export const Default: Story = {
  render() {
    function App() {
      return (
        <StyledContainer>
          <Tag>標籤</Tag>
          <Tag icon={<FlagIcon width={12} height={12} />}>標籤</Tag>
        </StyledContainer>
      );
    }
    return <App />;
  },
};

export const Clickable: Story = {
  render() {
    function App() {
      return (
        <StyledContainer>
          <Tag onClick={() => {}}>標籤</Tag>
          <Tag
            icon={<FlagIcon width={12} height={12} />}
            onClick={() => {}}
          >
            標籤
          </Tag>
        </StyledContainer>
      );
    }
    return <App />;
  },
};

export const Removable: Story = {
  render() {
    function App() {
      const [isFirstTagShown, setIsFirstTagShown] = useState(true);
      const [isSecondTagShown, setIsSecondTagShown] = useState(true);
      return (
        <StyledContainer>
          {isFirstTagShown && (
            <Tag
              removable
              onRemove={() => {
                setIsFirstTagShown(false);
              }}
            >
              標籤
            </Tag>
          )}
          {isSecondTagShown && (
            <Tag
              icon={<FlagIcon width={12} height={12} />}
              removable
              onRemove={() => {
                setIsSecondTagShown(false);
              }}
            >
              標籤
            </Tag>
          )}
        </StyledContainer>
      );
    }
    return <App />;
  },
};

export const ClickableAndRemovable: Story = {
  name: 'Clickable & Removable',
  render() {
    function App() {
      const [isFirstTagShown, setIsFirstTagShown] = useState(true);
      const [isSecondTagShown, setIsSecondTagShown] = useState(true);
      return (
        <StyledContainer>
          {isFirstTagShown && (
            <Tag
              removable
              onRemove={() => {
                setIsFirstTagShown(false);
              }}
              onClick={() => {}}
            >
              標籤
            </Tag>
          )}
          {isSecondTagShown && (
            <Tag
              icon={<FlagIcon width={12} height={12} />}
              removable
              onRemove={() => {
                setIsSecondTagShown(false);
              }}
              onClick={() => {}}
            >
              標籤
            </Tag>
          )}
        </StyledContainer>
      );
    }
    return <App />;
  },
};

export const Selected: Story = {
  render() {
    function App() {
      const [selectedIndex, setSelectedIndex] = useState<
        number | undefined
      >(0);
      const toggleByIndex = (index: number) => {
        setSelectedIndex((prevSelectedIndex) => {
          const isAlreadySelected = prevSelectedIndex === index;
          return isAlreadySelected ? undefined : index;
        });
      };
      return (
        <StyledContainer>
          <Tag
            selected={selectedIndex === 0}
            onClick={() => {
              toggleByIndex(0);
            }}
          >
            標籤
          </Tag>
          <Tag
            icon={<FlagIcon width={12} height={12} />}
            selected={selectedIndex === 1}
            onClick={() => {
              toggleByIndex(1);
            }}
          >
            標籤
          </Tag>
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
