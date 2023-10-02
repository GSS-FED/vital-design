import { Meta, StoryObj } from '@storybook/react';
import Div from './div';

type Story = StoryObj<typeof Div>;

const meta: Meta<typeof Div> = {
  title: 'Components/Div',
  component: Div,
  tags: ['autodocs'],
};
export default meta;

export const SimpleDiv: Story = {
  args: {
    children: 'Just a Div',
  },
};

export const DivWithTwoParagraphs: Story = {
  args: {
    children: (
      <>
        <p>Paragraph 1</p>
        <p>Paragraph 2</p>
      </>
    ),
  },
};

export const DivWithCustomStyles: Story = {
  args: {
    style: {
      padding: '16px 20px',
      color: 'white',
      backgroundColor: 'gray',
    },
    children: 'Div with background color',
  },
};

export const MissingDiv: Story = {
  args: {
    isMissing: true,
    children: "You can't see me",
  },
};
