import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import Tag from './tag';

type Story = StoryObj<typeof Tag>;

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  excludeStories: ['FlagIcon'],
};
export default meta;

export const Default: Story = {
  render() {
    function App() {
      return (
        <StyledContainer>
          <Tag>標籤</Tag>
          <Tag icon={<FlagIcon />}>標籤</Tag>
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
          <Tag icon={<FlagIcon />} onClick={() => {}}>
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
              icon={<FlagIcon />}
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
              icon={<FlagIcon />}
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
            icon={<FlagIcon />}
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

export function FlagIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12 13"
      width="12"
      height="13"
      data-testid="flag-icon"
    >
      <path
        d="M1.875 1.063v.656l1.992-.492a3.84 3.84 0 0 1 2.648.305c1.078.539 2.367.539 3.445 0l.234-.117a.74.74 0 0 1 1.055.656v6.539c0 .328-.211.586-.492.703l-.82.305c-1.078.422-2.273.352-3.328-.164a4.17 4.17 0 0 0-2.859-.328l-1.875.469v2.344c0 .328-.258.563-.562.563a.54.54 0 0 1-.562-.562V9.875 8.727 2v-.937C.75.758.984.5 1.313.5a.57.57 0 0 1 .563.563zm0 1.828v5.555l1.594-.398c1.219-.305 2.531-.164 3.656.398.75.375 1.617.422 2.414.117l.586-.211V2.68c-1.336.539-2.836.492-4.102-.141a2.67 2.67 0 0 0-1.898-.211l-2.25.563z"
        fill="currentColor"
      />
    </svg>
  );
}
