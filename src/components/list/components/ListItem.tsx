import styled from 'styled-components';
import { colors } from 'src/constants';

type ListItemProps = {
  $selected?: boolean;
  $disabled?: boolean;
};

export const ListItem = styled.li<ListItemProps>`
  display: flex;
  align-items: center;
  list-style-type: none;
  padding: 6px 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: ${({ $disabled, $selected }) => {
    if ($disabled) {
      return colors.grayscale500;
    }
    if ($selected) {
      return colors.primary500;
    }
    return colors.grayscale800;
  }};

  &:hover {
    ${({ $disabled }) =>
      !$disabled &&
      `
        border: none;
        outline: none;
        cursor: pointer;
        background-color: ${colors.grayscale100};
      `}
  }

  &:active {
    ${({ $disabled }) =>
      !$disabled &&
      `
      background-color: ${colors.grayscale200};
      `}
  }
`;
