import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import { FlagIcon } from '../../icons';
import Tag from './tag';

type Story = StoryObj<typeof Tag>;

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    icon: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  args: {
    children: '標籤',
  },
  decorators: [
    (Story) => (
      <StyledContainer>
        <Story />
      </StyledContainer>
    ),
  ],
};
export default meta;

export const Default: Story = {
  render: function Render(args) {
    return <Tag {...args} />;
  },
};

export const Clickable: Story = {
  render: function Render(args) {
    return (
      <>
        <Tag {...args} onClick={() => {}} />
        <Tag
          {...args}
          icon={<FlagIcon width={12} height={12} />}
          onClick={() => {}}
        />
      </>
    );
  },
};

export const Removable: Story = {
  render: function Render(args) {
    const [isFirstTagShown, setIsFirstTagShown] = useState(true);
    const [isSecondTagShown, setIsSecondTagShown] = useState(true);

    return (
      <>
        {isFirstTagShown && (
          <Tag
            {...args}
            removable
            onRemove={() => {
              setIsFirstTagShown(false);
            }}
          />
        )}
        {isSecondTagShown && (
          <Tag
            {...args}
            removable
            icon={<FlagIcon width={12} height={12} />}
            onRemove={() => {
              setIsSecondTagShown(false);
            }}
          />
        )}
      </>
    );
  },
};

export const ClickableAndRemovable: Story = {
  name: 'Clickable & Removable',

  render: function Render(args) {
    const [isFirstTagShown, setIsFirstTagShown] = useState(true);
    const [isSecondTagShown, setIsSecondTagShown] = useState(true);

    return (
      <>
        {isFirstTagShown && (
          <Tag
            {...args}
            removable
            onClick={() => {}}
            onRemove={() => {
              setIsFirstTagShown(false);
            }}
          />
        )}
        {isSecondTagShown && (
          <Tag
            {...args}
            removable
            icon={<FlagIcon width={12} height={12} />}
            onClick={() => {}}
            onRemove={() => {
              setIsSecondTagShown(false);
            }}
          />
        )}
      </>
    );
  },
};

export const Selected: Story = {
  render: function Render(args) {
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
      <>
        <Tag
          {...args}
          selected={selectedIndex === 0}
          onClick={() => toggleByIndex(0)}
        />
        <Tag
          {...args}
          selected={selectedIndex === 1}
          onClick={() => {
            toggleByIndex(1);
          }}
          icon={<FlagIcon width={12} height={12} />}
        />
      </>
    );
  },
};

const StyledContainer = styled.div`
  display: flex;
  gap: 8px;
`;
