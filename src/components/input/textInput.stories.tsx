import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import UserIcon from '../../icons/user-icon';
import TextInput from './textInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/Input/TextInput',
  component: TextInput,
  tags: ['autodocs'],
  argTypes: {
    width: {
      table: {
        defaultValue: { summary: `100%` },
      },
    },
    disabled: {
      table: {
        defaultValue: { summary: false },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextInput>;

export const Basic: Story = {
  render() {
    return <TextInput width="450px" placeholder={'請輸入內容'} />;
  },
};

export const PrefixAndSuffix: Story = {
  name: 'Prefix & Suffix',
  render() {
    function App() {
      return (
        <StyledContainer>
          <TextInput
            width="450px"
            prefix={<UserIcon />}
            placeholder={'請輸入使用者名稱'}
          />
          <TextInput
            width="450px"
            suffix={'$'}
            placeholder={'請輸入金額'}
          />
        </StyledContainer>
      );
    }
    return <App />;
  },
};

export const Error: Story = {
  render() {
    function App() {
      return <TextInput width="450px" isError={true} />;
    }
    return <App />;
  },
};

export const Disabled: Story = {
  render() {
    function App() {
      return <TextInput width="450px" disabled={true} />;
    }
    return <App />;
  },
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
