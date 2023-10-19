import { css } from 'styled-components';

const boxSizing = css`
  box-sizing: border-box;
  &::before,
  &::after {
    box-sizing: border-box;
  }
  * {
    box-sizing: border-box;
    &::before,
    &::after {
      box-sizing: border-box;
    }
  }
`;
const typography = css`
  font-family: 'Roboto', 'Noto Sans TC', 'PingFang TC',
    'Microsoft JhengHei', sans-serif;
`;

const styles = {
  boxSizing,
  typography,
};

export default styles;
