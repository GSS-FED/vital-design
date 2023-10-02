import { ComponentPropsWithRef } from 'react';
import styled, { css } from 'styled-components';

export type DivProps = ComponentPropsWithRef<'div'> & {
  isMissing?: boolean;
};

export default function Div(props: DivProps) {
  const { children, isMissing, ...rest } = props;

  return (
    <Container $isMissing={isMissing} {...rest}>
      {children}
    </Container>
  );
}

const Container = styled.div<{ $isMissing?: boolean }>`
  ${({ $isMissing = false }) =>
    $isMissing &&
    css`
      color: transparent;
      border: 2px dashed black;
    `}
`;
